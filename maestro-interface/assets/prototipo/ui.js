/* Maestro OS · protótipo · KIT de componentes (uso obrigatório em toda tela)
   Regras que o kit garante sozinho:
   • Botões só em 44 (página) e 36 (linha/cartão); ícone sozinho = quadrado com aria-label.
   • Um botão principal por tela: o ÚLTIMO de page({acts}) com pri:true.
   • Irmãos com mesma largura (acts em grade de colunas iguais; grupos .btnrow).
   • Todo bloco encosta na grade de 12 colunas; formulários em grade de 12 (f3/f4/f6/f12).
   • Nenhum botão morto: data-act sem tratador mostra o que a ação faria. */
(function(){
const {ic,$,$$,esc,brl}=M;
const U=M.ui={};

/* ---------- peças ---------- */
U.btn=(label,{act='',icon='',pri=false,sm=false,ghost=false,ctl=false,w='',title='',attrs=''}={})=>
  `<button type="button" class="btn${pri?' pri':''}${sm?' sm':''}${ghost?' ghost':''}${ctl&&!pri?' ctl':''}${label?'':' icon'}" data-act="${act}" ${label?'':`aria-label="${esc(title)}"`} ${title?`title="${esc(title)}"`:''} ${w?`style="width:${w}"`:''} ${attrs}>${icon?ic(icon,sm?16:20):''}${label?`<span class="bt">${esc(label)}</span>`:''}</button>`;
U.chip=(t,tone='n')=>`<span class="chip ${tone}">${esc(t)}</span>`;
U.av=(n)=>`<span class="av" aria-hidden="true">${esc(String(n).split(/\s+/).filter(w=>w.length>2||/^[A-Z]/.test(w)).slice(0,2).map(w=>w[0]).join('').toUpperCase())}</span>`;
U.prog=(p,c)=>`<div class="prog" role="progressbar" aria-valuenow="${Math.round(p)}" aria-valuemin="0" aria-valuemax="100"><b style="width:${Math.max(0,Math.min(100,p))}%${c?';background:'+c:''}"></b></div>`;
U.money=v=>`<span class="num">${brl(v)}</span>`;
U.empty=({title,text='',btn='',act=''})=>`<div class="empty"><b>${esc(title)}</b>${text?`<p>${esc(text)}</p>`:''}${btn?U.btn(btn,{act}):''}</div>`;

/* cabeçalho de página: acts = [{label,icon,act,pri}] — o principal (pri) vai por último */
U.page=({kick='',title,sub='',acts=[]})=>{const a=[...acts.filter(x=>!x.pri),...acts.filter(x=>x.pri)];
  return M.head({kick,title,sub,acts:a.map(x=>U.btn(x.label,{act:x.act,icon:x.icon,pri:x.pri,ctl:true})).join('')})};
/* barra de ferramentas da página (abas, busca, filtros) */
U.bar=(left,right='')=>`<div class="row wrap rv" style="--d:1;margin-bottom:24px;gap:12px">${left}<span class="spacer"></span>${right}</div>`;
U.tabs=(arr,on=0,label='Seções')=>M.tabsHTML(arr,on,'ctl',label);
U.search=(ph,id='q',w='320px')=>`<input class="input ctl" type="search" id="${id}" placeholder="${esc(ph)}" aria-label="${esc(ph)}" style="width:${w}">`;
U.select=(label,opts,id,w='200px')=>`<select class="select ctl" id="${id}" aria-label="${esc(label)}" style="width:${w}">${opts.map(o=>Array.isArray(o)?`<option value="${esc(o[0])}">${esc(o[1])}</option>`:`<option>${esc(o)}</option>`).join('')}</select>`;
U.seg=(id,opts,on,label='Opções',cls='ctl')=>`<div class="seg ${cls}" id="${id}" role="group" aria-label="${esc(label)}" style="width:${Math.max(2,opts.length)*112}px">${opts.map(([v,l,i])=>`<button type="button" data-v="${v}" aria-pressed="${v===on}">${i?ic(i,16)+' ':''}${esc(l)}</button>`).join('')}</div>`;
U.viewToggle=(on='kanban',id='view')=>U.seg(id,[['kanban','Kanban','kanban'],['lista','Lista','lista']],on,'Modo de visualização');
U.bindSeg=(root,id,fn)=>{const s=$('#'+id,root);if(!s)return;$$('button',s).forEach(b=>b.onclick=()=>{$$('button',s).forEach(x=>x.setAttribute('aria-pressed',x===b));fn(b.dataset.v)})};

/* indicadores em grade de irmãos iguais */
U.kpis=(arr,n=arr.length)=>`<div class="grid g${n} rv" style="--d:2;margin-bottom:24px">${arr.map(k=>`<${k.act?'button type="button" data-act="'+k.act+'"':'div'} class="card" style="text-align:left;border:0;${k.act?'cursor:pointer':''}">
  <div class="row"><span class="lbl" style="flex:1">${esc(k.label)}</span>${k.chip?U.chip(k.chip,k.tone||'n'):''}</div>
  <div class="big num mt8 ${k.vtone||''}">${k.value}</div>${k.sub?`<div class="lbl mt8">${k.sub}</div>`:''}</${k.act?'button':'div'}>`).join('')}</div>`;

/* tabela: cols=[{h,w,r,c,html:(row,i)=>string}], rows=[], check:true, rowAct:'abrir' */
U.table=({cols,rows,check=false,rowAct='',empty,title='',head='',id='',groups=null,fixed=false})=>{
  const th=`<thead><tr>${check?`<th style="width:56px"><input type="checkbox" data-checkall aria-label="Selecionar todos"></th>`:''}${cols.map(c=>`<th class="${c.r?'r':c.c?'c':''}" ${c.w?`style="width:${c.w}"`:''}>${c.h?esc(c.h):'<span class="sr">Ações</span>'}</th>`).join('')}</tr></thead>`;
  const tr=(r,i)=>`<tr ${rowAct?`data-row-act="${rowAct}" data-i="${i}" style="cursor:pointer"`:''}>${check?`<td><input type="checkbox" data-check="${i}" aria-label="Selecionar linha"></td>`:''}${cols.map(c=>`<td class="${c.r?'r num':c.c?'c':''} ${c.cls||''}">${c.html(r,i)}</td>`).join('')}</tr>`;
  let body;
  if(groups) body=groups.map(g=>`<tbody><tr><td colspan="${cols.length+(check?1:0)}" style="padding:0"><div class="ghead"><span style="flex:1">${esc(g.title)}</span><span class="lbl">${g.rows.length}</span>${g.total!=null?`<b class="num">${brl(g.total)}</b>`:''}</div></td></tr>${g.rows.map(r=>tr(r,rows.indexOf(r))).join('')}</tbody>`).join('');
  else body=`<tbody>${rows.map(tr).join('')}</tbody>`;
  return `<section class="card flush rv" style="--d:3" ${id?`id="${id}"`:''}>${title||head?`<div class="ch">${title?`<h2>${esc(title)}</h2>`:''}<span class="spacer"></span>${head}</div>`:''}
   ${rows.length?`<div class="tblwrap"><table class="tbl" ${fixed?'style="table-layout:fixed"':''}>${th}${body}</table></div>`:(empty?U.empty(empty):'')}</section>`};

/* quadro (kanban): cols=[{name,dot,total,cards:[html]}] */
U.board=(cols,{drag=false}={})=>`<div class="board rv" style="--d:3">${cols.map((c,ci)=>`<section aria-label="${esc(c.name)}">
  <div class="colh">${c.dot?`<span class="dot" style="background:${c.dot}"></span>`:''}<b style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(c.name)}</b>${U.chip(String(c.cards.length))}<span class="spacer"></span>${c.total!=null?`<span class="lbl num">${M.brl0(c.total)}</span>`:''}</div>
  <div class="colb" data-col="${ci}">${c.cards.join('')||`<div class="lbl" style="padding:16px;text-align:center">${drag?'Solte aqui':'Nada aqui'}</div>`}</div></section>`).join('')}</div>`;
U.kcard=({title,sub='',value=null,chips=[],progress=null,foot='',act='',i='',drag=false})=>`<article class="card kcard" ${act?`data-act="${act}" data-i="${i}" tabindex="0" role="button"`:''} ${drag?`draggable="true" data-drag="${i}"`:''} aria-label="${esc(title)}">
  <div style="font-weight:600">${esc(title)}</div>${sub?`<div class="lbl" style="font-size:12.5px;margin-top:2px">${sub}</div>`:''}
  ${progress!=null?`<div class="mt16">${U.prog(progress)}</div>`:''}
  ${chips.length||value!=null?`<div class="row mt16" style="gap:8px">${chips.join('')}<span class="spacer"></span>${value!=null?`<b class="num">${brl(value)}</b>`:''}</div>`:''}${foot?`<div class="lbl mt8" style="font-size:12px">${foot}</div>`:''}</article>`;
/* arrastar cartões entre colunas: onMove(cardIndex, toCol) */
U.bindBoard=(root,onMove)=>{let from=null;
  $$('[data-drag]',root).forEach(c=>{c.addEventListener('dragstart',e=>{from=c.dataset.drag;c.classList.add('dragging');try{e.dataTransfer.setData('text/plain',from)}catch(_){}});c.addEventListener('dragend',()=>{c.classList.remove('dragging');from=null})});
  $$('.colb',root).forEach(col=>{col.addEventListener('dragover',e=>{if(from==null)return;e.preventDefault();col.classList.add('over')});col.addEventListener('dragleave',()=>col.classList.remove('over'));
    col.addEventListener('drop',e=>{e.preventDefault();col.classList.remove('over');if(from!=null){const f=from;from=null;onMove(f,+col.dataset.col)}})})};

/* ---------- ligar ações: handlers = {nome:(el,ev)=>{}} ---------- */
M.wire=(root,h={})=>{
  $$('[data-act]',root).forEach(el=>{if(el._w)return;el._w=1;const run=e=>{const k=el.dataset.act;if(!k)return;e.stopPropagation();
      if(h[k])return h[k](el,e);const nm=(el.getAttribute('aria-label')||el.textContent||'').trim().replace(/\s+/g,' ');M.toast(`“${nm}”: ação simulada no protótipo.`)};
    el.addEventListener('click',run); if(el.tagName==='ARTICLE')el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();run(e)}})});
  $$('[data-row-act]',root).forEach(tr=>{if(tr._w)return;tr._w=1;tr.addEventListener('click',e=>{if(e.target.closest('button,a,input,select'))return;const k=tr.dataset.rowAct;h[k]?h[k](tr,e):M.toast('Abre o detalhe (simulação).')})});
  const all=$('[data-checkall]',root);if(all)all.onchange=()=>{$$('[data-check]',root).forEach(c=>{c.checked=all.checked;c.dispatchEvent(new Event('change'))})};
};

/* ---------- sobreposições (sempre na raiz, fora de qualquer vidro) ---------- */
let stack=[];
function overlay(el,onClose){
  const o=document.createElement('div');o.className='ovl';document.body.append(o,el);
  const prev=document.activeElement;
  const close=()=>{el.classList.remove('open');o.classList.remove('open');setTimeout(()=>{o.remove();el.remove()},300);stack=stack.filter(s=>s!==close);onClose&&onClose();prev&&prev.focus&&prev.focus()};
  o.onclick=close; el.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();close()}
    if(e.key==='Tab'){const f=$$('button:not([disabled]),input,select,textarea,a[href]',el).filter(x=>x.offsetParent);if(!f.length)return;const a=f[0],z=f[f.length-1];
      if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
  requestAnimationFrame(()=>{o.classList.add('open');el.classList.add('open');
    /* painel lateral: foco no botão Fechar (não rola até um campo lá embaixo); modal: primeiro campo */
    const f=el.classList.contains('sheet')||el.classList.contains('chatd')?$('button',el):($('input:not([type=checkbox]),select,textarea',el)||$('button',el));f&&f.focus({preventScroll:true})});
  stack.push(close);return close;
}
M.closeTop=()=>{const c=stack[stack.length-1];c&&c()};

/* campo de formulário: {k,label,type,opts,span,req,ph,value,help} */
U.field=f=>{const id='f_'+f.k, sp='f'+(f.span||6), lab=`<span>${esc(f.label)}${f.req?' <b class="req" aria-hidden="true">*</b>':''}</span>`;
  const v=f.value??'';
  let ctl;
  switch(f.type){
    case 'select': ctl=`<select class="select" id="${id}" name="${f.k}" ${f.req?'required':''}>${(f.ph?[['',f.ph]]:[]).concat(f.opts.map(o=>Array.isArray(o)?o:[o,o])).map(([a,b])=>`<option value="${esc(a)}" ${a===v?'selected':''}>${esc(b)}</option>`).join('')}</select>`;break;
    case 'textarea': ctl=`<textarea class="input" id="${id}" name="${f.k}" placeholder="${esc(f.ph||'')}" ${f.req?'required':''}>${esc(v)}</textarea>`;break;
    case 'checks': return `<fieldset class="field ${sp}" style="border:0;padding:0;margin:0"><legend class="lbl" style="margin-bottom:8px">${esc(f.label)}${f.req?' *':''}</legend><div class="checks">${f.opts.map(o=>`<label><input type="checkbox" name="${f.k}" value="${esc(o)}" ${(v||[]).includes(o)?'checked':''}>${esc(o)}</label>`).join('')}</div></fieldset>`;
    case 'radio': return `<fieldset class="field ${sp}" style="border:0;padding:0;margin:0"><legend class="lbl" style="margin-bottom:8px">${esc(f.label)}${f.req?' *':''}</legend><div class="checks">${f.opts.map((o,i)=>`<label><input type="radio" name="${f.k}" value="${esc(o)}" ${(v?v===o:i===0)?'checked':''}>${esc(o)}</label>`).join('')}</div></fieldset>`;
    case 'toggle': return `<div class="field ${sp}"><div class="row" style="height:44px"><span style="flex:1" id="${id}_l">${esc(f.label)}</span><button type="button" class="sw" role="switch" aria-checked="${!!v}" aria-labelledby="${id}_l" data-toggle="${f.k}"></button></div>${f.help?`<span class="lbl" style="font-size:12px">${esc(f.help)}</span>`:''}</div>`;
    case 'file': ctl=`<label class="btn" style="width:100%;cursor:pointer">${ic('upload',20)}${esc(f.ph||'Escolher arquivo')}<input type="file" id="${id}" name="${f.k}" class="sr"></label>`;break;
    case 'money': ctl=`<input class="input num" id="${id}" name="${f.k}" inputmode="decimal" placeholder="${esc(f.ph||'R$ 0,00')}" value="${esc(v)}" ${f.req?'required':''}>`;break;
    default: ctl=`<input class="input" id="${id}" name="${f.k}" type="${f.type||'text'}" placeholder="${esc(f.ph||'')}" value="${esc(v)}" ${f.req?'required':''}>`;
  }
  return `<label class="field ${sp}" for="${id}">${lab}${ctl}${f.help?`<span class="lbl" style="font-size:12px">${esc(f.help)}</span>`:''}<span class="msg" hidden>Obrigatório.</span></label>`;
};
/* modal de formulário: retorna os valores em onOk(values) — se onOk devolver false, mantém aberto */
M.modal=({title,sub='',fields=[],body='',ok='Salvar',cancel='Cancelar',onOk,danger=false,width='',extra=''})=>{
  const el=document.createElement('div');el.className='modal';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',title);if(width)el.style.width=`min(${width},calc(100vw - 32px))`;
  el.innerHTML=`<div class="mh"><div style="flex:1;min-width:0"><h2>${esc(title)}</h2>${sub?`<p class="soft" style="margin:4px 0 0">${sub}</p>`:''}</div>${U.btn('',{icon:'x',sm:true,ghost:true,title:'Fechar',act:'x'})}</div>
   <form class="mb" novalidate><div class="fgrid">${fields.map(U.field).join('')}</div>${body}</form>
   <div class="mf">${extra}${cancel?`<button type="button" class="btn" data-c>${esc(cancel)}</button>`:''}<button type="button" class="btn pri" data-ok ${danger?'style="background:rgb(var(--neg))"':''}>${esc(ok)}</button></div>`;
  const close=overlay(el);
  $('[data-act="x"]',el).onclick=close; const c=$('[data-c]',el); if(c)c.onclick=close;
  $$('[data-toggle]',el).forEach(b=>b.onclick=()=>b.setAttribute('aria-checked',b.getAttribute('aria-checked')!=='true'));
  $$('input[type=file]',el).forEach(i=>i.onchange=()=>{i.parentNode.firstChild.nextSibling.textContent=i.files[0]?i.files[0].name:'Escolher arquivo'});
  $('[data-ok]',el).onclick=()=>{let bad=null;const vals={};
    fields.forEach(f=>{const fe=$(`[name="${f.k}"]`,el);let val;
      if(f.type==='checks')val=$$(`[name="${f.k}"]:checked`,el).map(x=>x.value);else if(f.type==='radio')val=($(`[name="${f.k}"]:checked`,el)||{}).value;
      else if(f.type==='toggle')val=$(`[data-toggle="${f.k}"]`,el).getAttribute('aria-checked')==='true';else val=fe?fe.value.trim():'';
      vals[f.k]=val; const wrap=fe&&fe.closest('.field'); const miss=f.req&&(!val||(Array.isArray(val)&&!val.length));
      if(wrap){wrap.classList.toggle('err',!!miss);const m=$('.msg',wrap);if(m)m.hidden=!miss} if(miss&&!bad)bad=fe;});
    if(bad){bad.focus();return}
    if(onOk&&onOk(vals,el)===false)return; close();};
  return {el,close};
};
M.confirm=({title,text='',ok='Confirmar',danger=false,field=null,run})=>M.modal({title,sub:esc(text),width:'480px',ok,danger,fields:field?[{k:'motivo',label:field,type:'textarea',span:12,req:true}]:[],onOk:v=>run&&run(v)});

/* painel lateral (detalhe de registro): acts=[{label,act,pri,icon}], on={act:fn} */
M.sheet=({kick='',title,sub='',chips='',acts=[],body='',foot=[],on={}})=>{
  const el=document.createElement('aside');el.className='sheet';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',title);
  el.innerHTML=`<div class="sh"><div class="row" style="align-items:flex-start"><div style="flex:1;min-width:0">${kick?`<div class="kick">${esc(kick)}</div>`:''}<h2 style="margin:4px 0 0;font-size:22px;font-weight:700;letter-spacing:-.01em">${esc(title)}</h2>${sub?`<div class="lbl mt8">${sub}</div>`:''}${chips?`<div class="row mt8" style="gap:8px;flex-wrap:wrap">${chips}</div>`:''}</div>${U.btn('',{icon:'x',ghost:true,title:'Fechar',act:'__x'})}</div>
    ${acts.length?`<div class="btnrow mt16">${acts.map(a=>U.btn(a.label,{act:a.act,icon:a.icon,sm:true,pri:a.pri})).join('')}</div>`:''}</div>
   <div class="sb">${body}</div>${foot.length?`<div class="sf">${foot.map(a=>U.btn(a.label,{act:a.act,icon:a.icon,pri:a.pri,w:a.pri?'':'auto'})).join('').replace('class="btn pri','style="flex:1" class="btn pri')}</div>`:''}`;
  const close=overlay(el); M.wire(el,{__x:close,...on}); return {el,close};
};

/* ---------- Spotlight (⌘K) ---------- */
M.spotlight=()=>{ if($('.spot'))return;
  const D=M.D||{}; const pages=Object.entries(M.screens).filter(([k,s])=>!s.hidden).map(([k,s])=>({g:'Páginas',t:s.title,s:'',go:'#/'+k}));
  const data=[...pages,
    ...(D.obras||[]).map(o=>({g:'Obras',t:o.nome,s:o.cliente,go:'#/obra?id='+o.id})),
    ...(D.contatos||[]).map(c=>({g:'Contatos',t:c.nome,s:c.email||c.empresa||'',go:'#/contatos?ficha='+c.id})),
    ...(D.negocios||[]).map(n=>({g:'Negócios',t:n.titulo,s:n.cliente,go:'#/negocios?card='+n.id})),
    ...(D.propostas||[]).map(p=>({g:'Propostas',t:p.titulo,s:p.numero+' · '+p.cliente,go:'#/construtor'}))];
  const el=document.createElement('div');el.className='spot';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Buscar');
  el.innerHTML=`<input type="search" placeholder="Buscar páginas, clientes, negócios, propostas…" aria-label="Buscar páginas, clientes, negócios, propostas"><ul role="listbox"></ul><div class="ft"><span>↑↓ navegar</span><span>↵ abrir</span><span>esc fechar</span><span class="spacer"></span><span>⌘K abrir/fechar</span></div>`;
  const close=overlay(el); const inp=$('input',el),ul=$('ul',el); let res=[],k=0;
  const draw=()=>{const q=inp.value.trim().toLowerCase();res=data.filter(d=>!q||(d.t+' '+d.s).toLowerCase().includes(q)).slice(0,60);k=0;
    if(!res.length){ul.innerHTML=`<li class="empty"><b>Nada encontrado.</b><p>Tenta outras palavras ou um nome de cliente.</p></li>`;return}
    let g='';ul.innerHTML=res.map((d,i)=>(d.g!==g?`<li class="g">${g=d.g}</li>`:'')+`<li class="r" role="option" data-i="${i}" aria-selected="${i===k}"><span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><b style="font-weight:600">${esc(d.t)}</b>${d.s?` <span class="lbl">· ${esc(d.s)}</span>`:''}</span>${ic('seta',16)}</li>`).join('');
    $$('li.r',ul).forEach(li=>{li.onclick=()=>go(+li.dataset.i);li.onmouseenter=()=>{k=+li.dataset.i;paint()}})};
  const paint=()=>$$('li.r',ul).forEach(li=>li.setAttribute('aria-selected',+li.dataset.i===k));
  const go=i=>{const d=res[i];if(!d)return;close();location.hash=d.go};
  inp.oninput=draw; inp.onkeydown=e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();k=(k+(e.key==='ArrowDown'?1:-1)+res.length)%res.length;paint();const s=$(`li.r[data-i="${k}"]`,ul);s&&s.scrollIntoView({block:'nearest'})}if(e.key==='Enter')go(k)};
  draw();
};

/* ---------- Sino ---------- */
M.bell=anchor=>{ if($('.bellp'))return $('.bellp').remove();
  const N=(M.D&&M.D.notifs)||[]; let tab=0;
  const el=document.createElement('div');el.className='bellp';el.setAttribute('role','dialog');el.setAttribute('aria-label','Notificações');document.body.append(el);
  const draw=()=>{const list=N.filter(n=>n.aba===tab),nl=N.filter(n=>!n.lida).length;
    el.innerHTML=`<div class="row"><h2 style="margin:0;font-size:17px;font-weight:700;flex:1">Notificações ${nl?U.chip(nl+' não lidas','b'):''}</h2>${U.btn('Marcar todas',{sm:true,ghost:true,act:'all'})}</div>
    <div class="mt16">${M.tabsHTML(['Para você · '+N.filter(n=>n.aba===0&&!n.lida).length,'Movimentos do cliente · '+N.filter(n=>n.aba===1&&!n.lida).length],tab,'in','Tipo de notificação')}</div>
    <ul style="list-style:none;margin:12px 0 0;padding:0">${list.map(n=>`<li><button type="button" data-n="${N.indexOf(n)}" class="row" style="width:100%;border:0;background:${n.lida?'transparent':'rgb(var(--primary)/.06)'};border-radius:12px;padding:12px;gap:12px;text-align:left;align-items:flex-start">
      <span class="thumb sm" aria-hidden="true">${ic(n.icon||'sino',16)}</span><span style="flex:1;min-width:0"><b style="font-weight:600">${esc(n.titulo)}</b>${n.cliente?`<br><span class="lbl">Cliente: ${esc(n.cliente)}</span>`:''}<br><span class="soft" style="font-size:13px">${esc(n.msg)}</span><br><span class="lbl" style="font-size:12px">por ${esc(n.ator)} · ${esc(n.quando)}</span></span>${n.lida?'':U.chip('não lida','b')}</button></li>`).join('')||`<li>${U.empty({title:'Tudo em dia.',text:'Nenhuma notificação nesta aba.'})}</li>`}</ul>`;
    M.tabs(el); $('[data-tabs]',el).addEventListener('tab',e=>{tab=e.detail;draw()});
    $('[data-act="all"]',el).onclick=()=>{N.forEach(n=>n.lida=true);draw();updBadge()};
    $$('[data-n]',el).forEach(b=>b.onclick=()=>{const n=N[+b.dataset.n];n.lida=true;updBadge();el.remove();if(n.go)location.hash=n.go});
  };
  const updBadge=()=>{const c=N.filter(n=>!n.lida).length,bd=$('#openBell .badge');if(bd){bd.textContent=c;bd.hidden=!c}};
  draw(); setTimeout(()=>document.addEventListener('click',function off(e){const path=e.composedPath();if(!path.includes(el)&&!path.includes(anchor)){el.remove();document.removeEventListener('click',off)}}),0);
  el.addEventListener('keydown',e=>{if(e.key==='Escape'){el.remove();anchor.focus()}}); $('button',el).focus();
};
})();

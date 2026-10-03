/* Maestro OS · versão própria para celular — casca + kit (uso obrigatório nas telas de celular)
   Navegação estilo iPhone: título grande que encolhe na barra de vidro, pilha com voltar, folhas que sobem de baixo,
   ações ao deslizar a linha, barra de abas flutuante em vidro (4 botões escolhidos por pessoa + "Mais").
   Telas: M.mscreen(chave,{title, tab, style, glass, help, render:q=>html, mount:(el,q)=>{}}). Rotas: #/chave?param=valor */
(function(){
const {ic,$,$$,esc,brl}=M;
const K=M.m={}; M.mscreens={};
M.mscreen=(k,def)=>{M.mscreens[k]=def};
const cfg=()=>M.cfg();

/* ---------- módulos (rótulo, ícone, rota) ---------- */
K.MODS=[['dashboard','Início','inicio'],['chat','Chat','chat'],['atividades','Atividades','atividades'],['nexos','Nexos','trocar'],['agenda','Agenda','agenda'],
 ['contatos','Contatos','contatos'],['negocios','Negócios','negocios'],['propostas','Propostas','propostas'],['projetos','Projetos','projetos'],['painel360','Painel 360','painel'],
 ['financeiro','Financeiro','financeiro'],['compras','Compras','compras'],['estoque','Estoque','estoque'],['tecnica','Técnica','chave'],['experiencia','Experiência','coracao'],
 ['fiscal','IA Fiscal','fiscal'],['catalogo','Catálogo','livro'],['relatorios','Relatórios','doc'],['numbers','Numbers','barras'],['ajustes','Ajustes','ajustes']];
const TAB_PADRAO=['dashboard','negocios','propostas','chat']; /* igual ao sistema real (MobileBottomNav) */
const tabs=()=>{const t=cfg().mtabs;return Array.isArray(t)&&t.length===4?t:TAB_PADRAO};
const mod=k=>K.MODS.find(m=>m[0]===k)||[k,k,'inicio'];

/* ---------- peças ---------- */
K.nav=({title='',back=null,acts=[],large=true,kick='',sub='',editorial=false})=>{
  const b=back?`<button type="button" class="back" data-back aria-label="Voltar${back===true?'':' para '+esc(back)}">${ic('voltar',22)}<span>${back===true?'Voltar':esc(back)}</span></button>`:'';
  return `<header class="nav ctl ${large?'':'sempre'}"><div class="nl">${b}</div><div class="nt" aria-hidden="${large}">${esc(title)}</div>
    <div class="nr">${acts.map(a=>`<button type="button" class="ib" data-act="${a.act}" aria-label="${esc(a.title)}" title="${esc(a.title)}">${a.text?`<b style="font-size:17px;font-weight:600">${esc(a.text)}</b>`:ic(a.icon,24)}${a.badge?`<span class="badge">${a.badge}</span>`:''}</button>`).join('')}</div></header>
   ${large?`<div class="lt">${kick?`<div class="k">${esc(kick)}</div>`:''}<h1>${editorial?title:esc(title)}</h1>${sub?`<p>${sub}</p>`:''}</div>`:''}`};
K.search=(ph,id='q')=>`<label class="msearch">${ic('buscar',18)}<input type="search" id="${id}" placeholder="${esc(ph)}" aria-label="${esc(ph)}" enterkeyhint="search"></label>`;
K.chips=(id,opts,on)=>`<div class="chips" id="${id}" role="group">${opts.map(([v,l])=>`<button type="button" data-v="${esc(v)}" aria-pressed="${v===on}">${esc(l)}</button>`).join('')}</div>`;
K.seg=(id,opts,on,label='Opções')=>`<div class="mseg" id="${id}" role="group" aria-label="${esc(label)}">${opts.map(([v,l])=>`<button type="button" data-v="${esc(v)}" aria-pressed="${v===on}">${esc(l)}</button>`).join('')}</div>`;
K.bindPick=(root,id,fn)=>{const s=$('#'+id,root);if(!s)return;$$('button',s).forEach(b=>b.onclick=()=>{$$('button',s).forEach(x=>x.setAttribute('aria-pressed',x===b));fn(b.dataset.v)})};
/* linha de lista: {icon,color,title,sub,value,value2,chev,href,act,i,swipe:[{label,icon,act,tone:1..5}]} */
K.row=r=>{const tag=r.href?'a':'button';
  return `<li ${r.swipe?'data-swipe':''}>${r.swipe?`<div class="sw-acts" aria-hidden="true">${r.swipe.map(s=>`<button type="button" class="a${s.tone||1}" data-act="${s.act}" data-i="${r.i??''}" tabindex="-1">${s.icon?ic(s.icon,20):''}${esc(s.label)}</button>`).join('')}</div>`:''}
   <${tag} ${r.href?`href="${r.href}"`:'type="button"'} class="rw ${r.icon?'ic40':''}" ${r.act?`data-act="${r.act}"`:''} data-i="${r.i??''}">
    ${r.icon?`<span class="mic" style="${r.color?'background:'+r.color:''}" aria-hidden="true">${/^[a-z]+\d*$/.test(r.icon)?ic(r.icon,22):`<b style="font-size:13px;font-weight:700">${esc(r.icon)}</b>`}</span>`:''}
    <span class="tx"><span class="t1">${r.title}</span>${r.sub?`<span class="t2">${r.sub}</span>`:''}</span>
    ${r.value!=null?`<span class="vl">${r.value2!=null?`<b>${r.value}</b>${r.value2}`:r.value}</span>`:''}${r.chev!==false&&(r.href||r.act)?`<span class="chev">${ic('seta',18)}</span>`:''}</${tag}>
    ${r.swipe?`<button type="button" class="sr" data-act="${r.swipe[0].act}" data-i="${r.i??''}">${esc(r.swipe.map(s=>s.label).join(', '))}</button>`:''}</li>`};
K.group=({title='',foot='',rows=[],empty=''})=>`<section class="grp">${title?`<h2>${esc(title)}</h2>`:''}${rows.length?`<ul class="lst">${rows.map(K.row).join('')}</ul>`:(empty?`<div class="mcard soft" style="text-align:center">${esc(empty)}</div>`:'')}${foot?`<div class="foot">${foot}</div>`:''}</section>`;
K.tiles=arr=>`<div class="tiles">${arr.map(t=>`<${t.act?`button type="button" data-act="${t.act}"`:'div'} class="tile ${t.wide?'wide':''}"><span class="tl">${esc(t.label)}</span><span class="tv ${t.tone||''}">${t.value}</span>${t.sub?`<span class="tl" style="font-size:12.5px">${t.sub}</span>`:''}</${t.act?'button':'div'}>`).join('')}</div>`;
K.card=(title,html)=>`<section class="mcard">${title?`<h3>${esc(title)}</h3>`:''}${html}</section>`;
K.btn=(label,{act='',pri=false,dng=false,icon=''}={})=>`<button type="button" class="mbtn ${pri?'pri':''} ${dng?'dng':''}" data-act="${act}">${icon?ic(icon,20):''}${esc(label)}</button>`;
K.empty=({title,text='',btn='',act=''})=>`<div class="mempty"><b>${esc(title)}</b>${text?`<p>${esc(text)}</p>`:''}${btn?K.btn(btn,{act,pri:true}):''}</div>`;

/* ---------- deslizar a linha para ver ações (como no Mail do iPhone) ---------- */
K.bindSwipe=root=>$$('li[data-swipe]',root).forEach(li=>{
  const rw=$('.rw',li),acts=$('.sw-acts',li);let x0=null,y0=0,dx=0,open=false,w=0;
  const set=v=>{rw.style.transform=`translateX(${v}px)`;li.classList.toggle('sw-on',v<0)};
  li.addEventListener('pointerdown',e=>{if(e.target.closest('.sw-acts'))return;x0=e.clientX;y0=e.clientY;dx=0;w=acts.offsetWidth;rw.style.transition='none'});
  li.addEventListener('pointermove',e=>{if(x0==null)return;const d=e.clientX-x0;if(Math.abs(e.clientY-y0)>Math.abs(d)&&Math.abs(dx)<6){x0=null;rw.style.transition='';return}
    dx=Math.min(0,Math.max(-w-24,(open?-w:0)+d));set(dx);if(Math.abs(d)>6)li._moved=true});
  const end=()=>{if(x0==null)return;x0=null;rw.style.transition='';open=dx<-w/2;set(open?-w:0);setTimeout(()=>li._moved=false,0)};
  li.addEventListener('pointerup',end);li.addEventListener('pointercancel',end);
  rw.addEventListener('click',e=>{if(li._moved||open){e.preventDefault();e.stopImmediatePropagation();if(open&&!li._moved){open=false;set(0)}}},true);
  $$('button',acts).forEach(b=>b.addEventListener('click',()=>{open=false;set(0)}));
});

/* ---------- sobreposições ---------- */
let pilha=[];
function cobrir(el,onClose){
  const o=document.createElement('div');o.className='ovl';document.body.append(o,el);const prev=document.activeElement;
  const close=()=>{el.classList.remove('open');o.classList.remove('open');setTimeout(()=>{o.remove();el.remove()},380);pilha=pilha.filter(c=>c!==close);onClose&&onClose();prev&&prev.focus&&prev.focus({preventScroll:true})};
  o.onclick=close;el.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();close()}});
  requestAnimationFrame(()=>requestAnimationFrame(()=>{o.classList.add('open');el.classList.add('open');const f=$('button',el);f&&f.focus({preventScroll:true})}));
  pilha.push(close);return close;
}
K.closeTop=()=>{const c=pilha[pilha.length-1];c&&c()};
/* folha que sobe: arraste o puxador para baixo para fechar */
K.sheet=({title='',body='',ok='',cancel='Cancelar',onOk,cheia=false,on={}})=>{
  const el=document.createElement('section');el.className='msheet'+(cheia?' cheia':'');el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',title);
  el.innerHTML=`<div class="grab" aria-hidden="true"></div><div class="mh"><div class="l">${cancel?`<button type="button" data-c>${esc(cancel)}</button>`:''}</div><h2>${esc(title)}</h2><div class="r">${ok?`<button type="button" class="ok" data-ok>${esc(ok)}</button>`:''}</div></div><div class="mb">${body}</div>`;
  const close=cobrir(el);
  const c=$('[data-c]',el);if(c)c.onclick=close;
  const okb=$('[data-ok]',el);if(okb)okb.onclick=()=>{if(onOk&&onOk(el)===false)return;close()};
  let y0=null,dy=0;const g=$('.grab',el),mh=$('.mh',el);
  [g,mh].forEach(h=>{h.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;y0=e.clientY;el.style.transition='none';h.setPointerCapture(e.pointerId)});
    h.addEventListener('pointermove',e=>{if(y0==null)return;dy=Math.max(0,e.clientY-y0);el.style.setProperty('--dy',dy+'px')});
    h.addEventListener('pointerup',()=>{if(y0==null)return;y0=null;el.style.transition='';if(dy>120)close();else el.style.setProperty('--dy','0px');dy=0})});
  M.wire(el,on);K.bindSwipe(el);return {el,close};
};
/* formulário de toque: mesmos campos do computador ({k,label,type,opts,req,ph,value}) em linhas agrupadas */
K.field=f=>{const id='m_'+f.k,v=f.value??'',req=f.req?' <b class="req" aria-hidden="true">*</b>':'';
  if(f.type==='textarea')return `<label class="fr full" for="${id}"><span class="fl">${esc(f.label)}${req}</span><textarea id="${id}" name="${f.k}" placeholder="${esc(f.ph||'')}">${esc(v)}</textarea></label>`;
  if(f.type==='select')return `<label class="fr" for="${id}"><span class="fl">${esc(f.label)}${req}</span><select id="${id}" name="${f.k}" style="text-align-last:right">${(f.ph?[['',f.ph]]:[]).concat(f.opts.map(o=>Array.isArray(o)?o:[o,o])).map(([a,b])=>`<option value="${esc(a)}" ${a===v?'selected':''}>${esc(b)}</option>`).join('')}</select></label>`;
  if(f.type==='toggle')return `<div class="fr" style="display:flex;align-items:center;min-height:48px;padding:0 16px;background:var(--panel)"><span class="fl" style="flex:1;width:auto" id="${id}_l">${esc(f.label)}</span><button type="button" class="sw" role="switch" aria-checked="${!!v}" aria-labelledby="${id}_l" data-toggle="${f.k}"></button></div>`;
  const tp=f.type==='money'?'text':(f.type||'text'),im=f.type==='money'?'inputmode="decimal"':f.type==='tel'?'inputmode="tel"':f.type==='email'?'inputmode="email"':'';
  return `<label class="fr" for="${id}"><span class="fl">${esc(f.label)}${req}</span><input id="${id}" name="${f.k}" type="${tp}" ${im} placeholder="${esc(f.ph||(f.req?'Obrigatório':'Opcional'))}" value="${esc(v)}"></label>`};
K.form=(groups)=>`<div class="mf">${groups.map(g=>`<section class="grp">${g.title?`<h2>${esc(g.title)}</h2>`:''}<div class="lst">${g.fields.map(K.field).join('')}</div>${g.foot?`<div class="foot">${esc(g.foot)}</div>`:''}</section>`).join('')}</div>`;
K.formSheet=({title,groups,ok='Salvar',onOk,cheia=true})=>{
  const fields=groups.flatMap(g=>g.fields);
  const s=K.sheet({title,ok,cheia,body:K.form(groups),onOk:el=>{const v={};let bad=null;
    fields.forEach(f=>{const e=$(`[name="${f.k}"]`,el);let val;if(f.type==='toggle')val=$(`[data-toggle="${f.k}"]`,el).getAttribute('aria-checked')==='true';else val=e?e.value.trim():'';
      v[f.k]=val;const row=(e||$(`[data-toggle="${f.k}"]`,el)).closest('.fr');const miss=f.req&&!val;row&&row.classList.toggle('err',!!miss);if(miss&&!bad)bad=e});
    if(bad){bad.focus();M.toast('Preencha os campos obrigatórios.');return false}
    return onOk&&onOk(v)}});
  $$('[data-toggle]',s.el).forEach(b=>b.onclick=()=>b.setAttribute('aria-checked',b.getAttribute('aria-checked')!=='true'));
  return s;
};
/* folha de ações (como o "Compartilhar"/"Apagar" do iPhone) */
K.actions=({title='',items=[]})=>{const el=document.createElement('div');el.className='asheet';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',title||'Ações');
  el.innerHTML=`<div class="ag">${title?`<p>${esc(title)}</p>`:''}${items.map((it,i)=>`<button type="button" data-i="${i}" class="${it.dng?'dng':''}">${esc(it.label)}</button>`).join('')}</div><div class="ag"><button type="button" class="can" data-c>Cancelar</button></div>`;
  const close=cobrir(el);$('[data-c]',el).onclick=close;$$('[data-i]',el).forEach(b=>b.onclick=()=>{close();items[+b.dataset.i].run&&items[+b.dataset.i].run()})};
K.confirm=({title,text='',ok='Confirmar',dng=false,run})=>K.actions({title:title+(text?' — '+text:''),items:[{label:ok,dng,run}]});

/* ---------- casca: barra de abas, rotas, título que encolhe ---------- */
function tabbar(){const t=tabs();
  $('#tabbar').innerHTML=[...t.map(k=>{const m=mod(k);return `<a href="#/${k}" data-k="${k}" aria-label="${m[1]}"><span class="ic">${ic(m[2],24)}</span><span>${m[1]}</span></a>`}),
   `<a href="#/mais" data-k="mais" aria-label="Mais"><span class="ic">${ic('grade',24)}</span><span>Mais</span></a>`].join('');
  mark();
  let lp;const tb=$('#tabbar');tb.onpointerdown=()=>{lp=setTimeout(()=>{K.editarBarra()},650)};['pointerup','pointerleave','pointercancel'].forEach(e=>tb.addEventListener(e,()=>clearTimeout(lp)));
}
function mark(){const k=cur&&(M.mscreens[cur]||{}).tab||cur, naBarra=tabs().includes(k);
  $$('#tabbar a').forEach(a=>{const on=naBarra?a.dataset.k===k:a.dataset.k==='mais';a.classList.toggle('on',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')})}
/* editar a barra: escolher os 4 botões (cada pessoa a sua) */
K.editarBarra=()=>{let sel=[...tabs()];
  const draw=el=>{$('.mb',el).innerHTML=`<p class="soft" style="margin:0 0 16px;font-size:15px">Escolha 4 botões para a barra. O 5º é sempre “Mais”. A ordem é a da escolha.</p>
    ${K.group({title:'Na barra ('+sel.length+' de 4)',rows:sel.map((k,i)=>({icon:mod(k)[2],title:mod(k)[1],value:'Tirar',act:'tirar',i,chev:false}))})}
    ${K.group({title:'Disponíveis',rows:K.MODS.filter(m=>!sel.includes(m[0])).map(m=>({icon:m[2],title:m[1],value:sel.length<4?'Pôr':'',act:'por',i:m[0],chev:false}))})}`;
    $('[data-ok]',el).disabled=sel.length!==4;
    M.wire($('.mb',el),{tirar:b=>{sel.splice(+b.dataset.i,1);draw(el)},por:b=>{if(sel.length>=4)return M.toast('Tire um botão antes de pôr outro.');sel.push(b.dataset.i);draw(el)}})};
  const s=K.sheet({title:'Editar barra',ok:'OK',cheia:true,onOk:()=>{cfg().mtabs=sel;M.save();tabbar();M.toast('Barra atualizada.')}});
  $('#tabbar').classList.add('editando');const o=s.close;s.el.addEventListener('transitionend',()=>{if(!s.el.isConnected)$('#tabbar').classList.remove('editando')});
  setTimeout(()=>{const ob=new MutationObserver(()=>{if(!s.el.isConnected){$('#tabbar').classList.remove('editando');ob.disconnect()}});ob.observe(document.body,{childList:true})},0);
  draw(s.el);
};
let cur=null,prevHash='',voltando=false;
K.back=()=>{voltando=true;history.length>1?history.back():(location.hash='#/'+(M.mscreens[cur]||{}).tab||'dashboard')};
function route(){
  const h=(location.hash.replace(/^#\/?/,'')||'dashboard').split('?');let k=h[0];
  if(!M.mscreens[k]){k=M.mscreens.dashboard?'dashboard':Object.keys(M.mscreens)[0];}
  const sc=M.mscreens[k],q=new URLSearchParams(h[1]||'');M.q=q;
  const prof=[...q.keys()].length, eraProf=prevHash.split('?')[1]?1:0, mesmaTela=prevHash.split('?')[0]===k;
  const dir=voltando?'esq':(mesmaTela&&prof>eraProf)||(!tabs().includes(k)&&k!=='mais'&&prevHash&&!mesmaTela&&!voltando)?'dir':'';
  voltando=false;prevHash=location.hash.replace(/^#\/?/,'')||'dashboard';cur=k;
  M.apply(); const r=document.documentElement; if(cfg().style==='auto')r.dataset.style=sc.style||'discreto'; if(cfg().glass==='auto')r.dataset.glass=sc.glass||'controles';
  const v=$('#view'); v.innerHTML=sc.render(q); v.classList.remove('entra-dir','entra-esq'); if(dir){void v.offsetWidth;v.classList.add('entra-'+dir)}
  document.title=`${sc.title} · Maestro OS`; scrollTo({top:0});
  $$('[data-back]',v).forEach(b=>b.onclick=K.back);
  sc.mount&&sc.mount(v,q); M.wire(v,{}); K.bindSwipe(v); M.count&&M.count(v);
  const lt=$('.lt',v);document.documentElement.classList.remove('scrolled');
  if(K._io){K._io.disconnect();K._io=null} /* um observador por tela: o da tela anterior sai */
  if(lt&&'IntersectionObserver' in window)(K._io=new IntersectionObserver(([e])=>document.documentElement.classList.toggle('scrolled',!e.isIntersecting),{rootMargin:'-56px 0px 0px 0px'})).observe(lt);
  mark();
}
M.mstart=()=>{
  document.documentElement.classList.add('cel');
  document.body.insertAdjacentHTML('afterbegin',`<div class="atmo" aria-hidden="true"><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div></div>
   <main><div id="view"></div></main><span class="tab-aura" aria-hidden="true"></span><nav class="tabbar" id="tabbar" aria-label="Navegação principal"></nav>
   <div class="menu" id="menu" role="menu"></div><div class="toast ctl" id="toast" role="status" aria-live="polite"><span id="toastMsg"></span><button class="btn sm ghost" id="toastAct" hidden></button></div>`);
  tabbar(); addEventListener('hashchange',route); route();
};

/* ---------- telas da casca: Mais e Aparência ---------- */
M.mscreen('mais',{title:'Mais',tab:'mais',render:()=>`${K.nav({title:'Mais'})}
  ${K.group({title:'Módulos',rows:K.MODS.filter(m=>!tabs().includes(m[0])).map(m=>({icon:m[2],title:m[1],href:'#/'+m[0]}))})}
  ${K.group({title:'Personalizar',rows:[{icon:'grade',title:'Editar barra de baixo',sub:'Escolha os 4 botões da sua barra',act:'barra'},{icon:'aparencia',title:'Aparência',sub:'Cor, tema, aura, transparência',act:'apar'}]})}
  ${K.group({rows:[{icon:'casa',color:'#8e8e93',title:'Versão para computador',href:'index.html?desktop=1'},{icon:'sair',color:'rgb(var(--neg))',title:'Sair',act:'sair'}]})}`,
  mount:v=>M.wire(v,{barra:()=>K.editarBarra(),apar:()=>K.aparencia(),sair:()=>K.confirm({title:'Sair do Maestro?',ok:'Sair',dng:true,run:()=>M.toast('Saiu (simulação).')})})});
K.aparencia=()=>{const s=K.sheet({title:'Aparência',ok:'OK',cancel:'',cheia:true,body:`<div id="pop" class="pop open m-apar">${M.panelHTML()}</div>`});
  const h=$('#pop h2',s.el);h&&h.remove(); M.bindPanel(); M.syncPanel()};
})();

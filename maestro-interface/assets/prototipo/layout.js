/* Maestro OS · protótipo · Layouts por página + edição da tela (estilo iPhone)
   • Layout "Padrão" = Modelo A + Arranjo Padrão + Densidade Compacta + nenhum bloco editado.
   • Por página, ao vivo: Modelo (quando a tela tem mais de um), Arranjo (Padrão · Coluna única · Lateral), Densidade.
   • Editar a tela: toque e segure um bloco (ou "Editar tela") → os blocos tremem; arraste para mover,
     (−) tira, ⤢ muda a largura; "Itens tirados" devolve; "Concluído" salva. Tudo salvo por página e modelo.
   Os blocos são reconhecidos sozinhos em qualquer tela (cartões, seções, quadros): nenhum módulo precisa mudar. */
(function(){
const {$,$$,ic,esc}=M;
const ARR=[['padrao','Padrão','A grade de 12 colunas, como foi desenhada.'],['coluna','Coluna única','Tudo numa coluna central, um bloco por vez.'],['lateral','Lateral','Título, ações e filtros fixos à esquerda.']];
const cfg=()=>M.cfg();
const key=()=>{const k=M.cur();return k+':'+M.variantOf(k)};
const edits=()=>cfg().edits[key()]||(cfg().edits[key()]={order:{},hidden:[],span:{}});
const isDefault=k=>M.variantOf(k)===Object.keys(M.screens[k].variants)[0]&&(cfg().layout[k]||'padrao')==='padrao'&&!hasEdits();
const hasEdits=()=>{const e=cfg().edits[key()];return !!e&&(e.hidden.length||Object.keys(e.order).length||Object.keys(e.span).length)};

/* ---------- blocos da tela ---------- */
function bar(view){const h=$(':scope > .head',view);const n=h&&h.nextElementSibling;return n&&n.matches('.row')?n:null}
function blocks(){
  const view=$('#view'), root=$('.lat-main',view)||view, out=[];
  const skip=new Set([$(':scope > .head',view),bar(view),$('.lat-side',view)].filter(Boolean));
  const expand=(el,depth)=>{
    if(skip.has(el)||el.matches('.lat-side,script,style'))return;
    if(el.matches('.grid:not(.board), .stack')&&el.children.length>1){[...el.children].forEach(c=>expand(c,depth+1));return}
    if(depth<3&&el.matches('div:not(.card):not(.board):not(.grid):not(.stack)')&&el.children.length&&![...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())){[...el.children].forEach(c=>expand(c,depth+1));return}
    if(el.offsetParent===null&&!el.hidden)return;
    out.push(el);
  };
  [...root.children].forEach(c=>expand(c,0));
  const seen={};
  out.forEach(b=>{const h=$('h1,h2,h3,.kick,.colh b,.lbl,b',b);let id=(h?h.textContent:b.textContent).trim().replace(/\s+/g,' ').slice(0,40)||'bloco';
    seen[id]=(seen[id]||0)+1; if(seen[id]>1)id+=' #'+seen[id]; b.dataset.bloco=id;});
  return out;
}
const label=b=>b.dataset.bloco.replace(/ #\d+$/,'');
/* aplica o que foi editado (ordem, ocultos, largura) */
function applyEdits(){
  const e=cfg().edits[key()]; const bs=blocks(); if(!e)return;
  bs.forEach(b=>{b.hidden=e.hidden.includes(b.dataset.bloco); const sp=e.span[b.dataset.bloco]; if(sp&&b.parentNode.matches('.grid'))b.style.gridColumn=`span ${sp}`});
  const parents=new Set(bs.map(b=>b.parentNode));
  parents.forEach(p=>{const ord=e.order[p.dataset.blocoPai||pid(p)];if(!ord)return;
    ord.forEach(id=>{const c=[...p.children].find(x=>x.dataset.bloco===id);if(c)p.appendChild(c)})});
}
const pid=p=>{if(!p.dataset.blocoPai){const all=[...new Set(blocks().map(b=>b.parentNode))];p.dataset.blocoPai='p'+all.indexOf(p)}return p.dataset.blocoPai};

/* ---------- arranjo ---------- */
function applyArranjo(k){
  const a=cfg().layout[k]||'padrao', view=$('#view'), html=document.documentElement; html.dataset.layout=a;
  if(a!=='lateral')return;
  const h=$(':scope > .head',view); if(!h)return;
  const b=bar(view), side=document.createElement('aside'), main=document.createElement('div');
  side.className='lat-side'; main.className='lat-main';
  side.append(h); if(b)side.append(b);
  [...view.children].forEach(c=>main.append(c)); view.append(side,main);
}

/* ---------- botão e painel "Layout" ---------- */
function updButton(){const k=M.cur(),n=$('#layoutName');if(!n)return;
  const a=ARR.find(x=>x[0]===(cfg().layout[k]||'padrao'))[1], v=M.variantOf(k), vs=M.screens[k].variants;
  n.textContent=isDefault(k)?'Padrão':(Object.keys(vs).length>1?vs[v].label+' · ':'')+a+(hasEdits()?' · editado':'')}
const thumb=a=>{const c='currentColor';return `<svg viewBox="0 0 96 64" width="96" height="64" aria-hidden="true"><rect x="1" y="1" width="94" height="62" rx="8" fill="none" stroke="${c}" opacity=".25"/>${
  a==='padrao'?`<rect x="8" y="8" width="40" height="6" rx="2" fill="${c}" opacity=".7"/><rect x="8" y="20" width="24" height="16" rx="3" fill="${c}" opacity=".3"/><rect x="36" y="20" width="24" height="16" rx="3" fill="${c}" opacity=".3"/><rect x="64" y="20" width="24" height="16" rx="3" fill="${c}" opacity=".3"/><rect x="8" y="40" width="52" height="16" rx="3" fill="${c}" opacity=".3"/><rect x="64" y="40" width="24" height="16" rx="3" fill="${c}" opacity=".3"/>`
  :a==='coluna'?`<rect x="24" y="8" width="32" height="6" rx="2" fill="${c}" opacity=".7"/><rect x="24" y="20" width="48" height="10" rx="3" fill="${c}" opacity=".3"/><rect x="24" y="34" width="48" height="10" rx="3" fill="${c}" opacity=".3"/><rect x="24" y="48" width="48" height="8" rx="3" fill="${c}" opacity=".3"/>`
  :`<rect x="8" y="8" width="22" height="6" rx="2" fill="${c}" opacity=".7"/><rect x="8" y="18" width="22" height="4" rx="2" fill="${c}" opacity=".4"/><rect x="8" y="26" width="22" height="4" rx="2" fill="${c}" opacity=".4"/><rect x="36" y="8" width="52" height="22" rx="3" fill="${c}" opacity=".3"/><rect x="36" y="34" width="52" height="22" rx="3" fill="${c}" opacity=".3"/>`}</svg>`};
function openPanel(btn){
  let p=$('#layoutPop'); if(p){p.remove();btn.setAttribute('aria-expanded','false');return}
  p=document.createElement('aside');p.id='layoutPop';p.className='pop ctl open lay-pop';p.setAttribute('role','dialog');p.setAttribute('aria-label','Layout desta página');document.body.append(p);
  btn.setAttribute('aria-expanded','true');
  const draw=()=>{const k=M.cur(),sc=M.screens[k],vs=Object.entries(sc.variants),v=M.variantOf(k),a=cfg().layout[k]||'padrao';
    p.innerHTML=`<div class="lr"><h2>Layout · ${esc(sc.title)}</h2>${isDefault(k)?'<span class="chip g">Padrão</span>':'<button class="btn sm ghost" data-l="reset">Voltar ao Padrão</button>'}</div>
     ${vs.length>1?`<div class="sec"><span class="lbl">Modelo da página</span><div class="seg in" role="group" aria-label="Modelo">${vs.map(([id,o])=>`<button type="button" data-mod="${id}" aria-pressed="${id===v}">${esc(o.label)}</button>`).join('')}</div></div>`:''}
     <div class="sec"><span class="lbl">Arranjo</span><div class="lay-arr">${ARR.map(([id,n,d])=>`<button type="button" data-arr="${id}" aria-pressed="${id===a}" title="${esc(d)}">${thumb(id)}<b>${n}</b></button>`).join('')}</div>
       <div class="hint">${esc(ARR.find(x=>x[0]===a)[2])}</div></div>
     <div class="sec"><span class="lbl">Densidade das listas</span><div class="seg in" role="group" aria-label="Densidade">${[['compacta','Compacta'],['confortavel','Confortável']].map(([d,l])=>`<button type="button" data-den="${d}" aria-pressed="${cfg().dens===d}">${l}</button>`).join('')}</div><div class="hint">Vale para todas as páginas.</div></div>
     <div class="sec"><button type="button" class="btn pri" data-l="edit" style="width:100%">${ic('alca',20)}Editar esta tela</button><div class="hint">Ou toque e segure em qualquer bloco da página.</div>
       ${hasEdits()?`<button type="button" class="btn ghost" data-l="limpar" style="width:100%">Desfazer edições desta tela</button>`:''}</div>`;
    $$('[data-mod]',p).forEach(b=>b.onclick=()=>{cfg().variant[k]=b.dataset.mod;M.save();M.renderCur();draw()});
    $$('[data-arr]',p).forEach(b=>b.onclick=()=>{cfg().layout[k]=b.dataset.arr;M.save();M.renderCur();draw()});
    $$('[data-den]',p).forEach(b=>b.onclick=()=>{cfg().dens=b.dataset.den;M.save();document.documentElement.dataset.dens=b.dataset.den;M.renderCur();draw()});
    const r=$('[data-l="reset"]',p); if(r)r.onclick=()=>{cfg().variant[k]=vs[0][0];delete cfg().layout[k];Object.keys(cfg().edits).filter(x=>x.startsWith(k+':')).forEach(x=>delete cfg().edits[x]);M.save();M.renderCur();draw()};
    const lm=$('[data-l="limpar"]',p); if(lm)lm.onclick=()=>{delete cfg().edits[key()];M.save();M.renderCur();draw()};
    $('[data-l="edit"]',p).onclick=()=>{p.remove();btn.setAttribute('aria-expanded','false');enterEdit()};
  };
  draw(); $('button',p).focus();
  setTimeout(()=>document.addEventListener('click',function off(e){if(!p.isConnected){document.removeEventListener('click',off);return}const path=e.composedPath();if(!path.includes(p)&&!path.includes(btn)){p.remove();btn.setAttribute('aria-expanded','false');document.removeEventListener('click',off)}}),0);
  p.addEventListener('keydown',e=>{if(e.key==='Escape'){p.remove();btn.focus()}});
}

/* ---------- modo de edição ---------- */
let editing=false, barEl=null;
function enterEdit(){
  if(editing)return; editing=true; const html=document.documentElement; html.classList.add('editando');
  const bs=blocks();
  bs.forEach(b=>{b.classList.add('blk');
    const inGrid=b.parentNode.matches('.grid');
    b.insertAdjacentHTML('beforeend',`<span class="blk-ui"><button type="button" class="blk-x" aria-label="Tirar “${esc(label(b))}” da tela" title="Tirar da tela">−</button>${inGrid?`<button type="button" class="blk-w" aria-label="Mudar a largura de “${esc(label(b))}”" title="Mudar largura">${ic('grade',16)}</button>`:''}</span>`);
    $('.blk-x',b).onclick=e=>{e.stopPropagation();hide(b)};
    const w=$('.blk-w',b); if(w)w.onclick=e=>{e.stopPropagation();resize(b)};
    b.addEventListener('pointerdown',dragStart);
    b.tabIndex=0; b.addEventListener('keydown',kbMove);
  });
  barEl=document.createElement('div');barEl.className='edit-bar ctl';barEl.setAttribute('role','toolbar');barEl.setAttribute('aria-label','Edição da tela');
  drawBar(); document.body.append(barEl);
  M.toast('Arraste para mover · (−) tira · ⊞ muda a largura · Alt+↑/↓ no teclado');
}
function drawBar(){const e=edits(), n=e.hidden.length;
  barEl.innerHTML=`<b>Editando esta tela</b><span class="spacer"></span>
   <button type="button" class="btn" data-e="hidden" ${n?'':'disabled'}>Itens tirados${n?' ('+n+')':''}</button>
   <button type="button" class="btn" data-e="reset">Restaurar</button>
   <button type="button" class="btn pri" data-e="ok">Concluído</button>`;
  $('[data-e="ok"]',barEl).onclick=exitEdit;
  $('[data-e="reset"]',barEl).onclick=()=>{delete cfg().edits[key()];M.save();exitEdit(true)};
  $('[data-e="hidden"]',barEl).onclick=ev=>M.menu(ev.currentTarget,edits().hidden.map(id=>({label:'Devolver “'+id.replace(/ #\d+$/,'')+'”',icon:'mais',run:()=>{
    const b=$(`[data-bloco="${CSS.escape(id)}"]`,$('#view'));edits().hidden=edits().hidden.filter(x=>x!==id);if(b)b.hidden=false;M.save();drawBar()}})));
}
function exitEdit(rerender){
  editing=false; document.documentElement.classList.remove('editando');
  $$('.blk').forEach(b=>{b.classList.remove('blk','arrastando');$('.blk-ui',b)?.remove();b.removeEventListener('pointerdown',dragStart);b.removeEventListener('keydown',kbMove);b.removeAttribute('tabindex');b.style.transform=''});
  barEl&&barEl.remove(); barEl=null; M.save(); updButton();
  if(rerender===true)M.renderCur(); else M.toast('Tela salva.');
}
function hide(b){const id=b.dataset.bloco;edits().hidden.push(id);b.hidden=true;M.save();drawBar();
  M.toast(`“${label(b)}” saiu da tela.`,'Desfazer',()=>{edits().hidden=edits().hidden.filter(x=>x!==id);b.hidden=false;M.save();drawBar()})}
function resize(b){const W=[3,4,6,8,12];const cur=parseInt((b.style.gridColumn||'').replace(/\D/g,''))||+(b.className.match(/\bs(\d+)\b/)||[0,12])[1]||12;
  const nx=W[(W.indexOf(W.find(x=>x>=cur)??12)+1)%W.length];b.style.gridColumn=`span ${nx}`;edits().span[b.dataset.bloco]=nx;M.save();
  M.toast(`Largura: ${nx} de 12 colunas`)}
function saveOrder(p){edits().order[pid(p)]=[...p.children].filter(c=>c.dataset.bloco).map(c=>c.dataset.bloco);M.save()}
function kbMove(e){if(!e.altKey||(e.key!=='ArrowUp'&&e.key!=='ArrowDown'&&e.key!=='ArrowLeft'&&e.key!=='ArrowRight'))return;e.preventDefault();
  const b=e.currentTarget,p=b.parentNode,sib=[...p.children].filter(c=>c.classList.contains('blk')&&!c.hidden),i=sib.indexOf(b),up=e.key==='ArrowUp'||e.key==='ArrowLeft';
  const t=sib[up?i-1:i+1]; if(!t)return; up?p.insertBefore(b,t):p.insertBefore(b,t.nextSibling); saveOrder(p); b.focus()}
/* arrastar com ponteiro (mouse e toque), reflow ao vivo como no iPhone */
let drag=null;
function dragStart(e){
  if(e.target.closest('.blk-ui')||e.button>0)return; const b=e.currentTarget; e.preventDefault();
  const r=b.getBoundingClientRect(); drag={b,offX:e.clientX-r.left,offY:e.clientY-r.top,tx:0,ty:0};
  b.classList.add('arrastando'); b.setPointerCapture(e.pointerId);
  b.addEventListener('pointermove',dragMove); b.addEventListener('pointerup',dragEnd,{once:true}); b.addEventListener('pointercancel',dragEnd,{once:true});
}
function dragMove(e){ if(!drag)return; const {b}=drag;
  const r=b.getBoundingClientRect(), natL=r.left-drag.tx, natT=r.top-drag.ty;
  drag.tx=e.clientX-drag.offX-natL; drag.ty=e.clientY-drag.offY-natT; b.style.transform=`translate(${drag.tx}px,${drag.ty}px) scale(1.02)`;
  b.style.pointerEvents='none'; const under=document.elementFromPoint(e.clientX,e.clientY); b.style.pointerEvents='';
  const t=under&&under.closest('.blk'); if(!t||t===b||t.parentNode!==b.parentNode)return;
  const tr=t.getBoundingClientRect(), after=(e.clientY>tr.top+tr.height/2)||(Math.abs(e.clientY-(tr.top+tr.height/2))<tr.height/4&&e.clientX>tr.left+tr.width/2);
  const before=b.getBoundingClientRect(); after?b.parentNode.insertBefore(b,t.nextSibling):b.parentNode.insertBefore(b,t);
  const now=b.getBoundingClientRect(); drag.tx-=now.left-before.left; drag.ty-=now.top-before.top; b.style.transform=`translate(${drag.tx}px,${drag.ty}px) scale(1.02)`;
}
function dragEnd(){ if(!drag)return; const {b}=drag; b.removeEventListener('pointermove',dragMove); b.classList.remove('arrastando'); b.style.transform=''; saveOrder(b.parentNode); drag=null }

/* toque e segure (600 ms) em qualquer bloco entra no modo de edição */
let lp=null;
function bindLongPress(){
  const view=$('#view'); if(view._lp)return; view._lp=1;
  view.addEventListener('pointerdown',e=>{ if(editing||e.button>0||e.target.closest('input,textarea,select,[contenteditable],.board .kcard,[draggable="true"],[data-handle]'))return;
    const x=e.clientX,y=e.clientY; lp={x,y,t:setTimeout(()=>{lp=null;const blk=blocks().find(b=>b.contains(e.target));if(!blk)return;
      window.addEventListener('click',ev=>{ev.stopPropagation();ev.preventDefault()},{capture:true,once:true});enterEdit();},600)}});
  const cancel=e=>{if(lp&&(!e.clientX||Math.hypot(e.clientX-lp.x,e.clientY-lp.y)>8||e.type!=='pointermove')){clearTimeout(lp.t);lp=null}};
  ['pointerup','pointercancel','pointermove','scroll'].forEach(ev=>view.addEventListener(ev,cancel,{passive:true}));
}

/* ---------- liga tudo após cada render ---------- */
let mo=null;
M.afterRender.push(k=>{
  if(editing)exitEdit(); applyArranjo(k); applyEdits(); updButton(); bindLongPress();
  if(mo)mo.disconnect(); mo=new MutationObserver(()=>{if(editing)return;clearTimeout(mo._t);mo._t=setTimeout(()=>{mo.disconnect();applyEdits();mo.observe($('#view'),{childList:true,subtree:true})},60)});
  mo.observe($('#view'),{childList:true,subtree:true});
});
const ob=()=>{const b=$('#openLayout');if(b&&!b._ok){b._ok=1;b.onclick=e=>{e.stopPropagation();openPanel(b)}}};
const st=M.start; M.start=()=>{st();ob();updButton()};
})();

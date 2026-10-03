/* Maestro OS · protótipo · casca: tema configurável, topo, dock, rotas, opções por tela */
(function(){
const M = window.M = { screens:{} };
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
M.$=$; M.$$=$$;
M.brl = n => 'R$ ' + n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
M.brl0 = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
M.esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- ícones (traço 1.8, 24) ---------- */
const P = {
 inicio:'M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z', buscar:'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm9 16-4-4',
 chat:'M4 5h16v11H9l-5 4z', atividades:'M3 12h4l3-7 4 14 3-7h4', agenda:'M4 6h16v14H4zM4 10h16M8 3v4m8-4v4',
 contatos:'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-6 9a6 6 0 0 1 12 0m1-9a3 3 0 1 0 0-6m5 15a6 6 0 0 0-5-5.9',
 negocios:'M3 9l3-4h12l3 4-9 11zM3 9h18M9 9l3 11 3-11', propostas:'M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h6',
 projetos:'M3 6h7l2 2h9v12H3z', painel:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
 financeiro:'M3 7h16v12H3zM3 11h18v4H3m12 1h2', compras:'M3 4h3l2 11h10l2-8H7m1 15a1 1 0 1 0 0 .1m8 0a1 1 0 1 0 0 .1',
 estoque:'M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm-4 9a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm8 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0z',
 fiscal:'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12 4 7.5',
 ajustes:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0-5v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3l-2.1 2.1',
 sino:'M6 16V11a6 6 0 1 1 12 0v5l2 2H4zm4 4h4', aparencia:'M4 6h10m4 0h2M4 12h4m4 0h8M4 18h12m4 0h0M16 4v4M10 10v4M18 16v4',
 mais:'M12 5v14M5 12h14', voltar:'M15 6l-6 6 6 6', seta:'M9 6l6 6-6 6', baixo:'M6 9l6 6 6-6', x:'M6 6l12 12M18 6 6 18',
 lixo:'M5 7h14M10 7V4h4v3m-7 0 1 13h8l1-13', copiar:'M8 8h12v12H8zM4 16V4h12', olho:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zm10-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
 enviar:'M4 12 20 4l-6 16-3-7z', check:'M5 12l5 5 9-10', arrastar:'M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01',
 brilho:'M12 3v3m0 12v3M3 12h3m12 0h3M12 8l1.5 2.5L16 12l-2.5 1.5L12 16l-1.5-2.5L8 12l2.5-1.5z', filtro:'M4 5h16l-6 8v6l-4-2v-4z',
 relogio:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4v5l3 2', pontos:'M5 12h.01M12 12h.01M19 12h.01', alca:'M9 5h.01M15 5h.01M9 12h.01M15 12h.01M9 19h.01M15 19h.01',
 chip:'M7 7h10v10H7zM4 10h3M4 14h3M17 10h3M17 14h3M10 4v3M14 4v3M10 17v3M14 17v3', wifi:'M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01',
 som:'M4 9h4l5-4v14l-5-4H4zM17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11', luz:'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z',
 neve:'M12 2v20M4.9 7l14.2 10M4.9 17 19.1 7M9 4l3 3 3-3M9 20l3-3 3 3', camera:'M3 7h4l2-3h6l2 3h4v12H3zM12 10a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z',
 chave:'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z', caixa:'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10', trocar:'M4 8h13l-3-3m6 11H7l3 3', coracao:'M12 20s-7-4.5-9-9a4.5 4.5 0 0 1 9-2 4.5 4.5 0 0 1 9 2c-2 4.5-9 9-9 9z',
 livro:'M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6M20 4v14h-6', barras:'M4 20V10M10 20V4M16 20v-7M22 20H2', sair:'M10 4H5v16h5M14 8l4 4-4 4M18 12H9',
 upload:'M12 16V4M7 9l5-5 5 5M4 20h16', telefone:'M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z', email:'M3 6h18v12H3zM3 7l9 6 9-6', zap:'M5 19l1.5-4A8 8 0 1 1 9 18z', estrela:'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z', kanban:'M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v13h-4z', lista:'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01', grade:'M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z', casa:'M3 11 12 3l9 8v10h-6v-6H9v6H3z', doc:'M6 3h9l4 4v14H6zM14 3v5h5'
};
M.ic = (k,s=20)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[k]||''}"/></svg>`;

/* ---------- preferências ---------- */
const DEF = {aura:true,auraI:55,transp:true,transpI:70,glass:'auto',theme:'claro',pal:'maestro',style:'auto',dens:'compacta',labels:true,variant:{},layout:{},edits:{},v:2};
let cfg = DEF;
try{ cfg = Object.assign({},DEF,JSON.parse(localStorage.getItem('maestro-proto')||'{}')); cfg.variant = cfg.variant||{}; cfg.layout=cfg.layout||{}; cfg.edits=cfg.edits||{};
  if(cfg.v!==2){ cfg.dens='compacta'; cfg.v=2; } /* a antiga Confortável virou Compacta (02/10/2026) */ }catch(e){ cfg = {...DEF,variant:{},layout:{},edits:{}}; }
const save = ()=>{ try{ localStorage.setItem('maestro-proto',JSON.stringify(cfg)); }catch(e){} };
M.cfg = ()=>cfg; M.save = ()=>save(); M.afterRender=[];

let cur = null;
function apply(){
  const r = document.documentElement, sc = M.screens[cur]||{};
  const dark = cfg.theme==='escuro' || (cfg.theme==='auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  r.dataset.theme = dark?'dark':'light';
  r.dataset.pal = cfg.pal;
  if(cfg.pal==='custom'&&cfg.palC){ /* cor personalizada: escurece até o texto branco ter contraste 4,5:1 */
    let [R,G,B]=[1,3,5].map(i=>parseInt(cfg.palC.slice(i,i+2),16));
    const lum=(a,b,c)=>[a,b,c].map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
    while(1.05/(lum(R,G,B)+.05)<4.5&&R+G+B>0){R=Math.round(R*.94);G=Math.round(G*.94);B=Math.round(B*.94)}
    const soft=[R,G,B].map(v=>Math.round(v+(255-v)*.45));
    r.style.setProperty('--primary',`${R} ${G} ${B}`);r.style.setProperty('--primary-soft',soft.join(' '));r.style.setProperty('--accent','52 199 89');
  } else { ['--primary','--primary-soft','--accent'].forEach(v=>r.style.removeProperty(v)); }
  r.dataset.aura = cfg.aura?'on':'off';
  r.dataset.transp = cfg.transp?'on':'off';
  r.dataset.glass = cfg.glass==='auto' ? (sc.glass||'controles') : cfg.glass;
  r.dataset.style = cfg.style==='auto' ? (sc.style||'discreto') : cfg.style;
  r.dataset.dens = cfg.dens;
  r.dataset.labels = cfg.labels?'on':'off';
  const t = cfg.transpI; // 0 = opaco · 100 = máximo transparente
  const ctl = Math.max(12, Math.min(94, 100 - t + (dark?8:0)));
  r.style.setProperty('--mix-ctl', ctl+'%');
  r.style.setProperty('--mix-card', Math.min(94, ctl+30)+'%');
  r.style.setProperty('--aura', (cfg.auraI/100*0.95).toFixed(2));
  syncPanel();
}

/* ---------- casca ---------- */
/* dock — idêntica à versão B de saidas/teste-liquid-glass-dock/index.html (16 itens, mesmos ícones e medidas).
   Decisão do Allysson (02/10/2026): + item "Mais" antes de Ajustes, com Técnica, Experiência, IA Fiscal, Catálogo, Relatórios e Numbers. */
const DP={home:'M3 11 12 3l9 8v10h-6v-6H9v6H3z',projetos2:'M3 6h7l2 2h9v12H3zM8 13h2m4 0h2'};
const DOCK = [['home','Home','dashboard'],['buscar','Buscar','@spot'],['chat','Chat','@chat'],['atividades','Atividades','atividades'],['trocar','Nexos','nexos'],
 ['agenda','Agenda','agenda'],['contatos','Contatos','contatos'],['negocios','Negócios','negocios'],['propostas','Propostas','propostas'],['projetos2','Projetos','projetos'],
 ['painel','Painel 360','painel360'],['financeiro','Financeiro','financeiro'],['compras','Compras','compras'],['estoque','Estoque','estoque']];
const DOCK_MAIS = [['chave','Técnica','tecnica'],['coracao','Experiência','experiencia'],['fiscal','IA Fiscal','fiscal'],['livro','Catálogo','catalogo'],['doc','Relatórios','relatorios'],['barras','Numbers','numbers']];
const DOCK_FIM = [['ajustes','Ajustes','ajustes'],['sair','Sair','@sair']];
const dIc=k=>DP[k]?`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${DP[k]}"/></svg>`:M.ic(k,26);
const dockItem=(d,i)=>{const act=d[2][0]==='@';return `<a href="${act?'#':'#/'+d[2]}" style="--i:${i}" data-k="${act?'':d[2]}" ${act?`data-dact="${d[2].slice(1)}"`:''} aria-label="${d[1]}"><span class="ic">${dIc(d[0])}</span><span class="lb">${d[1]}</span></a>`};
function layoutDock(){
  const dock=$('#dock'); if(!dock)return;
  if(!$('.dock-aura')) dock.insertAdjacentHTML('beforebegin','<span class="dock-aura a1" aria-hidden="true"></span><span class="dock-aura a2" aria-hidden="true"></span>');
  dock.classList.add('entra');
  dock.innerHTML='<span class="glint"></span>'+DOCK.map(dockItem).join('')+
    `<a href="#" style="--i:${DOCK.length}" data-dact="mais" data-mais aria-label="Mais módulos" aria-haspopup="menu"><span class="ic">${M.ic('grade',26)}</span><span class="lb">Mais</span></a>`+
    '<span class="sep" aria-hidden="true"></span>'+DOCK_FIM.map((d,i)=>dockItem(d,DOCK.length+1+i)).join('');
  $$('a[data-dact]',dock).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();(M.dock[a.dataset.dact]||(()=>{}))(a)}));
  const ics=$$('.ic',dock), reduce=matchMedia('(prefers-reduced-motion: reduce)').matches, MAG=1.4, SIG=84;
  dock.onmousemove=e=>{const r=dock.getBoundingClientRect(),x=e.clientX-r.left;dock.style.setProperty('--gx',x+'px');dock.classList.add('hover');
    if(reduce)return; ics.forEach(ic=>{const b=ic.getBoundingClientRect(),c=b.left+b.width/2-r.left,d=Math.abs(x-c);ic.style.transform=`scale(${(1+(MAG-1)*Math.exp(-(d*d)/(2*SIG*SIG))).toFixed(3)})`});};
  dock.onmouseleave=()=>{dock.classList.remove('hover');ics.forEach(ic=>ic.style.transform='')};
  markDock();
}
function markDock(){const sc=M.screens[cur]||{},k=sc.dock||cur;$$('#dock a').forEach(a=>a.classList.toggle('on',a.hasAttribute('data-mais')?DOCK_MAIS.some(d=>d[2]===k):!!a.dataset.k&&a.dataset.k===k))}
M.dock={ mais:a=>M.menu(a,DOCK_MAIS.map(d=>({label:d[1],icon:d[0],run:()=>location.hash='#/'+d[2]}))), spot:()=>M.spotlight&&M.spotlight(), chat:()=>M.chat&&M.chat(),
  sair:a=>M.confirm?M.confirm({title:'Sair do Maestro?',text:'Você volta para a tela de entrada.',ok:'Sair',run:()=>M.toast('Saiu (simulação).')}):M.toast('Sair (simulação).') };

function shell(){
  document.body.insertAdjacentHTML('afterbegin',`
  <div class="atmo" aria-hidden="true"><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div><div class="blob b4"></div></div>
  <div class="grain" aria-hidden="true"></div>
  <main>
    <header class="topbar ctl">
      <div class="brand"><span class="mark">M</span><span class="crumb" id="crumb"></span></div>
      <button type="button" class="btn" id="openLayout" aria-haspopup="dialog" aria-expanded="false" title="Layout desta página">${M.ic('grade',20)}<span id="layoutName">Padrão</span>${M.ic('baixo',16)}</button>
      <span class="spacer"></span>
      <button class="topsearch" id="openSpot" type="button" aria-label="Buscar em tudo (⌘K)" style="text-align:left;color:var(--faint);cursor:pointer">Buscar <span class="kbd" style="float:right">⌘K</span></button>
      <button class="btn icon round help" id="openSup" aria-label="Ajuda e suporte desta tela" aria-expanded="false" aria-controls="sup">?</button>
      <button class="btn icon round rel" id="openBell" aria-label="Notificações, 3 não lidas" aria-haspopup="dialog">${M.ic('sino')}<span class="badge">3</span></button>
      <button class="btn icon round" id="openPop" aria-label="Aparência" aria-expanded="false" aria-controls="pop">${M.ic('aparencia')}</button>
      <button class="btn icon round" id="openConta" aria-label="Conta: Allysson Moura" aria-haspopup="menu" style="font-weight:700;font-size:13px">AM</button>
    </header>
    <div id="view"></div>
  </main>
  <nav class="dock ctl" id="dock" aria-label="Navegação principal"></nav>
  <aside class="pop ctl" id="pop" aria-label="Aparência">${panelHTML()}</aside>
  <aside class="sup ctl" id="sup" aria-label="Ajuda e suporte"></aside>
  <div class="menu" id="menu" role="menu"></div>
  <div class="toast ctl" id="toast" role="status" aria-live="polite"><span id="toastMsg"></span><button class="btn sm ghost" id="toastAct" hidden></button></div>`);

  layoutDock();
  $('#openSpot').onclick=()=>M.spotlight&&M.spotlight();
  $('#openBell').onclick=e=>{e.stopPropagation();M.bell&&M.bell($('#openBell'))};
  $('#openConta').onclick=e=>{const b=e.currentTarget;M.menu(b,[{label:'Central de Ajustes',icon:'ajustes',run:()=>location.hash='#/ajustes'},{label:'Minha conta',icon:'contatos',run:()=>M.toast('Minha conta (simulação).')},
    {label:'Aparência',icon:'aparencia',run:()=>$('#openPop').click()},{label:'Novidades',icon:'brilho',run:()=>M.toast('Novidades: vídeos curtos do que mudou.')},
    {label:'Suporte',icon:'chat',run:()=>$('#openSup').click()},{label:'Refazer tour',icon:'seta',run:()=>M.toast('Tour reiniciado (simulação).')},'-',{label:'Sair',icon:'sair',danger:true,run:()=>M.dock.sair()}])};
  addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();M.spotlight&&M.spotlight()}});
  // aura que segue o mouse (momento-assinatura do modo editorial)
  let raf=0; addEventListener('mousemove',e=>{ if(raf||document.documentElement.dataset.style!=='editorial')return; raf=requestAnimationFrame(()=>{raf=0;
    const r=document.documentElement; r.style.setProperty('--mx',(e.clientX/innerWidth*100)+'%'); r.style.setProperty('--my',(e.clientY/innerHeight*100)+'%');});});
  // painel
  const pairs=[[$('#pop'),$('#openPop')],[$('#sup'),$('#openSup')]];
  pairs.forEach(([pan,btn])=>{
    btn.onclick=e=>{e.stopPropagation();const o=!pan.classList.contains('open');pairs.forEach(([p,b])=>{p.classList.remove('open');b.setAttribute('aria-expanded','false')});
      if(o){if(pan.id==='sup')supHTML();pan.classList.add('open');btn.setAttribute('aria-expanded','true')}};
    pan.addEventListener('keydown',e=>{if(e.key==='Escape'){pan.classList.remove('open');btn.focus()}});
  });
  document.addEventListener('click',e=>{pairs.forEach(([pan,btn])=>{if(!pan.contains(e.target)&&!btn.contains(e.target)){pan.classList.remove('open');btn.setAttribute('aria-expanded','false')}});
    const m=$('#menu');if(!m.contains(e.target))m.classList.remove('open')});
  addEventListener('scroll',()=>$('#menu').classList.remove('open'),{passive:true});
  bindPanel();
}

/* ---------- Suporte "?" (contextual por tela) ---------- */
function supHTML(){
  const sc=M.screens[cur]||{}, h=sc.help||['Use as abas no topo da página para trocar de área.','O botão azul à direita é a ação principal desta tela.'];
  $('#sup').innerHTML=`<div class="lr" style="display:flex;align-items:center;gap:12px"><h2 style="margin:0;font-size:17px;font-weight:700;flex:1">Ajuda · ${sc.title||''}</h2><button class="btn sm icon ghost" aria-label="Fechar" data-close>${M.ic('x',16)}</button></div>
   <div class="lbl mt16">Como usar esta tela</div><ol>${h.map(t=>`<li>${t}</li>`).join('')}</ol>
   <div class="lbl mt24" style="margin-bottom:12px">Precisa de ajuda?</div>
   <div class="btnrow"><button class="btn" data-sup="Abrimos uma conversa com o suporte (simulação).">Falar com o suporte</button><button class="btn" data-sup="Solicitação aberta: o suporte recebe esta tela e o que você estava fazendo (simulação).">Relatar um problema</button></div>`;
  $('[data-close]',$('#sup')).onclick=()=>{$('#sup').classList.remove('open');$('#openSup').focus()};
  $$('[data-sup]',$('#sup')).forEach(b=>b.onclick=()=>{$('#sup').classList.remove('open');M.toast(b.dataset.sup)});
}
/* ---------- menu de ações (⋯) ---------- */
M.menu=(anchor,items)=>{const m=$('#menu'),r=anchor.getBoundingClientRect();
  m.innerHTML=items.map((it,i)=>it==='-'?'<hr>':`<button role="menuitem" data-i="${i}" class="${it.danger?'danger':''}">${it.icon?M.ic(it.icon,16):''}${it.label}</button>`).join('');
  m.style.top=Math.min(innerHeight-20-items.length*40,r.bottom+6)+'px'; m.style.left=Math.max(16,r.right-240)+'px';
  $$('button',m).forEach(b=>b.onclick=e=>{e.stopPropagation();m.classList.remove('open');items[+b.dataset.i].run();anchor.focus()});
  m.onkeydown=e=>{const bs=$$('button',m),k=bs.indexOf(document.activeElement);if(e.key==='Escape'){m.classList.remove('open');anchor.focus()}
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();bs[(k+(e.key==='ArrowDown'?1:-1)+bs.length)%bs.length].focus()}};
  requestAnimationFrame(()=>{m.classList.add('open');$('button',m).focus()});
};

/* ---------- painel Aparência ---------- */
const seg = (key,opts)=>`<div class="seg in" role="group" data-seg="${key}">${opts.map(([v,l])=>`<button type="button" data-v="${v}" aria-pressed="false">${l}</button>`).join('')}</div>`;
function panelHTML(){ return `
  <div class="lr"><h2>Aparência</h2><button class="btn sm ghost" id="reset">Restaurar</button></div>
  <div class="sec">
    <div class="lr"><b id="lAura">Aura</b><button class="sw" role="switch" aria-checked="true" aria-labelledby="lAura" data-sw="aura"></button></div>
    <div class="hint">A luz colorida atrás do vidro.</div>
    <div class="rng" data-rng="auraI"><input type="range" min="0" max="100" step="5" aria-label="Intensidade da aura"><output></output></div>
  </div>
  <div class="sec">
    <div class="lr"><b id="lTr">Transparência</b><button class="sw" role="switch" aria-checked="true" aria-labelledby="lTr" data-sw="transp"></button></div>
    <div class="hint">Desligada, tudo fica sólido.</div>
    <div class="rng" data-rng="transpI"><input type="range" min="0" max="90" step="5" aria-label="Quanto transparente"><output></output></div>
    <span class="lbl">Onde tem vidro</span>
    ${seg('glass',[['auto','Automático'],['tudo','Em tudo'],['controles','Só controles']])}
    <div class="hint">Automático: em tudo no Início, só nos controles nas demais.</div>
  </div>
  <div class="sec">
    <span class="lbl">Estilo dos títulos</span>
    ${seg('style',[['auto','Automático'],['editorial','Editorial'],['discreto','Discreto']])}
    <span class="lbl">Tema</span>
    ${seg('theme',[['claro','Claro'],['escuro','Escuro'],['auto','Sistema']])}
    <span class="lbl">Cor</span>
    <div class="pals" data-seg="pal">${[['maestro','#0a84ff','Azul Maestro'],['grafite','#485468','Grafite'],['terracota','#d64828','Terracota'],['floresta','#128c64','Floresta'],['ametista','#7858f8','Ametista'],
      ['oceano','#007a8c','Oceano'],['petroleo','#1e506e','Petróleo'],['indigo','#4f46e5','Índigo'],['rubi','#c81e46','Rubi'],['rosa','#c42878','Rosa'],
      ['cobre','#a85428','Cobre'],['ambar','#a06400','Âmbar'],['oliva','#607020','Oliva'],['noite','#1c1c20','Noite']]
      .map(([v,c,l])=>`<button type="button" data-v="${v}" aria-pressed="false" aria-label="${l}" title="${l}" style="background:${c}"></button>`).join('')}
      <label class="cust" title="Personalizada: escolha qualquer cor"><input type="color" id="corPers" aria-label="Cor personalizada" value="#0a84ff"></label></div>
  </div>
  <div class="sec">
    <span class="lbl">Densidade das listas</span>
    ${seg('dens',[['compacta','Compacta'],['confortavel','Confortável']])}
    <div class="lr"><b id="lLb">Nomes na dock</b><button class="sw" role="switch" aria-checked="true" aria-labelledby="lLb" data-sw="labels"></button></div>
  </div>`; }
function bindPanel(){
  const pop=$('#pop');
  $$('[data-sw]',pop).forEach(b=>b.onclick=()=>{cfg[b.dataset.sw]=!cfg[b.dataset.sw];save();apply()});
  $$('[data-rng] input',pop).forEach(i=>i.oninput=()=>{cfg[i.parentNode.dataset.rng]=+i.value;save();apply()});
  $$('[data-seg] button',pop).forEach(b=>b.onclick=()=>{cfg[b.parentNode.dataset.seg]=b.dataset.v;save();apply()});
  const cp=$('#corPers',pop); cp.oninput=()=>{cfg.pal='custom';cfg.palC=cp.value;save();apply()};
  $('#reset').onclick=()=>{const v=cfg.variant;cfg={...DEF,variant:v};save();apply()};
}
function syncPanel(){
  const pop=$('#pop'); if(!pop)return;
  $$('[data-sw]',pop).forEach(b=>b.setAttribute('aria-checked',!!cfg[b.dataset.sw]));
  $$('[data-rng]',pop).forEach(r=>{const k=r.dataset.rng,i=$('input',r);i.value=cfg[k];$('output',r).textContent=cfg[k]+'%';
    r.classList.toggle('off',(k==='auraI'&&!cfg.aura)||(k==='transpI'&&!cfg.transp))});
  const cu=$('label.cust',pop); if(cu){cu.setAttribute('aria-pressed',cfg.pal==='custom');if(cfg.palC)$('#corPers',pop).value=cfg.palC}
  $$('[data-seg]',pop).forEach(s=>$$('button',s).forEach(b=>{b.setAttribute('aria-pressed',cfg[s.dataset.seg]===b.dataset.v);
    if(s.dataset.seg==='glass')b.disabled=!cfg.transp}));
}

/* ---------- rotas e opções ---------- */
M.screen = (k,def)=>{ M.screens[k]=def; };
M.cur=()=>cur; M.variantOf=k=>{const sc=M.screens[k];return sc.variants[cfg.variant[k]]?cfg.variant[k]:Object.keys(sc.variants)[0]};
M.renderCur=()=>route();
function route(){
  const h=(location.hash.replace(/^#\/?/,'')||'dashboard').split('?');
  const k=M.screens[h[0]]?h[0]:'dashboard'; const sc=M.screens[k];
  M.q=new URLSearchParams(h[1]||'');
  const q=new URLSearchParams(h[1]||'');
  if(q.get('v')&&sc.variants[q.get('v')]) cfg.variant[k]=q.get('v');
  const v=sc.variants[cfg.variant[k]]?cfg.variant[k]:Object.keys(sc.variants)[0];
  cur=k; apply();
  $('#crumb').innerHTML=`<small>Maestro</small>${sc.title}`;
  markDock();
  render(k,v);
}
function render(k,v){
  const sc=M.screens[k], o=sc.variants[v];
  $('#view').innerHTML=o.render();
  document.title=`${sc.title} · Maestro OS`;
  scrollTo({top:0});
  M.tabs(); M.count();
  o.mount&&o.mount($('#view'));
  M.afterRender.forEach(f=>{try{f(k,v)}catch(e){console.error(e)}});
  const t=$('.ptitle'); document.body.classList.remove('scrolled');
  if(t&&'IntersectionObserver' in window){ new IntersectionObserver(([e])=>document.body.classList.toggle('scrolled',!e.isIntersecting),{rootMargin:'-72px 0px 0px 0px'}).observe(t); }
}

/* ---------- utilidades de tela ---------- */
M.head = ({kick,title,sub,acts=''})=>`<div class="head rv"><div class="t"><div class="kick">${kick}</div><h1 class="ptitle">${title}</h1>${sub?`<p class="psub">${sub}</p>`:''}</div><div class="acts">${acts}</div></div>`;
M.tabsHTML = (arr,on=0,cls='ctl',label='Seções')=>`<div class="tabs ${cls}" role="tablist" aria-label="${label}" data-tabs><span class="pill"></span>${arr.map((t,i)=>`<button class="tab ${i===on?'on':''}" role="tab" aria-selected="${i===on}" type="button">${t}</button>`).join('')}</div>`;
M.tabs = (root=document)=>$$('[data-tabs]',root).forEach(t=>{
  if(t._ok)return; t._ok=1;
  const pill=$('.pill',t), bs=$$('.tab',t);
  const place=b=>{pill.style.left=b.offsetLeft+'px';pill.style.width=b.offsetWidth+'px'};
  requestAnimationFrame(()=>place($('.tab.on',t)||bs[0]));
  bs.forEach((b,i)=>b.addEventListener('click',()=>{bs.forEach(x=>{x.classList.remove('on');x.setAttribute('aria-selected','false')});b.classList.add('on');b.setAttribute('aria-selected','true');place(b);
    t.dispatchEvent(new CustomEvent('tab',{detail:i}))}));
});
M.count = (root=document)=>$$('[data-count]',root).forEach(el=>{
  const end=+el.dataset.count, dec=+(el.dataset.dec||0), pre=el.dataset.pre||'';
  const fmt=v=>pre+v.toLocaleString('pt-BR',{minimumFractionDigits:dec,maximumFractionDigits:dec});
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=fmt(end);return}
  const t0=performance.now(), D=1400; const step=t=>{const p=Math.min(1,(t-t0)/D), e=1-Math.pow(1-p,4); el.textContent=fmt(end*e); if(p<1)requestAnimationFrame(step)}; requestAnimationFrame(step);
});
let tt; M.toast=(msg,act,fn)=>{const t=$('#toast');$('#toastMsg').textContent=msg;const a=$('#toastAct');a.hidden=!act;if(act){a.textContent=act;a.onclick=()=>{fn&&fn();t.classList.remove('show')}}
  t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),act?6000:2600)};

addEventListener('hashchange',()=>{if(!document.documentElement.classList.contains('cel'))route()});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',apply);
M.start=()=>{shell();route()};
/* partilhado com a versão de celular (celular.js) */
M.apply=()=>apply(); M.panelHTML=()=>panelHTML(); M.bindPanel=()=>bindPanel(); M.syncPanel=()=>syncPanel();
})();

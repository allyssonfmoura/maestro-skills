/* Maestro OS · protótipo · Construtor de propostas (discreto, testável)
   Estrutura igual à real : Proposta → até 3 opções → ambientes → itens;
   kits (linha-mãe = soma das filhas); mão de obra % por ambiente.
   Passos reais: 1 Itens · 2 Opções · 3 Documento · 4 Enviar.
   Novo: foto na linha, arrastar para reordenar e para outro ambiente (também por teclado: Alt+↑/↓). */
(function(){
const {ic,brl,$,$$,esc}=M;

/* ---------- responsivo (02/10/2026) ----------
   Tudo responde à largura do próprio contêiner (container query), não da janela: assim o Padrão,
   a Coluna única e o Lateral ficam certos em qualquer tela. Faixas do #stepbox/#bbox: larga ≥1000,
   média 640–999, estreita <640. A tabela de itens esconde a coluna Unitário abaixo de 720 px
   (o unitário desce para baixo do subtotal) e, abaixo de 600 px, rola dentro do cartão. */
(()=>{if(document.getElementById('rsp-construtor'))return;const st=document.createElement('style');st.id='rsp-construtor';st.textContent=`
.cs-head .t{align-self:stretch;width:100%;min-width:0}
.cs-head input.ptitle{text-overflow:ellipsis}
.cs-box{container:cs/inline-size}
.cs-items{container:csitens/inline-size}
.cs-tbl{table-layout:fixed;width:100%}
.cs-tbl th{position:relative}
.cs-tbl .cs-unit2{display:none}
.cs-step{display:flex;gap:4px;justify-content:center;align-items:center;flex-wrap:nowrap!important}
.cs-step .input{width:44px;text-align:center;padding:0 4px;flex:none}
.cs-step .btn{flex:none}
.cs-name{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
/* "Kit · N itens": botão de 36 inteiro e visível (antes ficava cortado pela linha de 12 px) */
.cs-tbl .cs-ktw{overflow:visible!important}
.cs-kt{margin:2px 0 -4px -12px;font-size:12px;height:36px}
.cs-kt .bt{font-size:12px}
.cs-mo td{white-space:normal}
.cs-mo .lbl{flex-wrap:wrap;row-gap:4px}
.cs-kid .cs-kname{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cs-paper{container:cspaper/inline-size;background:#fff;color:#14161b;border-radius:16px;box-shadow:0 0 0 1px rgba(0,0,0,.06),0 24px 60px -24px rgba(0,0,0,.35);padding:48px;font-size:13px;line-height:1.5}
.cs-paper-opts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:32px 0}
.cs-like .bt{min-width:0}
.cs-env{align-self:start}
.cs-env p{max-width:64ch}
/* faixas da tela inteira do construtor */
@container cs (min-width:1000px){
  .cs-box .grid>.cs-side{grid-column:span 3}.cs-box .grid>.cs-items{grid-column:span 9}
  .cs-box .grid>.cs-opt{grid-column:span 4}
  .cs-box .grid>.cs-docset{grid-column:span 4}.cs-box .grid>.cs-docprev{grid-column:span 8}
  .cs-box .grid>.cs-bmain{grid-column:span 8}.cs-box .grid>.cs-bside{grid-column:span 4}
}
@container cs (max-width:999px){
  .cs-box .grid>.cs-side{grid-column:span 12;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
  .cs-box .grid>.cs-side>*{align-self:start}
  .cs-box .grid>.cs-items,.cs-box .grid>.cs-docprev,.cs-box .grid>.cs-bmain{grid-column:span 12}
  .cs-box .grid>.cs-opt{grid-column:span 12}
  .cs-box .grid>.cs-docset{grid-column:span 12;position:static!important;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:32px;align-items:start}
  .cs-box .grid>.cs-docset>.ch{grid-column:1/-1}
  .cs-box .grid>.cs-bside{grid-column:span 12;position:static!important;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
  .cs-box .grid>.cs-bside>.card{margin:0!important}
}
@container cs (max-width:639px){
  .cs-box .grid>.cs-side{display:contents}
  .cs-box .grid>.cs-side>*{grid-column:1/-1}
  .cs-box .grid>.cs-side>nav{order:1}.cs-box .grid>.cs-items{order:2}.cs-box .grid>.cs-side>aside{order:3}
  .cs-box .grid>.cs-env{grid-column:span 12}
  .cs-box .grid>.cs-docset,.cs-box .grid>.cs-bside{grid-template-columns:minmax(0,1fr)}
}
/* tabela de itens: largura do próprio cartão */
@container csitens (max-width:719px){
  .cs-tbl .cs-unit{display:none}
  .cs-tbl .cs-unit2{display:block}
}
/* cartão estreito (celular, coluna lateral apertada): cada item vira um bloco de duas linhas —
   alça · produto · ⋯ em cima; quantidade · subtotal embaixo */
@container csitens (max-width:559px){
  .cs-tbl,.cs-tbl tbody{display:block}
  .cs-tbl thead{display:none}
  .cs-tbl tr{display:grid;grid-template-columns:36px minmax(0,1fr) auto 36px;grid-template-areas:"h p p m" ". q s s";align-items:center;column-gap:8px;row-gap:8px;padding:12px 12px 12px 8px;border-bottom:1px solid var(--line-2)}
  .cs-tbl tbody tr:last-child{border-bottom:0}
  .cs-tbl td{display:block;height:auto;padding:0!important;border:0!important;min-width:0}
  .cs-tbl .cs-h{grid-area:h}.cs-tbl .cs-p{grid-area:p}.cs-tbl .cs-q{grid-area:q}.cs-tbl .cs-s{grid-area:s}.cs-tbl .cs-m{grid-area:m}
  .cs-tbl .cs-unit{display:none}
  .cs-tbl .cs-q .cs-step{justify-content:flex-start}
  .cs-tbl .cs-kid .cs-p{padding-left:16px!important}
  .cs-tbl .cs-mo{grid-template-areas:"h p p m" ". . s s"}
}
/* B · Documento vivo: cartão de ambiente estreito (celular) — cada item em duas linhas:
   alça · foto · produto · ⋯ em cima; quantidade · subtotal embaixo */
.cs-bamb{container:csbamb/inline-size}
@container csbamb (max-width:559px){
  .cs-bli{display:grid!important;grid-template-columns:36px 40px minmax(0,1fr) auto 36px;grid-template-areas:"h t n n m" ". q q s s";column-gap:8px!important;row-gap:8px;padding:12px 12px 12px 8px!important}
  .cs-bli>.cs-bh{grid-area:h}.cs-bli>.thumb{grid-area:t}.cs-bli>.cs-bn{grid-area:n}.cs-bli>.cs-bq{grid-area:q}.cs-bli>.cs-bs{grid-area:s;width:auto!important}.cs-bli>.cs-bm{grid-area:m}
  .cs-bmo{grid-template-areas:"h t n n m" ". . . s s"}
  .cs-bamb>.ch b.num{white-space:nowrap}
}
/* resumo estreito: barra do comparativo desce para a linha de baixo */
.cs-sum{container-type:inline-size;width:100%}
.cs-cmp{display:grid!important;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"l v" "b b";row-gap:6px;height:auto!important;padding:8px!important}
.cs-cmp .cs-cmp-l{grid-area:l;width:auto!important}.cs-cmp .cs-cmp-b{grid-area:b}.cs-cmp .cs-cmp-v{grid-area:v;width:auto!important}
@container (min-width:340px){
  .cs-cmp{grid-template-columns:96px minmax(0,1fr) 96px;grid-template-areas:"l b v";height:36px!important;padding:0 8px!important}
}
/* folha do documento */
@container cspaper (max-width:640px){
  .cs-paper{padding:24px}
  .cs-paper-opts{grid-template-columns:minmax(0,1fr)}
  .cs-paper h2{font-size:24px!important}
}
/* folha estreita: o preço do item desce para baixo do nome (o nome ganha a largura toda) */
@container cspaper (max-width:479px){
  .cs-pl{grid-template-columns:minmax(0,1fr)!important;row-gap:4px!important}
  .cs-pl.cs-pli{grid-template-columns:40px minmax(0,1fr)!important}
  .cs-pl>.cs-pp{grid-column:-2;text-align:left!important}
}
`;document.head.append(st)})();

/* catálogo: id, nome, marca, modelo, preço, unidade, categoria */
const CAT=[
 ['c4','Controlador de automação CORE 5','Control4','C4-CORE5',11800,'UN','auto'],['u7','Access point Wi-Fi 7 de teto U7-Pro','Ubiquiti','UBI-U7PRO',1590,'UN','rede'],
 ['u7o','Access point externo Wi-Fi 7','Ubiquiti','UBI-U7OUT',1690,'UN','rede'],['amp','Amplificador de streaming Amp','Sonos','SON-AMP',4290,'UN','audio'],
 ['rp','Caixa central RP-504C II','Klipsch','KLI-RP504C',3890,'UN','audio'],['cx','Caixa acústica de embutir 6,5"','Klipsch','KLI-CDT5650',600,'PR','audio'],
 ['sub','Subwoofer 10 polegadas','Klipsch','KLI-R100SW',1800,'UN','audio'],['rcv','Receiver AV 7.2 canais','Denon','DEN-X1800',4000,'UN','audio'],
 ['cam','Câmera IP bullet 2 MP','Intelbras','INT-VIP3230B',420,'UN','seg'],['nvr','Gravador NVR 8 canais','Intelbras','INT-NVD1408',1290,'UN','seg'],
 ['cat6','Cabo de rede CAT6','Furukawa','CAB-CAT6',4.2,'MT','rede'],['fita','Fita LED 24V 3000K 10W/m','Stella','STH-FITA24',62,'MT','luz'],
 ['perf','Perfil de embutir com difusor','Stella','STH-PERFIL',48,'MT','luz'],['drv','Fonte para LED 24V 150W','Stella','STH-DRIVER',210,'UN','luz'],
 ['spot','Spot de embutir recuado 7W 2700K','Stella','STH-SPOT7',118,'UN','luz'],['ar','Ar-condicionado split inverter 12.000 BTUs','LG','LG-DUAL12',2890,'UN','clima'],
 ['int','Interruptor inteligente 4 teclas','Control4','C4-KD120',350,'UN','auto'],['dim','Módulo dimmer','Control4','C4-DIM1',250,'UN','auto'],
 ['mot','Motor de cortina','Somfy','SOM-GLYDEA',900,'UN','auto'],['tv','Suporte articulado para TV 75"','ELG','ELG-A02V8',780,'UN','audio'],
 ['proj','Projeto luminotécnico','Maestro','SRV-LUMI',3500,'PROJ','srv'],['vis','Visita técnica','Maestro','SRV-VISITA',450,'VISITA','srv']]
 .map(([id,n,b,m,p,u,c])=>({id,n,b,m,p,u,c}));
const KITS=[
 {id:'kcine',n:'Kit Cinema 5.1',b:'Maestro',m:'KIT-CINE51',u:'KT',c:'kit',kids:[['rcv',1],['rp',1],['cx',2],['sub',1]]},
 {id:'kcftv',n:'Kit Segurança 4 câmeras',b:'Maestro',m:'KIT-CFTV4',u:'KT',c:'kit',kids:[['cam',4],['nvr',1],['cat6',80]]},
 {id:'kled',n:'Kit Sanca de LED (5 m)',b:'Maestro',m:'KIT-SANCA5',u:'KT',c:'kit',kids:[['fita',5],['perf',5],['drv',1]]}];
const ALL=[...CAT,...KITS];
const C=id=>ALL.find(c=>c.id===id);
const CATICON={auto:'chip',rede:'wifi',audio:'som',luz:'luz',clima:'neve',seg:'camera',srv:'chave',kit:'caixa'};
const thumb=(c,sm)=>`<span class="thumb${sm?' sm':''}" data-cat="${c.c}" aria-hidden="true">${ic(CATICON[c.c]||'chip',sm?16:20)}</span>`;
const it=(id,q)=>{const c=C(id);return c.kids?{id,q,p:null,open:false,kit:c.kids.map(([k,n])=>({id:k,q:n}))}:{id,q,p:null}};
const clone=o=>JSON.parse(JSON.stringify(o));

const ST=window.__prop||(window.__prop={
  nome:'Residência Duarte — Automação',cliente:'Helena Duarte',step:0,opt:1,amb:0,link:null,
  doc:{modelo:true,imagem:true,resumo:true,completa:false,preco:true,fmt:'reais'},
  opts:[{n:'Essencial',f:'O essencial bem feito, pronto para crescer.',d:0,likely:false},
        {n:'Completa',f:'A casa inteira num app só.',d:5,likely:true},
        {n:'Premium',f:'O melhor de cada categoria.',d:0,likely:false}],
  ambs:[
   {n:'Sala de estar',mo:12,auto:true,it:[[it('c4',1),it('int',2),it('cx',2)],[it('c4',1),it('kcine',1),it('int',3),it('dim',2),it('mot',2)],[it('c4',1),it('kcine',1),it('int',3),it('dim',4),it('amp',2),it('mot',2),it('tv',1)]]},
   {n:'Cozinha',mo:12,auto:true,it:[[it('int',1)],[it('int',2),it('kled',1)],[it('int',2),it('kled',2),it('spot',6)]]},
   {n:'Suíte master',mo:12,auto:true,it:[[it('int',1),it('ar',1)],[it('int',2),it('ar',1),it('mot',1),it('spot',4)],[it('int',2),it('ar',1),it('mot',2),it('spot',6),it('amp',1),it('cx',2)]]},
   {n:'Área externa',mo:15,auto:true,it:[[it('cam',2)],[it('kcftv',1),it('u7o',1)],[it('kcftv',1),it('cam',2),it('u7o',2),it('spot',8)]]},
   {n:'Rack técnico',mo:10,auto:true,it:[[it('u7',1),it('cat6',120)],[it('u7',3),it('cat6',305)],[it('u7',4),it('cat6',305),it('vis',1)]]}]
});

/* ---------- contas ---------- */
const price=x=>x.p??(x.kit?x.kit.reduce((s,k)=>s+k.q*C(k.id).p,0):C(x.id).p);
const prod=(a,o)=>a.it[o].reduce((s,x)=>s+x.q*price(x),0);
const mo=(a,o)=>prod(a,o)*a.mo/100;
const ambT=(a,o)=>prod(a,o)+mo(a,o);
const optT=o=>ST.ambs.reduce((s,a)=>s+ambT(a,o),0);
const optF=o=>optT(o)*(1-ST.opts[o].d/100);
const nItems=o=>ST.ambs.reduce((s,a)=>s+a.it[o].length,0);
const checks=()=>[['Pelo menos um produto na proposta',ST.ambs.some(a=>a.it.some(l=>l.length))],['Nenhum ambiente vazio',ST.ambs.every(a=>a.it[ST.opt].length)],
  ['Imagens do projeto',true],['Cliente vinculado',!!ST.cliente]];
const fmtV=(v,o)=>ST.doc.fmt==='curto'?'R$ '+Math.round(v/1000)+'k':ST.doc.fmt==='pct'&&o>0?(v>=optF(0)?'+':'')+Math.round((v/optF(0)-1)*100)+'%':brl(v);

/* ---------- salvar ---------- */
let sv; const saved=()=>{const s=$('#saved');if(!s)return;s.textContent='Salvando…';clearTimeout(sv);sv=setTimeout(()=>{const d=new Date();s.textContent=`Salvo às ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`},700)};

/* ---------- cabeçalho comum ---------- */
const header=()=>`<div class="head rv cs-head" style="padding-bottom:16px">
  <div class="t"><a class="btn sm ghost" href="#/propostas" style="margin-left:-12px">${ic('voltar',16)}Propostas</a>
    <input class="ptitle" data-titulo id="pnome" value="${esc(ST.nome)}" aria-label="Nome da proposta" style="display:block;border:0;background:transparent;outline:none;padding:0;width:100%;min-width:0;color:inherit;margin:8px 0 0">
    <p class="psub"><span class="chip n">Rascunho</span>&nbsp; ${esc(ST.cliente)} · <span id="saved">Salvo às 14:32</span></p></div>
  <div class="acts"><button type="button" class="btn ctl" data-go="2">${ic('olho')}<span class="bt">Ver documento</span></button><button type="button" class="btn pri" data-go="3">${ic('enviar')}<span class="bt">Gerar pra cliente</span></button></div></div>`;
const bindHeader=v=>{const i=$('#pnome',v);i.oninput=()=>{ST.nome=i.value;saved()};$$('[data-go]',v).forEach(b=>b.onclick=()=>{ST.step=+b.dataset.go;M.cfg().variant.construtor='A';M.rerender()})};

const optSeg=(id='optseg',cls='ctl',w='480px')=>`<div class="seg ${cls}" id="${id}" role="group" aria-label="Opção em edição" style="width:min(${w},100%)">${ST.opts.map((o,i)=>`<button type="button" data-opt="${i}" aria-pressed="${i===ST.opt}">${o.likely?'★ ':''}${i+1} · ${esc(o.n)}</button>`).join('')}</div>`;
const bindOpt=(v,cb)=>$$('[data-opt]',v).forEach(b=>b.onclick=()=>{ST.opt=+b.dataset.opt;$$('[data-opt]',v).forEach(x=>x.setAttribute('aria-pressed',x===b));cb()});

/* ---------- busca de produto ---------- */
function searchBox(ph){return `<div class="rel" data-search><input class="input" placeholder="${ph}" aria-label="Buscar produto para adicionar" autocomplete="off">
  <ul role="listbox" hidden style="position:absolute;left:0;right:0;top:48px;z-index:30;list-style:none;margin:0;padding:6px;max-height:352px;overflow:auto;border-radius:14px;background:var(--panel);box-shadow:0 0 0 1px var(--line),0 24px 48px -16px rgba(0,0,0,.35)"></ul></div>`}
function bindSearch(box,onPick){
  const inp=$('input',box),ul=$('ul',box);let res=[],k=0;
  const paint=()=>$$('li[data-i]',ul).forEach((li,i)=>{li.setAttribute('aria-selected',i===k);li.style.background=i===k?'rgb(var(--primary)/.1)':''});
  const draw=()=>{const q=inp.value.trim().toLowerCase();if(!q){ul.hidden=true;return}
    res=ALL.filter(c=>(c.n+' '+c.b+' '+c.m+(c.kids?' kit':'')).toLowerCase().includes(q)).slice(0,7);k=0;
    ul.innerHTML=res.length?res.map((c,i)=>`<li role="option" data-i="${i}" style="display:flex;align-items:center;gap:12px;height:52px;padding:0 12px;border-radius:10px;cursor:pointer">
      ${thumb(c,true)}<div style="flex:1;min-width:0"><div style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.n}${c.kids?' <span class="chip b" style="height:20px">Kit · '+c.kids.length+' itens</span>':''}</div><div class="lbl" style="font-size:12px">${c.b} · ${c.m}</div></div>
      <b class="num">${brl(c.kids?c.kids.reduce((s,[id,n])=>s+n*C(id).p,0):c.p)}</b><span class="lbl" style="width:48px">/${c.u.toLowerCase()}</span></li>`).join('')
      :`<li class="lbl" style="padding:12px">Nada no catálogo com “${esc(inp.value)}”.</li>`;
    ul.hidden=false;paint();$$('li[data-i]',ul).forEach(li=>{li.onmousedown=e=>{e.preventDefault();pick(+li.dataset.i)};li.onmouseenter=()=>{k=+li.dataset.i;paint()}})};
  const pick=i=>{const c=res[i];if(!c)return;onPick(c);inp.value='';ul.hidden=true};
  inp.oninput=draw; inp.onblur=()=>setTimeout(()=>ul.hidden=true,120);
  inp.onkeydown=e=>{if(ul.hidden)return;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();k=(k+(e.key==='ArrowDown'?1:-1)+res.length)%res.length;paint()}
    if(e.key==='Enter'){e.preventDefault();pick(k)} if(e.key==='Escape'){ul.hidden=true}};
}

/* ---------- operações com itens ---------- */
const addItem=(a,c)=>{const l=a.it[ST.opt],x=!c.kids&&l.find(y=>y.id===c.id);x?x.q++:l.push(it(c.id,1));saved();M.toast(`${c.n} · adicionado em ${a.n}`)};
const removeItem=(a,i,redraw)=>{const l=a.it[ST.opt],[x]=l.splice(i,1);saved();redraw();M.toast(`${C(x.id).n} removido`,'Desfazer',()=>{l.splice(i,0,x);redraw()})};
const moveItem=(fa,fi,ta,ti,redraw)=>{const o=ST.opt,src=ST.ambs[fa].it[o],[x]=src.splice(fi,1);const dst=ST.ambs[ta].it[o];
  if(ti==null||ti>dst.length)ti=dst.length; if(fa===ta&&ti>fi)ti--; dst.splice(ti,0,x);saved();redraw();
  if(fa!==ta)M.toast(`${C(x.id).n} movido para ${ST.ambs[ta].n}`,'Desfazer',()=>{const [y]=ST.ambs[ta].it[o].splice(ST.ambs[ta].it[o].indexOf(x),1);ST.ambs[fa].it[o].splice(fi,0,y);redraw()})};
function rowMenu(btn,ai,i,redraw){
  const a=ST.ambs[ai],l=a.it[ST.opt],x=l[i];
  const others=ST.ambs.map((b,k)=>k===ai?null:{label:'Mover para '+b.n,icon:'seta',run:()=>moveItem(ai,i,k,null,redraw)}).filter(Boolean);
  M.menu(btn,[
    {label:'Duplicar item',icon:'copiar',run:()=>{l.splice(i+1,0,clone(x));saved();redraw()}},
    {label:'Personalizar exibição',icon:'olho',run:()=>M.toast('Abre “Exibição deste item”: modelo, imagem e descrição só desta linha.')},
    ...(i>0?[{label:'Mover para cima',icon:'seta',run:()=>moveItem(ai,i,ai,i-1,redraw)}]:[]),
    ...(i<l.length-1?[{label:'Mover para baixo',icon:'baixo',run:()=>moveItem(ai,i,ai,i+2,redraw)}]:[]),
    '-',...others,'-',
    {label:'Remover',icon:'lixo',danger:true,run:()=>removeItem(a,i,redraw)}]);
}
/* arrastar: linhas [data-row="amb:i"], alvos de ambiente [data-drop-amb="amb"] */
function enableDrag(root,redraw){
  let from=null;
  const clear=()=>$$('.drop-top,.drop-bot,.drop-amb',root).forEach(e=>e.classList.remove('drop-top','drop-bot','drop-amb'));
  $$('[data-handle]',root).forEach(h=>{
    const row=h.closest('[data-row]');
    h.addEventListener('mousedown',()=>row.draggable=true); h.addEventListener('mouseup',()=>row.draggable=false);
    h.addEventListener('keydown',e=>{if(!e.altKey||(e.key!=='ArrowUp'&&e.key!=='ArrowDown'))return;e.preventDefault();
      const [ai,i]=row.dataset.row.split(':').map(Number),n=ST.ambs[ai].it[ST.opt].length,t=e.key==='ArrowUp'?i-1:i+2;
      if(t<0||t>n)return;moveItem(ai,i,ai,t,redraw);const nh=$(`[data-row="${ai}:${e.key==='ArrowUp'?i-1:i+1}"] [data-handle]`,root);nh&&nh.focus()});
  });
  $$('[data-row]',root).forEach(r=>{
    r.addEventListener('dragstart',e=>{from=r.dataset.row.split(':').map(Number);r.classList.add('dragging');e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain',r.dataset.row)}catch(_){}});
    r.addEventListener('dragend',()=>{r.classList.remove('dragging');r.draggable=false;clear();from=null});
    r.addEventListener('dragover',e=>{if(!from)return;e.preventDefault();clear();const b=r.getBoundingClientRect();r.classList.add(e.clientY<b.top+b.height/2?'drop-top':'drop-bot')});
    r.addEventListener('drop',e=>{if(!from)return;e.preventDefault();const [ta,ti]=r.dataset.row.split(':').map(Number),b=r.getBoundingClientRect();
      const pos=e.clientY<b.top+b.height/2?ti:ti+1;const f=from;from=null;clear();moveItem(f[0],f[1],ta,pos,redraw)});
  });
  $$('[data-drop-amb]',root).forEach(t=>{
    t.addEventListener('dragover',e=>{if(!from)return;e.preventDefault();clear();t.classList.add('drop-amb')});
    t.addEventListener('dragleave',()=>t.classList.remove('drop-amb'));
    t.addEventListener('drop',e=>{if(!from)return;e.preventDefault();const f=from;from=null;clear();moveItem(f[0],f[1],+t.dataset.dropAmb,null,redraw)});
  });
}
/* linha de item (tabela do passo Itens) e linhas filhas do kit */
function itemRows(ai,x,i){const c=C(x.id),kit=!!x.kit;
  return `<tr data-row="${ai}:${i}">
   <td class="cs-h" style="padding-right:0"><button class="btn sm icon ghost handle" data-handle aria-label="Arrastar ${esc(c.n)} (Alt+↑/↓ para mover)" title="Arraste para reordenar ou solte num ambiente">${ic('alca',16)}</button></td>
   <td class="cs-p" style="padding-left:4px"><div class="row" style="gap:12px;min-width:0;flex-wrap:nowrap">${thumb(c)}<div style="min-width:0;flex:1"><div class="cs-name" title="${esc(c.n)}">${c.n}</div>
     <div class="lbl${kit?' cs-ktw':''}" style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${kit?`<button type="button" class="btn sm ghost cs-kt" data-kt="${i}" aria-expanded="${!!x.open}"><span class="bt">Kit · ${x.kit.length} itens ${x.open?'▴':'▾'}</span></button>`:`${c.b} · ${c.m}`}</div></div></div></td>
   <td class="c cs-q"><span class="cs-step"><button type="button" class="btn sm icon" data-q="${i}" data-d="-1" aria-label="Diminuir quantidade">−</button><input class="input sm num" data-qi="${i}" value="${x.q}" inputmode="numeric" aria-label="Quantidade de ${esc(c.n)}"><button type="button" class="btn sm icon" data-q="${i}" data-d="1" aria-label="Aumentar quantidade">+</button></span></td>
   <td class="r num cs-unit">${brl(price(x))}<div class="lbl" style="font-size:12px">/${c.u.toLowerCase()}</div></td><td class="r num cs-s" style="font-weight:600">${brl(x.q*price(x))}<div class="lbl cs-unit2" style="font-size:12px;font-weight:400">${brl(price(x))}/${c.u.toLowerCase()}</div></td>
   <td class="r cs-m"><button type="button" class="btn sm icon ghost" data-mn="${i}" aria-label="Mais ações de ${esc(c.n)}" aria-haspopup="menu">${ic('pontos',18)}</button></td></tr>`+
  (kit&&x.open?x.kit.map((k,j)=>{const kc=C(k.id);return `<tr class="kidrow cs-kid"><td class="cs-h"></td><td class="cs-p" style="padding-left:56px"><div class="row" style="gap:12px;flex-wrap:nowrap;min-width:0">${thumb(kc,true)}<div style="min-width:0;flex:1"><div class="cs-kname" title="${esc(kc.n)}">${kc.n}</div><div class="lbl" style="font-size:12px">${k.q*x.q} no total · ${k.q} por kit</div></div></div></td>
    <td class="c cs-q"><span class="cs-step"><button type="button" class="btn sm icon" data-kq="${i}:${j}:-1" aria-label="Diminuir no kit">−</button><b class="num" style="width:44px;text-align:center">${k.q}</b><button type="button" class="btn sm icon" data-kq="${i}:${j}:1" aria-label="Aumentar no kit">+</button></span></td>
    <td class="r num soft cs-unit">${brl(kc.p)}</td><td class="r num soft cs-s">${brl(k.q*kc.p*x.q)}<div class="lbl cs-unit2" style="font-size:12px">${brl(kc.p)}/un</div></td>
    <td class="r cs-m"><button type="button" class="btn sm icon ghost" data-km="${i}:${j}" aria-label="Ações de ${esc(kc.n)} no kit" aria-haspopup="menu">${ic('pontos',18)}</button></td></tr>`}).join(''):'')}

/* ---------- resumo lateral ---------- */
const summary=()=>{const o=ST.opt,t=optT(o),f=optF(o),p=ST.ambs.reduce((s,a)=>s+prod(a,o),0),max=Math.max(...ST.opts.map((_,i)=>optF(i)));
 return `<div class="ch"><h2>Resumo</h2><span class="spacer"></span><span class="lbl">Opção ${o+1} · ${esc(ST.opts[o].n)}</span></div>
  <div class="kv mt16"><span>Produtos · ${nItems(o)} itens</span><b class="num">${brl(p)}</b></div>
  <div class="kv"><span>Mão de obra</span><b class="num">${brl(t-p)}</b></div>
  <div class="kv" style="height:52px"><label for="desc">Desconto da opção</label><span class="row" style="gap:8px"><input class="input sm num" id="desc" type="number" min="0" max="50" step="0.5" value="${ST.opts[o].d}" style="width:72px;text-align:right"><span class="lbl">%</span></span></div>
  <div style="border-top:1px solid var(--line);margin-top:8px;padding-top:16px">${ST.opts[o].d?`<div class="lbl num" style="text-decoration:line-through">${brl(t)}</div>`:''}
   <div class="big num">${brl(f)}</div>${ST.opts[o].d?`<div class="lbl pos">${brl(t-f)} de desconto aplicado</div>`:''}</div>
  <div class="lbl mt24" style="margin-bottom:8px">Comparativo</div>
  <div class="stack" style="gap:4px">${ST.opts.map((x,i)=>`<button type="button" data-opt="${i}" class="row cs-cmp" style="border:0;background:${i===o?'color-mix(in srgb,var(--text) 5%,transparent)':'transparent'};padding:0 8px;margin:0 -8px;gap:12px;text-align:left;width:calc(100% + 16px);height:36px;border-radius:10px">
    <span class="lbl cs-cmp-l" style="width:88px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${i===o?'color:var(--text);font-weight:600':''}">${i+1} · ${esc(x.n)}</span>
    <span class="cs-cmp-b" style="flex:1;height:8px;border-radius:99px;background:color-mix(in srgb,var(--text) 7%,transparent);overflow:hidden"><span style="display:block;height:100%;width:${optF(i)/max*100}%;border-radius:99px;background:${i===o?'rgb(var(--primary))':'var(--faint)'};transition:width .5s var(--ease)"></span></span>
    <b class="num cs-cmp-v" style="width:96px;text-align:right;font-size:13px">${M.brl0(optF(i))}</b></button>`).join('')}</div>`};
const bindSummary=(box,redraw)=>{const d=$('#desc',box);d.onchange=()=>{ST.opts[ST.opt].d=Math.max(0,Math.min(50,+d.value||0));saved();redraw()};
  $$('[data-opt]',box).forEach(b=>b.onclick=()=>{ST.opt=+b.dataset.opt;M.rerender()})};

/* =====================================================================
   A · Passos
   ===================================================================== */
const STEPS=['1 · Itens','2 · Opções','3 · Documento','4 · Enviar'];
function renderA(){return `${header()}
  <div class="row wrap rv" style="--d:1;margin-bottom:24px">${M.tabsHTML(STEPS,ST.step,'ctl','Passos do construtor')}<span class="spacer"></span>${ST.step===0?optSeg():''}</div>
  <div id="stepbox" class="cs-box"></div>`}
function mountA(v){
  bindHeader(v);
  $('[data-tabs]',v).addEventListener('tab',e=>{ST.step=e.detail;M.rerender()});
  const box=$('#stepbox',v), step=()=>[itens,opcoes,documento,enviar][ST.step](box);
  bindOpt(v,step); step();
}
function itens(box){
  const draw=()=>{const a=ST.ambs[ST.amb],o=ST.opt,l=a.it[o],ai=ST.amb;
  box.innerHTML=`<div class="grid">
   <div class="s3 stack cs-side" style="align-self:start;gap:24px"><nav class="card" aria-label="Ambientes" style="padding:12px">
     <div class="ch" style="padding:4px 12px 8px"><h2>Ambientes</h2><span class="spacer"></span><span class="lbl">${ST.ambs.length}</span></div>
     <div class="stack" style="gap:4px">${ST.ambs.map((x,i)=>`<button type="button" class="btn ${i===ai?'':'ghost'}" data-amb="${i}" data-drop-amb="${i}" aria-current="${i===ai}" style="justify-content:space-between;width:100%;${i===ai?'':'color:var(--text);font-weight:500'}">
       <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0" title="${esc(x.n)}">${esc(x.n)}</span><span style="flex:none" class="num ${x.it[o].length?'faint':'warn'}" style="font-weight:500;font-size:13px">${x.it[o].length?M.brl0(ambT(x,o)):'vazio'}</span></button>`).join('')}</div>
     <button type="button" class="btn ghost" id="addAmb" style="width:100%;margin-top:8px">${ic('mais',18)}Adicionar ambiente</button>
     <p class="lbl" style="margin:12px 12px 4px;font-size:12px">Arraste um item e solte num ambiente para movê-lo.</p>
   </nav><aside class="card cs-sum" id="sum" aria-label="Resumo da opção">${summary()}</aside></div>
   <section class="card flush s9 cs-items" aria-label="Itens deste ambiente" style="align-self:start">
     <div class="ch"><input data-titulo id="ambn" value="${esc(a.n)}" aria-label="Nome do ambiente" style="flex:1;min-width:0;border:0;background:transparent;outline:none;font:inherit;font-size:20px;font-weight:600;color:inherit;letter-spacing:-.01em">
       <button class="btn sm icon ghost" id="dupAmb" aria-label="Duplicar ambiente" title="Duplicar ambiente">${ic('copiar',16)}</button><button class="btn sm icon ghost" id="delAmb" aria-label="Remover ambiente" title="Remover ambiente">${ic('lixo',16)}</button></div>
     <div style="padding:0 var(--pad) 16px">${searchBox('Buscar produto ou kit pra adicionar (nome, marca ou modelo)…')}</div>
     ${l.length?`<div class="tblwrap"><table class="tbl cs-tbl"><thead><tr><th style="width:52px;padding-right:0"><span class="sr">Mover</span></th><th style="padding-left:4px">Produto</th><th class="c" style="width:152px">Qtd</th><th class="r cs-unit" style="width:116px">Unitário</th><th class="r" style="width:128px">Subtotal</th><th style="width:60px"><span class="sr">Ações</span></th></tr></thead><tbody>
      ${l.map((x,i)=>itemRows(ai,x,i)).join('')}
      <tr class="cs-mo"><td class="cs-h"></td><td class="cs-p" colspan="2" style="padding-left:4px;padding-top:8px;padding-bottom:8px"><div class="row" style="gap:12px;flex-wrap:nowrap"><span class="thumb" data-cat="srv" aria-hidden="true">${ic('chave',20)}</span><div><div style="font-weight:600;white-space:normal">Mão de obra e instalação do ambiente</div><div class="lbl row" style="font-size:12px;gap:8px">${a.auto?'Calculado automaticamente':'Ajustado manualmente'} ·
        <input class="input sm num" id="mo" type="number" min="0" max="60" value="${a.mo}" aria-label="Percentual de mão de obra" style="width:64px;text-align:right;padding:0 8px;margin:4px 0"> % dos produtos${a.auto?'':' <button type="button" class="btn sm ghost" id="moAuto">Voltar ao automático</button>'}</div></div></div></td>
        <td class="cs-unit"></td><td class="r num cs-s" style="font-weight:600">${brl(mo(a,o))}</td><td class="cs-m"></td></tr></tbody></table></div>
      <div class="row" style="padding:16px var(--pad);border-top:1px solid var(--line)"><span class="lbl" style="flex:1">Subtotal · ${esc(a.n)}</span><b class="num" style="font-size:18px">${brl(ambT(a,o))}</b></div>`
     :`<div style="padding:48px var(--pad);text-align:center"><div style="font-weight:600;font-size:16px">Nenhum item neste ambiente</div><p class="soft" style="margin:8px 0 16px">Busque um produto acima ou traga os itens de outra opção.</p>
       <div class="btnrow" style="max-width:520px;margin:0 auto">${ST.opts.map((y,k)=>k!==o&&a.it[k].length?`<button class="btn" data-copy="${k}">Usar itens da opção ${k+1}</button>`:'').join('')}</div></div>`}
   </section></div>`;
  $$('[data-amb]',box).forEach(b=>b.onclick=()=>{ST.amb=+b.dataset.amb;draw()});
  $('#addAmb',box).onclick=()=>{ST.ambs.push({n:'Novo ambiente',mo:12,auto:true,it:[[],[],[]]});ST.amb=ST.ambs.length-1;draw();const n=$('#ambn',box);n.focus();n.select()};
  $('#ambn',box).onchange=e=>{a.n=e.target.value||'Ambiente';saved();draw()};
  $('#dupAmb',box).onclick=()=>{ST.ambs.splice(ai+1,0,clone({...a,n:a.n+' (cópia)'}));ST.amb++;saved();draw()};
  $('#delAmb',box).onclick=()=>{if(ST.ambs.length<2)return M.toast('A proposta precisa de pelo menos um ambiente.');const [x]=ST.ambs.splice(ai,1);ST.amb=Math.max(0,ai-1);draw();
    M.toast(`${x.n} removido`,'Desfazer',()=>{ST.ambs.splice(ai,0,x);ST.amb=ai;draw()})};
  const s=$('[data-search]',box); if(s) bindSearch(s,c=>{addItem(a,c);draw();$('[data-search] input',box).focus()});
  $$('[data-q]',box).forEach(b=>b.onclick=()=>{const x=l[+b.dataset.q];x.q=Math.max(1,x.q+ +b.dataset.d);saved();draw()});
  $$('[data-qi]',box).forEach(i=>i.onchange=()=>{l[+i.dataset.qi].q=Math.max(1,parseInt(i.value)||1);saved();draw()});
  $$('[data-mn]',box).forEach(b=>b.onclick=()=>rowMenu(b,ai,+b.dataset.mn,draw));
  $$('[data-kt]',box).forEach(b=>b.onclick=()=>{const x=l[+b.dataset.kt];x.open=!x.open;draw()});
  $$('[data-kq]',box).forEach(b=>b.onclick=()=>{const [i,j,d]=b.dataset.kq.split(':').map(Number),k=l[i].kit[j];k.q=Math.max(1,k.q+d);saved();draw()});
  $$('[data-km]',box).forEach(b=>b.onclick=()=>{const [i,j]=b.dataset.km.split(':').map(Number),x=l[i],k=x.kit[j],kc=C(k.id);
    const same=CAT.filter(c=>c.c===kc.c&&c.id!==kc.id).slice(0,4);
    M.menu(b,[...same.map(c=>({label:'Trocar por '+c.n,icon:'trocar',run:()=>{k.id=c.id;saved();draw()}})),'-',
      {label:'Remover do kit',icon:'lixo',danger:true,run:()=>{if(x.kit.length<2)return M.toast('O kit precisa de pelo menos um item.');x.kit.splice(j,1);saved();draw()}}])});
  const m=$('#mo',box); if(m) m.onchange=()=>{a.mo=Math.max(0,+m.value||0);a.auto=a.mo===12;saved();draw()};
  const ma=$('#moAuto',box); if(ma) ma.onclick=()=>{a.mo=12;a.auto=true;draw()};
  $$('[data-copy]',box).forEach(b=>b.onclick=()=>{a.it[o]=clone(a.it[+b.dataset.copy]);saved();draw()});
  enableDrag(box,draw);
  bindSummary($('#sum',box),draw);
  };
  draw();
}
function opcoes(box){
  const draw=()=>{box.innerHTML=`<div class="grid">${ST.opts.map((o,i)=>`<section class="card s4 cs-opt" aria-label="Opção ${i+1}" style="display:flex;flex-direction:column;gap:16px;${o.likely?'box-shadow:0 0 0 2px rgb(var(--primary)/.6),var(--shadow)':''}">
    <div class="row" style="flex-wrap:nowrap;gap:12px"><span class="kick" style="flex:1;min-width:0">Opção ${i+1}</span><button type="button" class="btn sm cs-like ${o.likely?'':'ghost'}" data-like="${i}" aria-pressed="${o.likely}" style="width:min(216px,70%)" title="${o.likely?'Mais provável de fechar':'Marcar como mais provável'}"><span class="bt">${o.likely?'★ Mais provável de fechar':'☆ Marcar como mais provável'}</span></button></div>
    <label class="field"><span>Nome desta opção</span><input class="input" data-on="${i}" value="${esc(o.n)}"></label>
    <label class="field"><span>Frase desta opção</span><input class="input" data-of="${i}" value="${esc(o.f)}"></label>
    <div class="in" style="border-radius:14px;padding:16px"><div class="lbl">Total da opção · ${nItems(i)} itens</div>${o.d?`<div class="lbl num mt8" style="text-decoration:line-through">${brl(optT(i))}</div>`:''}<div class="big num">${brl(optF(i))}</div>
      <label class="row lbl mt8" style="gap:8px">Desconto de <input class="input sm num" data-od="${i}" type="number" min="0" max="50" step="0.5" value="${o.d}" style="width:72px;text-align:right"> %</label></div>
    <div class="btnrow" style="margin-top:auto"><button type="button" class="btn sm" data-edit="${i}"><span class="bt">Editar itens</span></button><button type="button" class="btn sm" data-base="${i}"><span class="bt">Usar como base</span></button></div></section>`).join('')}</div>`;
   $$('[data-like]',box).forEach(b=>b.onclick=()=>{const t=+b.dataset.like,was=ST.opts[t].likely;ST.opts.forEach((o,i)=>o.likely=i===t&&!was);saved();draw()});
   $$('[data-on]',box).forEach(i=>i.onchange=()=>{ST.opts[+i.dataset.on].n=i.value||'Opção';saved()});
   $$('[data-of]',box).forEach(i=>i.onchange=()=>{ST.opts[+i.dataset.of].f=i.value;saved()});
   $$('[data-od]',box).forEach(i=>i.onchange=()=>{ST.opts[+i.dataset.od].d=Math.max(0,Math.min(50,+i.value||0));saved();draw()});
   $$('[data-edit]',box).forEach(b=>b.onclick=()=>{ST.opt=+b.dataset.edit;ST.step=0;M.rerender()});
   $$('[data-base]',box).forEach(b=>{const s=+b.dataset.base;b.onclick=()=>M.menu(b,ST.opts.map((o,t)=>t===s?null:{label:`Copiar para a opção ${t+1} · ${o.n}`,icon:'copiar',run:()=>{
     const old=ST.ambs.map(a=>a.it[t]);ST.ambs.forEach(a=>a.it[t]=clone(a.it[s]));saved();draw();
     M.toast(`Itens da opção ${s+1} copiados para a opção ${t+1}`,'Desfazer',()=>{ST.ambs.forEach((a,k)=>a.it[t]=old[k]);draw()})}}).filter(Boolean))});
  };draw();
}
function paper(){const d=ST.doc;return `<div class="cs-paper">
  <div style="font-family:var(--mono);font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:#6b7280">Proposta comercial · outubro de 2026</div>
  <h2 style="font-size:32px;font-weight:700;letter-spacing:-.02em;margin:12px 0 4px">${esc(ST.nome)}</h2><div style="color:#4b5563">Para ${esc(ST.cliente)}</div>
  <div class="cs-paper-opts">${ST.opts.map((o,i)=>`<div style="border-radius:12px;padding:16px;background:${o.likely?'#eef5ff':'#f5f6f8'};${o.likely?'box-shadow:0 0 0 1.5px #0a84ff':''}">
    <div style="font-size:11px;color:#6b7280;font-weight:600">Opção ${i+1}${o.likely?' · recomendada':''}</div><div style="font-weight:700;font-size:15px;margin-top:4px">${esc(o.n)}</div><div style="color:#4b5563;font-size:12px;min-height:36px">${esc(o.f)}</div>
    <div style="font-weight:700;font-size:18px;margin-top:8px;font-variant-numeric:tabular-nums">${fmtV(optF(i),i)}</div></div>`).join('')}</div>
  ${ST.ambs.map(a=>`<div style="margin-top:24px"><div style="display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid #e5e7eb;padding-bottom:8px"><b style="font-size:15px">${esc(a.n)}</b>${d.preco?`<b style="font-variant-numeric:tabular-nums">${brl(ambT(a,ST.opt))}</b>`:''}</div>
    ${a.it[ST.opt].map(x=>{const c=C(x.id);return `<div class="cs-pl${d.imagem?' cs-pli':''}" style="display:grid;grid-template-columns:${d.imagem?'40px ':''}minmax(0,1fr) ${d.preco?'auto':''};gap:12px;align-items:center;padding:8px 0;border-bottom:1px solid #f1f2f4">
      ${d.imagem?thumb(c):''}
      <div style="min-width:0"><b>${x.q}× ${c.n}</b>${d.modelo?`<span style="color:#6b7280"> · ${c.b} ${c.m}</span>`:''}${x.kit?`<div style="color:#6b7280;font-size:12px">Inclui: ${x.kit.map(k=>k.q+'× '+C(k.id).n).join(', ')}.</div>`:''}${d.resumo&&!x.kit?`<div style="color:#6b7280;font-size:12px">${c.u==='MT'?'Vendido por metro.':'Instalado e configurado pela equipe.'}</div>`:''}${d.completa?`<div style="color:#6b7280;font-size:12px">Garantia do fabricante, integração com o sistema da casa e suporte no primeiro ano.</div>`:''}</div>
      ${d.preco?`<div class="cs-pp" style="text-align:right;font-variant-numeric:tabular-nums">${brl(x.q*price(x))}</div>`:''}</div>`}).join('')}</div>`).join('')}
  </div>`}
function documento(box){
  const T=[['modelo','Modelo'],['imagem','Imagem'],['resumo','Descrição resumida'],['completa','Descrição completa'],['preco','Preço por item']];
  const draw=()=>{box.innerHTML=`<div class="grid"><section class="card s4 cs-docset" style="align-self:start;position:sticky;top:88px">
    <div class="ch"><h2>Exibição</h2></div><div><div class="stack mt16" style="gap:0">${T.map(([k,l])=>`<div class="row" style="height:52px;border-bottom:1px solid var(--line-2)"><span style="flex:1" id="d-${k}">${l}</span><button class="sw" role="switch" aria-checked="${ST.doc[k]}" aria-labelledby="d-${k}" data-dt="${k}"></button></div>`).join('')}</div></div>
    <div><div class="lbl mt24" style="margin-bottom:12px">Formato dos valores no comparativo</div>
    <div class="seg in" role="group" aria-label="Formato dos valores">${[['reais','R$ 214.000'],['curto','R$ 214k'],['pct','+18%']].map(([k,l])=>`<button type="button" data-fmt="${k}" aria-pressed="${ST.doc.fmt===k}">${l}</button>`).join('')}</div>
    <div class="lbl mt24" style="margin-bottom:12px">Opção mostrada no detalhe</div>${optSeg('optdoc','in','100%')}</div>
    </section><section class="s8 cs-docprev" aria-label="Prévia do documento">${paper()}</section></div>`;
   $$('[data-dt]',box).forEach(b=>b.onclick=()=>{ST.doc[b.dataset.dt]=!ST.doc[b.dataset.dt];draw()});
   $$('[data-fmt]',box).forEach(b=>b.onclick=()=>{ST.doc.fmt=b.dataset.fmt;draw()});
   bindOpt(box,draw);};draw();
}
function enviar(box){
  const draw=()=>{const ck=checks(),ok=ck.every(c=>c[1]);box.innerHTML=`<div class="grid"><section class="card s6 cs-env">
    <h2 style="margin:0;font-size:22px;font-weight:700;letter-spacing:-.01em">Enviar pro cliente</h2><p class="soft" style="margin:8px 0 24px">Confira o essencial e gere o link público da proposta.</p>
    <ul style="list-style:none;margin:0;padding:0">${ck.map(c=>`<li class="row" style="height:52px;border-bottom:1px solid var(--line-2)"><span style="width:28px;height:28px;border-radius:99px;display:grid;place-items:center;background:${c[1]?'rgb(var(--pos)/.14)':'rgb(var(--warn)/.16)'};color:${c[1]?'rgb(var(--pos))':'rgb(var(--warn))'}">${c[1]?ic('check',16):'!'}</span><span style="flex:1">${c[0]}</span>${c[1]?'':`<button type="button" class="btn sm" data-fix style="width:96px">Resolver</button>`}</li>`).join('')}</ul>
    <button class="btn pri mt24" id="gerar" style="width:100%" ${ok?'':'disabled'}>${ic('enviar')}Gerar pra cliente</button></section>
   <section class="card s6 cs-env" aria-live="polite">${ST.link?`<div class="kick">Link público</div><div class="row mt16 in" style="border-radius:12px;padding:0 4px 0 16px;height:44px"><span class="num" style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">maestro-os.app/p/${ST.link}</span><button type="button" class="btn sm" id="cp" style="width:96px;flex:none">${ic('copiar',16)}Copiar</button></div>
     <div class="btnrow mt16"><button type="button" class="btn sm" id="wa"><span class="bt">Enviar por WhatsApp</span></button><button type="button" class="btn sm" data-go2="2"><span class="bt">Ver documento</span></button></div>
     <p class="lbl mt16">${ST.opts.length} opções · total recomendado ${brl(optF(Math.max(0,ST.opts.findIndex(o=>o.likely))))}</p>`
    :`<div class="kick">O que o cliente recebe</div><p class="soft">Um link com as ${ST.opts.length} opções lado a lado, a recomendada em destaque, e o detalhe por ambiente. Ele escolhe a opção e aceita pelo próprio link.</p>`}</section></div>`;
   $('#gerar',box).onclick=()=>{ST.link=Math.random().toString(36).slice(2,8);draw();M.toast('Link gerado.')};
   const cp=$('#cp',box); if(cp) cp.onclick=()=>{try{navigator.clipboard.writeText('https://maestro-os.app/p/'+ST.link)}catch(e){}M.toast('Link copiado.')};
   const wa=$('#wa',box); if(wa) wa.onclick=()=>M.toast('Abre o WhatsApp com a mensagem e o link (simulação).');
   $$('[data-fix]',box).forEach(b=>b.onclick=()=>{ST.step=0;ST.amb=ST.ambs.findIndex(a=>!a.it[ST.opt].length);M.rerender()});
   const g2=$('[data-go2]',box); if(g2) g2.onclick=()=>{ST.step=2;M.rerender()};
  };draw();
}

/* =====================================================================
   B · Documento vivo (edita na folha; arrastar entre ambientes direto)
   ===================================================================== */
function renderB(){return `${header()}
  <div class="row wrap rv" style="--d:1;margin-bottom:24px">${optSeg()}<span class="spacer"></span><span class="lbl" id="cnt"></span></div>
  <div class="cs-box" id="bbox"><div class="grid"><div class="s8 stack cs-bmain" id="sheet"></div><aside class="s4 cs-bside" style="align-self:start;position:sticky;top:88px"><div class="card cs-sum" id="sum" style="align-self:start"></div>
   <div class="card mt16" style="align-self:start"><div class="ch"><h2>Pronto para enviar?</h2></div><ul style="list-style:none;margin:12px 0 0;padding:0" id="ck"></ul><button type="button" class="btn pri mt16" style="width:100%" id="gerarB">${ic('enviar')}<span class="bt">Gerar pra cliente</span></button></div></aside></div></div>`}
function mountB(v){
  bindHeader(v);
  const draw=()=>{const o=ST.opt;
    $('#cnt',v).textContent=`${ST.ambs.length} ambientes · ${nItems(o)} itens · arraste pela alça para reordenar ou levar a outro ambiente`;
    $('#sheet',v).innerHTML=ST.ambs.map((a,ai)=>`<section class="card flush cs-bamb" aria-label="${esc(a.n)}">
      <div class="ch" data-drop-amb="${ai}" style="border-radius:var(--r-card) var(--r-card) 0 0"><input data-titulo data-an="${ai}" value="${esc(a.n)}" aria-label="Nome do ambiente" style="flex:1;min-width:0;border:0;background:transparent;outline:none;font:inherit;font-size:20px;font-weight:600;color:inherit">
        <b class="num">${brl(ambT(a,o))}</b><button class="btn sm icon ghost" data-ad="${ai}" aria-label="Remover ${esc(a.n)}">${ic('lixo',16)}</button></div>
      <ul style="list-style:none;margin:0;padding:0">${a.it[o].map((x,i)=>{const c=C(x.id);return `<li class="row cs-bli" data-row="${ai}:${i}" style="min-height:64px;padding:8px var(--pad) 8px 12px;border-top:1px solid var(--line-2);gap:12px">
        <button class="btn sm icon ghost handle cs-bh" data-handle aria-label="Arrastar ${esc(c.n)} (Alt+↑/↓ para mover)">${ic('alca',16)}</button>${thumb(c)}
        <span class="cs-bn" style="flex:1;min-width:0"><span style="font-weight:600">${c.n}</span><br><span class="lbl" style="font-size:12px">${x.kit?'Kit · '+x.kit.map(k=>k.q+'× '+C(k.id).n).join(', '):c.b+' · '+c.m}</span></span>
        <span class="row cs-bq" style="gap:4px"><button class="btn sm icon ghost" data-q="${ai}:${i}:-1" aria-label="Diminuir">−</button><b class="num" style="width:36px;text-align:center">${x.q}</b><button class="btn sm icon ghost" data-q="${ai}:${i}:1" aria-label="Aumentar">+</button></span>
        <b class="num cs-bs" style="width:112px;text-align:right">${brl(x.q*price(x))}</b>
        <button class="btn sm icon ghost cs-bm" data-mn="${ai}:${i}" aria-label="Mais ações de ${esc(c.n)}" aria-haspopup="menu">${ic('pontos',18)}</button></li>`}).join('')}
       <li class="row cs-bli cs-bmo" style="min-height:64px;padding:8px var(--pad) 8px 12px;border-top:1px solid var(--line-2);gap:12px"><span class="cs-bh" style="width:36px"></span><span class="thumb" data-cat="srv" aria-hidden="true">${ic('chave',20)}</span><span class="lbl cs-bn" style="flex:1">Mão de obra e instalação · ${a.mo}%</span><b class="num cs-bs" style="width:112px;text-align:right">${brl(mo(a,o))}</b><span class="cs-bm" style="width:36px"></span></li></ul>
      <div style="padding:12px var(--pad) var(--pad);border-top:1px solid var(--line-2)">${searchBox('Adicionar produto ou kit em '+a.n+'…')}</div></section>`).join('')+
      `<button class="btn ctl" id="addAmbB" style="width:100%">${ic('mais',18)}Adicionar ambiente</button>`;
    $$('[data-an]',v).forEach(i=>i.onchange=()=>{ST.ambs[+i.dataset.an].n=i.value||'Ambiente';saved()});
    $$('[data-ad]',v).forEach(b=>b.onclick=()=>{const i=+b.dataset.ad;if(ST.ambs.length<2)return M.toast('A proposta precisa de pelo menos um ambiente.');const [x]=ST.ambs.splice(i,1);draw();M.toast(`${x.n} removido`,'Desfazer',()=>{ST.ambs.splice(i,0,x);draw()})});
    $$('[data-q]',v).forEach(b=>b.onclick=()=>{const [a,i,d]=b.dataset.q.split(':').map(Number),x=ST.ambs[a].it[o][i];x.q=Math.max(1,x.q+d);saved();draw()});
    $$('[data-mn]',v).forEach(b=>b.onclick=()=>{const [a,i]=b.dataset.mn.split(':').map(Number);rowMenu(b,a,i,draw)});
    $$('#sheet [data-search]',v).forEach((s,ai)=>bindSearch(s,c=>{addItem(ST.ambs[ai],c);draw();$$('#sheet [data-search] input',v)[ai].focus()}));
    $('#addAmbB',v).onclick=()=>{ST.ambs.push({n:'Novo ambiente',mo:12,auto:true,it:[[],[],[]]});draw();const ins=$$('[data-an]',v);ins[ins.length-1].focus();ins[ins.length-1].select()};
    enableDrag($('#sheet',v),draw);
    $('#sum',v).innerHTML=summary(); bindSummary($('#sum',v),draw);
    $('#ck',v).innerHTML=checks().map(c=>`<li class="row" style="height:40px"><span style="color:${c[1]?'rgb(var(--pos))':'rgb(var(--warn))'};width:20px">${c[1]?ic('check',16):'!'}</span><span class="${c[1]?'soft':''}">${c[0]}</span></li>`).join('');
  };
  bindOpt(v,draw);
  $('#gerarB',v).onclick=()=>{ST.step=3;ST.link=Math.random().toString(36).slice(2,8);M.cfg().variant.construtor='A';if(location.hash==='#/construtor?v=A')M.rerender();else location.hash='#/construtor?v=A';M.toast('Link gerado.')};
  draw();
}

M.screen('construtor',{title:'Construtor de propostas',dock:'propostas',
  help:['Escolha o ambiente à esquerda e busque produtos ou kits pelo nome, marca ou modelo. Enter adiciona.',
        'Arraste a alça ⋮⋮ para mudar a ordem; solte sobre outro ambiente para mover o item. No teclado: Alt+↑/↓.',
        'Cada proposta tem até 3 opções. Troque a opção no topo; o resumo à direita compara as três.',
        'No passo 3 você decide o que aparece no documento; no passo 4 gera o link para o cliente.'],
  variants:{A:{label:'Passos',render:renderA,mount:mountA},B:{label:'Documento vivo',render:renderB,mount:mountB}}});
M.rerender=()=>dispatchEvent(new HashChangeEvent('hashchange'));
})();

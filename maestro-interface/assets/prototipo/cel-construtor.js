/* Maestro OS · celular · Construtor de propostas (toque)
   Mesmo estado do computador: window.__prop (criado igual ao construtor.js quando o celular abre primeiro).
   Proposta → até 3 opções → ambientes → itens (kits e mão de obra % por ambiente).
   Rotas: #/construtor (opções no topo + ambientes + passos) · #/construtor?amb=0 (itens do ambiente)
          #/construtor?passo=opcoes | documento | enviar */
(function(){
const {ic,brl,esc,$,$$}=M, K=M.m;

document.head.insertAdjacentHTML('beforeend',`<style id="cc-css">
.nav .ib:has(>b){width:auto;min-width:44px;padding:0 8px}
.cc-stk{position:sticky;top:calc(env(safe-area-inset-top) + 52px);z-index:30;margin:0 -16px 16px;padding:8px 16px 10px}
.cc-stk .mseg{margin:0 0 8px}
.cc-tot{display:flex;align-items:baseline;justify-content:space-between;gap:12px;font-size:14px;color:var(--soft);min-height:24px}
.cc-tot>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cc-tot b{font-size:20px;color:var(--text);font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap}
.cc-tot .cc-t2 b{font-size:15px;font-weight:600}
.cc-tot:has(.cc-t2){flex-wrap:wrap;row-gap:0}.cc-tot>span.cc-t2{overflow:visible}
@media (max-width:359px){.cc-items .rw.cc-ed{grid-template-columns:44px minmax(0,1fr) 44px 44px}.cc-items .rw.cc-ed>.thumb{display:none}}
.cc-bar{display:block;height:6px;margin-top:6px;border-radius:3px;background:color-mix(in srgb,var(--text) 8%,transparent);overflow:hidden}
.cc-bar>b{display:block;height:100%;border-radius:3px;background:rgb(var(--primary))}
.cc-items>li{transition:transform .2s cubic-bezier(.32,.72,0,1)}
.cc-items>li.cc-drag{transition:none;z-index:3;box-shadow:0 12px 28px -8px rgba(0,0,0,.35)}
.rw.cc-it{display:grid;grid-template-columns:40px minmax(0,1fr) auto 44px;grid-template-areas:"t n n m" "q q s s";column-gap:10px;row-gap:6px;padding:10px 4px 10px 16px;align-items:center}
.cc-it>.thumb{grid-area:t}
.cc-n{grid-area:n;min-width:0}
.cc-n .t1{display:block;font-weight:600;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cc-n .t2{display:block;font-size:13.5px;color:var(--soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cc-ib{grid-area:m;width:44px;height:44px;border:0;border-radius:999px;background:transparent;color:var(--soft);display:grid;place-items:center}
.cc-ib:disabled{opacity:.3}
.cc-q{grid-area:q;display:flex;align-items:center}
.cc-sb{width:44px;height:44px;border:0;border-radius:12px;background:color-mix(in srgb,var(--text) 7%,transparent);color:rgb(var(--primary));font-size:22px;line-height:1;display:grid;place-items:center;flex:none}
.cc-sb:active{opacity:.6}
.cc-q>b{min-width:40px;text-align:center;font-size:17px;font-variant-numeric:tabular-nums}
.cc-s{grid-area:s;text-align:right;padding-right:12px;min-width:0}
.cc-s b{display:block;font-size:16px;font-variant-numeric:tabular-nums;white-space:nowrap}
.cc-s span{display:block;font-size:12.5px;color:var(--faint);white-space:nowrap}
.cc-kt{grid-column:1/-1;justify-self:start;height:44px;border:0;background:transparent;color:rgb(var(--primary));font-size:15px;font-weight:600;padding:0 0 0 50px;margin:-6px 0 -8px}
.cc-kid .rw.cc-it{padding-left:40px;grid-template-columns:32px minmax(0,1fr) auto 44px;background:color-mix(in srgb,var(--text) 3%,var(--panel))}
.cc-kid .cc-n .t1{font-weight:500;font-size:15px}
.cc-link{grid-column:1/-1;justify-self:start;height:44px;border:0;background:transparent;color:rgb(var(--primary));font-size:15px;padding:0;margin:-6px 0 -8px}
.rw.cc-ed{display:grid;grid-template-columns:44px 40px minmax(0,1fr) 44px 44px;align-items:center;column-gap:8px;padding:6px 4px 6px 8px}
.rw.cc-ed>*{grid-area:auto}
.cc-hd{width:44px;height:44px;border:0;background:transparent;color:var(--faint);display:grid;place-items:center;cursor:grab;touch-action:none}
.cc-res .vl{max-width:40%}
.cc-res .vl b{font-size:15px}
.cc-plus{flex:none;width:32px;height:32px;border-radius:999px;display:grid;place-items:center;background:rgb(var(--primary));color:#fff}
.cc-sw .rw{padding-right:16px}
.cc-paper{background:#fff;color:#14161b;border-radius:16px;padding:20px;font-size:13px;line-height:1.5;box-shadow:0 0 0 .5px var(--line-2),0 12px 32px -16px rgba(0,0,0,.3);margin-bottom:24px}
.cc-paper .k{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#6b7280}
.cc-paper h3{font-size:22px;font-weight:700;letter-spacing:-.02em;margin:10px 0 2px;color:#14161b}
.cc-po{display:grid;gap:8px;margin:16px 0}
.cc-po>div{border-radius:12px;padding:12px;background:#f5f6f8}
.cc-po>div.lk{background:#eef5ff;box-shadow:0 0 0 1.5px #0a84ff}
.cc-pa{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid #e5e7eb;padding:16px 0 6px;font-size:15px}
.cc-pl{display:grid;grid-template-columns:minmax(0,1fr);gap:2px 10px;padding:8px 0;border-bottom:1px solid #f1f2f4;align-items:start}
.cc-pl.im{grid-template-columns:32px minmax(0,1fr)}
.cc-pl .pp{grid-column:-2;font-variant-numeric:tabular-nums;color:#14161b}
.cc-pl small{display:block;color:#6b7280;font-size:12px}
.cc-chk .mic{width:30px;height:30px;border-radius:999px}
</style>`);

/* ---------- catálogo e estado (iguais ao construtor.js) ---------- */
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

/* ---------- contas (iguais ao computador) ---------- */
const price=x=>x.p??(x.kit?x.kit.reduce((s,k)=>s+k.q*C(k.id).p,0):C(x.id).p);
const unit=c=>c.kids?c.kids.reduce((s,[id,n])=>s+n*C(id).p,0):c.p;
const prod=(a,o)=>a.it[o].reduce((s,x)=>s+x.q*price(x),0);
const mo=(a,o)=>prod(a,o)*a.mo/100;
const ambT=(a,o)=>prod(a,o)+mo(a,o);
const optT=o=>ST.ambs.reduce((s,a)=>s+ambT(a,o),0);
const optF=o=>optT(o)*(1-ST.opts[o].d/100);
const nItems=o=>ST.ambs.reduce((s,a)=>s+a.it[o].length,0);
const checks=()=>[['Pelo menos um produto na proposta',ST.ambs.some(a=>a.it.some(l=>l.length))],['Nenhum ambiente vazio',ST.ambs.every(a=>a.it[ST.opt].length)],
  ['Imagens do projeto',true],['Cliente vinculado',!!ST.cliente]];
const fmtV=(v,o)=>ST.doc.fmt==='curto'?'R$ '+Math.round(v/1000)+'k':ST.doc.fmt==='pct'&&o>0?(v>=optF(0)?'+':'')+Math.round((v/optF(0)-1)*100)+'%':brl(v);
const saved=()=>{const d=new Date();ST.salvoEm=`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`};
const go=h=>{location.hash=h};
const re=()=>{const v=$('#view'),h=(location.hash.replace(/^#\/?/,'')||'dashboard').split('?'),sc=M.mscreens[h[0]];if(!sc)return;
  const q=new URLSearchParams(h[1]||''),y=scrollY;M.q=q;v.innerHTML=sc.render(q);$$('[data-back]',v).forEach(b=>b.onclick=K.back);
  sc.mount&&sc.mount(v,q);M.wire(v,{});K.bindSwipe(v);scrollTo(0,y);
  const lt=$('.lt',v);if(lt&&'IntersectionObserver' in window)new IntersectionObserver(([e])=>document.documentElement.classList.toggle('scrolled',!e.isIntersecting),{rootMargin:'-56px 0px 0px 0px'}).observe(lt)};
const grp=(title,lis,foot='')=>`<section class="grp">${title?`<h2>${esc(title)}</h2>`:''}<ul class="lst">${lis}</ul>${foot?`<div class="foot">${foot}</div>`:''}</section>`;
const info=({title,sub='',value=null,icon='',color=''})=>`<li><div class="rw ${icon?'ic40':''}">${icon?`<span class="mic" style="${color?'background:'+color:''}" aria-hidden="true">${/^[a-z]+\d*$/.test(icon)?ic(icon,20):`<b style="font-size:13px;font-weight:700">${esc(icon)}</b>`}</span>`:''}<span class="tx"><span class="t1">${title}</span>${sub?`<span class="t2">${sub}</span>`:''}</span>${value!=null?`<span class="vl">${value}</span>`:''}</div></li>`;
const swRow=(label,on,act,i,icon='')=>`<li><div class="rw ${icon?'ic40':''}">${icon?`<span class="mic" style="background:${on?'rgb(var(--warn))':'#8e8e93'}" aria-hidden="true">${ic(icon,20)}</span>`:''}<span class="tx"><span class="t1" id="cc-l-${act}-${i}">${esc(label)}</span></span><button type="button" class="sw" role="switch" aria-checked="${!!on}" aria-labelledby="cc-l-${act}-${i}" data-act="${act}" data-i="${i}"></button></div></li>`;
const addRow=(label,act,icon='mais')=>({icon,title:`<span style="color:rgb(var(--primary))">${esc(label)}</span>`,act,chev:false});
/* barra fixa: as 3 opções + total */
const optBar=(esq,dir='')=>`<div class="cc-stk ctl">${K.seg('cc-opt',ST.opts.map((x,i)=>[String(i),(x.likely?'★ ':'')+x.n]),String(ST.opt),'Opção em edição')}
  <div class="cc-tot">${esq}${dir}</div></div>`;
const totDir=()=>{const o=ST.opt;return `<b class="num" aria-label="Total da opção ${o+1}">${brl(optF(o))}</b>`};

/* ---------- operações com itens ---------- */
const addItem=(a,c)=>{const l=a.it[ST.opt],x=!c.kids&&l.find(y=>y.id===c.id);x?x.q++:l.push(it(c.id,1));saved();M.toast(`${c.n} · adicionado em ${a.n}`)};
const removeItem=(a,i)=>{const l=a.it[ST.opt],[x]=l.splice(i,1);saved();re();M.toast(`${C(x.id).n} removido`,'Desfazer',()=>{l.splice(i,0,x);re()})};
const moveItem=(fa,fi,ta,ti)=>{const o=ST.opt,src=ST.ambs[fa].it[o],[x]=src.splice(fi,1),dst=ST.ambs[ta].it[o];
  if(ti==null||ti>dst.length)ti=dst.length; dst.splice(ti,0,x);saved();re();
  if(fa!==ta)M.toast(`${C(x.id).n} movido para ${ST.ambs[ta].n}`,'Desfazer',()=>{const [y]=ST.ambs[ta].it[o].splice(ST.ambs[ta].it[o].indexOf(x),1);ST.ambs[fa].it[o].splice(fi,0,y);re()})};

/* busca de produto/kit numa folha: um toque adiciona */
function buscar(ai){const a=ST.ambs[ai];let cat='',q='',n=0;
  const CATS=[['','Todos'],['kit','Kits'],['auto','Automação'],['rede','Rede'],['audio','Áudio'],['luz','Luz'],['clima','Clima'],['seg','Segurança'],['srv','Serviços']];
  const res=()=>ALL.filter(c=>(!cat||c.c===cat)&&(c.n+' '+c.b+' '+c.m+(c.kids?' kit':'')).toLowerCase().includes(q));
  const list=()=>{const r=res();return r.length?`<ul class="lst">${r.map(c=>`<li><button type="button" class="rw ic40 cc-res" data-add="${c.id}" aria-label="Adicionar ${esc(c.n)}">${thumb(c)}<span class="tx"><span class="t1">${esc(c.n)}</span><span class="t2">${c.kids?'Kit · '+c.kids.map(([k,m])=>m+'× '+C(k).n).join(', '):esc(c.b+' · '+c.m)}</span></span><span class="vl"><b>${brl(unit(c))}</b>/${c.u.toLowerCase()}</span><span class="cc-plus" aria-hidden="true">${ic('mais',18)}</span></button></li>`).join('')}</ul>`
    :`<div class="mcard soft" style="text-align:center">Nada no catálogo com “${esc(q)}”.</div>`};
  const s=K.sheet({title:'Adicionar em '+a.n,ok:'OK',cancel:'',cheia:true,body:`${K.search('Nome, marca ou modelo','cc-q')}${K.chips('cc-cat',CATS,'')}<div id="cc-res">${list()}</div><p class="soft" id="cc-n" style="font-size:13px;margin:8px 4px 0" aria-live="polite">Um toque adiciona 1 unidade. Toque de novo para somar.</p>`});
  const box=$('#cc-res',s.el);
  const bind=()=>$$('[data-add]',box).forEach(b=>b.onclick=()=>{const c=C(b.dataset.add);addItem(ST.ambs[ai],c);n++;$('#cc-n',s.el).textContent=`${n} adicionado${n>1?'s':''} em ${a.n}. Toque OK para voltar.`;re()});
  const draw=()=>{box.innerHTML=list();bind()};
  const inp=$('#cc-q',s.el);inp.oninput=()=>{q=inp.value.trim().toLowerCase();draw()};
  K.bindPick(s.el,'cc-cat',x=>{cat=x;draw()});bind();
}
/* exibição só desta linha no documento */
function exibicao(x){const c=C(x.id);x.ex=x.ex||{modelo:ST.doc.modelo,imagem:ST.doc.imagem,desc:ST.doc.resumo};
  const body=()=>`<p class="soft" style="font-size:15px;margin:0 0 16px">O que aparece no documento só para “${esc(c.n)}”. O resto da proposta segue o passo Documento.</p>
   <section class="grp cc-sw"><ul class="lst">${swRow('Mostrar modelo',x.ex.modelo,'ex','modelo')}${swRow('Mostrar imagem',x.ex.imagem,'ex','imagem')}${swRow('Mostrar descrição',x.ex.desc,'ex','desc')}</ul></section>`;
  const s=K.sheet({title:'Exibição deste item',ok:'OK',cancel:'',body:body()});
  $$('[data-act="ex"]',s.el).forEach(b=>b.onclick=()=>{const k=b.dataset.i;x.ex[k]=!x.ex[k];b.setAttribute('aria-checked',x.ex[k]);saved()});
}

/* =====================================================================
   tela principal: opções + total fixos, ambientes, resumo, passos
   ===================================================================== */
function principal(){const o=ST.opt,t=optT(o),f=optF(o),p=ST.ambs.reduce((s,a)=>s+prod(a,o),0),mx=Math.max(...ST.opts.map((_,i)=>optF(i)))||1,ck=checks(),pend=ck.filter(c=>!c[1]).length;
 return `${K.nav({title:ST.nome,back:'Propostas',kick:'Rascunho · '+ST.cliente,acts:[{icon:'olho',title:'Ver documento',act:'ver-doc'}]})}
 ${optBar(`<span>Total da opção ${o+1} · ${nItems(o)} itens${ST.opts[o].d?` · −${ST.opts[o].d}%`:''}</span>`,totDir())}
 ${K.group({title:`Ambientes · ${ST.ambs.length}`,foot:'Toque no ambiente para montar os itens. Deslize para duplicar ou remover.',rows:[...ST.ambs.map((a,i)=>({icon:'casa',color:a.it[o].length?'':'rgb(var(--warn))',title:esc(a.n),
   sub:a.it[o].length?`${a.it[o].length} ${a.it[o].length>1?'itens':'item'} · M.O. ${a.mo}%`:'Vazio — toque para adicionar',value:a.it[o].length?brl(ambT(a,o)):'<span class="warn">vazio</span>',href:'#/construtor?amb='+i,i,
   swipe:[{label:'Duplicar',icon:'copiar',act:'amb-dup',tone:1},{label:'Remover',icon:'lixo',act:'amb-rem',tone:3}]})),addRow('Adicionar ambiente','amb-novo')]})}
 ${grp(`Resumo · opção ${o+1}`,info({title:`Produtos · ${nItems(o)} itens`,value:brl(p)})+info({title:'Mão de obra',value:brl(t-p)})
   +K.row({title:'Desconto da opção',value:`${ST.opts[o].d}%`,act:'desc'})
   +info({title:'<b>Total</b>',value:`${ST.opts[o].d?`<span class="faint" style="text-decoration:line-through;display:block;font-size:13px">${brl(t)}</span>`:''}<b style="font-size:17px">${brl(f)}</b>`}))}
 ${K.group({title:'Comparativo',foot:'Toque numa opção para editá-la.',rows:ST.opts.map((x,i)=>({icon:String(i+1),color:i===o?'':'#8e8e93',title:`${x.likely?'★ ':''}${esc(x.n)}`,sub:`<span class="cc-bar"><b style="width:${optF(i)/mx*100}%;${i===o?'':'background:var(--faint)'}"></b></span>`,value:M.brl0(optF(i)),act:'opt',i,chev:false}))})}
 ${K.group({title:'Proposta',foot:ST.salvoEm?`Salvo às ${ST.salvoEm}.`:'Tudo salvo.',rows:[{icon:'propostas',title:esc(ST.nome),sub:'Nome da proposta · toque para renomear',act:'renomear'}]})}
 ${grp('',info({icon:'contatos',title:esc(ST.cliente),sub:'Cliente vinculado'}))}
 ${K.group({title:'Próximos passos',rows:[{icon:'lista',title:'Opções',sub:'Nome, frase, desconto e a mais provável',value:String(ST.opts.length),href:'#/construtor?passo=opcoes'},
   {icon:'doc',title:'Documento',sub:'O que aparece para o cliente · prévia',href:'#/construtor?passo=documento'},
   {icon:'enviar',color:ST.link?'rgb(var(--pos))':'',title:'Enviar',sub:ST.link?'Link gerado · maestro-os.app/p/'+ST.link:'Conferir e gerar o link pro cliente',value:pend?`<span class="warn">${pend} pendente${pend>1?'s':''}</span>`:null,href:'#/construtor?passo=enviar'}]})}`;
}
function principalH(){
 return {'ver-doc':()=>go('#/construtor?passo=documento'),
  opt:b=>{ST.opt=+b.dataset.i;re()},
  desc:()=>K.formSheet({title:'Desconto da opção',groups:[{title:`Opção ${ST.opt+1} · ${ST.opts[ST.opt].n}`,fields:[{k:'d',label:'Desconto (%)',type:'number',value:String(ST.opts[ST.opt].d)}],foot:'De 0 a 50%. Aparece riscado no documento.'}],
   onOk:v=>{ST.opts[ST.opt].d=Math.max(0,Math.min(50,parseFloat(String(v.d).replace(',','.'))||0));saved();re()}}),
  renomear:()=>K.formSheet({title:'Nome da proposta',groups:[{fields:[{k:'n',label:'Nome',req:true,value:ST.nome}]}],onOk:v=>{ST.nome=v.n;saved();re()}}),
  'amb-novo':()=>K.formSheet({title:'Novo ambiente',ok:'Criar',groups:[{fields:[{k:'n',label:'Nome',req:true,ph:'Ex.: Home theater'}]}],
   onOk:v=>{ST.ambs.push({n:v.n,mo:12,auto:true,it:[[],[],[]]});saved();go('#/construtor?amb='+(ST.ambs.length-1))}}),
  'amb-dup':b=>{const i=+b.dataset.i,a=ST.ambs[i];ST.ambs.splice(i+1,0,clone({...a,n:a.n+' (cópia)'}));saved();re();M.toast(`${a.n} duplicado.`)},
  'amb-rem':b=>remAmb(+b.dataset.i,re)};
}
const remAmb=(i,done)=>{if(ST.ambs.length<2)return M.toast('A proposta precisa de pelo menos um ambiente.');const [x]=ST.ambs.splice(i,1);ST.amb=Math.max(0,Math.min(ST.amb,ST.ambs.length-1));saved();done();
 M.toast(`${x.n} removido`,'Desfazer',()=>{ST.ambs.splice(i,0,x);re()})};

/* =====================================================================
   ambiente: itens com quantidade, kits, mão de obra; Editar = reordenar
   ===================================================================== */
let edit=false,editAmb=-1;
const itemLi=(x,i)=>{const c=C(x.id),kit=!!x.kit,u=c.u.toLowerCase();
 if(edit)return `<li data-ix="${i}"><div class="rw cc-ed"><button type="button" class="cc-hd" data-h aria-label="Arrastar ${esc(c.n)} para mudar a ordem">${ic('alca',22)}</button>${thumb(c)}
   <span class="cc-n"><span class="t1">${esc(c.n)}</span><span class="t2">${x.q} × ${brl(price(x))}</span></span>
   <button type="button" class="cc-ib" data-act="up" data-i="${i}" aria-label="Mover ${esc(c.n)} para cima" ${i===0?'disabled':''}>${ic('voltar',20).replace('<svg','<svg style="transform:rotate(90deg)"')}</button>
   <button type="button" class="cc-ib" data-act="down" data-i="${i}" aria-label="Mover ${esc(c.n)} para baixo" ${i===ST.ambs[ST.amb].it[ST.opt].length-1?'disabled':''}>${ic('baixo',20)}</button></div></li>`;
 return `<li data-swipe data-ix="${i}"><div class="sw-acts" aria-hidden="true"><button type="button" class="a1" data-act="dup" data-i="${i}" tabindex="-1">${ic('copiar',20)}Duplicar</button><button type="button" class="a3" data-act="rem" data-i="${i}" tabindex="-1">${ic('lixo',20)}Remover</button></div>
  <div class="rw cc-it">${thumb(c)}<span class="cc-n"><span class="t1">${esc(c.n)}</span><span class="t2">${esc(c.b)} · ${esc(c.m)}</span></span>
   <button type="button" class="cc-ib" data-act="mn" data-i="${i}" aria-label="Mais ações de ${esc(c.n)}" aria-haspopup="dialog">${ic('pontos',20)}</button>
   <span class="cc-q"><button type="button" class="cc-sb" data-act="q" data-i="${i}" data-d="-1" aria-label="Diminuir quantidade de ${esc(c.n)}" ${x.q<=1?'aria-disabled="true"':''}>−</button><b aria-label="Quantidade">${x.q}</b><button type="button" class="cc-sb" data-act="q" data-i="${i}" data-d="1" aria-label="Aumentar quantidade de ${esc(c.n)}">+</button></span>
   <span class="cc-s"><b>${brl(x.q*price(x))}</b><span>${brl(price(x))}/${u}</span></span>
   ${kit?`<button type="button" class="cc-kt" data-act="kt" data-i="${i}" aria-expanded="${!!x.open}">Kit · ${x.kit.length} itens ${x.open?'▴ fechar':'▾ ver itens'}</button>`:''}</div></li>`
  +(kit&&x.open?x.kit.map((k,j)=>{const kc=C(k.id);return `<li class="cc-kid"><div class="rw cc-it">${thumb(kc,true)}<span class="cc-n"><span class="t1">${esc(kc.n)}</span><span class="t2">${k.q*x.q} no total · ${k.q} por kit</span></span>
   <button type="button" class="cc-ib" data-act="km" data-i="${i}:${j}" aria-label="Ações de ${esc(kc.n)} no kit" aria-haspopup="dialog">${ic('pontos',20)}</button>
   <span class="cc-q"><button type="button" class="cc-sb" data-act="kq" data-i="${i}:${j}" data-d="-1" aria-label="Diminuir ${esc(kc.n)} no kit">−</button><b>${k.q}</b><button type="button" class="cc-sb" data-act="kq" data-i="${i}:${j}" data-d="1" aria-label="Aumentar ${esc(kc.n)} no kit">+</button></span>
   <span class="cc-s"><b>${brl(k.q*kc.p*x.q)}</b><span>${brl(kc.p)}/un</span></span></div></li>`}).join(''):'')};
function ambiente(ai){const a=ST.ambs[ai],o=ST.opt,l=a.it[o];
 if(editAmb!==ai){edit=false;editAmb=ai} ST.amb=ai; if(!l.length)edit=false;
 const moLi=`<li><div class="rw cc-it">${thumb({c:'srv'})}<span class="cc-n"><span class="t1">Mão de obra e instalação</span><span class="t2">${a.auto?'Calculado automaticamente':'Ajustado manualmente'} · % dos produtos</span></span><span></span>
   <span class="cc-q"><button type="button" class="cc-sb" data-act="mo" data-d="-1" aria-label="Diminuir mão de obra">−</button><b>${a.mo}%</b><button type="button" class="cc-sb" data-act="mo" data-d="1" aria-label="Aumentar mão de obra">+</button></span>
   <span class="cc-s"><b>${brl(mo(a,o))}</b><span>${brl(prod(a,o))} em produtos</span></span>
   ${a.auto?'':`<button type="button" class="cc-link" data-act="mo-auto">Voltar ao automático (12%)</button>`}</div></li>`;
 return `${K.nav({title:a.n,back:'Proposta',kick:`Ambiente ${ai+1} de ${ST.ambs.length}`,acts:[...(l.length?[{text:edit?'OK':'Editar',title:edit?'Concluir a ordem':'Mudar a ordem dos itens',act:'editar'}]:[]),{icon:'mais',title:'Adicionar produto ou kit',act:'buscar'}]})}
 ${optBar(`<span class="cc-t2">Ambiente <b class="num">${M.brl0(ambT(a,o))}</b></span>`,`<span class="cc-t2">Total da opção <b class="num">${M.brl0(optF(o))}</b></span>`)}
 ${l.length?`<section class="grp"><h2>${l.length} ${l.length>1?'itens':'item'} · opção ${o+1} · ${esc(ST.opts[o].n)}</h2><ul class="lst cc-items">${l.map(itemLi).join('')}${edit?'':moLi}</ul>
   <div class="foot">${edit?'Arraste pela alça ou use as setas para mudar a ordem. Toque OK para terminar.':'Deslize o item para duplicar ou remover. ⋯ move para outro ambiente.'}</div></section>`
  :`<section class="mcard" style="text-align:center"><b style="display:block;font-size:19px;margin:8px 0 6px">Nenhum item neste ambiente</b><p class="soft" style="margin:0 0 16px;font-size:15px">Busque um produto ou kit, ou traga os itens de outra opção.</p>
   <div class="stack" style="gap:8px">${K.btn('Buscar produto ou kit',{act:'buscar',pri:true,icon:'buscar'})}${ST.opts.map((y,k)=>k!==o&&a.it[k].length?K.btn(`Usar itens da opção ${k+1} · ${y.n}`,{act:'copiar-opt'}).replace('data-act="copiar-opt"',`data-act="copiar-opt" data-i="${k}"`):'').join('')}</div></section>`}
 ${edit?'':K.group({title:'Adicionar',rows:[{icon:'buscar',title:'Buscar produto ou kit',sub:'Nome, marca ou modelo · um toque adiciona',act:'buscar'}]})}
 ${edit?'':K.group({title:'Ambiente',rows:[{icon:'propostas',title:'Renomear ambiente',act:'amb-ren'},{icon:'copiar',title:'Duplicar ambiente',act:'amb-dup2'},{icon:'lixo',color:'rgb(var(--neg))',title:'<span class="neg">Remover ambiente</span>',act:'amb-rem2'}]})}`;
}
function ambienteH(v,ai){const a=ST.ambs[ai],l=()=>a.it[ST.opt],x=b=>l()[+b.dataset.i];
 const moverPara=i=>K.actions({title:'Mover para qual ambiente?',items:ST.ambs.map((b,k)=>k===ai?null:{label:b.n,run:()=>moveItem(ai,i,k,null)}).filter(Boolean)});
 const H={
  editar:()=>{edit=!edit;re()}, buscar:()=>buscar(ai),
  q:b=>{const y=x(b);y.q=Math.max(1,y.q+ +b.dataset.d);saved();re()},
  dup:b=>{const i=+b.dataset.i;l().splice(i+1,0,clone(l()[i]));saved();re();M.toast('Item duplicado.')},
  rem:b=>removeItem(a,+b.dataset.i),
  kt:b=>{const y=x(b);y.open=!y.open;re()},
  kq:b=>{const [i,j]=b.dataset.i.split(':').map(Number),k=l()[i].kit[j];k.q=Math.max(1,k.q+ +b.dataset.d);saved();re()},
  km:b=>{const [i,j]=b.dataset.i.split(':').map(Number),y=l()[i],k=y.kit[j],kc=C(k.id),same=CAT.filter(c=>c.c===kc.c&&c.id!==kc.id).slice(0,4);
   K.actions({title:`${kc.n} · no ${C(y.id).n}`,items:[...same.map(c=>({label:'Trocar por '+c.n,run:()=>{k.id=c.id;saved();re();M.toast('Item do kit trocado.')}})),
    {label:'Remover do kit',dng:true,run:()=>{if(y.kit.length<2)return M.toast('O kit precisa de pelo menos um item.');y.kit.splice(j,1);saved();re()}}]})},
  mn:b=>{const i=+b.dataset.i,y=l()[i],c=C(y.id),n=l().length;
   K.actions({title:c.n,items:[{label:'Duplicar item',run:()=>{l().splice(i+1,0,clone(y));saved();re()}},{label:'Personalizar exibição…',run:()=>exibicao(y)},
    ...(i>0?[{label:'Mover para cima',run:()=>moveItem(ai,i,ai,i-1)}]:[]),...(i<n-1?[{label:'Mover para baixo',run:()=>moveItem(ai,i,ai,i+1)}]:[]),
    ...(ST.ambs.length>1?[{label:'Mover para outro ambiente…',run:()=>moverPara(i)}]:[]),{label:'Remover',dng:true,run:()=>removeItem(a,i)}]})},
  up:b=>{const i=+b.dataset.i;if(i>0)moveItem(ai,i,ai,i-1)},
  down:b=>{const i=+b.dataset.i;if(i<l().length-1)moveItem(ai,i,ai,i+1)},
  mo:b=>{a.mo=Math.max(0,Math.min(60,a.mo+ +b.dataset.d));a.auto=a.mo===12;saved();re()},
  'mo-auto':()=>{a.mo=12;a.auto=true;saved();re()},
  'copiar-opt':b=>{a.it[ST.opt]=clone(a.it[+b.dataset.i]);saved();re();M.toast(`Itens da opção ${+b.dataset.i+1} copiados para ${a.n}.`)},
  'amb-ren':()=>K.formSheet({title:'Renomear ambiente',groups:[{fields:[{k:'n',label:'Nome',req:true,value:a.n}]}],onOk:val=>{a.n=val.n;saved();re()}}),
  'amb-dup2':()=>{ST.ambs.splice(ai+1,0,clone({...a,n:a.n+' (cópia)'}));saved();go('#/construtor?amb='+(ai+1));M.toast(`${a.n} duplicado.`)},
  'amb-rem2':()=>K.confirm({title:`Remover “${a.n}”?`,text:'Os itens das 3 opções saem junto. Dá para desfazer logo depois.',ok:'Remover ambiente',dng:true,run:()=>{if(ST.ambs.length<2)return M.toast('A proposta precisa de pelo menos um ambiente.');go('#/construtor');setTimeout(()=>remAmb(ai,re),0)}})};
 /* arrastar pela alça (toque ou mouse) */
 $$('[data-h]',v).forEach(h=>h.onpointerdown=e=>{e.preventDefault();const li=h.closest('li'),ul=li.parentElement,rows=$$(':scope>li[data-ix]',ul),from=rows.indexOf(li),hs=li.offsetHeight,
   mids=rows.map(r=>{const bb=r.getBoundingClientRect();return bb.top+bb.height/2}),y0=e.clientY;let to=from;
  try{h.setPointerCapture(e.pointerId)}catch(_){} li.classList.add('cc-drag');
  const mv=ev=>{const dy=ev.clientY-y0;li.style.transform=`translateY(${dy}px)`;const cy=mids[from]+dy;to=rows.filter((r,k)=>k!==from&&mids[k]<cy).length;
   rows.forEach((r,k)=>{if(k===from)return;const s=from<to&&k>from&&k<=to?-hs:to<from&&k>=to&&k<from?hs:0;r.style.transform=s?`translateY(${s}px)`:''})};
  const up=()=>{h.removeEventListener('pointermove',mv);h.removeEventListener('pointerup',up);h.removeEventListener('pointercancel',up);li.classList.remove('cc-drag');rows.forEach(r=>r.style.transform='');
   if(to!==from){moveItem(ai,from,ai,to);M.toast(`${C(l()[to].id).n} agora é o ${to+1}º item.`)}};
  h.addEventListener('pointermove',mv);h.addEventListener('pointerup',up);h.addEventListener('pointercancel',up)});
 return H;
}

/* =====================================================================
   passos: Opções · Documento · Enviar
   ===================================================================== */
function opcoes(){return `${K.nav({title:'Opções',back:'Proposta',sub:'Até 3 opções lado a lado no documento. A mais provável aparece em destaque.'})}
 ${ST.opts.map((o,i)=>grp(`Opção ${i+1}${i===ST.opt?' · em edição':''}`,
   K.row({icon:String(i+1),color:o.likely?'rgb(var(--primary))':'#8e8e93',title:esc(o.n),sub:esc(o.f||'Sem frase'),act:'opt-edit',i})
   +swRow('Mais provável de fechar',o.likely,'like',i,'estrela')
   +info({title:`Total · ${nItems(i)} itens`,value:`${o.d?`<span class="faint" style="text-decoration:line-through;display:block;font-size:13px">${brl(optT(i))}</span>`:''}<b>${brl(optF(i))}</b>${o.d?`<span style="display:block;font-size:13px">−${o.d}%</span>`:''}`})
   +K.row({icon:'lista',title:'Editar itens desta opção',act:'opt-itens',i})
   +K.row({icon:'copiar',title:'Usar como base de outra',sub:'Copia os itens desta para outra opção',act:'opt-base',i}))).join('')}`}
const opcoesH=()=>({
 'opt-edit':b=>{const i=+b.dataset.i,o=ST.opts[i];K.formSheet({title:`Opção ${i+1}`,groups:[{fields:[{k:'n',label:'Nome',req:true,value:o.n},{k:'f',label:'Frase',value:o.f},{k:'d',label:'Desconto (%)',type:'number',value:String(o.d)}],foot:'A frase aparece embaixo do nome no documento.'}],
  onOk:v=>{o.n=v.n;o.f=v.f;o.d=Math.max(0,Math.min(50,parseFloat(String(v.d).replace(',','.'))||0));saved();re()}})},
 like:b=>{const t=+b.dataset.i,was=ST.opts[t].likely;ST.opts.forEach((o,i)=>o.likely=i===t&&!was);saved();re()},
 'opt-itens':b=>{ST.opt=+b.dataset.i;go('#/construtor')},
 'opt-base':b=>{const s=+b.dataset.i;K.actions({title:`Copiar os itens da opção ${s+1} para…`,items:ST.opts.map((o,t)=>t===s?null:{label:`Opção ${t+1} · ${o.n}`,run:()=>{
   const old=ST.ambs.map(a=>a.it[t]);ST.ambs.forEach(a=>a.it[t]=clone(a.it[s]));saved();re();
   M.toast(`Itens da opção ${s+1} copiados para a opção ${t+1}`,'Desfazer',()=>{ST.ambs.forEach((a,k)=>a.it[t]=old[k]);re()})}}).filter(Boolean)})}});
const paper=()=>{const d=ST.doc;return `<div class="cc-paper"><div class="k">Proposta comercial · outubro de 2026</div><h3>${esc(ST.nome)}</h3><div style="color:#4b5563">Para ${esc(ST.cliente)}</div>
 <div class="cc-po">${ST.opts.map((o,i)=>`<div class="${o.likely?'lk':''}"><div style="font-size:11px;color:#6b7280;font-weight:600">Opção ${i+1}${o.likely?' · recomendada':''}</div><div style="font-weight:700;font-size:15px">${esc(o.n)}</div><div style="color:#4b5563;font-size:12px">${esc(o.f)}</div><div style="font-weight:700;font-size:18px;margin-top:6px;font-variant-numeric:tabular-nums">${fmtV(optF(i),i)}</div></div>`).join('')}</div>
 ${ST.ambs.map(a=>`<div class="cc-pa"><b>${esc(a.n)}</b>${d.preco?`<b style="font-variant-numeric:tabular-nums">${brl(ambT(a,ST.opt))}</b>`:''}</div>
  ${a.it[ST.opt].map(x=>{const c=C(x.id),ex=x.ex||{},im=ex.imagem??d.imagem,mod=ex.modelo??d.modelo,ds=ex.desc??d.resumo;return `<div class="cc-pl ${im?'im':''}">${im?thumb(c,true):''}<div style="min-width:0"><b>${x.q}× ${esc(c.n)}</b>${mod?`<span style="color:#6b7280"> · ${esc(c.b)} ${esc(c.m)}</span>`:''}
   ${x.kit?`<small>Inclui: ${x.kit.map(k=>k.q+'× '+C(k.id).n).join(', ')}.</small>`:''}${ds&&!x.kit?`<small>${c.u==='MT'?'Vendido por metro.':'Instalado e configurado pela equipe.'}</small>`:''}${d.completa?'<small>Garantia do fabricante, integração com o sistema da casa e suporte no primeiro ano.</small>':''}</div>
   ${d.preco?`<div class="pp">${brl(x.q*price(x))}</div>`:''}</div>`}).join('')||'<div class="cc-pl"><small>Ambiente sem itens nesta opção.</small></div>'}`).join('')}</div>`};
function documento(){const T=[['modelo','Modelo'],['imagem','Imagem'],['resumo','Descrição resumida'],['completa','Descrição completa'],['preco','Preço por item']];
 return `${K.nav({title:'Documento',back:'Proposta',sub:'O que o cliente vê. A prévia muda na hora.'})}
 <section class="grp cc-sw"><h2>Exibição</h2><ul class="lst">${T.map(([k,l])=>swRow(l,ST.doc[k],'dt',k)).join('')}</ul></section>
 <section class="grp"><h2>Formato dos valores no comparativo</h2>${K.seg('cc-fmt',[['reais','R$ 214.000'],['curto','R$ 214k'],['pct','+18%']],ST.doc.fmt,'Formato dos valores')}</section>
 <section class="grp"><h2>Opção mostrada no detalhe</h2>${K.seg('cc-optdoc',ST.opts.map((x,i)=>[String(i),(x.likely?'★ ':'')+x.n]),String(ST.opt),'Opção mostrada no detalhe')}</section>
 <section class="grp"><h2>Prévia</h2>${paper()}</section>
 ${K.group({rows:[{icon:'enviar',title:'Ir para Enviar',sub:'Conferir e gerar o link pro cliente',href:'#/construtor?passo=enviar'}]})}`}
const documentoH=v=>{K.bindPick(v,'cc-fmt',x=>{ST.doc.fmt=x;re()});K.bindPick(v,'cc-optdoc',x=>{ST.opt=+x;re()});
 return {dt:b=>{const k=b.dataset.i;ST.doc[k]=!ST.doc[k];saved();re()}}};
function enviar(){const ck=checks(),ok=ck.every(c=>c[1]),lk=Math.max(0,ST.opts.findIndex(o=>o.likely));
 return `${K.nav({title:'Enviar',back:'Proposta',sub:'Confira o essencial e gere o link público da proposta.'})}
 ${grp('Antes de enviar',ck.map((c,i)=>c[1]?info({icon:'check',color:'rgb(var(--pos))',title:c[0]}):K.row({icon:'!',color:'rgb(var(--warn))',title:c[0],sub:'Toque para resolver',act:'fix',i})).join(''))}
 <section class="mcard"><h3>${ST.link?'Link gerado':'Enviar pro cliente'}</h3><p class="soft" style="margin:0 0 16px;font-size:15px">${ST.link?`O cliente vê as ${ST.opts.length} opções lado a lado e aceita pelo próprio link.`:`Um link com as ${ST.opts.length} opções lado a lado, a recomendada em destaque e o detalhe por ambiente. O cliente escolhe e aceita pelo link.`}</p>
  ${K.btn(ST.link?'Gerar de novo…':'Gerar pra cliente',{act:'gerar',pri:!ST.link&&ok,icon:'enviar'})}${ok?'':'<p class="warn" style="margin:10px 0 0;font-size:14px">Resolva os itens acima antes de gerar.</p>'}</section>
 ${ST.link?K.group({title:'Link público',foot:`${ST.opts.length} opções · total recomendado ${brl(optF(lk))}`,rows:[{icon:'copiar',title:'maestro-os.app/p/'+ST.link,sub:'Toque para copiar',act:'copiar',chev:false},
   {icon:'zap',color:'rgb(var(--pos))',title:'Enviar por WhatsApp',sub:ST.cliente,href:'https://wa.me/?text='+encodeURIComponent(`Olá! Segue a proposta “${ST.nome}”: https://maestro-os.app/p/${ST.link}`)},
   {icon:'olho',title:'Ver documento',href:'#/construtor?passo=documento'}]}).replace('href="https://wa.me','target="_blank" rel="noopener" href="https://wa.me'):''}`}
const enviarH=()=>{const gerar=()=>{ST.link=Math.random().toString(36).slice(2,8);saved();re();M.toast('Link gerado.')};
 return {fix:b=>{const i=+b.dataset.i;if(i===1){const k=ST.ambs.findIndex(a=>!a.it[ST.opt].length);return go('#/construtor?amb='+Math.max(0,k))}if(i===0)return go('#/construtor?amb=0');M.toast('Vincule o cliente pelo negócio.')},
  gerar:()=>{if(!checks().every(c=>c[1]))return M.toast('Resolva os itens pendentes antes de gerar.');
   if(!ST.link)return gerar();
   K.actions({title:'Este link já foi gerado. O que fazer?',items:[{label:'Gerar novo link',run:gerar},{label:'Manter o link atual',run:()=>M.toast('Link mantido.')},{label:'Invalidar link',dng:true,run:()=>{const old=ST.link;ST.link=null;re();M.toast('Link invalidado.','Desfazer',()=>{ST.link=old;re()})}}]})},
  copiar:()=>{const u='https://maestro-os.app/p/'+ST.link;try{navigator.clipboard.writeText(u).then(()=>M.toast('Link copiado.'),()=>M.toast('Link: '+u))}catch(e){M.toast('Link: '+u)}}}};

M.mscreen('construtor',{title:'Construtor de propostas',tab:'propostas',
 help:['Troque a opção no topo; o total dela fica sempre à vista.','Toque num ambiente para montar os itens: + busca produtos e kits, − e + mudam a quantidade, deslize para remover ou duplicar.','No fim da tela: Opções, Documento e Enviar, onde você gera o link pro cliente.'],
 render:q=>{const a=q.get('amb'),p=q.get('passo');
  if(a!=null){const i=+a;return ST.ambs[i]?ambiente(i):`${K.nav({title:'Ambiente',back:'Proposta'})}${K.empty({title:'Este ambiente não existe mais.',text:'Ele pode ter sido removido.',btn:'Voltar à proposta',act:'voltar'})}`}
  if(p==='opcoes')return opcoes(); if(p==='documento')return documento(); if(p==='enviar')return enviar();
  return principal()},
 mount:(v,q)=>{const a=q.get('amb'),p=q.get('passo');
  K.bindPick(v,'cc-opt',x=>{ST.opt=+x;saved();re()});
  if(a!=null){const i=+a;return M.wire(v,ST.ambs[i]?ambienteH(v,i):{voltar:()=>go('#/construtor')})}
  M.wire(v,p==='opcoes'?opcoesH():p==='documento'?documentoH(v):p==='enviar'?enviarH():principalH())}});
})();

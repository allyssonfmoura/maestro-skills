/* Maestro OS · protótipo · mod-sistema
   Telas: IA Fiscal (fiscal) · Catálogo (catalogo) · Relatórios (relatorios) · Numbers (numbers)
          Central de Ajustes (ajustes) + ajustes/financeiro · ajustes/proposta · ajustes/fechamento · ajustes/modulos
   Fonte: inventario/02 e 04 + o código (o código do sistema, 02/10/2026). Estado em window.__sy (coerente entre telas):
   o Catálogo marca "Na biblioteca" pelo SKU dos produtos da IA Fiscal; adicionar à biblioteca cria o produto lá. */
(function(){
const {ic,brl,$,$$,esc}=M, U=M.ui, D=M.D;

/* ---------- CSS próprio (prefixo sy-, medidas em múltiplos de 4, só variáveis do tema) ---------- */
document.head.insertAdjacentHTML('beforeend',`<style id="sy-css">
.sy-sm{font-size:12px}
.sy-save[hidden],#view .field[hidden],.modal .field[hidden]{display:none!important}
.sy-blk{display:block}
.sy-ell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;min-width:0}
.sy-band{display:flex;align-items:center;gap:16px;margin-bottom:24px;padding:16px 16px 16px 24px}
.sy-ai{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;flex:none;color:#fff;background:linear-gradient(140deg,rgb(var(--primary)),rgb(var(--primary-soft)))}
.sy-ai.sm{width:28px;height:28px;border-radius:8px}
.btn.sy-danger,.btn.sy-danger:hover{background:rgb(var(--neg));color:#fff;box-shadow:none}
.sy-acts{width:236px;margin-left:auto}
.sy-acts.w{width:264px}
.sy-mtabs{margin-bottom:24px;overflow-x:auto;padding-bottom:4px}
.sy-box{border-radius:16px;padding:16px}
.sy-kitadd{display:grid;grid-template-columns:minmax(0,1fr) 96px 200px;gap:12px;align-items:center}
.sy-kitrow{display:flex;align-items:center;gap:12px;min-height:52px;border-bottom:1px solid var(--line-2)}
.sy-w120{width:120px;text-align:right;flex:none}
.sy-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;list-style:none;margin:0 0 24px;padding:0}
.sy-step{display:flex;align-items:center;gap:12px;height:44px;padding:0 16px;border-radius:12px;font-weight:600;color:var(--soft);box-shadow:inset 0 0 0 1px var(--line)}
.sy-step[aria-current]{color:rgb(var(--primary));box-shadow:inset 0 0 0 2px rgb(var(--primary)/.5);background:rgb(var(--primary)/.06)}
.sy-step.done{color:rgb(var(--pos))}
.sy-n{width:28px;height:28px;border-radius:999px;display:grid;place-items:center;flex:none;font-size:12px;font-weight:700;background:color-mix(in srgb,var(--text) 7%,transparent)}
.sy-drop{border:2px dashed var(--line);border-radius:16px;padding:48px 24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;transition:background .2s var(--ease),border-color .2s var(--ease)}
.sy-drop.over{border-color:rgb(var(--primary));background:rgb(var(--primary)/.06)}
.sy-drop p{margin:0 0 16px;max-width:480px}
.sy-w400{width:min(400px,100%)}
.sy-foot{display:flex;align-items:center;gap:16px;padding:16px var(--pad);border-top:1px solid var(--line)}
.sy-block{display:grid;grid-template-columns:36px minmax(0,1fr) 136px 184px 124px;gap:12px;align-items:center;padding:12px var(--pad);border-top:1px solid var(--line-2)}
.sy-block.h{padding-top:8px;padding-bottom:8px;font-size:12px;font-weight:600;color:var(--faint);border-top:1px solid var(--line)}
.sy-up svg{transform:rotate(180deg)}
.sy-list{list-style:none;margin:0;padding:0}
.sy-pend{display:grid;grid-template-columns:40px minmax(0,1fr) 264px;gap:16px;align-items:center;padding:16px var(--pad);border-top:1px solid var(--line-2)}
.sy-ask{display:grid;grid-template-columns:minmax(0,1fr) 44px;gap:12px}
.btn.sy-left{justify-content:flex-start;text-align:left}
.sy-msg{display:flex;flex-direction:column;gap:8px;margin-bottom:24px}
.sy-q{align-self:flex-end;max-width:80%;padding:8px 16px;border-radius:16px;background:rgb(var(--primary));color:#fff}
.sy-a{border-radius:16px;padding:16px}
.sy-a p{margin:0 0 12px}
.sy-pcard{display:flex;flex-direction:column;gap:8px;padding:16px;min-width:0}
.sy-foto{width:100%;height:144px;border-radius:12px;margin-bottom:8px}
.sy-foto.lg{height:200px;margin:16px 0 8px}
.sy-clamp2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.sy-link{border:0;background:none;padding:0;margin:0;text-align:left;font-weight:600;font-size:16px;line-height:1.25;color:inherit;cursor:pointer}
.sy-link:hover{color:rgb(var(--primary))}
.sy-desc{margin:0 0 8px;flex:1}
.sy-pager{display:flex;align-items:center;justify-content:center;gap:24px;margin-top:24px}
.sy-svg{width:100%;height:auto;display:block}
.sy-hrow{display:grid;grid-template-columns:200px minmax(0,1fr) 128px;gap:16px;align-items:center;min-height:44px}
.sy-hbar{height:12px;border-radius:999px;background:color-mix(in srgb,var(--text) 7%,transparent);overflow:hidden}
.sy-hbar>b{display:block;height:100%;border-radius:999px;background:rgb(var(--primary));transition:width .5s var(--ease)}
.sy-band3{display:flex;gap:4px;height:16px;border-radius:999px;overflow:hidden}
.sy-band3>b{display:block;height:100%}
.sy-nav{padding:12px;align-self:start}
.sy-nav .btn{width:100%;justify-content:space-between}
.sy-sech{display:flex;flex-direction:column;gap:4px;padding:16px var(--pad) 8px;border-top:1px solid var(--line)}
.sy-item{display:grid;grid-template-columns:40px minmax(0,1fr) 20px;gap:16px;align-items:center;width:100%;min-height:64px;padding:12px var(--pad);border:0;border-top:1px solid var(--line-2);background:transparent;text-align:left;color:inherit;transition:background .2s var(--ease)}
.sy-item:hover{background:color-mix(in srgb,var(--text) 3.5%,transparent)}
.sy-ul{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;color:var(--soft)}
.sy-tg{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:center;padding:16px 0;border-top:1px solid var(--line-2)}
.sy-tg.first{border-top:0;padding-top:8px}
.sy-ind{padding-left:24px}
.sy-off{opacity:.4;pointer-events:none}
.sy-opt{display:flex;align-items:flex-start;gap:12px;width:100%;padding:16px;border:0;border-radius:16px;background:transparent;box-shadow:inset 0 0 0 1px var(--line);text-align:left;color:inherit;transition:box-shadow .2s var(--ease),background .2s var(--ease)}
.sy-opt[aria-checked="true"]{box-shadow:inset 0 0 0 2px rgb(var(--primary));background:rgb(var(--primary)/.04)}
.sy-radio{width:20px;height:20px;border-radius:999px;flex:none;box-shadow:inset 0 0 0 2px var(--faint);transition:box-shadow .2s var(--ease)}
.sy-opt[aria-checked="true"] .sy-radio{background:rgb(var(--primary));box-shadow:inset 0 0 0 4px var(--panel),0 0 0 2px rgb(var(--primary))}
.sy-save{position:fixed;left:50%;bottom:112px;transform:translateX(-50%);z-index:45;width:min(720px,calc(100vw - 32px));display:flex;align-items:center;gap:16px;padding:12px 12px 12px 24px;border-radius:20px}
.sy-arow{display:grid;grid-template-columns:64px minmax(0,1fr) 120px 36px;gap:12px;align-items:center;min-height:48px;padding:4px var(--pad);border-top:1px solid var(--line-2)}
.sy-arow>.chip{justify-self:start}
.sy-kitrow>.sy-ell{flex:1}
.sy-mrow{display:grid;grid-template-columns:40px minmax(0,1fr) 144px 112px;gap:16px;align-items:center;padding:16px var(--pad);border-top:1px solid var(--line-2)}
.sy-doc{min-height:52px;border-bottom:1px solid var(--line-2)}
.sy-doc:last-child{border-bottom:0}
.sy-ph{height:64px;width:100%;border-radius:12px}
@media (max-width:900px){
 .sy-kitadd{grid-template-columns:minmax(0,1fr)}
 .sy-hrow{grid-template-columns:minmax(0,1fr) 128px}.sy-hrow .sy-hbar{grid-column:1/-1}
 .sy-save{bottom:96px}
}
/* ---- responsivo por contêiner (vale nos 3 arranjos: Padrão, Coluna única, Lateral) ---- */
.sy-cq{container-type:inline-size}
.sy-nw{flex-wrap:nowrap!important}
.sy-x{display:none}
.sy-tf{table-layout:fixed}
#sy-ft .tbl{min-width:1080px}
#sy-rt .tbl{min-width:1000px}
#sy-cb .sy-tf{min-width:880px}
.sy-band{flex-wrap:wrap}.sy-band>div{flex:1 1 240px}.sy-band>.btn{margin-left:auto}
.sy-cgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(264px,1fr));gap:24px}
.sy-pager{display:grid;grid-template-columns:minmax(0,144px) auto minmax(0,144px);gap:16px;justify-content:center;align-items:center}
.sy-pager>.btn{width:100%!important}
.sy-tile{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:24px}
.sy-save{flex-wrap:wrap}.sy-save>b{flex:1 1 160px}.sy-save>.btnrow{width:min(312px,100%)!important}
.sy-ch-acts{width:min(264px,100%)!important}
@container (max-width:1099px){
 #sy-ft .tbl th:nth-child(2),#sy-ft .tbl td:nth-child(2){display:none}#sy-ft .sy-x.sku{display:inline}#sy-ft .tbl{min-width:900px}
 #sy-rt .tbl th:nth-child(4),#sy-rt .tbl td:nth-child(4){display:none}#sy-rt .sy-x{display:inline}#sy-rt .tbl{min-width:800px}
}
@container (max-width:959px){
 #sy-ft .tbl th:nth-child(3),#sy-ft .tbl td:nth-child(3){display:none}#sy-ft .sy-x.ncm{display:inline}#sy-ft .tbl{min-width:880px}
 #sy-ft .tbl th:last-child{width:232px}#sy-ft .sy-acts{width:196px}
 .sy-split>*{grid-column:1/-1!important}
 .sy-split>aside{position:static!important}
}
@container (max-width:760px){
 .sy-block{grid-template-columns:36px minmax(0,1fr)}.sy-block>*:nth-child(n+3){grid-column:2}.sy-block>*:nth-child(5){justify-content:flex-start!important}.sy-block.h{display:none}
 .sy-pend{grid-template-columns:40px minmax(0,1fr);align-items:start}.sy-pend>.btnrow{grid-column:1/-1;width:100%;margin:0}
 .sy-mrow{grid-template-columns:40px minmax(0,1fr) 112px}.sy-mrow>*:nth-child(3){grid-column:2;grid-row:2}.sy-mrow>*:nth-child(4){grid-column:3;grid-row:1/span 2}
 .fgrid>.f3,.fgrid>.f4,.fgrid>.f8{grid-column:span 6}
}
@container (max-width:600px){
 .sy-steps{grid-template-columns:minmax(0,1fr)}
 .sy-arow{grid-template-columns:40px minmax(0,1fr) 36px;row-gap:4px;padding-top:8px;padding-bottom:8px}.sy-arow>.row{flex-wrap:wrap!important;row-gap:4px}.sy-arow>*:nth-child(3){grid-column:2;grid-row:2;justify-self:start}.sy-arow>*:nth-child(4){grid-column:3;grid-row:1/span 2}
 .sy-mrow{grid-template-columns:40px minmax(0,1fr)}.sy-mrow>*:nth-child(4){grid-column:2;grid-row:3}
 .sy-foot{flex-wrap:wrap}.sy-foot>.btnrow,.sy-foot>.btn{width:100%!important}
 .sy-tg{gap:16px}
}
@container (max-width:520px){.fgrid>*{grid-column:span 12!important}}
@container (max-width:1000px){.fgrid>.f3{grid-column:span 6}}
@media (max-width:600px){.sy-kitrow{flex-wrap:wrap;padding:8px 0}.sy-kitrow>.sy-ell{flex:1 1 calc(100% - 44px)}.sy-kitrow>.sy-w120{margin-left:auto}}
/* Central de Ajustes: no tablet e em arranjo estreito, assuntos viram linha de abas roláveis acima da lista */
@container (max-width:900px){
 .sy-ajg>.sy-nav{grid-column:1/-1!important;padding:4px;overflow-x:auto;scrollbar-width:none}
 .sy-ajg>.sy-nav>.stack{flex-direction:row}
 .sy-ajg>.sy-nav .btn{width:auto;flex:none;gap:8px}
 .sy-ajg>.s9{grid-column:1/-1!important}
}
@media (max-width:1180px){
 .sy-ajg>.sy-nav{grid-column:1/-1!important;padding:4px;overflow-x:auto;scrollbar-width:none}
 .sy-ajg>.sy-nav>.stack{flex-direction:row}
 .sy-ajg>.sy-nav .btn{width:auto;flex:none;gap:8px}
 .sy-ajg>.s9{grid-column:1/-1!important}
}
</style>`);

/* ---------- utilidades ---------- */
const rr=()=>dispatchEvent(new HashChangeEvent('hashchange'));
const go=(k,label)=>M.screens[k]?(location.hash='#/'+k):M.toast(`Abre ${label} (tela de outro módulo do protótipo).`);
const fmtN=(n,d=2)=>Number(n).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const num=s=>{s=String(s??'').trim().replace(/[R$\s%]/g,'');if(!s)return null;if(s.includes(','))s=s.replace(/\./g,'').replace(',','.');const n=parseFloat(s);return isNaN(n)?null:n};
const sum=a=>a.reduce((s,x)=>s+x,0);
/* controles com largura fixa do kit viram encolhíveis: width:Npx → width:min(Npx,100%) */
const fit=h=>h.replace(/style="width:(\d+)px/g,'style="width:min($1px,100%)');
const fixT=h=>h.replace('<table class="tbl" style="table-layout:fixed">','<table class="tbl sy-tf">');
const clone=o=>JSON.parse(JSON.stringify(o));
const sw=(key,on,label)=>`<button type="button" class="sw" role="switch" aria-checked="${!!on}" aria-label="${esc(label)}" data-sw="${key}"></button>`;
const CATICON={auto:'chip',rede:'wifi',audio:'som',luz:'luz',clima:'neve',seg:'camera',srv:'chave',kit:'caixa'};
const CATN={auto:'Automação',rede:'Rede e Wi-Fi',audio:'Áudio e vídeo',luz:'Iluminação',clima:'Climatização',seg:'Segurança',kit:'Kit'};
const thumb=(c,sm)=>`<span class="thumb${sm?' sm':''}" data-cat="${c}" aria-hidden="true">${ic(CATICON[c]||'chip',sm?16:20)}</span>`;
const confChip=c=>c>=85?U.chip('Confiança alta · '+c+'%','g'):c>=60?U.chip('Confiança média · '+c+'%','w'):U.chip('Confiança baixa · '+c+'%','r');
const markErr=(root,k,msg)=>{const f=$(`[name="${k}"]`,root);if(!f)return;const w=f.closest('.field');w.classList.add('err');const m=$('.msg',w);if(m){m.textContent=msg;m.hidden=false}};
const clearErr=root=>$$('.field.err',root).forEach(w=>{w.classList.remove('err');const m=$('.msg',w);if(m)m.hidden=true});

/* =====================================================================
   ESTADO (uma vez por sessão)
   ===================================================================== */
const S=window.__sy||(window.__sy={});
if(!S.prod){
  S.par={uf:'MG',reg:'Lucro Presumido',int:18,inter:12,pis:0.65,cof:3};
  S.st=[{ncm:'8544.49.00',d:'Fios e cabos elétricos',mva:37},{ncm:'8536.50.90',d:'Interruptores e comutadores',mva:37},
    {ncm:'9405.42.00',d:'Luminárias e fitas de LED',mva:40},{ncm:'8518.21.00',d:'Alto-falante único montado em caixa',mva:39},
    {ncm:'8518.29.90',d:'Outros alto-falantes',mva:39},{ncm:'8415.10.11',d:'Ar-condicionado split',mva:37},{ncm:'8504.40.90',d:'Fontes e conversores estáticos',mva:37}];
  S.uf=[['SP','Sudeste',12,18],['RJ','Sudeste',12,22],['PR','Sul',12,19.5],['SC','Sul',12,17],['RS','Sul',12,17],['ES','Sudeste',7,17],
    ['GO','Centro-Oeste',7,19],['DF','Centro-Oeste',7,20],['BA','Nordeste',7,20.5],['PE','Nordeste',7,20.5],['AM','Norte',7,20]];
  S.calc=[{t:'pct',n:'Despesas operacionais',v:18},{t:'fixo',n:'Embalagem e manuseio',v:5},{t:'meta',n:'Lucro sobre o preço',v:25},{t:'form',n:'Arredondar para cima',v:10}];
  const base={u:'UN',frete:3,ipi:0,icmsE:12,cest:'',orig:'0 · Nacional',res:'',comp:'',rev:false,kit:null,pv:null};
  S.prod=[
   ['p1','Controlador de automação CORE 5','C4-CORE5','Control4','CORE 5','UN','auto','8471.50.10',7800],
   ['p2','Access point Wi-Fi 7 de teto U7-Pro','UBI-U7PRO','Ubiquiti','U7-Pro','UN','rede','8517.62.77',980],
   ['p3','Amplificador de streaming Amp','SON-AMP','Sonos','Amp','UN','audio','8543.70.99',2790,{rev:true,sug:'8518.40.00',conf:92}],
   ['p4','Caixa acústica de embutir 6,5"','KLI-CDT5650','Klipsch','CDT-5650','PR','audio','8518.21.00',360],
   ['p5','Subwoofer 10 polegadas','KLI-R100SW','Klipsch','R-100SW','UN','audio','8518.29.90',1100],
   ['p6','Câmera IP bullet 2 MP','INT-VIP3230B','Intelbras','VIP 3230 B','UN','seg','8525.89.29',250],
   ['p7','Cabo de rede CAT6','CAB-CAT6','Furukawa','GigaLan CAT6','MT','rede','8544.49.00',2.4],
   ['p8','Fita LED 24V 3000K 10W/m','STH-FITA24','Stella','STH7824','MT','luz','9405.42.00',34],
   ['p9','Fonte para LED 24V 150W','STH-DRIVER','Stella','STH8150','UN','luz','8504.40.9',null,{sug:'8504.40.90',conf:96,ucusto:120}],
   ['p10','Interruptor inteligente 4 teclas','C4-KD120','Control4','KD120','UN','auto','8536.50.90',210],
   ['p11','Motor de cortina','SOM-GLYDEA','Somfy','Glydea','UN','auto','8501.10.19',560,{rev:true,sug:'8501.31.10',conf:71}],
   ['p12','Ar-condicionado split inverter 12.000 BTUs','LG-DUAL12','LG','Dual Inverter','UN','clima','8415.10.11',2050],
   ['p13','Receiver AV 7.2 canais','DEN-X1800','Denon','AVR-X1800H','UN','audio','8519.81.90',2600,{rev:true,sug:'8527.99.90',conf:64}],
   ['k1','Kit Cinema 5.1','KIT-CINE51','Maestro','KIT-CINE51','KT','kit','',null,{kit:[['p13',1],['p5',1],['p4',2]]}],
   ['k2','Kit Segurança 4 câmeras','KIT-CFTV4','Maestro','KIT-CFTV4','KT','kit','',null,{kit:[['p6',4],['p7',80]]}],
   ['k3','Kit Sanca de LED (5 m)','KIT-SANCA5','Maestro','KIT-SANCA5','KT','kit','',null,{kit:[['p8',5],['p9',1]]}]]
   .map(([id,n,sku,b,m,u,cat,ncm,custo,x])=>({...clone(base),id,n,sku,b,m,u,cat,ncm,custo,curta:n,...(x||{})}));
  S.ftab=0;S.fq='';S.cfg='par';S.imp={step:0};S.chat=[];
  S.cf={q:'',b:'',c:'',t:'',pg:1};
  S.rf={tab:0,q:'',per:'todo',st:'Todos',autor:'',cli:'',esc:'tudo',late:false};
  S.per='6';S.meta=450000;S.metaEdit=false;S.evo='rec';S.evoT='line';S.dec='gp';S.rank='pipe';
  S.ag='account';
}

/* =====================================================================
   1 · IA FISCAL — #/fiscal
   ===================================================================== */
const P=id=>S.prod.find(x=>x.id===id);
const bySku=s=>S.prod.find(x=>x.sku.toLowerCase()===String(s).toLowerCase());
const isKit=p=>!!(p&&p.kit);
const validNcm=n=>/^\d{4}\.\d{2}\.\d{2}$/.test(n||'');
const rule=ncm=>S.st.find(r=>r.ncm===ncm);
const mvaAj=(m,inter=S.par.inter)=>((1+m/100)*(1-inter/100)/(1-S.par.int/100)-1)*100;
const SIT={st:['ICMS-ST','b'],normal:['Tributado normal','g'],rev:['⚠ Revisão fiscal pendente','w'],ncm:['NCM inválido','r']};
const sitOf=p=>{
  if(isKit(p))return p.kit.some(([id])=>{const c=P(id);return !c||['rev','ncm'].includes(sitOf(c))})?'rev':'normal';
  if(!validNcm(p.ncm))return 'ncm'; if(p.rev)return 'rev'; return rule(p.ncm)?'st':'normal'};
const custoEf=p=>{if(p.custo==null)return null;const c=p.custo,fr=c*(p.frete||0)/100,ipi=c*(p.ipi||0)/100,r=rule(p.ncm);let st=0;
  if(r&&validNcm(p.ncm)&&!p.rev){const inter=p.icmsE??S.par.inter,b=(c+fr+ipi)*(1+mvaAj(r.mva,inter)/100);st=Math.max(0,b*S.par.int/100-c*inter/100)}
  return {c,fr,ipi,st,tot:c+fr+ipi+st}};
const BT={pct:'Percentual',fixo:'Valor fixo',form:'Fórmula',meta:'Meta de lucro'};
const applyBlocks=(x,steps)=>{S.calc.forEach(b=>{const a=x;
  if(b.t==='pct')x=x*(1+b.v/100);else if(b.t==='fixo')x=x+b.v;else if(b.t==='meta')x=b.v<100?x/(1-b.v/100):x;else if(b.t==='form')x=b.v>0?Math.ceil(x/b.v)*b.v:x;
  steps&&steps.push([b,a,x])});return x};
const priceOf=p=>{if(!p)return null;
  if(isKit(p)){let s=0;for(const [id,q] of p.kit){const v=priceOf(P(id));if(v==null)return null;s+=v*q}return s}
  if(p.pv!=null)return p.pv;const e=custoEf(p);return e?applyBlocks(e.tot):null};
const blockDesc=b=>b.t==='pct'?`+ ${fmtN(b.v,1)}% sobre o valor`:b.t==='fixo'?`+ ${brl(b.v)} por unidade`:b.t==='meta'?`valor ÷ (1 − ${fmtN(b.v,1)}%)`:`arredondar(valor; ${fmtN(b.v,0)})`;

function pendList(){const out=[];S.prod.forEach(p=>{if(isKit(p))return;
  if(!validNcm(p.ncm))out.push({p,k:'ncm',t:'NCM inválido',d:`“${p.ncm||'vazio'}” não tem os 8 dígitos do NCM.`,s:p.sug?`IA sugere ${p.sug}`:'Sem sugestão: informe o NCM no cadastro.',conf:p.sug?p.conf||90:null,ok:!!p.sug});
  else if(p.rev)out.push({p,k:'rev',t:'Revisão fiscal pendente',d:`Cadastrado como ${p.ncm}. A descrição indica outro código.`,s:`IA sugere ${p.sug} · ${rule(p.sug)?'ICMS-ST':'Tributado normal'}`,conf:p.conf,ok:true});
  if(p.custo==null&&p.pv==null)out.push({p,k:'custo',t:'Sem custo de compra',d:'Sem custo, o preço não é calculado e o produto entra na proposta sem valor.',
    s:p.ucusto?`Última nota: ${brl(p.ucusto)} (NF-e 48.212, Luminar Sul)`:'Sem nota de compra registrada: informe o custo no cadastro.',conf:null,ok:!!p.ucusto});});return out}

const FTABS=['Produtos','Importar nota','Configuração','Cálculo','Pendências'];
const tabLabel=i=>i===4?`Pendências · ${pendList().length}`:FTABS[i];
const band=()=>{const n=pendList().length;return `<section class="card sy-band rv" style="--d:1" aria-live="polite"><span class="sy-ai" aria-hidden="true">${ic('brilho',20)}</span>
  <div style="flex:1;min-width:0"><b>Maestro AI</b><div class="lbl">${n?`${n} pendência${n>1?'s':''} fisca${n>1?'is':'l'} esperando a sua confirmação.`:'Nenhuma pendência fiscal. Tudo revisado.'}</div></div>
  ${n?U.btn('Ver pendências',{sm:true,act:'verpend',w:'152px'}):''}</section>`};
const fv=()=>{const v=$('#view');return $('#sy-fb',v)?v:null};
const refreshTop=v=>{if(!v)return;const b=$('#sy-band',v);b.innerHTML=band();M.wire(b,{verpend:()=>$$('[data-tabs] .tab',v)[4].click()});
  const t=$$('[data-tabs] .tab',v)[4];t.textContent=tabLabel(4);const on=$('[data-tabs] .tab.on',v),pill=$('[data-tabs] .pill',v);if(on&&pill){pill.style.left=on.offsetLeft+'px';pill.style.width=on.offsetWidth+'px'}};
const fr=()=>{const v=fv();if(v){fbody(v);refreshTop(v)}};

function fiscalRender(){return `${U.page({kick:'Central única · Produtos · Precificação · Fiscal',title:'IA Fiscal',sub:'Produtos, notas de compra, impostos e preço de venda num lugar só.',
   acts:[{label:'Perguntar à IA',icon:'brilho',act:'ask'},{label:'Novo produto',icon:'mais',act:'novo',pri:true}]})}
  <div id="sy-band">${band()}</div>
  ${U.bar(U.tabs(FTABS.map((_,i)=>tabLabel(i)),S.ftab,'Áreas da IA Fiscal'))}
  <div id="sy-fb" class="rv sy-cq" style="--d:2"></div>`}
function fiscalMount(v){
  M.wire(v,{ask:()=>askAI(),novo:()=>prodModal(null,fr),verpend:()=>$$('[data-tabs] .tab',v)[4].click()});
  $('[data-tabs]',v).addEventListener('tab',e=>{S.ftab=e.detail;fbody(v)});
  fbody(v);
}
function fbody(v){const b=$('#sy-fb',v);[fProdutos,fImportar,fConfig,fCalculo,fPend][S.ftab](b)}

/* ---- Produtos ---- */
function fProdutos(b){
  b.innerHTML=`<div class="row" style="margin-bottom:16px;gap:12px">${fit(U.search('Buscar por nome, SKU ou NCM','sy-fq','360px'))}<span class="spacer"></span><span class="lbl" id="sy-fn"></span></div><div id="sy-ft"></div>`;
  const q=$('#sy-fq',b);q.value=S.fq||'';q.oninput=()=>{S.fq=q.value;draw()};
  const draw=()=>{const t=(S.fq||'').trim().toLowerCase(),rows=S.prod.filter(p=>!t||(p.n+' '+p.sku+' '+p.ncm+' '+p.b).toLowerCase().includes(t)),box=$('#sy-ft',b);
    $('#sy-fn',b).textContent=`${rows.length} de ${S.prod.length} produtos`;
    box.innerHTML=fixT(U.table({rows,fixed:true,cols:[
     {h:'Produto',html:p=>`<div class="row sy-nw" style="gap:12px;min-width:0">${thumb(p.cat)}<div style="min-width:0;flex:1"><div class="row sy-nw" style="gap:8px"><b class="sy-ell" style="font-weight:600" title="${esc(p.n)}">${esc(p.n)}</b>${isKit(p)?U.chip('KIT','b'):''}</div>
       <div class="lbl sy-sm sy-ell">${isKit(p)?p.kit.map(([id,q])=>q+'× '+esc((P(id)||{n:'item excluído'}).n)).join(', '):esc(p.b+' · '+p.m)}<span class="sy-x sku"> · ${esc(p.sku)}</span>${isKit(p)?'':`<span class="sy-x ncm"> · NCM ${esc(p.ncm||'—')}</span>`}</div></div></div>`},
     {h:'SKU',w:'136px',html:p=>`<span class="code" style="margin:0">${esc(p.sku)}</span>`},
     {h:'NCM',w:'112px',html:p=>isKit(p)?'<span class="lbl">por item</span>':`<span class="num">${esc(p.ncm||'—')}</span>`},
     {h:'Situação fiscal',w:'216px',html:p=>{const s=sitOf(p),[l,tn]=SIT[s];return U.chip(l,tn)+(isKit(p)&&s==='rev'?'<div class="lbl sy-sm">item do kit com pendência</div>':(s==='rev'||s==='ncm')&&p.sug?`<div class="lbl sy-sm">IA sugere ${esc(p.sug)}</div>`:'')}},
     {h:'Preço',w:'136px',r:true,html:p=>{const x=priceOf(p);return x==null?'<span class="lbl">sem preço</span>':brl(x)+(p.pv!=null?'<div class="lbl sy-sm">manual</div>':'')}},
     {h:'',w:'272px',r:true,html:p=>`<div class="btnrow sy-acts">${U.btn('Editar',{sm:true,act:'edit',attrs:`data-id="${p.id}"`})}${U.btn('Excluir',{sm:true,act:'del',attrs:`data-id="${p.id}"`})}</div>`}],
     empty:{title:'Nenhum produto encontrado.',text:'Tente outro nome, SKU ou NCM.'}}));
    M.wire(box,{edit:el=>prodModal(P(el.dataset.id),fr),del:el=>delProd(el,fr)});
  };draw();
}
function delProd(el,done){const id=el.dataset.id,p=P(id);if(!p)return;
  if(S.armed!==id){$$('.sy-danger').forEach(x=>{x.classList.remove('sy-danger');x.textContent='Excluir';x.removeAttribute('title')});
    S.armed=id;el.textContent='Confirmar';el.classList.add('sy-danger');el.title='Clique de novo para excluir '+p.n;
    clearTimeout(S.armT);S.armT=setTimeout(()=>{if(S.armed!==id)return;S.armed=null;if(el.isConnected){el.textContent='Excluir';el.classList.remove('sy-danger');el.removeAttribute('title')}},4000);
    M.toast(`Clique em “Confirmar” para excluir ${p.n}.`);return}
  S.armed=null;const inKit=S.prod.find(k=>isKit(k)&&k.kit.some(([x])=>x===id));
  if(inKit){done();return M.toast(`Está no ${inKit.n}. Tire do kit antes de excluir.`)}
  const i=S.prod.indexOf(p);S.prod.splice(i,1);done();M.toast(`${p.n} excluído.`,'Desfazer',()=>{S.prod.splice(i,0,p);done()});
}

/* ---- Cadastro de produto (modal largo com abas) ---- */
const UNITS=['UN','PR','MT','KT','PROJ','VISITA'];
const ORIG=['0 · Nacional','1 · Estrangeira, importação direta','2 · Estrangeira, comprada no mercado interno'];
const CFOPS=['5102 · Venda de mercadoria','5405 · Venda com ICMS-ST retido antes'];
const CSTS=['00 · Tributada integralmente','60 · ICMS cobrado antes por ST'];
function prodModal(p,done){
  const isNew=!p, x=p?clone(p):{id:'p'+Date.now(),n:'',sku:'',b:'',m:'',u:'UN',cat:'auto',ncm:'',custo:null,frete:3,ipi:0,icmsE:S.par.inter,cest:'',orig:ORIG[0],curta:'',res:'',comp:'',kit:null,rev:false,pv:null};
  let kit=x.kit?clone(x.kit):[];
  const st0=rule(x.ncm)&&!x.rev;
  const TABS=['Identificação','Descrições','Composição do kit','Fiscal','Custo & Fiscal','Preço calculado'];
  const panes=[
   `<div class="fgrid">${[{k:'n',label:'Nome do produto',req:true,span:8,value:x.n,ph:'Ex.: Interruptor inteligente 4 teclas'},{k:'sku',label:'SKU',req:true,span:4,value:x.sku,ph:'Ex.: C4-KD120'},
     {k:'b',label:'Marca',span:4,value:x.b},{k:'m',label:'Modelo',span:4,value:x.m},{k:'u',label:'Unidade',type:'select',span:4,opts:UNITS,value:x.u},
     {k:'cat',label:'Categoria',type:'select',span:6,opts:Object.entries(CATN).filter(([k])=>k!=='kit'),value:x.cat==='kit'?'auto':x.cat},
     {k:'iskit',label:'É um kit (composto por outros produtos)',type:'toggle',span:6,value:!!x.kit}].map(U.field).join('')}</div>`,
   `<div class="fgrid">${[{k:'curta',label:'Descrição curta',span:12,value:x.curta,ph:'Uma linha. Aparece na lista e na busca.'},
     {k:'res',label:'Descrição resumida',type:'textarea',span:12,value:x.res,ph:'Duas ou três linhas. Sai na proposta quando “Descrição resumida” está ligada.'},
     {k:'comp',label:'Descrição completa',type:'textarea',span:12,value:x.comp,ph:'Texto técnico completo. Sai na proposta quando “Descrição completa” está ligada.'}].map(U.field).join('')}</div>`,
   `<div id="sy-kit"></div>`,
   `<div class="fgrid">${[{k:'ncm',label:'NCM',span:4,value:x.ncm,ph:'0000.00.00',help:'8 dígitos, com pontos.'},{k:'cest',label:'CEST',span:4,value:x.cest,ph:'00.000.00'},
     {k:'orig',label:'Origem da mercadoria',type:'select',span:4,opts:ORIG,value:x.orig},
     {k:'cfop',label:'CFOP de venda',type:'select',span:6,opts:CFOPS,value:x.cfop||CFOPS[st0?1:0]},{k:'cst',label:'CST do ICMS',type:'select',span:6,opts:CSTS,value:x.cst||CSTS[st0?1:0]}].map(U.field).join('')}</div>
     <div id="sy-fsit" class="mt16"></div>`,
   `<div class="fgrid">${[{k:'custo',label:'Custo de compra',type:'money',span:4,value:x.custo==null?'':fmtN(x.custo)},{k:'frete',label:'Frete (%)',type:'number',span:4,value:x.frete},{k:'ipi',label:'IPI (%)',type:'number',span:4,value:x.ipi},
     {k:'icmsE',label:'ICMS na entrada',type:'select',span:6,opts:[['4','4% · importado'],['7','7%'],['12','12% · fornecedor de outro estado'],['18','18% · fornecedor de MG']],value:String(x.icmsE??S.par.inter)},
     {k:'pv',label:'Preço de venda manual',type:'money',span:6,value:x.pv==null?'':fmtN(x.pv),help:'Em branco: vale o preço calculado.'}].map(U.field).join('')}</div>
     <div id="sy-fmva" class="mt16"></div>`,
   `<div id="sy-fpreco"></div>`];
  const body=`<div class="sy-mtabs">${M.tabsHTML(TABS,0,'in','Seções do cadastro')}</div>${panes.map((h,i)=>`<section data-pane="${i}" ${i?'hidden':''} aria-label="${TABS[i]}">${h}</section>`).join('')}`;
  let el;
  const val=k=>{const f=$(`[name="${k}"]`,el);return f?f.value.trim():''};
  const kitOn=()=>$('[data-toggle="iskit"]',el).getAttribute('aria-checked')==='true';
  const cur=()=>{const ncm=val('ncm'),k=kitOn();return {...x,n:val('n'),sku:val('sku'),ncm:k?'':ncm,rev:x.rev&&ncm===x.ncm,custo:k?null:num(val('custo')),pv:k?null:num(val('pv')),
    frete:num(val('frete'))||0,ipi:num(val('ipi'))||0,icmsE:+val('icmsE')||S.par.inter,kit:k?kit:null}};
  const tabTo=i=>$$('[data-tabs] .tab',el)[i].click();
  const renderKit=()=>{const box=$('#sy-kit',el);
    if(!kitOn()){box.innerHTML=U.empty({title:'Este produto não é um kit.',text:'Ligue “É um kit” em Identificação para compor com outros produtos.'});return}
    const opts=S.prod.filter(q=>!isKit(q)&&q.id!==x.id);
    box.innerHTML=`<div class="sy-kitadd"><select class="select" id="sy-kp" aria-label="Produto para o kit">${opts.map(o=>`<option value="${o.id}">${esc(o.n)}</option>`).join('')}</select>
      <input class="input num" id="sy-kq" type="number" min="1" value="1" aria-label="Quantidade" style="text-align:right">${U.btn('Adicionar ao kit',{icon:'mais',act:'kadd'})}</div>
      ${kit.length?`<div class="mt16">${kit.map(([id,q],i)=>{const c=P(id)||{n:'Item excluído',cat:'srv'},pr=priceOf(c);return `<div class="sy-kitrow">${thumb(c.cat,true)}<span class="sy-ell" title="${esc(c.n)}">${esc(c.n)}</span>
        <input class="input sm num" data-kq="${i}" type="number" min="1" value="${q}" aria-label="Quantidade de ${esc(c.n)}" style="width:72px;text-align:right"><span class="num sy-w120">${pr==null?'<span class="lbl">sem preço</span>':brl(pr*q)}</span>
        ${U.btn('',{icon:'lixo',sm:true,ghost:true,title:'Tirar '+c.n+' do kit',act:'krm',attrs:`data-i="${i}"`})}</div>`}).join('')}
        <div class="row" style="height:52px"><span class="lbl" style="flex:1">Preço do kit (soma dos itens)</span><b class="num">${(()=>{const s=priceOf({kit});return s==null?'sem preço':brl(s)})()}</b></div></div>`
      :'<p class="lbl mt16">Nenhum item ainda. O preço do kit é a soma dos itens.</p>'}`;
    M.wire(box,{kadd:()=>{const id=$('#sy-kp',box).value;if(!id)return;const q=Math.max(1,parseInt($('#sy-kq',box).value)||1),ex=kit.find(k=>k[0]===id);ex?ex[1]+=q:kit.push([id,q]);renderKit()},
      krm:b=>{kit.splice(+b.dataset.i,1);renderKit()}});
    $$('[data-kq]',box).forEach(i=>i.onchange=()=>{kit[+i.dataset.kq][1]=Math.max(1,parseInt(i.value)||1);renderKit()});
  };
  const renderSit=()=>{const box=$('#sy-fsit',el),c=cur();
    if(kitOn()){box.innerHTML=`<div class="in sy-box lbl">Kit não tem NCM próprio: cada item sai na nota com o seu NCM e a sua tributação.</div>`;return}
    const [l,t]=SIT[sitOf(c)],showSug=x.sug&&val('ncm')!==x.sug;
    box.innerHTML=`<div class="in sy-box"><div class="row"><span class="lbl" style="flex:1">Situação fiscal com estes dados</span>${U.chip(l,t)}</div>
      ${showSug?`<div class="row mt16" style="gap:12px"><span class="sy-ai sm" aria-hidden="true">${ic('brilho',16)}</span><div style="flex:1;min-width:0"><b>IA sugere NCM ${esc(x.sug)}</b>
        <div class="lbl">${rule(x.sug)?'Está na regra de ST de MG: venda com CFOP 5405 e CST 60.':'Fora da ST: venda com CFOP 5102 e CST 00.'}</div></div>${x.conf?confChip(x.conf):''}${U.btn('Aplicar sugestão',{sm:true,act:'apsug',w:'152px'})}</div>`:''}</div>`;
    M.wire(box,{apsug:()=>{$('[name="ncm"]',el).value=x.sug;x.rev=false;x.ncm=x.sug;const st=!!rule(x.sug);$('[name="cfop"]',el).value=CFOPS[st?1:0];$('[name="cst"]',el).value=CSTS[st?1:0];renderSit()}});
  };
  const renderMva=()=>{const box=$('#sy-fmva',el),c=cur(),r=rule(c.ncm);
    box.innerHTML=kitOn()?`<div class="in sy-box lbl">O custo do kit vem dos itens. Edite o custo de cada produto.</div>`
      :`<div class="in sy-box">${r&&!c.rev?`<div class="row"><b style="flex:1">Regra de ST · ${esc(r.d)}</b>${U.chip('ICMS-ST','b')}</div>
        <div class="kv mt8"><span>MVA original</span><b class="num">${fmtN(r.mva,2)}%</b></div><div class="kv"><span>MVA ajustada (entrada a ${c.icmsE}%, interna ${S.par.int}%)</span><b class="num">${fmtN(mvaAj(r.mva,c.icmsE),2)}%</b></div>`
        :`<span class="lbl">${validNcm(c.ncm)&&!c.rev?'Sem regra de ST para este NCM: o ICMS é o próprio, sem antecipação.':'Confirme o NCM na aba Fiscal para saber se há ST.'}</span>`}</div>`};
  const renderPreco=()=>{const box=$('#sy-fpreco',el),c=cur();
    if(kitOn()){const s=priceOf({kit});box.innerHTML=`<div class="in sy-box">${kit.map(([id,q])=>{const k=P(id),pr=priceOf(k);return `<div class="kv"><span>${q}× ${esc(k?k.n:'Item excluído')}</span><b class="num">${pr==null?'sem preço':brl(pr*q)}</b></div>`}).join('')||'<span class="lbl">Sem itens.</span>'}
      <div class="row mt16"><span class="lbl" style="flex:1">Preço do kit</span><b class="big num">${s==null?'sem preço':brl(s)}</b></div></div>`;return}
    const e=custoEf(c);
    if(!e){box.innerHTML=U.empty({title:'Sem custo de compra.',text:'Informe o custo na aba “Custo & Fiscal” ou importe a nota de compra.'});return}
    const steps=[],fin=applyBlocks(e.tot,steps);
    box.innerHTML=`<div class="in sy-box"><div class="kv"><span>Custo de compra</span><b class="num">${brl(e.c)}</b></div><div class="kv"><span>Frete (${fmtN(c.frete,1)}%)</span><b class="num">+ ${brl(e.fr)}</b></div>
      <div class="kv"><span>IPI (${fmtN(c.ipi,1)}%)</span><b class="num">+ ${brl(e.ipi)}</b></div><div class="kv"><span>ICMS-ST antecipado</span><b class="num">+ ${brl(e.st)}</b></div>
      <div class="kv"><span><b>Custo efetivo</b></span><b class="num">${brl(e.tot)}</b></div>
      ${steps.map(([b,a,z])=>`<div class="kv"><span>${esc(b.n)} · ${blockDesc(b)}</span><b class="num">${brl(z)}</b></div>`).join('')}
      <div class="row mt16"><span class="lbl" style="flex:1">Preço calculado</span><b class="big num">${brl(fin)}</b></div>
      ${c.pv!=null?`<div class="row mt8"><span class="lbl" style="flex:1">Preço manual em uso</span><b class="num">${brl(c.pv)}</b></div>`:''}</div>
      <p class="lbl mt16">Só leitura. Para mudar, ajuste o custo aqui ou os blocos na aba Cálculo da IA Fiscal.</p>`};
  const show=i=>{$$('[data-pane]',el).forEach(s=>s.hidden=+s.dataset.pane!==i);[null,null,renderKit,renderSit,renderMva,renderPreco][i]?.()};
  const save=()=>{clearErr(el);const c=cur();let bad=null;
    if(!c.n){markErr(el,'n','Obrigatório.');bad='n'} if(!c.sku){markErr(el,'sku','Obrigatório.');bad=bad||'sku'}
    else if(S.prod.some(q=>q.sku.toLowerCase()===c.sku.toLowerCase()&&q.id!==x.id)){markErr(el,'sku','Já existe um produto com este SKU.');bad=bad||'sku'}
    if(bad){tabTo(0);$(`[name="${bad}"]`,el).focus();return false}
    if(c.kit&&!c.kit.length){tabTo(2);M.toast('Adicione pelo menos um item ao kit.');return false}
    Object.assign(c,{b:val('b'),m:val('m'),u:c.kit?'KT':val('u'),cat:c.kit?'kit':val('cat'),cest:val('cest'),orig:val('orig'),cfop:val('cfop'),cst:val('cst'),curta:val('curta')||c.n,res:val('res'),comp:val('comp')});
    if(isNew)S.prod.unshift(c);else Object.assign(p,c);
    done&&done();M.toast(isNew?`${c.n} criado.`:`${c.n} salvo.`);
  };
  el=M.modal({title:isNew?'Novo produto':'Cadastro de produto',sub:isNew?'Preencha a identificação; o resto pode vir depois.':esc(x.n+' · '+x.sku),width:'960px',body,ok:isNew?'Criar produto':'Salvar produto',onOk:()=>save()}).el;
  M.tabs(el);$('[data-tabs]',el).addEventListener('tab',e=>show(e.detail));
  $('[data-toggle="iskit"]',el).addEventListener('click',()=>{const on=kitOn();if(on&&!kit.length)M.toast('Agora componha o kit na aba “Composição do kit”.')});
  $('[name="ncm"]',el).addEventListener('input',()=>{if(!$('[data-pane="3"]',el).hidden)renderSit()});
}

/* ---- Importar nota ---- */
const NOTA=()=>({forn:'Luminar Sul',nf:'48.212',em:'29/09/2026',file:'',rows:[
  {d:'Fita LED 24V 3000K 10W/m',cod:'STH-FITA24',ncm:'9405.42.00',q:50,u:'MT',cu:35.2},{d:'Fonte para LED 24V 150W',cod:'STH-DRIVER',ncm:'8504.40.90',q:6,u:'UN',cu:120},
  {d:'Perfil de embutir com difusor',cod:'STH-PERFIL',ncm:'9405.99.00',q:50,u:'MT',cu:26.8},{d:'Spot de embutir recuado 7W 2700K',cod:'STH-SPOT7',ncm:'9405.11.00',q:24,u:'UN',cu:64.9},
  {d:'Frete',cod:'—',ncm:'—',q:1,u:'SV',cu:180}].map(r=>({...r,ac:bySku(r.cod)?'upd':validNcm(r.ncm)?'new':'ign'}))});
function fImportar(b){const I=S.imp;
  const steps=`<ol class="sy-steps" aria-label="Passos da importação">${['Enviar XML','Prévia','Aplicar'].map((s,i)=>`<li class="sy-step ${i<I.step?'done':''}" ${i===I.step?'aria-current="step"':''}><span class="sy-n">${i<I.step?ic('check',16):i+1}</span>${s}</li>`).join('')}</ol>`;
  const start=file=>{Object.assign(I,NOTA(),{step:1,file});fImportar(b)};
  if(I.step===0){
    b.innerHTML=`${steps}<section class="card"><div class="sy-drop" id="sy-drop">${ic('upload',32)}<b style="font-size:16px">Envie o XML da NF-e de compra</b>
      <p class="lbl">A IA lê fornecedor, itens, NCM e custo, e mostra o que muda antes de gravar qualquer coisa.</p>
      <div class="btnrow sy-w400"><label class="btn sm" style="cursor:pointer">${ic('upload',16)}Escolher XML<input type="file" accept=".xml,text/xml" class="sr" id="sy-xml"></label>${U.btn('Usar nota de exemplo',{sm:true,act:'exemplo'})}</div></div></section>`;
    $('#sy-xml',b).onchange=e=>{const f=e.target.files[0];if(f)start(f.name)};
    const dz=$('#sy-drop',b);dz.ondragover=e=>{e.preventDefault();dz.classList.add('over')};dz.ondragleave=()=>dz.classList.remove('over');
    dz.ondrop=e=>{e.preventDefault();dz.classList.remove('over');const f=e.dataTransfer.files[0];if(f)start(f.name)};
    M.wire(b,{exemplo:()=>start('NFe-48212-lumina.xml')});return}
  if(I.step===1){
    const tot=sum(I.rows.map(r=>r.q*r.cu)),cnt=k=>I.rows.filter(r=>r.ac===k).length;
    b.innerHTML=`${steps}<section class="card flush"><div class="ch"><h2>Prévia · NF-e ${I.nf}</h2><span class="spacer"></span><span class="lbl">${esc(I.forn)} · emitida em ${I.em} · ${I.rows.length} itens · ${brl(tot)}</span></div>
      <div class="tblwrap"><table class="tbl"><thead><tr><th>Item da nota</th><th>NCM</th><th class="r">Qtd</th><th class="r">Custo unit.</th><th>No Maestro</th><th style="width:200px">Ação</th></tr></thead><tbody>
      ${I.rows.map((r,i)=>{const p=bySku(r.cod);return `<tr><td><b style="font-weight:600">${esc(r.d)}</b><span class="code">${esc(r.cod)}</span></td><td class="num">${esc(r.ncm)}</td><td class="r num">${r.q} ${r.u.toLowerCase()}</td><td class="r num">${brl(r.cu)}</td>
        <td>${p?`<div>${esc(p.n)}</div><div class="lbl sy-sm">custo ${p.custo==null?'vazio':brl(p.custo)} → ${brl(r.cu)}${!validNcm(p.ncm)&&validNcm(r.ncm)?' · NCM da nota corrige o cadastro':''}</div>`:`<span class="lbl">${r.cod==='—'?'Despesa da nota':'Não cadastrado'}</span>`}</td>
        <td><select class="select input sm" data-ac="${i}" aria-label="Ação para ${esc(r.d)}">${(p?[['upd','Atualizar custo']]:validNcm(r.ncm)?[['new','Criar produto']]:[]).concat([['ign','Ignorar']]).map(([k,l])=>`<option value="${k}" ${r.ac===k?'selected':''}>${l}</option>`).join('')}</select></td></tr>`}).join('')}</tbody></table></div>
      <div class="sy-foot"><span class="lbl" style="flex:1" id="sy-isum">${cnt('upd')} atualizações · ${cnt('new')} produtos novos · ${cnt('ign')} ignorados</span>
        <div class="btnrow" style="width:min(312px,100%)">${U.btn('Voltar',{sm:true,act:'voltar'})}${U.btn('Aplicar nota',{sm:true,act:'aplicar'})}</div></div></section>`;
    $$('[data-ac]',b).forEach(s=>s.onchange=()=>{I.rows[+s.dataset.ac].ac=s.value;$('#sy-isum',b).textContent=`${cnt('upd')} atualizações · ${cnt('new')} produtos novos · ${cnt('ign')} ignorados`});
    M.wire(b,{voltar:()=>{I.step=0;fImportar(b)},aplicar:()=>{
      let up=0,nw=0,ig=0;const marca=(D.fornecedores.find(f=>f.nome===I.forn)||{marcas:['']}).marcas[0]||'';
      I.rows.forEach((r,k)=>{if(r.ac==='upd'){const p=bySku(r.cod);p.custo=r.cu;p.ucusto=r.cu;if(!validNcm(p.ncm)&&validNcm(r.ncm))p.ncm=r.ncm;up++}
        else if(r.ac==='new'){S.prod.push({id:'p'+Date.now()+k,n:r.d,sku:r.cod,b:marca,m:r.cod,u:r.u,cat:'luz',ncm:r.ncm,custo:r.cu,ucusto:r.cu,frete:3,ipi:0,icmsE:S.par.inter,cest:'',orig:ORIG[0],curta:r.d,res:'',comp:'',kit:null,rev:false,pv:null});nw++}else ig++});
      I.done={up,nw,ig};I.step=2;fImportar(b);const v=fv();if(v)refreshTop(v);M.toast(`NF-e ${I.nf} aplicada.`)}});return}
  b.innerHTML=`${steps}<section class="card"><div class="row" style="gap:16px"><span class="sy-ai" aria-hidden="true">${ic('check',20)}</span><div style="flex:1"><h2 style="margin:0;font-size:20px">Nota aplicada</h2><div class="lbl">NF-e ${I.nf} · ${esc(I.forn)} · ${esc(I.file)}</div></div></div>
    <div class="mt16" style="max-width:480px"><div class="kv"><span>Custos atualizados</span><b class="num">${I.done.up}</b></div><div class="kv"><span>Produtos criados</span><b class="num">${I.done.nw}</b></div><div class="kv"><span>Itens ignorados</span><b class="num">${I.done.ig}</b></div></div>
    <div class="btnrow mt24 sy-w400">${U.btn('Importar outra nota',{sm:true,act:'outra'})}${U.btn('Ver produtos',{sm:true,act:'ver'})}</div></section>`;
  M.wire(b,{outra:()=>{S.imp={step:0};fImportar(b)},ver:()=>{S.imp={step:0};$$('[data-tabs] .tab',$('#view'))[0].click()}});
}

/* ---- Configuração ---- */
function fConfig(b){
  b.innerHTML=`<div class="row" style="margin-bottom:24px">${U.seg('sy-cfg',[['par','Parâmetros gerais'],['uf','Alíquotas interestaduais'],['st','Regras de ST por NCM']],S.cfg,'Configuração fiscal').replace(/width:\d+px/,'width:min(600px,100%)')}</div><div id="sy-cb"></div>`;
  U.bindSeg(b,'sy-cfg',x=>{S.cfg=x;sub()});
  const box=$('#sy-cb',b);
  const sub=()=>{
    if(S.cfg==='par'){const nst=S.prod.filter(p=>sitOf(p)==='st').length,nn=S.prod.filter(p=>sitOf(p)==='normal'&&!isKit(p)).length;
      box.innerHTML=`<div class="grid sy-split"><section class="card s8 sy-cq"><div class="ch"><h2>Parâmetros gerais</h2></div><div class="fgrid mt16">${[
        {k:'uf',label:'UF da empresa',type:'select',span:4,opts:['MG','SP','RJ','PR','SC','RS','ES','GO','DF','BA'],value:S.par.uf},
        {k:'reg',label:'Regime tributário',type:'select',span:8,opts:['Simples Nacional','Lucro Presumido','Lucro Real'],value:S.par.reg},
        {k:'int',label:'Alíquota interna do ICMS (%)',type:'number',span:6,value:S.par.int},
        {k:'inter',label:'ICMS de entrada padrão (%)',type:'number',span:6,value:S.par.inter,help:'Compra de fornecedor de outro estado.'},
        {k:'pis',label:'PIS (%)',type:'number',span:6,value:S.par.pis},{k:'cof',label:'COFINS (%)',type:'number',span:6,value:S.par.cof}].map(U.field).join('')}</div>
        <div class="row mt24"><span class="lbl" style="flex:1">Valem para o ICMS-ST e para o preço de todos os produtos.</span>${U.btn('Salvar parâmetros',{sm:true,act:'savepar',w:'176px'})}</div></section>
        <aside class="card s4" style="align-self:start"><div class="ch"><h2>Efeito hoje</h2></div><div class="mt16">
          <div class="kv"><span>Produtos com ICMS-ST</span><b class="num">${nst}</b></div><div class="kv"><span>Tributados normal</span><b class="num">${nn}</b></div>
          <div class="kv"><span>MVA 37% vira (ajustada)</span><b class="num">${fmtN(mvaAj(37),2)}%</b></div></div></aside></div>`;
      M.wire(box,{savepar:()=>{clearErr(box);const g=k=>$(`[name="${k}"]`,box).value;const it=num(g('int')),ie=num(g('inter'));
        if(it==null||it<=0||it>=100)return markErr(box,'int','Use um número entre 0 e 100.');if(ie==null||ie<=0||ie>=100)return markErr(box,'inter','Use um número entre 0 e 100.');
        Object.assign(S.par,{uf:g('uf'),reg:g('reg'),int:it,inter:ie,pis:num(g('pis'))||0,cof:num(g('cof'))||0});sub();refreshTop(fv());M.toast('Parâmetros salvos. Preços e ST recalculados.')}});}
    else if(S.cfg==='uf'){
      box.innerHTML=U.table({title:`Vendas de ${S.par.uf} para outros estados`,head:'<span class="lbl">Importados: 4% em qualquer estado</span>',rows:S.uf,cols:[
        {h:'UF de destino',html:r=>`<b>${r[0]}</b>`},{h:'Região',html:r=>`<span class="soft">${r[1]}</span>`},
        {h:'Alíquota interestadual',w:'200px',r:true,html:(r,i)=>`<span class="row" style="gap:8px;justify-content:flex-end"><input class="input sm num" data-uf="${i}" type="number" step="0.5" min="0" max="25" value="${r[2]}" aria-label="Alíquota interestadual para ${r[0]}" style="width:88px;text-align:right"><span class="lbl">%</span></span>`},
        {h:'Interna do destino',w:'160px',r:true,html:r=>fmtN(r[3],1)+'%'},
        {h:'DIFAL (consumidor final)',w:'200px',r:true,html:(r,i)=>`<b class="num" data-dif="${i}">${fmtN(r[3]-r[2],1)}%</b>`}]});
      $$('[data-uf]',box).forEach(i=>i.onchange=()=>{const k=+i.dataset.uf,v=num(i.value);if(v==null||v<0||v>25){i.value=S.uf[k][2];return M.toast('Use uma alíquota entre 0 e 25%.')}
        S.uf[k][2]=v;$(`[data-dif="${k}"]`,box).textContent=fmtN(S.uf[k][3]-v,1)+'%';M.toast(`Alíquota para ${S.uf[k][0]} salva.`)});}
    else{
      box.innerHTML=fixT(U.table({fixed:true,title:'Regras de ST por NCM',head:U.btn('Nova regra',{sm:true,icon:'mais',act:'nova',w:'152px'}),rows:S.st,cols:[
        {h:'NCM',w:'128px',html:r=>`<span class="num">${r.ncm}</span>`},{h:'Descrição',html:r=>`<div class="sy-ell" title="${esc(r.d)}">${esc(r.d)}</div>`},
        {h:'MVA original',w:'128px',r:true,html:r=>fmtN(r.mva,2)+'%'},{h:'MVA ajustada',w:'128px',r:true,html:r=>`<b>${fmtN(mvaAj(r.mva),2)}%</b>`},
        {h:'Produtos',w:'96px',r:true,html:r=>S.prod.filter(p=>p.ncm===r.ncm&&!p.rev).length},
        {h:'',w:'272px',r:true,html:(r,i)=>`<div class="btnrow sy-acts">${U.btn('Editar',{sm:true,act:'ed',attrs:`data-i="${i}"`})}${U.btn('Excluir',{sm:true,act:'ex',attrs:`data-i="${i}"`})}</div>`}],
        empty:{title:'Nenhuma regra de ST.',text:'Sem regra, todo produto sai como tributado normal.',btn:'Nova regra',act:'nova'}}));
      M.wire(box,{nova:()=>ruleModal(null),ed:el=>ruleModal(S.st[+el.dataset.i]),ex:el=>{const r=S.st[+el.dataset.i];
        M.confirm({title:'Excluir regra de ST?',text:`${r.ncm} · ${r.d}. Os produtos com este NCM passam a sair como tributado normal.`,ok:'Excluir',danger:true,run:()=>{const i=S.st.indexOf(r);S.st.splice(i,1);sub();refreshTop(fv());M.toast('Regra excluída.','Desfazer',()=>{S.st.splice(i,0,r);sub()})}})}});}
  };
  const ruleModal=r=>M.modal({title:r?'Editar regra de ST':'Nova regra de ST',width:'640px',fields:[
    {k:'ncm',label:'NCM',req:true,span:4,value:r?r.ncm:'',ph:'0000.00.00'},{k:'d',label:'Descrição',req:true,span:8,value:r?r.d:'',ph:'Ex.: Fios e cabos elétricos'},
    {k:'mva',label:'MVA original (%)',type:'number',req:true,span:6,value:r?r.mva:'',help:`A MVA ajustada é calculada com entrada a ${S.par.inter}% e interna de ${S.par.int}%.`}],
    ok:r?'Salvar regra':'Criar regra',onOk:(v,el)=>{clearErr(el);
      if(!validNcm(v.ncm)){markErr(el,'ncm','Use o formato 0000.00.00.');return false}
      if(S.st.some(x=>x.ncm===v.ncm&&x!==r)){markErr(el,'ncm','Já existe regra para este NCM.');return false}
      const m=num(v.mva);if(m==null||m<0){markErr(el,'mva','Informe a MVA.');return false}
      r?Object.assign(r,{ncm:v.ncm,d:v.d,mva:m}):S.st.push({ncm:v.ncm,d:v.d,mva:m});sub();refreshTop(fv());M.toast(r?'Regra salva.':'Regra criada.')}});
  sub();
}

/* ---- Cálculo (blocos reordenáveis) ---- */
function fCalculo(b){
  b.innerHTML=`<div class="grid sy-split"><section class="card flush s8 sy-cq" id="sy-blk" aria-label="Blocos do preço"></section><aside class="card s4" id="sy-sim" style="align-self:start" aria-label="Simulação"></aside></div>`;
  const blk=$('#sy-blk',b),sim=$('#sy-sim',b);let base=S.simBase??1000;
  const drawSim=()=>{const steps=[],fin=applyBlocks(base,steps);
    $('#sy-simo',sim).innerHTML=`<div class="kv"><span>Custo efetivo</span><b class="num">${brl(base)}</b></div>${steps.map(([x,a,z])=>`<div class="kv"><span>${esc(x.n)}</span><b class="num">${z>=a?'+ ':'− '}${brl(Math.abs(z-a))}</b></div>`).join('')}
      <div class="row mt16"><span class="lbl" style="flex:1">Preço de venda</span><b class="big num">${brl(fin)}</b></div>
      <div class="lbl mt8">Markup final: ${fmtN((fin/base-1)*100,1)}%</div>`};
  const draw=()=>{const n=S.calc.length;
    blk.innerHTML=`<div class="ch"><h2>Blocos do preço</h2><span class="spacer"></span><span class="lbl">Salvo automaticamente</span></div>
      <p class="lbl" style="margin:0;padding:0 var(--pad) 16px">A ordem importa: cada bloco age sobre o resultado do anterior, de cima para baixo.</p>
      <div class="sy-block h"><span>#</span><span>Nome</span><span>Tipo</span><span>Valor</span><span class="r" style="text-align:right">Ordem</span></div>
      ${S.calc.map((x,i)=>`<div class="sy-block"><span class="sy-n">${i+1}</span>
        <input class="input sm" data-bn="${i}" value="${esc(x.n)}" aria-label="Nome do bloco ${i+1}">
        <span>${U.chip(BT[x.t],'n')}</span>
        <span class="row" style="gap:8px">${x.t==='fixo'?'<span class="lbl">R$</span>':x.t==='form'?'<span class="lbl">múltiplo de</span>':''}<input class="input sm num" data-bv="${i}" type="number" step="0.5" min="0" value="${x.v}" aria-label="Valor do bloco ${i+1}" style="width:88px;text-align:right">${x.t==='pct'||x.t==='meta'?'<span class="lbl">%</span>':''}</span>
        <span class="row" style="gap:8px;justify-content:flex-end">
          <button type="button" class="btn sm icon ghost sy-up" data-act="up" data-i="${i}" aria-label="Subir ${esc(x.n)}" title="Subir" ${i===0?'disabled':''}>${ic('baixo',16)}</button>
          <button type="button" class="btn sm icon ghost" data-act="dn" data-i="${i}" aria-label="Descer ${esc(x.n)}" title="Descer" ${i===n-1?'disabled':''}>${ic('baixo',16)}</button>
          ${U.btn('',{icon:'lixo',sm:true,ghost:true,title:'Tirar '+x.n,act:'rm',attrs:`data-i="${i}"`})}</span></div>`).join('')||`<div style="border-top:1px solid var(--line-2)">${U.empty({title:'Nenhum bloco.',text:'Sem blocos, o preço de venda é igual ao custo efetivo.'})}</div>`}
      <div class="sy-foot"><span class="lbl" style="flex:1">${n} bloco${n===1?'':'s'} · fórmula: ${S.calc.map(x=>esc(x.n.toLowerCase())).join(' → ')||'—'}</span>${U.btn('Adicionar item',{sm:true,icon:'mais',act:'add',w:'176px'})}</div>`;
    const mv=(i,d)=>{const [x]=S.calc.splice(i,1);S.calc.splice(i+d,0,x);draw();drawSim();const f=$(`[data-act="${d<0?'up':'dn'}"][data-i="${i+d}"]`,blk);(f&&!f.disabled?f:$(`[data-bn="${i+d}"]`,blk)).focus()};
    M.wire(blk,{up:el=>mv(+el.dataset.i,-1),dn:el=>mv(+el.dataset.i,1),
      rm:el=>{const i=+el.dataset.i,[x]=S.calc.splice(i,1);draw();drawSim();M.toast(`Bloco “${x.n}” tirado.`,'Desfazer',()=>{S.calc.splice(i,0,x);draw();drawSim()})},
      add:el=>M.menu(el,Object.entries(BT).map(([t,l])=>({label:l,icon:'mais',run:()=>{S.calc.push({t,n:{pct:'Novo percentual',fixo:'Novo valor fixo',form:'Arredondar para cima',meta:'Meta de lucro'}[t],v:{pct:5,fixo:10,form:10,meta:20}[t]});draw();drawSim();const ins=$$('[data-bn]',blk);ins[ins.length-1].focus();ins[ins.length-1].select()}})))});
    $$('[data-bn]',blk).forEach(i=>i.onchange=()=>{S.calc[+i.dataset.bn].n=i.value.trim()||BT[S.calc[+i.dataset.bn].t];draw();drawSim()});
    $$('[data-bv]',blk).forEach(i=>i.oninput=()=>{const x=S.calc[+i.dataset.bv],v=num(i.value);if(v==null||v<0)return;if(x.t==='meta'&&v>=100)return;x.v=v;drawSim()});
  };
  sim.innerHTML=`<div class="ch"><h2>Simulação</h2></div><label class="field mt16"><span>Custo efetivo de exemplo</span><input class="input num" id="sy-simc" inputmode="decimal" value="${fmtN(base)}"></label><div class="mt16" id="sy-simo"></div>
    <p class="lbl mt16">Vale para todos os produtos com custo: ${S.prod.filter(p=>!isKit(p)&&p.custo!=null&&p.pv==null).length} hoje.</p>`;
  $('#sy-simc',sim).oninput=e=>{const v=num(e.target.value);if(v!=null&&v>0){base=S.simBase=v;drawSim()}};
  draw();drawSim();
}

/* ---- Pendências ---- */
function fPend(b){const L=pendList();
  if(!L.length){b.innerHTML=`<section class="card">${U.empty({title:'Nenhuma pendência fiscal.',text:'Tudo revisado. Quando a IA encontrar algo para conferir, aparece aqui.'})}</section>`;return}
  b.innerHTML=`<section class="card flush"><div class="ch"><h2>Pendências</h2><span class="spacer"></span><span class="lbl">Confirme a sugestão ou abra o produto para ajustar.</span></div>
    <ul class="sy-list">${L.map((x,i)=>`<li class="sy-pend">${thumb(x.p.cat)}<div style="min-width:0"><div class="row" style="gap:8px"><b class="sy-ell" style="font-weight:600">${esc(x.p.n)}</b>${U.chip(x.t,x.k==='ncm'?'r':'w')}</div>
      <div class="lbl">${esc(x.d)}</div><div class="row mt8" style="gap:8px;flex-wrap:wrap"><span class="sy-ai sm" aria-hidden="true">${ic('brilho',16)}</span><b class="sy-sm">${esc(x.s)}</b>${x.conf?confChip(x.conf):''}</div></div>
      <div class="btnrow sy-acts w">${U.btn('Editar produto',{sm:true,act:'pedit',attrs:`data-i="${i}"`})}${x.ok?U.btn('Confirmar',{sm:true,act:'pok',attrs:`data-i="${i}"`}):'<span></span>'}</div></li>`).join('')}</ul></section>`;
  M.wire(b,{pedit:el=>prodModal(L[+el.dataset.i].p,fr),pok:el=>{const x=L[+el.dataset.i],p=x.p,old={ncm:p.ncm,rev:p.rev,custo:p.custo};
    if(x.k==='custo')p.custo=p.ucusto;else{p.ncm=p.sug;p.rev=false}
    fr();M.toast(`${p.n}: ${x.t.toLowerCase()} resolvida.`,'Desfazer',()=>{Object.assign(p,old);fr()})}});
}

/* ---- Perguntar à IA (painel lateral) ---- */
function answer(q){const t=q.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');const p1=bySku('C4-CORE5'),amp=bySku('SON-AMP');
  if(/mva/.test(t))return {a:`A MVA ajustada corrige a margem quando a entrada vem de outro estado. Fórmula: [(1 + MVA original) × (1 − alíquota de entrada) ÷ (1 − alíquota interna)] − 1. Com MVA de 37%, entrada a ${S.par.inter}% e interna de ${S.par.int}%, dá ${fmtN(mvaAj(37),2)}%.`,conf:97,base:'Convênio ICMS 142/2018 (MVA ajustada) · parâmetros desta empresa'};
  if(/kit/.test(t))return {a:'Não. Na nota, cada item do kit sai com o seu NCM, CFOP e tributação. O kit é uma forma de vender junto; o preço dele é a soma dos itens.',conf:90,base:'Manual de Orientação do Contribuinte da NF-e (um item por produto)'};
  if(/\bst\b|substitui/.test(t)){const l=S.prod.filter(p=>sitOf(p)==='st');return {a:`Hoje ${l.length} produtos estão na substituição tributária: ${l.map(p=>p.n).join(', ')}. A empresa paga o ICMS-ST na entrada; na venda, CFOP 5405 e CST 60.`,conf:88,base:'RICMS/MG, Anexo XV · regras de ST desta empresa (aba Configuração)'}}
  if(/ncm/.test(t)||/amplificador|\bamp\b|receiver|motor|cortina/.test(t)){
    if(/amplificador|\bamp\b/.test(t))return amp?{a:`O ${amp.n} é amplificador elétrico de áudio: NCM 8518.40.00. ${amp.ncm==='8518.40.00'?'O cadastro já está com esse código.':`Hoje está como ${amp.ncm}, código genérico de aparelhos elétricos com função própria.`}`,conf:92,base:'TIPI · capítulo 85, posição 85.18'}:{a:'Não achei esse produto na sua biblioteca.',conf:40,base:'—'};
    if(/receiver/.test(t))return {a:'Receiver AV combina rádio, amplificação e processamento: a classificação mais provável é 8527.99.90, mas depende do manual do fabricante. Confira antes de aplicar.',conf:64,base:'TIPI · posições 85.18 e 85.27'};
    if(/motor|cortina/.test(t))return {a:'Motor de cortina é motor elétrico de corrente contínua de baixa potência: NCM provável 8501.31.10.',conf:71,base:'TIPI · posição 85.01'};
    const L=pendList().filter(x=>x.k!=='custo');return {a:L.length?`Há ${L.length} produto${L.length>1?'s':''} com NCM a revisar: ${L.map(x=>`${x.p.n} (${x.s.replace('IA sugere ','sugestão ')})`).join('; ')}. Use “Confirmar” na aba Pendências.`:'Nenhum NCM pendente agora.',conf:85,base:'Cadastro de produtos · TIPI'}}
  if(/preco|margem|core|calcul/.test(t)&&p1){const e=custoEf(p1);if(!e)return {a:'O CORE 5 está sem custo; sem custo não há preço.',conf:90,base:'Cadastro do produto'};const steps=[],fin=applyBlocks(e.tot,steps);
    return {a:`O preço sai do custo efetivo (custo + frete + IPI + ICMS-ST) passando pelos blocos da aba Cálculo, em ordem. ${p1.n}: custo efetivo ${brl(e.tot)} → ${steps.map(([b,,z])=>`${b.n.toLowerCase()} ${brl(z)}`).join(' → ')} = ${brl(fin)}.`,conf:95,base:'Aba Cálculo e parâmetros gerais desta empresa'}}
  return {a:'Não achei base suficiente para responder com segurança. Tente citar o produto, o NCM ou a UF.',conf:35,base:'—'};
}
function askAI(){
  const CH=['Qual o NCM do Amplificador Amp?','Quais produtos têm ST em MG?','Como a MVA ajustada é calculada?','Como sai o preço do CORE 5?','Kit tem NCM próprio?'];
  const body=`<form class="sy-ask mt16" id="sy-askf"><input class="input" id="sy-askq" placeholder="Pergunte sobre NCM, ST, preço…" aria-label="Pergunte sobre NCM, ST, preço…" autocomplete="off">${U.btn('',{icon:'enviar',title:'Enviar pergunta',act:'send'})}</form>
    <div class="lbl mt16" style="margin-bottom:8px">Sugestões</div><div class="stack" style="gap:8px">${CH.map((c,i)=>U.btn(c,{sm:true,act:'chip',attrs:`data-q="${i}"`}).replace('class="btn','class="btn sy-left')).join('')}</div>
    <div id="sy-conv" class="mt24" aria-live="polite"></div>`;
  let el;
  const draw=()=>$('#sy-conv',el).innerHTML=S.chat.map(m=>`<article class="sy-msg"><div class="sy-q">${esc(m.q)}</div><div class="sy-a in"><p>${esc(m.a)}</p>
    <div class="row" style="gap:8px;flex-wrap:wrap">${confChip(m.conf)}</div><div class="lbl mt8"><b>Base:</b> ${esc(m.base)}</div></div></article>`).join('');
  const ask=q=>{q=(q||'').trim();const i=$('#sy-askq',el);if(!q)return i.focus();S.chat.unshift({q,...answer(q)});i.value='';draw()};
  el=M.sheet({kick:'Maestro AI',title:'Perguntar à IA',sub:'Cada resposta traz a base usada e o grau de confiança. Confira antes de aplicar.',body,
    on:{send:()=>ask($('#sy-askq',el).value),chip:b=>ask(CH[+b.dataset.q])}}).el;
  $('#sy-askf',el).onsubmit=e=>{e.preventDefault();ask($('#sy-askq',el).value)};
  draw();
}

M.screen('fiscal',{title:'IA Fiscal',dock:'fiscal',
  help:['Produtos: busque por nome, SKU ou NCM. “Editar” abre o cadastro completo; “Excluir” pede um segundo clique para confirmar.',
    'Importar nota: envie o XML da NF-e de compra, confira a prévia e escolha a ação de cada linha antes de aplicar.',
    'Configuração e Cálculo definem os impostos e a ordem dos blocos que formam o preço de venda.',
    'A faixa Maestro AI mostra as pendências; “Perguntar à IA” responde com a base e o grau de confiança.'],
  variants:{A:{label:'Central',render:fiscalRender,mount:fiscalMount}}});

/* =====================================================================
   2 · CATÁLOGO — #/catalogo
   ===================================================================== */
const CAT=[
 ['c1','Controlador de automação CORE 5','Control4','auto','Equipamento','CORE','C4-CORE5','8471.50.10','Cérebro da casa: integra iluminação, áudio, clima, cortinas e segurança num app só.'],
 ['c2','Interruptor inteligente 4 teclas','Control4','auto','Equipamento','Keypad','C4-KD120','8536.50.90','Quatro teclas gravadas com o nome das cenas. Funciona com e sem rede.'],
 ['c3','Módulo dimmer','Control4','auto','Equipamento','Adaptive','C4-DIM1','8536.50.90','Dimeriza lâmpadas LED e incandescentes com curva suave e memória de cena.'],
 ['c4','Motor de cortina Glydea','Somfy','auto','Equipamento','Glydea','SOM-GLYDEA','8501.31.10','Motor silencioso para trilho de cortina, com partida e parada suaves.'],
 ['c5','Access point Wi-Fi 7 de teto U7-Pro','Ubiquiti','rede','Equipamento','UniFi','UBI-U7PRO','8517.62.77','Wi-Fi 7 em três bandas para casas grandes, alimentado por PoE.'],
 ['c6','Access point externo Wi-Fi 7','Ubiquiti','rede','Equipamento','UniFi','UBI-U7OUT','8517.62.77','Cobertura para varanda, piscina e jardim, resistente a chuva e sol.'],
 ['c7','Switch PoE 16 portas','Ubiquiti','rede','Equipamento','UniFi Pro','USW-PRO-16-POE','8517.62.59','Alimenta access points e câmeras pelo próprio cabo de rede.'],
 ['c8','Cabo de rede CAT6','Furukawa','rede','Infraestrutura','GigaLan','CAB-CAT6','8544.49.00','Cabo de par trançado para gigabit, vendido por metro.'],
 ['c9','Amplificador de streaming Amp','Sonos','audio','Equipamento','Amp','SON-AMP','8518.40.00','Dá vida a caixas passivas de teto e parede, com streaming e controle pelo app.'],
 ['c10','Soundbar Arc Ultra','Sonos','audio','Equipamento','Arc','SON-ARCU','8518.22.00','Som de cinema com Dolby Atmos numa barra só, para salas de TV.'],
 ['c11','Caixa central RP-504C II','Klipsch','audio','Equipamento','Reference Premiere','KLI-RP504C','8518.22.00','Caixa central para diálogos claros em home theater.'],
 ['c12','Caixa acústica de embutir 6,5"','Klipsch','audio','Equipamento','CDT','KLI-CDT5650','8518.21.00','Caixa de embutir com tweeter direcionável, vendida em par.'],
 ['c13','Subwoofer 10 polegadas','Klipsch','audio','Equipamento','Reference','KLI-R100SW','8518.29.90','Graves firmes para cinema em casa de salas médias.'],
 ['c14','Receiver AV 7.2 canais','Denon','audio','Equipamento','AVR-X','DEN-X1800','8527.99.90','Processa e amplifica sete canais com 8K e HEOS.'],
 ['c15','Caixa de teto In-Ceiling','Sonos','audio','Equipamento','Architectural','SON-INCEIL','8518.21.00','Caixa de teto discreta para som ambiente, ligada ao Amp.'],
 ['c16','Fita LED 24V 3000K 10W/m','Stella','luz','Equipamento','Fita','STH-FITA24','9405.42.00','Luz quente e contínua para sancas e marcenaria, vendida por metro.'],
 ['c17','Perfil de embutir com difusor','Stella','luz','Acessório','Perfis','STH-PERFIL','9405.99.00','Perfil de alumínio que esconde a fita e espalha a luz sem pontos.'],
 ['c18','Spot de embutir recuado 7W 2700K','Stella','luz','Equipamento','Recuado','STH-SPOT7','9405.11.00','Spot com luz recuada para não ofuscar, ideal para salas e quartos.'],
 ['c19','Câmera IP bullet 2 MP','Intelbras','seg','Equipamento','VIP 3230','INT-VIP3230B','8525.89.29','Câmera externa com visão noturna de 30 m e alimentação PoE.'],
 ['c20','Gravador NVR 8 canais','Intelbras','seg','Equipamento','NVD','INT-NVD1408','8521.90.90','Grava até oito câmeras com acesso pelo celular.'],
 ['c21','Fechadura digital de embutir','Intelbras','seg','Equipamento','FR','INT-FR201','8301.40.00','Abre com senha, cartão ou app; registra quem entrou.'],
 ['c22','Ar-condicionado split inverter 12.000 BTUs','LG','clima','Equipamento','Dual Inverter','LG-DUAL12','8415.10.11','Split silencioso e econômico, integrável à automação.']]
 .map(([id,n,b,cat,tipo,serie,m,ncm,d])=>({id,n,b,cat,tipo,serie,m,ncm,d}));
const FICHA={auto:[['Alimentação','Bivolt 100–240 V'],['Comunicação','Zigbee e Ethernet'],['Instalação','Caixa 4×2 ou rack'],['Garantia','2 anos']],
 rede:[['Padrão','Wi-Fi 7 / Gigabit'],['Alimentação','PoE+'],['Gestão','UniFi Network'],['Garantia','1 ano']],
 audio:[['Potência','125 W por canal'],['Resposta','40 Hz – 20 kHz'],['Impedância','8 Ω'],['Garantia','1 ano']],
 luz:[['Tensão','24 V'],['Temperatura de cor','2700–3000 K'],['IRC','> 90'],['Garantia','2 anos']],
 seg:[['Resolução','2 MP / Full HD'],['Alimentação','PoE 12 V'],['Proteção','IP67'],['Garantia','1 ano']],
 clima:[['Capacidade','12.000 BTU/h'],['Tensão','220 V'],['Selo','Procel A'],['Garantia','10 anos no compressor']]};
const CONN={auto:['Ethernet','Zigbee','Relé'],rede:['RJ45 2.5 GbE','PoE+'],audio:['HDMI eARC','RCA','Bornes'],luz:['Borne 24 V'],seg:['RJ45 PoE','Alarme'],clima:['Wi-Fi','IR']};
const DOCS=['Manual de instalação (PDF)','Ficha técnica do fabricante (PDF)'];
const inLib=c=>!!bySku(c.m);
function catRender(){const brands=[...new Set(CAT.map(c=>c.b))].sort(),tipos=[...new Set(CAT.map(c=>c.tipo))];
  return `${U.page({kick:'Produtos',title:'Catálogo',sub:'Acervo curado de produtos. Escolha o que interessa e adicione à sua biblioteca com o seu preço.'})}
  ${U.bar(fit(U.search('Buscar por nome, modelo ou descrição…','sy-cq','320px')+U.select('Marcas',[['','Todas as marcas'],...brands.map(b=>[b,b])],'sy-cb','184px')
    +U.select('Categorias',[['','Todas as categorias'],...Object.entries(CATN).filter(([k])=>k!=='kit')],'sy-cc','200px')+U.select('Tipos',[['','Todos os tipos'],...tipos.map(t=>[t,t])],'sy-ct','168px')
    +U.btn('Limpar filtros',{act:'limpar',ctl:true})),`<span class="lbl num" id="sy-cn" aria-live="polite"></span>`)}
  <div id="sy-cbody" class="rv" style="--d:2"></div>`}
function catMount(v){const F=S.cf,box=$('#sy-cbody',v);
  const ids={q:'sy-cq',b:'sy-cb',c:'sy-cc',t:'sy-ct'};
  Object.entries(ids).forEach(([k,id])=>{const e=$('#'+id,v);e.value=F[k];e[k==='q'?'oninput':'onchange']=()=>{F[k]=e.value;F.pg=1;draw()}});
  M.wire(v,{limpar:()=>{Object.assign(F,{q:'',b:'',c:'',t:'',pg:1});Object.values(ids).forEach(id=>$('#'+id,v).value='');draw();$('#sy-cq',v).focus()}});
  const draw=()=>{const q=F.q.trim().toLowerCase();
    const L=CAT.filter(c=>(!q||(c.n+' '+c.m+' '+c.serie+' '+c.d).toLowerCase().includes(q))&&(!F.b||c.b===F.b)&&(!F.c||c.cat===F.c)&&(!F.t||c.tipo===F.t));
    const n=perPage();lastPer=n;const pages=Math.max(1,Math.ceil(L.length/n));F.pg=Math.min(Math.max(1,F.pg),pages);const pg=L.slice((F.pg-1)*n,F.pg*n);
    $('#sy-cn',v).textContent=`${L.length} produto${L.length===1?'':'s'}`;
    box.innerHTML=L.length?`<div class="sy-cgrid">${pg.map(c=>{const lib=inLib(c);return `<article class="card sy-pcard" aria-label="${esc(c.n)}">
        <div class="thumb sy-foto" data-cat="${c.cat}" aria-hidden="true">${ic(CATICON[c.cat],40)}</div>
        <div class="row" style="gap:8px;min-height:24px"><span class="lbl" style="flex:1">${esc(c.b)}</span>${lib?U.chip('✓ Na biblioteca','g'):''}</div>
        <button type="button" class="sy-link sy-clamp2" data-act="ver" data-id="${c.id}" title="${esc(c.n)}">${esc(c.n)}</button>
        <div class="lbl sy-sm sy-ell">${esc(c.serie)} · ${esc(c.m)}</div>
        <p class="soft sy-clamp2 sy-desc">${esc(c.d)}</p>
        ${lib?U.btn('Ver detalhe',{sm:true,act:'ver',w:'100%',attrs:`data-id="${c.id}"`}):U.btn('Adicionar à biblioteca',{sm:true,icon:'mais',act:'add',w:'100%',attrs:`data-id="${c.id}"`})}</article>`}).join('')}</div>
      <div class="sy-pager">${U.btn('Anterior',{act:'prev',ctl:true,w:'144px',attrs:F.pg<=1?'disabled':''})}<span class="lbl num">Página ${F.pg} de ${pages}</span>${U.btn('Próxima',{act:'next',ctl:true,w:'144px',attrs:F.pg>=pages?'disabled':''})}</div>`
      :`<section class="card">${U.empty({title:'Nenhum produto com esses filtros.',text:'Tente outra marca ou limpe a busca.',btn:'Limpar filtros',act:'limpar2'})}</section>`;
    const C=id=>CAT.find(c=>c.id===id);
    M.wire(box,{ver:el=>catSheet(C(el.dataset.id),draw),add:el=>addLib(C(el.dataset.id),draw),prev:()=>{F.pg--;draw();scrollTo({top:0,behavior:'smooth'})},next:()=>{F.pg++;draw();scrollTo({top:0,behavior:'smooth'})},
      limpar2:()=>$('[data-act="limpar"]',v).click()});
  };
  /* página com linhas inteiras: quantas colunas cabem (mínimo 264 + 24 de vão) × linhas */
  let lastPer=0;
  const perPage=()=>{const w=box.clientWidth||1224,c=Math.max(1,Math.floor((w+24)/288));return c===1?6:c===2?8:c*3};
  draw();
  const ro=new ResizeObserver(()=>{if(!box.isConnected)return ro.disconnect();if(perPage()!==lastPer)draw()});ro.observe(box);
}
function catSheet(c,redraw){const lib=inLib(c);
  const body=`<div class="thumb sy-foto lg" data-cat="${c.cat}" aria-hidden="true">${ic(CATICON[c.cat],48)}</div>
    <div class="sec"><h3>Descrição</h3><p style="margin:0">${esc(c.d)} Compatível com os principais sistemas de automação usados nas obras.</p></div>
    <div class="sec"><h3>Ficha técnica</h3><div class="kv" style="border-top:0"><span>Modelo</span><b>${esc(c.m)}</b></div><div class="kv"><span>NCM</span><b class="num">${esc(c.ncm)}</b></div>${FICHA[c.cat].map(([k,x])=>`<div class="kv"><span>${esc(k)}</span><b>${esc(x)}</b></div>`).join('')}</div>
    <div class="sec"><h3>Conexões</h3><div class="row" style="gap:8px;flex-wrap:wrap">${CONN[c.cat].map(x=>U.chip(x,'n')).join('')}</div></div>
    <div class="sec"><h3>Documentos</h3>${DOCS.map((d,i)=>`<div class="row sy-doc">${ic('doc',20)}<span style="flex:1">${d}</span>${U.btn('Baixar',{sm:true,act:'doc',w:'112px',attrs:`data-d="${i}"`})}</div>`).join('')}</div>`;
  const s=M.sheet({kick:c.b+' · '+CATN[c.cat],title:c.n,sub:esc(c.serie+' · '+c.m),chips:(lib?U.chip('✓ Na biblioteca','g'):'')+U.chip(c.tipo,'n'),body,
    foot:lib?[{label:'Abrir na IA Fiscal',act:'fis',pri:true}]:[{label:'Adicionar à biblioteca',act:'add',pri:true}],
    on:{doc:b=>M.toast(`Baixa “${DOCS[+b.dataset.d]}” do fabricante (simulação).`),fis:()=>{s.close();S.ftab=0;S.fq=c.m;location.hash='#/fiscal'},add:()=>{s.close();addLib(c,redraw)}}});
}
function addLib(c,redraw){
  const forn=D.fornecedores.filter(f=>f.situacao==='Ativo'),pre=forn.find(f=>f.marcas.includes(c.b));
  M.modal({title:'Adicionar à biblioteca',sub:esc(c.n+' · '+c.m),width:'560px',ok:'Adicionar à biblioteca',fields:[
    {k:'custo',label:'Preço de custo',type:'money',span:6},{k:'venda',label:'Preço de venda',type:'money',span:6,help:'Em branco: a IA Fiscal calcula pelo custo.'},
    {k:'forn',label:'Fornecedor',type:'select',req:true,span:12,ph:'Escolha…',opts:forn.map(f=>[f.id,f.nome]),value:pre?pre.id:''}],
    onOk:(v,el)=>{clearErr(el);const cu=num(v.custo),pv=num(v.venda);
      if(v.custo&&(cu==null||cu<0)){markErr(el,'custo','Valor inválido.');return false}
      if(v.venda&&(pv==null||pv<0)){markErr(el,'venda','Valor inválido.');return false}
      S.prod.unshift({id:'p'+Date.now(),n:c.n,sku:c.m,b:c.b,m:c.serie,u:'UN',cat:c.cat,ncm:c.ncm,custo:cu,pv,frete:3,ipi:0,icmsE:S.par.inter,cest:'',orig:ORIG[0],curta:c.n,res:c.d,comp:'',forn:v.forn,kit:null,rev:false});
      redraw&&redraw();M.toast(`${c.n} está na sua biblioteca.`,'Ver na IA Fiscal',()=>{S.ftab=0;S.fq=c.m;location.hash='#/fiscal'})}});
}
M.screen('catalogo',{title:'Catálogo',dock:'catalogo',
  help:['Busque por nome, modelo ou descrição e combine com marca, categoria e tipo.','Clique no nome do produto para ver descrição, ficha técnica, conexões e documentos.',
    '“Adicionar à biblioteca” pede custo, venda e fornecedor; o produto passa a valer nas propostas e aparece na IA Fiscal.'],
  variants:{A:{label:'Grade',render:catRender,mount:catMount}}});

/* =====================================================================
   3 · RELATÓRIOS — #/relatorios  (no real o título ainda é "Operação IA")
   ===================================================================== */
const KINDS=[['Registro Técnico','Técnica','chave'],['Passagem de bastão','Comercial','trocar'],['Registro de Projetos','Projetos','projetos'],['Registro de Experiência','Experiência','coracao']];
const RTONE={'Recebendo':'n','Transcrevendo':'b','Estruturando':'b','Pendente revisão':'w','Salvo':'g','Falhou':'r','Descartado':'n'};
if(!S.rel){
  const kindOf=t=>KINDS.find(k=>k[1]===t)[0];
  S.rel=[
   ['r1','Técnica','Helena Duarte','Residência Duarte','Bruno Lima',2,'Pendente revisão','Passagem de cabos CAT6 na sala e na cozinha concluída. Falta a suíte master.',{feito:['Passados 120 m de cabo CAT6 na sala e na cozinha.','Caixas de passagem identificadas com etiqueta.'],pend:['Suíte master: falta passar os cabos (o gesseiro ainda não fechou o forro).'],prox:['Voltar quinta pela manhã para a suíte.','Pedir mais uma caixa de CAT6 em Compras.'],mat:['Cabo de rede CAT6 · 120 m','Caixa de passagem 4×2 · 6'],fotos:8}],
   ['r2','Técnica','Lívia Prates e Otávio Lemos','Residência Prates Lemos','Bruno Lima',0.4,'Estruturando','Áudio de 3 min da vistoria do pré-projeto.'],
   ['r3','Projetos','Marcos Valente','Casa Valente','Diego Rocha',5,'Salvo','Rack montado e organizado. Três pontos de rede sem sinal no 2º andar.',{feito:['Rack montado com patch panel e switch.','Testados 24 pontos de rede.'],pend:['Três pontos sem sinal no 2º andar (quartos 2 e 3).'],prox:['Bruno refaz as conexões dos três pontos.'],mat:['Switch PoE 16 portas','Patch cord CAT6 · 24'],fotos:12}],
   ['r4','Comercial','Lívia Prates e Otávio Lemos','Residência Prates Lemos','Allysson Moura',20,'Salvo','Negócio ganho na opção Completa. Escopo, prazos e contatos passados para Projetos.',{feito:['Cliente escolheu a opção 2 · Completa.','Contrato assinado; entrada recebida.'],pend:['Confirmar com a arquiteta o layout final da sala.'],prox:['Diego agenda a visita de pré-projeto.'],mat:[],fotos:0}],
   ['r5','Experiência','Paula e Renato Lopes','Apartamento Savassi','Elisa Prado',26,'Salvo','Visita de pós-venda. Cliente pediu ajuste nas cenas de iluminação da sala.'],
   ['r6','Técnica','Marcos Valente','Casa Valente','Bruno Lima',30,'Falhou','Áudio de 4 min sem transcrição: o arquivo chegou cortado.'],
   ['r7','Projetos','Construtora Alameda','Residência Alameda','Diego Rocha',74,'Pendente revisão','Obra pausada esperando a compra do receiver e das caixas.'],
   ['r8','Técnica','Helena Duarte','Residência Duarte','Bruno Lima',140,'Salvo','Módulos dimmer da sala instalados; cenas testadas com a cliente.'],
   ['r9','Experiência','Helena Duarte','Residência Duarte','Elisa Prado',216,'Pendente revisão','Ligação de acompanhamento: cliente satisfeita, pediu orçamento de áudio na varanda.'],
   ['r10','Projetos','Helena Duarte','Residência Duarte','Marina Costa Arquitetura',290,'Salvo','Arquiteta enviou o layout novo da cozinha com a sanca de LED.'],
   ['r11','Comercial','Marcos Valente','Casa Valente','Felipe Nunes',600,'Salvo','Ganho com rede e áudio. Cliente quer tudo pronto antes de 15/12.'],
   ['r12','Técnica','Sérgio Bastos','','Bruno Lima',960,'Descartado','Visita técnica registrada em dobro.']]
   .map(([id,tipo,cli,obra,autor,h,status,resumo,st])=>({id,tipo,kind:kindOf(tipo),cli,obra,autor,h,status,resumo,st}));
  S.hand=[{id:'h1',de:'Comercial',para:'Projetos',obra:'Residência Prates Lemos',quem:'Allysson Moura → Diego Rocha',st:'Aguardando aceite'},
    {id:'h2',de:'Projetos',para:'Técnica',obra:'Casa Valente',quem:'Diego Rocha → Bruno Lima',st:'Aceito'},
    {id:'h3',de:'Técnica',para:'Experiência',obra:'Apartamento Savassi',quem:'Bruno Lima → Elisa Prado',st:'Em andamento'}];
}
const quando=h=>h<1?`há ${Math.max(1,Math.round(h*60))} min`:h<24?`há ${Math.round(h)} h`:h<48?'ontem':`há ${Math.round(h/24)} dias`;
const isTeam=a=>D.equipe.some(u=>u.nome===a);
const relStruct=r=>r.st||{feito:[r.resumo],pend:['Nada pendente citado no relatório.'],prox:[{Técnica:'Agendar a próxima visita técnica.',Projetos:'Atualizar a etapa da obra no card.',Comercial:'Confirmar o aceite da passagem de bastão.',Experiência:'Registrar o próximo contato com o cliente.'}[r.tipo]],mat:[],fotos:3};
let relDraw=()=>{};
function relRender(){const autores=[...new Set(S.rel.map(r=>r.autor))],clis=[...new Set(S.rel.map(r=>r.cli))].sort();
  return `${U.page({kick:'Registros da operação',title:'Relatórios',sub:'Registros inteligentes estruturados pela IA · entrada contextual em cada ficha.',
    acts:[{label:'Relatório geral do cliente (PDF)',icon:'doc',act:'geral'},{label:'Novo ▾',icon:'mais',act:'novo',pri:true}]})}
  ${U.bar(U.tabs(['Todos','Técnica','Comercial','Projetos','Experiência'],S.rf.tab,'Área do relatório'),fit(U.search('Buscar palavra-chave em qualquer relatório…','sy-rq','360px')))}
  ${U.bar(fit(U.select('Período',[['todo','Todo o período'],['24','Últimas 24 horas'],['168','Últimos 7 dias'],['720','Últimos 30 dias']],'sy-rp','184px')
    +U.select('Status',['Todos','Pendente revisão','Salvos','Falharam'],'sy-rs','184px')+U.select('Autor',[['','Todos os autores'],...autores.map(a=>[a,a])],'sy-ra','224px')
    +U.select('Cliente',[['','Todos os clientes'],...clis.map(c=>[c,c])],'sy-rc','240px')),fit(U.seg('sy-re',[['meus','Meus'],['equipe','Equipe'],['tudo','Tudo']],S.rf.esc,'De quem')))}
  <div id="sy-rk"></div><div id="sy-rt" class="sy-cq"></div>`}
function relMount(v){const f=S.rf;
  M.wire(v,{geral:()=>relGeral(),novo:el=>M.menu(el,KINDS.map(k=>({label:k[0],icon:k[2],run:()=>relNovo(k[0])})))});
  $('[data-tabs]',v).addEventListener('tab',e=>{f.tab=e.detail;draw()});
  const q=$('#sy-rq',v);q.value=f.q;q.oninput=()=>{f.q=q.value;draw()};
  const SEL=[['sy-rp','per'],['sy-rs','st'],['sy-ra','autor'],['sy-rc','cli']];
  const sync=()=>SEL.forEach(([id,k])=>$('#'+id,v).value=f[k]);
  SEL.forEach(([id,k])=>{$('#'+id,v).onchange=e=>{f[k]=e.target.value;if(k==='st')f.late=false;draw()}});sync();
  U.bindSeg(v,'sy-re',x=>{f.esc=x;draw()});
  const draw=relDraw=()=>{if(!$('#sy-rt',v))return;
    const R=S.rel,pend=R.filter(r=>r.status==='Pendente revisão'),late=pend.filter(r=>r.h>48),hoje=R.filter(r=>r.h<24),hand=S.hand.filter(h=>!['Concluído','Recusado'].includes(h.st));
    const cnt={};R.filter(r=>r.h<=720).forEach(r=>cnt[r.autor]=(cnt[r.autor]||0)+1);const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0]||['—',0];
    const k=$('#sy-rk',v);k.innerHTML=U.kpis([{label:'Hoje',value:hoje.length,sub:'nas últimas 24 horas',act:'k-hoje'},{label:'Pendentes revisão',value:pend.length,chip:pend.length?'revisar':'',tone:'w',sub:'esperando alguém salvar',act:'k-pend'},
      {label:'Atrasados',value:late.length,chip:late.length?'+48 h':'',tone:'r',sub:'pendentes há mais de 2 dias',act:'k-late'},{label:'Handoffs em aberto',value:hand.length,sub:'passagens entre áreas',act:'k-hand'},
      {label:'Top autor',value:`<span class="sy-tile" title="${esc(top[0])}">${esc(top[0])}</span>`,sub:`${top[1]} relatórios em 30 dias`,act:'k-top'}],5);
    M.wire(k,{'k-hoje':()=>{f.per='24';f.st='Todos';f.late=false;sync();draw()},'k-pend':()=>{f.st='Pendente revisão';f.late=false;f.per='todo';sync();draw()},
      'k-late':()=>{f.st='Pendente revisão';f.late=true;f.per='todo';sync();draw()},'k-hand':()=>handSheet(),'k-top':()=>{f.autor=top[0];sync();draw()}});
    const tipo=['','Técnica','Comercial','Projetos','Experiência'][f.tab],st={'Salvos':'Salvo','Falharam':'Falhou'}[f.st]||f.st,t=f.q.trim().toLowerCase();
    const rows=R.filter(r=>(!tipo||r.tipo===tipo)&&(f.per==='todo'||r.h<=+f.per)&&(st==='Todos'||r.status===st)&&(!f.late||r.h>48)&&(!f.autor||r.autor===f.autor)&&(!f.cli||r.cli===f.cli)
      &&(f.esc==='tudo'||(f.esc==='meus'?r.autor==='Allysson Moura':isTeam(r.autor)))&&(!t||(r.resumo+' '+r.cli+' '+r.obra+' '+r.autor+' '+r.kind).toLowerCase().includes(t)));
    const box=$('#sy-rt',v);
    box.innerHTML=fixT(U.table({fixed:true,title:`${rows.length} relatório${rows.length===1?'':'s'}`,head:f.late?U.btn('Mostrar todos os pendentes',{sm:true,act:'unlate',w:'224px'}):'',rows,rowAct:'abrir',cols:[
      {h:'Quando',w:'104px',html:r=>`<span class="lbl">${quando(r.h)}</span>`},
      {h:'Relatório',html:r=>`<div class="sy-ell" style="font-weight:600" title="${esc(r.resumo)}">${esc(r.resumo)}</div><div class="lbl sy-sm sy-ell">${esc(r.kind)}<span class="sy-x"> · ${esc(r.autor)}</span></div>`},
      {h:'Cliente · obra',w:'240px',html:r=>`<div class="sy-ell" title="${esc(r.cli)}">${esc(r.cli)}</div><div class="lbl sy-sm sy-ell">${esc(r.obra||'Sem obra')}</div>`},
      {h:'Autor',w:'200px',html:r=>`<span class="row sy-nw" style="gap:8px">${U.av(r.autor)}<span class="sy-ell" title="${esc(r.autor)}">${esc(r.autor)}</span></span>`},
      {h:'Status',w:'152px',html:r=>U.chip(r.status,RTONE[r.status])+(r.status==='Pendente revisão'&&r.h>48?'<div class="lbl sy-sm neg">atrasado</div>':'')},
      {h:'',w:'76px',r:true,html:r=>U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Mais ações',act:'mais',attrs:`data-id="${r.id}" aria-haspopup="menu"`})}],
      empty:{title:'Nenhum relatório com esses filtros.',text:'Troque o período, o status ou limpe a busca.',btn:'Limpar filtros',act:'limpar'}}));
    M.wire(box,{abrir:tr=>openRel(rows[+tr.dataset.i]),unlate:()=>{f.late=false;draw()},
      limpar:()=>{Object.assign(f,{q:'',per:'todo',st:'Todos',autor:'',cli:'',esc:'tudo',late:false});q.value='';sync();$$('#sy-re button',v).forEach(b=>b.setAttribute('aria-pressed',b.dataset.v==='tudo'));draw()},
      mais:el=>{const r=S.rel.find(x=>x.id===el.dataset.id);M.menu(el,[{label:'Abrir relatório',icon:'olho',run:()=>openRel(r)},{label:'Salvar em PDF',icon:'doc',run:()=>M.toast(`Gera o PDF de “${r.kind} · ${r.cli}” (simulação).`)},
        {label:'Enviar (copiar link)',icon:'copiar',run:()=>{const u='https://maestro-os.app/r/'+r.id;try{navigator.clipboard.writeText(u)}catch(e){}M.toast('Link do relatório copiado.')}},'-',
        {label:'Excluir',icon:'lixo',danger:true,run:()=>delRel(r)}])}});
  };
  draw();
}
const delRel=r=>M.confirm({title:'Excluir relatório?',text:`${r.kind} · ${r.cli}. Ele sai da lista e vai para Itens excluídos.`,ok:'Excluir',danger:true,
  run:()=>{const i=S.rel.indexOf(r);S.rel.splice(i,1);relDraw();M.toast('Relatório excluído.','Desfazer',()=>{S.rel.splice(i,0,r);relDraw()})}});
function openRel(r){if(!r)return;const s0=relStruct(r),busy=['Recebendo','Transcrevendo','Estruturando'].includes(r.status);
  const li=a=>a.length?`<ul class="sy-ul">${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<span class="lbl">Nada citado.</span>';
  const body=busy?`<div class="sec"><h3>${esc(r.status)}…</h3><p class="soft" style="margin:0 0 16px">A IA está organizando este relatório. Ele aparece aqui para revisão em instantes.</p>${U.prog(r.status==='Estruturando'?72:36)}</div>`
   :`<div class="sec"><h3>Resumo do dia</h3><div id="sy-rres"><p style="margin:0">${esc(r.resumo)}</p></div></div>
    <div class="sec"><h3>O que foi feito</h3>${li(s0.feito)}</div><div class="sec"><h3>Pendências</h3>${li(s0.pend)}</div><div class="sec"><h3>Próximos passos</h3>${li(s0.prox)}</div>
    <div class="sec"><h3>Materiais citados</h3>${s0.mat.length?`<div class="row" style="gap:8px;flex-wrap:wrap">${s0.mat.map(m=>U.chip(m,'n')).join('')}</div>`:'<span class="lbl">Nenhum.</span>'}</div>
    <div class="sec"><h3>Fotos · ${s0.fotos}</h3>${s0.fotos?`<div class="grid g4" style="gap:8px">${Array.from({length:Math.min(4,s0.fotos)},()=>`<div class="thumb sy-ph" data-cat="srv" aria-hidden="true">${ic('camera',20)}</div>`).join('')}</div>`:'<span class="lbl">Sem fotos.</span>'}</div>`;
  const pend=r.status==='Pendente revisão',fail=r.status==='Falhou',ok=r.status==='Salvo';
  const s=M.sheet({kick:r.kind,title:r.cli,sub:esc(`${r.obra||'Sem obra'} · por ${r.autor} · ${quando(r.h)}`),chips:U.chip(r.status,RTONE[r.status]),body,
    acts:pend?[{label:'Editar',act:'editar',icon:'doc'}]:fail?[{label:'Gravar de novo',act:'gravar',icon:'som'}]:[],
    foot:pend?[{label:'Descartar',act:'descartar'},{label:'Salvar registro',act:'salvar',pri:true}]:fail?[{label:'Descartar',act:'descartar'},{label:'Tentar de novo',act:'tentar',pri:true}]
      :ok?[{label:'Salvar em PDF',act:'pdf'},{label:'Enviar (copiar link)',act:'link',pri:true}]:[],
    on:{editar:()=>{const w=$('#sy-rres',s.el);if($('textarea',w))return;w.innerHTML=`<textarea class="input" id="sy-rta" aria-label="Resumo do dia" style="width:100%">${esc(r.resumo)}</textarea>`;$('#sy-rta',s.el).focus()},
      salvar:()=>{const ta=$('#sy-rta',s.el);if(ta){const t=ta.value.trim();if(t.length<10)return M.toast('O resumo precisa de pelo menos 10 caracteres.');r.resumo=t}r.status='Salvo';s.close();relDraw();M.toast('Registro salvo.')},
      descartar:()=>{const old=r.status;r.status='Descartado';s.close();relDraw();M.toast('Registro descartado.','Desfazer',()=>{r.status=old;relDraw()})},
      tentar:()=>{r.status='Estruturando';s.close();relDraw();M.toast('Processando de novo…');setTimeout(()=>{r.status='Pendente revisão';relDraw();M.toast(`Relatório de ${r.cli} pronto para revisão.`,'Abrir',()=>openRel(r))},1600)},
      gravar:()=>{s.close();relNovo(r.kind,{cli:r.cli,obra:r.obra,modo:'Áudio'})},
      pdf:()=>M.toast(`Gera o PDF de “${r.kind} · ${r.cli}” (simulação).`),link:()=>{try{navigator.clipboard.writeText('https://maestro-os.app/r/'+r.id)}catch(e){}M.toast('Link do relatório copiado.')}}});
}
function relNovo(kind,pre={}){const clis=D.contatos.filter(c=>c.papel==='Cliente').map(c=>c.nome);
  const {el}=M.modal({title:kind,sub:'A IA estrutura o que você mandar. O registro fica pendente até alguém revisar e salvar.',width:'720px',ok:'Enviar relatório',fields:[
    {k:'cli',label:'Cliente',type:'select',req:true,span:6,ph:'Escolha…',opts:clis,value:pre.cli||''},
    {k:'obra',label:'Obra',type:'select',span:6,opts:[['','Sem obra'],...D.obras.map(o=>[o.nome,o.nome])],value:pre.obra||''},
    {k:'modo',label:'Como vai registrar',type:'radio',span:12,opts:['Texto','Áudio'],value:pre.modo||'Texto'},
    {k:'texto',label:'O que aconteceu',type:'textarea',span:12,ph:'Conte o que foi feito, o que falta e o que o cliente pediu.',help:'Mínimo de 10 caracteres.'},
    {k:'audio',label:'Áudio',type:'file',span:6,ph:'Escolher áudio'},{k:'fotos',label:'Fotos',type:'file',span:6,ph:'Escolher fotos'}],
    onOk:(v,el)=>{clearErr(el);
      if(v.modo==='Texto'&&v.texto.length<10){markErr(el,'texto',v.texto?'Escreva pelo menos 10 caracteres.':'Obrigatório.');$('[name="texto"]',el).focus();return false}
      const af=$('[name="audio"]',el).files[0];if(v.modo==='Áudio'&&!af){markErr(el,'audio','Escolha o arquivo de áudio.');return false}
      const k=KINDS.find(x=>x[0]===kind),r={id:'r'+Date.now(),tipo:k[1],kind,cli:v.cli,obra:v.obra,autor:'Allysson Moura',h:0,status:'Pendente revisão',
        resumo:v.modo==='Texto'?v.texto.replace(/\s+/g,' ').slice(0,160):`Áudio enviado (${af.name}). Transcrição estruturada pela IA.`};
      S.rel.unshift(r);relDraw();M.toast('Relatório enviado. Revise e salve.','Abrir',()=>openRel(r))}});
  const sync=()=>{const m=($('[name="modo"]:checked',el)||{}).value;$('[name="texto"]',el).closest('.field').hidden=m!=='Texto';$('[name="audio"]',el).closest('.field').hidden=m!=='Áudio'};
  $$('[name="modo"]',el).forEach(r=>r.onchange=sync);sync();
}
function relGeral(){M.modal({title:'Relatório geral do cliente (PDF)',sub:'Junta todos os registros salvos do cliente num documento só.',width:'560px',ok:'Gerar PDF',fields:[
  {k:'cli',label:'Cliente',type:'select',req:true,span:12,ph:'Escolha…',opts:[...new Set(S.rel.map(r=>r.cli))].sort()},
  {k:'per',label:'Período',type:'select',span:12,opts:['Todo o período','Últimos 30 dias','Últimos 7 dias']}],
  onOk:v=>M.toast(`Gera o PDF de ${v.cli} com ${S.rel.filter(r=>r.cli===v.cli&&r.status==='Salvo').length} registros salvos (simulação).`)})}
function handSheet(){
  const body=()=>`<div class="sec"><p class="soft" style="margin:0">Passagens de bastão entre áreas: quem recebe aceita, recusa com motivo ou conclui.</p></div>${S.hand.map((h,i)=>`<div class="sec">
    <div class="row"><b style="flex:1">${esc(h.obra)}</b>${U.chip(h.st,{'Aguardando aceite':'w','Aceito':'b','Em andamento':'b','Concluído':'g','Recusado':'r'}[h.st])}</div>
    <div class="lbl mt8">${esc(h.de)} → ${esc(h.para)} · ${esc(h.quem)}${h.motivo?' · motivo: '+esc(h.motivo):''}</div>
    ${h.st==='Aguardando aceite'?`<div class="btnrow mt16">${U.btn('Recusar',{sm:true,act:'rec',attrs:`data-i="${i}"`})}${U.btn('Aceitar',{sm:true,act:'ace',attrs:`data-i="${i}"`})}</div>`
      :['Aceito','Em andamento'].includes(h.st)?`<div class="btnrow mt16">${U.btn('Concluir',{sm:true,act:'con',attrs:`data-i="${i}"`})}</div>`:''}</div>`).join('')}`;
  let s;const redo=()=>{const b=$('.sb',s.el);b.innerHTML=body();M.wire(b,H);relDraw()};
  const H={ace:el=>{S.hand[+el.dataset.i].st='Aceito';redo();M.toast('Passagem aceita.')},con:el=>{S.hand[+el.dataset.i].st='Concluído';redo();M.toast('Passagem concluída.')},
    rec:el=>{const h=S.hand[+el.dataset.i];M.confirm({title:'Recusar passagem?',text:`${h.obra} · ${h.de} → ${h.para}. Quem enviou recebe o motivo.`,ok:'Recusar',danger:true,field:'Motivo',run:v=>{h.st='Recusado';h.motivo=v.motivo;redo();M.toast('Passagem recusada.')}})}};
  s=M.sheet({kick:'Relatórios',title:'Handoffs',sub:`${S.hand.filter(h=>!['Concluído','Recusado'].includes(h.st)).length} em aberto`,body:body(),on:H});
}
M.screen('relatorios',{title:'Relatórios',dock:'relatorios',
  help:['“Novo” cria um registro (técnico, passagem de bastão, projetos ou experiência) por texto ou áudio, com fotos.',
    'A IA estrutura o texto; o registro fica “Pendente revisão” até alguém abrir, conferir e salvar.',
    'Os quadros do topo filtram a lista: “Pendentes revisão” e “Atrasados” mostram só esses; “Handoffs” abre as passagens entre áreas.',
    'No ⋯ de cada linha: abrir, salvar em PDF, copiar o link ou excluir.'],
  variants:{A:{label:'Lista',render:relRender,mount:relMount}}});

/* =====================================================================
   4 · NUMBERS — #/numbers
   ===================================================================== */
const MESL=['nov','dez','jan','fev','mar','abr','mai','jun','jul','ago','set','out'];
const NB={rec:[110,140,120,150,125,135,100,150,140,170,180,230,150,175,130,190,160,170,120,180,150,240,210,387.70902].map(v=>v*1000),
  gan:[3,4,4,4,4,4,3,4,4,5,5,6,4,5,3,5,4,5,3,5,4,6,5,8],per:[4,4,3,4,4,3,4,3,4,4,3,3,3,3,4,3,3,2,4,3,3,2,3,2]};
const win=(a,p,prev)=>prev?a.slice(24-2*p,24-p):a.slice(24-p);
const nstat=(p,prev)=>{const r=sum(win(NB.rec,p,prev)),g=sum(win(NB.gan,p,prev)),l=sum(win(NB.per,p,prev));return {r,g,l,t:g?r/g:0,c:g+l?g/(g+l)*100:0}};
const pipeNow=()=>D.negocios.filter(n=>n.status==='Aberto').reduce((s,n)=>s+n.valor,0);
const PIPEPREV={3:.86,6:.78,12:.66};
const mil=v=>v>=1000?fmtN(v/1000,0)+' mil':fmtN(v,0);
function svgChart({labels,series,type='line',fmt=mil,h=240,aria='Gráfico'}){
  const w=800,pl=72,pr=16,pt=16,pb=32,n=labels.length,max=Math.max(1e-9,...series.flatMap(s=>s.v))*1.15,iw=w-pl-pr,ih=h-pt-pb;
  const X=i=>type==='bar'?pl+(i+.5)*iw/n:pl+(n>1?i*iw/(n-1):iw/2),Y=v=>pt+(1-v/max)*ih;
  let g='';for(let k=0;k<=3;k++){const v=max/1.15*k/3,y=Y(v).toFixed(1);g+=`<line x1="${pl}" x2="${w-pr}" y1="${y}" y2="${y}" style="stroke:var(--line)"/><text x="${pl-12}" y="${(+y+4).toFixed(1)}" text-anchor="end" style="fill:var(--faint);font-size:12px">${fmt(v)}</text>`}
  let m='';
  if(type==='bar'){const gw=iw/n*.64,bw=gw/series.length;series.forEach((s,k)=>s.v.forEach((v,i)=>{const x=X(i)-gw/2+k*bw+2,y=Y(v);
    m+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(2,bw-4).toFixed(1)}" height="${Math.max(0,pt+ih-y).toFixed(1)}" rx="4" style="fill:${s.c}"><title>${esc((s.name?s.name+' · ':'')+labels[i]+': '+fmt(v))}</title></rect>`}))}
  else series.forEach(s=>{m+=`<path class="draw" d="${s.v.map((v,i)=>`${i?'L':'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ')}" style="fill:none;stroke:${s.c};stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>`
    +s.v.map((v,i)=>`<circle cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="4" style="fill:var(--panel);stroke:${s.c};stroke-width:2"><title>${esc(labels[i]+': '+fmt(v))}</title></circle>`).join('')});
  return `<svg class="sy-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(aria)}">${g}${m}${labels.map((l,i)=>`<text x="${X(i).toFixed(1)}" y="${h-8}" text-anchor="middle" style="fill:var(--faint);font-size:12px">${l}</text>`).join('')}</svg>`}
const legend=items=>`<div class="row" style="gap:16px">${items.map(([c,l])=>`<span class="row lbl" style="gap:8px"><span class="dot" style="background:${c}"></span>${l}</span>`).join('')}</div>`;
const segW=(html,w)=>html.replace(/width:\d+px/,'width:'+w+'px');
function numRender(){return `${U.page({kick:'Comercial',title:'Numbers',sub:'Leitura executiva de vendas, conversão, carteira e pipeline.'})}
  ${U.bar(U.seg('sy-per',[['3','3 meses'],['6','6 meses'],['12','12 meses']],S.per,'Período'),'<span class="lbl" id="sy-perl"></span>')}
  <div id="sy-nb"></div>`}
function numMount(v){U.bindSeg(v,'sy-per',x=>{S.per=x;draw()});const box=$('#sy-nb',v);
  const draw=()=>{const p=+S.per,a=nstat(p),b=nstat(p,true),pipe=pipeNow(),pipeB=pipe*PIPEPREV[p],lab=MESL.slice(12-p);
    $('#sy-perl',v).textContent=`${lab[0]} a ${lab[lab.length-1]} · comparado com os ${p} meses anteriores`;
    const vr=(x,y,pp)=>{const d=pp?x-y:(y?(x/y-1)*100:0),up=d>=0;return `<span class="${up?'pos':'neg'}">${up?'▲':'▼'} ${fmtN(Math.abs(d),1)}${pp?' p.p.':'%'}</span> vs ${p} meses anteriores`};
    const mes=NB.rec[23],pm=Math.min(100,mes/S.meta*100);
    const rec=win(NB.rec,p),gan=win(NB.gan,p),per=win(NB.per,p),tic=rec.map((x,i)=>gan[i]?x/gan[i]:0),conv=gan.map((x,i)=>x/(x+per[i])*100);
    const evo={rec:[rec,mil,'Receita fechada por mês'],tic:[tic,mil,'Ticket médio por mês'],conv:[conv,x=>fmtN(x,0)+'%','Conversão por mês']}[S.evo];
    const resp={};D.negocios.filter(n=>n.status==='Aberto').forEach(n=>{resp[n.resp]=resp[n.resp]||{v:0,n:0};resp[n.resp].v+=n.valor;resp[n.resp].n++});
    const ori={};D.negocios.filter(n=>n.status==='Ganho').forEach(n=>{ori[n.origem]=ori[n.origem]||{v:0,n:0};ori[n.origem].v+=n.valor;ori[n.origem].n++});
    const rk=Object.entries(S.rank==='pipe'?resp:ori).sort((x,y)=>y[1].v-x[1].v),rmax=Math.max(1,...rk.map(r=>r[1].v));
    const SA=[['Saudável','70 a 100',14,'pos'],['Atenção','40 a 69',5,'warn'],['Em risco','abaixo de 40',2,'neg']],sat=sum(SA.map(s=>s[2]));
    box.innerHTML=`<div class="grid">
      <section class="card s12 rv" style="--d:1" id="sy-meta" aria-label="Meta do mês">${S.metaEdit
        ?`<div class="ch"><h2>Meta do mês · outubro</h2></div><div class="row mt16" style="gap:12px;flex-wrap:wrap"><label class="lbl" for="sy-metai">Nova meta</label><input class="input sm num" id="sy-metai" inputmode="decimal" value="${fmtN(S.meta)}" style="width:200px;text-align:right">
           <div class="btnrow" style="width:264px">${U.btn('Cancelar',{sm:true,act:'mcancel'})}${U.btn('Salvar',{sm:true,act:'msave'})}</div><span class="lbl" id="sy-merr" role="alert"></span></div>`
        :`<div class="ch"><h2>Meta do mês · outubro</h2><span class="spacer"></span>${U.btn('Editar meta',{sm:true,act:'medit',w:'152px'})}</div>
           <div class="row mt16" style="gap:16px;flex-wrap:wrap;align-items:baseline"><b class="big num">${brl(mes)}</b><span class="lbl num">de ${brl(S.meta)} · ${fmtN(mes/S.meta*100,0)}%</span><span class="spacer"></span><span class="lbl">${mes>=S.meta?'Meta batida.':'Faltam '+brl(S.meta-mes)+'.'}</span></div>
           <div class="mt16">${U.prog(pm,mes>=S.meta?'rgb(var(--pos))':'')}</div>`}</section>
      <div class="s12">${U.kpis([{label:'Receita fechada',value:brl(a.r),sub:vr(a.r,b.r)},{label:'Ticket médio',value:brl(a.t),sub:vr(a.t,b.t)},
        {label:'Conversão',value:fmtN(a.c,1)+'%',sub:vr(a.c,b.c,true)},{label:'Pipeline aberto',value:brl(pipe),sub:vr(pipe,pipeB)}],4).replace('margin-bottom:24px','margin-bottom:0')}</div>
      <section class="card s8 rv" style="--d:3"><div class="ch" style="flex-wrap:wrap"><h2>Evolução</h2><span class="spacer"></span>${segW(U.seg('sy-evo',[['rec','Receita'],['tic','Ticket'],['conv','Conversão']],S.evo,'Medida','in'),312)}${segW(U.seg('sy-evt',[['line','Linha'],['bar','Colunas']],S.evoT,'Tipo de gráfico','in'),208)}</div>
        <div class="mt16">${svgChart({labels:lab,series:[{v:evo[0],c:'rgb(var(--primary))',name:evo[2]}],type:S.evoT,fmt:evo[1],aria:evo[2]})}</div></section>
      <section class="card s4 rv" style="--d:4"><div class="ch"><h2>Decisões</h2><span class="spacer"></span>${segW(U.seg('sy-dec',[['gp','Ganhos x perdas'],['cm','Conversão']],S.dec,'Decisões','in'),256)}</div>
        <div class="mt16">${S.dec==='gp'?svgChart({labels:lab,series:[{v:gan,c:'rgb(var(--pos))',name:'Ganhos'},{v:per,c:'rgb(var(--neg))',name:'Perdidos'}],type:'bar',fmt:x=>fmtN(x,0),h:320,aria:'Ganhos e perdas por mês'})
          :svgChart({labels:lab,series:[{v:conv,c:'rgb(var(--primary))'}],fmt:x=>fmtN(x,0)+'%',h:320,aria:'Conversão mensal'})}</div>
        <div class="row mt16" style="justify-content:space-between">${S.dec==='gp'?legend([['rgb(var(--pos))',`Ganhos · ${a.g}`],['rgb(var(--neg))',`Perdidos · ${a.l}`]]):`<span class="lbl">Média do período: ${fmtN(a.c,1)}%</span>`}</div></section>
      <section class="card s6 rv" style="--d:5"><div class="ch"><h2>Ranking</h2><span class="spacer"></span>${segW(U.seg('sy-rank',[['pipe','Pipeline'],['ind','Quem mais indica']],S.rank,'Ranking','in'),288)}</div>
        <div class="stack mt16" style="gap:4px">${rk.map(([k,x])=>`<div class="sy-hrow"><span class="sy-ell" style="max-width:none">${esc(k)}<span class="lbl sy-blk sy-sm">${x.n} negócio${x.n>1?'s':''} ${S.rank==='pipe'?'abertos':'ganhos'}</span></span><div class="sy-hbar"><b style="width:${x.v/rmax*100}%"></b></div><b class="num" style="text-align:right">${M.brl0(x.v)}</b></div>`).join('')}</div></section>
      <section class="card s6 rv" style="--d:6"><div class="ch"><h2>Saúde da carteira</h2><span class="spacer"></span><span class="lbl">${sat} clientes</span></div>
        <div class="sy-band3 mt16" role="img" aria-label="${SA.map(s=>s[0]+': '+s[2]).join(', ')}">${SA.map(s=>`<b style="flex:${s[2]};background:rgb(var(--${s[3]}))"></b>`).join('')}</div>
        <div class="mt16">${SA.map(s=>`<div class="kv"><span class="row" style="gap:8px"><span class="dot" style="background:rgb(var(--${s[3]}))"></span>${s[0]} · ${s[1]}</span><b class="num">${s[2]} · ${fmtN(s[2]/sat*100,0)}%</b></div>`).join('')}</div>
        <div class="row mt16" style="gap:12px"><span class="lbl" style="flex:1">Em risco: Construtora Alameda (obra pausada) e Rodrigo Alencar (2 chamados abertos).</span>${U.btn('Ver na Experiência',{sm:true,act:'exp',w:'176px'})}</div></section></div>`;
    M.wire(box,{medit:()=>{S.metaEdit=true;draw();const i=$('#sy-metai',box);i.focus();i.select()},mcancel:()=>{S.metaEdit=false;draw()},msave:()=>saveMeta(),exp:()=>go('experiencia','Experiência')});
    const mi=$('#sy-metai',box);if(mi)mi.onkeydown=e=>{if(e.key==='Enter')saveMeta();if(e.key==='Escape'){S.metaEdit=false;draw()}};
    U.bindSeg(box,'sy-evo',x=>{S.evo=x;draw()});U.bindSeg(box,'sy-evt',x=>{S.evoT=x;draw()});U.bindSeg(box,'sy-dec',x=>{S.dec=x;draw()});U.bindSeg(box,'sy-rank',x=>{S.rank=x;draw()});
  };
  const saveMeta=()=>{const x=num($('#sy-metai',box).value);if(x==null||x<=0){$('#sy-merr',box).textContent='Informe um valor maior que zero.';$('#sy-metai',box).focus();return}
    S.meta=x;S.metaEdit=false;draw();M.toast(`Meta de outubro: ${brl(x)}.`)};
  draw();
}
M.screen('numbers',{title:'Numbers',dock:'numbers',
  help:['Escolha 3, 6 ou 12 meses; cada número compara com o mesmo intervalo anterior.','“Editar meta” muda a meta do mês direto no cartão. Enter salva, Esc cancela.',
    'Em Evolução, troque a medida (Receita, Ticket, Conversão) e o tipo (Linha ou Colunas). Passe o mouse num ponto para ver o valor.','Ranking mostra o pipeline aberto por responsável ou os ganhos por origem da indicação.'],
  variants:{A:{label:'Painel',render:numRender,mount:numMount}}});

/* =====================================================================
   5 · CENTRAL DE AJUSTES — #/ajustes (+ páginas)
   ===================================================================== */
const IT={
 'my-account':['Minha conta','Senha, usuário e e-mail de contato.','contatos','/minha-conta',['Trocar a senha','Usuário de acesso','E-mail de contato para avisos']],
 'users':['Usuários','Equipe e dados de cada conta.','contatos','/users',['Lista da equipe com papel e situação','Convidar usuário','Editar dados e desativar acesso']],
 'permissions':['Permissões','Grupos de acesso e matriz de permissões.','chave','/permissions',['Grupos de acesso (Full, Comercial, Técnica…)','Matriz: ver, criar, editar e excluir por recurso']],
 'pipelines':['Pipeline','Etapas, cores e regras do processo comercial.','kanban','/pipelines',['Funis Comercial, Projetos e Técnica','Etapas com nome, cor e ordem','Travas (gates) que impedem avançar sem o necessário']],
 'outcome-reasons':['Motivos de ganho e perda','Vocabulário controlado usado no encerramento dos negócios.','estrela','/ajustes/deal-outcome-reasons',['Lista de motivos de ganho','Lista de motivos de perda','Ativar e desativar motivos']],
 'proposal':['Proposta','Mão de obra e montagem das próximas propostas.','propostas','/ajustes/proposta',[],'ajustes/proposta'],
 'identidade':['Identidade da empresa','Telefone, e-mail, endereço e site que aparecem na proposta.','casa','/ajustes/identidade',['Telefone, e-mail, endereço e site','Prévia de como saem no documento da proposta']],
 'closing':['Fechamento de negócio','Dados e etapas obrigatórias para concluir uma venda.','check','/ajustes/fechamento',[],'ajustes/fechamento'],
 'contracts':['Contrato','Modelo .docx da empresa e os marcadores que ele pode usar.','doc','/ajustes/contract-templates',['Envio do modelo .docx','Lista de marcadores que o modelo aceita','Geração de teste com um negócio real']],
 'fornecedores':['Regime do fornecedor','Se o regime fiscal do cadastro do fornecedor vale no preço dos produtos.','compras','/ajustes/fornecedores',['Chave: o regime do fornecedor entra ou não no custo','Explicação do efeito no preço de venda']],
 'financeiro':['Financeiro','Plano de contas e chave Pix que aparece no aviso de cobrança do cliente.','financeiro','/ajustes/financeiro',[],'ajustes/financeiro'],
 'workflows':['Fluxos','Tarefas, provas, travas e automações dos processos.','trocar','/workflows',['Tarefas por etapa, com prova exigida','Travas que seguram o avanço','Automações: quando algo acontece, faça outra coisa']],
 'task-types':['Tipos de tarefa','Regras e comportamento dos compromissos da agenda.','atividades','/admin/task-types',['Duração padrão e cor','Se ocupa a agenda e se exige local','Quem pode criar']],
 'calendar-resources':['Recursos da agenda','Showroom, salas, técnicos, veículos e equipamentos.','agenda','/admin/calendar-resources',['Cadastro de recursos reserváveis','Disponibilidade e conflitos na agenda']],
 'modules':['Módulos','Ative ou desative funcionalidades da conta.','grade','/ajustes/modulos',[],'ajustes/modulos'],
 'appearance':['Aparência','Tema visual e tonalidade do Maestro.','aparencia','',[],'@pop'],
 'audit':['Auditoria','Histórico de alterações e acessos.','olho','/auditoria',['Quem mudou o quê e quando','Filtro por pessoa, data e tipo de registro','Acessos ao sistema']],
 'trash':['Itens excluídos','Restauração de negócios, contatos, propostas e cards.','lixo','/admin/deleted-entities',['Negócios, contatos, propostas e cards excluídos','Restaurar com um clique','Visível só para dono e administradores']],
 'news':['Novidades','O que mudou na versão atual.','brilho','',['Abre a janela de novidades, com vídeos curtos narrados de cada mudança']],
 'tour':['Refazer tour','Rever a apresentação das áreas do Maestro.','seta','',['Mostra de novo o passeio guiado pelas áreas principais']]};
const AJ=[
 {id:'account',label:'Conta e acesso',desc:'Sua conta, equipe e permissões.',secs:[{items:['my-account','users','permissions']}]},
 {id:'commercial',label:'Comercial',desc:'Pipeline, propostas, fechamento e regras comerciais.',secs:[
   {title:'Processo comercial',desc:'Estrutura do funil e motivos usados nas decisões.',items:['pipelines','outcome-reasons']},
   {title:'Propostas, fechamento e contratos',desc:'Tudo que define como uma venda vira proposta e segue para formalização.',items:['proposal','identidade','closing','contracts']},
   {title:'Preço e financeiro',desc:'Como o custo do fornecedor entra no preço e como a cobrança chega ao cliente.',items:['fornecedores','financeiro']}]},
 {id:'operation',label:'Operação',desc:'Fluxos e agenda organizados por processo.',secs:[
   {title:'Processos',desc:'Fluxos operacionais e suas automações.',items:['workflows']},{title:'Agenda',desc:'Tipos de compromisso e recursos compartilhados numa única área.',items:['task-types','calendar-resources']}]},
 {id:'system',label:'Sistema',desc:'Módulos, aparência, segurança e governança.',secs:[{items:['modules','appearance','audit','trash']}]},
 {id:'help',label:'Ajuda',desc:'Novidades e apresentação guiada do Maestro.',secs:[{items:['news','tour']}]}];
const grpOf=id=>AJ.find(g=>g.secs.some(s=>s.items.includes(id)));
function ajRender(){return `${U.page({kick:'Sistema',title:'Central de Ajustes',sub:'Configurações da empresa organizadas por assunto. Você vê somente o que pode acessar.'})}
  <div class="sy-cq rv" style="--d:1"><div class="grid sy-ajg"><nav class="card s3 sy-nav" aria-label="Assuntos"><div class="stack" style="gap:4px" id="sy-anav"></div></nav><section class="card flush s9" id="sy-alist" aria-live="polite"></section></div></div>`}
function ajMount(v){
  const q=M.q&&M.q.get('g');if(q&&AJ.some(g=>g.id===q))S.ag=q;
  const draw=()=>{const g=AJ.find(x=>x.id===S.ag)||AJ[0],n=x=>sum(x.secs.map(s=>s.items.length));
    $('#sy-anav',v).innerHTML=AJ.map(x=>`<button type="button" class="btn ${x.id===g.id?'':'ghost'}" data-act="grp" data-g="${x.id}" aria-current="${x.id===g.id}" style="${x.id===g.id?'':'color:var(--text);font-weight:500'}"><span>${x.label}</span><span class="num faint" style="font-weight:500">${n(x)}</span></button>`).join('');
    $('#sy-alist',v).innerHTML=`<div class="ch"><div><h2>${g.label}</h2><div class="lbl" style="margin-top:4px">${g.desc}</div></div></div>`+g.secs.map(s=>`${s.title?`<div class="sy-sech"><b>${s.title}</b><span class="lbl">${s.desc}</span></div>`:''}
      ${s.items.map(id=>{const [l,d,icon]=IT[id];return `<button type="button" class="sy-item" data-act="item" data-id="${id}"><span class="thumb" aria-hidden="true">${ic(icon,20)}</span><span style="min-width:0"><b style="font-weight:600">${l}</b><span class="lbl sy-blk">${d}</span></span><span class="faint" aria-hidden="true">${ic('seta',20)}</span></button>`}).join('')}`).join('');
    M.wire(v,{grp:el=>{S.ag=el.dataset.g;draw();$(`[data-g="${S.ag}"]`,v).focus()},item:el=>openItem(el.dataset.id)});
  };draw();
}
function openItem(id){const [l,d,,to,about,page]=IT[id],g=grpOf(id);
  if(page==='@pop')return setTimeout(()=>$('#openPop').click(),0);
  if(page)return location.hash='#/'+page;
  const foot=id==='news'?[{label:'Ver novidades',act:'nov',pri:true}]:id==='tour'?[{label:'Começar o tour',act:'tour',pri:true}]:[];
  const s=M.sheet({kick:'Ajustes · '+g.label,title:l,sub:esc(d),foot,
    body:`${to?`<div class="sec"><h3>Onde fica no Maestro</h3><span class="code" style="margin:0;font-size:12px">${to}</span></div>`:''}<div class="sec"><h3>O que tem</h3><ul class="sy-ul">${about.map(a=>`<li>${esc(a)}</li>`).join('')}</ul></div>
      <div class="sec"><h3>Nesta prévia</h3><p class="soft" style="margin:0">${id==='news'||id==='tour'?'É uma ação, não uma página: abre por cima da tela em que você está.':'Esta página ainda não foi redesenhada. A versão em uso continua valendo; o desenho novo vem numa próxima entrega.'}</p></div>`,
    on:{nov:()=>{s.close();M.toast('Abre a janela de Novidades com os vídeos da versão (simulação).')},tour:()=>{s.close();M.toast('Tour reiniciado (simulação).')}}});
}
M.screen('ajustes',{title:'Central de Ajustes',dock:'ajustes',
  help:['Escolha um assunto à esquerda; os ajustes dele aparecem à direita.','Clique numa linha para abrir o ajuste. “Aparência” abre o painel do topo.','Você só vê o que o seu grupo de acesso permite.'],
  variants:{A:{label:'Central',render:ajRender,mount:ajMount}}});

const back=()=>{location.hash='#/ajustes'};
const subHead=(id,sub)=>{const g=grpOf(id);return U.page({kick:'Ajustes · '+g.label,title:IT[id][0],sub,acts:[{label:'Voltar aos Ajustes',icon:'voltar',act:'back'}]})};
const tgRow=(key,on,title,desc,first)=>`<div class="sy-tg${first?' first':''}"><div><b style="font-weight:600" id="sy-l-${key}">${title}</b>${desc?`<span class="lbl sy-blk" style="margin-top:4px">${desc}</span>`:''}</div>${sw(key,on,title)}</div>`;
const optCard=(grp,v,on,title,desc)=>`<button type="button" class="sy-opt" role="radio" aria-checked="${on}" data-${grp}="${v}"><span class="sy-radio" aria-hidden="true"></span><span style="min-width:0"><b style="font-weight:600">${title}</b><span class="lbl sy-blk" style="margin-top:4px">${desc}</span></span></button>`;

/* ---- Ajustes › Financeiro ---- */
if(!S.fin){
  S.fin={pixTipo:'CNPJ',pix:'41.552.009/0001-63',pnome:'Teste Maestro Ltda',pcid:'Belo Horizonte',avisos:true,antes:true,dias:3,nodia:true,atraso:true,aprov:true,aprovMin:5000,
    com:true,comPct:5,comQuando:'Uma vez, quando o negócio fecha',comSobre:'RECEBIDO',comConta:'Comissão de parceiros',comDividir:false};
  S.plano=[{id:'g1',nome:'Receitas',nat:'Receita',contas:[{cod:'1.1',nome:'Venda de equipamentos',sys:1,lanc:1,on:1},{cod:'1.2',nome:'Serviços de instalação',sys:1,lanc:1,on:1},{cod:'1.3',nome:'Contratos de manutenção',on:1}]},
    {id:'g2',nome:'Custos diretos',nat:'Despesa',contas:[{cod:'2.1',nome:'Compra de equipamentos',sys:1,lanc:1,on:1},{cod:'2.2',nome:'Mão de obra terceirizada',lanc:1,on:1}]},
    {id:'g3',nome:'Despesas operacionais',nat:'Despesa',contas:[{cod:'3.1',nome:'Aluguel do escritório',lanc:1,on:1},{cod:'3.2',nome:'Energia elétrica',lanc:1,on:1},{cod:'3.3',nome:'Contador',lanc:1,on:1},{cod:'3.4',nome:'Comissão de parceiros',sys:1,on:1},{cod:'3.5',nome:'Combustível',on:0}]},
    {id:'g4',nome:'Resultado financeiro',nat:'Financeira',contas:[{cod:'4.1',nome:'Tarifas bancárias',lanc:1,on:1},{cod:'4.2',nome:'Juros recebidos',on:1}]},
    {id:'g5',nome:'Investimentos',nat:'Despesa',contas:[]}];
  S.bancos=[{id:'b1',nome:'Itaú conta corrente',nat:'BANK',saldo:312400,cons:true,on:true,mov:true},{id:'b2',nome:'Inter conta PJ',nat:'BANK',saldo:98210.4,cons:true,on:true,mov:true},
    {id:'b3',nome:'Caixa Econômica conta corrente',nat:'BANK',saldo:62180.33,cons:true,on:true,mov:true},{id:'b4',nome:'Cofre do escritório',nat:'CASH',saldo:12463.25,cons:true,on:true,mov:true},
    {id:'b5',nome:'A identificar',nat:'UNIDENTIFIED',saldo:0,cons:false,on:true,mov:false},{id:'b6',nome:'Cartão Itaú Empresas',nat:'CREDIT_CARD',saldo:0,cons:false,on:true,mov:false,fech:5,venc:12}];
}
const NAT={BANK:['Conta em banco','Conta corrente ou poupança da empresa. Entra no saldo consolidado.'],CASH:['Caixa em espécie','Dinheiro em mãos, fora do banco. Entra no saldo consolidado.'],
  UNIDENTIFIED:['A identificar','Destino do valor que aparece no extrato sem dono. Fica fora do saldo consolidado.'],CREDIT_CARD:['Cartão de crédito','As compras entram na fatura pelo dia de fechamento. Nasce fora do saldo consolidado.']};
const SOBRE=[['TOTAL_DO_NEGOCIO','Valor total do negócio','Paga mais e mais cedo. Se a obra cair, a comissão já saiu.'],['RECEBIDO','Só o que entrou','Nunca paga comissão de dinheiro que não entrou.'],['MARGEM','Recebido menos o custo da obra','Alinha o parceiro à rentabilidade. Exige custo lançado na obra.']];
function finRender(){const f=S.fin,despesas=S.plano.filter(g=>g.nat==='Despesa').flatMap(g=>g.contas.filter(c=>c.on).map(c=>c.nome));
  return `${subHead('financeiro','Chave Pix, avisos de cobrança, comissão de parceiro, plano de contas e contas bancárias.')}
  <div class="sy-cq rv" style="--d:1"><div class="grid sy-split" id="sy-finf">
   <section class="card s6 sy-cq"><div class="ch"><h2>Pix no aviso de cobrança</h2></div><div class="fgrid mt16">${[
     {k:'pixTipo',label:'Tipo de chave',type:'select',span:4,opts:['CNPJ','CPF','E-mail','Telefone','Chave aleatória'],value:f.pixTipo},
     {k:'pix',label:'Chave Pix',span:8,value:f.pix,help:'Deixe em branco para o aviso sair sem Pix.'},
     {k:'pnome',label:'Nome do recebedor',span:6,value:f.pnome,ph:'Nome da empresa'},{k:'pcid',label:'Cidade',span:6,value:f.pcid,ph:'Belo Horizonte'}].map(U.field).join('')}</div>
     <p class="lbl mt16" style="margin-bottom:0">A chave Pix é estática: ela não identifica quem pagou. A baixa da parcela continua sendo registrada à mão por quem confere o extrato.</p></section>
   <section class="card s6 sy-cq"><div class="ch"><h2>Avisos e aprovação</h2></div><div class="mt16">
     ${tgRow('avisos',f.avisos,'Avisos automáticos por e-mail','O cliente recebe o aviso de cobrança por e-mail, com o link e o Pix.',true)}
     <div id="sy-avs" class="sy-ind">
       <div class="sy-tg"><div class="row" style="gap:8px;flex-wrap:wrap"><b style="font-weight:500">Antes do vencimento</b><input class="input sm num" name="dias" type="number" min="1" max="30" value="${f.dias}" aria-label="Dias antes do vencimento" style="width:72px;text-align:right"><span class="lbl">dias antes</span></div>${sw('antes',f.antes,'Aviso antes do vencimento')}</div>
       ${tgRow('nodia',f.nodia,'No dia do vencimento','')}${tgRow('atraso',f.atraso,'Lembretes de atraso','')}</div>
     ${tgRow('aprov',f.aprov,'Exigir aprovação para pagar','Pagamento acima do valor espera a aprovação de quem pode aprovar.')}
     <div id="sy-apv" class="sy-ind"><div class="sy-tg" style="border-top:0;padding-top:0"><div class="row" style="gap:8px"><b style="font-weight:500">A partir de</b><input class="input sm num" name="aprovMin" inputmode="decimal" value="${fmtN(f.aprovMin)}" aria-label="Valor mínimo para exigir aprovação" style="width:144px;text-align:right"></div><span></span></div></div></div></section>
   <section class="card s12 sy-cq"><div class="ch"><h2>Comissão de parceiro</h2></div><div class="mt16">
     ${tgRow('com',f.com,'Comissão de parceiro','Arquiteto, engenheiro ou designer que indicou o negócio recebe um percentual.',true)}
     <div id="sy-coms"><div class="fgrid mt16">${[
       {k:'comPct',label:'Percentual padrão (%)',type:'number',span:3,value:f.comPct,help:f.comPct?'':'Ligada com 0% não gera nada.'},
       {k:'comQuando',label:'Quando pagar',type:'select',span:3,opts:['Uma vez, quando o negócio fecha','A cada parcela recebida'],value:f.comQuando},
       {k:'comConta',label:'Conta da despesa',type:'select',span:6,opts:despesas,value:f.comConta}].map(U.field).join('')}</div>
       <div class="lbl mt24" style="margin-bottom:12px">Sobre o quê</div>
       <div class="grid g3" role="radiogroup" aria-label="Sobre o quê" style="gap:12px">${SOBRE.map(([k,t,d])=>optCard('sobre',k,f.comSobre===k,t,d)).join('')}</div>
       <div class="mt16">${tgRow('comDividir',f.comDividir,'Dividir entre os parceiros','Com dois ou mais parceiros no negócio, o percentual é repartido entre eles.')}</div></div></div></section>
   <div class="s12" id="sy-plano"></div><div class="s12" id="sy-bancos"></div>
  </div></div>
  <div class="sy-save ctl" id="sy-save" hidden role="region" aria-label="Alterações não salvas"><b style="flex:1">Alterações não salvas.</b><div class="btnrow" style="width:312px">${U.btn('Descartar',{act:'discard'})}${U.btn('Salvar',{act:'save',pri:true})}</div></div>`}
function finMount(v){let dr=clone(S.fin);const form=$('#sy-finf',v);
  const dis=()=>{[['sy-avs',dr.avisos],['sy-apv',dr.aprov],['sy-coms',dr.com]].forEach(([id,on])=>{const e=$('#'+id,v);e.classList.toggle('sy-off',!on);e.inert=!on})};
  const dirty=()=>{$('#sy-save',v).hidden=JSON.stringify(dr)===JSON.stringify(S.fin)};
  const rd=()=>{const g=k=>{const e=$(`[name="${k}"]`,form);return e?e.value.trim():''};
    Object.assign(dr,{pixTipo:g('pixTipo'),pix:g('pix'),pnome:g('pnome'),pcid:g('pcid'),dias:parseInt(g('dias'))||0,aprovMin:num(g('aprovMin'))??0,comPct:num(g('comPct'))??0,comQuando:g('comQuando'),comConta:g('comConta')})};
  ['input','change'].forEach(t=>form.addEventListener(t,e=>{if(e.target.closest('#sy-plano,#sy-bancos'))return;rd();dirty()}));
  $$('[data-sw]',form).forEach(b=>b.onclick=()=>{const k=b.dataset.sw;dr[k]=!dr[k];b.setAttribute('aria-checked',dr[k]);dis();dirty()});
  $$('[data-sobre]',form).forEach(b=>b.onclick=()=>{dr.comSobre=b.dataset.sobre;$$('[data-sobre]',form).forEach(x=>x.setAttribute('aria-checked',x===b));dirty()});
  M.wire(v,{back,discard:()=>{rr();M.toast('Alterações descartadas.')},save:()=>{rd();clearErr(form);let bad=false;
    if(dr.pix){if(!dr.pnome){markErr(form,'pnome','Obrigatório quando há chave.');bad=true}if(!dr.pcid){markErr(form,'pcid','Obrigatória quando há chave.');bad=true}}
    if(dr.avisos&&dr.antes&&(dr.dias<1||dr.dias>30)){bad=true;M.toast('Dias antes do vencimento: use de 1 a 30.')}
    if(dr.com&&(dr.comPct<0||dr.comPct>100)){markErr(form,'comPct','Use de 0 a 100.');bad=true}
    if(bad){const e=$('.field.err input,.field.err select',form);e&&e.focus();if(!e)return;return M.toast('Confira os campos marcados.')}
    S.fin=clone(dr);dirty();M.toast('Configuração do financeiro salva.')}});
  dis();drawPlano(v);drawBancos(v);
}
function drawPlano(v){const box=$('#sy-plano',v);if(!box)return;
  box.innerHTML=`<section class="card flush sy-cq"><div class="ch"><div style="min-width:0;flex:1 1 240px"><h2>Plano de contas</h2><div class="lbl" style="margin-top:4px">Os lançamentos usam estas contas. O grupo define a linha do Resultado.</div></div><span class="spacer"></span>
    <div class="btnrow sy-ch-acts">${U.btn('Novo grupo',{sm:true,icon:'mais',act:'ngrupo'})}${U.btn('Nova conta',{sm:true,icon:'mais',act:'nconta'})}</div></div>
    ${S.plano.map(g=>`<div class="ghead" style="border-top:1px solid var(--line-2)"><span class="sy-ell" style="flex:1">${esc(g.nome)}</span>${U.chip(g.nat,'n')}<span class="lbl">${g.contas.length}</span>${U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Ações do grupo '+g.nome,act:'gmenu',attrs:`data-g="${g.id}" aria-haspopup="menu"`})}</div>
      ${g.contas.length?g.contas.map((c,i)=>`<div class="sy-arow"><span class="num faint">${esc(c.cod)}</span><span class="row sy-nw" style="gap:8px;min-width:0"><span class="sy-ell" title="${esc(c.nome)}">${esc(c.nome)}</span>${c.sys?U.chip('Usada pelo sistema','b'):''}</span>${U.chip(c.on?'Ativa':'Desativada',c.on?'g':'n')}
        ${U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Ações da conta '+c.nome,act:'cmenu',attrs:`data-g="${g.id}" data-i="${i}" aria-haspopup="menu"`})}</div>`).join('')
      :'<div class="sy-arow"><span></span><span class="lbl">Nenhuma conta neste grupo ainda.</span></div>'}`).join('')}</section>`;
  const G=id=>S.plano.find(g=>g.id===id),redo=()=>drawPlano(v);
  const nameModal=(title,cur,ph,cb)=>M.modal({title,width:'480px',ok:'Salvar',fields:[{k:'nome',label:'Nome',req:true,span:12,value:cur||'',ph}],onOk:x=>cb(x.nome)});
  M.wire(box,{
    ngrupo:()=>M.modal({title:'Novo grupo',width:'560px',ok:'Criar',fields:[{k:'nome',label:'Nome',req:true,span:8,ph:'Ex.: Investimentos'},{k:'nat',label:'Natureza',type:'select',req:true,span:4,ph:'Escolha…',opts:['Receita','Despesa','Financeira'],help:'As contas do grupo herdam a natureza.'}],
      onOk:x=>{S.plano.push({id:'g'+Date.now(),nome:x.nome,nat:x.nat,contas:[]});redo();M.toast('Grupo criado.')}}),
    nconta:()=>M.modal({title:'Nova conta',width:'640px',ok:'Criar',fields:[{k:'g',label:'Grupo',type:'select',req:true,span:12,ph:'Escolha…',opts:S.plano.map(g=>[g.id,g.nome+' · '+g.nat]),help:'O grupo define em que linha do Resultado os lançamentos aparecem.'},
      {k:'cod',label:'Código',span:4,ph:'8',help:'Só número, como 8.'},{k:'nome',label:'Nome',req:true,span:8,ph:'Ex.: Energia elétrica'}],
      onOk:(x,el)=>{clearErr(el);if(x.cod&&!/^\d+$/.test(x.cod)){markErr(el,'cod','Só número, como 8.');return false}const g=G(x.g),pre=g.contas[0]?g.contas[0].cod.split('.')[0]:String(S.plano.indexOf(g)+1);
        g.contas.push({cod:pre+'.'+(x.cod||g.contas.length+1),nome:x.nome,on:1});redo();M.toast('Conta criada.')}}),
    gmenu:el=>{const g=G(el.dataset.g);M.menu(el,[{label:'Renomear',icon:'doc',run:()=>nameModal('Renomear grupo',g.nome,'Ex.: Investimentos',n=>{g.nome=n;redo();M.toast('Nome alterado.')})},'-',
      {label:'Apagar',icon:'lixo',danger:true,run:()=>g.contas.length?M.toast('Não se apaga: tem contas dentro. Desative as contas do grupo antes.'):M.confirm({title:'Apagar do plano de contas?',text:`Grupo “${g.nome}”.`,ok:'Apagar',danger:true,run:()=>{S.plano.splice(S.plano.indexOf(g),1);redo();M.toast('Apagada.')}})}])},
    cmenu:el=>{const g=G(el.dataset.g),i=+el.dataset.i,c=g.contas[i];M.menu(el,[{label:'Renomear',icon:'doc',run:()=>nameModal('Renomear conta',c.nome,'Ex.: Energia elétrica',n=>{c.nome=n;redo();M.toast('Nome alterado.')})},
      {label:c.on?'Desativar':'Reativar',icon:c.on?'x':'check',run:()=>{if(c.sys&&c.on)return M.toast('Usada pelo sistema: não pode ser desativada.');c.on=c.on?0:1;redo();M.toast(c.on?'Reativada.':'Desativada: sai das listas, o histórico fica.')}},'-',
      {label:'Apagar',icon:'lixo',danger:true,run:()=>(c.sys||c.lanc)?M.toast('Não se apaga: tem lançamento, é usada pelo sistema ou tem contas dentro.'):M.confirm({title:'Apagar do plano de contas?',text:`${c.cod} · ${c.nome}.`,ok:'Apagar',danger:true,run:()=>{g.contas.splice(i,1);redo();M.toast('Apagada.')}})}])}});
}
function drawBancos(v){const box=$('#sy-bancos',v);if(!box)return;const tot=sum(S.bancos.filter(b=>b.cons&&b.on).map(b=>b.saldo));
  box.innerHTML=U.table({title:'Contas bancárias',head:`<span class="lbl num">Consolidado inicial ${brl(tot)}</span>${U.btn('Nova conta',{sm:true,icon:'mais',act:'nbanco',w:'152px'})}`,rows:S.bancos,cols:[
    {h:'Conta',html:b=>`<b style="font-weight:600">${esc(b.nome)}</b><div class="lbl sy-sm">${NAT[b.nat][0]}${b.nat==='CREDIT_CARD'?` · fecha dia ${b.fech}, vence dia ${b.venc}`:''}</div>`},
    {h:'Saldo inicial',w:'160px',r:true,html:b=>brl(b.saldo)},
    {h:'Saldo consolidado',w:'176px',html:b=>b.cons?U.chip('Entra','g'):`<span title="Não soma no total que o painel mostra.">${U.chip('Fora','n')}</span>`},
    {h:'Situação',w:'128px',html:b=>U.chip(b.on?'Ativa':'Desativada',b.on?'g':'n')},
    {h:'',w:'68px',r:true,html:(b,i)=>U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Ações de '+b.nome,act:'bmenu',attrs:`data-i="${i}" aria-haspopup="menu"`})}]});
  M.wire(box,{nbanco:()=>bancoModal(null,v),bmenu:el=>{const b=S.bancos[+el.dataset.i];M.menu(el,[{label:'Editar conta',icon:'doc',run:()=>bancoModal(b,v)},
    {label:b.on?'Desativar':'Reativar',icon:b.on?'x':'check',run:()=>{if(b.nat==='UNIDENTIFIED'&&b.on)return M.toast('A conta “a identificar” é usada pela conciliação e não se desativa.');b.on=!b.on;drawBancos(v);M.toast(b.on?'Reativada.':'Desativada: sai das listas, o histórico fica.')}},'-',
    {label:'Apagar',icon:'lixo',danger:true,run:()=>b.mov||b.nat==='UNIDENTIFIED'?M.toast('Não se apaga: tem movimento, transferência, extrato ou lançamento previsto.'):M.confirm({title:'Apagar conta bancária?',text:b.nome,ok:'Apagar',danger:true,run:()=>{S.bancos.splice(S.bancos.indexOf(b),1);drawBancos(v);M.toast('Apagada.')}})}])}});
}
function bancoModal(b,v){const isNew=!b;
  const {el}=M.modal({title:isNew?'Nova conta':'Editar conta',sub:'A conta por onde o dinheiro entra e sai. Sem ela não há como registrar pagamento nem recebimento.',width:'640px',ok:isNew?'Criar':'Salvar',fields:[
    {k:'nome',label:'Nome',req:true,span:12,value:b?b.nome:'',ph:'Ex.: Itaú conta corrente'},
    ...(isNew?[{k:'nat',label:'Natureza',type:'select',req:true,span:12,ph:'Escolha…',opts:Object.entries(NAT).filter(([k])=>k!=='UNIDENTIFIED').map(([k,x])=>[k,x[0]]),help:'Escolhida uma vez: depois não muda.'}]:[]),
    {k:'saldo',label:'Saldo inicial',type:'money',span:6,value:b?fmtN(b.saldo):'',ph:'0,00'},{k:'data',label:'Data do saldo',type:'date',span:6,value:'2026-01-01'},
    {k:'fech',label:'Dia de fechamento',type:'number',span:6,value:b&&b.fech||'',ph:'Ex.: 5'},{k:'venc',label:'Dia de vencimento',type:'number',span:6,value:b&&b.venc||'',ph:'Ex.: 12'},
    {k:'cons',label:'Entra no saldo consolidado',type:'toggle',span:12,value:b?b.cons:true,help:'Desmarque para a conta ficar fora do total que o painel mostra.'}],
    onOk:(x,el)=>{clearErr(el);const nat=isNew?x.nat:b.nat,s=num(x.saldo)??0;
      if(x.saldo&&num(x.saldo)==null){markErr(el,'saldo','Saldo inicial inválido.');return false}
      if(x.saldo&&!x.data){markErr(el,'data','Informe a data do saldo inicial.');return false}
      if(nat==='CREDIT_CARD'){const f=+x.fech,vv=+x.venc;if(!(f>=1&&f<=31)||!(vv>=1&&vv<=31)){markErr(el,'fech','Informe o dia de fechamento e o de vencimento da fatura (1 a 31).');return false}}
      const o={nome:x.nome,saldo:s,cons:nat==='UNIDENTIFIED'?false:x.cons,fech:+x.fech||undefined,venc:+x.venc||undefined};
      if(isNew)S.bancos.push({id:'b'+Date.now(),nat,on:true,mov:false,...o});else Object.assign(b,o);drawBancos(v);M.toast(isNew?'Conta criada.':'Conta salva.')}});
  const sync=()=>{const nat=isNew?$('[name="nat"]',el).value:b.nat,card=nat==='CREDIT_CARD';['fech','venc'].forEach(k=>$(`[name="${k}"]`,el).closest('.field').hidden=!card);
    if(isNew&&nat){const t=$('[data-toggle="cons"]',el);t.setAttribute('aria-checked',nat!=='CREDIT_CARD')}};
  if(isNew)$('[name="nat"]',el).onchange=sync;sync();
}
M.screen('ajustes/financeiro',{title:'Ajustes · Financeiro',dock:'ajustes',hidden:true,
  help:['Preencha o Pix se quiser que o aviso de cobrança traga o copia-e-cola.','Ligue os avisos por e-mail informando quantos dias antes.',
    'Ligue a alçada se pagamento acima de um valor precisar de aprovação. Ao mudar algo, a barra “Alterações não salvas” aparece embaixo.',
    'Plano de contas e contas bancárias salvam na hora: sem uma conta bancária não há como registrar pagamento nem recebimento.'],
  variants:{A:{label:'Página',render:finRender,mount:finMount}}});

/* ---- Ajustes › Proposta ---- */
if(!S.prop)S.prop={escopo:'amb',tit:'Serviço especializado',txt:'Instalação, configuração e programação dos equipamentos, com testes e treinamento de uso.',dias:15};
const ESC=[['amb','Uma por ambiente','Cada ambiente ganha a sua linha de mão de obra, calculada sobre os equipamentos daquele ambiente. Adicionar um ambiente novo cria a mão de obra dele.'],
  ['opt','Uma por opção, no fim','Uma única linha fecha cada opção, calculada sobre os equipamentos da opção inteira. Ambiente novo não cria mão de obra nova.']];
function propRender(){const p=S.prop;return `${subHead('proposal','Configure como a proposta é montada nesta empresa. Vale das próximas inserções em diante — proposta já gravada não muda de valor.')}
  <div class="sy-cq rv" style="--d:1"><div class="grid sy-split"><div class="s8 stack">
   <section class="card"><div class="ch"><h2>Mão de obra</h2></div><p class="lbl" style="margin:4px 0 16px">Onde a linha de serviço entra quando você adiciona equipamentos.</p>
     <div class="stack" style="gap:12px" role="radiogroup" aria-label="Escopo da mão de obra">${ESC.map(([k,t,d])=>optCard('esc',k,p.escopo===k,t,d)).join('')}</div></section>
   <section class="card" id="sy-psrv"><div class="ch"><h2>Serviço padrão</h2></div><p class="lbl" style="margin:4px 0 16px">Define o título e o texto completo dos novos itens Serviço. Depois de criado, cada item pode ser ajustado individualmente, sem mudar este padrão.</p>
     <div class="fgrid">${[{k:'tit',label:'Título padrão do serviço',span:12,value:p.tit,ph:'Serviço especializado'},{k:'txt',label:'Texto completo padrão do serviço',type:'textarea',span:12,value:p.txt,ph:'Texto completo usado nos novos itens Serviço.'}].map(U.field).join('')}</div>
     <div class="row mt16"><span class="spacer"></span>${U.btn('Salvar padrão global',{sm:true,act:'savesrv',w:'176px'})}</div></section>
   <section class="card" id="sy-pval"><div class="ch"><h2>Validade da proposta</h2></div><p class="lbl" style="margin:4px 0 16px">Por quantos dias a proposta vale, contados do envio. É o prazo impresso no documento e o que a área do cliente usa para mostrar que a proposta venceu. Vale para as próximas gerações — documento já enviado não muda.</p>
     <div class="fgrid">${U.field({k:'dias',label:'Dias',type:'number',span:4,value:p.dias})}</div>
     <div class="row mt16"><span class="spacer"></span>${U.btn('Salvar validade',{sm:true,act:'saveval',w:'176px'})}</div></section></div>
   <aside class="card s4" style="align-self:start;position:sticky;top:88px" id="sy-pprev"></aside></div></div>`}
function propMount(v){const p=S.prop;
  const prev=()=>{const amb=['Sala de estar','Cozinha','Suíte master'];$('#sy-pprev',v).innerHTML=`<div class="ch"><h2>Como fica na proposta</h2></div><div class="mt16">${p.escopo==='amb'
      ?amb.map(a=>`<div class="kv"><span>${a}</span><b class="lbl">equipamentos</b></div><div class="kv sy-ind"><span>${esc(p.tit)} · ${a}</span><b class="lbl">mão de obra</b></div>`).join('')
      :amb.map(a=>`<div class="kv"><span>${a}</span><b class="lbl">equipamentos</b></div>`).join('')+`<div class="kv"><span><b>${esc(p.tit)} · opção inteira</b></span><b class="lbl">mão de obra</b></div>`}</div>
    <p class="lbl mt16" style="margin-bottom:0">Validade impressa: ${p.dias} dias a partir do envio.</p>`};
  $$('[data-esc]',v).forEach(b=>b.onclick=()=>{if(p.escopo===b.dataset.esc)return;p.escopo=b.dataset.esc;$$('[data-esc]',v).forEach(x=>x.setAttribute('aria-checked',x===b));prev();M.toast('Parametrização da proposta atualizada.')});
  M.wire(v,{back,savesrv:()=>{const s=$('#sy-psrv',v);clearErr(s);const t=$('[name="tit"]',s).value.trim();if(!t){markErr(s,'tit','Obrigatório.');return}p.tit=t;p.txt=$('[name="txt"]',s).value.trim();prev();M.toast('Padrão do serviço salvo.')},
    saveval:()=>{const s=$('#sy-pval',v);clearErr(s);const d=$('[name="dias"]',s).value.trim(),n=Number(d);if(!Number.isInteger(n)||n<1||n>365){markErr(s,'dias','Use um número inteiro de 1 a 365.');return}p.dias=n;prev();M.toast('Validade salva.')}});
  prev();
}
M.screen('ajustes/proposta',{title:'Ajustes · Proposta',dock:'ajustes',hidden:true,
  help:['Escolha onde entra a mão de obra: uma linha por ambiente ou uma por opção, no fim. Salva na hora.','O serviço padrão define título e texto dos novos itens Serviço.','A validade conta do envio e sai impressa no documento. O quadro à direita mostra o efeito.'],
  variants:{A:{label:'Página',render:propRender,mount:propMount}}});

/* ---- Ajustes › Fechamento ---- */
const FECH=[['exigirParceirosFechamento','Exigir Arquiteto e Engenheiro','Ligada: o fechamento exige informar Arquiteto e Engenheiro (contato ou “Não tem”). Desligada: os dois viram opcionais.',true],
 ['exigirDescricaoMinima','Exigir descrição mínima','Ligada: a descrição geral do projeto precisa de pelo menos 50 caracteres. Desligada: o campo continua existindo, sem mínimo.',true],
 ['exigirPagamentoMinimo','Exigir forma de pagamento detalhada','Ligada: a forma de pagamento precisa de pelo menos 30 caracteres. Desligada: o campo continua existindo, sem mínimo.',true],
 ['exigirEnderecoObra','Exigir endereço da obra','Ligada: ao desmarcar “mesmo do contato”, rua, cidade e UF são obrigatórios. Desligada: o endereço inteiro vira opcional.',true],
 ['exigirCpfEmailFechamento','Exigir CPF e e-mail no fechamento','Ligada: CPF e e-mail do cliente e do cônjuge, quando houver, travam o fechamento. Desligada: o sistema avisa, mas permite fechar. Telefone continua obrigatório.',true],
 ['exigirCadastroCompletoCliente','Exigir cadastro completo do cliente','Ligada: data de nascimento, RG, órgão emissor e estado civil (cliente e cônjuge) travam o fechamento. Desligada: o sistema avisa, mas não impede.',false],
 ['exigirCondicaoPagamento','Exigir condição de pagamento em parcelas','Ligada: o fechamento ganha um passo para montar as parcelas, e cada parcela vira um título a receber no Financeiro. Exige o módulo Financeiro ativo.',false],
 ['exigirFaturamento','Exigir “Faturar para” no fechamento','Ligada: o fechamento só conclui depois de escolher em nome de quem o negócio será faturado. Desligada: em branco, fatura no nome do cliente.',false],
 ['exibirFormularioEscopoFechamento','Mostrar o passo “Escopo e pré-projeto”','Ligada: a IA propõe o escopo e as tarefas da obra, e quem fecha aprova ou ajusta. Desligada: o fechamento pede só o valor.',true]];
const PASS=[['nao','Não pedir','O fechamento termina no ganho, sem falar da passagem de bastão.'],['pede','Pedir (padrão)','Depois do ganho, o sistema oferece registrar a passagem agora ou deixar uma tarefa para depois no card da obra.'],
  ['obriga','Exigir','Depois do ganho, só aparece “Registrar agora”. O ganho já está gravado; se a janela for fechada, a tarefa fica no card da obra.']];
if(!S.fech){S.fech={pass:'pede'};FECH.forEach(([k,,,on])=>S.fech[k]=on)}
function fechRender(){return `${subHead('closing','Configure o que é exigido pra fechar um negócio nesta empresa. O valor fechado é sempre obrigatório e não tem chave.')}
  <div class="sy-cq rv" style="--d:1"><div class="grid sy-split"><section class="card s8 sy-cq"><div class="ch"><h2>Exigências do fechamento</h2><span class="spacer"></span><span class="lbl" id="sy-fcnt"></span></div>
    <div class="mt16">${FECH.map(([k,t,d],i)=>tgRow(k,S.fech[k],t,d,i===0)).join('')}</div></section>
   <section class="card s4" style="align-self:start"><div class="ch"><h2>Passagem de bastão</h2></div><p class="lbl" style="margin:4px 0 16px">Depois que o negócio é ganho.</p>
    <div class="stack" style="gap:12px" role="radiogroup" aria-label="Passagem de bastão">${PASS.map(([k,t,d])=>optCard('pass',k,S.fech.pass===k,t,d)).join('')}</div></section></div></div>`}
function fechMount(v){const cnt=()=>$('#sy-fcnt',v).textContent=`${FECH.filter(([k])=>S.fech[k]).length} de ${FECH.length} ligadas`;
  $$('[data-sw]',v).forEach(b=>b.onclick=()=>{const k=b.dataset.sw;S.fech[k]=!S.fech[k];b.setAttribute('aria-checked',S.fech[k]);cnt();
    if(k==='exigirCondicaoPagamento'&&S.fech[k]&&S.mod&&!S.mod.find(m=>m.k==='financeiro').on)M.toast('Ligada, mas o módulo Financeiro está desativado: o passo só aparece com ele ativo.');
    else M.toast(`${FECH.find(f=>f[0]===k)[1]}: ${S.fech[k]?'ligada':'desligada'}.`)});
  $$('[data-pass]',v).forEach(b=>b.onclick=()=>{S.fech.pass=b.dataset.pass;$$('[data-pass]',v).forEach(x=>x.setAttribute('aria-checked',x===b));M.toast('Passagem de bastão atualizada.')});
  M.wire(v,{back});cnt();
}
M.screen('ajustes/fechamento',{title:'Ajustes · Fechamento',dock:'ajustes',hidden:true,
  help:['Cada chave liga ou desliga uma exigência do fechamento. Salva na hora.','O valor fechado é sempre obrigatório e não tem chave.','Passagem de bastão: escolha se o sistema não pede, pede ou exige o registro depois do ganho.'],
  variants:{A:{label:'Página',render:fechRender,mount:fechMount}}});

/* ---- Ajustes › Módulos ---- */
if(!S.mod)S.mod=[{k:'painel_360',n:'Painel 360',d:'Cada obra com campo, comercial, compras e financeiro numa tela só.',i:'painel',on:true},
  {k:'compras',n:'Compras',d:'O que falta comprar de cada obra, pedidos e fornecedores.',i:'compras',on:true},
  {k:'estoque',n:'Estoque',d:'Saldo por depósito, movimentos e reservas por obra.',i:'estoque',on:true},
  {k:'financeiro',n:'Financeiro',d:'A receber, a pagar, previsão de caixa e resultado.',i:'financeiro',on:true},
  {k:'contratos',n:'Contratos',d:'Modelo .docx da empresa e geração do contrato no fechamento.',i:'doc',on:false},
  {k:'suporte',n:'Suporte',d:'Botão “?” com ajuda e chamado em cada tela.',i:'chat',on:false,cfg:false}];
function modRender(){return `${subHead('modules','Ative ou desative funcionalidades desta conta. Desligar não apaga dados — religar restaura tudo.')}<div class="sy-cq rv" style="--d:1"><section class="card flush" id="sy-mods"></section></div>`}
function modMount(v){const box=$('#sy-mods',v);M.wire(v,{back});
  const draw=()=>{box.innerHTML=`<div class="ch"><h2>Módulos da conta</h2><span class="spacer"></span><span class="lbl">${S.mod.filter(m=>m.on).length} de ${S.mod.length} ativos</span></div>`+S.mod.map((m,i)=>`<div class="sy-mrow">
      <span class="thumb" aria-hidden="true">${ic(m.i,20)}</span><div style="min-width:0"><b style="font-weight:600">${m.n}</b><span class="lbl sy-blk">${m.d}</span>${m.cfg===false?'<span class="lbl sy-blk sy-sm warn" style="margin-top:4px">Falta configurar a conexão do Suporte nesta instalação. Fale com quem administra o Maestro.</span>':''}</div>
      <span>${m.cfg===false?U.chip('Não configurado','w'):U.chip(m.on?'Ativo':'Desativado',m.on?'g':'n')}</span>
      ${U.btn(m.on?'Desativar':'Ativar',{sm:true,act:'tg',w:'112px',attrs:`data-i="${i}" ${m.cfg===false?'disabled':''} aria-label="${m.on?'Desativar':'Ativar'} ${m.n}"`})}</div>`).join('');
    M.wire(box,{tg:el=>{const m=S.mod[+el.dataset.i];if(m.on)M.confirm({title:`Desativar ${m.n}?`,text:'Some do menu e das telas. Os dados ficam guardados — religar restaura tudo.',ok:'Desativar',danger:true,run:()=>{m.on=false;draw();M.toast(`Módulo “${m.n}” desativado.`)}});
      else{m.on=true;draw();M.toast(`Módulo “${m.n}” ativado.`)}}});
  };draw();
}
M.screen('ajustes/modulos',{title:'Ajustes · Módulos',dock:'ajustes',hidden:true,
  help:['Desativar esconde o módulo do menu e das telas; os dados ficam guardados.','Religar restaura tudo como estava.','O Suporte só liga depois de configurado na instalação; a linha diz o que falta.'],
  variants:{A:{label:'Página',render:modRender,mount:modMount}}});
})();

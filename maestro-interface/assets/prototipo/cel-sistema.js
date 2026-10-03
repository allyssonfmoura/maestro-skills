/* Maestro OS · celular · Sistema — IA Fiscal, Catálogo, Relatórios, Numbers e Ajustes (+ Financeiro, Proposta, Fechamento, Módulos).
   Mesmo estado do computador: window.__sy (mod-sistema.js) e window.__nb (mod-numbers.js). Mesmas regras, contas e ações. */
(function(){
const {ic,brl,esc,$,$$}=M, K=M.m, D=M.D;

if(!document.getElementById('cs-css'))document.head.insertAdjacentHTML('beforeend',`<style id="cs-css">
.cs-tags{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 16px}
.cs-note{margin:0 0 12px;font-size:15px;color:var(--soft);line-height:1.45}.cs-note b{color:var(--text)}
.cs-wrap .t1,.cs-wrap .t2{white-space:normal}
.cs-big{display:block;font-size:30px;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.cs-hit{display:flex;flex-direction:column;align-items:flex-start;gap:2px;min-height:44px;width:100%;border:0;padding:0;background:transparent;color:inherit;text-align:left}
.cs-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:0 0 24px}
.cs-card{display:flex;flex-direction:column;gap:6px;padding:10px 10px 14px;border-radius:16px;background:var(--panel);box-shadow:0 0 0 .5px var(--line-2);color:inherit;text-decoration:none;min-width:0}
.cs-card:active{opacity:.7}
.cs-ph{aspect-ratio:4/3;border-radius:12px;display:grid;place-items:center;color:#fff}
.cs-ph.lg{aspect-ratio:16/9;margin:0 0 16px}
.cs-card .b{font-size:13px;color:var(--soft);font-weight:500}
.cs-card .n{font-size:15px;font-weight:600;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cs-card .m{font-size:13px;color:var(--faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cs-chart{display:block;width:100%}.cs-chart svg{display:block;overflow:visible}
.cs-chart text{font-size:12px;fill:var(--faint)}.cs-chart text.tk{fill:var(--text);font-weight:600}
.cs-leg{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:10px;font-size:13px;color:var(--soft)}
.cs-leg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:-1px}
.cs-meta{position:relative;height:14px;border-radius:999px;background:color-mix(in srgb,var(--text) 8%,transparent);margin:16px 0 0}
.cs-meta>b{position:absolute;top:0;bottom:0;display:block}
.cs-meta .f{left:0;background:rgb(var(--primary));border-radius:999px 0 0 999px}.cs-meta .f.full{border-radius:999px}
.cs-meta .x{background:rgb(var(--pos));border-radius:0 999px 999px 0}
.cs-meta i{position:absolute;top:-4px;bottom:-4px;width:4px;margin-left:-2px;border-radius:2px;background:var(--text)}
.cs-mlab{display:flex;justify-content:space-between;gap:8px;margin:8px 0 12px;font-size:13px;color:var(--soft)}
.cs-bar{display:block;height:8px;border-radius:999px;background:color-mix(in srgb,var(--text) 8%,transparent);overflow:hidden;margin-top:6px}
.cs-bar>b{display:block;height:100%;border-radius:999px;background:rgb(var(--primary))}
.cs-band{display:flex;gap:3px;height:20px;border-radius:999px;overflow:hidden;margin:4px 0 16px}
.cs-seg2{margin:12px 0 0}
.cs-ask{display:flex;gap:8px;margin:0 0 12px}
.cs-ask input{flex:1;min-width:0;height:44px;border:0;border-radius:12px;padding:0 14px;font-size:17px;background:color-mix(in srgb,var(--text) 7%,transparent);color:var(--text);outline:none}
.cs-ask button{width:44px;height:44px;flex:none;border:0;border-radius:12px;background:rgb(var(--primary));color:#fff;display:grid;place-items:center}
.cs-msg{margin:0 0 12px}.cs-msg .q{font-weight:600;font-size:15px;margin:0 0 8px}.cs-msg p{margin:0 0 10px;font-size:15px;line-height:1.5}
.cs-ph4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.cs-ph4 span{aspect-ratio:1;border-radius:10px;display:grid;place-items:center;background:color-mix(in srgb,var(--text) 8%,transparent);color:var(--soft)}
.cs-bar2{position:fixed;z-index:45;left:12px;right:12px;bottom:calc(84px + env(safe-area-inset-bottom));display:flex;align-items:center;gap:6px;padding:6px 6px 6px 16px;border-radius:18px;background:var(--elev);box-shadow:0 12px 30px -10px rgba(0,0,0,.35),0 0 0 .5px var(--line)}
.cs-bar2[hidden]{display:none}
.cs-bar2 b{flex:1;min-width:0;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cs-bar2 button{height:44px;border:0;border-radius:12px;padding:0 12px;font-size:15px;font-weight:600;flex:none;background:transparent;color:rgb(var(--primary))}
.cs-bar2 button.p{background:rgb(var(--primary));color:#fff}
.cs-pad{height:76px}
.rw[role=switch] .sw,.rw[role=radio] .cs-rd{flex:none}
.cs-rd{width:24px;height:24px;border-radius:999px;box-shadow:inset 0 0 0 2px var(--faint);display:grid;place-items:center;color:#fff}
.rw[aria-checked=true] .cs-rd{background:rgb(var(--primary));box-shadow:none}
.rw[disabled]{opacity:.45}
.cs-off{opacity:.45;pointer-events:none}
.cs-gap{margin-top:12px}
</style>`);

/* ---------- utilidades ---------- */
const fmtN=(n,d=2)=>Number(n).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const num=s=>{s=String(s??'').trim().replace(/[R$\s%]/g,'');if(!s)return null;if(s.includes(','))s=s.replace(/\./g,'').replace(',','.');const n=parseFloat(s);return isNaN(n)?null:n};
const sumA=a=>a.reduce((s,x)=>s+x,0);
const clone=o=>JSON.parse(JSON.stringify(o));
const pl=(n,a,b)=>n===1?a:b;
const chip=(t,tone='')=>`<span class="chip ${tone}">${esc(t)}</span>`;
const go=h=>{location.hash=h};
const rr=()=>dispatchEvent(new HashChangeEvent('hashchange'));
const kv=(l,v,sub='',v2='')=>`<li><div class="rw"><span class="tx"><span class="t1">${l}</span>${sub?`<span class="t2">${sub}</span>`:''}</span>${v!=null&&v!==''?`<span class="vl"><b>${v}</b>${v2}</span>`:''}</div></li>`;
const kvg=(title,rows,foot='',cls='')=>rows.length?`<section class="grp ${cls}">${title?`<h2>${esc(title)}</h2>`:''}<ul class="lst">${rows.join('')}</ul>${foot?`<div class="foot">${foot}</div>`:''}</section>`:'';
const setPick=(root,id,v)=>$$('#'+id+' button',root).forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===String(v)));
/* linha com chave (liga/desliga) e linha de escolha única: a linha inteira é o alvo do toque */
const tgRow=(k,on,title,sub='',dis=false)=>`<li><button type="button" class="rw cs-wrap" role="switch" aria-checked="${!!on}" data-act="sw" data-k="${k}" ${dis?'disabled':''}><span class="tx"><span class="t1">${title}</span>${sub?`<span class="t2">${sub}</span>`:''}</span><span class="sw" aria-hidden="true" aria-checked="${!!on}"></span></button></li>`;
const rdRow=(grp,v,on,title,sub='')=>`<li><button type="button" class="rw cs-wrap" role="radio" aria-checked="${!!on}" data-act="rd" data-g="${grp}" data-v="${v}"><span class="tx"><span class="t1">${title}</span>${sub?`<span class="t2">${sub}</span>`:''}</span><span class="cs-rd" aria-hidden="true">${on?ic('check',16):''}</span></button></li>`;
const ul=(title,items,foot='',id='')=>`<section class="grp" ${id?`id="${id}"`:''}>${title?`<h2>${esc(title)}</h2>`:''}<ul class="lst">${items.join('')}</ul>${foot?`<div class="foot">${foot}</div>`:''}</section>`;
const flipSw=b=>{const on=b.getAttribute('aria-checked')!=='true';b.setAttribute('aria-checked',on);const s=$('.sw',b);s&&s.setAttribute('aria-checked',on);return on};
const fs=(o,pre='',post='')=>{const s=K.formSheet(o);const mf=$('.mf',s.el);if(pre)mf.insertAdjacentHTML('beforebegin',pre);if(post)mf.insertAdjacentHTML('afterend',post);return s};
const CATICON={auto:'chip',rede:'wifi',audio:'som',luz:'luz',clima:'neve',seg:'camera',srv:'chave',kit:'caixa'};
const CATN={auto:'Automação',rede:'Rede e Wi-Fi',audio:'Áudio e vídeo',luz:'Iluminação',clima:'Climatização',seg:'Segurança',kit:'Kit'};
const CATCOR={auto:'#5856d6',rede:'#0a7aff',audio:'#e5375f',luz:'#c77700',clima:'#1f8fa6',seg:'#248a3d',kit:'#6e6e73',srv:'#6e6e73'};

/* =====================================================================
   ESTADO (o mesmo do computador)
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
   1 · IA FISCAL
   ===================================================================== */
const P=id=>S.prod.find(x=>x.id===id);
const bySku=s=>S.prod.find(x=>x.sku.toLowerCase()===String(s).toLowerCase());
const isKit=p=>!!(p&&p.kit);
const validNcm=n=>/^\d{4}\.\d{2}\.\d{2}$/.test(n||'');
const rule=ncm=>S.st.find(r=>r.ncm===ncm);
const mvaAj=(m,inter=S.par.inter)=>((1+m/100)*(1-inter/100)/(1-S.par.int/100)-1)*100;
const SIT={st:['ICMS-ST','b','ICMS-ST',''],normal:['Tributado normal','g','Normal','pos'],rev:['Revisão fiscal pendente','w','Revisar','warn'],ncm:['NCM inválido','r','NCM inválido','neg']};
const sitOf=p=>{if(isKit(p))return p.kit.some(([id])=>{const c=P(id);return !c||['rev','ncm'].includes(sitOf(c))})?'rev':'normal';
  if(!validNcm(p.ncm))return 'ncm'; if(p.rev)return 'rev'; return rule(p.ncm)?'st':'normal'};
const custoEf=p=>{if(p.custo==null)return null;const c=p.custo,fr=c*(p.frete||0)/100,ipi=c*(p.ipi||0)/100,r=rule(p.ncm);let st=0;
  if(r&&validNcm(p.ncm)&&!p.rev){const inter=p.icmsE??S.par.inter,b=(c+fr+ipi)*(1+mvaAj(r.mva,inter)/100);st=Math.max(0,b*S.par.int/100-c*inter/100)}
  return {c,fr,ipi,st,tot:c+fr+ipi+st}};
const applyBlocks=(x,steps)=>{S.calc.forEach(b=>{const a=x;
  if(b.t==='pct')x=x*(1+b.v/100);else if(b.t==='fixo')x=x+b.v;else if(b.t==='meta')x=b.v<100?x/(1-b.v/100):x;else if(b.t==='form')x=b.v>0?Math.ceil(x/b.v)*b.v:x;
  steps&&steps.push([b,a,x])});return x};
const priceOf=p=>{if(!p)return null;
  if(isKit(p)){if(!p.kit.length)return null;let s=0;for(const [id,q] of p.kit){const v=priceOf(P(id));if(v==null)return null;s+=v*q}return s}
  if(p.pv!=null)return p.pv;const e=custoEf(p);return e?applyBlocks(e.tot):null};
const blockDesc=b=>b.t==='pct'?`+ ${fmtN(b.v,1)}% sobre o valor`:b.t==='fixo'?`+ ${brl(b.v)} por unidade`:b.t==='meta'?`valor ÷ (1 − ${fmtN(b.v,1)}%)`:`arredondar (múltiplo de ${fmtN(b.v,0)})`;
const confChip=c=>c>=85?chip('Confiança alta · '+c+'%','g'):c>=60?chip('Confiança média · '+c+'%','w'):chip('Confiança baixa · '+c+'%','r');
function pendList(){const out=[];S.prod.forEach(p=>{if(isKit(p))return;
  if(!validNcm(p.ncm))out.push({p,k:'ncm',t:'NCM inválido',d:`“${p.ncm||'vazio'}” não tem os 8 dígitos do NCM.`,s:p.sug?`IA sugere ${p.sug}`:'Sem sugestão: informe o NCM no cadastro.',conf:p.sug?p.conf||90:null,ok:!!p.sug});
  else if(p.rev)out.push({p,k:'rev',t:'Revisão fiscal pendente',d:`Cadastrado como ${p.ncm}. A descrição indica outro código.`,s:`IA sugere ${p.sug} · ${rule(p.sug)?'ICMS-ST':'Tributado normal'}`,conf:p.conf,ok:true});
  if(p.custo==null&&p.pv==null)out.push({p,k:'custo',t:'Sem custo de compra',d:'Sem custo, o preço não é calculado e o produto entra na proposta sem valor.',
    s:p.ucusto?`Última nota: ${brl(p.ucusto)} (NF-e 48.212, Luminar Sul)`:'Sem nota de compra registrada: informe o custo no cadastro.',conf:null,ok:!!p.ucusto});});return out}
const UNITS=['UN','PR','MT','KT','PROJ','VISITA'];
const ORIG=['0 · Nacional','1 · Estrangeira, importação direta','2 · Estrangeira, comprada no mercado interno'];
const CFOPS=['5102 · Venda de mercadoria','5405 · Venda com ICMS-ST retido antes'];
const CSTS=['00 · Tributada integralmente','60 · ICMS cobrado antes por ST'];
const prodRow=p=>{const s=sitOf(p),x=priceOf(p);return {icon:CATICON[p.cat]||'chip',color:CATCOR[p.cat],title:esc(p.n)+(isKit(p)?' '+chip('KIT','b'):''),
  sub:isKit(p)?esc(p.kit.map(([id,q])=>q+'× '+((P(id)||{n:'item excluído'}).n)).join(', ')||'sem itens'):`${esc(p.b)} · ${esc(p.sku)} · NCM ${esc(p.ncm||'—')}`,
  value:x==null?'<span class="soft">sem preço</span>':brl(x),value2:`<span class="${SIT[s][3]}">${SIT[s][2]}</span>`,href:'#/fiscal?prod='+p.id,i:p.id,
  swipe:[{label:'Editar',icon:'ajustes',act:'edit',tone:1},{label:'Excluir',icon:'lixo',act:'del',tone:3}]}};
function delProd(p,done){const inKit=S.prod.find(k=>isKit(k)&&k.kit.some(([x])=>x===p.id));
  if(inKit)return M.toast(`Está no ${inKit.n}. Tire do kit antes de excluir.`);
  K.confirm({title:`Excluir ${p.n}?`,text:'Sai da biblioteca e das próximas propostas.',ok:'Excluir',dng:true,run:()=>{const i=S.prod.indexOf(p);S.prod.splice(i,1);done&&done();
    M.toast(`${p.n} excluído.`,'Desfazer',()=>{S.prod.splice(i,0,p);done&&done()})}})}
function prodSheet(p,done){const isNew=!p,x=p?clone(p):{id:'p'+Date.now(),n:'',sku:'',b:'',m:'',u:'UN',cat:'auto',ncm:'',custo:null,frete:3,ipi:0,icmsE:S.par.inter,cest:'',orig:ORIG[0],curta:'',res:'',comp:'',kit:null,rev:false,pv:null};
  const st0=rule(x.ncm)&&!x.rev;
  const s=fs({title:isNew?'Novo produto':'Editar produto',ok:isNew?'Criar':'Salvar',groups:[
    {title:'Identificação',fields:[{k:'n',label:'Nome',req:true,value:x.n,ph:'Ex.: Interruptor 4 teclas'},{k:'sku',label:'SKU',req:true,value:x.sku,ph:'Ex.: C4-KD120'},
      {k:'b',label:'Marca',value:x.b},{k:'m',label:'Modelo',value:x.m},{k:'u',label:'Unidade',type:'select',opts:UNITS,value:x.u},
      {k:'cat',label:'Categoria',type:'select',opts:Object.entries(CATN).filter(([k])=>k!=='kit'),value:x.cat==='kit'?'auto':x.cat},
      {k:'iskit',label:'É um kit',type:'select',opts:['Não','Sim'],value:x.kit?'Sim':'Não'}],foot:'Kit é composto por outros produtos; os itens você escolhe no detalhe do produto.'},
    {title:'Descrições',fields:[{k:'curta',label:'Curta',value:x.curta,ph:'Uma linha'},{k:'res',label:'Resumida',type:'textarea',value:x.res,ph:'Sai na proposta com “Descrição resumida”.'},
      {k:'comp',label:'Completa',type:'textarea',value:x.comp,ph:'Texto técnico completo.'}]},
    {title:'Fiscal',fields:[{k:'ncm',label:'NCM',value:x.ncm,ph:'0000.00.00'},{k:'cest',label:'CEST',value:x.cest,ph:'00.000.00'},{k:'orig',label:'Origem',type:'select',opts:ORIG,value:x.orig},
      {k:'cfop',label:'CFOP de venda',type:'select',opts:CFOPS,value:x.cfop||CFOPS[st0?1:0]},{k:'cst',label:'CST do ICMS',type:'select',opts:CSTS,value:x.cst||CSTS[st0?1:0]}],foot:'NCM com 8 dígitos e pontos. Kit não tem NCM próprio.'},
    {title:'Custo & Fiscal',fields:[{k:'custo',label:'Custo de compra',type:'money',value:x.custo==null?'':fmtN(x.custo),ph:'0,00'},{k:'frete',label:'Frete (%)',type:'number',value:String(x.frete)},{k:'ipi',label:'IPI (%)',type:'number',value:String(x.ipi)},
      {k:'icmsE',label:'ICMS na entrada',type:'select',opts:[['4','4% · importado'],['7','7%'],['12','12% · outro estado'],['18','18% · de MG']],value:String(x.icmsE??S.par.inter)},
      {k:'pv',label:'Preço manual',type:'money',value:x.pv==null?'':fmtN(x.pv),ph:'Em branco: calculado'}]}],
    onOk:v=>{const kit=v.iskit==='Sim';
      if(S.prod.some(q=>q.sku.toLowerCase()===v.sku.toLowerCase()&&q.id!==x.id)){M.toast('Já existe um produto com este SKU.');$('[name=sku]',s.el).focus();return false}
      const c={...x,n:v.n,sku:v.sku,b:v.b,m:v.m,u:kit?'KT':v.u,cat:kit?'kit':v.cat,curta:v.curta||v.n,res:v.res,comp:v.comp,ncm:kit?'':v.ncm,cest:v.cest,orig:v.orig,cfop:v.cfop,cst:v.cst,
        rev:x.rev&&v.ncm===x.ncm,custo:kit?null:num(v.custo),pv:kit?null:num(v.pv),frete:num(v.frete)||0,ipi:num(v.ipi)||0,icmsE:+v.icmsE||S.par.inter,kit:kit?(x.kit||[]):null};
      if(isNew)S.prod.unshift(c);else Object.assign(p,c);
      M.toast(isNew?`${c.n} criado.`:`${c.n} salvo.`);if(kit&&!c.kit.length)setTimeout(()=>M.toast('Agora componha o kit: “Adicionar item” no detalhe do produto.'),1600);
      done&&done(c)}},'',`<section class="grp"><h2>Com estes dados</h2><ul class="lst" id="pf-prev"></ul></section>`);
  const prev=()=>{const g=k=>$(`[name="${k}"]`,s.el).value.trim(),kit=g('iskit')==='Sim';
    const c={...x,ncm:kit?'':g('ncm'),rev:x.rev&&g('ncm')===x.ncm,custo:kit?null:num(g('custo')),pv:kit?null:num(g('pv')),frete:num(g('frete'))||0,ipi:num(g('ipi'))||0,icmsE:+g('icmsE')||S.par.inter,kit:kit?(x.kit||[]):null};
    const si=sitOf(c),pr=priceOf(c),e=kit?null:custoEf(c);
    $('#pf-prev',s.el).innerHTML=kv('Situação fiscal',`<span class="${SIT[si][3]}">${SIT[si][0]}</span>`)+(e?kv('Custo efetivo',brl(e.tot),'custo + frete + IPI + ICMS-ST'):'')+kv('Preço de venda',pr==null?'sem preço':brl(pr),c.pv!=null?'manual':kit?'soma dos itens':'calculado pelos blocos')};
  s.el.addEventListener('input',prev);s.el.addEventListener('change',prev);prev()}
function fiscalDetalhe(p){const s=sitOf(p),e=isKit(p)?null:custoEf(p),steps=[],fin=e?applyBlocks(e.tot,steps):null,pr=priceOf(p),r=rule(p.ncm);
  const showSug=p.sug&&p.ncm!==p.sug&&(p.rev||!validNcm(p.ncm));
  return `${K.nav({title:p.n,back:'IA Fiscal',kick:CATN[p.cat]||'Produto',sub:esc(`${p.b} · ${p.m} · ${p.sku}`)})}
   <div class="cs-tags">${chip(SIT[s][0],SIT[s][1])}${isKit(p)?chip('KIT','b'):''}${p.pv!=null?chip('preço manual'):''}</div>
   ${showSug?`<div class="mcard"><h3>Maestro AI</h3><p class="cs-note"><b>IA sugere NCM ${esc(p.sug)}</b> · ${rule(p.sug)?'está na regra de ST de MG: venda com CFOP 5405 e CST 60.':'fora da ST: venda com CFOP 5102 e CST 00.'}</p>
     <div class="cs-tags">${confChip(p.conf||90)}</div>${K.btn('Aplicar sugestão',{pri:true,act:'apsug',icon:'brilho'})}</div>`:''}
   ${p.custo==null&&p.pv==null&&!isKit(p)&&p.ucusto?`<div class="mcard"><p class="cs-note">Sem custo de compra. Última nota: <b>${brl(p.ucusto)}</b> (NF-e 48.212, Luminar Sul).</p>${K.btn('Usar o custo da nota',{pri:true,act:'ucusto'})}</div>`:''}
   ${isKit(p)?K.group({title:'Composição do kit',foot:'Toque para mudar a quantidade; deslize para tirar. O preço do kit é a soma dos itens.',rows:[...p.kit.map(([id,q],i)=>{const c=P(id)||{n:'Item excluído',cat:'srv'},v=priceOf(c);
       return {icon:CATICON[c.cat]||'chip',color:CATCOR[c.cat],title:`${q}× ${esc(c.n)}`,sub:esc(c.sku||''),value:v==null?'sem preço':brl(v*q),act:'kq',i,swipe:[{label:'Tirar',icon:'lixo',act:'krm',tone:3}]}}),
       {icon:'mais',color:'#8e8e93',title:'Adicionar item',act:'kadd',chev:false}]}):''}
   ${kvg('Identificação',[kv('SKU',esc(p.sku)),kv('Marca',esc(p.b||'—')),kv('Modelo',esc(p.m||'—')),kv('Unidade',esc(p.u)),kv('Categoria',esc(CATN[p.cat]||'—'))])}
   ${isKit(p)?kvg('Fiscal',[kv('Kit não tem NCM próprio','','Cada item sai na nota com o seu NCM e a sua tributação.')],'','cs-wrap')
     :kvg('Fiscal',[kv('NCM',esc(p.ncm||'—')),kv('CEST',esc(p.cest||'—')),kv('Origem','',esc(p.orig)),kv('CFOP',esc((p.cfop||CFOPS[s==='st'?1:0]).split(' ')[0])),kv('CST',esc((p.cst||CSTS[s==='st'?1:0]).split(' ')[0])),
       ...(r&&!p.rev?[kv('MVA ajustada',fmtN(mvaAj(r.mva,p.icmsE),2)+'%',`Regra de ST · ${esc(r.d)} · MVA original ${fmtN(r.mva,0)}%`)]:[])])}
   ${e?kvg('Custo e preço',[kv('Custo de compra',brl(e.c)),kv(`Frete (${fmtN(p.frete||0,1)}%)`,'+ '+brl(e.fr)),kv(`IPI (${fmtN(p.ipi||0,1)}%)`,'+ '+brl(e.ipi)),kv('ICMS-ST antecipado','+ '+brl(e.st)),
       kv('<b>Custo efetivo</b>',brl(e.tot)),...steps.map(([b,,z])=>kv(esc(b.n),brl(z),blockDesc(b))),kv('<b>Preço calculado</b>',brl(fin)),...(p.pv!=null?[kv('<b>Preço manual em uso</b>',brl(p.pv))]:[])],'Os blocos do preço ficam na aba Cálculo da IA Fiscal, no computador.')
     :isKit(p)?kvg('Preço',[kv('<b>Preço do kit</b>',pr==null?'sem preço':brl(pr))]):kvg('Custo e preço',[kv('Sem custo de compra','','Informe o custo no cadastro ou importe a nota de compra.')],'','cs-wrap')}
   ${p.res||p.comp?kvg('Descrições',[...(p.res?[kv('Resumida','',esc(p.res))]:[]),...(p.comp?[kv('Completa','',esc(p.comp))]:[])],'','cs-wrap'):''}
   <div class="mcard"><div class="mbtns">${K.btn('Excluir',{dng:true,act:'del1'})}${K.btn('Editar',{pri:true,act:'edit1'})}</div></div>`}
function askAI(){const CH=['Qual o NCM do Amplificador Amp?','Quais produtos têm ST em MG?','Como a MVA ajustada é calculada?','Como sai o preço do CORE 5?','Kit tem NCM próprio?'];
  const answer=q=>{const t=q.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,''),p1=bySku('C4-CORE5'),amp=bySku('SON-AMP');
    if(/mva/.test(t))return {a:`A MVA ajustada corrige a margem quando a entrada vem de outro estado. Fórmula: [(1 + MVA original) × (1 − alíquota de entrada) ÷ (1 − alíquota interna)] − 1. Com MVA de 37%, entrada a ${S.par.inter}% e interna de ${S.par.int}%, dá ${fmtN(mvaAj(37),2)}%.`,conf:97,base:'Convênio ICMS 142/2018 (MVA ajustada) · parâmetros desta empresa'};
    if(/kit/.test(t))return {a:'Não. Na nota, cada item do kit sai com o seu NCM, CFOP e tributação. O kit é uma forma de vender junto; o preço dele é a soma dos itens.',conf:90,base:'Manual de Orientação do Contribuinte da NF-e (um item por produto)'};
    if(/\bst\b|substitui/.test(t)){const l=S.prod.filter(p=>sitOf(p)==='st');return {a:`Hoje ${l.length} produtos estão na substituição tributária: ${l.map(p=>p.n).join(', ')}. A empresa paga o ICMS-ST na entrada; na venda, CFOP 5405 e CST 60.`,conf:88,base:'RICMS/MG, Anexo XV · regras de ST desta empresa'}}
    if(/ncm/.test(t)||/amplificador|\bamp\b|receiver|motor|cortina/.test(t)){
      if(/amplificador|\bamp\b/.test(t))return amp?{a:`O ${amp.n} é amplificador elétrico de áudio: NCM 8518.40.00. ${amp.ncm==='8518.40.00'?'O cadastro já está com esse código.':`Hoje está como ${amp.ncm}, código genérico de aparelhos elétricos com função própria.`}`,conf:92,base:'TIPI · capítulo 85, posição 85.18'}:{a:'Não achei esse produto na sua biblioteca.',conf:40,base:'—'};
      if(/receiver/.test(t))return {a:'Receiver AV combina rádio, amplificação e processamento: a classificação mais provável é 8527.99.90, mas depende do manual do fabricante. Confira antes de aplicar.',conf:64,base:'TIPI · posições 85.18 e 85.27'};
      if(/motor|cortina/.test(t))return {a:'Motor de cortina é motor elétrico de corrente contínua de baixa potência: NCM provável 8501.31.10.',conf:71,base:'TIPI · posição 85.01'};
      const L=pendList().filter(x=>x.k!=='custo');return {a:L.length?`Há ${L.length} ${pl(L.length,'produto','produtos')} com NCM a revisar: ${L.map(x=>`${x.p.n} (${x.s.replace('IA sugere ','sugestão ')})`).join('; ')}. Use “Confirmar” em Pendências.`:'Nenhum NCM pendente agora.',conf:85,base:'Cadastro de produtos · TIPI'}}
    if(/preco|margem|core|calcul/.test(t)&&p1){const e=custoEf(p1);if(!e)return {a:'O CORE 5 está sem custo; sem custo não há preço.',conf:90,base:'Cadastro do produto'};const st=[],fin=applyBlocks(e.tot,st);
      return {a:`O preço sai do custo efetivo (custo + frete + IPI + ICMS-ST) passando pelos blocos de Cálculo, em ordem. ${p1.n}: custo efetivo ${brl(e.tot)} → ${st.map(([b,,z])=>`${b.n.toLowerCase()} ${brl(z)}`).join(' → ')} = ${brl(fin)}.`,conf:95,base:'Aba Cálculo e parâmetros gerais desta empresa'}}
    return {a:'Não achei base suficiente para responder com segurança. Tente citar o produto, o NCM ou a UF.',conf:35,base:'—'}};
  let s;
  const draw=()=>$('#ai-conv',s.el).innerHTML=S.chat.map(m=>`<article class="mcard cs-msg"><p class="q">${esc(m.q)}</p><p>${esc(m.a)}</p><div class="cs-tags" style="margin:0 0 8px">${confChip(m.conf)}</div><p class="cs-note" style="margin:0"><b>Base:</b> ${esc(m.base)}</p></article>`).join('');
  const ask=q=>{q=(q||'').trim();const i=$('#ai-q',s.el);if(!q)return i.focus();S.chat.unshift({q,...answer(q)});i.value='';draw()};
  s=K.sheet({title:'Perguntar à IA',cancel:'Fechar',cheia:true,body:`<p class="cs-note">Cada resposta traz a base usada e o grau de confiança. Confira antes de aplicar.</p>
    <form class="cs-ask" id="ai-f"><input id="ai-q" placeholder="NCM, ST, preço…" aria-label="Pergunte sobre NCM, ST, preço" autocomplete="off" enterkeyhint="send"><button type="submit" aria-label="Enviar pergunta">${ic('enviar',20)}</button></form>
    ${K.chips('ai-ch',CH.map((c,i)=>[String(i),c]),'')}<div id="ai-conv" aria-live="polite"></div>`});
  $('#ai-f',s.el).onsubmit=e=>{e.preventDefault();ask($('#ai-q',s.el).value)};K.bindPick(s.el,'ai-ch',i=>{ask(CH[+i]);setPick(s.el,'ai-ch','')});draw()}
let fTab='prod';
function fiscalBody(){
  if(fTab==='pend'){const L=pendList();return L.length?K.group({title:`${L.length} ${pl(L.length,'pendência','pendências')}`,foot:'Deslize para confirmar a sugestão ou toque para ver o detalhe.',rows:L.map((x,i)=>({icon:CATICON[x.p.cat]||'chip',color:x.k==='ncm'?'rgb(var(--neg))':'rgb(var(--warn))',
      title:esc(x.p.n),sub:`${esc(x.t)} · ${esc(x.s)}`,value2:x.conf?`<span class="${x.conf>=85?'pos':x.conf>=60?'warn':'neg'}">${x.conf}%</span>`:'',value:x.conf?'':null,act:'pd',i,swipe:x.ok?[{label:'Confirmar',icon:'check',act:'pok',tone:4},{label:'Editar',icon:'ajustes',act:'pedit',tone:1}]:[{label:'Editar',icon:'ajustes',act:'pedit',tone:1}]}))})
    :K.empty({title:'Nenhuma pendência fiscal.',text:'Tudo revisado. Quando a IA encontrar algo para conferir, aparece aqui.'})}
  const t=(S.fq||'').trim().toLowerCase(),rows=S.prod.filter(p=>!t||(p.n+' '+p.sku+' '+p.ncm+' '+p.b).toLowerCase().includes(t));
  return rows.length?K.group({title:`${rows.length} de ${S.prod.length} produtos`,foot:'Deslize a linha para editar ou excluir.',rows:rows.map(prodRow)}):K.empty({title:'Nenhum produto encontrado.',text:'Tente outro nome, SKU ou NCM.'})}
M.mscreen('fiscal',{title:'IA Fiscal',tab:'fiscal',
  help:['Busque por nome, SKU ou NCM; toque num produto para ver a situação fiscal, o custo e o preço calculado.',
    'Pendências mostra o que a IA pede para conferir: deslize para confirmar a sugestão ou abra o produto para ajustar.',
    'O + cadastra um produto; “Perguntar à IA” responde sobre NCM, ST e preço com a base e o grau de confiança.'],
  render:q=>{const id=q.get('prod');if(id){const p=P(id);return p?fiscalDetalhe(p):K.nav({title:'Produto',back:'IA Fiscal'})+K.empty({title:'Produto não encontrado.',text:'Ele pode ter sido excluído.'})}
    const n=pendList().length;
    return `${K.nav({title:'IA Fiscal',kick:'Produtos · Preço · Fiscal',acts:[{icon:'brilho',title:'Perguntar à IA',act:'ask'},{icon:'mais',title:'Novo produto',act:'novo'}]})}
     ${K.group({rows:[{icon:'brilho',color:'rgb(var(--primary))',title:'Maestro AI',sub:n?`${n} ${pl(n,'pendência fiscal','pendências fiscais')} esperando você`:'Nenhuma pendência fiscal. Tudo revisado.',act:'verpend'}]})}
     ${K.seg('fi-tab',[['prod','Produtos'],['pend',`Pendências · ${n}`]],fTab,'Áreas da IA Fiscal')}
     <div id="fi-q" ${fTab==='prod'?'':'hidden'}>${K.search('Nome, SKU ou NCM','fi-qi')}</div><div id="fi-b">${fiscalBody()}</div>`},
  mount:(v,q)=>{
    if(q.get('prod')){const p=P(q.get('prod'));if(!p)return;
      M.wire(v,{edit1:()=>prodSheet(p,rr),del1:()=>delProd(p,()=>go('#/fiscal')),
        apsug:()=>{const old={ncm:p.ncm,rev:p.rev};p.ncm=p.sug;p.rev=false;const st=!!rule(p.ncm);p.cfop=CFOPS[st?1:0];p.cst=CSTS[st?1:0];rr();M.toast(`NCM ${p.ncm} aplicado.`,'Desfazer',()=>{Object.assign(p,old);rr()})},
        ucusto:()=>{p.custo=p.ucusto;rr();M.toast(`Custo de ${brl(p.ucusto)} aplicado. O preço foi calculado.`)},
        kq:el=>{const it=p.kit[+el.dataset.i],c=P(it[0])||{n:'Item'};K.formSheet({title:'Quantidade',ok:'OK',cheia:false,groups:[{title:c.n,fields:[{k:'q',label:'Quantidade',type:'number',req:true,value:String(it[1])}]}],
          onOk:x=>{const n=parseInt(x.q,10);if(!(n>=1)){M.toast('Use pelo menos 1.');return false}it[1]=n;rr()}})},
        krm:el=>{const i=+el.dataset.i,[it]=p.kit.splice(i,1);rr();M.toast('Item tirado do kit.','Desfazer',()=>{p.kit.splice(i,0,it);rr()})},
        kadd:()=>K.actions({title:'Adicionar ao kit',items:S.prod.filter(o=>!isKit(o)).map(o=>({label:o.n,run:()=>{const ex=p.kit.find(k=>k[0]===o.id);ex?ex[1]++:p.kit.push([o.id,1]);rr();M.toast(`${o.n} no kit.`)}}))})});return}
    const box=$('#fi-b',v),qi=$('#fi-qi',v);
    const draw=()=>{box.innerHTML=fiscalBody();$('#fi-q',v).hidden=fTab!=='prod';const n=pendList().length,pb=$('#fi-tab [data-v="pend"]',v);pb.textContent=`Pendências · ${n}`;
      const mt=$('[data-act="verpend"] .t2',v);if(mt)mt.textContent=n?`${n} ${pl(n,'pendência fiscal','pendências fiscais')} esperando você`:'Nenhuma pendência fiscal. Tudo revisado.';M.wire(box,H);K.bindSwipe(box)};
    const byP=el=>P(el.dataset.i),pend=el=>pendList()[+el.dataset.i];
    const confirmar=x=>{const p=x.p,old={ncm:p.ncm,rev:p.rev,custo:p.custo};if(x.k==='custo')p.custo=p.ucusto;else{p.ncm=p.sug;p.rev=false}
      draw();M.toast(`${p.n}: ${x.t.toLowerCase()} resolvida.`,'Desfazer',()=>{Object.assign(p,old);draw()})};
    const H={ask:()=>askAI(),novo:()=>prodSheet(null,c=>{draw();if(c.kit)go('#/fiscal?prod='+c.id)}),verpend:()=>{fTab='pend';setPick(v,'fi-tab','pend');draw()},
      edit:el=>prodSheet(byP(el),draw),del:el=>delProd(byP(el),draw),
      pok:el=>confirmar(pend(el)),pedit:el=>prodSheet(pend(el).p,draw),
      pd:el=>{const x=pend(el);let s;s=K.sheet({title:x.t,cancel:'Fechar',body:`${kvg(x.p.n,[kv('O que houve','',esc(x.d)),kv('Sugestão','',esc(x.s))],'','cs-wrap')}${x.conf?`<div class="cs-tags">${confChip(x.conf)}</div>`:''}
        <div class="mbtns">${K.btn('Abrir produto',{act:'ab'})}${x.ok?K.btn('Confirmar',{pri:true,act:'ok'}):K.btn('Editar',{pri:true,act:'ed'})}</div>`,
        on:{ab:()=>{s.close();go('#/fiscal?prod='+x.p.id)},ok:()=>{s.close();confirmar(x)},ed:()=>{s.close();setTimeout(()=>prodSheet(x.p,draw),200)}}})}};
    K.bindPick(v,'fi-tab',x=>{fTab=x;draw()});qi.value=S.fq||'';qi.oninput=()=>{S.fq=qi.value;draw()};M.wire(v,H)}});

/* =====================================================================
   2 · CATÁLOGO
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
function addLib(c,after){const forn=D.fornecedores.filter(f=>f.situacao==='Ativo'),pre=forn.find(f=>f.marcas.includes(c.b));
  K.formSheet({title:'Adicionar',ok:'Adicionar',cheia:false,groups:[{title:c.n+' · '+c.m,fields:[{k:'custo',label:'Preço de custo',type:'money',ph:'0,00'},{k:'venda',label:'Preço de venda',type:'money',ph:'Em branco: calculado'},
    {k:'forn',label:'Fornecedor',type:'select',req:true,ph:'Escolher',opts:forn.map(f=>[f.id,f.nome]),value:pre?pre.id:''}],foot:'Sem preço de venda, a IA Fiscal calcula pelo custo.'}],
    onOk:v=>{const cu=num(v.custo),pv=num(v.venda);if(v.custo&&(cu==null||cu<0)){M.toast('Preço de custo inválido.');return false}if(v.venda&&(pv==null||pv<0)){M.toast('Preço de venda inválido.');return false}
      const np={id:'p'+Date.now(),n:c.n,sku:c.m,b:c.b,m:c.serie,u:'UN',cat:c.cat,ncm:c.ncm,custo:cu,pv,frete:3,ipi:0,icmsE:S.par.inter,cest:'',orig:ORIG[0],curta:c.n,res:c.d,comp:'',forn:v.forn,kit:null,rev:false};
      S.prod.unshift(np);after&&after();M.toast(`${c.n} está na sua biblioteca.`,'Ver na IA Fiscal',()=>go('#/fiscal?prod='+np.id))}})}
let catQ='',catB='';
function catBody(){const q=catQ.trim().toLowerCase(),L=CAT.filter(c=>(!q||(c.n+' '+c.m+' '+c.serie+' '+c.d).toLowerCase().includes(q))&&(!catB||c.b===catB));
  return `<p class="cs-note">${L.length} ${pl(L.length,'produto','produtos')}${catB?' · '+esc(catB):''}</p>`+(L.length?`<div class="cs-grid">${L.map(c=>`<a class="cs-card" href="#/catalogo?item=${c.id}" aria-label="${esc(c.n)}, ${esc(c.b)}${inLib(c)?', na biblioteca':''}">
      <span class="cs-ph" style="background:${CATCOR[c.cat]}" aria-hidden="true">${ic(CATICON[c.cat],32)}</span><span class="b">${esc(c.b)}</span><span class="n">${esc(c.n)}</span><span class="m">${esc(c.serie)} · ${esc(c.m)}</span>${inLib(c)?`<span>${chip('✓ Na biblioteca','g')}</span>`:''}</a>`).join('')}</div>`
    :K.empty({title:'Nenhum produto com esses filtros.',text:'Tente outra marca ou limpe a busca.',btn:'Limpar filtros',act:'limpar'}))}
M.mscreen('catalogo',{title:'Catálogo',tab:'catalogo',
  help:['Busque por nome, modelo ou descrição e filtre pela marca nos botões.','Toque num produto para ver descrição, ficha técnica, conexões e documentos.',
    '“Adicionar à biblioteca” pede custo, venda e fornecedor; o produto passa a valer nas propostas e aparece na IA Fiscal.'],
  render:q=>{const id=q.get('item');if(id){const c=CAT.find(x=>x.id===id);if(!c)return K.nav({title:'Produto',back:'Catálogo'})+K.empty({title:'Produto não encontrado.'});const lib=inLib(c),bp=bySku(c.m);
      return `${K.nav({title:c.n,back:'Catálogo',kick:`${c.b} · ${CATN[c.cat]}`,sub:esc(c.serie+' · '+c.m)})}
       <span class="cs-ph lg" style="background:${CATCOR[c.cat]}" aria-hidden="true">${ic(CATICON[c.cat],56)}</span>
       <div class="cs-tags">${lib?chip('✓ Na biblioteca','g'):''}${chip(c.tipo)}</div>
       <div class="mcard">${lib?K.btn('Abrir na IA Fiscal',{pri:true,act:'fis',icon:'fiscal'}):K.btn('Adicionar à biblioteca',{pri:true,act:'add',icon:'mais'})}</div>
       ${kvg('Descrição',[kv('',null,esc(c.d)+' Compatível com os principais sistemas de automação usados nas obras.')],'','cs-wrap')}
       ${kvg('Ficha técnica',[kv('Modelo',esc(c.m)),kv('NCM',esc(c.ncm)),...FICHA[c.cat].map(([k,x])=>kv(esc(k),esc(x)))])}
       ${kvg('Conexões',[kv(CONN[c.cat].map(x=>chip(x)).join(' '),'')])}
       ${K.group({title:'Documentos',rows:DOCS.map((d,i)=>({icon:'doc',color:'#8e8e93',title:d,sub:'Do fabricante',act:'doc',i}))})}
       ${bp?'':''}`}
    const brands=[...new Set(CAT.map(c=>c.b))].sort();
    return `${K.nav({title:'Catálogo',kick:'Produtos',sub:'Acervo curado. Escolha o que interessa e adicione à sua biblioteca com o seu preço.'})}
     ${K.search('Nome, modelo ou descrição','ca-q')}${K.chips('ca-b',[['','Todas as marcas'],...brands.map(b=>[b,b])],catB)}<div id="ca-b2">${catBody()}</div>`},
  mount:(v,q)=>{const id=q.get('item');
    if(id){const c=CAT.find(x=>x.id===id);if(!c)return;M.wire(v,{add:()=>addLib(c,rr),fis:()=>{const p=bySku(c.m);go(p?'#/fiscal?prod='+p.id:'#/fiscal')},doc:el=>M.toast(`Baixa “${DOCS[+el.dataset.i]}” do fabricante (simulação).`)});return}
    const box=$('#ca-b2',v),qi=$('#ca-q',v);
    const H={limpar:()=>{catQ='';catB='';qi.value='';setPick(v,'ca-b','');draw()}};
    const draw=()=>{box.innerHTML=catBody();M.wire(box,H)};
    qi.value=catQ;qi.oninput=()=>{catQ=qi.value;draw()};K.bindPick(v,'ca-b',x=>{catB=x;draw()});M.wire(v,H)}});

/* =====================================================================
   3 · RELATÓRIOS
   ===================================================================== */
const KINDS=[['Registro Técnico','Técnica','chave'],['Passagem de bastão','Comercial','trocar'],['Registro de Projetos','Projetos','projetos'],['Registro de Experiência','Experiência','coracao']];
const RTONE={'Recebendo':'','Transcrevendo':'b','Estruturando':'b','Pendente revisão':'w','Salvo':'g','Falhou':'r','Descartado':''};
const RCLS={'Pendente revisão':'warn','Salvo':'pos','Falhou':'neg'};
if(!S.rel){const kindOf=t=>KINDS.find(k=>k[1]===t)[0];
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
const PER={todo:'Todo o período','24':'Últimas 24 horas','168':'Últimos 7 dias','720':'Últimos 30 dias'};
const relLink=r=>{try{navigator.clipboard.writeText('https://maestro-os.app/r/'+r.id).catch(()=>{})}catch(e){}M.toast('Link do relatório copiado.')};
const delRel=(r,after)=>K.confirm({title:'Excluir relatório?',text:`${r.kind} · ${r.cli}. Vai para Itens excluídos.`,ok:'Excluir',dng:true,
  run:()=>{const i=S.rel.indexOf(r);S.rel.splice(i,1);after&&after();M.toast('Relatório excluído.','Desfazer',()=>{S.rel.splice(i,0,r);after&&after()})}});
function relNovo(kind,pre={},after){const clis=D.contatos.filter(c=>c.papel==='Cliente').map(c=>c.nome);let foto=[],aud=null;
  const s=fs({title:'Novo registro',ok:'Enviar',groups:[{title:kind,fields:[{k:'cli',label:'Cliente',type:'select',req:true,ph:'Escolher',opts:clis,value:pre.cli||''},
      {k:'obra',label:'Obra',type:'select',opts:[['','Sem obra'],...D.obras.map(o=>[o.nome,o.nome])],value:pre.obra||''},{k:'modo',label:'Como registrar',type:'select',opts:['Texto','Áudio'],value:pre.modo||'Texto'}]},
    {fields:[{k:'texto',label:'O que aconteceu',type:'textarea',ph:'Conte o que foi feito, o que falta e o que o cliente pediu.'}],foot:'Mínimo de 10 caracteres. A IA estrutura; o registro fica pendente até alguém revisar e salvar.'}],
    onOk:v=>{if(v.modo==='Texto'&&v.texto.length<10){$('[name=texto]',s.el).closest('.fr').classList.add('err');M.toast(v.texto?'Escreva pelo menos 10 caracteres.':'Conte o que aconteceu.');$('[name=texto]',s.el).focus();return false}
      if(v.modo==='Áudio'&&!aud){M.toast('Escolha ou grave o áudio.');return false}
      const k=KINDS.find(x=>x[0]===kind),r={id:'r'+Date.now(),tipo:k[1],kind,cli:v.cli,obra:v.obra,autor:'Allysson Moura',h:0,status:'Pendente revisão',
        resumo:v.modo==='Texto'?v.texto.replace(/\s+/g,' ').slice(0,160):`Áudio enviado (${aud}). Transcrição estruturada pela IA.`,st:foto.length?{...relStruct({tipo:k[1],resumo:v.texto||'Áudio enviado.'}),fotos:foto.length}:null};
      if(!r.st)delete r.st;S.rel.unshift(r);after&&after();M.toast('Relatório enviado. Revise e salve.','Abrir',()=>go('#/relatorios?rel='+r.id))}},'',
    `<section class="grp"><h2>Anexos</h2><ul class="lst">
      <li id="rn-aud"><label class="rw ic40" style="cursor:pointer"><span class="mic" aria-hidden="true">${ic('som',22)}</span><span class="tx"><span class="t1">Áudio</span><span class="t2" id="rn-audt">Gravar ou escolher o áudio</span></span><input type="file" accept="audio/*" capture class="sr" id="rn-audf"></label></li>
      <li><label class="rw ic40" style="cursor:pointer"><span class="mic" aria-hidden="true">${ic('camera',22)}</span><span class="tx"><span class="t1">Fotos</span><span class="t2" id="rn-fott">Tirar ou escolher fotos</span></span><input type="file" accept="image/*" multiple class="sr" id="rn-fotf"></label></li></ul></section>`);
  const md=$('[name=modo]',s.el),sync=()=>{$('[name=texto]',s.el).closest('section').style.display=md.value==='Texto'?'':'none';$('#rn-aud',s.el).style.display=md.value==='Áudio'?'':'none'};md.onchange=sync;sync();
  $('#rn-audf',s.el).onchange=e=>{const f=e.target.files[0];if(f){aud=f.name;$('#rn-audt',s.el).textContent=f.name}};
  $('#rn-fotf',s.el).onchange=e=>{foto=[...e.target.files].map(f=>f.name);$('#rn-fott',s.el).textContent=foto.length?`${foto.length} ${pl(foto.length,'foto','fotos')}`:'Tirar ou escolher fotos'}}
function handSheet(after){let s;const H={};
  const body=()=>`<p class="cs-note">Passagens de bastão entre áreas: quem recebe aceita, recusa com motivo ou conclui.</p>${S.hand.map((h,i)=>`<section class="grp"><h2>${esc(h.de)} → ${esc(h.para)}</h2><div class="mcard">
    <div class="cs-tags">${chip(h.st,{'Aguardando aceite':'w','Aceito':'b','Em andamento':'b','Concluído':'g','Recusado':'r'}[h.st])}</div><p class="cs-note"><b>${esc(h.obra)}</b> · ${esc(h.quem)}${h.motivo?' · motivo: '+esc(h.motivo):''}</p>
    ${h.st==='Aguardando aceite'?`<div class="mbtns">${K.btn('Recusar',{dng:true,act:'rec'}).replace('data-act',`data-i="${i}" data-act`)}${K.btn('Aceitar',{pri:true,act:'ace'}).replace('data-act',`data-i="${i}" data-act`)}</div>`
      :['Aceito','Em andamento'].includes(h.st)?K.btn('Concluir',{act:'con'}).replace('data-act',`data-i="${i}" data-act`):''}</div></section>`).join('')}`;
  const redo=()=>{const b=$('.mb',s.el);b.innerHTML=body();M.wire(b,H);after&&after()};
  Object.assign(H,{ace:el=>{S.hand[+el.dataset.i].st='Aceito';redo();M.toast('Passagem aceita.')},con:el=>{S.hand[+el.dataset.i].st='Concluído';redo();M.toast('Passagem concluída.')},
    rec:el=>{const h=S.hand[+el.dataset.i];K.formSheet({title:'Recusar passagem',ok:'Recusar',cheia:false,groups:[{title:`${h.obra} · ${h.de} → ${h.para}`,fields:[{k:'motivo',label:'Motivo',type:'textarea',req:true,ph:'Quem enviou recebe o motivo'}]}],
      onOk:v=>{h.st='Recusado';h.motivo=v.motivo;redo();M.toast('Passagem recusada.')}})}});
  s=K.sheet({title:'Handoffs',cancel:'Fechar',cheia:true,body:body(),on:H})}
function relBody(){const f=S.rf,R=S.rel;
  const pend=R.filter(r=>r.status==='Pendente revisão'),late=pend.filter(r=>r.h>48),hoje=R.filter(r=>r.h<24),hand=S.hand.filter(h=>!['Concluído','Recusado'].includes(h.st));
  const cnt={};R.filter(r=>r.h<=720).forEach(r=>cnt[r.autor]=(cnt[r.autor]||0)+1);const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0]||['—',0];
  const tipo=['','Técnica','Comercial','Projetos','Experiência'][f.tab],st={'Salvos':'Salvo','Falharam':'Falhou'}[f.st]||f.st,t=f.q.trim().toLowerCase();
  const rows=R.filter(r=>(!tipo||r.tipo===tipo)&&(f.per==='todo'||r.h<=+f.per)&&(st==='Todos'||r.status===st)&&(!f.late||r.h>48)&&(!f.autor||r.autor===f.autor)&&(!f.cli||r.cli===f.cli)
    &&(f.esc==='tudo'||(f.esc==='meus'?r.autor==='Allysson Moura':isTeam(r.autor)))&&(!t||(r.resumo+' '+r.cli+' '+r.obra+' '+r.autor+' '+r.kind).toLowerCase().includes(t)));
  const ativos=[f.per!=='todo'?PER[f.per]:'',f.autor,f.cli,f.esc==='meus'?'Meus':f.esc==='equipe'?'Equipe':'',f.late?'Atrasados':''].filter(Boolean);
  return `${K.tiles([{label:'Hoje',value:String(hoje.length),sub:'últimas 24 horas',act:'kHoje'},{label:'Pendentes revisão',value:String(pend.length),sub:'esperando alguém salvar',tone:pend.length?'warn':'',act:'kPend'},
      {label:'Atrasados',value:String(late.length),sub:'pendentes há +48 h',tone:late.length?'neg':'',act:'kLate'},{label:'Handoffs em aberto',value:String(hand.length),sub:'passagens entre áreas',act:'kHand'},
      {label:'Top autor',value:esc(top[0]),sub:`${top[1]} relatórios em 30 dias`,act:'kTop',wide:true}])}
    ${K.group({rows:[{icon:'filtro',color:ativos.length?'rgb(var(--primary))':'#8e8e93',title:'Filtros',sub:ativos.length?esc(ativos.join(' · ')):'Período, autor, cliente e de quem',value:ativos.length?'Limpar':null,act:ativos.length?'limpar':'filtros'}]})}
    ${rows.length?K.group({title:`${rows.length} ${pl(rows.length,'relatório','relatórios')}`,foot:'Deslize para copiar o link ou excluir.',rows:rows.map(r=>{const k=KINDS.find(x=>x[0]===r.kind);
      return {icon:k?k[2]:'doc',color:r.status==='Falhou'?'rgb(var(--neg))':r.status==='Pendente revisão'?'rgb(var(--warn))':r.status==='Salvo'?'':'#8e8e93',title:esc(r.resumo),
        sub:`${esc(r.cli)} · ${esc(r.autor)} · ${quando(r.h)}`,value2:`<span class="${RCLS[r.status]||'soft'}">${r.status==='Pendente revisão'&&r.h>48?'atrasado':esc(r.status)}</span>`,value:'',href:'#/relatorios?rel='+r.id,i:r.id,
        swipe:[{label:'Copiar link',icon:'copiar',act:'link',tone:1},{label:'Excluir',icon:'lixo',act:'del',tone:3}]}})})
      :K.empty({title:'Nenhum relatório com esses filtros.',text:'Troque o período, o status ou limpe a busca.',btn:'Limpar filtros',act:'limpar'})}
    ${K.group({rows:[{icon:'doc',color:'#8e8e93',title:'Relatório geral do cliente (PDF)',sub:'Todos os registros salvos num documento',act:'geral'}]})}`}
function relDetalhe(r){const s0=relStruct(r),busy=['Recebendo','Transcrevendo','Estruturando'].includes(r.status),pend=r.status==='Pendente revisão',fail=r.status==='Falhou',ok=r.status==='Salvo';
  const li=(t,a)=>kvg(t,a.length?a.map(x=>kv('',null,esc(x))):[kv('<span class="soft">Nada citado.</span>','')],'','cs-wrap');
  return `${K.nav({title:r.cli,back:'Relatórios',kick:r.kind,sub:esc(`${r.obra||'Sem obra'} · por ${r.autor} · ${quando(r.h)}`)})}
   <div class="cs-tags">${chip(r.status,RTONE[r.status])}${pend&&r.h>48?chip('atrasado','r'):''}</div>
   ${busy?`<div class="mcard"><h3>${esc(r.status)}…</h3><p class="cs-note">A IA está organizando este relatório. Ele aparece aqui para revisão em instantes.</p><div class="prog"><b style="width:${r.status==='Estruturando'?72:36}%"></b></div></div>`:''}
   ${pend?`<div class="mcard"><p class="cs-note">Confira o que a IA estruturou. Salvo, o registro entra no histórico do cliente e da obra.</p><div class="mbtns">${K.btn('Descartar',{dng:true,act:'descartar'})}${K.btn('Salvar',{pri:true,act:'salvar'})}</div></div>`:''}
   ${fail?`<div class="mcard"><p class="cs-note">O arquivo chegou cortado e a IA não conseguiu transcrever.</p><div class="mbtns">${K.btn('Descartar',{dng:true,act:'descartar'})}${K.btn('Tentar de novo',{pri:true,act:'tentar'})}</div></div>`:''}
   ${busy?'':`${kvg('Resumo do dia',[kv('',null,esc(r.resumo))],'','cs-wrap')}${li('O que foi feito',s0.feito)}${li('Pendências',s0.pend)}${li('Próximos passos',s0.prox)}
     ${s0.mat.length?kvg('Materiais citados',[kv(s0.mat.map(m=>chip(m)).join(' '),'')]):''}
     <section class="grp"><h2>Fotos · ${s0.fotos}</h2>${s0.fotos?`<div class="cs-ph4">${Array.from({length:Math.min(4,s0.fotos)},()=>`<span aria-hidden="true">${ic('camera',20)}</span>`).join('')}</div>`:'<div class="mcard soft">Sem fotos.</div>'}</section>`}
   ${K.group({title:'Ações',rows:[...(pend?[{icon:'doc',title:'Editar o resumo',sub:'Antes de salvar',act:'editar'}]:[]),...(fail?[{icon:'som',title:'Gravar de novo',sub:'Abre um registro novo por áudio',act:'gravar'}]:[]),
     ...(ok?[{icon:'doc',title:'Salvar em PDF',act:'pdf'}]:[]),{icon:'copiar',title:'Enviar (copiar link)',act:'link1'},{icon:'lixo',color:'rgb(var(--neg))',title:'Excluir relatório',act:'del1'}]})}`}
M.mscreen('relatorios',{title:'Relatórios',tab:'relatorios',
  help:['O + cria um registro (técnico, passagem de bastão, projetos ou experiência) por texto ou áudio, com fotos.',
    'O registro fica “Pendente revisão” até alguém abrir, conferir e salvar; os quadros do topo filtram a lista e “Handoffs” abre as passagens.',
    'Deslize uma linha para copiar o link ou excluir; o relatório aberto tem Salvar, Descartar e Tentar de novo.'],
  render:q=>{const id=q.get('rel');if(id){const r=S.rel.find(x=>x.id===id);return r?relDetalhe(r):K.nav({title:'Relatório',back:'Relatórios'})+K.empty({title:'Relatório não encontrado.',text:'Ele pode ter sido excluído.'})}
    return `${K.nav({title:'Relatórios',kick:'Registros da operação',acts:[{icon:'mais',title:'Novo registro',act:'novo'}]})}
     ${K.chips('re-tab',[['0','Todos'],['1','Técnica'],['2','Comercial'],['3','Projetos'],['4','Experiência']],String(S.rf.tab))}
     ${K.search('Palavra-chave em qualquer relatório','re-q')}
     ${K.chips('re-st',[['Todos','Todos'],['Pendente revisão','Pendente revisão'],['Salvos','Salvos'],['Falharam','Falharam']],S.rf.st)}
     <div id="re-b">${relBody()}</div>`},
  mount:(v,q)=>{const id=q.get('rel');
    if(id){const r=S.rel.find(x=>x.id===id);if(!r)return;
      M.wire(v,{salvar:()=>{r.status='Salvo';rr();M.toast('Registro salvo.')},
        descartar:()=>{const old=r.status;r.status='Descartado';rr();M.toast('Registro descartado.','Desfazer',()=>{r.status=old;rr()})},
        tentar:()=>{r.status='Estruturando';rr();M.toast('Processando de novo…');setTimeout(()=>{r.status='Pendente revisão';if(location.hash.includes('rel='+r.id))rr();M.toast(`Relatório de ${r.cli} pronto para revisão.`)},1600)},
        gravar:()=>relNovo(r.kind,{cli:r.cli,obra:r.obra,modo:'Áudio'}),
        editar:()=>K.formSheet({title:'Resumo do dia',ok:'OK',cheia:false,groups:[{fields:[{k:'t',label:'Resumo',type:'textarea',req:true,value:r.resumo}],foot:'Pelo menos 10 caracteres.'}],
          onOk:x=>{if(x.t.length<10){M.toast('O resumo precisa de pelo menos 10 caracteres.');return false}r.resumo=x.t;rr();M.toast('Resumo atualizado. Falta salvar o registro.')}}),
        pdf:()=>M.toast(`Gera o PDF de “${r.kind} · ${r.cli}” (simulação).`),link1:()=>relLink(r),del1:()=>delRel(r,()=>go('#/relatorios'))});return}
    const f=S.rf,box=$('#re-b',v),qi=$('#re-q',v);
    const draw=()=>{box.innerHTML=relBody();M.wire(box,H);K.bindSwipe(box)};
    const sync=()=>{setPick(v,'re-st',f.st)};
    const autores=[...new Set(S.rel.map(r=>r.autor))],clis=[...new Set(S.rel.map(r=>r.cli))].sort();
    const H={novo:()=>K.actions({title:'Novo registro',items:KINDS.map(k=>({label:k[0],run:()=>relNovo(k[0],{},draw)}))}),
      kHoje:()=>{f.per='24';f.st='Todos';f.late=false;sync();draw()},kPend:()=>{f.st='Pendente revisão';f.late=false;f.per='todo';sync();draw()},
      kLate:()=>{f.st='Pendente revisão';f.late=true;f.per='todo';sync();draw()},kHand:()=>handSheet(draw),kTop:()=>{const c={};S.rel.filter(r=>r.h<=720).forEach(r=>c[r.autor]=(c[r.autor]||0)+1);f.autor=(Object.entries(c).sort((a,b)=>b[1]-a[1])[0]||[''])[0];draw()},
      limpar:()=>{Object.assign(f,{q:'',per:'todo',st:'Todos',autor:'',cli:'',esc:'tudo',late:false});qi.value='';sync();draw()},
      filtros:()=>K.formSheet({title:'Filtros',ok:'Aplicar',groups:[{fields:[{k:'per',label:'Período',type:'select',opts:Object.entries(PER),value:f.per},
          {k:'autor',label:'Autor',type:'select',opts:[['','Todos os autores'],...autores.map(a=>[a,a])],value:f.autor},{k:'cli',label:'Cliente',type:'select',opts:[['','Todos os clientes'],...clis.map(c=>[c,c])],value:f.cli},
          {k:'esc',label:'De quem',type:'select',opts:[['tudo','Tudo'],['meus','Meus'],['equipe','Equipe']],value:f.esc}]}],onOk:x=>{Object.assign(f,x);draw()}}),
      link:el=>relLink(S.rel.find(r=>r.id===el.dataset.i)),del:el=>delRel(S.rel.find(r=>r.id===el.dataset.i),draw),
      geral:()=>K.formSheet({title:'Relatório geral',ok:'Gerar PDF',cheia:false,groups:[{title:'Todos os registros salvos do cliente num documento só',fields:[{k:'cli',label:'Cliente',type:'select',req:true,ph:'Escolher',opts:clis},
        {k:'per',label:'Período',type:'select',opts:['Todo o período','Últimos 30 dias','Últimos 7 dias']}]}],onOk:x=>M.toast(`Gera o PDF de ${x.cli} com ${S.rel.filter(r=>r.cli===x.cli&&r.status==='Salvo').length} registros salvos (simulação).`)})};
    K.bindPick(v,'re-tab',x=>{f.tab=+x;draw()});K.bindPick(v,'re-st',x=>{f.st=x;f.late=false;draw()});qi.value=f.q;qi.oninput=()=>{f.q=qi.value;draw()};M.wire(v,H)}});

/* =====================================================================
   4 · NUMBERS (mesma lógica do mod-numbers.js: base de data única, período completo, meta sem teto, detalhamento em tudo)
   ===================================================================== */
const pad=n=>String(n).padStart(2,'0');
const pd=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d,12)};
const iso=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const addD=(s,n)=>{const d=pd(s);return iso(new Date(d.getFullYear(),d.getMonth(),d.getDate()+n,12))};
const days=(a,b)=>Math.round((pd(b)-pd(a))/864e5);
const MES=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const MESF=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const fd=s=>{const [y,m,d]=s.split('-');return `${d}/${m}/${y}`};
const fdc=(s,yr=true)=>{const d=pd(s);return `${d.getDate()} ${MES[d.getMonth()]}${yr?' '+d.getFullYear():''}`};
const plabel=(a,b)=>a.slice(0,4)===b.slice(0,4)?`${fdc(a,false)} – ${fdc(b)}`:`${fdc(a)} – ${fdc(b)}`;
const mil=v=>Math.abs(v)>=1e6?fmtN(v/1e6,1)+' mi':Math.abs(v)>=1000?fmtN(v/1000,0)+' mil':fmtN(v,0);
const kbrl=v=>'R$ '+mil(v);
const TODAY=()=>D.hoje||'2026-10-02';
const inR=(s,a,b)=>!!s&&s>=a&&s<=b;
const NB=window.__nb||(window.__nb={mode:'p',per:'6',mes:'',de:'',ate:'',base:'dec',meta:500000,metaEdit:false,evo:'rec',evoT:'line',dec:'gp',pipe:'n',rank:'pipe'});
const E=['Lead','Qualificação','Atendimento Showroom','Visita técnica','Proposta','Negociação','Decisão'];
const FAIXAS=[[0,30,'0–30 dias','0–30'],[31,60,'31–60 dias','31–60'],[61,90,'61–90 dias','61–90'],[91,120,'91–120 dias','91–120'],[121,150,'121–150 dias','121–150'],[151,1e9,'mais de 150 dias','150+']];
const faixa=d=>FAIXAS.findIndex(f=>d>=f[0]&&d<=f[1]);
const DATAS={n1:['2026-05-12','2026-07-28'],n2:['2026-06-20','2026-08-26'],n3:['2026-06-15'],n4:['2026-08-04'],n5:['2026-04-22'],n6:['2026-07-10'],
  n7:['2026-09-12'],n8:['2026-08-28'],n9:['2026-04-08','2026-10-01'],n10:['2026-09-25'],n11:['2026-07-02','2026-09-15']};
const HIST=(()=>{
  let sd=20261002;const r=()=>{sd|=0;sd=sd+0x6D2B79F5|0;let t=Math.imul(sd^sd>>>15,1|sd);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  const CLI=['Família Andrade','Marcos e Júlia Teixeira','Patrícia Moreira','Clínica Sorriso Pampulha','Leonardo Barros','Fernanda e Caio Ribeiro','Gustavo Lacerda','Renata Siqueira',
    'Otávio Mendes','Beatriz Fontes','Ricardo e Lívia Pacheco','Duarte Advogados','Sílvia Antunes','Henrique Vasconcelos','Camila e Pedro Arantes','Restaurante Quintal',
    'André Figueiredo','Juliana Castro','Mateus Coelho','Luciana e Tiago Prates','Eduardo Salles','Vanessa Queiroz'];
  const TIT=['Automação residencial','Cinema e áudio','Rede e segurança','Iluminação','Som ambiente','Wi-Fi corporativo','Persianas motorizadas','CFTV e alarme',
    'Climatização integrada','Home theater','Automação · apartamento','Upgrade de rede'];
  const ORI=['Arquiteto','Arquiteto','Engenheiro','Designer de Interiores','Indicação Interna','Relacionamento Pessoal','Instagram','Site'];
  const L=[];let id=0;
  for(let k=0;k<26;k++){const y=k<5?2024:k<17?2025:2026,m=(7+k)%12+1,q=k<12?2:k<14?3:4;
    for(let j=0;j<q;j++){const cri=`${y}-${pad(m)}-${pad(1+Math.floor(r()*27))}`;
      const x=r(),dd=x<.2?10+Math.floor(r()*21):x<.45?31+Math.floor(r()*30):x<.7?61+Math.floor(r()*30):x<.85?91+Math.floor(r()*30):x<.93?121+Math.floor(r()*30):151+Math.floor(r()*50);
      const dec=addD(cri,dd),win=r()<.52,rr2=r();
      const valor=Math.round((18000+r()*r()*240000)*100)/100;
      const n={id:'h'+(++id),titulo:TIT[Math.floor(r()*TIT.length)],cliente:CLI[Math.floor(r()*CLI.length)],valor,origem:ORI[Math.floor(r()*ORI.length)],
        resp:rr2<.5?'Allysson Moura':rr2<.9?'Felipe Nunes':'Elisa Prado',cri};
      if(dec>='2026-10-01'||(cri>='2026-01-01'&&r()<.14)){n.status='Aberto';n.etapa=E[[0,1,1,2,2,3,3,4,4,4,5,5][Math.floor(r()*12)]]}
      else{n.status=win?'Ganho':'Perdido';n.dec=dec;n.etapa='Decisão'}
      L.push(n)}}
  L.push({id:'h'+(++id),titulo:'Wi-Fi e áudio · pousada',cliente:'Hotel Serra Verde',valor:128450,origem:'Relacionamento Pessoal',resp:'Allysson Moura',cri:'2026-06-03',dec:'2026-10-01',status:'Ganho',etapa:'Decisão'});
  L.push({id:'h'+(++id),titulo:'CFTV e alarme · clínica',cliente:'Clínica Sorriso Pampulha',valor:86840.98,origem:'Indicação Interna',resp:'Felipe Nunes',cri:'2026-08-18',dec:'2026-10-02',status:'Ganho',etapa:'Decisão'});
  return L})();
function deals(){const T=TODAY();
  const live=(D.negocios||[]).map(n=>{const dt=DATAS[n.id]||[T,n.status!=='Aberto'?T:null];const st=n.status==='Ganho'||n.status==='Perdido'?n.status:'Aberto';
    return {id:n.id,titulo:n.titulo,cliente:n.cliente,valor:n.valor,origem:n.origem||'—',resp:n.resp||'—',cri:dt[0],dec:st==='Aberto'?null:(dt[1]||T),status:st,
      etapa:st==='Aberto'?((D.etapasComerciais||[])[n.etapa]||'Lead'):'Decisão'}});
  return HIST.concat(live).map(n=>({...n,dias:n.dec?days(n.cri,n.dec):null}))}
function range(){const T=TODAY(),t=pd(T);let a,b,pa,pb,kind;
  if(NB.mode==='mes'&&NB.mes){const [y,m]=NB.mes.split('-').map(Number);a=iso(new Date(y,m-1,1,12));const last=iso(new Date(y,m,0,12));b=last>T?T:last;
    pa=iso(new Date(y,m-2,1,12));pb=iso(new Date(y,m-1,0,12));kind='o mês anterior'}
  else if(NB.mode==='custom'&&NB.de&&NB.ate){a=NB.de;b=NB.ate;const len=days(a,b);pb=addD(a,-1);pa=addD(pb,-len);kind='o mesmo número de dias antes'}
  else{const p=+NB.per;a=iso(new Date(t.getFullYear(),t.getMonth()-p,1,12));b=T;pb=addD(a,-1);const da=pd(a);pa=iso(new Date(da.getFullYear(),da.getMonth()-p,1,12));kind=`os ${p} meses anteriores`}
  return {a,b,pa,pb,kind,label:plabel(a,b),plab:plabel(pa,pb)}}
function months(a,b){const out=[];let d=pd(a);d=new Date(d.getFullYear(),d.getMonth(),1,12);const multi=a.slice(0,4)!==b.slice(0,4);
  while(iso(d)<=b){const s=iso(d),e=iso(new Date(d.getFullYear(),d.getMonth()+1,0,12));
    out.push({a:s<a?a:s,b:e>b?b:e,lab:MES[d.getMonth()]+(multi?' '+String(d.getFullYear()).slice(2):''),full:MESF[d.getMonth()]+' '+d.getFullYear()});d=new Date(d.getFullYear(),d.getMonth()+1,1,12)}
  return out}
const baseShort=()=>NB.base==='dec'?'data da decisão':'data de criação da proposta';
function calc(L,a,b){const dec=NB.base==='dec';
  const decided=L.filter(n=>n.status!=='Aberto'&&n.dec&&(dec?inR(n.dec,a,b):inR(n.cri,a,b)));
  const wins=decided.filter(n=>n.status==='Ganho'),loss=decided.filter(n=>n.status==='Perdido');
  const open=L.filter(n=>n.cri<=b&&(!n.dec||n.dec>b)&&(dec||n.cri>=a));
  const r=sumA(wins.map(n=>n.valor)),g=wins.length,l=loss.length;
  return {decided,wins,loss,open,r,g,l,t:g?r/g:null,c:g+l?g/(g+l)*100:null,dias:g?sumA(wins.map(n=>n.dias))/g:null,pipe:sumA(open.map(n=>n.valor)),ref:b}}
const HOVR={'Helena Duarte':[5,0,0],'Marcos Valente':[34,2,1],'Hotel Serra Verde':[61,2,2],'Lívia Prates e Otávio Lemos':[3,0,0]};
const hsh=s=>{let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
function health(L,b){const seen={};
  L.filter(n=>n.status==='Ganho'&&n.dec&&n.dec<=b).forEach(n=>{if(seen[n.cliente])return;const h=hsh(n.cliente);
    const [dc,ch,al]=HOVR[n.cliente]||[2+h%60,[0,0,0,0,0,1,1,2][(h>>>3)%8],[0,0,0,0,0,0,1,2][(h>>>6)%8]];
    const nota=Math.max(0,Math.round(100-Math.min(40,dc*.5)-12*ch-15*al));
    seen[n.cliente]={cliente:n.cliente,dc,ch,al,nota,faixa:nota>=70?0:nota>=40?1:2}});
  return Object.values(seen).sort((x,y)=>x.nota-y.nota)}
const HF=[['Saudável','70 a 100','pos','g'],['Atenção','40 a 69','warn','w'],['Em risco','abaixo de 40','neg','r']];
function info(k,R,st){const dec=NB.base==='dec',cmp=`A comparação usa ${R.kind} (${R.plab}).`;
  const T={
    meta:['Meta do mês',[`É a receita fechada de ${MESF[pd(TODAY()).getMonth()]}, do dia 1 até hoje, dividida pela meta. ${dec?'Conta o negócio ganho cuja data da decisão cai neste mês.':'Conta o negócio criado neste mês que já foi ganho.'}`,
      'Não tem teto: passa de 100% quando a meta é superada. Na barra, o traço escuro é a meta e a parte verde é o que passou dela.','O filtro de período não muda este cartão: ele é sempre o mês corrente. A base de data, sim.']],
    rec:['Receita fechada',[dec?'Soma do valor dos negócios ganhos cuja data da decisão (o dia em que foram marcados como ganhos) cai dentro do período.':'Soma do valor dos negócios criados dentro do período que já foram ganhos, não importa quando fecharam.',
      dec?'Uma venda criada antes do período e fechada dentro dele entra. Uma criada dentro e fechada depois, não.':'Uma venda criada antes do período não entra, mesmo que tenha fechado dentro dele. Negócios ainda abertos ficam fora.',cmp]],
    tic:['Ticket médio',['Receita fechada ÷ número de negócios ganhos, com a mesma regra de data da Receita fechada.',cmp]],
    conv:['Conversão',[dec?'Ganhos ÷ (ganhos + perdas) decididos no período. Negócios ainda abertos não entram na conta.':'Dos negócios criados no período que já foram decididos: ganhos ÷ (ganhos + perdas).',
      dec?'Então uma venda criada antes do período e fechada dentro dele conta como ganho deste período.':'Os que ainda estão abertos ficam fora até serem decididos; por isso a conversão dos meses recentes ainda pode mudar.',cmp]],
    pipe:['Pipeline aberto',[dec?'Valor dos negócios que estavam abertos no último dia do período: criados até essa data e ainda sem ganho ou perda nela. No período que termina hoje, é o que está aberto agora.':'Valor dos negócios criados dentro do período que continuavam abertos no último dia dele.',cmp]],
    tempo:['Tempo médio de fechamento',['Média de dias entre a criação do negócio e a data do ganho. Só entram os ganhos do período, pela base escolhida; perdas não entram.','Quando o número cai, a empresa está fechando mais rápido (seta verde).',cmp]],
    evo:['Evolução',['Cada ponto é um mês do período, com a mesma regra dos indicadores: receita, ticket ou conversão daquele mês pela base escolhida.','O primeiro e o último mês podem estar incompletos quando o período começa ou termina no meio deles. Toque num mês para ver os negócios.']],
    dec:['Decisões comerciais',[dec?'Quantos negócios foram ganhos e perdidos em cada mês, contados no mês em que foram decididos.':'Quantos negócios criados em cada mês já foram ganhos e perdidos, contados no mês em que a proposta nasceu.','“Conversão” mostra ganhos ÷ (ganhos + perdas) de cada mês, a mesma conta do indicador.']],
    fech:['Tempo de fechamento',['Pega os negócios ganhos do período e separa pelo número de dias entre a criação e o ganho. A altura da barra é o valor fechado naquela faixa.','A barra verde é onde a empresa mais fecha em valor. O tempo médio é a média de dias de todos esses ganhos.']],
    idade:['Propostas em aberto por idade',[`Negócios abertos no fim do período (${fdc(R.b)}), separados pela idade: dias desde a criação até essa data.`,
      `Maduras são as que já têm idade igual ou maior que o tempo médio de fechamento (${st&&st.ref?fmtN(st.ref,0):'—'} dias). Já passaram do ponto em que costumam fechar: é a hora de cobrar uma decisão.`,
      st&&st.fallback?'Sem ganhos no período, o tempo médio usado é o de todo o histórico.':'O tempo médio é o mesmo do indicador “Tempo médio de fechamento”.']],
    etapa:['Pipeline por etapa',['Negócios abertos no fim do período, pela etapa atual no funil comercial. Todas as etapas aparecem, mesmo com zero, nas duas opções.','“Negócios” conta quantos; “Valor” soma o valor. É o mesmo conjunto do indicador Pipeline aberto.']],
    rank:['Ranking',['“Pipeline” mostra o valor aberto por responsável (o mesmo conjunto do Pipeline aberto).','“Quem mais indica” mostra o valor ganho no período por origem da indicação, pela base escolhida.']],
    saude:['Saúde da carteira',['Cada cliente acompanhado pela Experiência recebe uma nota de 0 a 100. Começa em 100 e perde pontos por tempo sem contato (meio ponto por dia, até 40), por chamado aberto (12 cada) e por alerta aberto (15 cada).',
      'Faixas: Saudável de 70 a 100, Atenção de 40 a 69, Em risco abaixo de 40. A média geral é a média simples das notas.',`Entram os clientes com negócio ganho até ${fdc(R.b)}. O cliente passa a ter nota quando entra na Experiência, depois do ganho.`]]};
  return T[k]}
const vr=(x,y,{pp=false,inv=false,dd=false}={})=>{
  if(x==null||y==null||(!pp&&!dd&&!y))return '<span class="faint">sem base anterior</span>';
  const d=pp||dd?x-y:(x/y-1)*100;if(Math.abs(d)<(dd?.5:.05))return '<span class="faint">igual ao anterior</span>';
  const up=d>0,good=inv?!up:up;return `<span class="${good?'pos':'neg'}">${up?'▲':'▼'} ${dd?fmtN(Math.abs(d),0)+pl(Math.round(Math.abs(d)),' dia',' dias'):fmtN(Math.abs(d),1)+(pp?' p.p.':'%')}</span> vs anterior`};
/* gráfico que mede a largura do cartão; cada mês/faixa é uma coluna tocável (abre os negócios) */
const niceStep=(raw,int)=>{if(!(raw>0))return 1;const e=Math.pow(10,Math.floor(Math.log10(raw))),f=raw/e,st=(f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10)*e;return int?Math.max(1,Math.ceil(st)):st};
function chart({labels,full,series,type='line',fmt=mil,h,w,aria,dd,marker,int=false,pctMax=false}){
  const pl0=44,pr=6,pt=22,pb=28,n=labels.length,vals=series.flatMap(s=>s.v.filter(x=>x!=null)),mx=Math.max(0,...vals),step=pctMax?(mx>75?25:niceStep(mx/3,int)):niceStep(mx/3,int),max=Math.max(step*3,mx)||1,iw=w-pl0-pr,ih=h-pt-pb;
  const X=i=>type==='bar'?pl0+(i+.5)*iw/n:pl0+(n>1?i*iw/(n-1):iw/2),Y=v=>pt+(1-v/max)*ih;
  let g='';for(let k=0;k<=Math.round(max/step);k++){const v=step*k,y=Y(v).toFixed(1);g+=`<line x1="${pl0}" x2="${w-pr}" y1="${y}" y2="${y}" style="stroke:var(--line)"/><text x="${pl0-6}" y="${(+y+4).toFixed(1)}" text-anchor="end">${esc(fmt(v))}</text>`}
  let m='';
  if(type==='bar'){const gw=iw/n*.7,bw=gw/series.length;series.forEach((s,si)=>s.v.forEach((v0,i)=>{const v=v0||0,x=X(i)-gw/2+si*bw+1.5,y=Math.min(Y(v),pt+ih-2),c=(s.cols&&s.cols[i])||s.c;
    m+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(3,bw-3).toFixed(1)}" height="${Math.max(2,pt+ih-y).toFixed(1)}" rx="3" style="fill:${c}" data-dd="${dd(s,i)}"><title>${esc((s.name?s.name+' · ':'')+(full||labels)[i]+': '+fmt(v))}</title></rect>`}))}
  else series.forEach(s=>{let d='',pen=false;s.v.forEach((v,i)=>{if(v==null){pen=false;return}d+=`${pen?'L':'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)} `;pen=true});
    m+=`<path d="${d}" style="fill:none;stroke:${s.c};stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>`;
    s.v.forEach((v,i)=>{if(v==null)return;m+=`<circle cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="5" style="fill:var(--panel);stroke:${s.c};stroke-width:3"/>`})});
  if(series.length===1){const cw=iw/n;series[0].v.forEach((v,i)=>{const cx=type==='bar'?pl0+i*cw:Math.max(pl0,X(i)-cw/2);m+=`<rect x="${cx.toFixed(1)}" y="${pt}" width="${cw.toFixed(1)}" height="${ih}" fill="transparent" data-dd="${dd(series[0],i)}"><title>${esc((full||labels)[i]+': '+(v==null?'—':fmt(v)))}</title></rect>`})}
  if(marker){const x=pl0+(marker.i+marker.f)*iw/n;m+=`<line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${pt-6}" y2="${pt+ih}" style="stroke:var(--text);stroke-width:2;stroke-dasharray:4 4"/><text class="tk" x="${(x+(marker.i>=n/2?-6:6)).toFixed(1)}" y="${pt-8}" text-anchor="${marker.i>=n/2?'end':'start'}">${esc(marker.label)}</text>`}
  const lw=Math.max(...labels.map(l=>l.length))*6.8+10,ls=Math.max(1,Math.ceil(n*lw/iw));
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(aria)}">${g}${m}${labels.map((l,i)=>i%ls?'':`<text x="${X(i).toFixed(1)}" y="${h-8}" text-anchor="middle">${esc(l)}</text>`).join('')}</svg>`}
let CHN=[];const slotN=sp=>{CHN.push(sp);return `<span class="cs-chart" data-nch="${CHN.length-1}" style="min-height:200px"></span>`};
function paintN(el){const sp=CHN[+el.dataset.nch];if(!sp||!el.isConnected)return;const w=Math.floor(el.clientWidth);if(w<80||w===el._w)return;el._w=w;
  const h=Math.round(Math.min(sp.hMax||250,Math.max(190,w*(sp.ratio||.6))));el.style.minHeight='';el.innerHTML=chart({...sp,w,h})}
const legN=items=>`<div class="cs-leg">${items.map(([c,l])=>`<span><i style="background:${c}"></i>${l}</span>`).join('')}</div>`;
let DDS={},seq=0;const regDD=sp=>{const k='d'+(++seq);DDS[k]=sp;return k};
const tileB=(label,value,sub,k,wide)=>`<button type="button" class="tile ${wide?'wide':''}" data-act="dd" data-dd="${k}"><span class="tl">${label}</span><span class="tv">${value}</span><span class="tl" style="font-size:12.5px">${sub}</span></button>`;
const barRow=(name,sub,pct,val,k,col)=>K.row({title:esc(name),sub:`${sub?sub+' ':''}<span class="cs-bar"><b style="width:${Math.max(0,Math.min(100,pct))}%${col?';background:'+col:''}"></b></span>`,value:val,act:'dd',i:k}).replace('data-act="dd"',`data-act="dd" data-dd="${k}"`);
function numBody(){DDS={};seq=0;CHN=[];
  const L=deals(),R=range(),A=calc(L,R.a,R.b),B=calc(L,R.pa,R.pb),T=TODAY(),t=pd(T),MS=months(R.a,R.b),MC=MS.map(m=>calc(L,m.a,m.b));
  const sub=(lab,extra)=>`${lab||R.label} · base: ${baseShort()}${extra?' · '+extra:''}`;
  const dealsDD=(title,rows,rl,extra,lab)=>regDD({kind:'deals',title,rows,rule:rl,ref:R.b,sub:sub(lab,extra)});
  /* meta */
  const mA=iso(new Date(t.getFullYear(),t.getMonth(),1,12)),MM=calc(L,mA,T),real=MM.r,meta=NB.meta,pct=meta?real/meta*100:0,scale=Math.max(real,meta)||1,mpos=meta/scale*100,mesNome=MESF[t.getMonth()];
  const kMeta=regDD({kind:'deals',title:`Receita de ${mesNome}`,rows:MM.wins,rule:info('rec',R)[1][0],ref:T,sub:`${plabel(mA,T)} · base: ${baseShort()}`});
  const metaCard=`<section class="grp"><h2>Meta do mês · ${mesNome}</h2><div class="mcard">
    <button type="button" class="cs-hit" data-act="dd" data-dd="${kMeta}" aria-label="Receita de ${mesNome}: ${brl(real)}. Ver os negócios"><span class="cs-big">${brl(real)}</span><span class="soft" style="font-size:15px">de ${brl(meta)} · <b class="${real>=meta?'pos':''}">${fmtN(pct,0)}%</b></span></button>
    <div class="cs-meta" role="img" aria-label="${esc(`${fmtN(pct,0)}% da meta`)}"><b class="f${real<=meta?' full':''}" style="width:${Math.min(real,meta)/scale*100}%"></b>${real>meta?`<b class="x" style="left:${mpos}%;width:${100-mpos}%"></b>`:''}<i style="left:${mpos}%"></i></div>
    <div class="cs-mlab"><span>Meta · ${kbrl(meta)}</span><b class="${real>=meta?'pos':''}">${real>=meta?(real>meta?'Superou em '+kbrl(real-meta):'Meta batida.'):'Faltam '+kbrl(meta-real)}</b></div>
    ${K.btn('Editar meta',{act:'medit'})}</div></section>`;
  /* indicadores */
  const kRec=dealsDD('Receita fechada',A.wins,info('rec',R)[1][0]),kTic=dealsDD('Ticket médio',A.wins,info('tic',R)[1][0],A.g?`${A.g} ${pl(A.g,'ganho','ganhos')}`:''),
    kConv=dealsDD('Conversão',A.decided,info('conv',R)[1][0],`${A.g} ${pl(A.g,'ganho','ganhos')} e ${A.l} ${pl(A.l,'perda','perdas')}`),
    kPipe=dealsDD('Pipeline aberto',A.open,info('pipe',R)[1][0],`abertos em ${fdc(R.b)}`),kTem=dealsDD('Tempo médio de fechamento',A.wins,info('tempo',R)[1][0]);
  const tiles=`<div class="tiles">${tileB('Receita fechada',M.brl0(A.r),vr(A.r,B.r),kRec,true)}${tileB('Ticket médio',A.t==null?'—':kbrl(A.t),vr(A.t,B.t),kTic)}${tileB('Conversão',A.c==null?'—':fmtN(A.c,1)+'%',vr(A.c,B.c,{pp:true}),kConv)}
    ${tileB('Pipeline aberto',kbrl(A.pipe),vr(A.pipe,B.pipe),kPipe)}${tileB('Fechamento médio',A.dias==null?'—':fmtN(A.dias,0)+pl(Math.round(A.dias),' dia',' dias'),vr(A.dias,B.dias,{dd:true,inv:true}),kTem)}</div>`;
  /* evolução */
  const EV={rec:[MC.map(c=>c.r),mil,'Receita fechada'],tic:[MC.map(c=>c.t),mil,'Ticket médio'],conv:[MC.map(c=>c.c),x=>fmtN(x,0)+'%','Conversão']}[NB.evo];
  const evo=`<section class="grp"><h2>Evolução</h2><div class="mcard">${K.seg('nb-evo',[['rec','Receita'],['tic','Ticket'],['conv','Conversão']],NB.evo,'Medida')}${K.seg('nb-evt',[['line','Linha'],['bar','Colunas']],NB.evoT,'Tipo de gráfico')}
    ${slotN({labels:MS.map(m=>m.lab),full:MS.map(m=>m.full),series:[{v:NB.evoT==='bar'?EV[0].map(x=>x??0):EV[0],c:'rgb(var(--primary))',name:EV[2]}],type:NB.evoT,fmt:EV[1],pctMax:NB.evo==='conv',aria:EV[2]+' por mês',
      dd:(s,i)=>dealsDD(`${EV[2]} · ${MS[i].full}`,NB.evo==='conv'?MC[i].decided:MC[i].wins,info(NB.evo==='conv'?'conv':'rec',R)[1][0],'',plabel(MS[i].a,MS[i].b))})}
    <p class="cs-note cs-gap" style="margin:8px 0 0">Toque num mês para ver os negócios.</p></div></section>`;
  /* decisões */
  const dec=`<section class="grp"><h2>Decisões comerciais</h2><div class="mcard">${K.seg('nb-dec',[['gp','Ganhos x perdas'],['cm','Conversão']],NB.dec,'Decisões')}
    ${NB.dec==='gp'?slotN({labels:MS.map(m=>m.lab),full:MS.map(m=>m.full),series:[{v:MC.map(c=>c.g),c:'rgb(var(--pos))',name:'Ganhos'},{v:MC.map(c=>c.l),c:'rgb(var(--neg))',name:'Perdas'}],type:'bar',fmt:x=>fmtN(x,0),int:true,aria:'Ganhos e perdas por mês',
       dd:(s,i)=>dealsDD(`${s.name} · ${MS[i].full}`,s.name==='Ganhos'?MC[i].wins:MC[i].loss,info('dec',R)[1][0],'',plabel(MS[i].a,MS[i].b))})
      :slotN({labels:MS.map(m=>m.lab),full:MS.map(m=>m.full),series:[{v:MC.map(c=>c.c),c:'rgb(var(--primary))',name:'Conversão'}],fmt:x=>fmtN(x,0)+'%',pctMax:true,aria:'Conversão por mês',
       dd:(s,i)=>dealsDD(`Conversão · ${MS[i].full}`,MC[i].decided,info('conv',R)[1][0],'',plabel(MS[i].a,MS[i].b))})}
    ${NB.dec==='gp'?legN([['rgb(var(--pos))',`Ganhos · ${A.g}`],['rgb(var(--neg))',`Perdas · ${A.l}`]]):`<p class="cs-note cs-gap" style="margin-bottom:0">Média do período: ${A.c==null?'—':fmtN(A.c,1)+'%'}</p>`}</div></section>`;
  /* tempo de fechamento */
  const FB=FAIXAS.map((f,i)=>A.wins.filter(n=>faixa(n.dias)===i)),FV=FB.map(x=>sumA(x.map(n=>n.valor))),top=FV.indexOf(Math.max(...FV));
  const fech=`<section class="grp"><h2>Tempo de fechamento</h2><div class="mcard"><p class="cs-note">Tempo médio: <b>${A.dias==null?'—':fmtN(A.dias,0)+' dias'}</b> entre a criação e o ganho.</p>
    ${A.g?`${slotN({labels:FAIXAS.map(f=>f[3]),full:FAIXAS.map(f=>f[2]),series:[{v:FV,c:'rgb(var(--primary))',cols:FV.map((_,i)=>i===top?'rgb(var(--pos))':'rgb(var(--primary))'),name:'Valor fechado'}],type:'bar',aria:'Valor fechado por faixa de dias até o ganho',
        dd:(s,i)=>dealsDD(`Fechados em ${FAIXAS[i][2]}`,FB[i],info('fech',R)[1][0])})}
      <p class="cs-note cs-gap" style="margin-bottom:0">Onde mais se fecha: <b>${FAIXAS[top][2]}</b> · ${kbrl(FV[top])} em ${FB[top].length} ${pl(FB[top].length,'negócio','negócios')}.</p>`
      :'<p class="cs-note" style="margin:0">Sem dados no período: nenhum negócio ganho pela base de data escolhida.</p>'}</div></section>`;
  /* propostas em aberto por idade */
  const allW=L.filter(n=>n.status==='Ganho'&&n.dec&&n.dec<=R.b),fallback=A.dias==null,refD=fallback?(allW.length?sumA(allW.map(n=>n.dias))/allW.length:null):A.dias;
  const age=n=>days(n.cri,R.b),OB=FAIXAS.map((f,i)=>A.open.filter(n=>faixa(age(n))===i)),OV=OB.map(x=>sumA(x.map(n=>n.valor)));
  const mat=refD==null?[]:A.open.filter(n=>age(n)>=refD),matV=sumA(mat.map(n=>n.valor)),mi=refD==null?-1:faixa(Math.round(refD));
  const mf=mi<0?0:Math.min(.98,Math.max(.02,(refD-FAIXAS[mi][0])/((mi===5?200:FAIXAS[mi][1]+1)-FAIXAS[mi][0])));
  const kMat=dealsDD('Propostas maduras',mat,`Negócios abertos em ${fdc(R.b)} com idade igual ou maior que o tempo médio de fechamento (${refD==null?'—':fmtN(refD,0)} dias).`);
  const idade=`<section class="grp"><h2>Propostas em aberto por idade</h2><div class="mcard">${A.open.length?`${slotN({labels:FAIXAS.map(f=>f[3]),full:FAIXAS.map(f=>f[2]),series:[{v:OV,c:'rgb(var(--primary))',cols:OV.map((_,i)=>mi>=0&&i>=mi?'rgb(var(--warn))':'rgb(var(--primary)/.45)'),name:'Em aberto'}],type:'bar',aria:'Valor em aberto por idade da proposta',
      marker:mi>=0?{i:mi,f:mf,label:`média · ${fmtN(refD,0)} dias`}:null,dd:(s,i)=>dealsDD(`Abertas há ${FAIXAS[i][2]}`,OB[i],info('idade',R,{ref:refD})[1][0])})}
    ${legN([['rgb(var(--primary)/.45)','Dentro do tempo médio'],['rgb(var(--warn))','Maduras']])}<p class="cs-note cs-gap"><b>${kbrl(matV)}</b> em ${mat.length} ${pl(mat.length,'proposta madura','propostas maduras')}: já passaram do tempo em que costumam fechar.</p>
    ${K.btn('Ver maduras',{act:'dd'}).replace('data-act="dd"',`data-act="dd" data-dd="${kMat}"`)}`:`<p class="cs-note" style="margin:0">Nenhuma proposta em aberto em ${fdc(R.b)}.</p>`}</div></section>`;
  /* pipeline por etapa */
  const EB=E.map(e=>A.open.filter(n=>n.etapa===e)),EN=EB.map(x=>x.length),EVv=EB.map(x=>sumA(x.map(n=>n.valor))),byV=NB.pipe==='v',emax=Math.max(1,...(byV?EVv:EN));
  const etapa=`${K.seg('nb-pipe',[['n','Negócios'],['v','Valor']],NB.pipe,'Medida do pipeline').replace('class="mseg"','class="mseg" style="margin-bottom:8px"')}
    <section class="grp"><h2>Pipeline por etapa · ${A.open.length} abertos · ${kbrl(A.pipe)}</h2><ul class="lst">${E.map((e,i)=>barRow(e,byV?`${EN[i]} ${pl(EN[i],'negócio','negócios')}`:kbrl(EVv[i]),(byV?EVv[i]:EN[i])/emax*100,byV?kbrl(EVv[i]):String(EN[i]),dealsDD(`Pipeline · ${e}`,EB[i],info('etapa',R)[1][0]))).join('')}</ul></section>`;
  /* ranking */
  const grp=(arr,key)=>{const o={};arr.forEach(n=>{const k=n[key]||'—';(o[k]=o[k]||[]).push(n)});return Object.entries(o).map(([k,x])=>[k,x,sumA(x.map(n=>n.valor))]).sort((a,b)=>b[2]-a[2])};
  const rk=NB.rank==='pipe'?grp(A.open,'resp'):grp(A.wins,'origem'),rmax=Math.max(1,...rk.map(r=>r[2]));
  const rank=`${K.seg('nb-rank',[['pipe','Pipeline'],['ind','Quem mais indica']],NB.rank,'Ranking').replace('class="mseg"','class="mseg" style="margin-bottom:8px"')}
    <section class="grp"><h2>Ranking · ${NB.rank==='pipe'?'pipeline por responsável':'ganhos por origem'}</h2>${rk.length?`<ul class="lst">${rk.map(([k,x,v])=>barRow(k,`${x.length} ${NB.rank==='pipe'?pl(x.length,'aberto','abertos'):pl(x.length,'ganho','ganhos')}`,v/rmax*100,kbrl(v),
      dealsDD(`${NB.rank==='pipe'?'Pipeline de':'Indicações de'} ${k}`,x,info('rank',R)[1][NB.rank==='pipe'?0:1]))).join('')}</ul>`:'<div class="mcard soft">Sem dados no período.</div>'}</section>`;
  /* saúde */
  const H=health(L,R.b),HB=HF.map((_,i)=>H.filter(c=>c.faixa===i)),avg=H.length?sumA(H.map(c=>c.nota))/H.length:null;
  const hDD=(title,rows)=>regDD({kind:'health',title,rows,sub:`${rows.length} ${pl(rows.length,'cliente','clientes')} · com negócio ganho até ${fdc(R.b)}`,rule:info('saude',R)[1][0]});
  const saude=H.length?`<section class="grp"><h2>Saúde da carteira · ${H.length} clientes</h2><div class="mcard">
      <button type="button" class="cs-hit" data-act="dd" data-dd="${hDD('Saúde da carteira · todos',H)}" aria-label="Média geral ${fmtN(avg,0)} de 100. Ver os clientes"><span class="soft" style="font-size:13px">Média geral</span><span class="cs-big ${avg>=70?'pos':avg>=40?'warn':'neg'}">${fmtN(avg,0)} <span class="soft" style="font-size:15px;font-weight:500">de 100 · ${HF[avg>=70?0:avg>=40?1:2][0]}</span></span></button>
      <div class="cs-band" role="img" aria-label="${HF.map((f,i)=>f[0]+': '+HB[i].length).join(', ')}">${HF.map((f,i)=>HB[i].length?`<b style="flex:${HB[i].length};background:rgb(var(--${f[2]}))"></b>`:'').join('')}</div>
      ${HB[2].length?`<p class="cs-note" style="margin:0">Em risco: ${HB[2].slice(0,3).map(c=>`${esc(c.cliente)} (${c.ch?c.ch+' '+pl(c.ch,'chamado','chamados'):''}${c.ch&&c.al?', ':''}${c.al?c.al+' '+pl(c.al,'alerta','alertas'):''}${!c.ch&&!c.al?c.dc+' dias sem contato':''})`).join(', ')}.</p>`:''}</div>
      <ul class="lst cs-gap">${HF.map((f,i)=>barRow(`${f[0]} · ${f[1]}`,'',H.length?HB[i].length/H.length*100:0,`${HB[i].length} · ${fmtN(H.length?HB[i].length/H.length*100:0,0)}%`,hDD('Saúde · '+f[0],HB[i]),`rgb(var(--${f[2]}))`)).join('')}</ul></section>`
    :`<section class="grp"><h2>Saúde da carteira</h2><div class="mcard"><p class="cs-note">Ainda não há notas de saúde neste período. A nota aparece quando um negócio é ganho e o cliente entra na Experiência.</p>${K.btn('Abrir Experiência',{act:'exp'})}</div></section>`;
  const como=K.group({title:'Como calculamos',rows:[['meta','Meta do mês'],['rec','Receita fechada'],['tic','Ticket médio'],['conv','Conversão'],['pipe','Pipeline aberto'],['tempo','Tempo médio de fechamento'],['evo','Evolução'],['dec','Decisões comerciais'],['fech','Tempo de fechamento'],['idade','Propostas por idade'],['etapa','Pipeline por etapa'],['rank','Ranking'],['saude','Saúde da carteira']]
    .map(([k,l])=>({icon:'olho',color:'#8e8e93',title:l,act:'info',i:k}))});
  return `<p class="cs-note"><b>${esc(R.label)}</b> · comparado com ${esc(R.plab)}. Toque em qualquer número, barra ou mês para ver os negócios.</p>${metaCard}${tiles}${evo}${dec}${fech}${idade}${etapa}${rank}${saude}${como}`}
function openDD(k){const sp=DDS[k];if(!sp)return;
  const tot=sp.kind==='deals'?sumA(sp.rows.map(n=>n.valor)):null;
  const rows=sp.kind==='deals'?[...sp.rows].sort((x,y)=>((NB.base==='dec'?y.dec||y.cri:y.cri)>(NB.base==='dec'?x.dec||x.cri:x.cri)?1:-1)):sp.rows;
  const ST={Ganho:'pos',Perdido:'neg',Aberto:''};
  const lista=sp.kind==='deals'?rows.map(n=>{const live=!!D.byId('negocios',n.id);return {i:n.id,title:esc(n.titulo),sub:`${esc(n.cliente)} · ${fd(n.cri)} → ${n.dec?fd(n.dec)+' · '+n.dias+' dias':'aberto há '+days(n.cri,sp.ref)+' dias'}`,
      value:brl(n.valor),value2:`<span class="${ST[n.status]}">${n.status}</span>`,live}}).map(r=>r.live?K.row({...r,act:'neg'}):kv(r.title,r.value,r.sub,r.value2))
    :rows.map(c=>kv(esc(c.cliente),String(c.nota),`${c.dc} dias sem contato · ${c.ch} ${pl(c.ch,'chamado','chamados')} · ${c.al} ${pl(c.al,'alerta','alertas')}`,`<span class="${HF[c.faixa][2]}">${HF[c.faixa][0]}</span>`));
  const csv=()=>{const q=v=>{const s=String(v??'');return /[";\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s};
    const lines=sp.kind==='health'?[['Cliente','Nota','Faixa','Dias sem contato','Chamados abertos','Alertas'],...rows.map(c=>[c.cliente,c.nota,HF[c.faixa][0],c.dc,c.ch,c.al])]
      :[['Negócio','Cliente','Data de criação','Data da decisão','Dias até fechar','Valor','Status','Etapa','Origem','Responsável'],...rows.map(n=>[n.titulo,n.cliente,fd(n.cri),n.dec?fd(n.dec):'',n.dec?n.dias:'',fmtN(n.valor),n.status,n.etapa,n.origem,n.resp]),['Total','','','','',fmtN(tot),'','','','']];
    const blob=new Blob(['﻿'+lines.map(l=>l.map(q).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'});
    const slug=sp.title.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`numbers-${slug}-${TODAY()}.csv`;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000);M.toast(`CSV baixado: ${rows.length} ${pl(rows.length,'linha','linhas')}.`)};
  let s;s=K.sheet({title:sp.title,cancel:'Fechar',cheia:true,body:`<p class="cs-note">${tot!=null?`<b>${brl(tot)}</b> · `:''}${esc(sp.sub)}</p><p class="cs-note">${esc(sp.rule||'')}</p>
    ${rows.length?ul(`${rows.length} ${sp.kind==='deals'?pl(rows.length,'negócio','negócios'):pl(rows.length,'cliente','clientes')}`,lista,sp.kind==='deals'?'Os negócios com seta abrem em Negócios.':''):'<div class="mcard soft">Este número é zero com os filtros atuais. Troque o período ou a base de data.</div>'}
    ${rows.length?K.btn('Exportar CSV',{pri:true,act:'csv',icon:'upload'}):''}`,
    on:{csv,neg:b=>{s.close();setTimeout(()=>go('#/negocios?card='+b.dataset.i),0)}}})}
function openInfo(k){const R=range(),L=deals(),A=calc(L,R.a,R.b);let ref=A.dias,fb=false;
  if(ref==null){const w=L.filter(n=>n.status==='Ganho'&&n.dec&&n.dec<=R.b);ref=w.length?sumA(w.map(n=>n.dias))/w.length:null;fb=true}
  const [title,ps]=info(k,R,{ref,fallback:fb});
  K.sheet({title,cancel:'Fechar',body:`<p class="cs-note"><b>Base de data:</b> ${esc(baseShort())} · ${esc(R.label)}</p>${ps.map(p=>`<p class="cs-note">${esc(p)}</p>`).join('')}`})}
const MESES26=MESF.slice(0,10).map((m,i)=>[`2026-${pad(i+1)}`,`${MES[i]} 2026`]).reverse();
M.mscreen('numbers',{title:'Numbers',tab:'numbers',
  help:['Escolha o período (3, 6 ou 12 meses, um mês ou personalizado) e a base de data: decisão ou criação da proposta. Todos os números seguem as duas escolhas.',
    'Toque em qualquer número, barra ou mês para ver os negócios daquele valor, com total e Exportar CSV.',
    'A meta passa de 100% quando é superada; “Como calculamos”, no fim, explica cada conta em palavras simples.'],
  render:()=>`${K.nav({title:'Numbers',kick:'Comercial',sub:'Leitura executiva de vendas, conversão, carteira e pipeline.'})}
    ${K.seg('nb-per',[['3','3 meses'],['6','6 meses'],['12','12 meses']],NB.mode==='p'?NB.per:'','Período')}
    ${K.chips('nb-mes',[...MESES26,['custom','Personalizado…']],NB.mode==='mes'?NB.mes:NB.mode==='custom'?'custom':'')}
    ${K.group({rows:[{icon:'agenda',color:'#8e8e93',title:'Base de data',sub:NB.base==='dec'?'Data da decisão (ganho ou perda)':'Data de criação da proposta',act:'base'}]})}
    <div id="nb-b">${numBody()}</div>`,
  mount:v=>{const box=$('#nb-b',v);
    if(window.__nbcRO)window.__nbcRO.disconnect();
    const ro=window.__nbcRO='ResizeObserver' in window?new ResizeObserver(es=>requestAnimationFrame(()=>es.forEach(e=>paintN(e.target)))):null;
    const charts=()=>{if(ro)ro.disconnect();$$('.cs-chart',box).forEach(el=>{paintN(el);ro&&ro.observe(el)})};
    const marks=()=>{setPick(v,'nb-per',NB.mode==='p'?NB.per:'');setPick(v,'nb-mes',NB.mode==='mes'?NB.mes:NB.mode==='custom'?'custom':'');$('[data-act="base"] .t2',v).textContent=NB.base==='dec'?'Data da decisão (ganho ou perda)':'Data de criação da proposta'};
    const draw=()=>{box.innerHTML=numBody();marks();wire();charts()};
    const wire=()=>{M.wire(box,H);K.bindPick(box,'nb-evo',x=>{NB.evo=x;draw()});K.bindPick(box,'nb-evt',x=>{NB.evoT=x;draw()});K.bindPick(box,'nb-dec',x=>{NB.dec=x;draw()});
      K.bindPick(box,'nb-pipe',x=>{NB.pipe=x;draw()});K.bindPick(box,'nb-rank',x=>{NB.rank=x;draw()})};
    const custom=()=>{const R=range();K.formSheet({title:'Período',ok:'Aplicar',cheia:false,groups:[{title:'Primeiro e último dia',fields:[{k:'de',label:'De',type:'date',req:true,value:NB.mode==='custom'?NB.de:R.a},{k:'ate',label:'Até',type:'date',req:true,value:NB.mode==='custom'?NB.ate:R.b}],foot:'Todos os números usam a base de data escolhida.'}],
      onOk:x=>{if(x.ate>TODAY()){M.toast('Use uma data até hoje.');return false}if(x.de>x.ate){M.toast('“De” precisa ser antes de “Até”.');return false}NB.mode='custom';NB.de=x.de;NB.ate=x.ate;draw()}});marks()};
    const H={dd:el=>openDD(el.dataset.dd),info:el=>openInfo(el.dataset.i),exp:()=>go('#/experiencia'),
      medit:()=>K.formSheet({title:'Meta do mês',ok:'Salvar',cheia:false,groups:[{title:MESF[pd(TODAY()).getMonth()],fields:[{k:'m',label:'Nova meta',type:'money',req:true,value:fmtN(NB.meta)}],foot:'A meta não tem teto: passa de 100% quando é superada.'}],
        onOk:x=>{const n=num(x.m);if(n==null||n<=0){M.toast('Informe um valor maior que zero.');return false}NB.meta=n;draw();M.toast(`Meta de ${MESF[pd(TODAY()).getMonth()]}: ${brl(n)}.`)}}),
      base:()=>K.actions({title:'Base de data de todos os números',items:[{label:'Data da decisão (ganho ou perda)',run:()=>{NB.base='dec';draw();M.toast(`Todos os números agora usam a ${baseShort()}.`)}},
        {label:'Data de criação da proposta',run:()=>{NB.base='cri';draw();M.toast(`Todos os números agora usam a ${baseShort()}.`)}}]})};
    box.addEventListener('click',e=>{const t=e.target.closest('svg [data-dd]');if(t)openDD(t.dataset.dd)});
    K.bindPick(v,'nb-per',x=>{NB.mode='p';NB.per=x;draw()});
    K.bindPick(v,'nb-mes',x=>{if(x==='custom')return custom();NB.mode='mes';NB.mes=x;draw()});
    wire();M.wire(v,H);charts()}});

/* =====================================================================
   5 · AJUSTES (+ Financeiro, Proposta, Fechamento, Módulos)
   ===================================================================== */
const IT={
 'my-account':['Minha conta','Senha, usuário e e-mail de contato.','contatos','/minha-conta',['Trocar a senha','Usuário de acesso','E-mail de contato para avisos']],
 'users':['Usuários','Equipe e dados de cada conta.','contatos','/users',['Lista da equipe com papel e situação','Convidar usuário','Editar dados e desativar acesso']],
 'permissions':['Permissões','Grupos de acesso e matriz de permissões.','chave','/permissions',['Grupos de acesso (Full, Comercial, Técnica…)','Matriz: ver, criar, editar e excluir por recurso']],
 'pipelines':['Pipeline','Etapas, cores e regras do processo comercial.','kanban','/pipelines',['Funis Comercial, Projetos e Técnica','Etapas com nome, cor e ordem','Travas (gates) que impedem avançar sem o necessário']],
 'outcome-reasons':['Motivos de ganho e perda','Vocabulário usado no encerramento dos negócios.','estrela','/ajustes/deal-outcome-reasons',['Lista de motivos de ganho','Lista de motivos de perda','Ativar e desativar motivos']],
 'proposal':['Proposta','Mão de obra e montagem das próximas propostas.','propostas','/ajustes/proposta',[],'ajustes/proposta'],
 'identidade':['Identidade da empresa','Telefone, e-mail, endereço e site da proposta.','casa','/ajustes/identidade',['Telefone, e-mail, endereço e site','Prévia de como saem no documento da proposta']],
 'closing':['Fechamento de negócio','O que é obrigatório para concluir uma venda.','check','/ajustes/fechamento',[],'ajustes/fechamento'],
 'contracts':['Contrato','Modelo .docx da empresa e os marcadores.','doc','/ajustes/contract-templates',['Envio do modelo .docx','Lista de marcadores que o modelo aceita','Geração de teste com um negócio real']],
 'fornecedores':['Regime do fornecedor','Se o regime fiscal do fornecedor entra no preço.','compras','/ajustes/fornecedores',['Chave: o regime do fornecedor entra ou não no custo','Explicação do efeito no preço de venda']],
 'financeiro':['Financeiro','Pix, avisos, aprovação, plano de contas e bancos.','financeiro','/ajustes/financeiro',[],'ajustes/financeiro'],
 'workflows':['Fluxos','Tarefas, provas, travas e automações.','trocar','/workflows',['Tarefas por etapa, com prova exigida','Travas que seguram o avanço','Automações: quando algo acontece, faça outra coisa']],
 'task-types':['Tipos de tarefa','Regras dos compromissos da agenda.','atividades','/admin/task-types',['Duração padrão e cor','Se ocupa a agenda e se exige local','Quem pode criar']],
 'calendar-resources':['Recursos da agenda','Showroom, salas, técnicos, veículos.','agenda','/admin/calendar-resources',['Cadastro de recursos reserváveis','Disponibilidade e conflitos na agenda']],
 'modules':['Módulos','Ligue ou desligue funcionalidades da conta.','grade','/ajustes/modulos',[],'ajustes/modulos'],
 'appearance':['Aparência','Cor, tema, aura e transparência.','aparencia','',[],'@pop'],
 'audit':['Auditoria','Histórico de alterações e acessos.','olho','/auditoria',['Quem mudou o quê e quando','Filtro por pessoa, data e tipo de registro','Acessos ao sistema']],
 'trash':['Itens excluídos','Restaure negócios, contatos, propostas e cards.','lixo','/admin/deleted-entities',['Negócios, contatos, propostas e cards excluídos','Restaurar com um toque','Visível só para dono e administradores']],
 'news':['Novidades','O que mudou na versão atual.','brilho','',['Abre a janela de novidades, com vídeos curtos narrados de cada mudança']],
 'tour':['Refazer tour','Rever a apresentação das áreas do Maestro.','seta','',['Mostra de novo o passeio guiado pelas áreas principais']]};
const AJ=[{label:'Conta e acesso',items:['my-account','users','permissions']},
 {label:'Comercial',items:['pipelines','outcome-reasons','proposal','identidade','closing','contracts','fornecedores','financeiro']},
 {label:'Operação',items:['workflows','task-types','calendar-resources']},{label:'Sistema',items:['modules','appearance','audit','trash']},{label:'Ajuda',items:['news','tour']}];
const AJCOR={'Conta e acesso':'#0a7aff','Comercial':'#248a3d','Operação':'#c77700','Sistema':'#6e6e73','Ajuda':'#5856d6'};
M.mscreen('ajustes',{title:'Ajustes',tab:'ajustes',
  help:['Os ajustes da empresa ficam agrupados por assunto; toque numa linha para abrir.','Financeiro, Proposta, Fechamento e Módulos abrem a página completa; Aparência abre a folha de cor e tema.',
    'Você só vê o que o seu grupo de acesso permite.'],
  render:()=>`${K.nav({title:'Ajustes',kick:'Sistema',sub:'Configurações da empresa organizadas por assunto.'})}
    ${AJ.map(g=>K.group({title:g.label,rows:g.items.map(id=>{const [l,d,icon,,,page]=IT[id];return {icon,color:AJCOR[g.label],title:l,sub:d,...(page&&page!=='@pop'?{href:'#/'+page}:{act:page==='@pop'?'apar':'item',i:id})}})})).join('')}`,
  mount:v=>M.wire(v,{apar:()=>K.aparencia(),item:el=>{const id=el.dataset.i,[l,d,,to,about]=IT[id],g=AJ.find(x=>x.items.includes(id));let s;
    s=K.sheet({title:l,cancel:'Fechar',body:`<p class="cs-note">${esc(d)}</p>${kvg('O que tem',about.map(a=>kv('',null,esc(a))),'','cs-wrap')}${to?kvg('Onde fica no Maestro',[kv(`<span style="font-family:var(--mono);font-size:13px">${esc(to)}</span>`,'')]):''}
      <p class="cs-note">${id==='news'||id==='tour'?'É uma ação, não uma página: abre por cima da tela em que você está.':`Esta página de ${esc(g.label)} ainda não foi redesenhada para o celular; a versão em uso continua valendo.`}</p>
      ${id==='news'?K.btn('Ver novidades',{pri:true,act:'nov'}):id==='tour'?K.btn('Começar o tour',{pri:true,act:'tour'}):''}`,
      on:{nov:()=>{s.close();M.toast('Abre a janela de Novidades com os vídeos da versão (simulação).')},tour:()=>{s.close();M.toast('Tour reiniciado (simulação).')}}})}})});

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
const NAT={BANK:['Conta em banco','Entra no saldo consolidado.'],CASH:['Caixa em espécie','Dinheiro em mãos. Entra no saldo consolidado.'],
  UNIDENTIFIED:['A identificar','Valor do extrato sem dono. Fora do consolidado.'],CREDIT_CARD:['Cartão de crédito','Compras entram na fatura. Nasce fora do consolidado.']};
const SOBRE=[['TOTAL_DO_NEGOCIO','Valor total do negócio','Paga mais e mais cedo. Se a obra cair, a comissão já saiu.'],['RECEBIDO','Só o que entrou','Nunca paga comissão de dinheiro que não entrou.'],['MARGEM','Recebido menos o custo da obra','Alinha o parceiro à rentabilidade. Exige custo lançado na obra.']];
let finDr=null;
function ajFinBody(){const f=finDr,despesas=S.plano.filter(g=>g.nat==='Despesa').flatMap(g=>g.contas.filter(c=>c.on).map(c=>c.nome)),tot=sumA(S.bancos.filter(b=>b.cons&&b.on).map(b=>b.saldo));
  return `<div id="af-form">${K.form([{title:'Pix no aviso de cobrança',fields:[{k:'pixTipo',label:'Tipo de chave',type:'select',opts:['CNPJ','CPF','E-mail','Telefone','Chave aleatória'],value:f.pixTipo},
      {k:'pix',label:'Chave Pix',value:f.pix,ph:'Em branco: sem Pix'},{k:'pnome',label:'Recebedor',value:f.pnome,ph:'Nome da empresa'},{k:'pcid',label:'Cidade',value:f.pcid,ph:'Belo Horizonte'}],
      foot:'A chave é estática: não identifica quem pagou. A baixa continua sendo registrada por quem confere o extrato.'}])}
    ${ul('Avisos por e-mail',[tgRow('avisos',f.avisos,'Avisos automáticos por e-mail','O cliente recebe o aviso de cobrança com o link e o Pix.'),tgRow('antes',f.antes,'Antes do vencimento','',!f.avisos),tgRow('nodia',f.nodia,'No dia do vencimento','',!f.avisos),tgRow('atraso',f.atraso,'Lembretes de atraso','',!f.avisos)])}
    <div class="${f.avisos&&f.antes?'':'cs-off'}" id="af-dias">${K.form([{fields:[{k:'dias',label:'Dias antes',type:'number',value:String(f.dias)}],foot:'De 1 a 30 dias antes do vencimento.'}])}</div>
    ${ul('Aprovação',[tgRow('aprov',f.aprov,'Exigir aprovação para pagar','Pagamento acima do valor espera quem pode aprovar.')],'','',)}
    <div class="${f.aprov?'':'cs-off'}" id="af-apv">${K.form([{fields:[{k:'aprovMin',label:'A partir de',type:'money',value:fmtN(f.aprovMin)}]}])}</div>
    ${ul('Comissão de parceiro',[tgRow('com',f.com,'Comissão de parceiro','Arquiteto, engenheiro ou designer que indicou recebe um percentual.')])}
    <div class="${f.com?'':'cs-off'}" id="af-com">${K.form([{fields:[{k:'comPct',label:'Percentual (%)',type:'number',value:String(f.comPct)},{k:'comQuando',label:'Quando pagar',type:'select',opts:['Uma vez, quando o negócio fecha','A cada parcela recebida'],value:f.comQuando},
        {k:'comConta',label:'Conta da despesa',type:'select',opts:despesas,value:f.comConta}],foot:f.comPct?'':'Ligada com 0% não gera nada.'}])}
      ${ul('Sobre o quê',SOBRE.map(([k,t,d])=>rdRow('sobre',k,f.comSobre===k,t,d)))}${ul('',[tgRow('comDividir',f.comDividir,'Dividir entre os parceiros','Com dois ou mais parceiros, o percentual é repartido.')])}</div></div>
    ${S.plano.map(g=>K.group({title:`${g.nome} · ${g.nat}`,rows:[...g.contas.map((c,i)=>({title:`${esc(c.cod)} · ${esc(c.nome)}`,sub:[c.sys?'usada pelo sistema':'',c.on?'ativa':'desativada'].filter(Boolean).join(' · '),value2:c.on?'':'<span class="soft">desativada</span>',value:c.on?null:'',act:'conta',i:g.id+'|'+i})),
      {icon:'pontos',color:'#8e8e93',title:g.contas.length?'Renomear ou apagar o grupo':'Grupo sem contas · renomear ou apagar',act:'grupo',i:g.id}]})).join('').replace('<section class="grp">','<section class="grp"><h2 style="font-size:17px;text-transform:none;color:var(--text);letter-spacing:0;margin-bottom:10px">Plano de contas</h2></section><section class="grp">')}
    ${K.group({rows:[{icon:'mais',title:'Novo grupo',act:'ngrupo',chev:false},{icon:'mais',title:'Nova conta no plano',act:'nconta',chev:false}],foot:'O grupo define a linha do Resultado. Plano de contas e contas bancárias salvam na hora.'})}
    ${K.group({title:`Contas bancárias · consolidado ${M.brl0(tot)}`,rows:[...S.bancos.map((b,i)=>({icon:b.nat==='CREDIT_CARD'?'financeiro':b.nat==='CASH'?'caixa':b.nat==='UNIDENTIFIED'?'filtro':'casa',color:b.on?'':'#8e8e93',
      title:esc(b.nome),sub:`${NAT[b.nat][0]}${b.nat==='CREDIT_CARD'?` · fecha dia ${b.fech}, vence dia ${b.venc}`:''} · ${b.cons?'entra':'fora'}${b.on?'':' · desativada'}`,value:brl(b.saldo),act:'banco',i})),
      {icon:'mais',title:'Nova conta bancária',act:'nbanco',chev:false}]})}
    <div class="cs-pad" id="af-pad" hidden></div>
    <div class="cs-bar2" id="af-bar" hidden role="region" aria-label="Alterações não salvas"><b>Alterações não salvas</b><button type="button" data-act="discard">Descartar</button><button type="button" class="p" data-act="save">Salvar</button></div>`}
function bancoSheet(b,after){const isNew=!b;
  const s=K.formSheet({title:isNew?'Nova conta':'Editar conta',ok:isNew?'Criar':'Salvar',groups:[{title:'A conta por onde o dinheiro entra e sai',fields:[{k:'nome',label:'Nome',req:true,value:b?b.nome:'',ph:'Ex.: Itaú conta corrente'},
      ...(isNew?[{k:'nat',label:'Natureza',type:'select',req:true,ph:'Escolher',opts:Object.entries(NAT).filter(([k])=>k!=='UNIDENTIFIED').map(([k,x])=>[k,x[0]])}]:[]),
      {k:'saldo',label:'Saldo inicial',type:'money',value:b?fmtN(b.saldo):'',ph:'0,00'},{k:'data',label:'Data do saldo',type:'date',value:'2026-01-01'},
      {k:'fech',label:'Fechamento',type:'number',value:b&&b.fech?String(b.fech):'',ph:'Dia, ex.: 5'},{k:'venc',label:'Vencimento',type:'number',value:b&&b.venc?String(b.venc):'',ph:'Dia, ex.: 12'},
      {k:'cons',label:'Entra no consolidado',type:'select',opts:['Sim','Não'],value:b?(b.cons?'Sim':'Não'):'Sim'}],foot:isNew?'A natureza é escolhida uma vez: depois não muda.':''}],
    onOk:x=>{const nat=isNew?x.nat:b.nat,sv=num(x.saldo)??0;
      if(x.saldo&&num(x.saldo)==null){M.toast('Saldo inicial inválido.');return false}
      if(nat==='CREDIT_CARD'){const f=+x.fech,vv=+x.venc;if(!(f>=1&&f<=31)||!(vv>=1&&vv<=31)){M.toast('Informe o dia de fechamento e o de vencimento da fatura (1 a 31).');return false}}
      const o={nome:x.nome,saldo:sv,cons:nat==='UNIDENTIFIED'?false:x.cons==='Sim',fech:+x.fech||undefined,venc:+x.venc||undefined};
      if(isNew)S.bancos.push({id:'b'+Date.now(),nat,on:true,mov:false,...o});else Object.assign(b,o);after();M.toast(isNew?'Conta criada.':'Conta salva.')}});
  const sync=()=>{const nat=isNew?$('[name=nat]',s.el).value:b.nat,card=nat==='CREDIT_CARD';['fech','venc'].forEach(k=>$(`[name="${k}"]`,s.el).closest('.fr').style.display=card?'':'none');
    if(isNew&&nat)$('[name=cons]',s.el).value=card?'Não':'Sim'};if(isNew)$('[name=nat]',s.el).onchange=sync;sync()}
M.mscreen('ajustes/financeiro',{title:'Ajustes · Financeiro',tab:'ajustes',
  help:['Preencha o Pix para o aviso de cobrança trazer o copia-e-cola; ligue os avisos por e-mail e diga quantos dias antes.',
    'Ligue a aprovação se pagamento acima de um valor precisar de aprovação; ao mudar algo, a barra “Alterações não salvas” aparece embaixo.',
    'Plano de contas e contas bancárias salvam na hora: toque numa linha para renomear, desativar ou apagar.'],
  render:()=>{finDr=clone(S.fin);return `${K.nav({title:'Financeiro',back:'Ajustes',kick:'Ajustes · Comercial',sub:'Chave Pix, avisos de cobrança, comissão de parceiro, plano de contas e contas bancárias.'})}<div id="af-b">${ajFinBody()}</div>`},
  mount:v=>{const box=$('#af-b',v);
    const dirty=()=>{const d=JSON.stringify(finDr)!==JSON.stringify(S.fin);$('#af-bar',v).hidden=!d;$('#af-pad',v).hidden=!d};
    const rd=()=>{const g=k=>{const e=$(`#af-form [name="${k}"]`,v);return e?e.value.trim():''};
      Object.assign(finDr,{pixTipo:g('pixTipo'),pix:g('pix'),pnome:g('pnome'),pcid:g('pcid'),dias:parseInt(g('dias'))||0,aprovMin:num(g('aprovMin'))??0,comPct:num(g('comPct'))??0,comQuando:g('comQuando'),comConta:g('comConta')})};
    const dis=()=>{$('#af-dias',v).classList.toggle('cs-off',!(finDr.avisos&&finDr.antes));$('#af-apv',v).classList.toggle('cs-off',!finDr.aprov);$('#af-com',v).classList.toggle('cs-off',!finDr.com);
      ['antes','nodia','atraso'].forEach(k=>{const b=$(`[data-act="sw"][data-k="${k}"]`,v);b.disabled=!finDr.avisos})};
    const draw=()=>{rd();box.innerHTML=ajFinBody();bind();dis();dirty()};
    const bind=()=>{M.wire(box,H);const f=$('#af-form',box);['input','change'].forEach(t=>f.addEventListener(t,()=>{rd();dirty()}))};
    const G=id=>S.plano.find(g=>g.id===id);
    const nome=(title,cur,ph,cb)=>K.formSheet({title,ok:'Salvar',cheia:false,groups:[{fields:[{k:'nome',label:'Nome',req:true,value:cur||'',ph}]}],onOk:x=>cb(x.nome)});
    const H={sw:b=>{const k=b.dataset.k;finDr[k]=flipSw(b);dis();dirty()},
      rd:b=>{finDr.comSobre=b.dataset.v;$$('[data-g="sobre"]',box).forEach(x=>{const on=x===b;x.setAttribute('aria-checked',on);$('.cs-rd',x).innerHTML=on?ic('check',16):''});dirty()},
      discard:()=>{finDr=clone(S.fin);box.innerHTML=ajFinBody();bind();dis();dirty();M.toast('Alterações descartadas.')},
      save:()=>{rd();if(finDr.pix&&(!finDr.pnome||!finDr.pcid))return M.toast('Com chave Pix, o nome do recebedor e a cidade são obrigatórios.');
        if(finDr.avisos&&finDr.antes&&(finDr.dias<1||finDr.dias>30))return M.toast('Dias antes do vencimento: use de 1 a 30.');
        if(finDr.com&&(finDr.comPct<0||finDr.comPct>100))return M.toast('Percentual da comissão: use de 0 a 100.');
        S.fin=clone(finDr);dirty();M.toast('Configuração do financeiro salva.')},
      ngrupo:()=>K.formSheet({title:'Novo grupo',ok:'Criar',cheia:false,groups:[{fields:[{k:'nome',label:'Nome',req:true,ph:'Ex.: Investimentos'},{k:'nat',label:'Natureza',type:'select',req:true,ph:'Escolher',opts:['Receita','Despesa','Financeira']}],foot:'As contas do grupo herdam a natureza.'}],
        onOk:x=>{S.plano.push({id:'g'+Date.now(),nome:x.nome,nat:x.nat,contas:[]});draw();M.toast('Grupo criado.')}}),
      nconta:()=>K.formSheet({title:'Nova conta',ok:'Criar',cheia:false,groups:[{fields:[{k:'g',label:'Grupo',type:'select',req:true,ph:'Escolher',opts:S.plano.map(g=>[g.id,g.nome+' · '+g.nat])},{k:'cod',label:'Código',ph:'Só número, ex.: 8'},{k:'nome',label:'Nome',req:true,ph:'Ex.: Energia elétrica'}],foot:'O grupo define em que linha do Resultado os lançamentos aparecem.'}],
        onOk:x=>{if(x.cod&&!/^\d+$/.test(x.cod)){M.toast('Código: só número, como 8.');return false}const g=G(x.g),pre=g.contas[0]?g.contas[0].cod.split('.')[0]:String(S.plano.indexOf(g)+1);
          g.contas.push({cod:pre+'.'+(x.cod||g.contas.length+1),nome:x.nome,on:1});draw();M.toast('Conta criada.')}}),
      grupo:el=>{const g=G(el.dataset.i);K.actions({title:`Grupo ${g.nome}`,items:[{label:'Renomear',run:()=>nome('Renomear grupo',g.nome,'Ex.: Investimentos',n=>{g.nome=n;draw();M.toast('Nome alterado.')})},
        {label:'Apagar',dng:true,run:()=>g.contas.length?M.toast('Não se apaga: tem contas dentro. Desative as contas do grupo antes.'):K.confirm({title:`Apagar o grupo “${g.nome}”?`,ok:'Apagar',dng:true,run:()=>{S.plano.splice(S.plano.indexOf(g),1);draw();M.toast('Apagado.')}})}]})},
      conta:el=>{const [gid,i]=el.dataset.i.split('|'),g=G(gid),c=g.contas[+i];K.actions({title:`${c.cod} · ${c.nome}`,items:[{label:'Renomear',run:()=>nome('Renomear conta',c.nome,'Ex.: Energia elétrica',n=>{c.nome=n;draw();M.toast('Nome alterado.')})},
        {label:c.on?'Desativar':'Reativar',run:()=>{if(c.sys&&c.on)return M.toast('Usada pelo sistema: não pode ser desativada.');c.on=c.on?0:1;draw();M.toast(c.on?'Reativada.':'Desativada: sai das listas, o histórico fica.')}},
        {label:'Apagar',dng:true,run:()=>(c.sys||c.lanc)?M.toast('Não se apaga: tem lançamento ou é usada pelo sistema.'):K.confirm({title:`Apagar ${c.cod} · ${c.nome}?`,ok:'Apagar',dng:true,run:()=>{g.contas.splice(+i,1);draw();M.toast('Apagada.')}})}]})},
      nbanco:()=>bancoSheet(null,draw),
      banco:el=>{const b=S.bancos[+el.dataset.i];K.actions({title:b.nome,items:[{label:'Editar conta',run:()=>bancoSheet(b,draw)},
        {label:b.on?'Desativar':'Reativar',run:()=>{if(b.nat==='UNIDENTIFIED'&&b.on)return M.toast('A conta “a identificar” é usada pela conciliação e não se desativa.');b.on=!b.on;draw();M.toast(b.on?'Reativada.':'Desativada: sai das listas, o histórico fica.')}},
        {label:'Apagar',dng:true,run:()=>b.mov||b.nat==='UNIDENTIFIED'?M.toast('Não se apaga: tem movimento, transferência, extrato ou lançamento previsto.'):K.confirm({title:`Apagar ${b.nome}?`,ok:'Apagar',dng:true,run:()=>{S.bancos.splice(S.bancos.indexOf(b),1);draw();M.toast('Apagada.')}})}]})}};
    bind();dis();M.wire(v,H)}});

/* ---- Ajustes › Proposta ---- */
if(!S.prop)S.prop={escopo:'amb',tit:'Serviço especializado',txt:'Instalação, configuração e programação dos equipamentos, com testes e treinamento de uso.',dias:15};
const ESC=[['amb','Uma por ambiente','Cada ambiente ganha a sua linha de mão de obra, calculada sobre os equipamentos daquele ambiente.'],
  ['opt','Uma por opção, no fim','Uma única linha fecha cada opção, calculada sobre os equipamentos da opção inteira.']];
const propPrev=()=>{const p=S.prop,amb=['Sala de estar','Cozinha','Suíte master'];
  return kvg('Como fica na proposta',[...(p.escopo==='amb'?amb.flatMap(a=>[kv(a,'','equipamentos'),kv(`${esc(p.tit)} · ${a}`,'','mão de obra')]):[...amb.map(a=>kv(a,'','equipamentos')),kv(`<b>${esc(p.tit)} · opção inteira</b>`,'','mão de obra')])],`Validade impressa: ${p.dias} dias a partir do envio.`)};
M.mscreen('ajustes/proposta',{title:'Ajustes · Proposta',tab:'ajustes',
  help:['Escolha onde entra a mão de obra: uma linha por ambiente ou uma por opção, no fim. Salva na hora.','O serviço padrão define título e texto dos novos itens Serviço.',
    'A validade conta do envio e sai impressa no documento; o quadro do fim mostra o efeito.'],
  render:()=>{const p=S.prop;return `${K.nav({title:'Proposta',back:'Ajustes',kick:'Ajustes · Comercial',sub:'Vale das próximas inserções em diante: proposta já gravada não muda de valor.'})}
    ${ul('Mão de obra',ESC.map(([k,t,d])=>rdRow('esc',k,p.escopo===k,t,d)),'Onde a linha de serviço entra quando você adiciona equipamentos.')}
    <div id="pp-srv">${K.form([{title:'Serviço padrão',fields:[{k:'tit',label:'Título',req:true,value:p.tit,ph:'Serviço especializado'},{k:'txt',label:'Texto completo',type:'textarea',value:p.txt}],foot:'Cada item criado pode ser ajustado depois, sem mudar este padrão.'}])}
      <div class="cs-gap">${K.btn('Salvar padrão do serviço',{act:'savesrv'})}</div></div>
    <div id="pp-val" class="cs-gap" style="margin-top:24px">${K.form([{title:'Validade da proposta',fields:[{k:'dias',label:'Dias',type:'number',value:String(p.dias)}],foot:'Contados do envio. Documento já enviado não muda.'}])}
      <div class="cs-gap">${K.btn('Salvar validade',{act:'saveval'})}</div></div>
    <div id="pp-prev" style="margin-top:24px">${propPrev()}</div>`},
  mount:v=>{const p=S.prop,prev=()=>{$('#pp-prev',v).innerHTML=propPrev()};
    M.wire(v,{rd:b=>{if(p.escopo===b.dataset.v)return;p.escopo=b.dataset.v;$$('[data-g="esc"]',v).forEach(x=>{const on=x===b;x.setAttribute('aria-checked',on);$('.cs-rd',x).innerHTML=on?ic('check',16):''});prev();M.toast('Parametrização da proposta atualizada.')},
      savesrv:()=>{const t=$('#pp-srv [name=tit]',v),tx=t.value.trim();if(!tx){t.closest('.fr').classList.add('err');t.focus();return M.toast('O título do serviço é obrigatório.')}t.closest('.fr').classList.remove('err');p.tit=tx;p.txt=$('#pp-srv [name=txt]',v).value.trim();prev();M.toast('Padrão do serviço salvo.')},
      saveval:()=>{const i=$('#pp-val [name=dias]',v),n=Number(i.value.trim());if(!Number.isInteger(n)||n<1||n>365){i.closest('.fr').classList.add('err');i.focus();return M.toast('Use um número inteiro de 1 a 365.')}i.closest('.fr').classList.remove('err');p.dias=n;prev();M.toast('Validade salva.')}})}});

/* ---- Ajustes › Fechamento ---- */
const FECH=[['exigirParceirosFechamento','Exigir Arquiteto e Engenheiro','Ligada: o fechamento exige informar Arquiteto e Engenheiro (contato ou “Não tem”). Desligada: os dois viram opcionais.',true],
 ['exigirDescricaoMinima','Exigir descrição mínima','Ligada: a descrição geral do projeto precisa de pelo menos 50 caracteres.',true],
 ['exigirPagamentoMinimo','Exigir forma de pagamento detalhada','Ligada: a forma de pagamento precisa de pelo menos 30 caracteres.',true],
 ['exigirEnderecoObra','Exigir endereço da obra','Ligada: ao desmarcar “mesmo do contato”, rua, cidade e UF são obrigatórios.',true],
 ['exigirCpfEmailFechamento','Exigir CPF e e-mail no fechamento','Ligada: CPF e e-mail do cliente e do cônjuge travam o fechamento. Desligada: o sistema avisa, mas permite. Telefone continua obrigatório.',true],
 ['exigirCadastroCompletoCliente','Exigir cadastro completo do cliente','Ligada: nascimento, RG, órgão emissor e estado civil travam o fechamento. Desligada: só avisa.',false],
 ['exigirCondicaoPagamento','Exigir condição de pagamento em parcelas','Ligada: cada parcela vira um título a receber no Financeiro. Exige o módulo Financeiro ativo.',false],
 ['exigirFaturamento','Exigir “Faturar para” no fechamento','Ligada: só conclui depois de escolher em nome de quem faturar. Desligada: fatura no nome do cliente.',false],
 ['exibirFormularioEscopoFechamento','Mostrar o passo “Escopo e pré-projeto”','Ligada: a IA propõe o escopo e as tarefas da obra, e quem fecha aprova ou ajusta.',true]];
const PASS=[['nao','Não pedir','O fechamento termina no ganho, sem falar da passagem de bastão.'],['pede','Pedir (padrão)','Depois do ganho, oferece registrar a passagem agora ou deixar uma tarefa no card da obra.'],
  ['obriga','Exigir','Depois do ganho, só aparece “Registrar agora”; se fechar a janela, a tarefa fica no card da obra.']];
if(!S.fech){S.fech={pass:'pede'};FECH.forEach(([k,,,on])=>S.fech[k]=on)}
if(!S.mod)S.mod=[{k:'painel_360',n:'Painel 360',d:'Cada obra com campo, comercial, compras e financeiro numa tela só.',i:'painel',on:true},
  {k:'compras',n:'Compras',d:'O que falta comprar de cada obra, pedidos e fornecedores.',i:'compras',on:true},
  {k:'estoque',n:'Estoque',d:'Saldo por depósito, movimentos e reservas por obra.',i:'estoque',on:true},
  {k:'financeiro',n:'Financeiro',d:'A receber, a pagar, previsão de caixa e resultado.',i:'financeiro',on:true},
  {k:'contratos',n:'Contratos',d:'Modelo .docx da empresa e geração do contrato no fechamento.',i:'doc',on:false},
  {k:'suporte',n:'Suporte',d:'Botão “?” com ajuda e chamado em cada tela.',i:'chat',on:false,cfg:false}];
const fechCnt=()=>`${FECH.filter(([k])=>S.fech[k]).length} de ${FECH.length} ligadas`;
M.mscreen('ajustes/fechamento',{title:'Ajustes · Fechamento',tab:'ajustes',
  help:['Cada chave liga ou desliga uma exigência do fechamento; salva na hora.','O valor fechado é sempre obrigatório e não tem chave.','Passagem de bastão: escolha se o sistema não pede, pede ou exige o registro depois do ganho.'],
  render:()=>`${K.nav({title:'Fechamento',back:'Ajustes',kick:'Ajustes · Comercial',sub:'O que é exigido para fechar um negócio nesta empresa.'})}
    <section class="grp"><h2 id="fe-cnt">Exigências · ${fechCnt()}</h2><ul class="lst">${FECH.map(([k,t,d])=>tgRow(k,S.fech[k],t,d)).join('')}</ul><div class="foot">O valor fechado é sempre obrigatório e não tem chave.</div></section>
    ${ul('Passagem de bastão · depois do ganho',PASS.map(([k,t,d])=>rdRow('pass',k,S.fech.pass===k,t,d)))}`,
  mount:v=>M.wire(v,{sw:b=>{const k=b.dataset.k;S.fech[k]=flipSw(b);$('#fe-cnt',v).textContent='Exigências · '+fechCnt();
      if(k==='exigirCondicaoPagamento'&&S.fech[k]&&!S.mod.find(m=>m.k==='financeiro').on)M.toast('Ligada, mas o módulo Financeiro está desativado: o passo só aparece com ele ativo.');
      else M.toast(`${FECH.find(f=>f[0]===k)[1]}: ${S.fech[k]?'ligada':'desligada'}.`)},
    rd:b=>{S.fech.pass=b.dataset.v;$$('[data-g="pass"]',v).forEach(x=>{const on=x===b;x.setAttribute('aria-checked',on);$('.cs-rd',x).innerHTML=on?ic('check',16):''});M.toast('Passagem de bastão atualizada.')}})});

/* ---- Ajustes › Módulos ---- */
M.mscreen('ajustes/modulos',{title:'Ajustes · Módulos',tab:'ajustes',
  help:['Desligar esconde o módulo do menu e das telas; os dados ficam guardados.','Religar restaura tudo como estava.','O Suporte só liga depois de configurado na instalação; a linha diz o que falta.'],
  render:()=>`${K.nav({title:'Módulos',back:'Ajustes',kick:'Ajustes · Sistema',sub:'Desligar não apaga dados: religar restaura tudo.'})}
    <section class="grp"><h2 id="mo-cnt">${S.mod.filter(m=>m.on).length} de ${S.mod.length} ativos</h2><ul class="lst">${S.mod.map(m=>tgRow(m.k,m.on,`${ic(m.i,18)} ${esc(m.n)}`,m.cfg===false?`${esc(m.d)} <span class="warn">Falta configurar a conexão do Suporte nesta instalação. Fale com quem administra o Maestro.</span>`:esc(m.d),m.cfg===false)).join('')}</ul></section>`,
  mount:v=>M.wire(v,{sw:b=>{const m=S.mod.find(x=>x.k===b.dataset.k),cnt=()=>$('#mo-cnt',v).textContent=`${S.mod.filter(x=>x.on).length} de ${S.mod.length} ativos`;
    if(m.on)K.confirm({title:`Desativar ${m.n}?`,text:'Some do menu e das telas. Os dados ficam guardados.',ok:'Desativar',dng:true,run:()=>{m.on=false;flipSw(b);cnt();M.toast(`Módulo “${m.n}” desativado.`)}});
    else{m.on=true;flipSw(b);cnt();M.toast(`Módulo “${m.n}” ativado.`)}}})});
})();

/* Maestro OS · protótipo · mod-numbers — tela Numbers (#/numbers), versão 2
   Substitui a versão de mod-sistema.js (carregado depois dele no index.html).
   Origem: feedback de um cliente sobre o Numbers real (02/10/2026):
   1 base de data única e explícita · 2 período completo · 3 meta sem teto · 4 etapas iguais nas duas medidas
   5 saúde da carteira explicada · 6 detalhamento em tudo (com CSV) · 7 tempo de fechamento e idade das propostas abertas.
   Todos os números são calculados dos negócios abaixo, conforme filtros. Nada fixo. Estado em window.__nb. */
(function(){
const {brl,$,$$,esc}=M, U=M.ui, D=M.D;

/* ---------- CSS próprio (prefixo nb-, múltiplos de 4, só variáveis do tema) ---------- */
if(!document.getElementById('nb-css'))document.head.insertAdjacentHTML('beforeend',`<style id="nb-css">
.nb-sm{font-size:12px}
.nb-blk{display:block}
.nb-per{margin:-8px 0 24px;gap:8px}
.nb-svg{width:100%;height:auto;display:block;overflow:visible}
.nb-svg text{font-size:12px;fill:var(--faint)}
.nb-svg text.nb-tk{fill:var(--text);font-weight:600}
.nb-svg [role=button]{cursor:pointer;transition:opacity .2s var(--ease)}
.nb-svg [role=button]:hover{opacity:.78}
.nb-svg [role=button]:focus{outline:none}
.nb-svg [role=button]:focus-visible{stroke:var(--text);stroke-width:3}
.seg.nb-seg{height:36px;border-radius:10px}
.seg.nb-seg button{font-size:12.5px;border-radius:6px}
.nb-kpi{display:flex;flex-direction:column;gap:8px;min-width:0}
.nb-hit{display:flex;flex-direction:column;gap:8px;align-items:flex-start;border:0;background:transparent;padding:4px;margin:-4px;color:inherit;font:inherit;text-align:left;cursor:pointer;border-radius:8px;min-width:0;max-width:calc(100% + 8px)}
.nb-hit:hover .nb-v,.nb-hit:hover .big{color:rgb(var(--primary))}
.nb-v{font-size:24px;font-weight:600;letter-spacing:-.02em;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;transition:color .2s var(--ease)}
.nb-rows{container-type:inline-size}
.nb-hrow{display:grid;grid-template-columns:minmax(112px,184px) minmax(0,1fr) minmax(88px,128px);gap:16px;align-items:center;min-height:44px;width:calc(100% + 16px);margin:0 -8px;padding:4px 8px;border:0;background:transparent;border-radius:8px;color:inherit;font:inherit;text-align:left;cursor:pointer}
.nb-hrow:hover{background:color-mix(in srgb,var(--text) 4%,transparent)}
.nb-hrow>b{text-align:right}
.nb-hrow.zero .nb-hn,.nb-hrow.zero>b{color:var(--faint);font-weight:500}
.nb-hn{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nb-hbar{height:12px;border-radius:999px;background:color-mix(in srgb,var(--text) 7%,transparent);overflow:hidden}
.nb-hbar>b{display:block;height:100%;border-radius:999px;background:rgb(var(--primary));transition:width .5s var(--ease)}
.nb-meta{position:relative;height:16px;border-radius:999px;background:color-mix(in srgb,var(--text) 7%,transparent)}
.nb-meta>b{position:absolute;top:0;bottom:0;display:block}
.nb-mf{left:0;background:rgb(var(--primary));border-radius:999px 0 0 999px}
.nb-mf.full{border-radius:999px}
.nb-mx{background:rgb(var(--pos));border-radius:0 999px 999px 0}
.nb-mt{position:absolute;top:-4px;bottom:-4px;width:4px;margin-left:-2px;border-radius:2px;background:var(--text)}
.nb-mlab{position:relative;height:20px;margin-top:8px}
.nb-mlab>span{position:absolute;top:0;white-space:nowrap}
.nb-band{display:flex;gap:4px;height:24px;border-radius:999px;overflow:hidden}
.nb-band>button{border:0;padding:0;height:100%;cursor:pointer;min-width:8px}
.nb-band>button:hover{opacity:.82}
.nb-two{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:24px;align-items:start}
.nb-leg{display:flex;flex-wrap:wrap;gap:8px 16px}
.nb-leg>span{display:inline-flex;align-items:center;gap:8px}
.nb-sw{width:12px;height:12px;border-radius:4px;display:inline-block;flex:none}
.sheet.nb-wide{width:min(1040px,calc(100vw - 24px))}
.nb-tbl th:not(:first-child):not(:last-child),.nb-tbl td:not(:first-child):not(:last-child){padding-left:8px;padding-right:8px}
.nb-tbl .nb-ell{max-width:200px;overflow:hidden;text-overflow:ellipsis}
.nb-tbl tr[data-go]{cursor:pointer}
.nb-tbl tr[data-go]:focus-visible{outline-offset:-3px}
.nb-tbl tfoot td{font-weight:600;color:var(--text);border-top:1px solid var(--line);height:48px}
.nb-rule{margin:8px 0 16px}
.nb-info p{margin:0 0 12px;color:var(--soft);line-height:1.55}
.nb-info p:last-child{margin-bottom:0}
#nb-box{container-type:inline-size}
@container (max-width:479px){.nb-hrow{grid-template-columns:minmax(0,1fr) auto;row-gap:8px}.nb-hrow .nb-hbar{grid-column:1/-1;grid-row:2}.nb-hrow>b{grid-row:1;grid-column:2}}
#view .grid.nb-kg{grid-template-columns:repeat(5,minmax(0,1fr))}
@container (max-width:1100px){#view .grid.nb-kg{grid-template-columns:repeat(3,minmax(0,1fr))}}
@container (max-width:640px){#view .grid.nb-kg{grid-template-columns:repeat(2,minmax(0,1fr))}}
@container (max-width:440px){#view .grid.nb-kg{grid-template-columns:minmax(0,1fr)}}
.lat-side .nb-base{flex-direction:column;align-items:stretch;gap:8px}
.lat-side .nb-base .select{width:100%!important}
.nb-ch{width:100%;min-width:0}
.nb-base{gap:12px;flex-wrap:nowrap;min-width:0;max-width:100%}
.nb-base>label{white-space:nowrap}
.nb-base .select{flex:1 1 auto}
@media (max-width:900px){.nb-two{grid-template-columns:minmax(0,1fr)}.nb-hrow{grid-template-columns:minmax(0,1fr) auto;row-gap:8px}.nb-hrow .nb-hbar{grid-column:1/-1;grid-row:2}.nb-hrow>b{grid-row:1;grid-column:2}
  .sheet.nb-wide{width:100vw}.nb-base{width:100%}}
@media (max-width:600px){.nb-acima{display:none}#nb-mes,#nb-custom{width:100%!important;flex:1 1 100%}.nb-base .select{width:auto!important}}
</style>`);

/* ---------- utilidades ---------- */
const fmtN=(n,d=2)=>Number(n).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const num=s=>{s=String(s??'').trim().replace(/[R$\s%]/g,'');if(!s)return null;if(s.includes(','))s=s.replace(/\./g,'').replace(',','.');const n=parseFloat(s);return isNaN(n)?null:n};
const sum=a=>a.reduce((s,x)=>s+x,0);
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
const plural=(n,a,b)=>n===1?a:b;
const svgI=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 7.5h.01"/></svg>`;
const infoBtn=k=>`<button type="button" class="btn sm icon ghost" data-act="info" data-k="${k}" aria-label="Como calculamos" title="Como calculamos">${svgI}</button>`;
const nbSeg=(id,opts,on,label,w)=>U.seg(id,opts,on,label,'in nb-seg').replace(/width:\d+px/,`width:min(${w},100%)`);
const shrink=(html,w)=>html.replace(/width:\d+px/,`width:min(${w},100%)`);

/* ---------- estado ---------- */
const S=window.__nb||(window.__nb={mode:'p',per:'6',mes:'',de:'',ate:'',base:'dec',meta:500000,metaEdit:false,evo:'rec',evoT:'line',dec:'gp',pipe:'n',rank:'pipe'});

/* ---------- funil comercial (etapas reais) ---------- */
const E=['Lead','Qualificação','Atendimento Showroom','Visita técnica','Proposta','Negociação','Decisão'];
const FAIXAS=[[0,30,'0–30 dias','0–30'],[31,60,'31–60 dias','31–60'],[61,90,'61–90 dias','61–90'],[91,120,'91–120 dias','91–120'],[121,150,'121–150 dias','121–150'],[151,1e9,'mais de 150 dias','150+']];
const faixa=d=>FAIXAS.findIndex(f=>d>=f[0]&&d<=f[1]);

/* ---------- histórico de negócios (out/2025 a out/2026, coerente com M.D.negocios) ---------- */
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
  for(let k=0;k<26;k++){const y=k<5?2024:k<17?2025:2026,m=(7+k)%12+1,q=k<12?2:k<14?3:4;   // ago/2024 → set/2026 (antes de out/2025, menos negócios: só para comparar)
    for(let j=0;j<q;j++){const cri=`${y}-${pad(m)}-${pad(1+Math.floor(r()*27))}`;
      const x=r(),dd=x<.2?10+Math.floor(r()*21):x<.45?31+Math.floor(r()*30):x<.7?61+Math.floor(r()*30):x<.85?91+Math.floor(r()*30):x<.93?121+Math.floor(r()*30):151+Math.floor(r()*50);
      const dec=addD(cri,dd),win=r()<.52,rr=r();
      const valor=Math.round((18000+r()*r()*240000)*100)/100;
      const n={id:'h'+(++id),titulo:TIT[Math.floor(r()*TIT.length)],cliente:CLI[Math.floor(r()*CLI.length)],valor,origem:ORI[Math.floor(r()*ORI.length)],
        resp:rr<.5?'Allysson Moura':rr<.9?'Felipe Nunes':'Elisa Prado',cri};
      if(dec>='2026-10-01'||(cri>='2026-01-01'&&r()<.14)){n.status='Aberto';n.etapa=E[[0,1,1,2,2,3,3,4,4,4,5,5][Math.floor(r()*12)]]}
      else{n.status=win?'Ganho':'Perdido';n.dec=dec;n.etapa='Decisão'}
      L.push(n)}}
  // fechados em outubro/2026 (junto com a Segunda fase da Prates Lemos, n9): o mês passa da meta
  L.push({id:'h'+(++id),titulo:'Wi-Fi e áudio · pousada',cliente:'Hotel Serra Verde',valor:128450,origem:'Relacionamento Pessoal',resp:'Allysson Moura',cri:'2026-06-03',dec:'2026-10-01',status:'Ganho',etapa:'Decisão'});
  L.push({id:'h'+(++id),titulo:'CFTV e alarme · clínica',cliente:'Clínica Sorriso Pampulha',valor:86840.98,origem:'Indicação Interna',resp:'Felipe Nunes',cri:'2026-08-18',dec:'2026-10-02',status:'Ganho',etapa:'Decisão'});
  return L})();
/* lista viva: histórico + negócios do protótipo (lidos na hora, para refletir mudanças feitas em Negócios) */
function deals(){const T=TODAY();
  const live=(D.negocios||[]).map(n=>{const dt=DATAS[n.id]||[T,n.status!=='Aberto'?T:null];const st=n.status==='Ganho'||n.status==='Perdido'?n.status:'Aberto';
    return {id:n.id,titulo:n.titulo,cliente:n.cliente,valor:n.valor,origem:n.origem||'—',resp:n.resp||'—',cri:dt[0],dec:st==='Aberto'?null:(dt[1]||T),status:st,
      etapa:st==='Aberto'?((D.etapasComerciais||[])[n.etapa]||'Lead'):'Decisão'}});
  return HIST.concat(live).map(n=>({...n,dias:n.dec?days(n.cri,n.dec):null}))}

/* ---------- período ---------- */
function range(){const T=TODAY(),t=pd(T);let a,b,pa,pb,kind;
  if(S.mode==='mes'&&S.mes){const [y,m]=S.mes.split('-').map(Number);a=iso(new Date(y,m-1,1,12));const last=iso(new Date(y,m,0,12));b=last>T?T:last;
    pa=iso(new Date(y,m-2,1,12));pb=iso(new Date(y,m-1,0,12));kind='o mês anterior'}
  else if(S.mode==='custom'&&S.de&&S.ate){a=S.de;b=S.ate;const len=days(a,b);pb=addD(a,-1);pa=addD(pb,-len);kind='o mesmo número de dias antes'}
  else{const p=+S.per;a=iso(new Date(t.getFullYear(),t.getMonth()-p,1,12));b=T;pb=addD(a,-1);const da=pd(a);pa=iso(new Date(da.getFullYear(),da.getMonth()-p,1,12));kind=`os ${p} meses anteriores`}
  return {a,b,pa,pb,kind,label:plabel(a,b),plab:plabel(pa,pb)}}
function months(a,b){const out=[];let d=pd(a);d=new Date(d.getFullYear(),d.getMonth(),1,12);const multi=a.slice(0,4)!==b.slice(0,4);
  while(iso(d)<=b){const s=iso(d),e=iso(new Date(d.getFullYear(),d.getMonth()+1,0,12));
    out.push({a:s<a?a:s,b:e>b?b:e,lab:MES[d.getMonth()]+(multi?' '+String(d.getFullYear()).slice(2):''),full:MESF[d.getMonth()]+' '+d.getFullYear()});d=new Date(d.getFullYear(),d.getMonth()+1,1,12)}
  return out}
const baseShort=()=>S.base==='dec'?'data da decisão':'data de criação da proposta';

/* ---------- o cálculo (uma regra só para tudo) ---------- */
function calc(L,a,b){const dec=S.base==='dec';
  const decided=L.filter(n=>n.status!=='Aberto'&&n.dec&&(dec?inR(n.dec,a,b):inR(n.cri,a,b)));
  const wins=decided.filter(n=>n.status==='Ganho'),loss=decided.filter(n=>n.status==='Perdido');
  const open=L.filter(n=>n.cri<=b&&(!n.dec||n.dec>b)&&(dec||n.cri>=a));
  const r=sum(wins.map(n=>n.valor)),g=wins.length,l=loss.length;
  return {decided,wins,loss,open,r,g,l,t:g?r/g:null,c:g+l?g/(g+l)*100:null,dias:g?sum(wins.map(n=>n.dias))/g:null,pipe:sum(open.map(n=>n.valor)),ref:b}}

/* ---------- saúde da carteira (Experiência) ---------- */
const HOVR={'Helena Duarte':[5,0,0],'Marcos Valente':[34,2,1],'Hotel Serra Verde':[61,2,2],'Lívia Prates e Otávio Lemos':[3,0,0]};
const hsh=s=>{let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
function health(L,b){const seen={};
  L.filter(n=>n.status==='Ganho'&&n.dec&&n.dec<=b).forEach(n=>{if(seen[n.cliente])return;const h=hsh(n.cliente);
    const [dc,ch,al]=HOVR[n.cliente]||[2+h%60,[0,0,0,0,0,1,1,2][(h>>>3)%8],[0,0,0,0,0,0,1,2][(h>>>6)%8]];
    const nota=Math.max(0,Math.round(100-Math.min(40,dc*.5)-12*ch-15*al));
    seen[n.cliente]={cliente:n.cliente,dc,ch,al,nota,faixa:nota>=70?0:nota>=40?1:2}});
  return Object.values(seen).sort((x,y)=>x.nota-y.nota)}
const HF=[['Saudável','70 a 100','pos','g'],['Atenção','40 a 69','warn','w'],['Em risco','abaixo de 40','neg','r']];

/* ---------- regras em linguagem simples (botão "i") ---------- */
function info(k,R,st){const dec=S.base==='dec',cmp=`A comparação usa ${R.kind} (${R.plab}).`;
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
    evo:['Evolução',['Cada ponto é um mês do período, com a mesma regra dos indicadores: receita, ticket ou conversão daquele mês pela base escolhida.','O primeiro e o último mês podem estar incompletos quando o período começa ou termina no meio deles. Clique num ponto para ver os negócios.']],
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

/* ---------- gráfico SVG (barras ou linha), marcas clicáveis ---------- */
const niceStep=(raw,int)=>{if(!(raw>0))return 1;const e=Math.pow(10,Math.floor(Math.log10(raw))),f=raw/e,st=(f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10)*e;return int?Math.max(1,Math.ceil(st)):st};
function chart({labels,full,series,type='line',fmt=mil,h=240,w=720,aria,dd,marker,int=false,pctMax=false}){
  const pl=w<480?52:64,pr=w<480?8:16,pt=24,pb=32,n=labels.length,vals=series.flatMap(s=>s.v.filter(x=>x!=null)),mx=Math.max(0,...vals),step=pctMax?(mx>75?25:niceStep(mx/3,int)):niceStep(mx/3,int),max=Math.max(step*3,mx)||1,iw=w-pl-pr,ih=h-pt-pb;
  const X=i=>type==='bar'?pl+(i+.5)*iw/n:pl+(n>1?i*iw/(n-1):iw/2),Y=v=>pt+(1-v/max)*ih;
  let g='';for(let k=0;k<=Math.round(max/step);k++){const v=step*k,y=Y(v).toFixed(1);g+=`<line x1="${pl}" x2="${w-pr}" y1="${y}" y2="${y}" style="stroke:var(--line)"/><text x="${pl-8}" y="${(+y+4).toFixed(1)}" text-anchor="end">${esc(fmt(v))}</text>`}
  const mk=(s,i,v,attrs)=>{const k=dd(s,i);const lab=`${s.name?s.name+' · ':''}${(full||labels)[i]}: ${fmt(v)}`;return `${attrs} role="button" tabindex="0" data-dd="${k}" aria-label="${esc(lab)}. Abrir detalhamento"><title>${esc(lab)}</title>`};
  let m='';
  if(type==='bar'){const gw=iw/n*.68,bw=gw/series.length;series.forEach((s,si)=>s.v.forEach((v0,i)=>{const v=v0||0,x=X(i)-gw/2+si*bw+2,y=Math.min(Y(v),pt+ih-2),c=(s.cols&&s.cols[i])||s.c;
    m+=`<rect ${mk(s,i,v,`x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(4,bw-4).toFixed(1)}" height="${Math.max(2,pt+ih-y).toFixed(1)}" rx="4" style="fill:${c}"`)}</rect>`}))}
  else series.forEach(s=>{let d='',pen=false;s.v.forEach((v,i)=>{if(v==null){pen=false;return}d+=`${pen?'L':'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)} `;pen=true});
    m+=`<path d="${d}" style="fill:none;stroke:${s.c};stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>`;
    s.v.forEach((v,i)=>{if(v==null)return;m+=`<circle ${mk(s,i,v,`cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="6" style="fill:var(--panel);stroke:${s.c};stroke-width:3"`)}</circle>`})});
  if(marker){const x=pl+(marker.i+marker.f)*iw/n;m+=`<line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${pt-8}" y2="${pt+ih}" style="stroke:var(--text);stroke-width:2;stroke-dasharray:4 4"/><text class="nb-tk" x="${(x+6).toFixed(1)}" y="${pt-10}" text-anchor="${marker.i>=n/2?'end':'start'}" ${marker.i>=n/2?`dx="-12"`:''}>${esc(marker.label)}</text>`}
  const lw=Math.max(...labels.map(l=>l.length))*6.8+12,ls=Math.max(1,Math.ceil(n*lw/iw));
  return `<svg class="nb-svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="group" aria-label="${esc(aria)}">${g}${m}${labels.map((l,i)=>i%ls?'':`<text x="${X(i).toFixed(1)}" y="${h-8}" text-anchor="middle">${esc(l)}</text>`).join('')}</svg>`}
/* gráficos medem o contêiner: boxHTML guarda a receita; paint() desenha na largura real e redesenha no resize */
let CHS=[];const slot=sp=>{CHS.push(sp);return `<div class="nb-ch" data-ch="${CHS.length-1}" style="min-height:${sp.h||220}px"></div>`};
function paint(el){const sp=CHS[+el.dataset.ch];if(!sp||!el.isConnected)return;const w=Math.floor(el.clientWidth);if(w<80||w===el._w)return;el._w=w;
  const h=Math.round(Math.min(sp.hMax||320,Math.max(220,w*(sp.ratio||.42))));el.style.minHeight='';el.innerHTML=chart({...sp,w,h})}
const legend=items=>`<div class="nb-leg">${items.map(([c,l])=>`<span class="lbl"><span class="nb-sw" style="background:${c}"></span>${l}</span>`).join('')}</div>`;
const hrow=(name,sub,pct,val,k,aria,zero,col)=>`<button type="button" class="nb-hrow${zero?' zero':''}" data-dd="${k}" aria-label="${esc(aria)}. Abrir detalhamento"><span class="nb-hn">${esc(name)}${sub?`<span class="lbl nb-sm nb-blk">${sub}</span>`:''}</span><span class="nb-hbar"><b style="width:${Math.max(0,Math.min(100,pct))}%${col?';background:'+col:''}"></b></span><b class="num">${val}</b></button>`;

/* ---------- variação vs período anterior ---------- */
const vr=(x,y,{pp=false,inv=false,dd=false}={})=>{
  if(x==null||y==null||(!pp&&!dd&&!y))return '<span class="faint">sem base no período anterior</span>';
  const d=pp||dd?x-y:(x/y-1)*100;if(Math.abs(d)<(dd?.5:.05))return '<span class="faint">igual ao período anterior</span>';
  const up=d>0,good=inv?!up:up;return `<span class="${good?'pos':'neg'}">${up?'▲':'▼'} ${dd?fmtN(Math.abs(d),0)+plural(Math.round(Math.abs(d)),' dia',' dias'):fmtN(Math.abs(d),1)+(pp?' p.p.':'%')}</span> vs período anterior`};

/* ---------- conteúdo (string pura: recalculado a cada mudança) ---------- */
let DDS={},seq=0;const reg=sp=>{const k='d'+(++seq);DDS[k]=sp;return k};
function boxHTML(){DDS={};seq=0;CHS=[];
  const L=deals(),R=range(),A=calc(L,R.a,R.b),B=calc(L,R.pa,R.pb),T=TODAY(),t=pd(T),MS=months(R.a,R.b),MC=MS.map(m=>calc(L,m.a,m.b));
  const sub=(lab,extra)=>`${lab||R.label} · base: ${baseShort()}${extra?' · '+extra:''}`;
  const dealsDD=(title,rows,rule,extra,lab)=>reg({kind:'deals',title,rows,rule,ref:R.b,sub:sub(lab,extra)});

  /* meta */
  const mA=iso(new Date(t.getFullYear(),t.getMonth(),1,12)),MM=calc(L,mA,T),real=MM.r,meta=S.meta,pct=meta?real/meta*100:0,scale=Math.max(real,meta)||1,mpos=meta/scale*100;
  const mesNome=MESF[t.getMonth()],kMeta=reg({kind:'deals',title:`Receita de ${mesNome}`,rows:MM.wins,rule:info('rec',R)[1][0],ref:T,sub:`${plabel(mA,T)} · base: ${baseShort()}`});
  const metaCard=`<section class="card s12" aria-label="Meta do mês">${S.metaEdit
    ?`<div class="ch"><h2>Meta do mês · ${mesNome}</h2>${infoBtn('meta')}</div><div class="row mt16" style="gap:12px;flex-wrap:wrap"><label class="lbl" for="nb-metai">Nova meta</label><input class="input sm num" id="nb-metai" inputmode="decimal" value="${fmtN(meta)}" style="width:200px;text-align:right">
       <div class="btnrow" style="width:264px">${U.btn('Cancelar',{sm:true,act:'mcancel'})}${U.btn('Salvar',{sm:true,act:'msave'})}</div><span class="lbl neg" id="nb-merr" role="alert"></span></div>`
    :`<div class="ch"><h2>Meta do mês · ${mesNome}</h2>${infoBtn('meta')}<span class="spacer"></span>${U.btn('Editar meta',{sm:true,act:'medit',w:'152px'})}</div>
       <div class="row mt16" style="gap:16px;flex-wrap:wrap;align-items:flex-end"><button type="button" class="nb-hit" data-dd="${kMeta}" aria-label="Receita de ${mesNome}: ${brl(real)}. Abrir detalhamento"><b class="big num">${brl(real)}</b></button>
         <span class="lbl num" style="padding-bottom:4px">de ${brl(meta)} · <b class="${real>=meta?'pos':''}" style="font-size:15px">${fmtN(pct,0)}%</b></span><span class="spacer"></span>
         <b class="${real>=meta?'pos':'soft'}" style="padding-bottom:4px">${real>=meta?(real>meta?'Superou em '+kbrl(real-meta):'Meta batida.'):'Faltam '+kbrl(meta-real)}</b></div>
       <div class="mt24 nb-meta" role="img" aria-label="${esc(`${fmtN(pct,0)}% da meta. Meta ${brl(meta)}, realizado ${brl(real)}`)}"><b class="nb-mf${real<=meta?' full':''}" style="width:${Math.min(real,meta)/scale*100}%"></b>${real>meta?`<b class="nb-mx" style="left:${mpos}%;width:${100-mpos}%"></b>`:''}<i class="nb-mt" style="left:${mpos}%"></i></div>
       <div class="nb-mlab"><span class="lbl nb-sm" style="left:${mpos}%;transform:translateX(${mpos>30?'-100%':'0'});${mpos>30?'padding-right:8px':'padding-left:8px'}">Meta · ${kbrl(meta)}</span>${real>meta?`<span class="lbl nb-sm pos nb-acima" style="right:0">+ ${kbrl(real-meta)} acima</span>`:''}</div>`}</section>`;

  /* KPIs */
  const kp=(k,label,value,sub2,ddk,aria)=>`<div class="card nb-kpi"><div class="row" style="gap:8px"><span class="lbl" style="flex:1;min-width:0">${label}</span>${infoBtn(k)}</div>
    <button type="button" class="nb-hit" data-dd="${ddk}" aria-label="${esc(label+': '+aria)}. Abrir detalhamento"><span class="nb-v num">${value}</span><span class="lbl nb-sm">${sub2}</span></button></div>`;
  const kRec=dealsDD('Receita fechada',A.wins,info('rec',R)[1][0]),kTic=dealsDD('Ticket médio',A.wins,info('tic',R)[1][0],A.g?`${A.g} ${plural(A.g,'ganho','ganhos')}`:''),
    kConv=dealsDD('Conversão',A.decided,info('conv',R)[1][0],`${A.g} ${plural(A.g,'ganho','ganhos')} e ${A.l} ${plural(A.l,'perda','perdas')}`),
    kPipe=dealsDD('Pipeline aberto',A.open,info('pipe',R)[1][0],`abertos em ${fdc(R.b)}`),kTem=dealsDD('Tempo médio de fechamento',A.wins,info('tempo',R)[1][0]);
  const kpis=`<div class="s12 grid nb-kg">${[
    kp('rec','Receita fechada',M.brl0(A.r),vr(A.r,B.r),kRec,brl(A.r)),
    kp('tic','Ticket médio',A.t==null?'—':M.brl0(A.t),vr(A.t,B.t),kTic,A.t==null?'sem ganhos':brl(A.t)),
    kp('conv','Conversão',A.c==null?'—':fmtN(A.c,1)+'%',vr(A.c,B.c,{pp:true}),kConv,A.c==null?'sem decisões':fmtN(A.c,1)+'%'),
    kp('pipe','Pipeline aberto',M.brl0(A.pipe),vr(A.pipe,B.pipe),kPipe,brl(A.pipe)),
    kp('tempo','Tempo médio de fechamento',A.dias==null?'—':fmtN(A.dias,0)+plural(Math.round(A.dias),' dia',' dias'),vr(A.dias,B.dias,{dd:true,inv:true}),kTem,A.dias==null?'sem ganhos':fmtN(A.dias,0)+' dias')].join('')}</div>`;

  /* Evolução */
  const EV={rec:[MC.map(c=>c.r),mil,'Receita fechada','Receita'],tic:[MC.map(c=>c.t),mil,'Ticket médio','Ticket'],conv:[MC.map(c=>c.c),x=>fmtN(x,0)+'%','Conversão','Conversão']}[S.evo];
  const evoSvg=slot({labels:MS.map(m=>m.lab),full:MS.map(m=>m.full),series:[{v:S.evoT==='bar'?EV[0].map(x=>x??0):EV[0],c:'rgb(var(--primary))',name:EV[2]}],type:S.evoT,fmt:EV[1],pctMax:S.evo==='conv',ratio:.5,hMax:340,w:720,h:256,aria:EV[2]+' por mês',
    dd:(s,i)=>dealsDD(`${EV[2]} · ${MS[i].full}`,S.evo==='conv'?MC[i].decided:MC[i].wins,info(S.evo==='conv'?'conv':'rec',R)[1][0],'',plabel(MS[i].a,MS[i].b))});
  const evoCard=`<section class="card s8"><div class="ch" style="flex-wrap:wrap"><h2>Evolução</h2>${infoBtn('evo')}<span class="spacer"></span>${nbSeg('nb-evo',[['rec','Receita'],['tic','Ticket'],['conv','Conversão']],S.evo,'Medida','288px')}${nbSeg('nb-evt',[['line','Linha'],['bar','Colunas']],S.evoT,'Tipo de gráfico','192px')}</div>
    <div class="mt16">${evoSvg}</div></section>`;

  /* Decisões comerciais */
  const decSvg=S.dec==='gp'
    ?slot({labels:MS.map(m=>m.lab),full:MS.map(m=>m.full),series:[{v:MC.map(c=>c.g),c:'rgb(var(--pos))',name:'Ganhos'},{v:MC.map(c=>c.l),c:'rgb(var(--neg))',name:'Perdas'}],type:'bar',fmt:x=>fmtN(x,0),int:true,ratio:.8,hMax:300,w:340,h:272,aria:'Ganhos e perdas por mês',
       dd:(s,i)=>dealsDD(`${s.name} · ${MS[i].full}`,s.name==='Ganhos'?MC[i].wins:MC[i].loss,info('dec',R)[1][0],'',plabel(MS[i].a,MS[i].b))})
    :slot({labels:MS.map(m=>m.lab),full:MS.map(m=>m.full),series:[{v:MC.map(c=>c.c),c:'rgb(var(--primary))',name:'Conversão'}],fmt:x=>fmtN(x,0)+'%',pctMax:true,ratio:.8,hMax:300,w:340,h:272,aria:'Conversão por mês',
       dd:(s,i)=>dealsDD(`Conversão · ${MS[i].full}`,MC[i].decided,info('conv',R)[1][0],'',plabel(MS[i].a,MS[i].b))});
  const decCard=`<section class="card s4"><div class="ch"><h2>Decisões comerciais</h2>${infoBtn('dec')}</div>
    <div class="mt16">${nbSeg('nb-dec',[['gp','Ganhos x perdas'],['cm','Conversão']],S.dec,'Decisões comerciais','100%')}</div>
    <div class="mt16">${decSvg}</div>
    <div class="row mt16">${S.dec==='gp'?legend([['rgb(var(--pos))',`Ganhos · ${A.g}`],['rgb(var(--neg))',`Perdas · ${A.l}`]]):`<span class="lbl">Média do período: ${A.c==null?'—':fmtN(A.c,1)+'%'}</span>`}</div></section>`;

  /* Tempo de fechamento */
  const FB=FAIXAS.map((f,i)=>A.wins.filter(n=>faixa(n.dias)===i)),FV=FB.map(x=>sum(x.map(n=>n.valor))),top=FV.indexOf(Math.max(...FV));
  const fechCard=`<section class="card s6"><div class="ch"><h2>Tempo de fechamento</h2>${infoBtn('fech')}</div><p class="lbl" style="margin:4px 0 0">Tempo médio de fechamento: <b class="num" style="color:var(--text)">${A.dias==null?'—':fmtN(A.dias,0)+' dias'}</b></p>
    ${A.g?`<div class="mt16">${slot({labels:FAIXAS.map(f=>f[3]),full:FAIXAS.map(f=>f[2]),series:[{v:FV,c:'rgb(var(--primary))',cols:FV.map((_,i)=>i===top?'rgb(var(--pos))':'rgb(var(--primary))'),name:'Valor fechado'}],type:'bar',w:520,h:240,aria:'Valor fechado por faixa de dias até o ganho',
        dd:(s,i)=>dealsDD(`Fechados em ${FAIXAS[i][2]}`,FB[i],info('fech',R)[1][0])})}</div>
      <p class="lbl mt16" style="margin-bottom:0">Onde mais se fecha: <b style="color:var(--text)">${FAIXAS[top][2]}</b> · ${kbrl(FV[top])} em ${FB[top].length} ${plural(FB[top].length,'negócio','negócios')}. Eixo: dias entre a criação e o ganho.</p>`
      :U.empty({title:'Sem dados no período.',text:'Nenhum negócio ganho entra neste período pela base de data escolhida.'})}</section>`;

  /* Propostas em aberto por idade */
  const allW=L.filter(n=>n.status==='Ganho'&&n.dec&&n.dec<=R.b),fallback=A.dias==null,refD=fallback?(allW.length?sum(allW.map(n=>n.dias))/allW.length:null):A.dias;
  const age=n=>days(n.cri,R.b),OB=FAIXAS.map((f,i)=>A.open.filter(n=>faixa(age(n))===i)),OV=OB.map(x=>sum(x.map(n=>n.valor)));
  const mat=refD==null?[]:A.open.filter(n=>age(n)>=refD),matV=sum(mat.map(n=>n.valor)),mi=refD==null?-1:faixa(Math.round(refD));
  const mf=mi<0?0:Math.min(.98,Math.max(.02,(refD-FAIXAS[mi][0])/((mi===5?200:FAIXAS[mi][1]+1)-FAIXAS[mi][0])));
  const kMat=dealsDD('Propostas maduras',mat,`Negócios abertos em ${fdc(R.b)} com idade igual ou maior que o tempo médio de fechamento (${refD==null?'—':fmtN(refD,0)} dias).`);
  const idadeCard=`<section class="card s6"><div class="ch"><h2>Propostas em aberto por idade</h2>${infoBtn('idade')}</div>
    ${A.open.length?`<div class="mt16">${slot({labels:FAIXAS.map(f=>f[3]),full:FAIXAS.map(f=>f[2]),series:[{v:OV,c:'rgb(var(--primary))',cols:OV.map((_,i)=>mi>=0&&i>=mi?'rgb(var(--warn))':'rgb(var(--primary)/.45)'),name:'Em aberto'}],type:'bar',w:520,h:240,aria:'Valor em aberto por idade da proposta',
        marker:mi>=0?{i:mi,f:mf,label:`tempo médio · ${fmtN(refD,0)} dias`}:null,dd:(s,i)=>dealsDD(`Abertas há ${FAIXAS[i][2]}`,OB[i],info('idade',R,{ref:refD})[1][0])})}</div>
      <div class="row mt16" style="gap:12px;flex-wrap:wrap">${legend([['rgb(var(--primary)/.45)','Dentro do tempo médio'],['rgb(var(--warn))','Maduras (idade ≥ tempo médio)']])}<span class="spacer"></span>
        <span class="lbl"><b class="num" style="color:var(--text)">${kbrl(matV)}</b> em propostas maduras</span>${U.btn('Ver maduras',{sm:true,attrs:`data-dd="${kMat}"`,w:'128px'})}</div>`
      :U.empty({title:'Nenhuma proposta em aberto.',text:`Não havia negócio aberto em ${fdc(R.b)} pela base escolhida.`})}</section>`;

  /* Pipeline por etapa — as mesmas 7 etapas nas duas medidas */
  const EB=E.map(e=>A.open.filter(n=>n.etapa===e)),EN=EB.map(x=>x.length),EVv=EB.map(x=>sum(x.map(n=>n.valor))),byV=S.pipe==='v',emax=Math.max(1,...(byV?EVv:EN));
  const etapaCard=`<section class="card s6"><div class="ch" style="flex-wrap:wrap"><h2>Pipeline por etapa</h2>${infoBtn('etapa')}<span class="spacer"></span>${nbSeg('nb-pipe',[['n','Negócios'],['v','Valor']],S.pipe,'Medida do pipeline','224px')}</div>
    <div class="mt16 nb-rows">${E.map((e,i)=>hrow(e,byV?`${EN[i]} ${plural(EN[i],'negócio','negócios')}`:kbrl(EVv[i]),(byV?EVv[i]:EN[i])/emax*100,byV?M.brl0(EVv[i]):String(EN[i]),
      dealsDD(`Pipeline · ${e}`,EB[i],info('etapa',R)[1][0]),`${e}: ${EN[i]} ${plural(EN[i],'negócio','negócios')}, ${brl(EVv[i])}`,!EN[i])).join('')}</div>
    <p class="lbl mt16" style="margin-bottom:0">${A.open.length} ${plural(A.open.length,'negócio aberto','negócios abertos')} · ${M.brl0(A.pipe)} · em ${fdc(R.b)}</p></section>`;

  /* Ranking */
  const grp=(arr,key)=>{const o={};arr.forEach(n=>{const k=n[key]||'—';(o[k]=o[k]||[]).push(n)});return Object.entries(o).map(([k,x])=>[k,x,sum(x.map(n=>n.valor))]).sort((a,b)=>b[2]-a[2])};
  const rk=S.rank==='pipe'?grp(A.open,'resp'):grp(A.wins,'origem'),rmax=Math.max(1,...rk.map(r=>r[2]));
  const rankCard=`<section class="card s6"><div class="ch" style="flex-wrap:wrap"><h2>Ranking</h2>${infoBtn('rank')}<span class="spacer"></span>${nbSeg('nb-rank',[['pipe','Pipeline'],['ind','Quem mais indica']],S.rank,'Ranking','288px')}</div>
    ${rk.length?`<div class="mt16 nb-rows">${rk.map(([k,x,v])=>hrow(k,`${x.length} ${S.rank==='pipe'?plural(x.length,'negócio aberto','negócios abertos'):plural(x.length,'negócio ganho','negócios ganhos')}`,v/rmax*100,M.brl0(v),
      dealsDD(`${S.rank==='pipe'?'Pipeline de':'Indicações de'} ${k}`,x,info('rank',R)[1][S.rank==='pipe'?0:1]),`${k}: ${brl(v)}`)).join('')}</div>`
      :U.empty({title:'Sem dados no período.',text:S.rank==='pipe'?'Nenhum negócio aberto no fim do período.':'Nenhum negócio ganho no período pela base escolhida.'})}</section>`;

  /* Saúde da carteira */
  const H=health(L,R.b),HB=HF.map((_,i)=>H.filter(c=>c.faixa===i)),avg=H.length?sum(H.map(c=>c.nota))/H.length:null;
  const hDD=(title,rows)=>reg({kind:'health',title,rows,sub:`${rows.length} ${plural(rows.length,'cliente','clientes')} · clientes com negócio ganho até ${fdc(R.b)}`,rule:info('saude',R)[1][0]});
  const kAll=hDD('Saúde da carteira · todos',H);
  const saudeCard=`<section class="card s12" aria-label="Saúde da carteira"><div class="ch"><h2>Saúde da carteira</h2>${infoBtn('saude')}<span class="spacer"></span>${H.length?`<span class="lbl">${H.length} ${plural(H.length,'cliente acompanhado','clientes acompanhados')}</span>`:''}</div>
    ${H.length?`<div class="nb-two mt16"><div><p class="soft" style="margin:0 0 16px">Nota de 0 a 100 de cada cliente acompanhado pela Experiência. Sobe com contato frequente; desce com chamados abertos e alertas.</p>
        <button type="button" class="nb-hit" data-dd="${kAll}" aria-label="Média geral ${fmtN(avg,0)} de 100. Abrir detalhamento"><span class="lbl">Média geral</span><span class="row" style="gap:8px;align-items:baseline"><b class="big num ${avg>=70?'pos':avg>=40?'warn':'neg'}">${fmtN(avg,0)}</b><span class="lbl">de 100 · ${HF[avg>=70?0:avg>=40?1:2][0]}</span></span></button></div>
      <div><div class="nb-band" role="group" aria-label="Clientes por faixa de saúde">${HF.map((f,i)=>HB[i].length?`<button type="button" data-dd="${hDD('Saúde · '+f[0],HB[i])}" style="flex:${HB[i].length};background:rgb(var(--${f[2]}))" aria-label="${f[0]}: ${HB[i].length} ${plural(HB[i].length,'cliente','clientes')}. Abrir detalhamento" title="${f[0]}: ${HB[i].length}"></button>`:'').join('')}</div>
        <div class="mt16 nb-rows">${HF.map((f,i)=>hrow(`${f[0]} · ${f[1]}`,'',H.length?HB[i].length/H.length*100:0,`${HB[i].length} · ${fmtN(H.length?HB[i].length/H.length*100:0,0)}%`,
          hDD('Saúde · '+f[0],HB[i]),`${f[0]}: ${HB[i].length} ${plural(HB[i].length,'cliente','clientes')}`,!HB[i].length,`rgb(var(--${f[2]}))`)).join('')}</div>
        ${HB[2].length?`<p class="lbl mt16" style="margin-bottom:0">Em risco: ${HB[2].slice(0,3).map(c=>`${esc(c.cliente)} (${c.ch?c.ch+' '+plural(c.ch,'chamado','chamados'):''}${c.ch&&c.al?', ':''}${c.al?c.al+' '+plural(c.al,'alerta','alertas'):''}${!c.ch&&!c.al?c.dc+' dias sem contato':''})`).join(', ')}.</p>`:''}</div></div>`
      :`<div class="empty"><b>Ainda não há notas de saúde neste período.</b><p>A nota aparece quando um negócio é ganho e o cliente entra na Experiência. A partir do primeiro contato registrado lá, ela é calculada sozinha: frequência de contato, chamados abertos e alertas.</p>${U.btn('Abrir Experiência',{sm:true,act:'exp',w:'176px'})}</div>`}</section>`;

  return `<div class="grid">${metaCard}${kpis}${evoCard}${decCard}${fechCard}${idadeCard}${etapaCard}${rankCard}${saudeCard}</div>`}

/* ---------- detalhamento (painel lateral com tabela, total e CSV) ---------- */
const ST={Ganho:'g',Perdido:'r',Aberto:'b'};
function tableDeals(rows,ref){const tot=sum(rows.map(n=>n.valor));
  return `<section class="card flush"><div class="tblwrap"><table class="tbl nb-tbl"><thead><tr><th>Negócio</th><th>Cliente</th><th>Data de criação</th><th>Data da decisão</th><th class="r">Dias até fechar</th><th class="r">Valor</th><th>Status</th></tr></thead>
    <tbody>${rows.map(n=>{const link=!!(D.byId&&D.byId('negocios',n.id));return `<tr ${link?`data-go="${n.id}" tabindex="0" title="Abrir em Negócios" aria-label="${esc(n.titulo)}, abrir em Negócios"`:''}>
      <td class="nb-ell" title="${esc(n.titulo)}"><b style="font-weight:600">${esc(n.titulo)}</b></td><td class="nb-ell" title="${esc(n.cliente)}">${esc(n.cliente)}</td><td class="num">${fd(n.cri)}</td><td class="num">${n.dec?fd(n.dec):'—'}</td>
      <td class="r num">${n.dec?n.dias:`<span class="lbl nb-sm">aberto há ${days(n.cri,ref)}</span>`}</td><td class="r num">${brl(n.valor)}</td><td>${U.chip(n.status,ST[n.status])}</td></tr>`}).join('')}</tbody>
    <tfoot><tr><td colspan="5">Total · ${rows.length} ${plural(rows.length,'negócio','negócios')}</td><td class="r num">${brl(tot)}</td><td></td></tr></tfoot></table></div></section>`}
function tableHealth(rows){const avg=rows.length?sum(rows.map(c=>c.nota))/rows.length:0;
  return `<section class="card flush"><div class="tblwrap"><table class="tbl nb-tbl"><thead><tr><th>Cliente</th><th class="r">Nota</th><th>Faixa</th><th class="r">Dias sem contato</th><th class="r">Chamados abertos</th><th class="r">Alertas</th></tr></thead>
    <tbody>${rows.map(c=>`<tr><td class="nb-ell"><b style="font-weight:600">${esc(c.cliente)}</b></td><td class="r num"><b>${c.nota}</b></td><td>${U.chip(HF[c.faixa][0],HF[c.faixa][3])}</td><td class="r num">${c.dc}</td><td class="r num">${c.ch}</td><td class="r num">${c.al}</td></tr>`).join('')}</tbody>
    <tfoot><tr><td colspan="2">Média · ${fmtN(avg,0)}</td><td colspan="4">${rows.length} ${plural(rows.length,'cliente','clientes')}</td></tr></tfoot></table></div></section>`}
function csv(sp){const q=v=>{const s=String(v??'');return /[";\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s};
  const lines=sp.kind==='health'
    ?[['Cliente','Nota','Faixa','Dias sem contato','Chamados abertos','Alertas'],...sp.rows.map(c=>[c.cliente,c.nota,HF[c.faixa][0],c.dc,c.ch,c.al])]
    :[['Negócio','Cliente','Data de criação','Data da decisão','Dias até fechar','Valor','Status','Etapa','Origem','Responsável'],
      ...sp.rows.map(n=>[n.titulo,n.cliente,fd(n.cri),n.dec?fd(n.dec):'',n.dec?n.dias:'',fmtN(n.valor),n.status,n.etapa,n.origem,n.resp]),
      ['Total','','','','',fmtN(sum(sp.rows.map(n=>n.valor))),'','','','']];
  const blob=new Blob(['﻿'+lines.map(l=>l.map(q).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'});
  const slug=sp.title.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`numbers-${slug}-${TODAY()}.csv`;document.body.append(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000);M.toast(`CSV baixado: ${sp.rows.length} ${plural(sp.rows.length,'linha','linhas')}.`)}
function openDD(k){const sp=DDS[k];if(!sp)return;
  const tot=sp.kind==='deals'?sum(sp.rows.map(n=>n.valor)):null;
  const rows=sp.kind==='deals'?[...sp.rows].sort((x,y)=>((S.base==='dec'?y.dec||y.cri:y.cri)>(S.base==='dec'?x.dec||x.cri:x.cri)?1:-1)):sp.rows;
  const body=`<p class="lbl nb-rule">${esc(sp.rule||'')}</p>${rows.length?(sp.kind==='deals'?tableDeals(rows,sp.ref):tableHealth(rows))
    :U.empty({title:sp.kind==='deals'?'Nenhum negócio aqui.':'Nenhum cliente aqui.',text:'Este número é zero com os filtros atuais. Troque o período ou a base de data para ver outros registros.'})}`;
  const s=M.sheet({kick:'Numbers · detalhamento',title:sp.title,sub:esc((tot!=null?brl(tot)+' · ':'')+sp.sub),body,foot:[{label:'Exportar CSV',act:'csv',pri:true}],
    on:{csv:()=>rows.length?csv({...sp,rows}):M.toast('Nada para exportar com estes filtros.')}});
  s.el.classList.add('nb-wide');
  $$('tr[data-go]',s.el).forEach(tr=>{const go=()=>{s.close();setTimeout(()=>{location.hash='#/negocios?card='+tr.dataset.go},0)};
    tr.addEventListener('click',go);tr.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})})}
function openInfo(k){const R=range(),L=deals(),A=calc(L,R.a,R.b);let ref=A.dias,fb=false;
  if(ref==null){const w=L.filter(n=>n.status==='Ganho'&&n.dec&&n.dec<=R.b);ref=w.length?sum(w.map(n=>n.dias))/w.length:null;fb=true}
  const [title,ps]=info(k,R,{ref,fallback:fb});
  M.sheet({kick:'Como calculamos',title,sub:esc(`Base de data: ${baseShort()} · ${R.label}`),body:`<div class="sec nb-info">${ps.map(p=>`<p>${esc(p)}</p>`).join('')}</div>`})}

/* ---------- tela ---------- */
const MESES26=[['','Mês…'],...MESF.slice(0,10).map((m,i)=>[`2026-${pad(i+1)}`,`${m[0].toUpperCase()+m.slice(1)} 2026`])];
function render(){return `${U.page({kick:'Comercial',title:'Numbers',sub:'Leitura executiva de vendas, conversão, carteira e pipeline.'})}
  ${U.bar(`${shrink(U.seg('nb-per',[['3','3 meses'],['6','6 meses'],['12','12 meses']],S.mode==='p'?S.per:'','Período'),'336px')}${shrink(U.select('Mês',MESES26,'nb-mes','184px'),'184px')}${U.btn('Período personalizado',{act:'custom',icon:'agenda',ctl:true,attrs:'id="nb-custom"'})}`,
    `<span class="row nb-base"><label class="lbl" for="nb-base">Base de data</label>${shrink(U.select('Base de data',[['dec','Data da decisão (ganho/perda)'],['cri','Data de criação da proposta']],'nb-base','296px'),'296px')}</span>`)}
  <div class="row wrap nb-per" id="nb-perl" aria-live="polite"></div>
  <div id="nb-box" class="rv" style="--d:2">${boxHTML()}</div>`}
function mount(v){const box=$('#nb-box',v);
  if(window.__nbRO)window.__nbRO.disconnect();
  const ro=window.__nbRO='ResizeObserver' in window?new ResizeObserver(es=>requestAnimationFrame(()=>es.forEach(e=>paint(e.target)))):null;
  const charts=()=>{if(ro)ro.disconnect();$$('.nb-ch',box).forEach(el=>{paint(el);ro&&ro.observe(el)})};
  if(!ro)addEventListener('resize',()=>$$('.nb-ch',box).forEach(paint));
  const perl=()=>{const R=range();$('#nb-perl',v).innerHTML=`<span class="chip b">${esc(R.label)}</span><span class="lbl">comparado com ${esc(R.plab)} · base: ${baseShort()} · clique em qualquer número, barra ou ponto para ver os negócios</span>`;
    $$('#nb-per button',v).forEach(b=>b.setAttribute('aria-pressed',S.mode==='p'&&b.dataset.v===S.per));$('#nb-mes',v).value=S.mode==='mes'?S.mes:'';$('#nb-base',v).value=S.base};
  const draw=()=>{box.innerHTML=boxHTML();perl();wire();charts()};
  const saveMeta=()=>{const x=num($('#nb-metai',box).value);if(x==null||x<=0){$('#nb-merr',box).textContent='Informe um valor maior que zero.';$('#nb-metai',box).focus();return}
    S.meta=x;S.metaEdit=false;draw();M.toast(`Meta de ${MESF[pd(TODAY()).getMonth()]}: ${brl(x)}.`)};
  const wire=()=>{M.wire(box,{info:el=>openInfo(el.dataset.k),medit:()=>{S.metaEdit=true;draw();const i=$('#nb-metai',box);i.focus();i.select()},mcancel:()=>{S.metaEdit=false;draw()},msave:saveMeta,
      exp:()=>{location.hash='#/experiencia'}});
    const mi=$('#nb-metai',box);if(mi)mi.onkeydown=e=>{if(e.key==='Enter')saveMeta();if(e.key==='Escape'){S.metaEdit=false;draw()}};
    U.bindSeg(box,'nb-evo',x=>{S.evo=x;draw()});U.bindSeg(box,'nb-evt',x=>{S.evoT=x;draw()});U.bindSeg(box,'nb-dec',x=>{S.dec=x;draw()});
    U.bindSeg(box,'nb-pipe',x=>{S.pipe=x;draw()});U.bindSeg(box,'nb-rank',x=>{S.rank=x;draw()})};
  box.addEventListener('click',e=>{const t=e.target.closest('[data-dd]');if(t&&box.contains(t))openDD(t.dataset.dd)});
  box.addEventListener('keydown',e=>{const t=e.target;if((e.key==='Enter'||e.key===' ')&&t.matches&&t.matches('svg [data-dd]')){e.preventDefault();openDD(t.dataset.dd)}});
  wire();  /* liga o conteúdo antes do M.wire da página, que marcaria os botões sem tratador */
  U.bindSeg(v,'nb-per',x=>{S.mode='p';S.per=x;draw()});
  $('#nb-mes',v).onchange=e=>{const x=e.target.value;if(x){S.mode='mes';S.mes=x}else{S.mode='p';S.per=S.per||'6'}draw()};
  $('#nb-base',v).onchange=e=>{S.base=e.target.value;draw();M.toast(`Todos os números agora usam a ${baseShort()}.`)};
  M.wire(v,{custom:()=>{const R=range();M.modal({title:'Período personalizado',sub:'Escolha o primeiro e o último dia. Todos os números usam a base de data escolhida.',width:'560px',ok:'Aplicar',
    fields:[{k:'de',label:'De',type:'date',span:6,req:true,value:S.mode==='custom'?S.de:R.a},{k:'ate',label:'Até',type:'date',span:6,req:true,value:S.mode==='custom'?S.ate:R.b}],
    onOk:(x,el)=>{$$('.field',el).forEach(f=>{f.classList.remove('err');const m=$('.msg',f);if(m){m.hidden=true;m.textContent='Obrigatório.'}});
      const bad=(k,msg)=>{const i=$(`[name="${k}"]`,el),f=i.closest('.field'),m=$('.msg',f);f.classList.add('err');m.textContent=msg;m.hidden=false;i.focus();return false};
      if(x.ate>TODAY())return bad('ate','Use uma data até hoje.');if(x.de>x.ate)return bad('de','“De” precisa ser antes de “Até”.');
      S.mode='custom';S.de=x.de;S.ate=x.ate;draw()}})}});
  perl();charts();
}
M.screen('numbers',{title:'Numbers',dock:'numbers',
  help:['Escolha o período no topo (3, 6 ou 12 meses, um mês ou um período personalizado) e a base de data: decisão ou criação da proposta. Todos os números seguem as duas escolhas.',
    'Clique em qualquer número, barra, ponto ou faixa para ver os negócios que formam aquele valor, com total e botão Exportar CSV. Uma linha de negócio abre o card em Negócios.',
    'O botão “i” de cada cartão explica a conta em palavras simples. A meta do mês passa de 100% quando é superada; “Editar meta” muda o valor no próprio cartão.',
    'Tempo de fechamento mostra em quantos dias a empresa mais fecha; Propostas em aberto por idade marca as maduras, que já passaram do tempo médio.'],
  variants:{A:{label:'Painel',render,mount}}});
})();

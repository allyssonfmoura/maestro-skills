/* Maestro OS · protótipo · telas: Início, Financeiro, Compras, Propostas
   Dados: Teste Maestro e exemplos de demonstração. */
(function(){
const {ic,brl,brl0,head,tabsHTML,$,$$}=M;

/* ---------- gráfico de linha/área (SVG, sem biblioteca) ---------- */
function chart({w=900,h=240,series,labels,fill=true}){
  const pad={l:56,r:16,t:16,b:32}, all=series.flatMap(s=>s.v), max=Math.max(...all)*1.1, min=Math.min(0,...all);
  const X=i=>pad.l+i*(w-pad.l-pad.r)/(labels.length-1), Y=v=>pad.t+(1-(v-min)/(max-min))*(h-pad.t-pad.b);
  const grid=[0,1,2,3].map(i=>{const v=min+(max-min)*i/3;return `<line x1="${pad.l}" x2="${w-pad.r}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${pad.l-12}" y="${Y(v)+4}" font-size="11" fill="var(--faint)" text-anchor="end">${v>=1000?Math.round(v/1000)+' mil':Math.round(v)}</text>`}).join('');
  const paths=series.map((s,k)=>{const d=s.v.map((v,i)=>`${i?'L':'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
    return (fill&&k===0?`<path d="${d} L${X(s.v.length-1)},${Y(min)} L${X(0)},${Y(min)}Z" fill="url(#gf)"/>`:'')+
      `<path class="draw" d="${d}" fill="none" stroke="${s.c}" stroke-width="${k===0?3:2}" stroke-linecap="round" stroke-linejoin="round"/>`+
      (k===0?s.v.map((v,i)=>`<circle cx="${X(i)}" cy="${Y(v)}" r="4" fill="var(--panel)" stroke="${s.c}" stroke-width="2"/>`).join(''):'')}).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none" role="img" aria-label="Gráfico"><defs><linearGradient id="gf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(var(--primary))" stop-opacity=".25"/><stop offset="1" stop-color="rgb(var(--primary))" stop-opacity="0"/></linearGradient></defs>
   ${grid}${paths}${labels.map((m,i)=>`<text x="${X(i)}" y="${h-8}" font-size="11" fill="var(--faint)" text-anchor="middle">${m}</text>`).join('')}</svg>`;
}
const legend=items=>`<div class="row" style="gap:16px">${items.map(([c,l])=>`<span class="row lbl" style="gap:8px"><span class="dot" style="background:${c}"></span>${l}</span>`).join('')}</div>`;
const MESES=['out','nov','dez','jan','fev','mar','abr'];
const PREV={saldo:[485,512,498,541,560,552,590].map(v=>v*1000),rec:[244,180,210,150,175,160,190].map(v=>v*1000),pag:[111,140,120,130,128,135,140].map(v=>v*1000)};

/* =====================================================================
   INÍCIO (dashboard) — editorial, vidro em tudo
   Responsivo (02/10/2026): a grade responde à largura do próprio contêiner (container query),
   então Padrão, Coluna única e Lateral ficam certos em qualquer tela. Gráficos medem o contêiner
   e redesenham quando ele muda de tamanho (ResizeObserver).
   ===================================================================== */
(()=>{if(document.getElementById('rsp-inicio'))return;const s=document.createElement('style');s.id='rsp-inicio';s.textContent=`
.in-wrap{container:inicio/inline-size}
.in-chart{position:relative;height:240px;min-height:200px}
.in-chart.in-fill{flex:1 1 auto;height:auto}
.in-chart svg{position:absolute;inset:0;display:block;overflow:visible}
.in-fech{display:flex;flex-direction:column;overflow:hidden}
.in-fech .in-chart{margin-top:24px}
.in-kpi{container-type:inline-size;color:inherit;display:block}
.in-kpi .big{font-size:clamp(26px,12.5cqi,44px);white-space:nowrap}
.in-pede-row{border-radius:14px;padding:12px 12px 12px 16px;flex-wrap:nowrap!important}
.in-pede-row .btn{flex:none;width:112px}
.in-funil .row{flex-wrap:nowrap!important}
.in-funil{display:flex;flex-direction:column}
.in-funil>.stack{flex:1;justify-content:space-evenly}
.in-agenda{container-type:inline-size}
.in-agenda ol{list-style:none;margin:16px 0 0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);column-gap:24px;row-gap:4px}
.in-agenda li{display:flex;align-items:flex-start;gap:16px;padding:8px 0}
.in-agenda li>span:last-child{min-width:0}
@container (min-width:560px){.in-agenda ol{grid-template-columns:repeat(2,minmax(0,1fr))}}
.in-dia{container-type:inline-size}
.in-dia-g{display:grid;grid-template-columns:minmax(0,1fr);gap:16px;margin-top:16px}
.in-dia-g>div{border-radius:16px;padding:16px;min-height:132px;min-width:0}
@container (min-width:340px){.in-dia-g{grid-template-columns:repeat(2,minmax(0,1fr))}}
@container (min-width:680px){.in-dia-g{grid-template-columns:repeat(4,minmax(0,1fr))}}
.in-b-side{align-self:start}
/* largura do contêiner da tela: larga (≥1000), média (700–999), estreita (<700) */
@container inicio (min-width:1000px){
  .in-wrap .grid>.in-fech{grid-column:span 7}
  .in-wrap .grid>.in-pede,.in-wrap .grid>.in-funil{grid-column:span 5}
  .in-wrap .grid>.in-kpi,.in-wrap .grid>.in-agenda,.in-wrap .grid>.in-obra,.in-wrap .grid>.in-b-side{grid-column:span 4}
  .in-wrap .grid>.in-prev,.in-wrap .grid>.in-b-main{grid-column:span 8}
}
@container inicio (max-width:999px){
  .in-wrap .grid>.in-fech{grid-column:span 12;grid-row:auto}
  .in-wrap .grid>.in-pede,.in-wrap .grid>.in-funil{grid-column:span 6}
  .in-wrap .grid>.in-kpi,.in-wrap .grid>.in-obra{grid-column:span 4}
  .in-wrap .grid>.in-prev,.in-wrap .grid>.in-agenda,.in-wrap .grid>.in-b-main,.in-wrap .grid>.in-b-side{grid-column:span 12}
  .in-wrap .in-b-side{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
}
@container inicio (max-width:699px){
  .in-wrap .grid>.in-pede,.in-wrap .grid>.in-funil,.in-wrap .grid>.in-kpi,.in-wrap .grid>.in-obra{grid-column:span 12}
  .in-wrap .task{grid-template-columns:40px minmax(0,1fr);gap:16px}
  .in-wrap .task>button{grid-column:1/-1}
  .in-wrap .task .disp{font-size:40px!important}
}
@container inicio (max-width:520px){
  .in-wrap .in-b-side{grid-template-columns:minmax(0,1fr)}
  .in-pede-row{flex-wrap:wrap!important;row-gap:12px}
  .in-pede-row .btn{width:100%}
}
`;document.head.append(s)})();

/* gráfico de linha/área em SVG, desenhado na medida exata do contêiner (sem esticar letra) */
let gfId=0;
function drawChart(el,{series,labels,fill=true,label='Gráfico'},anim){
  const w=Math.round(el.clientWidth), h=Math.round(el.clientHeight); if(!w||!h)return;
  const fs=w>=900?12:11, pad={l:w<480?44:56,r:fs,t:fs,b:fs+18};
  const all=series.flatMap(s=>s.v), max=Math.max(...all)*1.1, min=Math.min(0,...all);
  const iw=w-pad.l-pad.r, ih=h-pad.t-pad.b, n=labels.length;
  const X=i=>pad.l+i*iw/(n-1), Y=v=>pad.t+(1-(v-min)/(max-min))*ih;
  const rows=ih>=240?4:3, fmt=v=>v>=1000?Math.round(v/1000)+' mil':String(Math.round(v));
  const grid=Array.from({length:rows+1},(_,i)=>{const v=min+(max-min)*i/rows;return `<line x1="${pad.l}" x2="${w-pad.r}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}" stroke="var(--line)"/><text x="${pad.l-10}" y="${(Y(v)+4).toFixed(1)}" font-size="${fs}" fill="var(--faint)" text-anchor="end">${fmt(v)}</text>`}).join('');
  /* rótulos do eixo X: pula quando não cabem (mínimo 44 px entre eles) */
  const stepX=Math.max(1,Math.ceil(44/(iw/(n-1))));
  const xl=labels.map((m,i)=>i%stepX===0?`<text x="${X(i).toFixed(1)}" y="${h-6}" font-size="${fs}" fill="var(--faint)" text-anchor="${i===0?'start':i===n-1?'end':'middle'}">${m}</text>`:'').join('');
  const id='gf'+(++gfId), r=w<480?3:4;
  const paths=series.map((s,k)=>{const d=s.v.map((v,i)=>`${i?'L':'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
    return (fill&&k===0?`<path d="${d} L${X(n-1).toFixed(1)},${Y(min).toFixed(1)} L${X(0).toFixed(1)},${Y(min).toFixed(1)}Z" fill="url(#${id})"/>`:'')+
      `<path ${anim?'class="draw"':''} d="${d}" fill="none" stroke="${s.c}" stroke-width="${k===0?3:2}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`+
      (k===0?s.v.map((v,i)=>`<circle cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="${r}" fill="var(--panel)" stroke="${s.c}" stroke-width="2"/>`).join(''):'')}).join('');
  el.innerHTML=`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(var(--primary))" stop-opacity=".25"/><stop offset="1" stop-color="rgb(var(--primary))" stop-opacity="0"/></linearGradient></defs>${grid}${paths}${xl}</svg>`;
}
const CHARTS={
  fech:{label:'Fechamentos de maio a outubro',labels:['mai','jun','jul','ago','set','out'],series:[{v:[120,180,150,240,210,388].map(v=>v*1000),c:'rgb(var(--primary))'}]},
  prev:{label:'Previsão de caixa de outubro a abril',labels:MESES,series:[{v:PREV.saldo,c:'rgb(var(--primary))'},{v:PREV.rec,c:'rgb(var(--pos))'},{v:PREV.pag,c:'rgb(var(--neg))'}]}};
/* liga cada [data-in-chart]: desenha na medida e redesenha quando o contêiner muda */
function mountCharts(v){
  $$('[data-in-chart]',v).forEach(el=>{const def=CHARTS[el.dataset.inChart];let lw=0,lh=0,first=true;
    const draw=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h||(w===lw&&h===lh))return;lw=w;lh=h;drawChart(el,def,first);first=false};
    requestAnimationFrame(draw);
    if('ResizeObserver' in window){const ro=new ResizeObserver(()=>{if(!el.isConnected)return ro.disconnect();draw()});ro.observe(el)}
    else{const f=()=>{if(!el.isConnected)return removeEventListener('resize',f);draw()};addEventListener('resize',f)}});
}
const pede=[
  ['r','2 cobranças em atraso','Residência Duarte e Casa Valente · '+brl(146942.17),'Cobrar','#/financeiro'],
  ['b','Sérgio Bastos abriu a proposta 3 vezes','Enviada há 4 dias, ainda sem resposta','Ligar',''],
  ['w','Pedido da Luminar Sul sem confirmação','Enviado ao fornecedor há 2 dias','Ver pedido','#/compras']];
const obras=[['Residência Duarte','Cidade Jardim',64,'Instalação elétrica'],['Casa Valente','Pampulha',38,'Infra de rede'],['Residência Alameda','Teste Escopo 1',12,'Compra de materiais']];
const agenda=[['09:00','Visita técnica','Casa Valente — Pampulha'],['11:30','Apresentar proposta','Paula e Renato'],['15:00','Reunião com fornecedor','Luminar Sul'],['17:30','Entrega de equipamentos','Residência Duarte']];
const tone=t=>t==='r'?'neg':t==='w'?'warn':'primary';
/* botões de "Pede você hoje": vão para a tela certa ou dizem o que fariam */
const bindPede=v=>$$('[data-pede]',v).forEach(b=>b.onclick=()=>{const p=pede[+b.dataset.pede];if(p[4])location.hash=p[4];else M.toast('Liga para Sérgio Bastos (simulação).')});
const ellip='white-space:nowrap;overflow:hidden;text-overflow:ellipsis';

M.screen('dashboard',{title:'Início',style:'editorial',glass:'tudo',dock:'dashboard',variants:{
 A:{label:'Painel',mount:v=>{mountCharts(v);bindPede(v)},render:()=>`
  ${head({kick:'Quinta-feira · 2 de outubro',title:'Bom <i>dia</i>, Allysson.',sub:'Três coisas pedem você hoje. O resto está andando.',
    acts:`<a class="btn ctl" href="#/financeiro">${ic('financeiro')}<span class="bt">Financeiro</span></a><a class="btn pri" href="#/construtor">${ic('mais')}<span class="bt">Nova proposta</span></a>`})}
  <div class="in-wrap"><div class="grid">
    <section class="card s7 r2 rv in-fech" style="--d:1">
      <div class="ch"><h2>Fechado em outubro</h2><span class="spacer"></span><span class="chip g">8 propostas aceitas</span></div>
      <div class="disp num" style="font-size:clamp(48px,6.4vw,96px);line-height:1;margin-top:24px;white-space:nowrap" data-count="387709" data-pre="R$ ">R$ 0</div>
      <p class="soft" style="margin:12px 0 0">Maior fechamento: <b style="color:var(--text)">Segunda fase · Upgrade Automação</b>, ${brl(387709.02)}.</p>
      <div class="in-chart in-fill" data-in-chart="fech"></div>
    </section>
    <section class="card s5 rv in-pede" style="--d:2">
      <div class="ch"><h2>Pede você hoje</h2><span class="spacer"></span><span class="chip r">3</span></div>
      <div class="stack gap16 mt16">${pede.map((p,i)=>`<div class="row in in-pede-row">
        <span class="dot" style="background:rgb(var(--${tone(p[0])}))"></span>
        <div style="flex:1;min-width:0"><div style="font-weight:600;${ellip}" title="${p[1]}">${p[1]}</div><div class="lbl" style="${ellip}" title="${p[2]}">${p[2]}</div></div>
        <button type="button" class="btn sm" data-pede="${i}">${p[3]}</button></div>`).join('')}</div>
    </section>
    <section class="card s5 rv in-funil" style="--d:3">
      <div class="ch"><h2>Funil de propostas</h2><span class="spacer"></span><a class="btn sm ghost" href="#/propostas">Ver todas</a></div>
      <div class="stack mt16" style="gap:12px">${[['Rascunho',12,'var(--faint)'],['Enviada',15,'rgb(var(--primary))'],['Vista',6,'rgb(var(--primary-soft))'],['Aceita',8,'rgb(var(--pos))']].map(f=>`
        <div class="row" style="gap:16px"><span class="lbl" style="width:72px;flex:none">${f[0]}</span><div style="flex:1;min-width:0;height:12px;border-radius:99px;background:color-mix(in srgb,var(--text) 7%,transparent);overflow:hidden"><div class="grow" style="height:100%;width:${f[1]/15*100}%;border-radius:99px;background:${f[2]}"></div></div><b class="num" style="width:24px;flex:none;text-align:right">${f[1]}</b></div>`).join('')}</div>
    </section>
    ${[['Saldo em contas',485253.98,'4 contas','financeiro'],['A receber',244011.86,'5 títulos · 2 em atraso','financeiro'],['A pagar',111430.57,'5 títulos · 4 em atraso','financeiro']].map((k,i)=>`
    <a class="card s4 rv in-kpi" href="#/${k[3]}" style="--d:${4+i}">
      <div class="kick">${k[0]}</div><div class="big num mt8" data-count="${k[1]}" data-dec="2" data-pre="R$ ">R$ 0</div><div class="lbl mt8">${k[2]}</div></a>`).join('')}
    <section class="card s8 rv in-prev" style="--d:7">
      <div class="ch"><h2 class="disp" style="font-size:28px">Previsão <i>de caixa</i></h2><span class="spacer"></span>${legend([['rgb(var(--primary))','Saldo projetado'],['rgb(var(--pos))','A receber'],['rgb(var(--neg))','A pagar']])}</div>
      <div class="in-chart mt16" data-in-chart="prev"></div>
    </section>
    <section class="card s4 rv in-agenda" style="--d:8">
      <div class="ch"><h2>Agenda de hoje</h2><span class="spacer"></span><span class="lbl">4 compromissos</span></div>
      <ol>${agenda.map((a,i)=>`
        <li><span class="num" style="width:44px;flex:none;font-weight:600;color:${i===0?'rgb(var(--primary))':'var(--soft)'}">${a[0]}</span>
        <span style="width:2px;flex:none;align-self:stretch;border-radius:2px;background:${i===0?'rgb(var(--primary))':'var(--line)'}"></span>
        <span><b style="font-weight:600">${a[1]}</b><br><span class="lbl">${a[2]}</span></span></li>`).join('')}</ol>
    </section>
    <section class="s12 rv" style="--d:9">
      <div class="ch" style="margin-bottom:16px"><h2 class="disp" style="font-size:28px">Obras <i>em andamento</i></h2><span class="spacer"></span><span class="lbl">3 obras ativas</span></div>
      <div class="grid">${obras.map(o=>`<article class="card s4 in-obra"><div class="kick" style="${ellip}">${o[1]}</div><h3 style="margin:8px 0 0;font-size:20px;font-weight:600;${ellip}" title="${o[0]}">${o[0]}</h3>
        <div class="row mt24" style="flex-wrap:nowrap"><span class="lbl" style="flex:1;min-width:0;${ellip}">${o[3]}</span><b class="num">${o[2]}%</b></div>
        <div style="height:8px;border-radius:99px;background:color-mix(in srgb,var(--text) 7%,transparent);margin-top:8px;overflow:hidden"><div class="grow" style="height:100%;width:${o[2]}%;background:linear-gradient(90deg,rgb(var(--primary)),rgb(var(--primary-soft)));border-radius:99px"></div></div></article>`).join('')}</div>
    </section>
  </div></div>`},
 B:{label:'Hoje',mount:v=>bindPede(v),render:()=>`
  ${head({kick:'Quinta-feira · 2 de outubro',title:'Hoje: <i>3 decisões</i><br>e R$ 146 mil para trazer.',sub:'',
    acts:`<a class="btn pri" href="#/construtor">${ic('mais')}<span class="bt">Nova proposta</span></a>`})}
  <div class="in-wrap"><div class="grid">
    <div class="s8 stack in-b-main">
      ${pede.map((p,i)=>`<article class="card rv task" style="--d:${i+1}">
        <div class="disp num" style="font-size:56px;line-height:1;color:rgb(var(--${tone(p[0])}))">${i+1}</div>
        <div style="min-width:0"><h3 style="margin:0;font-size:20px;font-weight:600">${p[1]}</h3><p class="soft" style="margin:4px 0 0">${p[2]}</p></div>
        <button type="button" class="btn ${i===0?'pri':''}" style="width:100%" data-pede="${i}">${p[3]}</button></article>`).join('')}
      <section class="card rv in-dia" style="--d:4">
        <div class="ch"><h2 class="disp" style="font-size:28px">O seu <i>dia</i></h2><span class="spacer"></span><span class="lbl">4 compromissos</span></div>
        <div class="in-dia-g">${agenda.map((a,i)=>`<div class="in">
          <div class="disp num" style="font-size:28px;color:${i===0?'rgb(var(--primary))':'inherit'}">${a[0]}</div><div style="font-weight:600;margin-top:12px">${a[1]}</div><div class="lbl">${a[2]}</div></div>`).join('')}</div>
      </section>
    </div>
    <aside class="s4 stack in-b-side">
      ${[['Fechado em outubro',387709.02,'8 propostas aceitas','g'],['Saldo em contas',485253.98,'4 contas','n'],['A receber',244011.86,'2 em atraso','r'],['A pagar',111430.57,'4 em atraso','w']].map((k,i)=>`
      <div class="card rv in-kpi" style="--d:${i+2}"><div class="row" style="gap:8px"><span class="kick" style="flex:1;min-width:0;${ellip}">${k[0]}</span><span class="chip ${k[3]}">${k[2]}</span></div><div class="big num mt8" data-count="${k[1]}" data-dec="2" data-pre="R$ ">R$ 0</div></div>`).join('')}
    </aside>
  </div></div>`}
}});
/* =====================================================================
   FINANCEIRO — discreto
   ===================================================================== */
const TIT=[
 ['Residência Duarte','Parcela 3/6 · Automação',73471.09,'12/09','Vencido','r','rec'],['Casa Valente','Entrada · Infra de rede',73471.08,'20/09','Vencido','r','rec'],
 ['Paula e Renato','Parcela 1/4',39342.11,'02/10','Vence hoje','w','rec'],['Marta','Sinal',14600,'15/10','Em aberto','n','rec'],['Sushi Yoru Bar','Parcela única',43128.48,'28/10','Em aberto','n','rec'],
 ['Luminar Sul','Pedido 112 · Iluminação',38214.30,'18/09','Vencido','r','pag'],['Sonos Brasil','Pedido 109 · Áudio',42970.00,'22/09','Vencido','r','pag'],['Ubiquiti · Distribuidor','Pedido 110 · Rede',18036.27,'25/09','Vencido','r','pag'],
 ['Aluguel do escritório','Despesa fixa',12060.00,'30/09','Vencido','r','pag'],['Contador','Despesa fixa',150.00,'10/10','Em aberto','n','pag']];
const MOV=[['01/10','Recebimento · Lívia e Otávio','Itaú',96927.25],['01/10','Pagamento · Control4 Brasil','Itaú',-11800],['30/09','Recebimento · Rodrigo Alencar','Inter',22102.83],['29/09','Pagamento · Folha de setembro','Itaú',-38400],['28/09','Tarifa bancária','Itaú',-89.9]];
const shortcuts=['A receber','A pagar','Resultado (DRE)','Previsto × realizado','Conciliar extrato','Despesas fixas','Contratos','Maiores devedores','Maiores atrasos','Ajustes'];
const finHead=()=>head({kick:'Outubro de 2026',title:'Financeiro',sub:'O dinheiro da empresa: o que tem, o que entra e o que sai.',
  acts:`<button class="btn ctl">Conciliar extrato</button><button class="btn pri">${ic('mais')}Novo título</button>`});

M.screen('financeiro',{title:'Financeiro',variants:{
 A:{label:'Painel',render:()=>`${finHead()}
  <div class="row rv" style="--d:1;margin-bottom:24px">${tabsHTML(['Painel','A receber','A pagar','Resultado','Contratos'])}</div>
  <div class="grid">
    <section class="card s4 rv" style="--d:2"><div class="ch"><span class="lbl" style="flex:1">Saldo em contas</span><button class="btn sm ghost" data-hide>Ocultar</button></div>
      <div class="big num mt8" data-saldo>${brl(485253.98)}</div><div class="kv mt16"><span>4 contas</span><b class="num">Itaú, Inter, Caixa, Cofre</b></div></section>
    <section class="card s4 rv" style="--d:3"><div class="ch"><span class="lbl">A receber</span></div><div class="big num mt8">${brl(244011.86)}</div>
      <div class="kv mt16"><span>Vencem hoje</span><b class="num">${brl(39342.11)}</b></div><div class="kv"><span>2 em atraso</span><b class="num neg">${brl(146942.17)}</b></div></section>
    <section class="card s4 rv" style="--d:4"><div class="ch"><span class="lbl">A pagar</span></div><div class="big num mt8">${brl(111430.57)}</div>
      <div class="kv mt16"><span>Vencem hoje</span><b class="num">R$ 0,00</b></div><div class="kv"><span>4 em atraso</span><b class="num neg">${brl(111280.57)}</b></div></section>
    <section class="card s8 rv" style="--d:5"><div class="ch"><h2>Previsão</h2><span class="spacer"></span>${legend([['rgb(var(--primary))','Saldo'],['rgb(var(--pos))','Entradas'],['rgb(var(--neg))','Saídas']])}</div>
      <div class="mt16">${chart({h:220,labels:MESES,series:[{v:PREV.saldo,c:'rgb(var(--primary))'},{v:PREV.rec,c:'rgb(var(--pos))'},{v:PREV.pag,c:'rgb(var(--neg))'}]})}</div></section>
    <section class="card s4 rv" style="--d:6"><div class="ch"><h2>Aguardando aprovação</h2><span class="spacer"></span><span class="chip w">2</span></div>
      <div class="stack mt16" style="gap:12px">${[['Compra de cabos CAT6',4210.5,'Solicitado por Bruno'],['Reembolso de combustível',386.4,'Solicitado por Carla']].map(a=>`<div class="in" style="border-radius:14px;padding:16px">
        <div class="row"><b style="flex:1;font-weight:600">${a[0]}</b><b class="num">${brl(a[1])}</b></div><div class="lbl mt8">${a[2]}</div>
        <div class="grid g2 mt16" style="gap:12px"><button class="btn sm">Recusar</button><button class="btn sm pri">Aprovar</button></div></div>`).join('')}</div></section>
    <section class="card flush s12 rv" style="--d:7"><div class="ch"><h2>Últimas movimentações</h2><span class="spacer"></span><button class="btn sm ghost">Ver extrato</button></div>
      <div class="tblwrap"><table class="tbl"><thead><tr><th>Data</th><th>Descrição</th><th>Conta</th><th class="r">Valor</th></tr></thead><tbody>
      ${MOV.map(m=>`<tr><td class="num soft">${m[0]}</td><td>${m[1]}</td><td class="soft">${m[2]}</td><td class="r num ${m[3]>0?'pos':''}" style="font-weight:600">${m[3]>0?'+ ':'− '}${brl(Math.abs(m[3]))}</td></tr>`).join('')}</tbody></table></div></section>
    <section class="s12 rv" style="--d:8"><div class="lbl" style="margin-bottom:12px">Atalhos</div>
      <div class="grid g5" style="gap:12px">${shortcuts.map(s=>`<button class="btn ctl" style="width:100%;min-width:0;overflow:hidden;text-overflow:ellipsis">${s}</button>`).join('')}</div></section>
  </div>`,
  mount:v=>{const b=$('[data-hide]',v),s=$('[data-saldo]',v);b.onclick=()=>{const h=b.textContent==='Ocultar';s.textContent=h?'R$ ••••••':brl(485253.98);b.textContent=h?'Mostrar':'Ocultar'}}},
 B:{label:'Títulos',render:()=>`${finHead()}
  <div class="row rv" style="--d:1;margin-bottom:24px">${tabsHTML(['A receber','A pagar'],0,'ctl','Tipo de título')}<span class="spacer"></span><input class="input ctl" style="width:320px" placeholder="Buscar cliente, fornecedor ou descrição" aria-label="Buscar títulos"></div>
  <div class="grid">
    <nav class="card s3 rv" style="--d:2;padding:12px;align-self:start" aria-label="Filtrar por situação"><div class="stack" style="gap:4px" id="fil"></div></nav>
    <section class="s9 stack rv" style="--d:3;gap:16px">
      <div class="card flush"><div class="tblwrap"><table class="tbl"><thead><tr><th style="width:56px"><input type="checkbox" aria-label="Selecionar todos" id="all"></th><th>Quem</th><th>Descrição</th><th>Vence</th><th>Situação</th><th class="r">Valor</th><th class="r" style="width:176px"></th></tr></thead><tbody id="tit"></tbody></table></div></div>
      <div class="card row" id="bulk" style="padding:12px 12px 12px 24px" hidden><b id="bulkN" style="flex:1"></b><button class="btn sm" id="bulkClr">Limpar seleção</button><button class="btn sm pri" id="bulkGo">Registrar recebimento</button></div>
    </section>
  </div>`,
  mount:v=>{
    let kind='rec',f='Todos'; const sel=new Set();
    const F=['Todos','Vencidos','Vence hoje','Em aberto'];
    const list=()=>TIT.filter(t=>t[6]===kind&&(f==='Todos'||t[4]===f||(f==='Vencidos'&&t[4]==='Vencido')));
    const draw=()=>{
      $('#fil',v).innerHTML=F.map(x=>{const n=TIT.filter(t=>t[6]===kind&&(x==='Todos'||t[4]===x||(x==='Vencidos'&&t[4]==='Vencido'))).length;
        return `<button class="btn ${x===f?'':'ghost'}" style="justify-content:space-between;width:100%;${x===f?'':'color:var(--text)'}" data-f="${x}" aria-pressed="${x===f}"><span>${x}</span><span class="num faint">${n}</span></button>`}).join('');
      $$('[data-f]',v).forEach(b=>b.onclick=()=>{f=b.dataset.f;draw()});
      $('#tit',v).innerHTML=list().map((t,i)=>{const id=TIT.indexOf(t);return `<tr><td><input type="checkbox" data-s="${id}" ${sel.has(id)?'checked':''} aria-label="Selecionar ${M.esc(t[0])}"></td><td style="font-weight:600">${t[0]}</td><td class="soft ell">${t[1]}</td><td class="num">${t[3]}</td>
        <td><span class="chip ${t[5]}">${t[4]}</span></td><td class="r num" style="font-weight:600">${brl(t[2])}</td><td class="r"><button class="btn sm" style="width:152px">${kind==='rec'?'Registrar recebimento':'Registrar pagamento'}</button></td></tr>`}).join('');
      $$('[data-s]',v).forEach(c=>c.onchange=()=>{c.checked?sel.add(+c.dataset.s):sel.delete(+c.dataset.s);bulk()});
      $$('#tit .btn',v).forEach(b=>b.onclick=()=>M.toast('Registrado (simulação).'));
      bulk();
    };
    const bulk=()=>{const n=sel.size,b=$('#bulk',v);b.hidden=!n;const tot=[...sel].reduce((a,i)=>a+TIT[i][2],0);$('#bulkN',v).textContent=`${n} selecionado${n>1?'s':''} · ${brl(tot)}`;
      $('#bulkGo',v).textContent=kind==='rec'?'Registrar recebimento':'Registrar pagamento'};
    $('#all',v).onchange=e=>{list().forEach(t=>e.target.checked?sel.add(TIT.indexOf(t)):sel.delete(TIT.indexOf(t)));draw()};
    $('#bulkClr',v).onclick=()=>{sel.clear();$('#all',v).checked=false;draw()};
    $('#bulkGo',v).onclick=()=>{M.toast(`${sel.size} títulos registrados (simulação).`);sel.clear();draw()};
    $('[data-tabs]',v).addEventListener('tab',e=>{kind=e.detail?'pag':'rec';sel.clear();f='Todos';draw()});
    draw();
  }}
}});

/* =====================================================================
   COMPRAS — discreto
   ===================================================================== */
const FORN=[
 {n:'Fornecedor Teste Escopo',items:[['Receiver AV 7.2 canais','TESC-RECEIVER',1,4000,'Residência Alameda',-1],['Cabo de som 2x16 AWG','TESC-CABO-SOM',120,4,'Residência Alameda',-120],['Caixa acústica de embutir 6,5"','TESC-CAIXA',5,600,'Residência Alameda',-5],['Subwoofer 10 polegadas','TESC-SUB',1,1800,'Residência Alameda',-1],['Interruptor inteligente 4 teclas','TESC-INTERRUPTOR',3,350,'Residência Alameda',-3]]},
 {n:'Luminar Sul',items:[['Stella Fita LED 24V 3000K 10W/m','STH-FITA24',8,62,'Casa Valente',64],['Stella Perfil de embutir com difusor','STH-PERFIL',8,48,'Casa Valente',-36],['Stella Fonte para LED 24V 150W','STH-DRIVER',1,210,'Casa Valente',-4],['Stella Spot de embutir recuado 7W','STH-SPOT7',8,118,'Casa Valente',-24]]}];
const PED=[['Rascunho',[['Fornecedor Teste Escopo',5,7600,'Residência Alameda']]],['Enviado',[['Luminar Sul',4,2584,'Casa Valente'],['Sonos Brasil',2,8580,'Residência Duarte']]],
 ['Confirmado',[['Ubiquiti · Distribuidor',4,6360,'Casa Valente']]],['Recebido',[['Control4 Brasil',1,11800,'Residência Duarte'],['Intelbras',6,2520,'Residência Duarte']]]];
const compHead=()=>head({kick:'5 obras com itens pendentes',title:'Compras',sub:'Tudo o que falta comprar, de todas as obras.',
  acts:`<button class="btn ctl">${ic('mais')}Reposição de estoque</button><button class="btn pri">${ic('mais')}Uso comum</button>`});

M.screen('compras',{title:'Compras',variants:{
 A:{label:'A comprar',render:()=>`${compHead()}
  <div class="row wrap rv" style="--d:1;margin-bottom:24px">${tabsHTML(['A comprar','Pedidos','Fornecedores'])}<span class="spacer"></span>
    <select class="select ctl" style="width:220px" aria-label="Negócio ou obra"><option>Todas as obras</option><option>Residência Duarte</option><option>Casa Valente</option></select>
    <select class="select ctl" style="width:220px" aria-label="Fornecedor"><option>Todos os fornecedores</option></select></div>
  <div class="stack">${FORN.map((g,gi)=>{const tot=g.items.reduce((a,r)=>a+r[2]*r[3],0);return `
    <section class="card flush rv" style="--d:${gi+2}"><div class="ch"><h2>${g.n}</h2><span class="lbl">${g.items.length} itens</span><span class="spacer"></span><b class="num">${brl(tot)}</b><button class="btn sm pri" data-ped="${M.esc(g.n)}">Gerar pedido</button></div>
    <div class="tblwrap"><table class="tbl"><thead><tr><th>Produto</th><th class="r">Qtd</th><th class="r">Custo unit.</th><th class="r">Subtotal</th><th>Obra</th><th class="r">Disponível</th></tr></thead><tbody>
    ${g.items.map(r=>`<tr><td>${r[0]}<span class="code">${r[1]}</span></td><td class="r num">${r[2]}</td><td class="r num">${brl(r[3])}</td><td class="r num" style="font-weight:600">${brl(r[2]*r[3])}</td><td class="soft">${r[4]}</td>
      <td class="r num">${r[5]>0?`<span class="chip g">${r[5]} no estoque · usar</span>`:`<span class="neg">${r[5]}</span>`}</td></tr>`).join('')}</tbody></table></div></section>`}).join('')}</div>`,
  mount:v=>$$('[data-ped]',v).forEach(b=>b.onclick=()=>M.toast(`Pedido de ${b.dataset.ped} criado como rascunho.`,'Abrir pedido'))},
 B:{label:'Pedidos',render:()=>`${compHead()}
  <div class="row rv" style="--d:1;margin-bottom:24px">${tabsHTML(['A comprar','Pedidos','Fornecedores'],1)}<span class="spacer"></span><span class="lbl">8 pedidos · ${brl(39444)}</span></div>
  <div class="grid g4" style="align-items:start">${PED.map((c,ci)=>`
    <section class="stack rv" style="--d:${ci+2};gap:12px" aria-label="${c[0]}">
      <div class="row" style="height:36px;padding:0 4px"><b>${c[0]}</b><span class="chip n">${c[1].length}</span><span class="spacer"></span><span class="lbl num">${brl0(c[1].reduce((a,p)=>a+p[2],0))}</span></div>
      ${c[1].map(p=>`<article class="card" style="padding:16px"><div class="row"><b style="flex:1;font-weight:600">${p[0]}</b></div><div class="lbl mt8">${p[3]} · ${p[1]} itens</div>
        <div class="row mt16"><b class="num" style="flex:1">${brl(p[2])}</b>${ci<3?`<button class="btn sm" data-adv="${ci}">${['Enviar','Confirmou','Receber'][ci]}</button>`:'<span class="chip g">Recebido</span>'}</div></article>`).join('')}
    </section>`).join('')}</div>`,
  mount:v=>$$('[data-adv]',v).forEach(b=>b.onclick=()=>M.toast(`Pedido movido para “${PED[+b.dataset.adv+1][0]}” (simulação).`))}
}});

/* =====================================================================
   PROPOSTAS (lista) — discreto
   ===================================================================== */
const PROPS=[['WG','Sérgio Bastos','Automação residencial',113587.66,'Vista','b','há 50 min',[['Essencial',98421.10],['Completa',113587.66],['Premium',141230.00]]],
 ['H','Caio','Cinema e áudio',249281.84,'Rascunho','n','há 7 h',[['Completa',249281.84]]],
 ['RR','Rodrigo Alencar','Rede e segurança',88411.31,'Enviada','b','ontem',[['Essencial',71902.40],['Completa',88411.31]]],
 ['TT','Lívia e Otávio','Segunda fase · Upgrade Automação',387709.02,'Aceita','g','há 3 dias',[['Essencial',301120.00],['Completa',387709.02],['Premium',452880.50]]],
 ['C','Marta','Iluminação',29200,'Enviada','b','há 2 dias',[['Completa',29200]]],
 ['TS','Sushi Yoru Bar','Som ambiente',35273.6,'Expirada','w','há 9 dias',[['Completa',35273.6]]],
 ['AV','Paula e Renato','Automação · apartamento',157368.44,'Enviada','b','há 3 dias',[['Essencial',132004.00],['Completa',157368.44]]]];
const propHead=()=>head({kick:'Comercial',title:'Propostas',sub:'35 propostas em andamento.',
  acts:`<button class="btn ctl">Modelo da proposta</button><a class="btn pri" href="#/construtor">${ic('mais')}Nova proposta</a>`});
const av=t=>`<span class="rel" style="width:40px;height:40px;border-radius:999px;display:grid;place-items:center;flex:none;font-weight:700;font-size:13px;color:rgb(var(--primary));background:rgb(var(--primary)/.12)">${t}</span>`;

M.screen('propostas',{title:'Propostas',variants:{
 A:{label:'Por negócio',render:()=>`${propHead()}
  <div class="row wrap rv" style="--d:1;margin-bottom:24px"><input class="input ctl" style="width:360px" placeholder="Buscar negócio, cliente ou número" aria-label="Buscar propostas" id="q">
    ${tabsHTML(['Todas','Rascunho','Enviadas','Vistas','Aceitas'],0,'ctl','Situação')}<span class="spacer"></span>
    <select class="select ctl" style="width:180px" aria-label="Ordenar"><option>Recentes</option><option>Valor</option><option>A–Z</option><option>Status</option></select></div>
  <section class="card flush rv" style="--d:2"><ul id="pl" style="list-style:none;margin:0;padding:0"></ul></section>`,
  mount:v=>{let f=0;const st=['','Rascunho','Enviada','Vista','Aceita'];const open=new Set();
    const draw=()=>{const q=$('#q',v).value.toLowerCase();
      $('#pl',v).innerHTML=PROPS.filter(p=>(!f||p[4]===st[f])&&(p[1]+p[2]).toLowerCase().includes(q)).map(p=>{const i=PROPS.indexOf(p),o=open.has(i);return `
      <li style="border-bottom:1px solid var(--line-2)"><div class="row" style="padding:12px var(--pad);min-height:72px;gap:16px">
        <button class="btn sm icon ghost" data-o="${i}" aria-expanded="${o}" aria-label="${o?'Recolher':'Ver'} opções de ${M.esc(p[1])}" style="color:var(--soft);transform:rotate(${o?90:0}deg);transition:transform .3s var(--ease)">${M.ic('seta',18)}</button>
        ${av(p[0])}<div style="flex:1;min-width:0"><div style="font-weight:600">${p[1]}</div><div class="lbl">${p[2]} · ${p[6]}</div></div>
        <span class="chip ${p[5]}" style="width:88px;justify-content:center">${p[4]}</span><b class="num" style="width:144px;text-align:right">${brl(p[3])}</b>
        <a class="btn sm" href="#/construtor" style="width:96px">Abrir</a></div>
        ${o?`<div class="grid g3" style="gap:12px;padding:0 var(--pad) var(--pad) 128px">${p[7].map((x,k)=>`<div class="in" style="border-radius:14px;padding:16px">
          <div class="row"><span class="lbl" style="flex:1">Opção ${k+1} · ${x[0]}</span>${p[4]==='Aceita'&&x[1]===p[3]?'<span class="chip g">Escolhida</span>':''}</div><div class="num mt8" style="font-size:20px;font-weight:600">${brl(x[1])}</div></div>`).join('')}</div>`:''}</li>`}).join('')||'<li class="soft" style="padding:24px">Nenhuma proposta encontrada.</li>';
      $$('[data-o]',v).forEach(b=>b.onclick=()=>{const i=+b.dataset.o;open.has(i)?open.delete(i):open.add(i);draw()});};
    $('#q',v).oninput=draw; $('[data-tabs]',v).addEventListener('tab',e=>{f=e.detail;draw()}); draw();}},
 B:{label:'Funil',render:()=>{const cols=[['Rascunho','n'],['Enviada','b'],['Vista','b'],['Aceita','g']];return `${propHead()}
  <div class="grid g4" style="align-items:start">${cols.map((c,ci)=>{const ps=PROPS.filter(p=>p[4]===c[0]);return `
   <section class="stack rv" style="--d:${ci+1};gap:12px" aria-label="${c[0]}"><div class="row" style="height:36px;padding:0 4px"><span class="dot" style="background:${c[1]==='g'?'rgb(var(--pos))':c[1]==='b'?'rgb(var(--primary))':'var(--faint)'}"></span><b>${c[0]}</b><span class="chip n">${ps.length}</span><span class="spacer"></span><span class="lbl num">${brl0(ps.reduce((a,p)=>a+p[3],0))}</span></div>
   ${ps.map(p=>`<a class="card" href="#/construtor" style="padding:16px;color:inherit;display:block"><div class="row">${av(p[0])}<div style="min-width:0"><div style="font-weight:600">${p[1]}</div><div class="lbl" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p[2]}</div></div></div>
     <div class="row mt16"><b class="num" style="flex:1">${brl(p[3])}</b><span class="lbl">${p[6]}</span></div></a>`).join('')||'<div class="card lbl" style="padding:16px">Nenhuma</div>'}</section>`}).join('')}</div>`}}
}});
})();

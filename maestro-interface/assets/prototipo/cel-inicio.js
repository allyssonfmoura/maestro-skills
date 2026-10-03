/* Maestro OS · celular · Início (tela-modelo: siga este padrão nas outras telas de celular) */
(function(){
const {ic,brl,esc}=M, K=M.m, D=M.D;
const pede=[
  {t:'2 cobranças em atraso',s:'Residência Duarte e Casa Valente · '+brl(146942.17),cor:'rgb(var(--neg))',icon:'financeiro',go:'#/financeiro'},
  {t:'Sérgio Bastos abriu a proposta 3 vezes',s:'Enviada há 4 dias, sem resposta',cor:'rgb(var(--primary))',icon:'propostas',go:'#/propostas'},
  {t:'Pedido da Luminar Sul sem confirmação',s:'Enviado ao fornecedor há 2 dias',cor:'rgb(var(--warn))',icon:'compras',go:'#/compras'}];
const agenda=[['09:00','Visita técnica','Casa Valente — Pampulha'],['11:30','Apresentar proposta','Paula e Renato'],['15:00','Reunião com fornecedor','Luminar Sul'],['17:30','Entrega de equipamentos','Residência Duarte']];
M.mscreen('dashboard',{title:'Início',tab:'dashboard',style:'editorial',glass:'tudo',
  help:['O que pede você hoje aparece primeiro; deslize a linha para a esquerda para agir.','Toque num número para abrir o módulo.','A barra de baixo é sua: segure-a para trocar os botões.'],
  render:()=>`${K.nav({title:'Início',kick:'Quinta-feira · 2 de outubro',editorial:true,acts:[{icon:'buscar',title:'Buscar',act:'buscar'},{icon:'sino',title:'Notificações, 3 não lidas',act:'sino',badge:3}]}).replace('<h1>Início</h1>','<h1>Bom <i>dia</i>, Allysson.</h1>')}
   ${K.group({title:'Pede você hoje',foot:'Deslize a linha para a esquerda para ver as ações.',rows:pede.map((p,i)=>({icon:p.icon,color:p.cor,title:p.t,sub:p.s,href:p.go,i,
      swipe:[{label:'Feito',icon:'check',act:'feito',tone:4},{label:'Adiar',icon:'relogio',act:'adiar',tone:5}]}))})}
   ${K.tiles([{label:'Fechado em outubro',value:`<span data-count="387709" data-pre="R$ ">R$ 0</span>`,sub:'8 propostas aceitas',act:'numbers',wide:true},
      {label:'Saldo em contas',value:brl(485253.98),act:'fin'},{label:'A receber',value:brl(244011.86),sub:'2 em atraso',act:'fin'},
      {label:'A pagar',value:brl(111430.57),sub:'4 em atraso',act:'fin'},{label:'Propostas abertas',value:'35',sub:'15 enviadas',act:'prop'}])}
   ${K.group({title:'Agenda de hoje',rows:agenda.map((a,i)=>({icon:a[0],color:i===0?'rgb(var(--primary))':'#8e8e93',title:a[1],sub:a[2],href:'#/agenda'}))})}
   <section class="grp"><h2>Obras em andamento</h2>${D.obras.filter(o=>o.status==='Em andamento'||o.status==='Planejamento').map(o=>`<a class="mcard" href="#/obra?id=${o.id}" style="display:block;color:inherit;text-decoration:none">
     <div class="row" style="gap:12px"><span style="flex:1;min-width:0"><b style="display:block;font-size:17px">${esc(o.nome)}</b><span class="soft" style="font-size:14px">${esc(o.etapa)} · ${esc(o.bairro)}</span></span><b class="num">${o.pct}%</b></div>
     <div class="prog mt8"><b style="width:${o.pct}%"></b></div></a>`).join('')}</section>`,
  mount:v=>M.wire(v,{buscar:()=>M.spotlight&&M.spotlight(),sino:b=>M.bell&&M.bell(b),numbers:()=>location.hash='#/numbers',fin:()=>location.hash='#/financeiro',prop:()=>location.hash='#/propostas',
    feito:b=>M.toast(`“${pede[+b.dataset.i].t}” marcado como feito.`,'Desfazer'),adiar:b=>K.actions({title:'Adiar para quando?',items:['Daqui a 1 hora','Amanhã de manhã','Semana que vem'].map(l=>({label:l,run:()=>M.toast('Adiado: '+l.toLowerCase()+'.')}))})})
});
})();

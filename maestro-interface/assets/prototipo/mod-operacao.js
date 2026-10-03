/* Maestro OS · protótipo · módulo Operação
   Telas: projetos · painel360 · obra (oculta: #/obra?id=o1&aba=relatorios) · tecnica · experiencia
   Fonte do real: inventario/02 (ProjectsPage + CardPanel, Painel 360, ImplementationsPage, CustomerSuccessPage).
   Corrigido em relação ao real: "Editar (em breve)" vira Editar de verdade; Equipamentos e Centro de custo
   (em breve no real) ganham a versão completa, marcada com "Novo". */
(function(){
const {ic,brl,brl0,$,$$,esc}=M, U=M.ui, D=M.D;

/* ---------- estilo próprio (prefixo op-, medidas múltiplas de 4, cores do tema) ---------- */
document.head.insertAdjacentHTML('beforeend',`<style id="op-css">
.op-k{padding:16px}
.op-kt{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.op-ks{font-size:12px;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.op-n12{font-size:12px}
.op-sel{height:36px;border-radius:10px;width:152px;padding:0 8px}
.op-link{border:0;background:none;padding:0;font:inherit;font-weight:600;color:rgb(var(--primary));cursor:pointer}
.op-seg{display:grid;gap:4px}
.op-seg>i{display:block;height:8px;border-radius:4px;background:color-mix(in srgb,var(--text) 8%,transparent)}
.op-seg>i.on{background:rgb(var(--primary))}
.op-seg>i.cur{background:rgb(var(--primary)/.4);box-shadow:inset 0 0 0 2px rgb(var(--primary))}
.op-steps{display:grid;gap:8px}
.op-steps>div{display:flex;flex-direction:column;gap:8px;min-width:0}
.op-steps>div>i{display:block;height:4px;border-radius:4px;background:color-mix(in srgb,var(--text) 8%,transparent)}
.op-steps>div>span{font-size:12px;color:var(--faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.op-steps>.on>i,.op-steps>.cur>i{background:rgb(var(--primary))}
.op-steps>.cur>span{color:var(--text);font-weight:600}
.op-nav{padding:12px;display:flex;flex-direction:column;gap:4px}
.op-ng{padding:12px 12px 4px;font-size:12px}
.op-ng:first-child{padding-top:4px}
.op-nav .btn{width:100%;justify-content:flex-start}
.op-nav .btn.ghost{color:var(--text);font-weight:500}
.op-list{list-style:none;margin:0;padding:0}
.op-list>li{display:flex;align-items:center;gap:12px;min-height:56px;padding:8px 0;border-top:1px solid var(--line-2)}
.op-list>li:first-child{border-top:0}
.op-acts3{width:312px;flex:none}
.op-acts2{width:204px;flex:none}
.op-date{width:44px;height:44px;border-radius:12px;flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgb(var(--primary)/.1);color:rgb(var(--primary));line-height:1.2}
.op-date b{font-size:16px}.op-date span{font-size:12px;font-weight:600}
.op-phgrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.op-ph{position:relative;aspect-ratio:4/3;border:0;border-radius:12px;display:grid;place-items:center;color:rgba(255,255,255,.88);overflow:hidden;cursor:pointer;padding:0;width:100%}
.op-ph span{position:absolute;left:8px;right:8px;bottom:8px;font-size:12px;font-weight:600;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.op-tl{list-style:none;margin:0;padding:0}
.op-tl>li{display:flex;gap:12px;padding:8px 0;position:relative;min-width:0}
.op-tl>li::before{content:"";position:absolute;left:4px;top:28px;bottom:-4px;width:4px;border-radius:4px;background:var(--line-2)}
.op-tl>li:last-child::before{display:none}
.op-tld{width:12px;height:12px;border-radius:12px;flex:none;margin-top:4px;box-shadow:inset 0 0 0 2px rgb(var(--primary));background:var(--panel)}
.op-gatemsg{display:flex;align-items:center;gap:8px;padding:12px 24px;border-top:1px solid var(--line-2);font-size:12px;color:rgb(var(--warn))}
.op-gatemsg[hidden]{display:none}
.op-note{border-radius:12px;padding:12px 16px;margin-top:16px}
.op-chk{display:flex;align-items:center;gap:12px;min-height:36px;cursor:pointer}
.op-chk input{width:16px;height:16px;accent-color:rgb(var(--primary));flex:none}
.op-chk.done span{color:var(--faint);text-decoration:line-through}
.op-oc{cursor:pointer;transition:transform .2s var(--ease)}
.op-oc:hover{transform:translateY(-2px)}
.op-oh{margin:16px 0 0;font-size:16px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.op-big{font-size:32px;font-weight:600;letter-spacing:-.02em;line-height:1.2}
.op-hl{animation:opHl 1.6s var(--ease)}
@keyframes opHl{0%{background:rgb(var(--primary)/.12)}100%{background:transparent}}
.op-ul{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;color:var(--soft)}
.op-stage{padding:16px 0;border-top:1px solid var(--line-2)}
.op-stage:first-of-type{border-top:0;padding-top:8px}
@media (max-width:900px){.op-phgrid{grid-template-columns:repeat(2,minmax(0,1fr))}.op-acts3,.op-acts2{width:100%}.op-list>li{flex-wrap:wrap}}
/* responsivo (02/10): tabelas com rótulo oculto não vazam da rolagem; coleções em auto-fill */
#op-pb .tblwrap,#op-ob .tblwrap,#op-obra .tblwrap,#op-tb .tblwrap,#op-cb .tblwrap,.sheet .tblwrap{position:relative}
.op-ogrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(288px,1fr));gap:24px}
.op-ell{display:block;max-width:340px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media (max-width:1440px){.op-ell{max-width:160px}}@media (max-width:1180px){.op-ell{max-width:200px}}
.op-dgrid{display:flex;flex-direction:column;gap:24px}
.op-dgrid>div{min-width:0}
.op-stepnow{display:none;margin-top:8px;font-size:13px;color:var(--soft)}
.op-stepnow b{color:var(--text)}
/* obra: no tablet e nos arranjos Coluna única e Lateral o menu de seções vira linha de abas roláveis acima do conteúdo */
@media (max-width:1180px){.op-obg>.op-side{display:contents}.op-obg>.op-side>.op-nav{grid-column:1/-1!important;order:0}.op-obg>#op-oc{grid-column:1/-1!important;order:1}.op-obg>.op-side>.op-data{grid-column:1/-1!important;order:2}.op-dgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}.op-nav{flex-direction:row;align-items:center;overflow-x:auto;padding:4px;scrollbar-width:none;gap:4px}.op-nav::-webkit-scrollbar{display:none}.op-nav .btn{width:auto;flex:none}.op-nav .op-ng{padding:0 4px 0 12px;margin-left:4px;flex:none;white-space:nowrap;border-left:1px solid var(--line);line-height:24px}.op-nav .op-ng:first-child{border-left:0;margin-left:0;padding-left:8px}}
[data-layout="coluna"] .op-obg>.op-side,[data-layout="lateral"] .op-obg>.op-side{display:contents}
[data-layout="coluna"] .op-obg>.op-side>.op-nav,[data-layout="lateral"] .op-obg>.op-side>.op-nav{grid-column:1/-1!important;order:0}
[data-layout="coluna"] .op-obg>#op-oc,[data-layout="lateral"] .op-obg>#op-oc{grid-column:1/-1!important;order:1}
[data-layout="coluna"] .op-obg>.op-side>.op-data,[data-layout="lateral"] .op-obg>.op-side>.op-data{grid-column:1/-1!important;order:2}
[data-layout="coluna"] .op-dgrid,[data-layout="lateral"] .op-dgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
[data-layout="coluna"] .op-nav,[data-layout="lateral"] .op-nav{flex-direction:row;align-items:center;overflow-x:auto;padding:4px;scrollbar-width:none;gap:4px}
[data-layout="coluna"] .op-nav::-webkit-scrollbar,[data-layout="lateral"] .op-nav::-webkit-scrollbar{display:none}
[data-layout="coluna"] .op-nav .btn,[data-layout="lateral"] .op-nav .btn{width:auto;flex:none}
[data-layout="coluna"] .op-nav .op-ng,[data-layout="lateral"] .op-nav .op-ng{padding:0 4px 0 12px;margin-left:4px;flex:none;white-space:nowrap;border-left:1px solid var(--line);line-height:24px}
[data-layout="coluna"] .op-nav .op-ng:first-child,[data-layout="lateral"] .op-nav .op-ng:first-child{border-left:0;margin-left:0;padding-left:8px}
@media (max-width:900px){#op-pq,#op-pc,#op-oq{width:100%!important}}
@media (max-width:600px){.op-steps.op-obst>div>span{display:none}.op-stepnow{display:block}#op-obra .big{font-size:24px;white-space:nowrap}}
</style>`);

/* ---------- utilidades ---------- */
const HOJE='02/10/2026', MES=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const pd=s=>{const [d,m,y]=String(s).split('/').map(Number);return new Date(y,m-1,d)};
const fd=dt=>`${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}`;
const okD=s=>/^\d{2}\/\d{2}\/\d{4}$/.test(s||'');
const addD=(s,n)=>{const d=pd(s);d.setDate(d.getDate()+n);return fd(d)};
const before=(a,b)=>pd(a)<pd(b);
const iso=s=>okD(s)?s.split('/').reverse().join('-'):'';
const br=s=>s&&/^\d{4}-\d{2}-\d{2}$/.test(s)?s.split('-').reverse().join('/'):'';
const dm=s=>okD(s)?s.slice(0,5):'—';
const money=s=>{const n=parseFloat(String(s||'').replace(/[^\d,.-]/g,'').replace(/\.(?=\d{3}(\D|$))/g,'').replace(',','.'));return isNaN(n)?0:n};
const curto=n=>n.includes(' e ')?n.split(' e ').map(s=>s.trim().split(/\s+/)[0]).join(' e '):n;
let SEQ=0; const nid=p=>p+'-'+(++SEQ)+'-'+Math.random().toString(36).slice(2,6);
const EQ=D.equipe.map(u=>u.nome);
const kv=(k,v)=>`<div class="kv"><span>${k}</span><b>${v}</b></div>`;
const none=t=>`<p class="lbl" style="margin:0">${t}</p>`;
const B=(label,act,o={})=>U.btn(label,{sm:true,act,...o});
const noRv=el=>$$('.rv',el).forEach(e=>e.classList.remove('rv'));
const sec=(id,title,body,btn='')=>`<section class="sec" id="op-s-${id}"><div class="row" style="margin-bottom:12px;min-height:36px"><h3 style="margin:0;flex:1">${title}</h3>${btn}</div>${body}</section>`;
const tl=arr=>arr.length?`<ol class="op-tl">${arr.map(e=>`<li><span class="op-tld" aria-hidden="true"></span><div style="min-width:0"><div class="op-kt">${esc(e.t)}</div><div class="lbl op-ks">${esc(e.q)}${e.d?' · '+esc(e.d):''}</div></div></li>`).join('')}</ol>`:none('Nada registrado ainda.');
const tile=f=>`<button type="button" class="op-ph" data-act="foto" data-id="${f.id}" aria-label="Foto: ${esc(f.leg)}, ${f.data}" title="${esc(f.leg)}" style="background:linear-gradient(140deg,hsl(${f.h} 42% 56%),hsl(${(f.h+40)%360} 46% 32%))">${ic('camera',24)}<span>${esc(f.leg)}</span></button>`;
const agList=arr=>arr.length?`<ul class="op-list">${arr.map(a=>`<li><div class="op-date" aria-hidden="true"><b>${a.data.slice(0,2)}</b><span>${MES[+a.data.slice(3,5)-1]}</span></div><div style="flex:1;min-width:0"><div class="op-kt">${esc(a.t)}</div><div class="lbl op-ks">${a.data} · ${esc(a.hora)}${a.tipo?' · '+esc(a.tipo):''} · ${esc(a.r)}</div></div></li>`).join('')}</ul>`:none('Nenhuma visita marcada.');
const hc=s=>s>=70?'rgb(var(--pos))':s>=40?'rgb(var(--warn))':'rgb(var(--neg))';
const ht=s=>s>=70?'g':s>=40?'w':'r';
const fotoPreview=f=>M.modal({title:f.leg,sub:`${f.data}${f.etapa?' · '+esc(f.etapa):''}`,width:'640px',ok:'Fechar',cancel:'',
  body:`<div class="op-ph" style="cursor:default;margin-bottom:16px;background:linear-gradient(140deg,hsl(${f.h} 42% 56%),hsl(${(f.h+40)%360} 46% 32%))">${ic('camera',24)}</div>`});

/* ---------- etapas e dicionários ---------- */
const PE=['Pré-projeto','Compras','Infraestrutura','Instalação','Programação','Entrega'];
const PE_N=i=>PE[i]+(i===PE.length-1?' ⭐':'');
const PST=['Planejamento','Em execução','Em pausa','Concluído','Cancelado'];
const ST_PROJ={'Planejamento':'n','Em execução':'b','Em pausa':'w','Concluído':'g','Cancelado':'r'};
const P2O={'Planejamento':'Planejamento','Em execução':'Em andamento','Em pausa':'Pausada','Concluído':'Concluída','Cancelado':'Cancelada'};
const ST_OBRA={'Planejamento':'n','Em andamento':'b','Pausada':'w','Concluída':'g','Cancelada':'r','Arquivada':'n'};
const TE=['Vistoria inicial','Projeto técnico','Infraestrutura','Cabeamento','Rack e quadro','Instalação de equipamentos','Rede e Wi-Fi','Programação','Testes','Treinamento do cliente','Vistoria final'];
const TE_N=i=>TE[i]+(i===TE.length-1?' ⭐':'');
const CE=['Boas-vindas','Primeiros 30 dias','Acompanhamento','Revisão anual','Expansão'];
const CST=['Ativo','Saudável','Em risco','Perdido'];
const ST_CS={'Ativo':'b','Saudável':'g','Em risco':'w','Perdido':'r'};
const AG_TIPOS=['Visita técnica','Instalação','Reunião com cliente','Entrega'];

/* ---------- obras: as compartilhadas (M.D.obras) + históricas deste módulo ---------- */
const EXTRA=[
 {id:'o6',nome:'Cobertura Lourdes',cliente:'Marcelo e Júlia Andrade',cidade:'Belo Horizonte',bairro:'Lourdes',status:'Concluída',etapa:'Entregue',pct:100,valor:96400,relatorios:15,fotos:104,gestor:'Diego Rocha',inicio:'05/01/2026',previsao:'15/05/2026',neg:{titulo:'Cobertura Lourdes — Automação',status:'Ganho',valor:96400}},
 {id:'o7',nome:'Casa Vila da Serra',cliente:'Ricardo Prates',cidade:'Nova Lima',bairro:'Vila da Serra',status:'Concluída',etapa:'Entregue',pct:100,valor:null,relatorios:0,fotos:6,gestor:'Diego Rocha',inicio:'10/03/2024',previsao:'20/08/2024',legado:true},
 {id:'o8',nome:'Casa Retiro das Pedras',cliente:'Fernanda Ribeiro',cidade:'Brumadinho',bairro:'Retiro das Pedras',status:'Concluída',etapa:'Entregue',pct:100,valor:142300,relatorios:21,fotos:120,gestor:'Diego Rocha',inicio:'14/04/2026',previsao:'25/09/2026',neg:{titulo:'Casa Retiro das Pedras — Automação e áudio',status:'Ganho',valor:142300}},
 {id:'o9',nome:'Apartamento Santo Agostinho',cliente:'Lúcia Moreira',cidade:'Belo Horizonte',bairro:'Santo Agostinho',status:'Concluída',etapa:'Entregue',pct:100,valor:38900,relatorios:9,fotos:47,gestor:'Diego Rocha',inicio:'08/07/2025',previsao:'30/09/2025',neg:{titulo:'Apartamento Santo Agostinho — Iluminação',status:'Ganho',valor:38900}},
 {id:'o10',nome:'Casa Lagoa da Pampulha',cliente:'Henrique Bastos',cidade:'Belo Horizonte',bairro:'Pampulha',status:'Cancelada',etapa:'Pré-projeto',pct:4,valor:null,relatorios:1,fotos:3,gestor:'Diego Rocha',inicio:'02/02/2026',previsao:'—',neg:{titulo:'Casa Lagoa — Automação',status:'Perdido',valor:52000}},
 {id:'o11',nome:'Apartamento Funcionários',cliente:'Gustavo Lemos',cidade:'Belo Horizonte',bairro:'Funcionários',status:'Em andamento',etapa:'Programação',pct:70,valor:null,relatorios:2,fotos:18,gestor:'Diego Rocha',inicio:'15/09/2026',previsao:'31/10/2026',legado:true}];
const OBRAS=()=>[...D.obras,...EXTRA];
const obraBy=id=>OBRAS().find(o=>o.id===id);
const negOf=o=>D.negocios.find(n=>n.obra===o.id)||o.neg||null;

/* ---------- estado do módulo (sobrevive à troca de tela) ---------- */
const T=(t,resp,prazo,st='aberta')=>({id:nid('t'),t,resp,prazo,st});
const AC=(t,quando,resp)=>({id:nid('a'),t,quando,resp});
const CK=()=>[['Fotos de antes e depois',true],['Teste de cada ponto instalado',false],['Cabos etiquetados',true],['Local limpo ao sair',false],['Assinatura do cliente no relatório',false]].map(([t,ok])=>({id:nid('k'),t,ok}));
const S=window.__op||(window.__op={
 pview:'kanban',tview:'kanban',cview:'kanban',pq:'',pc:'',p360:{q:'',st:0,view:'grade',lim:8},od:{},
 proj:[
  {id:'pr1',nome:'Residência Duarte — Automação',cid:'c1',cliente:'Helena Duarte',conjuge:'Rafael Duarte',obra:'o1',etapa:3,status:'Em execução',pct:64,inicio:'04/08/2026',previsao:'30/11/2026',resp:'Diego Rocha',equipe:['Diego Rocha','Bruno Lima'],
   gates:[{id:'g1',n:'Infra elétrica conferida pelo técnico',ok:true,em:3},{id:'g2',n:'Equipamentos 100% recebidos',ok:false,em:4,motivo:'Faltam 2 amplificadores do pedido da Sonos Brasil (enviado em 22/09).'}],
   tarefas:[T('Instalar teclados Control4 da sala','Bruno Lima','03/10/2026'),T('Fixar caixas de embutir da suíte','Bruno Lima','06/10/2026'),T('Conferir recebimento do pedido Sonos','Diego Rocha','30/09/2026'),T('Passar cabos do rack técnico','Bruno Lima','26/09/2026','feita')],
   acoes:[AC('Cobrar Sonos Brasil pelos 2 amplificadores','02/10/2026','Diego Rocha'),AC('Visita com a arquiteta para validar teclados','08/10/2026','Diego Rocha')],
   escopo:['Automação Control4 em 5 ambientes','Áudio ambiente na sala e na suíte','Rede Wi-Fi 7 com 3 pontos de acesso','Sanca de LED na cozinha'],
   obs:[{t:'Cliente pediu para não trabalhar às sextas à tarde.',autor:'Diego Rocha',quando:'12/09/2026'}]},
  {id:'pr2',nome:'Casa Valente — Rede e áudio',cid:'c2',cliente:'Marcos Valente',conjuge:'',obra:'o2',etapa:2,status:'Em execução',pct:38,inicio:'01/09/2026',previsao:'15/12/2026',resp:'Diego Rocha',equipe:['Diego Rocha','Bruno Lima'],
   gates:[{id:'g3',n:'Entrada recebida',ok:false,em:3,motivo:'A parcela de entrada venceu em 01/09 e ainda não foi registrada no Financeiro.'}],
   tarefas:[T('Passar tubulação seca da sala de TV','Bruno Lima','04/10/2026'),T('Validar pontos de rede com o cliente','Diego Rocha','07/10/2026'),T('Retirar cabos no fornecedor','Bruno Lima','29/09/2026','feita')],
   acoes:[AC('Conferir lista de compras da infra de rede','03/10/2026','Diego Rocha')],
   escopo:['Rede estruturada com 12 pontos','Wi-Fi 7 em 3 andares','Áudio ambiente em 4 zonas','Cinema na sala de TV'],obs:[]},
  {id:'pr3',nome:'Segunda fase · Upgrade Automação',cid:'c6',cliente:'Lívia Prates e Otávio Lemos',conjuge:'Miranda Lemos',obra:'o3',etapa:0,status:'Planejamento',pct:12,inicio:'28/09/2026',previsao:'20/03/2027',resp:'Diego Rocha',equipe:['Diego Rocha'],
   gates:[{id:'g4',n:'Contrato assinado',ok:false,em:1,motivo:'Contrato enviado em 29/09, aguardando a assinatura das duas partes.'}],
   tarefas:[T('Levantamento de medidas do 2º andar','Diego Rocha','05/10/2026'),T('Reunião de início com a arquiteta','Allysson Moura','08/10/2026')],
   acoes:[AC('Cobrar assinatura do contrato','03/10/2026','Carla Souza')],
   escopo:['Troca da central para CORE 5','Persianas motorizadas em 9 vãos','Cinema 7.2 no home theater','Rede mesh na área de lazer'],obs:[]},
  {id:'pr4',nome:'Residência Alameda — Automação',cid:'c12',cliente:'Construtora Alameda',conjuge:'',obra:'o4',etapa:1,status:'Em pausa',pct:22,inicio:'10/07/2026',previsao:'—',resp:'Diego Rocha',equipe:['Diego Rocha'],gates:[],
   tarefas:[T('Retomar compras após liberação da construtora','Diego Rocha','15/10/2026')],
   acoes:[AC('Confirmar data de retomada com a construtora','10/10/2026','Diego Rocha')],
   escopo:['Automação de iluminação','Som ambiente na área gourmet'],obs:[{t:'Obra pausada a pedido da construtora (atraso no reboco).',autor:'Diego Rocha',quando:'02/09/2026'}]},
  {id:'pr5',nome:'Apartamento Savassi — Automação',cid:'c9',cliente:'Paula e Renato Lopes',conjuge:'Renato Lopes',obra:'o5',etapa:5,status:'Concluído',pct:100,inicio:'02/03/2026',previsao:'30/06/2026',resp:'Diego Rocha',equipe:['Diego Rocha','Bruno Lima'],gates:[{id:'g5',n:'Termo de entrega assinado',ok:true,em:5}],
   tarefas:[T('Treinamento do cliente','Bruno Lima','25/06/2026','feita'),T('Termo de entrega assinado','Diego Rocha','30/06/2026','feita')],acoes:[],
   escopo:['Automação de iluminação e cortinas','Rede Wi-Fi 6 com 2 pontos','Som ambiente na varanda'],obs:[]}],
 tec:[
  {id:'t1',cliente:'Helena Duarte',projeto:'Residência Duarte',obra:'o1',endereco:'Rua Groenlândia, 410 · Cidade Jardim',etapa:5,inicio:'18/08/2026',fim:'',origem:'Projeto',resp:'Bruno Lima',equipe:['Bruno Lima'],agenda:[{data:'03/10/2026',hora:'08:00',t:'Instalação dos teclados da sala',tipo:'Instalação',r:'Bruno Lima'}],check:CK(),coment:[{t:'Teclados da sala chegaram na cor errada; troca já pedida.',autor:'Bruno Lima',quando:'30/09/2026'}]},
  {id:'t2',cliente:'Marcos Valente',projeto:'Casa Valente',obra:'o2',endereco:'Rua Expedicionário Paulo de Souza, 88 · Pampulha',etapa:3,inicio:'08/09/2026',fim:'',origem:'Projeto',resp:'Bruno Lima',equipe:['Bruno Lima'],agenda:[{data:'04/10/2026',hora:'09:00',t:'Passagem de cabos da sala de TV',tipo:'Instalação',r:'Bruno Lima'}],check:CK(),coment:[]},
  {id:'t3',cliente:'Lívia Prates e Otávio Lemos',projeto:'Residência Prates Lemos',obra:'o3',endereco:'Rua Paulo Piedade Campos, 1200 · Belvedere',etapa:0,inicio:'30/09/2026',fim:'',origem:'Projeto',resp:'Bruno Lima',equipe:['Bruno Lima','Diego Rocha'],agenda:[{data:'05/10/2026',hora:'14:00',t:'Vistoria inicial do 2º andar',tipo:'Visita técnica',r:'Bruno Lima'}],check:CK(),coment:[]},
  {id:'t4',cliente:'Paula e Renato Lopes',projeto:'Apartamento Savassi',obra:'o5',endereco:'Rua Pernambuco, 1010 · Savassi',etapa:6,inicio:'29/09/2026',fim:'',origem:'CS',reaberta:{motivo:'Ajuste',titulo:'Wi-Fi da suíte caindo à noite',por:'Elisa Prado'},resp:'Bruno Lima',equipe:['Bruno Lima'],agenda:[{data:'06/10/2026',hora:'10:00',t:'Visita de ajuste da rede',tipo:'Visita técnica',r:'Bruno Lima'}],check:CK(),coment:[]},
  {id:'t5',cliente:'Fernanda Ribeiro',projeto:'Casa Retiro das Pedras',obra:'o8',endereco:'Alameda do Ipê, 33 · Retiro das Pedras',etapa:10,inicio:'20/04/2026',fim:'',origem:'Projeto',resp:'Bruno Lima',equipe:['Bruno Lima'],agenda:[],check:CK(),coment:[]},
  {id:'t6',cliente:'Gustavo Lemos',projeto:'Apartamento Funcionários',obra:'o11',endereco:'Rua Antônio de Albuquerque, 271 · Funcionários',etapa:7,inicio:'15/09/2026',fim:'',origem:'Obra anterior',resp:'Bruno Lima',equipe:['Bruno Lima'],agenda:[],check:CK(),coment:[{t:'Obra começou com outra empresa; assumimos a programação.',autor:'Diego Rocha',quando:'15/09/2026'}]},
  {id:'t7',cliente:'Construtora Alameda',projeto:'Residência Alameda',obra:'o4',endereco:'Alameda das Acácias, 12 · Alphaville',etapa:2,inicio:'20/07/2026',fim:'',origem:'Projeto',resp:'Bruno Lima',equipe:['Bruno Lima'],agenda:[],check:CK(),coment:[]}],
 cs:[
  {id:'x1',cliente:'Paula e Renato Lopes',obra:'o5',etapa:2,status:'Em risco',saude:58,ultimo:'29/09/2026',tel:'(31) 99812-0021',resp:'Elisa Prado',
   alertas:[{id:'al1',t:'Wi-Fi da suíte caindo à noite',em:'28/09/2026',g:'Alta'}],acoes:[AC('Ligar para confirmar a visita de ajuste','03/10/2026','Elisa Prado')],
   agenda:[{data:'06/10/2026',hora:'10:00',t:'Visita de ajuste da rede',tipo:'Visita técnica',r:'Bruno Lima'}],expansoes:[],
   hist:[{q:'29/09/2026',t:'Técnica reaberta: Ajuste',d:'Wi-Fi da suíte caindo à noite'},{q:'28/09/2026',t:'Alerta registrado',d:'Cliente ligou relatando quedas no Wi-Fi'},{q:'30/06/2026',t:'Obra entregue',d:'Apartamento Savassi'}]},
  {id:'x2',cliente:'Lívia Prates e Otávio Lemos',obra:null,etapa:4,status:'Saudável',saude:92,ultimo:'27/09/2026',tel:'(31) 99433-9081',resp:'Elisa Prado',alertas:[],
   acoes:[AC('Acompanhar o início da Segunda fase','10/10/2026','Elisa Prado')],agenda:[],expansoes:[],
   hist:[{q:'25/09/2026',t:'Expansão fechada',d:'Segunda fase · Upgrade Automação · '+brl(387709.02)},{q:'12/06/2026',t:'Pulso registrado',d:'Saúde 90 · Muito satisfeito'}]},
  {id:'x3',cliente:'Marcelo e Júlia Andrade',obra:'o6',etapa:2,status:'Ativo',saude:74,ultimo:'15/09/2026',tel:'(31) 99645-2210',resp:'Elisa Prado',alertas:[],
   acoes:[AC('Revisão de 6 meses','15/11/2026','Elisa Prado')],agenda:[],expansoes:[],hist:[{q:'15/09/2026',t:'Pulso registrado',d:'Saúde 74 · Satisfeito'},{q:'15/05/2026',t:'Obra entregue',d:'Cobertura Lourdes'}]},
  {id:'x4',cliente:'Ricardo Prates',obra:'o7',etapa:3,status:'Em risco',saude:35,ultimo:'30/06/2026',tel:'(31) 98877-4031',resp:'Elisa Prado',legado:true,
   alertas:[{id:'al2',t:'Garantia do gravador de câmeras vence em 30 dias',em:'01/10/2026',g:'Média'},{id:'al3',t:'Sem contato há 94 dias',em:'02/10/2026',g:'Alta'}],
   acoes:[AC('Oferecer revisão anual com desconto','07/10/2026','Elisa Prado')],agenda:[],expansoes:[],hist:[{q:'30/06/2026',t:'Ligação',d:'Cliente sem tempo, pediu retorno depois'},{q:'20/08/2024',t:'Obra entregue (antes do Maestro)',d:'Casa Vila da Serra'}]},
  {id:'x5',cliente:'Fernanda Ribeiro',obra:'o8',etapa:0,status:'Saudável',saude:88,ultimo:'26/09/2026',tel:'(31) 99201-7788',resp:'Elisa Prado',alertas:[],
   acoes:[AC('Enviar o manual de uso do sistema','03/10/2026','Elisa Prado')],agenda:[{data:'09/10/2026',hora:'16:00',t:'Visita de boas-vindas',tipo:'Reunião com cliente',r:'Elisa Prado'}],expansoes:[],hist:[{q:'25/09/2026',t:'Obra entregue',d:'Casa Retiro das Pedras'}]},
  {id:'x6',cliente:'Lúcia Moreira',obra:'o9',etapa:3,status:'Perdido',saude:18,ultimo:'12/08/2026',tel:'(31) 98410-6623',resp:'Elisa Prado',
   alertas:[{id:'al4',t:'Cliente contratou outra empresa para a manutenção',em:'12/08/2026',g:'Alta'}],acoes:[],agenda:[],expansoes:[],hist:[{q:'12/08/2026',t:'Status mudou para Perdido',d:'Manutenção com outra empresa'},{q:'30/09/2025',t:'Obra entregue',d:'Apartamento Santo Agostinho'}]}]
});
const projOf=oid=>S.proj.find(p=>p.obra===oid);
const csOf=nome=>S.cs.find(c=>c.cliente===nome);
const telOf=nome=>{const c=D.contatos.find(x=>x.nome===nome);return c?c.tel:(csOf(nome)||{}).tel||'(31) 0000-0000'};
const oEt=o=>{const p=projOf(o.id);if(p)return p.etapa;const i=PE.indexOf(o.etapa);return i>=0?i:(o.status==='Concluída'?PE.length-1:0)};
const syncObra=p=>{const o=obraBy(p.obra);if(!o)return;o.pct=p.pct;o.etapa=PE[p.etapa];o.status=P2O[p.status]||o.status};
const pctP=i=>Math.round(i/(PE.length-1)*100);
const pctT=t=>t.done?100:Math.round(t.etapa/(TE.length-1)*100);

/* ---------- dados de cada obra (gerados uma vez, coerentes com o cadastro) ---------- */
const RES=['Passagem de cabos CAT6 nos quartos','Conferência da infra seca com o eletricista','Montagem do rack técnico','Instalação dos teclados da sala','Fixação das caixas de som de embutir','Configuração da rede Wi-Fi','Teste das cenas de iluminação','Vistoria com a arquiteta','Entrega de equipamentos no local','Ajuste fino do áudio ambiente'];
const LEG=['Rack técnico','Sala de estar','Suíte master','Cozinha','Área externa','Home office','Quadro elétrico','Teto da sala','Varanda','Escada','Garagem','Fachada'];
const ET_T=[['Levantamento de medidas','Aprovar projeto com o cliente'],['Gerar pedidos de compra','Conferir recebimento dos equipamentos'],['Passagem de tubulação','Infra seca aprovada'],['Instalar equipamentos','Fixar caixas e teclados'],['Programar cenas','Testar integrações'],['Treinamento do cliente','Termo de entrega assinado']];
function OD(id){
 if(S.od[id])return S.od[id];
 const o=obraBy(id), ativa=!['Concluída','Cancelada'].includes(o.status), ref=ativa?'01/10/2026':(okD(o.previsao)?o.previsao:o.inicio), et=oEt(o), nm=o.nome.length;
 const rel=Array.from({length:Math.min(o.relatorios,8)},(_,i)=>({id:nid('r'),data:addD(ref,-i*3),resumo:RES[(i+nm)%RES.length],autor:i%3===1?'Diego Rocha':'Bruno Lima',fotos:(i*5+3)%9+2,status:ativa&&i===0?'Pendente revisão':'Salvo',ve:i%2===0}));
 const fotos=Array.from({length:Math.min(o.fotos,12)},(_,i)=>({id:nid('f'),leg:LEG[i%LEG.length],data:addD(ref,-i*2),etapa:PE[Math.max(0,et-(i%3))],h:(i*37+nm*11)%360}));
 const anexos=o.legado?[{id:nid('x'),n:'Planta da obra (enviada pelo cliente).pdf',tipo:'Planta',por:'Bruno Lima',em:o.inicio}]
  :[{id:nid('x'),n:'Planta elétrica rev. 3.pdf',tipo:'Planta',por:'Diego Rocha',em:addD(o.inicio,1)},{id:nid('x'),n:'Projeto de automação.pdf',tipo:'Projeto',por:'Allysson Moura',em:o.inicio},{id:nid('x'),n:'Contrato assinado.pdf',tipo:'Contrato',por:'Carla Souza',em:o.inicio}];
 const agenda=ativa?[{data:'03/10/2026',hora:'08:00',t:'Instalação em campo',tipo:'Instalação',r:'Bruno Lima'},{data:'06/10/2026',hora:'14:00',t:'Visita de acompanhamento',tipo:'Visita técnica',r:'Diego Rocha'},{data:'09/10/2026',hora:'10:00',t:'Reunião com o cliente',tipo:'Reunião com cliente',r:'Allysson Moura'}]:[];
 const neg=negOf(o);
 const eventos=[{q:ref,t:'Relatório registrado',d:rel[0]?rel[0].resumo:'Sem relatórios'},{q:addD(ref,-2),t:'Fotos enviadas',d:'8 fotos · '+LEG[nm%LEG.length]},{q:addD(ref,-5),t:'Etapa da obra',d:PE_N(et)},{q:addD(o.inicio,3),t:'Compra enviada ao fornecedor',d:'Pedido de equipamentos'},{q:o.inicio,t:'Obra criada',d:neg?'Negócio ganho: '+neg.titulo:'Cadastrada como obra anterior ao Maestro'}];
 const full=!ativa||et>=4;
 const lista=[['Controlador de automação CORE 5','C4-CORE5','Rack técnico',1],['Interruptor inteligente 4 teclas','C4-KD120','Sala de estar',5],['Access point Wi-Fi 7 de teto U7-Pro','UBI-U7PRO','Rack técnico',3],['Amplificador de streaming Amp','SON-AMP','Sala de estar',2],['Caixa acústica de embutir 6,5"','KLI-CDT5650','Suíte master',4],['Cabo de rede CAT6','CAB-CAT6','Rack técnico',305]]
  .map(([p,m,a,q],i)=>({id:nid('l'),p,m,a,q,sep:full||et>=1?(id==='o1'&&i===3?0:q):0,ent:full?q:et>=3?(id==='o1'&&i===3?0:i===1?3:q):et>=2&&i===5?q:0}));
 const romaneios=lista.some(l=>l.ent)?[{id:nid('m'),n:'Romaneio #'+(10+nm),data:addD(o.inicio,20),itens:3,st:'Entregue'},{id:nid('m'),n:'Romaneio #'+(11+nm),data:addD(o.inicio,34),itens:2,st:'Entregue'}]:[];
 const equip=(full||et>=3)?[['Controlador CORE 5','Rack técnico','C4C5-',2,'Online'],['Access point U7-Pro','Sala de estar','U7P-',10,'Online'],['Access point U7-Pro','Suíte master','U7P-',11,'Online'],['Access point U7-Pro','Home office','U7P-',12,id==='o5'?'Offline':'Online'],['Amplificador Amp','Sala de estar','AMP-',20,'Online'],['Teclado KD120','Sala de estar','KD-',0,'Sem rede']]
  .map(([e,a,sn,ip,st],i)=>({id:nid('e'),e,a,sn:sn+(4100+nm*13+i*7),ip:ip?'192.168.10.'+ip:'—',gar:fd(new Date(pd(ref).getFullYear()+2,pd(ref).getMonth()-(i===5?20:0),pd(ref).getDate())),st})):[];
 let contrato=null;
 if(o.valor){const d0=pd(o.inicio), st=o.status==='Planejamento'?'Enviado':'Assinado';
  contrato={st,valor:o.valor,parcelas:Array.from({length:6},(_,k)=>{const venc=k===0?o.inicio:fd(new Date(d0.getFullYear(),d0.getMonth()+k-1,12));
   const vencida=(id==='o1'&&k===2)||(id==='o2'&&k===0);
   return {id:nid('p'),n:(k===0?'Entrada · ':'')+(k+1)+'/6',venc,v:Math.round(o.valor/6*100)/100,st:st!=='Assinado'?'Aguardando assinatura':vencida?'Vencida':before(venc,HOJE)?'Recebida':'A vencer'}})}}
 const base=o.valor||0, cat=[['Equipamentos',.5],['Mão de obra',.2],['Infraestrutura',.1],['Deslocamento',.04]];
 const custos=!base?[]:cat.map(([c,s],i)=>({c,orc:Math.round(base*s),real:Math.round(base*s*(ativa?Math.min(1,o.pct/100+.08)*(i===3?1.3:1):(i===1?1.06:.97)))}));
 const lanc=base?[{id:nid('c'),data:addD(o.inicio,6),d:'Pedido de equipamentos',c:'Equipamentos',f:'Control4 Brasil',v:Math.round(base*.18)},{id:nid('c'),data:addD(o.inicio,12),d:'Cabos e conectores',c:'Infraestrutura',f:'Ubiquiti · Distribuidor',v:Math.round(base*.04)},{id:nid('c'),data:addD(o.inicio,20),d:'Diárias da equipe técnica',c:'Mão de obra',f:'—',v:Math.round(base*.06)},{id:nid('c'),data:addD(o.inicio,21),d:'Combustível e pedágio',c:'Deslocamento',f:'—',v:Math.round(base*.01)}]:[];
 const tarefas=PE.map((e,i)=>ET_T[i].map((t,j)=>({id:nid('k'),t,ok:i<et||(i===et&&j===0&&o.status!=='Planejamento')||o.status==='Concluída'})));
 const nexos=id==='o1'?[{id:nid('n'),t:'Cobrar Sonos Brasil pelos amplificadores',quem:'Diego Rocha',prazo:'30/09/2026',atrasado:true}]:id==='o2'?[{id:nid('n'),t:'Conferir lista de compras da infra de rede',quem:'Diego Rocha',prazo:'03/10/2026'}]:[];
 return S.od[id]={rel,fotos,anexos,agenda,eventos,lista,romaneios,equip,contrato,custos,lanc,tarefas,nexos,compra:id==='o1'?'Compra atrasada: pedido da Sonos Brasil sem entrega':''};
}
const atencao=o=>{const d=OD(o.id),a=[];
 if(d.contrato)d.contrato.parcelas.filter(x=>x.st==='Vencida').forEach(x=>a.push({tone:'neg',t:`Parcela ${x.n} vencida em ${dm(x.venc)} · ${brl(x.v)}`,go:'aba:contrato'}));
 d.nexos.filter(n=>n.atrasado).forEach(n=>a.push({tone:'neg',t:'Nexo atrasado: '+n.t,go:'#/nexos'}));
 if(d.compra)a.push({tone:'warn',t:d.compra,go:'#/compras'});
 return a};

/* ---------- formulários compartilhados ---------- */
function agendarModal({titulo='',onOk}){
 M.modal({title:'Agendar',sub:'O compromisso aparece na Agenda da equipe e nesta ficha.',fields:[
  {k:'t',label:'Título',req:true,span:12,value:titulo,ph:'Ex.: Visita técnica de acompanhamento'},
  {k:'tipo',label:'Tipo',type:'select',opts:AG_TIPOS,span:6},{k:'r',label:'Responsável',type:'select',opts:EQ,value:'Bruno Lima',span:6},
  {k:'data',label:'Data',type:'date',req:true,span:6,value:'2026-10-05'},{k:'hora',label:'Hora',type:'time',req:true,span:6,value:'09:00'},
  {k:'obs',label:'Observação',type:'textarea',span:12}],ok:'Agendar',
  onOk:v=>{const a={data:br(v.data),hora:v.hora,t:v.t,tipo:v.tipo,r:v.r};onOk(a);M.toast(`Agendado para ${dm(a.data)} às ${a.hora}.`)}});
}
const pushAgenda=(arr,a)=>{arr.push(a);arr.sort((x,y)=>pd(x.data)-pd(y.data))};
const contatoChoices=()=>[...new Set([...D.contatos.filter(c=>c.papel==='Cliente').map(c=>c.nome),...EXTRA.map(o=>o.cliente)])];

/* =====================================================================
   PROJETOS
   ===================================================================== */
const gateBloq=(p,to)=>to>p.etapa?p.gates.find(g=>!g.ok&&!g.just&&to>=g.em):null;
function moveProj(p,to,redraw){
 if(to===p.etapa||to<0||to>=PE.length)return;
 const g=gateBloq(p,to); if(g)return gateModal(p,g,to,redraw);
 const from=p.etapa,fs=p.status; p.etapa=to;p.pct=pctP(to); if(p.status==='Planejamento'&&to>0)p.status='Em execução'; syncObra(p); redraw();
 M.toast(`${curto(p.cliente)} → ${PE_N(to)}`,'Desfazer',()=>{p.etapa=from;p.pct=pctP(from);p.status=fs;syncObra(p);redraw()});
}
function gateModal(p,g,to,redraw){
 M.modal({title:'Etapa bloqueada',width:'520px',sub:`Para levar <b>${esc(p.nome)}</b> para “${esc(PE_N(to))}”, falta cumprir o gate <b>${esc(g.n)}</b>.`,
  body:g.motivo?`<div class="in op-note">${esc(g.motivo)}</div>`:'',ok:'Ver gates do projeto',cancel:'Fechar',onOk:()=>{setTimeout(()=>projSheet(p,'gates',redraw),320)}});
}
function editProj(p,done){
 M.modal({title:'Editar projeto',sub:esc(p.cliente),fields:[
  {k:'nome',label:'Nome do projeto',req:true,span:12,value:p.nome},
  {k:'resp',label:'Responsável',type:'select',opts:EQ,value:p.resp,span:6},{k:'status',label:'Status',type:'select',opts:PST,value:p.status,span:6},
  {k:'ini',label:'Início',type:'date',value:iso(p.inicio),span:6},{k:'prev',label:'Previsão de entrega',type:'date',value:iso(p.previsao),span:6},
  {k:'conj',label:'Cônjuge',value:p.conjuge||'',span:12,help:'Usado na busca de projetos.'}],ok:'Salvar',
  onOk:v=>{p.nome=v.nome;p.resp=v.resp;p.status=v.status;p.inicio=br(v.ini)||p.inicio;p.previsao=br(v.prev)||'—';p.conjuge=v.conj;if(p.status==='Concluído')p.pct=100;syncObra(p);done();M.toast('Projeto salvo.')}});
}
function concluirProj(p,done){
 const fin=()=>{const fs=p.status;p.status='Concluído';p.pct=100;syncObra(p);done();M.toast(`${p.nome} concluído.`,'Desfazer',()=>{p.status=fs;p.pct=pctP(p.etapa);syncObra(p);done()})};
 const t=S.tec.find(x=>x.obra===p.obra&&!x.done);
 if(t)return M.modal({title:'A Técnica ainda está nesta obra',width:'520px',sub:`A execução técnica de ${esc(p.cliente)} está em “${esc(TE[t.etapa])}”. Concluir a obra mesmo assim?`,ok:'Concluir obra',cancel:'Manter em andamento',onOk:fin});
 fin();
}
function projSheet(p,secId,redraw){
 let s; const od=()=>OD(p.obra);
 const bloq=()=>p.status==='Concluído'||p.etapa>=PE.length-1?null:gateBloq(p,p.etapa+1);
 const sub=()=>`${esc(p.cliente)} · ${esc(PE_N(p.etapa))} · ${p.resp?'Responsável: '+esc(p.resp):'Sem responsável'}`;
 const chips=()=>U.chip(p.status,ST_PROJ[p.status])+(bloq()?U.chip('Bloqueado por gate','r'):'');
 const plan=i=>{const a=pd(p.inicio),z=okD(p.previsao)?pd(p.previsao):new Date(a.getTime()+120*864e5),st=(z-a)/PE.length;return [fd(new Date(a.getTime()+st*i)),fd(new Date(a.getTime()+st*(i+1)))]};
 const body=()=>{const d=od(),ab=p.tarefas.filter(t=>t.st==='aberta'),fe=p.tarefas.filter(t=>t.st!=='aberta'),c=d.contrato,parc=c?c.parcelas:[];
  const rec=parc.filter(x=>x.st==='Recebida').reduce((a,x)=>a+x.v,0),tot=parc.reduce((a,x)=>a+x.v,0),venc=parc.filter(x=>x.st==='Vencida'),prox=parc.find(x=>x.st!=='Recebida');
  return [
  `<section class="sec">${kv('Cliente',`<button type="button" class="op-link" data-act="contato">${esc(p.cliente)}</button>`)}${p.conjuge?kv('Cônjuge',esc(p.conjuge)):''}${kv('Etapa',esc(PE_N(p.etapa)))}${kv('Progresso',p.pct+'%')}${kv('Início',p.inicio)}${kv('Previsão de entrega',p.previsao)}</section>`,
  sec('tarefas','Tarefas',(ab.length?`<ul class="op-list">${ab.map(t=>`<li><div style="flex:1;min-width:0"><div class="op-kt">${esc(t.t)}</div><div class="lbl op-ks">${esc(t.resp)} · prazo ${dm(t.prazo)}${before(t.prazo,HOJE)?' · <span class="neg">atrasada</span>':''}${t.adiada?' · adiada':''}</div></div>
    <div class="btnrow op-acts3">${B('Adiar','t-adiar',{attrs:`data-id="${t.id}"`})}${B('Dispensar','t-disp',{attrs:`data-id="${t.id}"`})}${B('Concluir','t-ok',{attrs:`data-id="${t.id}"`})}</div></li>`).join('')}</ul>`:none('Nenhuma tarefa aberta.'))
    +(fe.length?`<div class="lbl mt16" style="margin-bottom:4px">Feitas e dispensadas</div><ul class="op-list">${fe.map(t=>`<li style="min-height:44px"><span class="op-kt soft" style="flex:1">${esc(t.t)}</span>${U.chip(t.st==='feita'?'Feita':'Dispensada',t.st==='feita'?'g':'n')}</li>`).join('')}</ul>`:''),B('Nova tarefa','t-nova',{icon:'mais'})),
  sec('gates','Gates',p.gates.length?`<ul class="op-list">${p.gates.map(g=>`<li><div style="flex:1;min-width:0"><div class="op-kt">${esc(g.n)}</div><div class="lbl op-ks">Exigido para entrar em “${esc(PE_N(g.em))}”${g.just?' · justificado: '+esc(g.just):''}</div></div>
    ${g.ok?U.chip('Cumprido','g'):g.just?U.chip('Justificado','w'):`<div class="btnrow op-acts2">${B('Justificar','g-just',{attrs:`data-id="${g.id}"`})}${B('Cumprido','g-ok',{attrs:`data-id="${g.id}"`})}</div>`}</li>`).join('')}</ul>`:none('Nenhum gate neste pipeline.')),
  sec('acoes','Próximas ações',p.acoes.length?`<ul class="op-list">${p.acoes.map(a=>`<li><div style="flex:1;min-width:0"><div class="op-kt">${esc(a.t)}</div><div class="lbl op-ks">${dm(a.quando)} · ${esc(a.resp)}</div></div><div class="btnrow op-acts2">${B('Delegar','a-del',{attrs:`data-id="${a.id}"`})}${B('Concluir','a-ok',{attrs:`data-id="${a.id}"`})}</div></li>`).join('')}</ul>`:none('Sem próxima ação. Toda obra andando tem uma.'),B('Nova próxima ação','a-nova',{icon:'mais'})),
  sec('cronograma','Cronograma',`<ul class="op-list">${PE.map((e,i)=>{const [a,z]=plan(i);return `<li style="min-height:44px"><span class="dot" style="background:${i<p.etapa?'rgb(var(--pos))':i===p.etapa?'rgb(var(--primary))':'var(--line)'}"></span><span class="op-kt" style="flex:1">${esc(PE_N(i))}</span><span class="lbl num">${dm(a)} – ${dm(z)}</span>${U.chip(i<p.etapa?'Feita':i===p.etapa?'Agora':'Prevista',i<p.etapa?'g':i===p.etapa?'b':'n')}</li>`}).join('')}</ul>`),
  sec('escopo','Escopo da obra',`<ul class="op-ul">${p.escopo.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`),
  sec('contrato','Contrato',c?kv('Situação',U.chip(c.st,c.st==='Assinado'?'g':'b'))+kv('Valor',brl(c.valor))+kv('Parcelas',parc.length):none('Sem contrato no Maestro.'),B('Abrir contrato','ir',{attrs:'data-aba="contrato"'})),
  sec('recebimento','Recebimento',c?kv('Recebido',`<span class="pos">${brl(rec)}</span>`)+kv('A receber',brl(tot-rec))+kv('Próxima parcela',prox?`${prox.n} · ${dm(prox.venc)}`:'—')+(venc.length?`<div class="mt8">${U.chip(venc.length+' parcela vencida','r')}</div>`:''):none('Nada a receber registrado.')),
  sec('lista','Lista de venda',`<ul class="op-list">${d.lista.slice(0,4).map(l=>`<li style="min-height:44px"><span class="op-kt" style="flex:1">${esc(l.p)}</span><span class="lbl num">${l.ent} de ${l.q} entregues</span></li>`).join('')}</ul>`,B('Ver lista completa','ir',{attrs:'data-aba="lista"'})),
  sec('equipe','Equipe',`<div class="row" style="gap:12px;flex-wrap:wrap">${p.equipe.map(n=>`<span class="row" style="gap:8px">${U.av(n)}<span>${esc(n)}</span></span>`).join('')}</div>`,B('Adicionar pessoa','eq-add',{icon:'mais'})),
  sec('fotos','Fotos',d.fotos.length?`<div class="op-phgrid">${d.fotos.slice(0,4).map(tile).join('')}</div>`:none('Nenhuma foto ainda.'),B('Ver todas','ir',{attrs:'data-aba="fotos"'})),
  sec('anexos','Anexos',d.anexos.length?`<ul class="op-list">${d.anexos.map(a=>`<li><span class="thumb sm" aria-hidden="true">${ic('doc',16)}</span><div style="flex:1;min-width:0"><div class="op-kt">${esc(a.n)}</div><div class="lbl op-ks">${esc(a.por)} · ${a.em}</div></div><div class="btnrow op-acts2">${B('Baixar','ax-get',{attrs:`data-id="${a.id}"`})}${B('Remover','ax-rem',{attrs:`data-id="${a.id}"`})}</div></li>`).join('')}</ul>`:none('Nenhum anexo.'),B('Enviar anexo','ax-novo',{icon:'upload'})),
  sec('obs','Observações',p.obs.length?tl(p.obs.map(o=>({q:o.quando+' · '+o.autor,t:o.t}))):none('Nenhuma observação.'),B('Registrar observação','obs-nova',{icon:'mais'}))].join('')};
 const foot=()=>{const b=$('[data-act="avancar"]',s.el),last=p.etapa>=PE.length-1,g=bloq();
  b.textContent=p.status==='Concluído'?'Projeto concluído':last?'Concluir projeto':`Avançar para "${PE_N(p.etapa+1)}"`;
  b.disabled=p.status==='Concluído'||!!g;
  let m=$('.op-gatemsg',s.el); if(!m){$('.sf',s.el).insertAdjacentHTML('beforebegin','<div class="op-gatemsg" role="note" hidden></div>');m=$('.op-gatemsg',s.el)}
  m.hidden=!g; m.innerHTML=g?`${ic('chave',16)}<span>Não dá para avançar: falta “${esc(g.n)}”. ${esc(g.motivo||'')}</span>`:''};
 const sync=()=>{$('#op-shsub',s.el).innerHTML=sub();$('#op-shchips',s.el).innerHTML=chips();const sb=$('.sb',s.el),y=sb.scrollTop;sb.innerHTML=body();sb.scrollTop=y;foot();M.wire(s.el,{__x:s.close,...H});redraw&&redraw()};
 const fT=el=>p.tarefas.find(t=>t.id===el.dataset.id), fA=el=>p.acoes.find(a=>a.id===el.dataset.id), fG=el=>p.gates.find(g=>g.id===el.dataset.id);
 const H={
  editar:()=>editProj(p,sync),
  agendar:()=>agendarModal({onOk:a=>{pushAgenda(od().agenda,a);sync()}}),
  painel:()=>{s.close();location.hash='#/obra?id='+p.obra},
  excluir:()=>M.modal({title:'Excluir projeto',width:'520px',sub:'O projeto vai para a Lixeira e pode ser restaurado em até 30 dias.',danger:true,ok:'Mover para a Lixeira',
   fields:[{k:'senha',label:'Senha (protótipo: não use a real)',ph:'qualquer texto',type:'password',req:true,span:12},{k:'just',label:'Justificativa',type:'textarea',req:true,span:12,ph:'Por que este projeto está sendo excluído?'}],
   onOk:()=>{const i=S.proj.indexOf(p);S.proj.splice(i,1);s.close();redraw&&redraw();M.toast('Projeto movido para a Lixeira.','Desfazer',()=>{S.proj.splice(i,0,p);redraw&&redraw()})}}),
  avancar:()=>{if(p.etapa>=PE.length-1)return concluirProj(p,sync);moveProj(p,p.etapa+1,sync)},
  contato:()=>{s.close();location.hash='#/contatos?ficha='+p.cid},
  ir:el=>{s.close();location.hash='#/obra?id='+p.obra+'&aba='+el.dataset.aba},
  't-adiar':el=>{const t=fT(el);M.modal({title:'Adiar tarefa',sub:esc(t.t),width:'520px',ok:'Adiar',fields:[{k:'d',label:'Nova data',type:'date',req:true,span:12,value:iso(addD(HOJE,3))},{k:'m',label:'Motivo',type:'textarea',req:true,span:12}],
   onOk:v=>{t.prazo=br(v.d);t.adiada=true;p.obs.unshift({t:`Tarefa adiada para ${t.prazo}: ${v.m}`,autor:'Allysson Moura',quando:HOJE});sync();M.toast('Tarefa adiada.')}})},
  't-disp':el=>{const t=fT(el);M.confirm({title:'Dispensar tarefa',text:t.t,field:'Motivo',ok:'Dispensar',run:v=>{t.st='dispensada';p.obs.unshift({t:`Tarefa dispensada (“${t.t}”): ${v.motivo}`,autor:'Allysson Moura',quando:HOJE});sync()}})},
  't-ok':el=>{const t=fT(el);t.st='feita';sync();M.toast('Tarefa concluída.','Desfazer',()=>{t.st='aberta';sync()})},
  't-nova':()=>M.modal({title:'Nova tarefa',width:'560px',ok:'Criar tarefa',fields:[{k:'t',label:'Tarefa',req:true,span:12},{k:'r',label:'Responsável',type:'select',opts:EQ,value:p.resp,span:6},{k:'d',label:'Prazo',type:'date',req:true,span:6}],
   onOk:v=>{p.tarefas.unshift(T(v.t,v.r,br(v.d)));sync();M.toast('Tarefa criada.')}}),
  'g-just':el=>{const g=fG(el);M.modal({title:'Justificar gate',sub:`“${esc(g.n)}” deixa de bloquear o avanço. A justificativa fica registrada.`,width:'520px',ok:'Justificar',fields:[{k:'j',label:'Justificativa',type:'textarea',req:true,span:12}],
   onOk:v=>{g.just=v.j;p.obs.unshift({t:`Gate “${g.n}” justificado: ${v.j}`,autor:'Allysson Moura',quando:HOJE});sync();M.toast('Gate justificado.')}})},
  'g-ok':el=>{const g=fG(el);g.ok=true;sync();M.toast(`Gate “${g.n}” cumprido.`,'Desfazer',()=>{g.ok=false;sync()})},
  'a-del':el=>{const a=fA(el);M.modal({title:'Delegar próxima ação',sub:esc(a.t),width:'520px',ok:'Delegar',fields:[{k:'r',label:'Para quem',type:'select',opts:EQ,value:a.resp,span:12}],onOk:v=>{a.resp=v.r;sync();M.toast(`Delegada para ${v.r}.`)}})},
  'a-ok':el=>{const a=fA(el);M.modal({title:'Concluir próxima ação',sub:esc(a.t),width:'520px',ok:'Concluir',fields:[{k:'f',label:'O que foi feito?',type:'textarea',req:true,span:12}],
   onOk:v=>{p.acoes=p.acoes.filter(x=>x!==a);p.obs.unshift({t:`${a.t}: ${v.f}`,autor:a.resp,quando:HOJE});sync();M.toast('Próxima ação concluída.')}})},
  'a-nova':()=>M.modal({title:'Nova próxima ação',width:'560px',ok:'Criar',fields:[{k:'t',label:'Próxima ação',req:true,span:12},{k:'d',label:'Quando',type:'date',req:true,span:6},{k:'r',label:'Responsável',type:'select',opts:EQ,value:p.resp,span:6}],
   onOk:v=>{p.acoes.push(AC(v.t,br(v.d),v.r));sync();M.toast('Próxima ação criada.')}}),
  'eq-add':()=>{const rest=EQ.filter(n=>!p.equipe.includes(n));if(!rest.length)return M.toast('Toda a equipe já está neste projeto.');
   M.modal({title:'Adicionar à equipe',width:'480px',ok:'Adicionar',fields:[{k:'n',label:'Pessoa',type:'select',opts:rest,span:12}],onOk:v=>{p.equipe.push(v.n);sync()}})},
  'ax-get':el=>{const a=od().anexos.find(x=>x.id===el.dataset.id);M.toast(`Baixaria “${a.n}” (simulação).`)},
  'ax-rem':el=>{const d=od(),a=d.anexos.find(x=>x.id===el.dataset.id);M.confirm({title:'Remover anexo?',text:a.n,ok:'Remover',danger:true,run:()=>{const i=d.anexos.indexOf(a);d.anexos.splice(i,1);sync();M.toast('Anexo removido.','Desfazer',()=>{d.anexos.splice(i,0,a);sync()})}})},
  'ax-novo':()=>anexoModal(od(),sync),
  'obs-nova':()=>M.modal({title:'Registrar observação',width:'560px',ok:'Registrar',fields:[{k:'t',label:'Observação',type:'textarea',req:true,span:12}],onOk:v=>{p.obs.unshift({t:v.t,autor:'Allysson Moura',quando:HOJE});sync()}}),
  foto:el=>fotoPreview(od().fotos.find(f=>f.id===el.dataset.id))};
 s=M.sheet({kick:'Projeto',title:p.nome,sub:`<span id="op-shsub">${sub()}</span>`,chips:`<span id="op-shchips" class="row" style="gap:8px">${chips()}</span>`,
  acts:[{label:'Editar',act:'editar'},{label:'Agendar',act:'agendar'},{label:'Painel 360',act:'painel'},{label:'Excluir',act:'excluir'}],
  body:body(),foot:[{label:'Fechar',act:'__x'},{label:'Avançar',act:'avancar',pri:true}],on:H});
 foot(); M.wire(s.el,{__x:s.close,...H});
 if(secId)requestAnimationFrame(()=>{const t=$('#op-s-'+secId,s.el);if(t){t.scrollIntoView({block:'start'});t.classList.add('op-hl')}});
}
function anexoModal(d,done){
 M.modal({title:'Enviar anexo',width:'560px',ok:'Enviar',fields:[{k:'f',label:'Arquivo',type:'file',span:12,req:true},{k:'n',label:'Nome do anexo',span:6,ph:'Ex.: Planta elétrica rev. 4'},{k:'tipo',label:'Tipo',type:'select',opts:['Planta','Projeto','Contrato','Manual','Outro'],span:6}],
  onOk:(v,el)=>{const fi=$('input[type=file]',el),nm=v.n||(fi.files[0]?fi.files[0].name:'Anexo');d.anexos.unshift({id:nid('x'),n:nm,tipo:v.tipo,por:'Allysson Moura',em:HOJE});done();M.toast('Anexo enviado.')}});
}

M.screen('projetos',{title:'Projetos',dock:'projetos',
 help:['Cada negócio ganho vira um projeto aqui, na primeira etapa.','Arraste o cartão para outra coluna para mudar a etapa; se um gate estiver pendente, o sistema mostra o que falta.',
  'Clique no cartão para abrir o detalhe com tarefas, gates, contrato e recebimento. O ⋯ do cartão leva direto à seção.','Em Lista você vê as datas e troca o status de cada projeto ali mesmo.'],
 variants:{A:{label:'Projetos',
  render:()=>{const cli=[...new Map(S.proj.map(p=>[p.cid,p.cliente])).entries()];
   return U.page({kick:'Operação',title:'Projetos',sub:'Projetos criados automaticamente a partir de negócios ganhos. Arraste no kanban pra avançar etapa.'})
   +U.bar(U.search('Buscar cliente, título ou cônjuge','op-pq','320px')+U.select('Filtrar por contato',[['','Todos os contatos'],...cli],'op-pc','240px'),U.viewToggle(S.pview,'op-pvw'))
   +'<div id="op-pb"></div>'},
  mount:v=>{
   const body=$('#op-pb',v),q=$('#op-pq',v),c=$('#op-pc',v); let first=true,cur=[];
   if(M.q.get('contactId'))S.pc=M.q.get('contactId'); q.value=S.pq; c.value=S.pc;
   const list=()=>{const t=S.pq.toLowerCase();return S.proj.filter(p=>(!S.pc||p.cid===S.pc)&&(p.cliente+' '+p.nome+' '+(p.conjuge||'')).toLowerCase().includes(t))};
   const card=p=>{const i=S.proj.indexOf(p),g=gateBloq(p,p.etapa+1);return `<article class="card kcard op-k" data-act="abrir" data-i="${i}" tabindex="0" role="button" draggable="true" data-drag="${i}" aria-label="${esc(p.nome)}">
    <div class="row" style="gap:8px;align-items:flex-start"><div style="flex:1;min-width:0"><div class="op-kt">${esc(curto(p.cliente))}</div><div class="lbl op-ks">${esc(p.nome)}</div></div>${U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Ações do projeto',act:'mais',attrs:`data-i="${i}"`})}</div>
    <div class="mt16">${U.prog(p.pct)}</div>
    <div class="row mt8"><span class="lbl op-n12" style="flex:1">${esc(PE_N(p.etapa))}</span><b class="num op-n12">${p.pct}%</b></div>
    <div class="row mt8" style="gap:8px;flex-wrap:wrap"><span class="lbl op-n12" style="flex:1 1 auto;white-space:nowrap">Iniciado ${p.inicio}</span>${g?`<span title="${esc(g.n)}">${U.chip('Bloqueado','r')}</span>`:''}${p.status!=='Em execução'?U.chip(p.status,ST_PROJ[p.status]):''}</div></article>`};
   const draw=()=>{cur=list();
    if(!S.proj.length)body.innerHTML=`<section class="card">${U.empty({title:'Nenhum projeto ainda.',text:'Projetos são criados automaticamente quando um negócio é marcado como ganho.',btn:'Ir para Negócios',act:'negocios'})}</section>`;
    else if(!cur.length)body.innerHTML=`<section class="card">${U.empty({title:'Nenhum projeto com esse filtro.',text:'Troque o contato ou limpe a busca.',btn:'Limpar filtros',act:'limpar'})}</section>`;
    else if(S.pview==='kanban'){body.innerHTML=U.board(PE.map((n,ci)=>({name:PE_N(ci),dot:ci===PE.length-1?'rgb(var(--pos))':'rgb(var(--primary))',cards:cur.filter(p=>p.etapa===ci).map(card)})),{drag:true});
     U.bindBoard(body,(i,col)=>moveProj(S.proj[+i],col,draw));
     $$('[data-act="mais"]',body).forEach(b=>b.addEventListener('keydown',e=>e.stopPropagation()))}
    else body.innerHTML=U.table({rows:cur,rowAct:'abrirL',cols:[
     {h:'Nome',html:p=>`<b style="font-weight:600">${esc(p.nome)}</b>`},
     {h:'Cliente',html:p=>`<a href="#/contatos?ficha=${p.cid}">${esc(p.cliente)}</a>`},
     {h:'Etapa',html:p=>U.chip(PE_N(p.etapa),p.etapa===PE.length-1?'g':'n')},
     {h:'Status',w:'184px',html:p=>`<select class="select op-sel" data-st="${p.id}" aria-label="Status de ${esc(p.nome)}">${PST.map(x=>`<option ${x===p.status?'selected':''}>${x}</option>`).join('')}</select>`},
     {h:'Início',html:p=>`<span class="num">${p.inicio}</span>`},{h:'Previsão',html:p=>`<span class="num">${p.previsao}</span>`}]});
    $$('[data-st]',body).forEach(sl=>sl.onchange=()=>{const p=S.proj.find(x=>x.id===sl.dataset.st),fs=p.status;p.status=sl.value;if(p.status==='Concluído')p.pct=100;syncObra(p);draw();
     M.toast(`Status: ${p.status}.`,'Desfazer',()=>{p.status=fs;syncObra(p);draw()})});
    if(!first)noRv(body); first=false; M.wire(body,H)};
   const menu=(el)=>{const p=S.proj[+el.dataset.i],go=k=>()=>projSheet(p,k,draw);
    M.menu(el,[{label:'Tarefas',icon:'atividades',run:go('tarefas')},{label:'Cronograma',icon:'agenda',run:go('cronograma')},{label:'Anexos',icon:'doc',run:go('anexos')},{label:'Equipe',icon:'contatos',run:go('equipe')},
     {label:'Fotos',icon:'camera',run:go('fotos')},{label:'Comentário',icon:'chat',run:go('obs')},{label:'Concluir tarefa',icon:'check',run:go('tarefas')},'-',{label:'Editar',icon:'ajustes',run:()=>editProj(p,draw)}])};
   const H={abrir:el=>projSheet(S.proj[+el.dataset.i],null,draw),abrirL:tr=>projSheet(cur[+tr.dataset.i],null,draw),mais:menu,
    limpar:()=>{S.pq='';S.pc='';q.value='';c.value='';draw()},negocios:()=>{location.hash='#/negocios'}};
   q.oninput=()=>{S.pq=q.value;draw()}; c.onchange=()=>{S.pc=c.value;draw()};
   U.bindSeg(v,'op-pvw',x=>{S.pview=x;draw()}); draw();
  }}}});

/* =====================================================================
   PAINEL 360 (lista de obras)
   ===================================================================== */
const P360_ST=['','Em andamento','Pausada','Concluída'];
M.screen('painel360',{title:'Painel 360',dock:'painel360',
 help:['Cada obra com campo, comercial, compras e financeiro numa tela só.','Busque pelo nome da obra ou do cliente e filtre pelo status.','Clique numa obra para abrir o painel completo dela.','Grade mostra cartões; Lista mostra tudo em colunas. “Carregar mais” traz as próximas obras.'],
 variants:{A:{label:'Obras',
  render:()=>U.page({kick:'Operação',title:'Painel 360',sub:'Cada obra com campo, comercial, compras e financeiro numa tela só.',acts:[{label:'Buscar em tudo',icon:'buscar',act:'spot'}]})
   +U.bar(U.search('Buscar obra ou cliente','op-oq','280px')+U.tabs(['Todas','Em andamento','Pausadas','Concluídas'],S.p360.st,'Status da obra'),
     `<span class="lbl num" id="op-ocount" aria-live="polite"></span>`+U.seg('op-ov',[['grade','Grade','grade'],['lista','Lista','lista']],S.p360.view,'Modo de visualização'))
   +'<div id="op-ob"></div>',
  mount:v=>{
   const f=S.p360,body=$('#op-ob',v),q=$('#op-oq',v); let first=true,cur=[]; q.value=f.q;
   const list=()=>{const t=f.q.toLowerCase(),st=P360_ST[f.st];return OBRAS().filter(o=>(!st||o.status===st)&&(o.nome+' '+o.cliente).toLowerCase().includes(t))};
   const val=o=>o.valor?brl(o.valor):'<span class="faint">Sem fechamento</span>';
   const draw=()=>{cur=list();const tot=OBRAS().length,cols=f.view==='grade'?Math.max(1,Math.floor(((body.clientWidth||1224)+24)/312)):1,show=cur.slice(0,Math.ceil(f.lim/cols)*cols);
    $('#op-ocount',v).textContent=`${cur.length} de ${tot} obras`;
    if(!tot)body.innerHTML=`<section class="card">${U.empty({title:'Nenhuma obra ainda.',text:'A obra nasce quando um negócio é ganho.'})}</section>`;
    else if(!cur.length)body.innerHTML=`<section class="card">${U.empty({title:'Nenhuma obra com esse filtro.',text:'Troque o status ou limpe a busca.',btn:'Limpar filtros',act:'limpar'})}</section>`;
    else{
     body.innerHTML=(f.view==='grade'?`<div class="op-ogrid rv" style="--d:3">${show.map(o=>`<article class="card op-oc" data-act="abrir" data-id="${o.id}" tabindex="0" role="button" aria-label="Abrir obra ${esc(o.nome)}">
       <div class="row"><span class="thumb" aria-hidden="true">${ic('casa',20)}</span><span class="spacer"></span>${U.chip(o.status,ST_OBRA[o.status])}</div>
       <h3 class="op-oh">${esc(o.nome)}</h3><div class="lbl op-ks">${esc(o.cliente)} · ${esc(o.cidade)}</div>
       <div class="mt16">${kv('Relatórios',o.relatorios)}${kv('Fotos',o.fotos)}${kv('Valor fechado',val(o))}</div></article>`).join('')}</div>`
      :U.table({rows:show,rowAct:'abrirL',cols:[{h:'Obra',html:o=>`<b style="font-weight:600">${esc(o.nome)}</b>`},{h:'Cliente',html:o=>esc(o.cliente)},{h:'Cidade',html:o=>esc(o.cidade)},
        {h:'Status',html:o=>U.chip(o.status,ST_OBRA[o.status])},{h:'Relatórios',r:true,html:o=>o.relatorios},{h:'Fotos',r:true,html:o=>o.fotos},{h:'Valor fechado',r:true,html:val}]}))
      +`<div class="row mt24"><span class="lbl">Mostrando ${show.length} de ${cur.length} obras</span><span class="spacer"></span>${show.length<cur.length?U.btn('Carregar mais',{act:'mais',ctl:true,w:'176px'}):''}</div>`}
    if(!first)noRv(body); first=false; M.wire(body,H)};
   const H={abrir:el=>{location.hash='#/obra?id='+el.dataset.id},abrirL:tr=>{location.hash='#/obra?id='+cur[+tr.dataset.i].id},
    mais:()=>{f.lim+=8;draw()},limpar:()=>{f.q='';f.st=0;q.value='';const t=$$('[data-tabs] .tab',v)[0];t&&t.click();draw()}};
   M.wire(v,{spot:()=>M.spotlight()});
   q.oninput=()=>{f.q=q.value;f.lim=8;draw()};
   $('[data-tabs]',v).addEventListener('tab',e=>{f.st=e.detail;f.lim=8;draw()});
   U.bindSeg(v,'op-ov',x=>{f.view=x;draw()}); draw();
  }}}});

/* =====================================================================
   OBRA (detalhe do Painel 360)
   ===================================================================== */
const GR=[['Obra',[['visao','Visão geral'],['etapas','Etapas e tarefas'],['agenda','Agenda'],['timeline','Timeline']]],['Registros',[['relatorios','Relatórios'],['fotos','Fotos'],['anexos','Anexos']]],
 ['Venda',[['orcamentos','Orçamentos'],['lista','Lista de venda'],['equipamentos','Equipamentos']]],['Financeiro',[['contrato','Contrato'],['custo','Centro de custo']]]];
const ABAS=GR.flatMap(g=>g[1].map(x=>x[0])), NOVO=new Set(['equipamentos','custo']);
const CSTEPS=['Rascunho','Gerado','Enviado','Assinado'];
const ORFAOS=[['30/09/2026','Visita sem obra ligada · troca de fonte','Bruno Lima'],['27/09/2026','Ajuste de rack registrado pelo celular','Diego Rocha']];

M.screen('obra',{title:'Obra',dock:'painel360',hidden:true,
 help:['O topo mostra a etapa da obra, o negócio e a próxima ação.','Registrar cria o relatório do dia; Agendar marca uma visita; Copiar link copia o endereço desta obra.',
  'Use o menu da esquerda para trocar de seção: obra, registros, venda e financeiro.','Pontos de atenção mostram o que está atrasado; Abrir leva direto ao lugar certo.'],
 variants:{A:{label:'Obra',
  render:()=>{const o=obraBy(M.q.get('id'));
   if(!o)return U.page({kick:'<a href="#/painel360">Painel 360</a>',title:'Obra não encontrada'})+`<section class="card rv" style="--d:1">${U.empty({title:'Não encontramos esta obra.',text:'Ela pode ter sido arquivada ou o link está incompleto.',btn:'Voltar ao Painel 360',act:'voltar'})}</section>`;
   return U.page({kick:`<a href="#/painel360">Painel 360</a> › ${esc(o.nome)}`,title:esc(o.nome),sub:`${esc(o.cliente)} · ${o.bairro?esc(o.bairro)+', ':''}${esc(o.cidade)}`,
    acts:[{label:'Copiar link',icon:'copiar',act:'link'},{label:'Agendar',icon:'agenda',act:'agendar'},{label:'Registrar',icon:'mais',act:'registrar',pri:true}]})+'<div id="op-obra"></div>'},
  mount:v=>{
   const o=obraBy(M.q.get('id')); if(!o)return M.wire(v,{voltar:()=>{location.hash='#/painel360'}});
   const d=OD(o.id),box=$('#op-obra',v); let tab=ABAS.includes(M.q.get('aba'))?M.q.get('aba'):'visao', first=true;
   const neg=negOf(o), proj=()=>projOf(o.id), cs=csOf(o.cliente);
   const equipe=()=>proj()?proj().equipe:['Bruno Lima'];
   const cnt=k=>({relatorios:o.relatorios,fotos:o.fotos,anexos:d.anexos.length}[k]);
   const blk=(cls,t,b,bl='',act='')=>`<section class="card ${cls}"><div class="ch"><h2>${t}</h2><span class="spacer"></span>${bl?B(bl,act,{ghost:true}):''}</div><div class="mt8">${b}</div></section>`;
   const relMini=arr=>arr.length?`<ul class="op-list">${arr.map(r=>`<li><div style="flex:1;min-width:0"><div class="op-kt">${esc(r.resumo)}</div><div class="lbl op-ks">${r.data} · ${esc(r.autor)}</div></div>${U.chip(r.status,r.status==='Salvo'?'g':'w')}</li>`).join('')}</ul>`:none('Nenhum relatório ainda.');
   const nexMini=()=>d.nexos.length?`<ul class="op-list">${d.nexos.map(n=>`<li><span class="dot" style="background:rgb(var(--${n.atrasado?'neg':'primary'}))"></span><div style="flex:1;min-width:0"><div class="op-kt">${esc(n.t)}</div><div class="lbl op-ks">${esc(n.quem)} · prazo ${dm(n.prazo)}</div></div>${n.atrasado?U.chip('Atrasado','r'):''}</li>`).join('')}</ul>`:none('Nenhum Nexo aberto.');
   const ent=()=>d.lista.reduce((a,l)=>a+(l.ent>=l.q?1:0),0);
   const C={
    visao:()=>U.kpis([{label:'Relatórios',value:o.relatorios,act:'k-relatorios'},{label:'Fotos',value:o.fotos,act:'k-fotos'},{label:'Nexos abertos',value:d.nexos.length,act:'nexos'},{label:'Valor fechado',value:o.valor?brl0(o.valor):'—',sub:o.valor?'':'Sem fechamento'}],4).replace('margin-bottom:24px','margin-bottom:0')
     +`<div class="grid">${blk('s6','Próximas visitas',agList(d.agenda.slice(0,3)),'Ver agenda','k-agenda')}${blk('s6','Relatórios recentes',relMini(d.rel.slice(0,3)),'Ver todos','k-relatorios')}
      ${blk('s6','Fotos recentes',d.fotos.length?`<div class="op-phgrid">${d.fotos.slice(0,4).map(tile).join('')}</div>`:none('Nenhuma foto ainda.'),'Ver todas','k-fotos')}${blk('s6','Nexos abertos',nexMini(),'Ver Nexos','nexos')}
      ${blk('s6','Lista de venda',kv('Itens',d.lista.length)+kv('Entregues',ent()+' de '+d.lista.length)+`<div class="mt16">${U.prog(ent()/d.lista.length*100)}</div>`,'Ver lista','k-lista')}
      ${blk('s6','Pós-venda',cs?`<div class="row">${U.chip(cs.status,ST_CS[cs.status])}<span class="lbl">${esc(CE[cs.etapa])}</span><span class="spacer"></span><b class="num" style="color:${hc(cs.saude)}">Saúde ${cs.saude}</b></div><div class="mt16">${U.prog(cs.saude,hc(cs.saude))}</div><div class="lbl mt16">${cs.alertas.length?cs.alertas.length+' alerta(s) aberto(s)':'Nenhum alerta aberto'}</div>`:none('Começa quando a obra é entregue.'),'Abrir Experiência','cs')}
      ${blk('s12','Últimos eventos',tl(d.eventos.slice(0,4)),'Ver timeline','k-timeline')}</div>`,
    etapas:()=>{const et=oEt(o);return `<section class="card"><div class="ch"><h2>Etapas e tarefas</h2><span class="spacer"></span>${B('Nova tarefa','et-nova',{icon:'mais'})}</div>${PE.map((e,i)=>{const ts=d.tarefas[i],ok=ts.every(t=>t.ok);
      return `<div class="op-stage"><div class="row" style="margin-bottom:8px"><span class="dot" style="background:${i<et?'rgb(var(--pos))':i===et?'rgb(var(--primary))':'var(--line)'}"></span><b style="flex:1">${esc(PE_N(i))}</b>${U.chip(i<et||ok?'Feita':i===et?'Em andamento':'A fazer',i<et||ok?'g':i===et?'b':'n')}<span class="lbl num">${ts.filter(t=>t.ok).length}/${ts.length}</span></div>
       ${ts.map((t,j)=>`<label class="op-chk ${t.ok?'done':''}"><input type="checkbox" data-tk="${i}:${j}" ${t.ok?'checked':''}><span>${esc(t.t)}</span></label>`).join('')}</div>`}).join('')}</section>`},
    agenda:()=>U.table({title:'Agenda da obra',head:B('Abrir agenda','agenda-go',{ghost:true}),rows:d.agenda,empty:{title:'Nenhuma visita marcada.',text:'Use Agendar no topo para marcar a próxima.'},
     cols:[{h:'Data',html:a=>`<span class="num">${a.data}</span>`},{h:'Hora',html:a=>`<span class="num">${esc(a.hora)}</span>`},{h:'Compromisso',html:a=>`<b style="font-weight:600">${esc(a.t)}</b>`},{h:'Tipo',html:a=>U.chip(a.tipo||'Visita técnica')},{h:'Responsável',html:a=>esc(a.r)}]}),
    timeline:()=>`<section class="card"><div class="ch"><h2>Timeline</h2><span class="spacer"></span><span class="lbl">${d.eventos.length} eventos</span></div><div class="mt16">${tl(d.eventos)}</div></section>`,
    relatorios:()=>U.table({title:'Relatórios',head:B('Ligar a esta obra','rel-ligar',{icon:'trocar'}),rows:d.rel,empty:{title:'Nenhum relatório nesta obra.',text:'Use Registrar no topo para criar o relatório do dia.'},
     cols:[{h:'Data',html:r=>`<span class="num">${r.data}</span>`},{h:'Resumo do dia',html:r=>`<span class="op-ell" title="${esc(r.resumo)}">${esc(r.resumo)}</span>`},{h:'Elaborado por',html:r=>esc(r.autor)},{h:'Fotos',r:true,html:r=>r.fotos},
      {h:'Status',html:r=>U.chip(r.status,r.status==='Salvo'?'g':'w')},{h:'Cliente vê',html:r=>U.chip(r.ve?'Sim':'Não',r.ve?'b':'n')},
      {h:'',w:'240px',r:true,html:r=>`<div class="btnrow op-acts2" style="margin-left:auto">${B('PDF','rel-pdf',{attrs:`data-id="${r.id}"`})}${B('Revisar','rel-rev',{attrs:`data-id="${r.id}"`})}</div>`}]}),
    fotos:()=>`<section class="card"><div class="ch"><h2>Fotos</h2>${U.chip(String(o.fotos))}<span class="spacer"></span>${B('Enviar fotos','foto-nova',{icon:'upload'})}</div>
     <div class="mt16">${d.fotos.length?`<div class="op-phgrid">${d.fotos.map(tile).join('')}</div>${o.fotos>d.fotos.length?`<p class="lbl mt16" style="margin-bottom:0">Mostrando as ${d.fotos.length} mais recentes de ${o.fotos}.</p>`:''}`:U.empty({title:'Nenhuma foto nesta obra.',text:'Fotos enviadas pelo celular ou pelos relatórios aparecem aqui.'})}</div></section>`,
    anexos:()=>U.table({title:'Anexos',head:B('Enviar anexo','ax-novo',{icon:'upload'}),rows:d.anexos,empty:{title:'Nenhum anexo.',text:'Plantas, projetos e contratos desta obra ficam aqui.'},
     cols:[{h:'Nome',html:a=>`<span class="row" style="gap:12px"><span class="thumb sm" aria-hidden="true">${ic('doc',16)}</span><b style="font-weight:600">${esc(a.n)}</b></span>`},{h:'Tipo',html:a=>U.chip(a.tipo)},{h:'Enviado por',html:a=>esc(a.por)},{h:'Data',html:a=>`<span class="num">${a.em}</span>`},
      {h:'',w:'252px',r:true,html:a=>`<div class="btnrow op-acts2" style="margin-left:auto">${B('Baixar','ax-get',{attrs:`data-id="${a.id}"`})}${B('Remover','ax-rem',{attrs:`data-id="${a.id}"`})}</div>`}]}),
    orcamentos:()=>{const ps=D.propostas.filter(p=>p.cliente===o.cliente);return U.table({title:'Orçamentos',rows:ps,empty:{title:'Nenhum orçamento ligado a esta obra.',text:'Propostas do mesmo cliente aparecem aqui.'},
     cols:[{h:'Número',html:p=>`<span class="num">${esc(p.numero)}</span>`},{h:'Título',html:p=>`<b style="font-weight:600">${esc(p.titulo)}</b>`},{h:'Status',html:p=>U.chip(p.status,p.status==='Aceita'?'g':p.status==='Rascunho'?'n':'b')},{h:'Valor',r:true,html:p=>brl(p.valor)},
      {h:'',w:'144px',r:true,html:()=>B('Abrir','prop',{w:'96px'})}]})},
    lista:()=>`<section class="card"><div class="ch"><h2>Romaneios</h2><span class="spacer"></span>${B('Gerar romaneio','rom-novo',{icon:'mais'})}</div><div class="mt8">${d.romaneios.length?`<ul class="op-list">${d.romaneios.map(r=>`<li><span class="thumb sm" aria-hidden="true">${ic('caixa',16)}</span><div style="flex:1;min-width:0"><div class="op-kt">${esc(r.n)}</div><div class="lbl op-ks">Saída ${r.data} · ${r.itens} itens</div></div>${U.chip(r.st,'g')}</li>`).join('')}</ul>`:none('Nenhum romaneio gerado ainda.')}</div></section>`
     +U.table({title:'Lista de venda',head:`<span class="lbl">${ent()} de ${d.lista.length} itens entregues</span>`,rows:d.lista,
      cols:[{h:'Produto',html:l=>`${esc(l.p)}<span class="code">${esc(l.m)}</span>`},{h:'Ambiente',html:l=>esc(l.a)},{h:'Qtd',r:true,html:l=>l.q},{h:'Separado',r:true,html:l=>l.sep},{h:'Entregue',r:true,html:l=>l.ent},
       {h:'Situação',html:l=>l.ent>=l.q?U.chip('Entregue','g'):l.sep>=l.q?U.chip('Separado','b'):U.chip('A separar','w')}]}),
    equipamentos:()=>{const on=d.equip.filter(e=>e.st==='Online').length,gv=d.equip.filter(e=>okD(e.gar)&&(pd(e.gar)-pd(HOJE))/864e5<=90).length;
     return U.kpis([{label:'Instalados',value:d.equip.length,chip:'Novo',tone:'b'},{label:'Online agora',value:on,sub:d.equip.length?`${d.equip.length-on} sem resposta`:''},{label:'Garantia vence em 90 dias',value:gv,vtone:gv?'warn':''}],3).replace('margin-bottom:24px','margin-bottom:0')
      +U.table({title:'Equipamentos instalados',head:U.chip('Novo','b')+B('Cadastrar equipamento','eq-novo',{icon:'mais'}),rows:d.equip,
       empty:{title:'Nenhum equipamento cadastrado.',text:'Tudo o que for instalado nesta obra, com série, endereço de rede e garantia — a base do pós-venda.',btn:'Cadastrar equipamento',act:'eq-novo'},
       cols:[{h:'Equipamento',html:e=>`<b style="font-weight:600">${esc(e.e)}</b>`},{h:'Ambiente',html:e=>esc(e.a)},{h:'Nº de série',html:e=>`<span class="num">${esc(e.sn)}</span>`},{h:'IP',html:e=>`<span class="num">${esc(e.ip)}</span>`},
        {h:'Garantia até',html:e=>`<span class="num">${e.gar||'—'}</span>`},{h:'Situação',html:e=>U.chip(e.st,e.st==='Online'?'g':e.st==='Offline'?'r':'n')}]})},
    contrato:()=>{const c=d.contrato;if(!c)return `<section class="card">${U.empty({title:'Obra sem contrato no Maestro.',text:o.legado?'Obra anterior ao Maestro: o contrato ficou fora do sistema. Cadastre para acompanhar as parcelas.':'Gere o contrato a partir da proposta aceita.',btn:'Cadastrar contrato',act:'c-novo'})}</section>`;
     const si=CSTEPS.indexOf(c.st), acts=c.st==='Rascunho'?[['Gerar contrato','c-gerar']]:c.st==='Gerado'?[['Regerar','c-regerar'],['Baixar DOCX','c-docx'],['Enviar para assinatura','c-enviar']]:c.st==='Enviado'?[['Regerar','c-regerar'],['Baixar DOCX','c-docx'],['Marcar como assinado','c-assinar']]:[['Baixar DOCX','c-docx']];
     const rec=c.parcelas.filter(x=>x.st==='Recebida').reduce((a,x)=>a+x.v,0);
     return `<section class="card"><div class="ch"><h2>Contrato</h2>${U.chip(c.st,c.st==='Assinado'?'g':'b')}<span class="spacer"></span><b class="num">${brl(c.valor)}</b></div>
      <div class="op-steps mt16" style="grid-template-columns:repeat(4,minmax(0,1fr))">${CSTEPS.map((x,i)=>`<div class="${i<si?'on':i===si?'cur':''}"><i></i><span>${x}</span></div>`).join('')}</div>
      <div class="grid g3 mt24" style="gap:24px"><div>${kv('Parcelas',c.parcelas.length)}</div><div>${kv('Recebido',`<span class="pos">${brl(rec)}</span>`)}</div><div>${kv('A receber',brl(c.valor-rec))}</div></div>
      <div class="btnrow mt24">${acts.map(([l,a])=>B(l,a)).join('')}</div></section>`
      +U.table({title:'Parcelas',rows:c.parcelas,cols:[{h:'Parcela',html:x=>`<b style="font-weight:600">${x.n}</b>`},{h:'Vencimento',html:x=>`<span class="num">${x.venc}</span>`},{h:'Valor',r:true,html:x=>brl(x.v)},
       {h:'Situação',html:x=>U.chip(x.st,x.st==='Recebida'?'g':x.st==='Vencida'?'r':'n')},
       {h:'',w:'200px',r:true,html:x=>x.st==='Vencida'||x.st==='A vencer'?B('Registrar recebimento','c-receber',{w:'176px',attrs:`data-id="${x.id}"`}):'<span class="faint">—</span>'}]})},
    custo:()=>{const orc=d.custos.reduce((a,x)=>a+x.orc,0),real=d.custos.reduce((a,x)=>a+x.real,0),mg=o.valor?(o.valor-Math.max(orc,real))/o.valor*100:0;
     return U.kpis([{label:'Orçado',value:brl0(orc),chip:'Novo',tone:'b'},{label:'Realizado',value:brl0(real),sub:orc?Math.round(real/orc*100)+'% do orçado':'Sem orçamento'},{label:'Margem prevista',value:o.valor?Math.round(mg)+'%':'—',vtone:mg<15?'warn':'pos',sub:o.valor?'Sobre '+brl0(o.valor)+' fechados':'Obra sem valor fechado'}],3).replace('margin-bottom:24px','margin-bottom:0')
      +U.table({title:'Orçado × realizado',head:U.chip('Novo','b'),rows:d.custos,empty:{title:'Sem orçamento para comparar.',text:'Obra sem valor fechado. Os custos lançados aparecem abaixo.'},
       cols:[{h:'Categoria',html:x=>`<b style="font-weight:600">${x.c}</b>`},{h:'Orçado',r:true,html:x=>brl0(x.orc)},{h:'Realizado',r:true,html:x=>brl0(x.real)},
        {h:'Uso',w:'200px',html:x=>{const pc=x.orc?x.real/x.orc*100:0;return `<div class="row" style="gap:8px"><div style="flex:1">${U.prog(Math.min(100,pc),pc>100?'rgb(var(--neg))':'')}</div><span class="lbl num op-n12">${Math.round(pc)}%</span></div>`}},
        {h:'Diferença',r:true,html:x=>`<span class="${x.real>x.orc?'neg':'pos'}">${x.real>x.orc?'+ ':'− '}${brl0(Math.abs(x.real-x.orc))}</span>`}]})
      +U.table({title:'Lançamentos',head:B('Lançar custo','cc-novo',{icon:'mais'}),rows:d.lanc,empty:{title:'Nenhum custo lançado.',text:'Compras, diárias e deslocamentos desta obra entram aqui.',btn:'Lançar custo',act:'cc-novo'},
       cols:[{h:'Data',html:x=>`<span class="num">${x.data}</span>`},{h:'Descrição',html:x=>esc(x.d)},{h:'Categoria',html:x=>U.chip(x.c)},{h:'Fornecedor',html:x=>esc(x.f)},{h:'Valor',r:true,html:x=>brl(x.v)}]})}};
   const draw=()=>{const et=oEt(o),att=atencao(o),p=proj(),pa=p&&p.acoes[0]?{t:p.acoes[0].t,q:dm(p.acoes[0].quando)}:d.nexos[0]?{t:d.nexos[0].t,q:dm(d.nexos[0].prazo)}:null;
    box.innerHTML=`<section class="card rv" style="--d:1;margin-bottom:24px">
      <div class="op-steps op-obst" style="grid-template-columns:repeat(${PE.length},minmax(0,1fr))" aria-label="Etapa da obra: ${esc(PE_N(et))}">${PE.map((n,i)=>`<div class="${i<et?'on':i===et?'cur':''}" title="${esc(PE_N(i))}"><i></i><span>${esc(PE_N(i))}</span></div>`).join('')}</div><div class="op-stepnow" aria-hidden="true">Etapa ${et+1} de ${PE.length} · <b>${esc(PE_N(et))}</b></div>
      <div class="grid g3 mt24" style="gap:24px">
       <div style="min-width:0"><div class="lbl">Situação</div><div class="row mt8" style="gap:8px;height:36px">${U.chip(o.status,ST_OBRA[o.status])}<b class="num">${o.pct}%</b></div></div>
       <div style="min-width:0"><div class="lbl">Negócio</div><div class="row mt8" style="gap:8px;height:36px">${neg?`<span class="op-kt">${esc(neg.titulo)}</span>${U.chip(neg.status,neg.status==='Ganho'?'g':neg.status==='Perdido'?'r':'b')}`:'<span class="faint">Obra sem negócio</span>'}</div></div>
       <div style="min-width:0"><div class="lbl">Próxima ação</div><div class="row mt8" style="gap:8px;height:36px">${pa?`<span class="op-kt" style="flex:1">${esc(pa.t)} · ${pa.q}</span>`:'<span class="faint" style="flex:1">Sem próxima ação</span>'}${B('Ver Nexos','nexos',{ghost:true})}</div></div>
      </div></section>
     ${att.length?`<section class="card rv" style="--d:2;margin-bottom:24px" aria-label="Pontos de atenção"><div class="ch"><h2>Pontos de atenção</h2>${U.chip(String(att.length),'r')}</div><ul class="op-list mt8">${att.map(a=>`<li><span class="dot" style="background:rgb(var(--${a.tone}))"></span><span class="op-kt" style="flex:1">${esc(a.t)}</span>${B('Abrir','att',{w:'96px',attrs:`data-go="${a.go}"`})}</li>`).join('')}</ul></section>`:''}
     <div class="grid op-obg rv" style="--d:3">
      <div class="s3 stack op-side" style="align-self:start">
       <nav class="card op-nav" aria-label="Seções da obra">${GR.map(([g,items])=>`<div class="lbl op-ng">${g}</div>${items.map(([k,l])=>`<button type="button" class="btn sm ${k===tab?'':'ghost'}" data-act="aba" data-k="${k}" ${k===tab?'aria-current="page"':''}><span style="flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis">${l}</span>${NOVO.has(k)?U.chip('Novo','b'):cnt(k)!=null?`<span class="num faint" style="font-weight:500">${cnt(k)}</span>`:''}</button>`).join('')}`).join('')}</nav>
       <section class="card op-data" aria-label="Dados da obra"><div class="op-dgrid">
        <div><div class="ch"><h2>Negócio</h2><span class="spacer"></span>${neg?U.chip(neg.status,neg.status==='Ganho'?'g':neg.status==='Perdido'?'r':'b'):''}</div>
        ${neg?`<div class="op-kt mt8" title="${esc(neg.titulo)}">${esc(neg.titulo)}</div>${neg.valor?`<div class="lbl num mt8">${brl(neg.valor)}</div>`:''}${neg.id?`<div class="mt16">${B('Abrir negócio','neg',{w:'100%'})}</div>`:''}`:'<div class="lbl mt8">Obra sem negócio</div>'}</div>
        <div><div class="lbl">Gestor da obra</div><div class="row mt8">${U.av(o.gestor)}<b class="op-kt" style="font-weight:600">${esc(o.gestor)}</b></div></div>
        <div><div class="lbl">Equipe</div><div class="stack mt8" style="gap:8px">${equipe().map(n=>`<div class="row">${U.av(n)}<span class="op-kt" style="font-weight:500">${esc(n)}</span></div>`).join('')}</div></div>
        <div>${kv('Início',o.inicio)}${kv('Previsão de entrega',o.previsao)}</div></div></section>
      </div>
      <div class="s9 stack" id="op-oc">${C[tab]()}</div></div>`;
    if(!first)noRv(box); first=false; M.wire(v,H); M.tabs(box);
    const nv=$('.op-nav',box),nb=nv&&$('[aria-current]',nv);if(nb&&nv.scrollWidth>nv.clientWidth+1)nv.scrollLeft=Math.max(0,nb.offsetLeft-nv.offsetLeft-48);
    $$('[data-tk]',box).forEach(cb=>cb.onchange=()=>{const [i,j]=cb.dataset.tk.split(':').map(Number);d.tarefas[i][j].ok=cb.checked;draw()});
   };
   const setTab=k=>{tab=k;draw();const c=$('#op-oc',box);if(c&&c.getBoundingClientRect().top<0)c.scrollIntoView({block:'start'})};
   const fR=el=>d.rel.find(r=>r.id===el.dataset.id), fX=el=>d.anexos.find(a=>a.id===el.dataset.id);
   const H={
    link:()=>{const u=location.href;try{navigator.clipboard.writeText(u).then(()=>M.toast('Link da obra copiado.'),()=>M.toast('Link: '+u))}catch(e){M.toast('Link: '+u)}},
    agendar:()=>agendarModal({onOk:a=>{pushAgenda(d.agenda,a);d.eventos.unshift({q:HOJE,t:'Visita agendada',d:`${a.t} · ${dm(a.data)} ${a.hora}`});draw()}}),
    registrar:()=>M.modal({title:'Registrar',sub:`Relatório do dia · ${esc(o.nome)}`,ok:'Enviar relatório',fields:[
      {k:'res',label:'Resumo do dia',type:'textarea',req:true,span:12,ph:'O que foi feito, o que ficou pendente, o que o cliente pediu.'},
      {k:'aut',label:'Elaborado por',type:'select',opts:EQ,value:'Bruno Lima',span:6},{k:'fot',label:'Fotos',type:'file',ph:'Escolher fotos',span:6},
      {k:'ve',label:'Cliente vê este relatório',type:'toggle',value:true,span:12,help:'Aparece no portal do cliente depois de revisado.'}],
     onOk:v=>{d.rel.unshift({id:nid('r'),data:HOJE,resumo:v.res,autor:v.aut,fotos:0,status:'Pendente revisão',ve:v.ve});o.relatorios++;d.eventos.unshift({q:HOJE,t:'Relatório registrado',d:v.res});draw();
      M.toast('Relatório registrado.','Ver',()=>setTab('relatorios'))}}),
    aba:el=>setTab(el.dataset.k),
    nexos:()=>{location.hash='#/nexos'}, cs:()=>{location.hash='#/experiencia'}, 'agenda-go':()=>{location.hash='#/agenda'},
    neg:()=>{location.hash='#/negocios?card='+neg.id}, prop:()=>{location.hash='#/construtor'},
    att:el=>{const g=el.dataset.go;g.startsWith('aba:')?setTab(g.slice(4)):(location.hash=g)},
    foto:el=>fotoPreview(d.fotos.find(f=>f.id===el.dataset.id)),
    'foto-nova':()=>M.modal({title:'Enviar fotos',width:'560px',ok:'Enviar',fields:[{k:'f',label:'Fotos',type:'file',req:true,span:12,ph:'Escolher fotos'},{k:'leg',label:'Legenda',span:6,ph:'Ex.: Rack técnico'},{k:'et',label:'Etapa',type:'select',opts:PE,value:PE[oEt(o)],span:6}],
     onOk:v=>{d.fotos.unshift({id:nid('f'),leg:v.leg||'Foto da obra',data:HOJE,etapa:v.et,h:(d.fotos.length*53)%360});o.fotos++;d.eventos.unshift({q:HOJE,t:'Fotos enviadas',d:v.leg||'1 foto'});draw();M.toast('Foto enviada.')}}),
    'rel-pdf':el=>M.toast(`Geraria o PDF do relatório de ${fR(el).data} (simulação).`),
    'rel-rev':el=>{const r=fR(el);M.modal({title:'Revisar relatório',sub:`${r.data} · ${esc(r.autor)}`,ok:'Salvar registro',fields:[{k:'res',label:'Resumo do dia',type:'textarea',req:true,span:12,value:r.resumo},{k:'ve',label:'Cliente vê este relatório',type:'toggle',value:r.ve,span:12}],
     onOk:v=>{r.resumo=v.res;r.ve=v.ve;r.status='Salvo';draw();M.toast('Relatório salvo.')}})},
    'rel-ligar':()=>M.modal({title:'Ligar a esta obra',sub:'Relatórios feitos sem obra escolhida. Marque os que são desta obra.',width:'560px',ok:'Ligar',fields:[{k:'r',label:'Relatórios sem obra',type:'checks',opts:ORFAOS.map(x=>`${x[0].slice(0,5)} · ${x[1]} · ${x[2]}`),span:12,req:true}],
     onOk:v=>{v.r.forEach(lbl=>{const x=ORFAOS.find(z=>lbl.includes(z[1]));d.rel.push({id:nid('r'),data:x[0],resumo:x[1],autor:x[2],fotos:2,status:'Salvo',ve:false});o.relatorios++});d.rel.sort((a,b)=>pd(b.data)-pd(a.data));draw();M.toast(`${v.r.length} relatório(s) ligado(s) a esta obra.`)}}),
    'ax-novo':()=>anexoModal(d,draw),
    'ax-get':el=>M.toast(`Baixaria “${fX(el).n}” (simulação).`),
    'ax-rem':el=>{const a=fX(el);M.confirm({title:'Remover anexo?',text:a.n,ok:'Remover',danger:true,run:()=>{const i=d.anexos.indexOf(a);d.anexos.splice(i,1);draw();M.toast('Anexo removido.','Desfazer',()=>{d.anexos.splice(i,0,a);draw()})}})},
    'et-nova':()=>M.modal({title:'Nova tarefa',width:'560px',ok:'Criar tarefa',fields:[{k:'et',label:'Etapa',type:'select',opts:PE,value:PE[oEt(o)],span:6},{k:'t',label:'Tarefa',req:true,span:6}],
     onOk:v=>{d.tarefas[PE.indexOf(v.et)].push({id:nid('k'),t:v.t,ok:false});draw();M.toast('Tarefa criada.')}}),
    'rom-novo':()=>{const pend=d.lista.filter(l=>l.ent<l.q);if(!pend.length)return M.toast('Todos os itens já foram entregues.');
     M.modal({title:'Gerar romaneio',sub:'Lista do que sai do estoque para a obra.',ok:'Gerar romaneio',fields:[{k:'data',label:'Data de saída',type:'date',req:true,span:6,value:iso(HOJE)},{k:'r',label:'Responsável',type:'select',opts:EQ,value:'Bruno Lima',span:6},
      {k:'it',label:'Itens',type:'checks',opts:pend.map(l=>l.p),value:pend.map(l=>l.p),req:true,span:12}],
      onOk:v=>{pend.filter(l=>v.it.includes(l.p)).forEach(l=>{l.sep=l.q;l.ent=l.q});d.romaneios.unshift({id:nid('m'),n:'Romaneio #'+(20+d.romaneios.length),data:br(v.data),itens:v.it.length,st:'Entregue'});draw();M.toast('Romaneio gerado.')}})},
    'eq-novo':()=>M.modal({title:'Cadastrar equipamento',ok:'Cadastrar',fields:[{k:'e',label:'Equipamento',req:true,span:6,ph:'Ex.: Access point U7-Pro'},{k:'a',label:'Ambiente',type:'select',opts:LEG,span:6},
      {k:'sn',label:'Nº de série',span:6},{k:'ip',label:'IP',span:6,ph:'192.168.10.30'},{k:'gar',label:'Garantia até',type:'date',span:6},{k:'st',label:'Situação',type:'select',opts:['Online','Offline','Sem rede'],span:6}],
     onOk:v=>{d.equip.push({id:nid('e'),e:v.e,a:v.a,sn:v.sn||'—',ip:v.ip||'—',gar:br(v.gar),st:v.st});draw();M.toast('Equipamento cadastrado.')}}),
    'c-novo':()=>M.modal({title:'Cadastrar contrato',width:'560px',ok:'Cadastrar',fields:[{k:'v',label:'Valor do contrato',type:'money',req:true,span:6},{k:'n',label:'Número de parcelas',type:'number',req:true,span:6,value:'6'},{k:'d',label:'Primeiro vencimento',type:'date',req:true,span:12,value:iso(HOJE)}],
     onOk:v=>{const val=money(v.v),n=Math.max(1,Math.min(24,parseInt(v.n)||1)),d0=pd(br(v.d));if(!val){M.toast('Informe o valor do contrato.');return false}
      d.contrato={st:'Gerado',valor:val,parcelas:Array.from({length:n},(_,k)=>({id:nid('p'),n:`${k+1}/${n}`,venc:fd(new Date(d0.getFullYear(),d0.getMonth()+k,d0.getDate())),v:Math.round(val/n*100)/100,st:'Aguardando assinatura'}))};draw();M.toast('Contrato cadastrado.')}}),
    'c-gerar':()=>{d.contrato.st='Gerado';draw();M.toast('Contrato gerado.')},
    'c-regerar':()=>M.confirm({title:'Regerar contrato?',text:'O documento é refeito com os dados atuais da proposta. A versão anterior fica no histórico.',ok:'Regerar',run:()=>M.toast('Contrato regerado.')}),
    'c-docx':()=>M.toast(`Baixaria “Contrato · ${o.nome}.docx” (simulação).`),
    'c-enviar':()=>{const ct=D.contatos.find(x=>x.nome===o.cliente);M.modal({title:'Enviar para assinatura',width:'520px',ok:'Enviar',fields:[{k:'e',label:'E-mail do cliente',type:'email',req:true,span:12,value:ct?ct.email:''}],
     onOk:v=>{d.contrato.st='Enviado';draw();M.toast(`Contrato enviado para ${v.e} (simulação).`)}})},
    'c-assinar':()=>M.confirm({title:'Marcar como assinado?',text:'As parcelas passam a valer e entram no Financeiro.',ok:'Marcar como assinado',run:()=>{d.contrato.st='Assinado';d.contrato.parcelas.forEach(x=>{if(x.st==='Aguardando assinatura')x.st='A vencer'});draw();M.toast('Contrato assinado.')}}),
    'c-receber':el=>{const x=d.contrato.parcelas.find(z=>z.id===el.dataset.id);M.modal({title:'Registrar recebimento',sub:`Parcela ${x.n} · ${brl(x.v)}`,width:'520px',ok:'Registrar',fields:[{k:'d',label:'Data do recebimento',type:'date',req:true,span:6,value:iso(HOJE)},{k:'c',label:'Conta',type:'select',opts:['Itaú','Inter','Caixa','Cofre'],span:6}],
     onOk:v=>{const fs=x.st;x.st='Recebida';d.eventos.unshift({q:br(v.d),t:'Parcela recebida',d:`${x.n} · ${brl(x.v)} · ${v.c}`});draw();M.toast('Recebimento registrado.','Desfazer',()=>{x.st=fs;draw()})}})},
    'cc-novo':()=>M.modal({title:'Lançar custo',ok:'Lançar',fields:[{k:'c',label:'Categoria',type:'select',opts:['Equipamentos','Mão de obra','Infraestrutura','Deslocamento'],req:true,span:6},{k:'v',label:'Valor',type:'money',req:true,span:6},
      {k:'d',label:'Descrição',req:true,span:12},{k:'dt',label:'Data',type:'date',span:6,value:iso(HOJE)},{k:'f',label:'Fornecedor',type:'select',opts:['—',...D.fornecedores.map(f=>f.nome)],span:6}],
     onOk:v=>{const val=money(v.v);if(!val){M.toast('Informe o valor.');return false}d.lanc.unshift({id:nid('c'),data:br(v.dt)||HOJE,d:v.d,c:v.c,f:v.f,v:val});const cc=d.custos.find(x=>x.c===v.c);if(cc)cc.real+=val;draw();M.toast('Custo lançado.')}})};
   ABAS.forEach(k=>H['k-'+k]=()=>setTab(k));
   draw();
  }}}});

/* =====================================================================
   TÉCNICA
   ===================================================================== */
function editTec(t,done){
 M.modal({title:'Editar execução técnica',sub:esc(t.cliente),fields:[{k:'p',label:'Nome da obra',req:true,span:6,value:t.projeto},{k:'r',label:'Responsável',type:'select',opts:EQ,value:t.resp,span:6},
  {k:'e',label:'Endereço',span:12,value:t.endereco||''},{k:'et',label:'Etapa atual',type:'select',opts:TE,value:TE[t.etapa],span:6},{k:'i',label:'Início',type:'date',value:iso(t.inicio),span:6}],
  onOk:v=>{t.projeto=v.p;t.resp=v.r;t.endereco=v.e;t.etapa=TE.indexOf(v.et);t.inicio=br(v.i)||t.inicio;done();M.toast('Execução salva.')}});
}
function tecSheet(t,secId,redraw){
 let s; const d=()=>t.obra&&obraBy(t.obra)?OD(t.obra):null;
 const sub=()=>`${esc(t.projeto)} · ${esc(t.endereco||'Sem endereço')}`;
 const chips=()=>U.chip(TE_N(t.etapa),'b')+(t.reaberta?U.chip('↺ Reaberta via CS','w'):'')+(t.origem==='Obra anterior'?U.chip('Obra anterior','n'):'')+(t.done?U.chip('Concluída','g'):'');
 const body=()=>{const od=d(),ck=t.check.filter(c=>c.ok).length;return [
  sec('progresso','Progresso técnico detalhado',`<div class="op-seg" style="grid-template-columns:repeat(${TE.length},minmax(0,1fr))" role="img" aria-label="Etapa ${t.etapa+1} de ${TE.length}">${TE.map((e,i)=>`<i class="${t.done||i<t.etapa?'on':i===t.etapa?'cur':''}" title="${esc(e)}"></i>`).join('')}</div>
   <div class="row mt16"><span class="lbl" style="flex:1">Etapa ${t.etapa+1} de ${TE.length} · <b style="color:var(--text)">${esc(TE_N(t.etapa))}</b></span><b class="num">${pctT(t)}%</b></div>
   <div class="lbl mt8">${t.done?'Execução concluída.':t.etapa<TE.length-1?'Próxima: '+esc(TE_N(t.etapa+1)):'Última etapa.'}</div>`),
  sec('origem','Origem',kv('Origem',t.origem==='CS'?'Experiência (CS)':esc(t.origem))+(t.reaberta?kv('Motivo',esc(t.reaberta.motivo))+kv('Pedido',esc(t.reaberta.titulo))+kv('Aberta por',esc(t.reaberta.por||'Elisa Prado')):'')+kv('Início',t.inicio)+kv('Fim',t.fim||'—')),
  sec('agenda','Agenda operacional',agList(t.agenda),B('Agendar visita','agendar',{icon:'agenda'})),
  sec('atividades','Atividades',`<div class="lbl" style="margin-bottom:8px">Checklist técnico · ${ck} de ${t.check.length}</div>${t.check.map(c=>`<label class="op-chk ${c.ok?'done':''}"><input type="checkbox" data-ck="${c.id}" ${c.ok?'checked':''}><span>${esc(c.t)}</span></label>`).join('')}`,B('Nova atividade','ck-nova',{icon:'mais'})),
  sec('fotos','Fotos da obra',od&&od.fotos.length?`<div class="op-phgrid">${od.fotos.slice(0,8).map(tile).join('')}</div>`:none('Nenhuma foto ainda.'),od?B('Enviar fotos','foto-nova',{icon:'upload'}):''),
  sec('anexos','Anexos',od&&od.anexos.length?`<ul class="op-list">${od.anexos.map(a=>`<li><span class="thumb sm" aria-hidden="true">${ic('doc',16)}</span><div style="flex:1;min-width:0"><div class="op-kt">${esc(a.n)}</div><div class="lbl op-ks">${esc(a.por)} · ${a.em}</div></div>${B('Baixar','ax-get',{w:'96px',attrs:`data-id="${a.id}"`})}</li>`).join('')}</ul>`:none('Nenhum anexo.'),od?B('Enviar anexo','ax-novo',{icon:'upload'}):''),
  sec('equipe','Equipe técnica',`<div class="row" style="gap:12px;flex-wrap:wrap">${t.equipe.map(n=>`<span class="row" style="gap:8px">${U.av(n)}<span>${esc(n)}</span></span>`).join('')}</div>`,B('Adicionar pessoa','eq-add',{icon:'mais'})),
  sec('comentarios','Comentários',t.coment.length?tl(t.coment.map(c=>({q:c.quando+' · '+c.autor,t:c.t}))):none('Nenhum comentário.'),B('Comentar','coment',{icon:'chat'}))].join('')};
 const foot=()=>{const b=$('[data-act="avancar"]',s.el),last=t.etapa>=TE.length-1;b.textContent=t.done?'Execução concluída':last?'Concluir execução':`Avançar para: ${TE_N(t.etapa+1)}`;b.disabled=!!t.done};
 const sync=()=>{$('#op-shsub',s.el).innerHTML=sub();$('#op-shchips',s.el).innerHTML=chips();const sb=$('.sb',s.el),y=sb.scrollTop;sb.innerHTML=body();sb.scrollTop=y;foot();bind();redraw&&redraw()};
 const bind=()=>{M.wire(s.el,{__x:s.close,...H});$$('[data-ck]',s.el).forEach(c=>c.onchange=()=>{t.check.find(x=>x.id===c.dataset.ck).ok=c.checked;sync()})};
 const H={
  editar:()=>editTec(t,sync),
  agendar:()=>agendarModal({titulo:'Visita técnica · '+t.projeto,onOk:a=>{pushAgenda(t.agenda,a);const od=d();if(od)pushAgenda(od.agenda,{...a});sync()}}),
  coment:()=>M.modal({title:'Comentário',width:'560px',ok:'Comentar',fields:[{k:'t',label:'Comentário',type:'textarea',req:true,span:12}],onOk:v=>{t.coment.unshift({t:v.t,autor:'Allysson Moura',quando:HOJE});sync()}}),
  avancar:()=>{if(t.etapa>=TE.length-1){t.done=true;t.fim=HOJE;sync();M.toast('Execução técnica concluída.','Desfazer',()=>{t.done=false;t.fim='';sync()});return}
   const f=t.etapa;t.etapa++;sync();M.toast(`${curto(t.cliente)} → ${TE_N(t.etapa)}`,'Desfazer',()=>{t.etapa=f;sync()})},
  'ck-nova':()=>M.modal({title:'Nova atividade',width:'520px',ok:'Adicionar',fields:[{k:'t',label:'Atividade',req:true,span:12}],onOk:v=>{t.check.push({id:nid('k'),t:v.t,ok:false});sync()}}),
  'foto-nova':()=>M.modal({title:'Enviar fotos',width:'560px',ok:'Enviar',fields:[{k:'f',label:'Fotos',type:'file',req:true,span:12,ph:'Escolher fotos'},{k:'leg',label:'Legenda',span:12,ph:'Ex.: Rack técnico'}],
   onOk:v=>{const od=d(),o=obraBy(t.obra);od.fotos.unshift({id:nid('f'),leg:v.leg||'Foto da obra',data:HOJE,etapa:TE[t.etapa],h:(od.fotos.length*53)%360});o.fotos++;sync();M.toast('Foto enviada.')}}),
  'ax-novo':()=>anexoModal(d(),sync),
  'ax-get':el=>M.toast(`Baixaria “${d().anexos.find(a=>a.id===el.dataset.id).n}” (simulação).`),
  'eq-add':()=>{const rest=EQ.filter(n=>!t.equipe.includes(n));if(!rest.length)return M.toast('Toda a equipe já está nesta execução.');
   M.modal({title:'Adicionar à equipe técnica',width:'480px',ok:'Adicionar',fields:[{k:'n',label:'Pessoa',type:'select',opts:rest,span:12}],onOk:v=>{t.equipe.push(v.n);sync()}})},
  foto:el=>fotoPreview(d().fotos.find(f=>f.id===el.dataset.id))};
 s=M.sheet({kick:'Técnica · '+t.cliente,title:t.projeto,sub:`<span id="op-shsub">${sub()}</span>`,chips:`<span id="op-shchips" class="row" style="gap:8px;flex-wrap:wrap">${chips()}</span>`,
  acts:[{label:'Editar',act:'editar'},{label:'Agendar visita',act:'agendar'},{label:'Comentário',act:'coment'}],body:body(),foot:[{label:'Fechar',act:'__x'},{label:'Avançar',act:'avancar',pri:true}],on:H});
 foot(); bind();
 if(secId)requestAnimationFrame(()=>{const x=$('#op-s-'+secId,s.el);if(x){x.scrollIntoView({block:'start'});x.classList.add('op-hl')}});
}
function legadoModal(done){
 M.modal({title:'Obra anterior ao Maestro',sub:'Cadastre uma obra que começou antes do sistema para acompanhá-la na Técnica e no Sucesso do Cliente.',fields:[
  {k:'cli',label:'Cliente',type:'select',opts:contatoChoices(),ph:'Escolha o cliente',req:true,span:12},
  {k:'nome',label:'Nome da obra',req:true,span:6,ph:'Ex.: Casa Vila da Serra'},{k:'end',label:'Endereço',span:6,ph:'Rua, número · bairro'},
  {k:'et',label:'Etapa atual na Técnica',type:'select',opts:TE,ph:'Escolha a etapa',req:true,span:6},{k:'cs',label:'Etapa no Sucesso do Cliente',type:'select',opts:CE,ph:'Não incluir agora',span:6},
  {k:'ini',label:'Início',type:'date',span:6},{k:'obs',label:'Observação',type:'textarea',span:12}],ok:'Cadastrar obra',
  onOk:v=>{S.tec.push({id:nid('t'),cliente:v.cli,projeto:v.nome,obra:null,endereco:v.end,etapa:TE.indexOf(v.et),inicio:br(v.ini)||HOJE,fim:'',origem:'Obra anterior',resp:'Bruno Lima',equipe:['Bruno Lima'],agenda:[],check:CK(),coment:v.obs?[{t:v.obs,autor:'Allysson Moura',quando:HOJE}]:[]});
   if(v.cs&&!csOf(v.cli))S.cs.push({id:nid('x'),cliente:v.cli,obra:null,etapa:CE.indexOf(v.cs),status:'Ativo',saude:70,ultimo:HOJE,tel:telOf(v.cli),resp:'Elisa Prado',legado:true,alertas:[],acoes:[],agenda:[],expansoes:[],hist:[{q:HOJE,t:'Cadastrada como obra anterior ao Maestro',d:v.nome}]});
   done();M.toast(`“${v.nome}” cadastrada na Técnica${v.cs?' e na Experiência':''}.`)}});
}
M.screen('tecnica',{title:'Técnica',dock:'tecnica',
 help:['A Técnica acompanha a execução em campo, em paralelo a Projetos.','Arraste o cartão para avançar a etapa técnica, ou abra o cartão e use “Avançar para”.',
  'Cartões com ↺ foram reabertos pela Experiência (manutenção, ajuste ou reparo).','“Obra anterior ao Maestro” cadastra uma obra que começou antes do sistema.'],
 variants:{A:{label:'Técnica',
  render:()=>U.page({kick:'Operação',title:'Técnica',sub:`Execução técnica · ${TE.length} etapas · roda em paralelo a Projetos.`,acts:[{label:'Obra anterior ao Maestro',icon:'mais',act:'legado',pri:true}]})
   +U.bar(U.viewToggle(S.tview,'op-tvw'),'<span class="row" id="op-tcount" style="gap:8px"></span>')+'<div id="op-tb"></div>',
  mount:v=>{
   const body=$('#op-tb',v); let first=true;
   const card=t=>{const i=S.tec.indexOf(t);return `<article class="card kcard op-k" data-act="abrir" data-i="${i}" tabindex="0" role="button" draggable="true" data-drag="${i}" aria-label="${esc(t.projeto)}">
    <div class="row" style="gap:8px;align-items:flex-start"><div style="flex:1;min-width:0"><div class="op-kt">${esc(curto(t.cliente))}</div><div class="lbl op-ks">${esc(t.projeto)}</div></div>${U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Ações da execução',act:'mais',attrs:`data-i="${i}"`})}</div>
    <div class="mt16">${U.prog(pctT(t))}</div>
    <div class="row mt8"><span class="lbl op-n12" style="flex:1">Etapa ${t.etapa+1} de ${TE.length}</span><b class="num op-n12">${pctT(t)}%</b></div>
    <div class="row mt8" style="gap:8px;flex-wrap:wrap"><span class="lbl op-n12" style="flex:1 1 auto;white-space:nowrap">Início ${dm(t.inicio)}</span>${t.reaberta?U.chip('↺ Reaberta via CS','w'):''}${t.origem==='Obra anterior'?U.chip('Obra anterior','n'):''}${t.done?U.chip('Concluída','g'):''}</div></article>`};
   const draw=()=>{const re=S.tec.filter(t=>t.reaberta).length;
    $('#op-tcount',v).innerHTML=U.chip(`${S.tec.length} execuções`)+(re?U.chip(`↺ ${re} reabertas`,'w'):'');
    if(!S.tec.length)body.innerHTML=`<section class="card">${U.empty({title:'Nenhuma implementação técnica em andamento.',text:'Execuções nascem dos projetos, da Experiência ou de uma obra anterior ao Maestro.'})}</section>`;
    else if(S.tview==='kanban'){body.innerHTML=U.board(TE.map((n,ci)=>({name:TE_N(ci),dot:ci===TE.length-1?'rgb(var(--pos))':'rgb(var(--primary))',cards:S.tec.filter(t=>t.etapa===ci).map(card)})),{drag:true});
     U.bindBoard(body,(i,col)=>{const t=S.tec[+i],f=t.etapa;if(f===col)return;t.etapa=col;draw();M.toast(`${curto(t.cliente)} → ${TE_N(col)}`,'Desfazer',()=>{t.etapa=f;draw()})});
     $$('[data-act="mais"]',body).forEach(b=>b.addEventListener('keydown',e=>e.stopPropagation()))}
    else body.innerHTML=U.table({rows:S.tec,rowAct:'abrirL',cols:[{h:'Cliente',html:t=>`<b style="font-weight:600">${esc(t.cliente)}</b>`},{h:'Projeto',html:t=>esc(t.projeto)},
     {h:'Etapa',html:t=>`${U.chip(TE_N(t.etapa),t.done?'g':'n')} <span class="lbl num op-n12">${pctT(t)}%</span>`},{h:'Início',html:t=>`<span class="num">${t.inicio}</span>`},
     {h:'Origem',html:t=>t.reaberta?U.chip('↺ Reaberta via CS','w'):t.origem==='Obra anterior'?U.chip('Obra anterior','n'):U.chip('Projeto','b')}]});
    if(!first)noRv(body); first=false; M.wire(body,H)};
   const H={abrir:el=>tecSheet(S.tec[+el.dataset.i],null,draw),abrirL:tr=>tecSheet(S.tec[+tr.dataset.i],null,draw),
    mais:el=>{const t=S.tec[+el.dataset.i],go=k=>()=>tecSheet(t,k,draw);M.menu(el,[{label:'Checklist técnico',icon:'check',run:go('atividades')},{label:'Agendar visita',icon:'agenda',run:go('agenda')},{label:'Fotos da obra',icon:'camera',run:go('fotos')},
     {label:'Anexos',icon:'doc',run:go('anexos')},{label:'Equipe técnica',icon:'contatos',run:go('equipe')},{label:'Comentário',icon:'chat',run:go('comentarios')},{label:'Concluir vistoria',icon:'estrela',run:go('progresso')},'-',{label:'Editar',icon:'ajustes',run:()=>editTec(t,draw)}])}};
   M.wire(v,{legado:()=>legadoModal(draw)});
   U.bindSeg(v,'op-tvw',x=>{S.tview=x;draw()}); draw();
  }}}});

/* =====================================================================
   EXPERIÊNCIA (Sucesso do Cliente)
   ===================================================================== */
const ligar=c=>M.toast(`Ligaria para ${c.cliente} · ${c.tel} (simulação).`);
const zap=c=>M.toast(`Abriria o WhatsApp com ${c.cliente} · ${c.tel} (simulação).`);
const csStatus=(c,s)=>c.status==='Perdido'?'Perdido':s>=70?'Saudável':s>=40?'Ativo':'Em risco';
function pulsoModal(c,done){
 M.modal({title:'Pulso do cliente',sub:esc(c.cliente),width:'560px',ok:'Registrar pulso',fields:[{k:'s',label:'Saúde (0 a 100)',type:'number',req:true,span:6,value:String(c.saude)},{k:'h',label:'Como o cliente está?',type:'select',opts:['Muito satisfeito','Satisfeito','Neutro','Insatisfeito'],value:'Satisfeito',span:6},{k:'o',label:'Observação',type:'textarea',span:12}],
  onOk:(v,el)=>{const n=parseInt(v.s);if(isNaN(n)||n<0||n>100){const f=$('[name="s"]',el).closest('.field');f.classList.add('err');const m=$('.msg',f);m.textContent='Use um número de 0 a 100.';m.hidden=false;return false}
   c.saude=n;c.status=csStatus(c,n);c.ultimo=HOJE;c.hist.unshift({q:HOJE,t:'Pulso registrado',d:`Saúde ${n} · ${v.h}${v.o?' · '+v.o:''}`});done();M.toast('Pulso registrado.')}});
}
function alertaModal(c,done){
 M.modal({title:'Registrar alerta',sub:esc(c.cliente),width:'560px',ok:'Registrar',fields:[{k:'t',label:'Alerta',req:true,span:8,ph:'Ex.: Câmera da garagem sem imagem'},{k:'g',label:'Gravidade',type:'select',opts:['Alta','Média','Baixa'],value:'Média',span:4},{k:'d',label:'Descrição',type:'textarea',span:12}],
  onOk:v=>{c.alertas.unshift({id:nid('al'),t:v.t,em:HOJE,g:v.g});c.hist.unshift({q:HOJE,t:'Alerta registrado',d:v.t});done();M.toast('Alerta registrado.')}});
}
function anotarModal(c,done){
 M.modal({title:'Anotar',sub:esc(c.cliente),width:'560px',ok:'Salvar anotação',fields:[{k:'t',label:'Anotação',type:'textarea',req:true,span:12}],onOk:v=>{c.hist.unshift({q:HOJE,t:'Anotação',d:v.t});done();M.toast('Anotação salva.')}});
}
function editCs(c,done){
 M.modal({title:'Editar acompanhamento',sub:esc(c.cliente),width:'560px',fields:[{k:'e',label:'Etapa',type:'select',opts:CE,value:CE[c.etapa],span:6},{k:'s',label:'Status',type:'select',opts:CST,value:c.status,span:6},
  {k:'r',label:'Responsável',type:'select',opts:EQ,value:c.resp,span:6},{k:'t',label:'Telefone',type:'tel',value:c.tel,span:6}],
  onOk:v=>{c.etapa=CE.indexOf(v.e);c.status=v.s;c.resp=v.r;c.tel=v.t;done();M.toast('Acompanhamento salvo.')}});
}
function csSheet(c,secId,redraw){
 let s; const o=()=>c.obra?obraBy(c.obra):null;
 const sub=()=>`${o()?esc(o().nome):'Sem obra'} · ${esc(CE[c.etapa])} · último contato ${dm(c.ultimo)}`;
 const chips=()=>U.chip(c.status,ST_CS[c.status])+U.chip('Saúde '+c.saude,ht(c.saude))+(c.alertas.length?U.chip(c.alertas.length+' alerta'+(c.alertas.length>1?'s':''),'r'):'')+(c.legado?U.chip('Obra anterior','n'):'');
 const body=()=>{const tecs=S.tec.filter(t=>t.cliente===c.cliente);return [
  sec('saude','Saúde',`<div class="row"><span class="op-big num" style="color:${hc(c.saude)}">${c.saude}</span><span class="lbl" style="flex:1">de 100 · ${c.saude>=70?'faixa verde (70 ou mais)':c.saude>=40?'faixa amarela (40 a 69)':'faixa vermelha (abaixo de 40)'}</span></div><div class="mt16">${U.prog(c.saude,hc(c.saude))}</div>`,B('Registrar pulso','pulso',{icon:'coracao'})),
  sec('expansao','Sugerir expansão',`<p class="lbl" style="margin:0 0 12px">Viu uma oportunidade nova com este cliente? Vira um negócio no Comercial, já ligado a ele.</p>${c.expansoes.length?`<ul class="op-list">${c.expansoes.map(x=>`<li><div style="flex:1;min-width:0"><div class="op-kt">${esc(x.titulo)}</div><div class="lbl op-ks">${x.quando}${x.valor?' · '+brl(x.valor):''}</div></div>${B('Abrir negócio','neg',{w:'136px',attrs:`data-id="${x.id}"`})}</li>`).join('')}</ul>`:''}`,B('Sugerir expansão','expandir',{icon:'brilho'})),
  sec('alertas','Alertas',c.alertas.length?`<ul class="op-list">${c.alertas.map(a=>`<li><span class="dot" style="background:rgb(var(--${a.g==='Alta'?'neg':a.g==='Média'?'warn':'primary'}))"></span><div style="flex:1;min-width:0"><div class="op-kt">${esc(a.t)}</div><div class="lbl op-ks">${a.em} · gravidade ${a.g.toLowerCase()}</div></div>${B('Resolver','al-ok',{w:'96px',attrs:`data-id="${a.id}"`})}</li>`).join('')}</ul>`:none('Nenhum alerta aberto.'),B('Registrar alerta','alerta',{icon:'mais'})),
  sec('acoes','Próximas ações',c.acoes.length?`<ul class="op-list">${c.acoes.map(a=>`<li><div style="flex:1;min-width:0"><div class="op-kt">${esc(a.t)}</div><div class="lbl op-ks">${dm(a.quando)} · ${esc(a.resp)}</div></div><div class="btnrow op-acts2">${B('Delegar','a-del',{attrs:`data-id="${a.id}"`})}${B('Concluir','a-ok',{attrs:`data-id="${a.id}"`})}</div></li>`).join('')}</ul>`:none('Sem próxima ação.'),B('Nova ação','a-nova',{icon:'mais'})),
  sec('agenda','Agenda',agList(c.agenda),B('Agendar visita','agendar',{icon:'agenda'})),
  sec('tecnica','Técnica',tecs.length?`<ul class="op-list">${tecs.map(t=>`<li><div style="flex:1;min-width:0"><div class="op-kt">${esc(t.projeto)}</div><div class="lbl op-ks">${esc(TE_N(t.etapa))} · desde ${dm(t.inicio)}</div></div>${t.reaberta?U.chip('↺ Reaberta','w'):''}${U.chip(t.done?'Concluída':pctT(t)+'%',t.done?'g':'b')}</li>`).join('')}</ul>`:none('Nenhuma execução técnica.'),B('Reabrir Técnica','reabrir',{icon:'trocar'})),
  sec('historico','Histórico',tl(c.hist))].join('')};
 const foot=()=>{const b=$('[data-act="avancar"]',s.el),last=c.etapa>=CE.length-1;b.textContent=last?'Última etapa':`Avançar para "${CE[c.etapa+1]}"`;b.disabled=last};
 const sync=()=>{$('#op-shsub',s.el).innerHTML=sub();$('#op-shchips',s.el).innerHTML=chips();const sb=$('.sb',s.el),y=sb.scrollTop;sb.innerHTML=body();sb.scrollTop=y;foot();M.wire(s.el,{__x:s.close,...H});redraw&&redraw()};
 const fA=el=>c.acoes.find(a=>a.id===el.dataset.id);
 const H={
  ligar:()=>ligar(c), zap:()=>zap(c), pulso:()=>pulsoModal(c,sync), alerta:()=>alertaModal(c,sync),
  agendar:()=>agendarModal({titulo:'Visita de acompanhamento',onOk:a=>{pushAgenda(c.agenda,a);c.hist.unshift({q:HOJE,t:'Visita agendada',d:`${a.t} · ${dm(a.data)} ${a.hora}`});sync()}}),
  avancar:()=>{const f=c.etapa;c.etapa++;c.hist.unshift({q:HOJE,t:'Etapa mudou',d:CE[c.etapa]});sync();M.toast(`${curto(c.cliente)} → ${CE[c.etapa]}`,'Desfazer',()=>{c.etapa=f;c.hist.shift();sync()})},
  expandir:()=>M.modal({title:'Sugerir expansão',sub:esc(c.cliente),ok:'Criar negócio',fields:[{k:'t',label:'Título',req:true,span:12,ph:'Ex.: Áudio na área gourmet'},{k:'c',label:'Contexto',type:'textarea',span:12,ph:'O que o cliente comentou, por que é uma boa hora.'},{k:'v',label:'Valor estimado',type:'money',span:6}],
   onOk:v=>{const ct=D.contatos.find(x=>x.nome===c.cliente),n={id:nid('n'),titulo:v.t,cliente:c.cliente,cid:ct?ct.id:'',etapa:0,valor:money(v.v),status:'Aberto',origem:'Expansão (Experiência)',resp:'Allysson Moura',prob:20};
    D.negocios.push(n);c.expansoes.unshift({id:n.id,titulo:v.t,valor:n.valor,quando:HOJE});c.hist.unshift({q:HOJE,t:'Expansão sugerida',d:v.t});sync();
    M.toast('Negócio de expansão criado no Comercial.','Abrir',()=>{s.close();location.hash='#/negocios?card='+n.id})}}),
  neg:el=>{s.close();location.hash='#/negocios?card='+el.dataset.id},
  'al-ok':el=>{const a=c.alertas.find(x=>x.id===el.dataset.id);M.confirm({title:'Resolver alerta',text:a.t,field:'Como foi resolvido?',ok:'Resolver',run:v=>{c.alertas=c.alertas.filter(x=>x!==a);c.hist.unshift({q:HOJE,t:'Alerta resolvido',d:`${a.t} · ${v.motivo}`});sync()}})},
  'a-del':el=>{const a=fA(el);M.modal({title:'Delegar',sub:esc(a.t),width:'520px',ok:'Delegar',fields:[{k:'r',label:'Para quem',type:'select',opts:EQ,value:a.resp,span:12}],onOk:v=>{a.resp=v.r;sync();M.toast(`Delegada para ${v.r}.`)}})},
  'a-ok':el=>{const a=fA(el);M.modal({title:'Concluir ação',sub:esc(a.t),width:'520px',ok:'Concluir',fields:[{k:'f',label:'O que foi feito?',type:'textarea',req:true,span:12}],
   onOk:v=>{c.acoes=c.acoes.filter(x=>x!==a);c.ultimo=HOJE;c.hist.unshift({q:HOJE,t:a.t,d:v.f});sync();M.toast('Ação concluída.')}})},
  'a-nova':()=>M.modal({title:'Nova ação',width:'560px',ok:'Criar',fields:[{k:'t',label:'Ação',req:true,span:12},{k:'d',label:'Quando',type:'date',req:true,span:6},{k:'r',label:'Responsável',type:'select',opts:EQ,value:c.resp,span:6}],
   onOk:v=>{c.acoes.push(AC(v.t,br(v.d),v.r));sync()}}),
  reabrir:()=>M.modal({title:'Reabrir Técnica',sub:`Abre uma nova execução técnica para ${esc(c.cliente)}, marcada como reaberta via Experiência.`,ok:'Reabrir Técnica',fields:[
    {k:'m',label:'Motivo',type:'select',opts:['Manutenção','Ajuste','Reparo','Personalização','Nova demanda'],req:true,ph:'Escolha o motivo',span:6},{k:'r',label:'Responsável',type:'select',opts:EQ,value:'Bruno Lima',span:6},
    {k:'t',label:'Título',req:true,span:12,ph:'Ex.: Câmera da garagem sem imagem'},{k:'d',label:'Descrição',type:'textarea',span:12}],
   onOk:v=>{const ob=o();S.tec.push({id:nid('t'),cliente:c.cliente,projeto:ob?ob.nome:c.cliente,obra:c.obra,endereco:'',etapa:0,inicio:HOJE,fim:'',origem:'CS',reaberta:{motivo:v.m,titulo:v.t,por:'Allysson Moura'},resp:v.r,equipe:[v.r],agenda:[],check:CK(),coment:v.d?[{t:v.d,autor:'Allysson Moura',quando:HOJE}]:[]});
    c.hist.unshift({q:HOJE,t:'Técnica reaberta: '+v.m,d:v.t});sync();M.toast('Técnica reaberta.','Abrir Técnica',()=>{s.close();location.hash='#/tecnica'})}})};
 s=M.sheet({kick:'Experiência',title:c.cliente,sub:`<span id="op-shsub">${sub()}</span>`,chips:`<span id="op-shchips" class="row" style="gap:8px;flex-wrap:wrap">${chips()}</span>`,
  acts:[{label:'Ligar',act:'ligar',icon:'telefone'},{label:'WhatsApp',act:'zap',icon:'zap'},{label:'Agendar visita',act:'agendar'},{label:'Pulso',act:'pulso'}],body:body(),
  foot:[{label:'Fechar',act:'__x'},{label:'Avançar',act:'avancar',pri:true}],on:H});
 foot(); M.wire(s.el,{__x:s.close,...H});
 if(secId)requestAnimationFrame(()=>{const x=$('#op-s-'+secId,s.el);if(x){x.scrollIntoView({block:'start'});x.classList.add('op-hl')}});
}
M.screen('experiencia',{title:'Experiência',dock:'experiencia',
 help:['Cada cliente entregue entra aqui para acompanhamento contínuo.','A saúde vai de 0 a 100: verde a partir de 70, amarelo a partir de 40, vermelho abaixo disso.',
  'Abra o cliente para registrar pulso e alertas, sugerir expansão ou reabrir a Técnica.','Arraste o cartão para mudar a etapa do acompanhamento.'],
 variants:{A:{label:'Experiência',
  render:()=>U.page({kick:'Operação',title:'Experiência',sub:'Pipeline macro · Acompanhamento contínuo · Handoffs operacionais.'})
   +U.bar(U.viewToggle(S.cview,'op-cvw'),'<span class="row" id="op-ccount" style="gap:8px"></span>')+'<div id="op-cb"></div>',
  mount:v=>{
   const body=$('#op-cb',v); let first=true;
   const card=c=>{const i=S.cs.indexOf(c),o=c.obra?obraBy(c.obra):null;return `<article class="card kcard op-k" data-act="abrir" data-i="${i}" tabindex="0" role="button" draggable="true" data-drag="${i}" aria-label="${esc(c.cliente)}">
    <div class="row" style="gap:8px;align-items:flex-start"><div style="flex:1;min-width:0"><div class="op-kt">${esc(curto(c.cliente))}</div><div class="lbl op-ks">${o?esc(o.nome):'Sem obra'} · ${esc(CE[c.etapa])}</div></div>${U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Ações do cliente',act:'mais',attrs:`data-i="${i}"`})}</div>
    <div class="row mt16"><span class="lbl op-n12" style="flex:1">Saúde</span><b class="num" style="color:${hc(c.saude)}">${c.saude}</b></div>
    <div class="mt8">${U.prog(c.saude,hc(c.saude))}</div>
    <div class="row mt16" style="gap:8px;flex-wrap:wrap">${U.chip(c.status,ST_CS[c.status])}${c.alertas.length?U.chip(c.alertas.length+' alerta'+(c.alertas.length>1?'s':''),'r'):''}${c.legado?U.chip('Obra anterior','n'):''}</div>
    ${c.alertas[0]?`<div class="lbl op-ks mt8">${esc(c.alertas[0].t)}</div>`:''}
    <div class="btnrow mt16">${B('Ligar','ligar',{icon:'telefone',attrs:`data-i="${i}"`})}${B('WhatsApp','zap',{icon:'zap',attrs:`data-i="${i}"`})}</div></article>`};
   const draw=()=>{const al=S.cs.reduce((a,c)=>a+c.alertas.length,0);
    $('#op-ccount',v).innerHTML=U.chip(`${S.cs.length} clientes`)+U.chip(`${al} alertas`,al?'r':'n');
    if(!S.cs.length)body.innerHTML=`<section class="card">${U.empty({title:'Nenhum cliente em acompanhamento.',text:'O cliente entra aqui quando a obra é entregue.'})}</section>`;
    else if(S.cview==='kanban'){body.innerHTML=U.board(CE.map((n,ci)=>({name:n,dot:'rgb(var(--primary))',cards:S.cs.filter(c=>c.etapa===ci).map(card)})),{drag:true});
     U.bindBoard(body,(i,col)=>{const c=S.cs[+i],f=c.etapa;if(f===col)return;c.etapa=col;c.hist.unshift({q:HOJE,t:'Etapa mudou',d:CE[col]});draw();M.toast(`${curto(c.cliente)} → ${CE[col]}`,'Desfazer',()=>{c.etapa=f;c.hist.shift();draw()})});
     $$('.op-k [data-act]',body).forEach(b=>b.addEventListener('keydown',e=>e.stopPropagation()))}
    else body.innerHTML=U.table({rows:S.cs,rowAct:'abrirL',cols:[{h:'Cliente',html:c=>`<b style="font-weight:600">${esc(c.cliente)}</b>`},{h:'Etapa',html:c=>esc(CE[c.etapa])},{h:'Status',html:c=>U.chip(c.status,ST_CS[c.status])},
     {h:'Saúde',w:'184px',html:c=>`<div class="row" style="gap:8px"><b class="num" style="width:28px;color:${hc(c.saude)}">${c.saude}</b><div style="flex:1">${U.prog(c.saude,hc(c.saude))}</div></div>`},
     {h:'Último contato',html:c=>`<span class="num">${c.ultimo}</span>`},{h:'Alertas',r:true,html:c=>c.alertas.length?U.chip(String(c.alertas.length),'r'):'<span class="faint">0</span>'}]});
    if(!first)noRv(body); first=false; M.wire(body,H)};
   const H={abrir:el=>csSheet(S.cs[+el.dataset.i],null,draw),abrirL:tr=>csSheet(S.cs[+tr.dataset.i],null,draw),
    ligar:el=>ligar(S.cs[+el.dataset.i]),zap:el=>zap(S.cs[+el.dataset.i]),
    mais:el=>{const c=S.cs[+el.dataset.i];M.menu(el,[
     {label:'Agendar visita',icon:'agenda',run:()=>agendarModal({titulo:'Visita de acompanhamento',onOk:a=>{pushAgenda(c.agenda,a);c.hist.unshift({q:HOJE,t:'Visita agendada',d:`${a.t} · ${dm(a.data)} ${a.hora}`});draw()}})},
     {label:'Pulso / saúde',icon:'coracao',run:()=>pulsoModal(c,draw)},{label:'Registrar alerta',icon:'sino',run:()=>alertaModal(c,draw)},{label:'Anotar',icon:'doc',run:()=>anotarModal(c,draw)},
     {label:'Concluir tarefa',icon:'check',run:()=>csSheet(c,'acoes',draw)},'-',{label:'Editar',icon:'ajustes',run:()=>editCs(c,draw)}])}};
   U.bindSeg(v,'op-cvw',x=>{S.cview=x;draw()}); draw();
  }}}});
})();

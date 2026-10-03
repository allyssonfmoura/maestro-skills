/* Maestro OS · protótipo · mod-gestao: Financeiro (+ Resultado, Previsto x Realizado, Conciliação, Contratos), Compras, Estoque.
   Fiel ao real (inventario/04 §2–4), redesenhado no kit. Substitui as chaves 'financeiro' e 'compras' de telas.js.
   Tudo funciona sobre o estado G (títulos, contas, pedidos, fila de compras, estoque), coerente com telas.js e dados.js. */
(function(){
const {ic,brl,brl0,$,$$,esc}=M, U=M.ui, D=M.D;

/* ---------- CSS próprio (prefixo gs-, múltiplos de 4, só variáveis do tema) ---------- */
document.head.insertAdjacentHTML('beforeend',`<style id="gs-css">
/* ações de linha: irmãos de largura igual; em cartão estreito o secundário vai para o ⋯ */
.gs-acts{display:flex;gap:8px;justify-content:flex-end;align-items:center}
.gs-acts>span{width:184px;flex:none}
.gs-acts>.btn{flex:none}
.gs-nar{display:none!important}
.gs-d{display:flex;flex-direction:column;gap:4px;min-width:0;padding:8px 0}
.gs-d>b{font-weight:600}
.gs-d>b,.gs-d>span,.gs-sub{display:block;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gs-sub{font-size:12px;color:var(--soft)}
.gs-sig{display:flex;gap:4px;flex-wrap:wrap}
.gs-li{display:flex;align-items:center;gap:12px;min-height:52px;border-top:1px solid var(--line-2)}
.gs-li:first-child{border-top:0}
.gs-li .gs-grow{flex:1;min-width:0}
.gs-li .gs-grow>*{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gs-li>b{flex:none;white-space:nowrap}
.gs-sign{width:24px;flex:none;text-align:center;font-weight:700}
.gs-ch h2{min-width:0;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gs-ch>.btn,.gs-ch>.chip{flex:none}
/* tabelas largas: rolam dentro do cartão, 1ª coluna presa e legível */
.gs-t{container-type:inline-size}
.gs-t .tbl{--gs-flex:var(--gs-flex0,240px);--gs-actw:var(--gs-aww,0px);min-width:calc(var(--gs-fix,0px) + var(--gs-flex))}
.gs-t .tbl td{overflow:hidden;text-overflow:ellipsis}
.gs-t .tbl td.gs-vis{overflow:visible}
.gs-t .tbl.gs-stk tr>:first-child,.gs-t .tbl.gs-stk2 tr>:nth-child(-n+2){position:sticky;z-index:1;background:var(--panel)}
.gs-t .tbl.gs-stk tr>:first-child,.gs-t .tbl.gs-stk2 tr>:first-child{left:0}
.gs-t .tbl.gs-stk2 tr>:nth-child(2){left:56px}
.gs-t .tbl tr>td[colspan]{position:static!important;background:transparent!important}
.gs-t .ghead{position:sticky;left:0;max-width:100cqw;box-sizing:border-box}
.gs-t .tbl.gs-stk tbody tr:hover>:first-child,.gs-t .tbl.gs-stk2 tbody tr:hover>:nth-child(-n+2){background:color-mix(in srgb,var(--text) 3.5%,var(--panel))}
.gs-t .ch{flex-wrap:wrap;row-gap:8px}
.gs-t .ch h2{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gs-t .ch>.btn,.gs-t .ch>.chip,.gs-t .ch>b,.gs-t .ch>.lbl{flex:none}
@container (max-width:1199px){
  .gs-t .tbl{--gs-actw:var(--gs-awn,0px)}
  .gs-t .gs-wid{display:none!important}
  .gs-t .gs-nar{display:inline-flex!important}
}
@container (max-width:640px){
  .gs-t .ch h2{flex:1 0 100%}
  .gs-t .ch>.spacer{display:none}
}
@container (max-width:560px){
  .gs-t .tbl{--gs-flex:calc(var(--gs-flex0,240px) * .7)}
  .gs-t .tbl.gs-stk2 tr>:first-child{position:static;background:transparent}
  .gs-t .tbl.gs-stk2 tr>:nth-child(2){left:0}
}
/* gráfico: mede o contêiner e redesenha */
.gs-gc{display:flex;flex-direction:column;container-type:inline-size}
.gs-chart{position:relative;flex:1 1 auto;min-height:clamp(240px,40cqw,380px);margin-top:16px}
.gs-chart svg{position:absolute;inset:0;display:block;width:100%;height:100%;overflow:visible}
.gs-note{margin:12px 0 0;color:var(--soft);font-size:13.5px;line-height:1.5;max-width:76ch}
.gs-atal{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
.gs-atw{container-type:inline-size}
@container (min-width:1000px){.gs-atal{grid-template-columns:repeat(5,minmax(0,1fr))}}
@media (max-width:1180px) and (min-width:901px){#view .gs-pgrid>.gs-mov{grid-column:span 12}}
.gs-pgrid{grid-auto-flow:row dense}
/* barra de seleção (Compras) */
.gs-sel{position:sticky;bottom:112px;z-index:30;display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px;padding:12px 12px 12px 24px;container-type:inline-size}
.gs-sel>b{flex:1 1 200px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gs-sel label{display:flex;align-items:center;gap:8px;white-space:nowrap}
.gs-b2{display:grid;grid-template-columns:repeat(2,240px);gap:12px}
@container (max-width:440px){.gs-sel .gs-b2{grid-template-columns:minmax(0,1fr)!important}}
@media (max-width:900px){.gs-sel{padding:12px}.gs-sel .gs-b2{grid-template-columns:repeat(2,minmax(0,1fr));flex:1 1 100%}}
.gs-liq{display:flex;align-items:center;justify-content:space-between;gap:16px;border-radius:12px;padding:16px;margin-top:16px;flex-wrap:wrap}
.gs-liq b{font-size:20px;font-weight:600}
.gs-mtbl{margin-top:16px;border-radius:12px;box-shadow:inset 0 0 0 1px var(--line-2);overflow:auto}
.gs-mtbl .tbl td,.gs-mtbl .tbl th{padding-left:12px;padding-right:12px}
.gs-mtbl .tbl td:first-child{max-width:280px;overflow:hidden;text-overflow:ellipsis}
.gs-pan[hidden]{display:none}
.gs-pan{margin-top:16px}
.gs-chk{display:inline-flex;align-items:center;gap:8px;cursor:pointer}
.gs-chk input{accent-color:rgb(var(--primary));width:16px;height:16px}
.gs-in{width:96px;text-align:right}
.gs-ppl{display:flex;flex-direction:column;gap:8px;margin-top:16px}
.gs-ppl>div{display:flex;align-items:center;gap:12px;min-height:44px;padding:0 12px;border-radius:12px}
/* filtros do lado direito da barra */
.gs-fr{display:flex;flex-wrap:wrap;gap:12px;justify-content:flex-end;min-width:0;max-width:100%;flex:0 0 auto}
.gs-fr>*{max-width:100%}
.lat-side .gs-fr{flex-direction:column;align-items:stretch}
.lat-side .gs-fr>*{width:100%!important}
@media (max-width:900px){.gs-fr{justify-content:flex-start;width:100%}.gs-fr>*{flex:1 1 200px}}
/* modais com tabela: abas e tabela não saem da tela */
.modal .tabs{max-width:100%;overflow-x:auto;scrollbar-width:none}
@media (max-width:900px){.modal .mf{flex-wrap:wrap}}
@media (max-width:480px){body:has(#view [id^="gs-"]) .modal .mf{display:grid;grid-template-columns:minmax(0,1fr)}}
/* celular: fatura sem rolar de lado (cabeçalho quebra linha) e botão do Uso comum sem rótulo vazio em cima */
@media (max-width:480px){.gs-fat th:first-child{white-space:normal}.gs-fat td:first-child{white-space:normal}}
@media (max-width:900px){.modal .gs-sp{display:none}}
/* celular: cabeçalho sem espremer rótulo (ícone some nos secundários; Compras empilha) */
@media (max-width:480px){#view:has([id^="gs-"]):not(:has(#gs-comp)) .head .acts .btn:not(.pri)>svg{display:none}
  #view:has(#gs-comp) .head .acts{grid-template-columns:minmax(0,1fr)}}
</style>`);

/* ---------- utilidades ---------- */
const HOJE=D.hoje||'2026-10-02';
const d2=iso=>iso?iso.slice(8,10)+'/'+iso.slice(5,7):'—';
const d3=iso=>iso?d2(iso)+'/'+iso.slice(0,4):'—';
const dias=(a,b)=>Math.round((new Date(b+'T12:00')-new Date(a+'T12:00'))/864e5);
const addDias=(iso,n)=>{const d=new Date(iso+'T12:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
const addMeses=(iso,n)=>{const d=new Date(iso+'T12:00');d.setMonth(d.getMonth()+n);return d.toISOString().slice(0,10)};
const num=s=>{if(typeof s==='number')return s;s=String(s||'').replace(/[R$\s]/g,'');if(s.includes(','))s=s.replace(/\./g,'').replace(',','.');const n=parseFloat(s);return isNaN(n)?0:n};
const fmtIn=n=>(+n||0).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
const r2=n=>Math.round(n*100)/100;
const obraNome=id=>(D.byId('obras',id)||{}).nome||'';
const fornNome=id=>(D.byId('fornecedores',id)||{}).nome||'Sem fornecedor';
const go=h=>{location.hash=h};
const sum=(a,f)=>a.reduce((s,x)=>s+f(x),0);
const clickTab=(root,i)=>{const b=$$('[data-tabs] .tab',root)[i];b&&b.click()};
const voltarFin={label:'Voltar ao Financeiro',icon:'voltar',act:'voltar'};
const PLANO_REC=['Receita de projetos','Receita de serviços recorrentes','Receita de produtos'];
const PLANO_PAG=['Compra de materiais','Folha de pagamento','Aluguel','Serviços contábeis','Tarifas bancárias','Combustível e deslocamento','Software e assinaturas','Marketing'];
/* tabela larga: layout fixo com largura mínima calculada (rola dentro do cartão), 1ª coluna presa.
   aw=[larga,estreita]: largura da coluna de ações conforme a largura do cartão (as secundárias vão para o ⋯). */
const TB=(o,{flex=240,stk=true,aw=null,cls=''}={})=>{
  const fixo=o.cols.reduce((s,c)=>s+(/^\d+px$/.test(c.w||'')?parseFloat(c.w):0),0)+24*o.cols.length+24+(o.check?56:0);
  const sty=`table-layout:fixed;--gs-fix:calc(${fixo}px + var(--gs-actw,0px));--gs-flex0:${flex}px${aw?`;--gs-aww:${aw[0]}px;--gs-awn:${aw[1]}px`:''}`;
  const n=o.cols.length,cols=o.cols.map((c,i)=>c.w?{...c,w:`calc(${c.w} + ${(i===0&&!o.check)||i===n-1?'var(--pad) + 12px':'24px'})`}:c);
  return U.table({...o,cols,fixed:true}).replace('class="card flush rv" style="--d:3"',`class="card flush rv gs-t ${cls}" style="--d:3"`)
    .replace('<table class="tbl" style="table-layout:fixed"',`<table class="tbl${stk?(o.check?' gs-stk2':' gs-stk'):''}" style="${sty}"`)};
const MESES_N=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];

/* =====================================================================
   ESTADO DO MÓDULO (coerente com telas.js: saldo 485.253,98 · a receber 244.011,86 · a pagar 111.430,57)
   ===================================================================== */
const T=(id,tipo,desc,contato,obra,parc,valor,venc,ex={})=>Object.assign({id,tipo,desc,contato,obra,parc,valor,venc,pago:0,status:'open',emissao:addDias(venc,-30),
  plano:tipo==='rec'?'Receita de projetos':'Compra de materiais',conta:'itau',aviso:null,avisoOld:false,nf:null},ex);
const G=window.__gs||(window.__gs={
 oculto:false, seq:200,
 contas:[{id:'itau',nome:'Itaú',tipo:'Conta corrente',saldo:312480.12},{id:'inter',nome:'Inter',tipo:'Conta corrente',saldo:96410.55},
   {id:'caixa',nome:'Caixa',tipo:'Conta corrente',saldo:58913.31},{id:'cofre',nome:'Cofre',tipo:'Dinheiro em espécie',saldo:17450}],
 cartao:{nome:'Cartão Itaú Empresarial',ref:'Outubro/2026',fecha:'2026-10-05',vence:'2026-10-12',
   compras:[['22/09','Posto Shell · combustível',412.80],['25/09','Autodesk · licença anual',6980],['28/09','Kalunga · escritório',1349.50]],pago:0},
 tit:[
  T('r1','rec','Automação residencial','Helena Duarte','o1','3/6',73471.09,'2026-09-12',{aviso:'https://maestro.app/aviso/7KQ2',avisoOld:true}),
  T('r2','rec','Infra de rede · Entrada','Marcos Valente','o2','1/3',73471.08,'2026-09-20',{aviso:'https://maestro.app/aviso/P3XA'}),
  T('r3','rec','Automação · apartamento','Paula e Renato Lopes','','1/4',39342.11,'2026-10-02'),
  T('r4','rec','Iluminação · Sinal','Marta Albuquerque','','1/2',14600,'2026-10-15',{semEmail:true}),
  T('r5','rec','Som ambiente · Parcela única','Sushi Yoru Bar','','',43127.58,'2026-10-28',{plano:'Receita de produtos'}),
  T('r6','rec','Segunda fase · Sinal','Lívia Prates e Otávio Lemos','o3','1/3',96927.25,'2026-10-01',{status:'paid',pago:96927.25,baixa:'2026-10-01'}),
  T('r7','rec','Rede e segurança · Projeto','Rodrigo Alencar','','',22102.83,'2026-09-30',{status:'paid',pago:22102.83,baixa:'2026-09-30',conta:'inter'}),
  T('r8','rec','Automação residencial','Helena Duarte','o1','2/6',73471.09,'2026-08-12',{status:'paid',pago:73471.09,baixa:'2026-08-14'}),
  T('r9','rec','Escritório — Áudio · Entrada','Marina Costa Arquitetura','','1/2',10700,'2026-09-18',{status:'canceled',baixa:'2026-09-16'}),
  T('r10','rec','Infra de rede · Parcela 1/2','Marcos Valente','o2','1/2',110206.62,'2026-09-15',{status:'replaced',baixa:'2026-09-10'}),
  T('p1','pag','Pedido 112 · Iluminação','Luminar Sul','o1','',38214.30,'2026-09-18',{nf:{numero:'20981',data:'2026-09-18',valor:38214.30}}),
  T('p2','pag','Pedido 109 · Áudio','Sonos Brasil','o1','',42970,'2026-09-22'),
  T('p3','pag','Pedido 110 · Rede','Ubiquiti · Distribuidor','o2','',18036.27,'2026-09-25'),
  T('p4','pag','Aluguel do escritório','Imobiliária Savassi','','',12060,'2026-09-30',{plano:'Aluguel'}),
  T('p5','pag','Contador','Contabilidade Prado','','',150,'2026-10-10',{plano:'Serviços contábeis'}),
  T('p6','pag','Compra de cabos CAT6','Ubiquiti · Distribuidor','o2','',4210.50,'2026-10-09',{status:'pending',solic:'Bruno Lima'}),
  T('p7','pag','Reembolso de combustível','Carla Souza','','',386.40,'2026-10-05',{status:'pending',solic:'Carla Souza',plano:'Combustível e deslocamento'}),
  T('p8','pag','Pedido 108 · Automação','Control4 Brasil','o1','',11800,'2026-10-01',{status:'paid',pago:11800,baixa:'2026-10-01'}),
  T('p9','pag','Folha de setembro','Equipe','','',38400,'2026-09-29',{status:'paid',pago:38400,baixa:'2026-09-29',plano:'Folha de pagamento'}),
  T('p10','pag','Tarifa bancária','Itaú','','',89.90,'2026-09-28',{status:'paid',pago:89.90,baixa:'2026-09-28',plano:'Tarifas bancárias'}),
  T('p11','pag','Pedido 111 · Câmeras','Intelbras','o1','',2520,'2026-09-26',{status:'paid',pago:2520,baixa:'2026-09-26'})],
 mov:[{data:'2026-10-01',desc:'Recebimento · Lívia Prates e Otávio Lemos',conta:'itau',valor:96927.25},{data:'2026-10-01',desc:'Pagamento · Control4 Brasil',conta:'itau',valor:-11800},
  {data:'2026-09-30',desc:'Transferência · Itaú → Cofre',conta:'itau',valor:5000,tr:true},{data:'2026-09-30',desc:'Recebimento · Rodrigo Alencar',conta:'inter',valor:22102.83},
  {data:'2026-09-29',desc:'Pagamento · Folha de setembro',conta:'itau',valor:-38400},{data:'2026-09-28',desc:'Tarifa bancária',conta:'itau',valor:-89.90}],
 ctr:[
  {id:'k1',tipo:'rec',desc:'Manutenção mensal da automação',contato:'Helena Duarte',valor:890,ciclo:'Mensal',dia:10,reaj:'IPCA',inicio:'2026-01-10',status:'Ativo',esp:1,plano:'Receita de serviços recorrentes'},
  {id:'k2',tipo:'rec',desc:'Monitoramento de rede',contato:'Marcos Valente',valor:420,ciclo:'Mensal',dia:15,reaj:'IGP-M',inicio:'2026-09-15',status:'Ativo',esp:0,plano:'Receita de serviços recorrentes'},
  {id:'k3',tipo:'rec',desc:'Visita técnica trimestral',contato:'Lívia Prates e Otávio Lemos',valor:1800,ciclo:'Trimestral',dia:20,reaj:'IPCA',inicio:'2026-07-20',status:'Ativo',esp:1,plano:'Receita de serviços recorrentes'},
  {id:'k4',tipo:'rec',desc:'Suporte remoto',contato:'Paula e Renato Lopes',valor:290,ciclo:'Mensal',dia:5,reaj:'Nenhum',inicio:'2026-07-05',status:'Suspenso',esp:0,plano:'Receita de serviços recorrentes',motivo:'Cliente viajando até dezembro.'},
  {id:'k5',tipo:'rec',desc:'Manutenção · escritório',contato:'Marina Costa Arquitetura',valor:350,ciclo:'Mensal',dia:10,reaj:'IPCA',inicio:'2025-03-10',fim:'2026-08-10',status:'Encerrado',esp:0,plano:'Receita de serviços recorrentes',motivo:'Escritório mudou de endereço.'},
  {id:'k6',tipo:'pag',desc:'Aluguel do escritório',contato:'Imobiliária Savassi',valor:12060,ciclo:'Mensal',dia:30,reaj:'IGP-M',inicio:'2024-02-01',status:'Ativo',esp:0,plano:'Aluguel'},
  {id:'k7',tipo:'pag',desc:'Contador',contato:'Contabilidade Prado',valor:150,ciclo:'Mensal',dia:10,reaj:'Nenhum',inicio:'2025-01-10',status:'Ativo',esp:0,plano:'Serviços contábeis'},
  {id:'k8',tipo:'pag',desc:'Internet fibra 1 Gb',contato:'Vivo Empresas',valor:389.90,ciclo:'Mensal',dia:8,reaj:'Nenhum',inicio:'2025-05-08',status:'Ativo',esp:1,plano:'Software e assinaturas'},
  {id:'k9',tipo:'pag',desc:'Seguro do veículo',contato:'Porto Seguro',valor:2980,ciclo:'Anual',dia:12,reaj:'Nenhum',inicio:'2025-11-12',status:'Suspenso',esp:0,plano:'Combustível e deslocamento',motivo:'Veículo vendido; aguardando o novo.'}],
 deps:[{id:'d1',nome:'Almoxarifado central',padrao:true,ativo:true},{id:'d2',nome:'Carro do técnico — Bruno',padrao:false,ativo:true},{id:'d3',nome:'Showroom Savassi',padrao:false,ativo:false}],
 prod:[
  {sku:'STH-FITA24',nome:'Stella Fita LED 24V 3000K 10W/m',un:'m',forn:'f1',custo:62,min:50,dep:{d1:58,d2:6},res:[{obra:'o1',q:6,dep:'d2'}]},
  {sku:'STH-PERFIL',nome:'Stella Perfil de embutir com difusor',un:'m',forn:'f1',custo:48,min:20,dep:{d1:12},res:[]},
  {sku:'STH-DRIVER',nome:'Stella Fonte para LED 24V 150W',un:'un',forn:'f1',custo:210,min:4,dep:{d1:3},res:[{obra:'o1',q:1,dep:'d1'}]},
  {sku:'UBI-U7PRO',nome:'Access point Wi-Fi 7 de teto U7-Pro',un:'un',forn:'f3',custo:1590,min:4,dep:{d1:6,d2:1},res:[{obra:'o2',q:3,dep:'d1'}]},
  {sku:'CAB-CAT6',nome:'Cabo de rede CAT6',un:'m',forn:'f3',custo:4.2,min:305,dep:{d1:180,d2:40},res:[{obra:'o2',q:120,dep:'d1'}]},
  {sku:'C4-KD120',nome:'Interruptor inteligente 4 teclas',un:'un',forn:'f4',custo:350,min:4,dep:{d1:9},res:[{obra:'o1',q:4,dep:'d1'}]},
  {sku:'C4-DIM1',nome:'Módulo dimmer',un:'un',forn:'f4',custo:250,min:2,dep:{},res:[]},
  {sku:'C4-CORE5',nome:'Controlador de automação CORE 5',un:'un',forn:'f4',custo:11800,min:0,dep:{d1:1},res:[{obra:'o1',q:1,dep:'d1'}]},
  {sku:'SON-AMP',nome:'Amplificador de streaming Amp',un:'un',forn:'f2',custo:4290,min:0,dep:{d1:6},res:[{obra:'o1',q:6,dep:'d1'}]},
  {sku:'INT-VIP3230B',nome:'Câmera IP bullet 2 MP',un:'un',forn:'f5',custo:420,min:4,dep:{d1:4,d3:2},res:[]},
  {sku:'KLI-CDT5650',nome:'Caixa acústica de embutir 6,5"',un:'pr',forn:null,custo:600,min:0,dep:{d1:2},res:[]}],
 emov:[
  {data:'2026-10-01 16:40',tipo:'Saída',sku:'CAB-CAT6',q:60,dep:'d1',motivo:'Obra Casa Valente · infra de rede'},
  {data:'2026-09-30 10:12',tipo:'Transferência',sku:'STH-FITA24',q:6,dep:'d1',para:'d2',motivo:'Separado para a Residência Duarte'},
  {data:'2026-09-20 15:03',tipo:'Entrada',sku:'SON-AMP',q:6,dep:'d1',motivo:'Pedido 109 · NF 55120'},
  {data:'2026-09-19 09:30',tipo:'Entrada',sku:'INT-VIP3230B',q:6,dep:'d1',motivo:'Pedido 111 · NF 90233'},
  {data:'2026-09-18 14:22',tipo:'Entrada',sku:'STH-FITA24',q:300,dep:'d1',motivo:'Pedido 112 · NF 20981'}],
 fila:[
  {id:'q1',sku:'TESC-RECEIVER',nome:'Receiver AV 7.2 canais',q:1,custo:4000,obra:'o4',forn:'f6'},
  {id:'q2',sku:'TESC-CABO-SOM',nome:'Cabo de som 2x16 AWG',q:120,custo:4,obra:'o4',forn:'f6'},
  {id:'q3',sku:'KLI-CDT5650',nome:'Caixa acústica de embutir 6,5"',q:5,custo:600,obra:'o4',forn:'f6'},
  {id:'q4',sku:'TESC-SUB',nome:'Subwoofer 10 polegadas',q:1,custo:1800,obra:'o4',forn:'f6'},
  {id:'q5',sku:'TESC-INTERRUPTOR',nome:'Interruptor inteligente 4 teclas',q:3,custo:350,obra:'o4',forn:'f6'},
  {id:'q6',sku:'STH-FITA24',nome:'Stella Fita LED 24V 3000K 10W/m',q:8,custo:62,obra:'o2',forn:'f1'},
  {id:'q7',sku:'STH-PERFIL',nome:'Stella Perfil de embutir com difusor',q:8,custo:48,obra:'o2',forn:'f1'},
  {id:'q8',sku:'STH-DRIVER',nome:'Stella Fonte para LED 24V 150W',q:1,custo:210,obra:'o2',forn:'f1'},
  {id:'q9',sku:'STH-SPOT7',nome:'Stella Spot de embutir recuado 7W',q:8,custo:118,obra:'o2',forn:'f1'},
  {id:'q10',sku:'UBI-U7OUT',nome:'Access point externo Wi-Fi 7',q:2,custo:1690,obra:'o3',forn:'f3'},
  {id:'q11',sku:'CAB-CAT6',nome:'Cabo de rede CAT6',q:305,custo:4.2,obra:'o3',forn:'f3'},
  {id:'q12',sku:'SOM-GLYDEA',nome:'Motor de cortina Glydea',q:4,custo:900,obra:'o3',forn:null},
  {id:'q13',sku:'ELG-A02V8',nome:'Suporte articulado para TV 75"',q:1,custo:780,obra:'o1',forn:null}],
 ped:[
  {n:106,data:'2026-08-20',forn:'f5',prazo:7,status:'Encerrado',itens:[{sku:'INT-NVD1408',nome:'Gravador NVR 8 canais',obra:'o5',q:2,rec:1,custo:1290}],receb:[{data:'2026-08-28',nf:'88412',dep:'d1',qt:1}],motivo:'Obra entregue com um gravador só.'},
  {n:107,data:'2026-09-02',forn:'f2',prazo:15,status:'Cancelado',itens:[{sku:'SON-ERA300',nome:'Caixa Sonos Era 300',obra:'o4',q:2,rec:0,custo:3290}],receb:[],motivo:'Obra pausada pelo cliente.'},
  {n:108,data:'2026-09-08',forn:'f4',prazo:10,status:'Recebido',itens:[{sku:'C4-CORE5',nome:'Controlador de automação CORE 5',obra:'o1',q:1,rec:1,custo:11800}],receb:[{data:'2026-09-17',nf:'31877',dep:'d1',qt:1}]},
  {n:109,data:'2026-09-09',forn:'f2',prazo:12,status:'Recebido em parte',itens:[{sku:'SON-AMP',nome:'Amplificador de streaming Amp',obra:'o1',q:6,rec:6,custo:4290},{sku:'SON-ARCU',nome:'Soundbar Arc Ultra',obra:'o1',q:2,rec:0,custo:8615}],receb:[{data:'2026-09-20',nf:'55120',dep:'d1',qt:6}]},
  {n:110,data:'2026-09-12',forn:'f3',prazo:10,status:'Confirmado',itens:[{sku:'UBI-U7PRO',nome:'Access point Wi-Fi 7 de teto U7-Pro',obra:'o2',q:8,rec:0,custo:1590},{sku:'UBI-U7OUT',nome:'Access point externo Wi-Fi 7',obra:'o2',q:2,rec:0,custo:1690},{sku:'UBI-USW16',nome:'Switch PoE 16 portas',obra:'o2',q:1,rec:0,custo:1936.27}],receb:[]},
  {n:111,data:'2026-09-14',forn:'f5',prazo:5,status:'Recebido',itens:[{sku:'INT-VIP3230B',nome:'Câmera IP bullet 2 MP',obra:'o1',q:6,rec:6,custo:420}],receb:[{data:'2026-09-19',nf:'90233',dep:'d1',qt:6}]},
  {n:112,data:'2026-09-10',forn:'f1',prazo:8,status:'Recebido',itens:[{sku:'STH-FITA24',nome:'Stella Fita LED 24V 3000K 10W/m',obra:'o1',q:300,rec:300,custo:62},{sku:'STH-PERFIL',nome:'Stella Perfil de embutir com difusor',obra:'o1',q:200,rec:200,custo:48},{sku:'STH-DRIVER',nome:'Stella Fonte para LED 24V 150W',obra:'o1',q:20,rec:20,custo:210},{sku:'STH-SPOT7',nome:'Stella Spot de embutir recuado 7W',obra:'o1',q:49,rec:49,custo:118},{sku:'STH-CONEC',nome:'Conector de emenda para fita',obra:'o1',q:10,rec:10,custo:3.23}],receb:[{data:'2026-09-18',nf:'20981',dep:'d1',qt:579}]},
  {n:113,data:'2026-09-29',forn:'f1',prazo:8,status:'Enviado',itens:[{sku:'STH-SPOT7',nome:'Stella Spot de embutir recuado 7W',obra:'o2',q:12,rec:0,custo:118},{sku:'STH-DRIVER',nome:'Stella Fonte para LED 24V 150W',obra:'o2',q:2,rec:0,custo:210}],receb:[]},
  {n:114,data:'2026-10-01',forn:'f6',prazo:10,status:'Rascunho',itens:[{sku:'TESC-RACK',nome:'Rack de parede 12U',obra:'o4',q:1,rec:0,custo:1450}],receb:[]}],
 orc:{}
});
const nid=p=>p+(++G.seq);
const conta=id=>G.contas.find(c=>c.id===id)||G.contas[0];
const depNome=id=>(G.deps.find(d=>d.id===id)||{}).nome||'—';
const prodBy=sku=>G.prod.find(p=>p.sku===sku);
const fis=p=>sum(Object.values(p.dep),x=>x);
const resv=p=>sum(p.res,r=>r.q);
const disp=p=>Math.max(0,fis(p)-resv(p));

/* =====================================================================
   FINANCEIRO · regras dos títulos
   ===================================================================== */
const isOpen=t=>t.status==='open'||t.status==='pending';
const resta=t=>Math.max(0,r2(t.valor-t.pago));
const grupo=t=>!isOpen(t)?3:t.venc<HOJE?0:t.venc===HOJE?1:2;
const abertos=tipo=>G.tit.filter(t=>t.tipo===tipo&&t.status==='open');
function statusTxt(t){
  if(t.status==='paid')return t.baixa?'baixa em '+d2(t.baixa):'quitado';
  if(t.status==='canceled')return (t.tipo==='rec'?'distrato em ':t.recusado?'recusado em ':'cancelado em ')+d2(t.baixa);
  if(t.status==='replaced')return 'renegociado em '+d2(t.baixa);
  if(t.status==='pending')return 'vence '+d2(t.venc)+' · trava na aprovação';
  const n=dias(t.venc,HOJE);
  if(n>0)return 'venceu '+d2(t.venc)+' · há '+n+(n>1?' dias':' dia');
  if(n===0)return 'vence hoje';
  return 'vence '+d2(t.venc)+' · em '+(-n)+(-n>1?' dias':' dia');
}
function sinais(t){const s=[];
  if(t.status==='pending')s.push(U.chip('Aguarda aprovação','w'));
  if(t.tipo==='rec'&&!t.obra&&isOpen(t))s.push(U.chip('Sem obra','n'));
  if(t.tipo==='rec'&&t.semEmail&&isOpen(t))s.push(U.chip('Contato sem e-mail para o aviso','w'));
  if(t.aviso&&t.avisoOld&&isOpen(t))s.push(U.chip('Aviso desatualizado','w'));
  if(t.nf)s.push(U.chip('NF '+t.nf.numero,'g'));
  return s.length?`<div class="gs-sig">${s.join('')}</div>`:''}
const descCell=t=>{const sub=[t.contato,obraNome(t.obra),t.parc?'parcela '+t.parc:''].filter(Boolean).join(' · ');return `<div class="gs-d"><b title="${esc(t.desc)}">${esc(t.desc)}</b><span class="gs-sub" title="${esc(sub)}">${esc(sub)}</span>${sinais(t)}</div>`};
const valCell=t=>`<div class="gs-d" style="align-items:flex-end"><b class="num">${brl(t.valor)}</b>${isOpen(t)&&t.pago>0?`<span class="gs-sub">resta ${brl(resta(t))}</span>`:''}</div>`;
const vencCell=t=>{const g=grupo(t),tone=g===0&&t.status==='open'?'neg':g===1?'warn':'';return `<div class="gs-d"><span class="num">${d3(t.venc)}</span><span class="gs-sub ${tone}">${statusTxt(t)}</span></div>`};
function actCell(t){
  const a=`data-id="${t.id}"`, wid=h=>h.replace('class="btn','class="gs-wid btn');
  let main='<span></span>', sec='<span class="gs-wid"></span>';
  if(t.status==='pending')main=U.btn('Aprovar',{sm:true,act:'aprovar',w:'184px',attrs:a});
  else if(t.status==='open')main=U.btn(t.tipo==='rec'?'Registrar recebimento':'Registrar pagamento',{sm:true,act:'baixa',w:'184px',attrs:a});
  if(isOpen(t))sec=wid(t.tipo==='rec'?(t.aviso?U.btn('Copiar link',{sm:true,icon:'copiar',act:'copiar',w:'184px',attrs:a}):U.btn('Gerar aviso',{sm:true,icon:'enviar',act:'aviso',w:'184px',attrs:a}))
    :U.btn(t.nf?'NF '+t.nf.numero:'Registrar NF',{sm:true,icon:'doc',act:'nf',w:'184px',attrs:a}));
  return `<div class="gs-acts">${main}${sec}${U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Mais ações',act:'mais',attrs:a})}</div>`}

/* ---------- gráfico de barras (resultado do mês) + linha (saldo projetado); mês negativo em vermelho ---------- */
/* gráfico de barras (resultado do mês) + linha (saldo projetado); mês negativo em vermelho.
   Mede o contêiner (largura e altura), redesenha no resize (ResizeObserver) e pula rótulos quando falta espaço. */
const CHS={};let chN=0;
function barras({labels,net,saldo,aria='Resultado mensal projetado e saldo'}){const id='gsc'+(++chN);CHS[id]={labels,net,saldo};
  return `<div class="gs-chart" data-ch="${id}" role="img" aria-label="${esc(aria)}"></div>`}
function desenhaGraf(el,{labels,net,saldo}){
  const w=Math.round(el.clientWidth),h=Math.round(el.clientHeight);if(w<40||h<40||el._wh===w+'x'+h)return;el._wh=w+'x'+h;
  const all=[...net,...(saldo||[]),0],nt=h<300?4:5;
  const nice=r=>{const p=10**Math.floor(Math.log10(r||1)),m=r/p;return (m<=1?1:m<=2?2:m<=2.5?2.5:m<=5?5:10)*p};
  const st=nice((Math.max(...all)-Math.min(...all))/nt),lo=Math.floor(Math.min(...all)/st)*st,hi=Math.ceil(Math.max(...all)/st)*st;
  const k=v=>{if(Math.abs(v)<1e-6)return '0';const a=Math.abs(v),sg=v<0?'−':'';return sg+(a>=1e6?(a/1e6).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mi':a>=1000?Math.round(a/1000)+' mil':String(Math.round(a)))};
  const ticks=[];for(let v=lo;v<=hi+st/2;v+=st)ticks.push(v);
  const pl=Math.max(...ticks.map(t=>k(t).length))*7+16,pr=8,pt=12,pb=32,n=labels.length;
  const Y=v=>pt+(hi-v)/(hi-lo)*(h-pt-pb),bw=(w-pl-pr)/n,X=i=>pl+bw*i+bw/2,bwid=Math.max(6,Math.min(48,bw*.45)),pulo=Math.max(1,Math.ceil(40/bw)),f=x=>x.toFixed(1);
  const grid=ticks.map(v=>`<line x1="${pl}" x2="${w-pr}" y1="${f(Y(v))}" y2="${f(Y(v))}" style="stroke:var(--line)"/><text x="${pl-10}" y="${f(Y(v)+4)}" font-size="12" text-anchor="end" style="fill:var(--faint)">${k(v)}</text>`).join('');
  const zero=`<line x1="${pl}" x2="${w-pr}" y1="${f(Y(0))}" y2="${f(Y(0))}" style="stroke:var(--faint);stroke-opacity:.5"/>`;
  const bars=net.map((v,i)=>`<rect x="${f(X(i)-bwid/2)}" y="${f(Math.min(Y(v),Y(0)))}" width="${f(bwid)}" height="${f(Math.max(2,Math.abs(Y(v)-Y(0))))}" rx="4" style="fill:rgb(var(--${v<0?'neg':'pos'}));fill-opacity:.85"><title>${labels[i]}: ${brl(v)}</title></rect>`).join('');
  const line=saldo?`<path class="${el._n?'':'draw'}" d="${saldo.map((v,i)=>`${i?'L':'M'}${f(X(i))},${f(Y(v))}`).join(' ')}" fill="none" style="stroke:rgb(var(--primary))" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`+
    saldo.map((v,i)=>`<circle cx="${f(X(i))}" cy="${f(Y(v))}" r="${bw<24?3:4}" style="fill:var(--panel);stroke:rgb(var(--${v<0?'neg':'primary'}))" stroke-width="2"><title>Saldo projetado em ${labels[i]}: ${brl(v)}</title></circle>`).join(''):'';
  const lab=labels.map((m,i)=>i%pulo?'':`<text x="${f(X(i))}" y="${h-8}" font-size="12" text-anchor="middle" style="fill:${net[i]<0?'rgb(var(--neg))':'var(--faint)'};font-weight:${net[i]<0?700:500}">${m}</text>`).join('');
  el._n=1;el.innerHTML=`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">${grid}${zero}${bars}${line}${lab}</svg>`}
function graficos(root){$$('.gs-chart[data-ch]',root).forEach(el=>{const c=CHS[el.dataset.ch];if(!c||el._ro)return;delete CHS[el.dataset.ch];
  desenhaGraf(el,c);if(window.ResizeObserver){el._ro=new ResizeObserver(()=>desenhaGraf(el,c));el._ro.observe(el)}})}
const legenda=items=>`<div class="row" style="gap:16px">${items.map(([c,l])=>`<span class="row lbl" style="gap:8px"><span class="dot" style="background:${c}"></span>${l}</span>`).join('')}</div>`;
function previsao(){
  const fim=addDias(HOJE,29), ent=sum(abertos('rec').filter(t=>t.venc<=fim),resta), sai=sum(G.tit.filter(t=>t.tipo==='pag'&&isOpen(t)&&t.venc<=fim),resta);
  const labels=['out','nov','dez','jan','fev','mar'], E=[ent,180400,95200,150300,175800,160100], S=[sai,140200,168400,130500,128300,135600];
  const net=E.map((e,i)=>r2(e-S[i])), saldo=[]; let s=sum(G.contas,c=>c.saldo); net.forEach(n=>{s+=n;saldo.push(r2(s))});
  return {labels,E,S,net,saldo,ent,sai};
}

/* ---------- modais do Financeiro ---------- */
function novoTitulo(tipo,after,pre={}){
  const rec=tipo==='rec';
  const pessoas=rec?D.contatos.map(c=>c.nome):D.fornecedores.map(f=>f.nome).concat(['Imobiliária Savassi','Contabilidade Prado','Equipe']);
  const {el}=M.modal({title:rec?'Novo título a receber':'Nova conta a pagar',sub:rec?'Uma cobrança para um cliente, à vista ou parcelada.':'Uma conta da empresa, à vista ou parcelada.',ok:rec?'Criar título':'Criar conta a pagar',
    fields:[
      {k:'desc',label:'Descrição',req:true,span:12,value:pre.desc||'',ph:rec?'Ex.: Automação · Parcela':'Ex.: Compra de materiais'},
      {k:'valor',label:'Valor',type:'money',req:true,span:4,value:pre.valor?fmtIn(pre.valor):''},
      {k:'emissao',label:rec?'Data de emissão':'Data da compra',type:'date',span:4,value:pre.data||HOJE},
      {k:'venc',label:'Vencimento',type:'date',req:true,span:4,value:pre.venc||addDias(HOJE,30)},
      {k:'contato',label:rec?'Cliente':'Fornecedor',type:'select',span:6,opts:pessoas,ph:'Escolher…',value:pre.contato||''},
      {k:'obra',label:'Obra',type:'select',span:6,opts:D.obras.map(o=>[o.id,o.nome]),ph:'Sem obra',value:''},
      {k:'comp',label:'Competência',span:4,ph:'mm/aaaa',value:'10/2026'},
      {k:'plano',label:'Conta do plano',type:'select',req:true,span:4,opts:rec?PLANO_REC:PLANO_PAG,ph:'Escolher…',value:pre.plano||''},
      {k:'conta',label:'Conta prevista',type:'select',span:4,opts:G.contas.map(c=>[c.id,c.nome]),value:pre.conta||'itau'},
      {k:'parc',label:'Parcelas',type:'number',span:4,value:'1',help:'Uma por mês, a partir do vencimento.'}],
    body:`<div class="in gs-liq"><span class="lbl">Prévia</span><b class="num" id="gs-prev" style="font-size:15px"></b></div>`,
    onOk:v=>{const val=num(v.valor),n=Math.max(1,Math.min(60,parseInt(v.parc,10)||1));
      if(val<=0){M.toast('Informe um valor maior que zero.');return false}
      const base=Math.floor(val*100/n)/100, out=[];
      for(let i=0;i<n;i++){const t=T(nid('t'),tipo,v.desc,v.contato||(rec?'Cliente sem cadastro':'Fornecedor sem cadastro'),v.obra,n>1?`${i+1}/${n}`:'',i===n-1?r2(val-base*(n-1)):base,addMeses(v.venc,i),{emissao:v.emissao||HOJE,plano:v.plano,conta:v.conta});
        G.tit.push(t);out.push(t)}
      after&&after(out)}});
  const prev=()=>{const val=num($('[name=valor]',el).value),n=Math.max(1,parseInt($('[name=parc]',el).value,10)||1),vc=$('[name=venc]',el).value||HOJE;
    if(val<=0){$('#gs-prev',el).textContent='Informe o valor para ver as parcelas.';return}
    const base=Math.floor(val*100/n)/100;
    $('#gs-prev',el).textContent=n===1?`1 parcela · ${brl(val)} · vence ${d3(vc)}`:`${n} parcelas · ${brl(base)} cada · 1ª em ${d3(vc)}, última em ${d3(addMeses(vc,n-1))}`};
  $$('input',el).forEach(i=>i.addEventListener('input',prev)); prev();
}
function baixaModal(t,after){
  const rec=t.tipo==='rec';
  const {el}=M.modal({title:rec?'Registrar recebimento':'Registrar pagamento',sub:esc(`${t.desc} · ${t.contato}${t.parc?' · parcela '+t.parc:''}`),ok:rec?'Lançar recebimento':'Lançar pagamento',
    fields:[
      {k:'valor',label:'Valor',type:'money',req:true,span:4,value:fmtIn(resta(t)),help:'Menor que o total vira baixa parcial.'},
      {k:'data',label:'Data de caixa',type:'date',req:true,span:4,value:HOJE},
      {k:'conta',label:'Conta bancária',type:'select',req:true,span:4,opts:G.contas.map(c=>[c.id,c.nome]),value:t.conta||'itau'},
      {k:'plano',label:'Conta do plano',type:'select',req:true,span:12,opts:rec?PLANO_REC:PLANO_PAG,value:t.plano},
      {k:'juros',label:'Juros',type:'money',span:3},{k:'multa',label:'Multa',type:'money',span:3},
      {k:'desc',label:'Desconto',type:'money',span:3},{k:'tarifa',label:'Tarifa',type:'money',span:3},
      {k:'obs',label:'Observação',type:'textarea',span:12,ph:'Opcional'}],
    body:`<div class="in gs-liq"><span class="lbl">${rec?'Líquido creditado em conta':'Total debitado da conta'}</span><b class="num" id="gs-liq"></b></div>`,
    onOk:v=>{const val=num(v.valor);
      if(val<=0){M.toast('Informe um valor maior que zero.');return false}
      if(val>resta(t)+.001){M.toast(`O valor passa do que resta (${brl(resta(t))}).`);return false}
      const liq=calc();
      t.pago=r2(t.pago+val);t.plano=v.plano;t.conta=v.conta;
      if(t.pago>=t.valor-.005){t.status='paid';t.baixa=v.data}
      conta(v.conta).saldo=r2(conta(v.conta).saldo+(rec?liq:-liq));
      G.mov.unshift({data:v.data,desc:(rec?'Recebimento · ':'Pagamento · ')+t.contato,conta:v.conta,valor:rec?liq:-liq});
      M.toast(t.status==='paid'?`${rec?'Recebimento':'Pagamento'} lançado. O título foi para ${rec?'Concluídos e encerrados':'Pagos e encerrados'}.`:`Baixa parcial lançada. Resta ${brl(resta(t))}.`);
      after&&after()}});
  const calc=()=>{const f=k=>num($(`[name=${k}]`,el).value);const base=f('valor')+f('juros')+f('multa')-f('desc');return r2(rec?base-f('tarifa'):base+f('tarifa'))};
  const upd=()=>{$('#gs-liq',el).textContent=brl(calc())};
  $$('input',el).forEach(i=>i.addEventListener('input',upd)); upd();
}
function nfModal(t,after){
  M.modal({title:'Registrar NF',sub:esc(t.desc+' · '+t.contato),width:'560px',ok:'Salvar NF',
    fields:[{k:'numero',label:'Número',req:true,span:6,value:t.nf?t.nf.numero:''},{k:'data',label:'Data de emissão',type:'date',req:true,span:6,value:t.nf?t.nf.data:HOJE},
      {k:'valor',label:'Valor',type:'money',req:true,span:12,value:fmtIn(t.nf?t.nf.valor:t.valor)}],
    onOk:v=>{t.nf={numero:v.numero,data:v.data,valor:num(v.valor)};M.toast('NF '+v.numero+' registrada no título.');after&&after()}});
}
function editarModal(t,after){
  const rec=t.tipo==='rec';
  M.modal({title:'Editar título',sub:esc(t.contato),ok:'Salvar',
    fields:[{k:'desc',label:'Descrição',req:true,span:12,value:t.desc},{k:'valor',label:'Valor',type:'money',req:true,span:4,value:fmtIn(t.valor)},
      {k:'venc',label:'Vencimento',type:'date',req:true,span:4,value:t.venc},{k:'plano',label:'Conta do plano',type:'select',req:true,span:4,opts:rec?PLANO_REC:PLANO_PAG,value:t.plano},
      {k:'obra',label:'Obra',type:'select',span:6,opts:D.obras.map(o=>[o.id,o.nome]),ph:'Sem obra',value:t.obra||''},
      {k:'conta',label:'Conta prevista',type:'select',span:6,opts:G.contas.map(c=>[c.id,c.nome]),value:t.conta}],
    onOk:v=>{const val=num(v.valor);if(val<t.pago){M.toast('O valor não pode ficar abaixo do que já foi baixado.');return false}
      Object.assign(t,{desc:v.desc,valor:val,venc:v.venc,plano:v.plano,obra:v.obra,conta:v.conta});
      if(t.aviso)t.avisoOld=true;
      M.toast(t.aviso?'Título salvo. O aviso enviado ficou desatualizado: regere o link.':'Título salvo.');after&&after()}});
}
function transferModal(after,de){
  M.modal({title:'Transferir entre contas',width:'640px',ok:'Transferir',
    fields:[{k:'de',label:'De',type:'select',req:true,span:6,opts:G.contas.map(c=>[c.id,`${c.nome} · ${brl(c.saldo)}`]),value:de||'itau'},
      {k:'para',label:'Para',type:'select',req:true,span:6,opts:G.contas.map(c=>[c.id,c.nome]),value:de==='cofre'?'itau':'cofre'},
      {k:'valor',label:'Valor',type:'money',req:true,span:6},{k:'data',label:'Data',type:'date',req:true,span:6,value:HOJE},
      {k:'obs',label:'Observação',type:'textarea',span:12,ph:'Opcional'}],
    onOk:v=>{const val=num(v.valor);
      if(v.de===v.para){M.toast('Escolha contas diferentes.');return false}
      if(val<=0){M.toast('Informe um valor maior que zero.');return false}
      conta(v.de).saldo=r2(conta(v.de).saldo-val);conta(v.para).saldo=r2(conta(v.para).saldo+val);
      G.mov.unshift({data:v.data,desc:`Transferência · ${conta(v.de).nome} → ${conta(v.para).nome}`,conta:v.de,valor:val,tr:true});
      M.toast(`${brl(val)} transferidos de ${conta(v.de).nome} para ${conta(v.para).nome}.`);after&&after()}});
}
function faturaModal(after){
  const c=G.cartao,total=r2(sum(c.compras,x=>x[2])-c.pago);
  if(total<=0){M.toast('A fatura de '+c.ref+' já está paga.');return}
  const {el}=M.modal({title:'Fatura do cartão',sub:esc(`${c.nome} · fora do consolidado`),width:'640px',ok:'Pagar '+brl(total),
    body:`<div class="gs-mtbl gs-fat"><table class="tbl"><thead><tr><th>Fatura ${esc(c.ref)} · fecha ${d2(c.fecha)} · vence ${d2(c.vence)}</th><th class="r">Valor</th></tr></thead><tbody>
      ${c.compras.map(x=>`<tr><td><span class="num soft">${x[0]}</span>&nbsp; ${esc(x[1])}</td><td class="r num">${brl(x[2])}</td></tr>`).join('')}
      ${c.pago?`<tr><td class="soft">Já pago</td><td class="r num pos">− ${brl(c.pago)}</td></tr>`:''}
      <tr><td><b>Total</b></td><td class="r num"><b>${brl(total)}</b></td></tr></tbody></table></div>`,
    fields:[{k:'agora',label:'A pagar agora',type:'money',req:true,span:4,value:fmtIn(total)},
      {k:'conta',label:'Pagar da conta',type:'select',req:true,span:4,opts:G.contas.map(x=>[x.id,x.nome]),value:'itau'},
      {k:'data',label:'Data',type:'date',req:true,span:4,value:HOJE}],
    onOk:v=>{const val=num(v.agora);if(val<=0||val>total+.001){M.toast(`Informe um valor entre R$ 0,01 e ${brl(total)}.`);return false}
      c.pago=r2(c.pago+val);conta(v.conta).saldo=r2(conta(v.conta).saldo-val);
      G.mov.unshift({data:v.data,desc:'Pagamento da fatura · '+c.nome,conta:v.conta,valor:-val});
      M.toast(`Fatura paga: ${brl(val)} da conta ${conta(v.conta).nome}.`);after&&after()}});
  const ok=$('[data-ok]',el);$('[name=agora]',el).addEventListener('input',e=>{ok.textContent='Pagar '+brl(num(e.target.value))});
}
function contaSheet(c,after){
  const ms=G.mov.filter(m=>m.conta===c.id).slice(0,8);
  let s;s=M.sheet({kick:c.tipo,title:c.nome,sub:'Saldo de hoje: <b class="num" style="color:var(--text)">'+brl(c.saldo)+'</b>',
    body:`<div class="sec"><h3>Últimas movimentações</h3>${ms.length?ms.map(movLi).join(''):U.empty({title:'Nenhuma movimentação recente.'})}</div>`,
    foot:[{label:'Transferir desta conta',act:'tr',pri:true}],on:{tr:()=>{s.close();transferModal(after,c.id)}}});
}
const movLi=m=>`<div class="gs-li"><span class="gs-sign ${m.tr?'':m.valor<0?'neg':'pos'}" aria-label="${m.tr?'Transferência':m.valor<0?'Saída':'Entrada'}">${m.tr?'⇄':m.valor<0?'−':'+'}</span>
  <span class="gs-grow"><span title="${esc(m.desc)}">${esc(m.desc)}</span><span class="lbl" style="font-size:12px">${d2(m.data)} · ${esc(conta(m.conta).nome)}</span></span>
  <b class="num ${m.tr?'':m.valor<0?'':'pos'}">${brl(Math.abs(m.valor))}</b></div>`;
function tituloSheet(t,after){
  const rec=t.tipo==='rec', kv=(k,v)=>`<div class="kv"><span>${k}</span><b class="num">${v}</b></div>`;
  let s;s=M.sheet({kick:rec?'A receber':'A pagar',title:t.desc,sub:esc([t.contato,obraNome(t.obra),t.parc?'parcela '+t.parc:''].filter(Boolean).join(' · ')),
    chips:U.chip(statusTxt(t),grupo(t)===0&&t.status==='open'?'r':t.status==='paid'?'g':t.status==='pending'?'w':'n'),
    body:`<div class="sec"><h3>Valores</h3>${kv('Valor',brl(t.valor))}${kv(rec?'Recebido':'Pago',brl(t.pago))}${kv('Resta',brl(isOpen(t)?resta(t):0))}</div>
      <div class="sec"><h3>Datas e contas</h3>${kv('Emissão',d3(t.emissao))}${kv('Vencimento',d3(t.venc))}${t.baixa?kv(t.status==='paid'?'Baixa':'Encerrado em',d3(t.baixa)):''}${kv('Conta do plano',esc(t.plano))}${kv('Conta prevista',esc(conta(t.conta).nome))}</div>
      <div class="sec"><h3>Documentos</h3>${kv('Nota fiscal',t.nf?'NF '+esc(t.nf.numero)+' · '+d2(t.nf.data):'—')}${rec?kv('Aviso de cobrança',t.aviso?(t.avisoOld?'desatualizado':'gerado'):'—'):''}${t.motivo?kv('Motivo',esc(t.motivo)):''}</div>`,
    foot:t.status==='open'?[{label:rec?'Registrar recebimento':'Registrar pagamento',act:'bx',pri:true}]:t.status==='pending'?[{label:'Aprovar',act:'ap',pri:true}]:[],
    on:{bx:()=>{s.close();baixaModal(t,after)},ap:()=>{s.close();aprovar(t,after)}}});
}
function aprovar(t,after){t.status='open';M.toast(`Pagamento aprovado: ${t.desc} entrou em A pagar.`);after&&after()}
function recusar(t,after){M.confirm({title:'Recusar pagamento?',text:`${t.desc} · ${brl(t.valor)}. O solicitante vê o motivo.`,ok:'Recusar',danger:true,field:'Motivo',
  run:v=>{t.status='canceled';t.recusado=true;t.baixa=HOJE;t.motivo=v.motivo;M.toast('Pagamento recusado.');after&&after()}})}

/* =====================================================================
   FINANCEIRO · tela principal
   ===================================================================== */
let finTab=0;
const FIN_HELP=['O Painel mostra o saldo das contas, o que entra, o que sai e o que espera aprovação.',
 'Em A receber e A pagar os títulos ficam agrupados por vencimento; clique na linha para ver o detalhe.',
 '“Registrar recebimento” ou “Registrar pagamento” dá a baixa: juros, multa, desconto e tarifa entram no líquido.',
 'O botão azul cria um título novo, à vista ou parcelado.'];
function painelHTML(){
  const cons=sum(G.contas,c=>c.saldo), P=previsao();
  const card=(tipo,d)=>{const L=abertos(tipo),hj=L.filter(t=>t.venc===HOJE),at=L.filter(t=>t.venc<HOJE),rec=tipo==='rec';
    return `<section class="card s4 rv" style="--d:${d}"><div class="ch"><span class="lbl" style="flex:1">${rec?'A receber':'A pagar'}</span>${U.btn('',{icon:'seta',sm:true,ghost:true,title:rec?'Abrir A receber':'Abrir A pagar',act:rec?'irRec':'irPag'})}</div>
      <div class="big num mt8">${brl(sum(L,resta))}</div><div class="lbl mt8">${L.length} títulos em aberto</div>
      <div class="kv mt16"><span>${hj.length} ${rec?(hj.length===1?'cobrança vence':'cobranças vencem'):(hj.length===1?'conta vence':'contas vencem')} hoje</span><b class="num ${hj.length?'warn':''}">${brl(sum(hj,resta))}</b></div>
      <div class="kv"><span>${at.length} em atraso</span><b class="num ${at.length?'neg':''}">${brl(sum(at,resta))}</b></div></section>`};
  const pend=G.tit.filter(t=>t.status==='pending');
  const dev=Object.values(abertos('rec').filter(t=>t.venc<HOJE).reduce((a,t)=>{(a[t.contato]=a[t.contato]||{n:t.contato,v:0,c:0,d:0});a[t.contato].v+=resta(t);a[t.contato].c++;a[t.contato].d=Math.max(a[t.contato].d,dias(t.venc,HOJE));return a},{})).sort((a,b)=>b.v-a.v).slice(0,4);
  const atr=abertos('pag').filter(t=>t.venc<HOJE).sort((a,b)=>resta(b)-resta(a)).slice(0,4);
  const negMes=P.labels.filter((_,i)=>P.net[i]<0);
  const atalhos=[['Resultado','resultado'],['Previsto x Realizado','orcamento'],['Contratos','contratos'],['Despesas fixas','despesas'],['Conciliar extrato','conciliar'],
    ['A receber','irRec'],['A pagar','irPag'],['Transferir entre contas','transferir'],['Fatura do cartão','fatura'],['Ajustes','ajustes']];
  return `<div class="grid gs-pgrid">
   <section class="card s4 rv" style="--d:2"><div class="ch"><span class="lbl" style="flex:1">Saldo em contas</span>${U.btn('',{icon:'olho',sm:true,ghost:true,title:G.oculto?'Mostrar saldo':'Ocultar saldo',act:'olho'})}</div>
     <div class="big num mt8">${G.oculto?'R$ ••••••':brl(cons)}</div><div class="lbl mt8">${G.contas.length} contas no consolidado · cartão fora</div>
     ${G.contas.some(c=>c.saldo<0)?`<div class="lbl mt8 neg">Uma conta está negativa.</div>`:''}
     <div class="btnrow mt16">${U.btn(G.contas.length+' contas ▾',{sm:true,act:'contas'})}${U.btn('Transferir',{sm:true,icon:'trocar',act:'transferir'})}</div></section>
   ${card('rec',3)}${card('pag',4)}
   <section class="card s8 rv gs-gc" style="--d:5"><div class="ch"><h2>Previsão</h2><span class="spacer"></span>${legenda([['rgb(var(--pos))','Resultado do mês'],['rgb(var(--neg))','Mês negativo'],['rgb(var(--primary))','Saldo projetado']])}</div>
     <p class="gs-note">Nos próximos 30 dias entram <b class="num">${brl(P.ent)}</b> e saem <b class="num">${brl(P.sai)}</b>.${negMes.length?` ${negMes.map(m=>m==='dez'?'Dezembro':m).join(', ')} fecha negativo: vale antecipar cobranças ou segurar compras.`:''}</p>
     ${barras({labels:P.labels,net:P.net,saldo:P.saldo})}</section>
   <section class="card s4 rv" style="--d:6"><div class="ch"><h2>Aguardando aprovação</h2><span class="spacer"></span>${U.chip(String(pend.length),pend.length?'w':'n')}</div>
     <div class="lbl">${pend.length} pagamento${pend.length===1?'':'s'} · ${brl(sum(pend,t=>t.valor))}</div>
     <div class="stack mt16" style="gap:12px">${pend.map(t=>`<div class="in" style="border-radius:14px;padding:16px">
       <div class="row" style="flex-wrap:nowrap"><b style="flex:1;font-weight:600;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${esc(t.desc)}">${esc(t.desc)}</b><b class="num">${brl(t.valor)}</b></div>
       <div class="lbl mt8">Solicitado por ${esc(t.solic||t.contato)} · vence ${d2(t.venc)}</div>
       <div class="btnrow mt16">${U.btn('Recusar',{sm:true,act:'recusar',attrs:`data-id="${t.id}"`})}${U.btn('Aprovar',{sm:true,act:'aprovar',attrs:`data-id="${t.id}"`})}</div></div>`).join('')||U.empty({title:'Nada aguardando aprovação.',text:'Os pagamentos que pedem aprovação aparecem aqui.'})}</div>
     ${pend.length?`<div class="btnrow mt16">${U.btn('Ver e aprovar',{sm:true,ghost:true,act:'irPag'})}</div>`:''}</section>
   <section class="card s4 rv" style="--d:7"><div class="ch gs-ch"><h2 title="Maiores devedores">Maiores devedores</h2>${U.btn('',{icon:'seta',sm:true,ghost:true,title:'Ver todos em A receber',act:'irRec'})}</div>
     <div class="mt8">${dev.map(x=>`<div class="gs-li">${U.av(x.n)}<span class="gs-grow"><span style="font-weight:600" title="${esc(x.n)}">${esc(x.n)}</span><span class="lbl" style="font-size:12px">${x.c} título${x.c>1?'s':''} · há ${x.d} dias</span></span><b class="num neg">${brl(x.v)}</b></div>`).join('')||U.empty({title:'Ninguém em atraso.'})}</div></section>
   <section class="card s4 rv" style="--d:8"><div class="ch gs-ch"><h2 title="Maiores atrasos a pagar">Maiores atrasos a pagar</h2>${U.btn('',{icon:'seta',sm:true,ghost:true,title:'Ver todos em A pagar',act:'irPag'})}</div>
     <div class="mt8">${atr.map(t=>`<div class="gs-li"><span class="gs-grow"><span style="font-weight:600" title="${esc(t.contato)}">${esc(t.contato)}</span><span class="lbl" style="font-size:12px" title="${esc(t.desc)} · há ${dias(t.venc,HOJE)} dias">${esc(t.desc)} · há ${dias(t.venc,HOJE)} dias</span></span><b class="num neg">${brl(resta(t))}</b></div>`).join('')||U.empty({title:'Nada em atraso.'})}</div></section>
   <section class="card s4 rv gs-mov" style="--d:9"><div class="ch"><h2>Últimas movimentações</h2></div><div class="mt8">${G.mov.slice(0,5).map(movLi).join('')}</div></section>
   <section class="s12 rv gs-atw" style="--d:10"><div class="lbl" style="margin-bottom:12px">Atalhos</div>
     <div class="gs-atal">${atalhos.map(a=>U.btn(a[0],{ctl:true,act:a[1],w:'100%'})).join('')}</div></section>
  </div>`}
function listaHTML(tipo,q){
  const rec=tipo==='rec', ql=(q||'').toLowerCase();
  const L=G.tit.filter(t=>t.tipo===tipo&&(!ql||(t.desc+' '+t.contato+' '+obraNome(t.obra)).toLowerCase().includes(ql))).sort((a,b)=>a.venc<b.venc?-1:1);
  const nomes=['Vencidos','Vence hoje','A vencer',rec?'Concluídos e encerrados':'Pagos e encerrados'];
  const gs=nomes.map((n,i)=>{const rows=L.filter(t=>grupo(t)===i);if(i===3)rows.reverse();return {title:n,rows,total:i===3?sum(rows,t=>t.pago):sum(rows,resta)}}).filter(g=>g.rows.length);
  const rows=gs.flatMap(g=>g.rows); listaHTML.rows=rows;
  return TB({rows,groups:gs,rowAct:'tit',
    cols:[{h:'Descrição',html:descCell},{h:'Valor',r:true,w:'160px',html:valCell},{h:'Vencimento',w:'200px',html:vencCell},{h:'',w:'var(--gs-actw)',r:true,html:actCell}],
    empty:ql?{title:'Nada encontrado.',text:'Tente outra palavra: descrição, contato ou obra.'}:{title:rec?'Nenhum título a receber.':'Nenhuma conta a pagar.',text:'Crie o primeiro pelo botão azul no topo.'}},{flex:260,aw:[420,228]})}

M.screen('financeiro',{title:'Financeiro',dock:'financeiro',help:FIN_HELP,variants:{A:{label:'Atual',
 render:()=>{const a=M.q&&M.q.get('aba');finTab=a==='receber'?1:a==='pagar'?2:0;
  return U.page({kick:'Outubro de 2026',title:'Financeiro',sub:'O dinheiro da empresa: o que tem, o que entra e o que sai.',acts:[
     {label:'Resultado',icon:'barras',act:'resultado'},{label:'Contratos',icon:'doc',act:'contratos'},{label:'Conciliar extrato',icon:'check',act:'conciliar'},
     {label:finTab===2?'Nova conta a pagar':'Novo título',icon:'mais',act:'novo',pri:true}]})+
   U.bar(U.tabs(['Painel','A receber','A pagar'],finTab,'Seções do Financeiro'),`<span id="gs-finq" class="gs-fr" ${finTab?'':'hidden'}>${U.search('Buscar descrição, contato ou obra','gs-q','320px')}</span>`)+
   `<div id="gs-fin"></div>`},
 mount:v=>{
  const corpo=$('#gs-fin',v), byId=el=>G.tit.find(t=>t.id===el.dataset.id);
  const draw=()=>{const nb=$('.head [data-act="novo"]',v);if(nb)nb.innerHTML=ic('mais')+(finTab===2?'Nova conta a pagar':'Novo título');
    $('#gs-finq',v).hidden=!finTab;
    corpo.innerHTML=finTab?listaHTML(finTab===1?'rec':'pag',$('#gs-q',v).value):painelHTML();M.wire(v,H);graficos(corpo)};
  const H={
   resultado:()=>go('#/financeiro/resultado'),contratos:()=>go('#/financeiro/contratos'),conciliar:()=>go('#/financeiro/conciliacao'),
   orcamento:()=>go('#/financeiro/orcamento'),despesas:()=>go('#/financeiro/contratos?aba=pagar'),
   ajustes:()=>M.screens.ajustes?go('#/ajustes'):M.toast('Ajustes › Financeiro: Pix, avisos por e-mail, aprovação para pagar, plano de contas e contas bancárias.'),
   novo:()=>{const tipo=finTab===2?'pag':'rec';novoTitulo(tipo,out=>{draw();M.toast(`${out.length>1?out.length+' parcelas criadas':'Título criado'} em ${tipo==='rec'?'A receber':'A pagar'}.`,finTab===(tipo==='rec'?1:2)?'':'Ver',()=>clickTab(v,tipo==='rec'?1:2))})},
   olho:()=>{G.oculto=!G.oculto;draw()},
   contas:el=>M.menu(el,[...G.contas.map(c=>({label:`${c.nome} · ${G.oculto?'R$ ••••':brl(c.saldo)}`,icon:'financeiro',run:()=>contaSheet(c,draw)})),'-',
     {label:`${G.cartao.nome} · fora do consolidado`,icon:'doc',run:()=>faturaModal(draw)}]),
   transferir:()=>transferModal(draw),fatura:()=>faturaModal(draw),
   irRec:()=>clickTab(v,1),irPag:()=>clickTab(v,2),
   aprovar:el=>aprovar(byId(el),draw),recusar:el=>recusar(byId(el),draw),
   baixa:el=>baixaModal(byId(el),draw),nf:el=>nfModal(byId(el),draw),
   aviso:el=>{const t=byId(el);t.aviso='https://maestro.app/aviso/'+Math.random().toString(36).slice(2,6).toUpperCase();t.avisoOld=false;draw();
     M.toast(t.semEmail?'Aviso gerado. O contato não tem e-mail: copie o link e envie por WhatsApp.':'Aviso gerado e enviado por e-mail ao cliente.','Copiar link',()=>copiar(t))},
   copiar:el=>copiar(byId(el)),
   mais:el=>{const t=byId(el),it=[],sb=el.closest('.gs-acts')&&$('.btn.gs-wid',el.closest('.gs-acts')),esc2=sb&&!sb.offsetParent;
     if(esc2&&isOpen(t)){if(t.tipo==='rec')it.push(t.aviso?{label:'Copiar link do aviso',icon:'copiar',run:()=>copiar(t)}:{label:'Gerar aviso',icon:'enviar',run:()=>H.aviso(sb)});
       else it.push({label:t.nf?'NF '+t.nf.numero:'Registrar NF',icon:'doc',run:()=>nfModal(t,draw)})}
     if(t.tipo==='rec'&&isOpen(t))it.push({label:t.nf?'Ver NF '+t.nf.numero:'Registrar NF',icon:'doc',run:()=>nfModal(t,draw)});
     if(isOpen(t))it.push({label:'Editar',icon:'ajustes',run:()=>editarModal(t,draw)});
     if(t.tipo==='rec'&&t.aviso&&isOpen(t))it.push({label:'Regerar aviso',icon:'trocar',run:()=>M.confirm({title:'Regerar o aviso?',text:'O link atual deixa de funcionar. O cliente precisa receber o novo.',ok:'Regerar',
       run:()=>{t.aviso='https://maestro.app/aviso/'+Math.random().toString(36).slice(2,6).toUpperCase();t.avisoOld=false;draw();M.toast('Aviso regerado. Envie o novo link ao cliente.')}})});
     if(t.status==='pending')it.push({label:'Recusar',icon:'x',danger:true,run:()=>recusar(t,draw)});
     it.push({label:'Ver detalhes',icon:'olho',run:()=>tituloSheet(t,draw)});M.menu(el,it)},
   tit:tr=>tituloSheet(listaHTML.rows[+tr.dataset.i],draw)};
  const copiar=t=>{try{navigator.clipboard&&navigator.clipboard.writeText(t.aviso)}catch(e){}M.toast('Link do aviso copiado.')};
  $('[data-tabs]',v).addEventListener('tab',e=>{finTab=e.detail;draw()});
  $('#gs-q',v).addEventListener('input',()=>finTab&&draw());
  draw();
 }}}});

/* =====================================================================
   FINANCEIRO · Resultado (DRE)
   ===================================================================== */
const DRE={comp:{rb:[182,205,240,228,251,196],cd:[84,96,110,104,118,92]},caixa:{rb:[160,190,230,240,236,214],cd:[90,88,112,98,120,96]},
  dop:[52.4,54.1,55.3,53.2,56.8,55.1],rf:[-1.2,.8,1.5,-.6,2.1,.4]};
M.screen('financeiro/resultado',{title:'Resultado',dock:'financeiro',hidden:true,
 help:['Competência mostra o resultado pelo mês em que o fato aconteceu; Caixa, pelo mês em que o dinheiro entrou ou saiu.',
  'Cada linha soma uma parte do plano de contas; as linhas em negrito são os acumulados.',
  'Fora do resultado ficam transferências e retiradas: mexem no caixa, não no lucro.',
  'O fluxo projetado usa os títulos em aberto dos próximos meses.'],
 variants:{A:{label:'Atual',
 render:()=>U.page({kick:'Financeiro',title:'Resultado (DRE)',sub:'Quanto a empresa ganhou de verdade: receita, custos e despesas, mês a mês.',acts:[voltarFin]})+
   U.bar(U.seg('gs-reg',[['comp','Competência'],['caixa','Caixa']],'comp','Regime'),`<span class="gs-fr">${U.select('Ano',['2026','2025'],'gs-ano','144px')}</span>`)+`<div id="gs-dre"></div>`,
 mount:v=>{let reg='comp';
  const draw=()=>{const f=$('#gs-ano',v).value==='2025'?.82:1,b=DRE[reg],m=['mai','jun','jul','ago','set','out'];
   const rb=b.rb.map(x=>x*1000*f),ded=rb.map(x=>-x*.09),rl=rb.map((x,i)=>x+ded[i]),cd=b.cd.map(x=>-x*1000*f),lb=rl.map((x,i)=>x+cd[i]),
     dop=DRE.dop.map(x=>-x*1000*f),ro=lb.map((x,i)=>x+dop[i]),rf=DRE.rf.map(x=>x*1000*f),res=ro.map((x,i)=>x+rf[i]);
   const L=[['Receita bruta',rb],['(−) Deduções e impostos',ded],['= Receita líquida',rl,1],['(−) Custo direto (materiais e mão de obra)',cd],['= Lucro bruto',lb,1],
     ['(−) Despesas operacionais',dop],['= Resultado operacional',ro,1],['(±) Resultado financeiro',rf],['= Resultado líquido',res,1]].map(([n,a,acc])=>({n,a,acc,t:sum(a,x=>x)}));
   const n0=x=>Math.round(x).toLocaleString('pt-BR');
   const cel=(x,acc)=>{const s=`<span class="${x<0?'neg':''}" title="${x<0?'− ':''}${brl0(Math.abs(x))}">${x<0?'− ':''}${n0(Math.abs(x))}</span>`;return acc?`<b>${s}</b>`:s};
   const P=previsao(), fora=[['Transferências entre contas',45000,'Mexe no caixa de cada conta, não no consolidado.'],['Retirada dos sócios',-30000,'Pró-labore e distribuição.'],['Compra de equipamento (ativo)',-8400,'Escada, furadeira e analisador de rede.']];
   $('#gs-dre',v).innerHTML=U.kpis([{label:'Receita líquida',value:brl0(L[2].t),sub:'mai–out'},{label:'Lucro bruto',value:brl0(L[4].t),sub:`margem ${Math.round(L[4].t/L[2].t*100)}%`},
       {label:'Resultado líquido',value:brl0(L[8].t),sub:`margem ${Math.round(L[8].t/L[2].t*100)}%`,vtone:L[8].t<0?'neg':'pos'}],3)+
    TB({title:`Resultado por ${reg==='comp'?'competência':'caixa'} · ${$('#gs-ano',v).value}`,head:'<span class="lbl">valores em R$</span>',rows:L,
     cols:[{h:'Conta',html:r=>r.acc?`<b title="${esc(r.n)}">${r.n}</b>`:`<span class="soft" title="${esc(r.n)}">${r.n}</span>`},...m.map((mm,i)=>({h:mm,r:true,w:'96px',html:r=>cel(r.a[i],r.acc)})),{h:'Acumulado',r:true,w:'120px',html:r=>cel(r.t,1)}]},{flex:280})+
    `<div class="grid mt24"><section class="card s5 rv" style="--d:4"><div class="ch"><h2>Fora do resultado</h2></div>
       <div class="mt8">${fora.map(r=>`<div class="gs-li"><span class="gs-grow"><span style="font-weight:600" title="${r[0]}">${r[0]}</span><span class="lbl" style="font-size:12px" title="${r[2]}">${r[2]}</span></span><b class="num ${r[1]<0?'neg':''}">${r[1]<0?'− ':''}${brl(Math.abs(r[1])*f)}</b></div>`).join('')}</div>
       <p class="gs-note">Mexem no caixa, não no lucro: por isso ficam fora do resultado.</p></section>
      <section class="card s7 rv gs-gc" style="--d:5"><div class="ch"><h2>Fluxo de caixa projetado</h2><span class="spacer"></span>${legenda([['rgb(var(--pos))','Resultado do mês'],['rgb(var(--primary))','Saldo projetado']])}</div>
       ${barras({labels:P.labels,net:P.net,saldo:P.saldo,aria:'Fluxo de caixa projetado: resultado do mês e saldo'})}</section></div>`;graficos(v)};
  U.bindSeg(v,'gs-reg',x=>{reg=x;draw()});$('#gs-ano',v).onchange=draw;M.wire(v,{voltar:()=>go('#/financeiro')});draw();
 }}}});

/* =====================================================================
   FINANCEIRO · Previsto x Realizado (orçamento)
   ===================================================================== */
const ORC=[['Receita de projetos','r',240000],['Receita de serviços recorrentes','r',9800],['Compra de materiais','d',98000],['Folha de pagamento','d',38400],['Aluguel','d',12060],
  ['Serviços contábeis','d',150],['Tarifas bancárias','d',300],['Combustível e deslocamento','d',2800],['Software e assinaturas','d',1490],['Marketing','d',3500]];
const orcKey=(a,m)=>a+'-'+m;
const prevOf=(a,m,i)=>{const k=orcKey(a,m);return G.orc[k]&&G.orc[k][i]!=null?G.orc[k][i]:ORC[i][2]};
const realOf=(a,m,i,reg)=>{const f=.62+((i*7+m*3)%9)/10, part=(+a===2026&&m===9)?.58:(+a===2026&&m>9)?0:1;return r2(ORC[i][2]*f*part*(reg==='caixa'?.94:1))};
M.screen('financeiro/orcamento',{title:'Previsto x Realizado',dock:'financeiro',hidden:true,
 help:['Em Comparar você vê, por conta do plano, quanto foi previsto e quanto já se realizou no mês.',
  'A barra de consumo fica vermelha quando uma despesa passa do previsto.',
  'Em Definir orçamento, ajuste os valores e salve; “Repetir até dezembro” copia para os meses seguintes.'],
 variants:{A:{label:'Atual',
 render:()=>U.page({kick:'Financeiro',title:'Previsto x Realizado',sub:'O orçamento do mês contra o que de fato entrou e saiu.',acts:[voltarFin]})+
   U.bar(U.tabs(['Comparar','Definir orçamento'],0,'Modo do orçamento'),`<span class="gs-fr">${U.select('Mês',MESES_N.map((n,i)=>[String(i),n[0].toUpperCase()+n.slice(1)]),'gs-mes','176px')+U.select('Ano',['2026','2025'],'gs-oano','128px')+U.seg('gs-oreg',[['comp','Competência'],['caixa','Caixa']],'comp','Regime')}</span>`)+
   `<div id="gs-orc"></div>`,
 mount:v=>{let tab=0,reg='comp';$('#gs-mes',v).value='9';
  const draw=()=>{const m=+$('#gs-mes',v).value,a=$('#gs-oano',v).value,box=$('#gs-orc',v);
   const rows=ORC.map((o,i)=>({i,n:o[0],t:o[1],p:prevOf(a,m,i),r:realOf(a,m,i,reg)}));
   if(tab===0){const res=x=>sum(rows.filter(r=>r.t==='r'),r=>r[x])-sum(rows.filter(r=>r.t==='d'),r=>r[x]),P=res('p'),R=res('r'),df=R-P;
    box.innerHTML=U.kpis([{label:'Previsto',value:brl(P),sub:'Receitas menos despesas'},{label:'Realizado',value:brl(R),sub:`${MESES_N[m]} de ${a}`},{label:'Diferença',value:(df<0?'− ':'+ ')+brl(Math.abs(df)),vtone:df<0?'neg':'pos',sub:df<0?'abaixo do previsto':'acima do previsto'}],3)+
     TB({rows,cols:[{h:'Conta do plano',html:r=>`<b style="font-weight:600" title="${esc(r.n)}">${r.n}</b>`},{h:'Tipo',w:'96px',html:r=>U.chip(r.t==='r'?'Receita':'Despesa',r.t==='r'?'g':'n')},
      {h:'Previsto',r:true,w:'144px',html:r=>brl(r.p)},{h:'Realizado',r:true,w:'144px',html:r=>brl(r.r)},
      {h:'Diferença',r:true,w:'144px',html:r=>{const d=r.r-r.p,bom=r.t==='r'?d>=0:d<=0;return `<span class="${bom?'pos':'neg'}">${d<0?'− ':'+ '}${brl(Math.abs(d))}</span>`}},
      {h:'Consumo',w:'200px',html:r=>{const pc=r.p?r.r/r.p*100:0,over=r.t==='d'&&pc>100;return `<div class="row" style="gap:12px;flex-wrap:nowrap"><div style="flex:1;min-width:0">${U.prog(pc,over?'rgb(var(--neg))':r.t==='r'?'rgb(var(--pos))':'')}</div><span class="num lbl ${over?'neg':''}" style="width:48px;flex:none;text-align:right">${Math.round(pc)}%</span></div>`}}]},{flex:240})}
   else box.innerHTML=TB({title:`Orçamento de ${MESES_N[m]} de ${a}`,rows,
     head:`<div class="btnrow" style="width:min(400px,100%)">${U.btn('Repetir até dezembro',{sm:true,act:'repetir'})}${U.btn('Salvar orçamento',{sm:true,act:'salvar'})}</div>`,
     cols:[{h:'Conta do plano',html:r=>`<b style="font-weight:600" title="${esc(r.n)}">${r.n}</b>`},{h:'Tipo',w:'96px',html:r=>U.chip(r.t==='r'?'Receita':'Despesa',r.t==='r'?'g':'n')},
      {h:'Previsto',r:true,w:'176px',html:r=>`<input class="input sm num" data-orc="${r.i}" value="${fmtIn(r.p)}" aria-label="Previsto para ${esc(r.n)}" style="width:160px;text-align:right">`}]},{flex:200});
   M.wire(v,H)};
  const ler=()=>$$('[data-orc]',v).map(i=>num(i.value));
  const H={voltar:()=>go('#/financeiro'),
   salvar:()=>{const m=+$('#gs-mes',v).value,a=$('#gs-oano',v).value;G.orc[orcKey(a,m)]=ler();M.toast(`Orçamento de ${MESES_N[m]} salvo.`,'Comparar',()=>clickTab(v,0))},
   repetir:()=>{const m=+$('#gs-mes',v).value,a=$('#gs-oano',v).value,val=ler();for(let k=m;k<12;k++)G.orc[orcKey(a,k)]=val.slice();M.toast(`Valores copiados de ${MESES_N[m]} até dezembro.`)}};
  $('[data-tabs]',v).addEventListener('tab',e=>{tab=e.detail;draw()});$('#gs-mes',v).onchange=draw;$('#gs-oano',v).onchange=draw;U.bindSeg(v,'gs-oreg',x=>{reg=x;draw()});
  draw();
 }}}});

/* =====================================================================
   FINANCEIRO · Conciliação de extrato (OFX)
   ===================================================================== */
const OFX=[['2026-10-01','PIX RECEBIDO HELENA T LEMOS',96927.25,1],['2026-10-02','PIX RECEBIDO PAULA LOPES',39342.11],['2026-10-02','TED RECEBIDA R CAMPOS',73471.08],
  ['2026-10-02','PAG BOLETO LUMINAR SUL',-38214.30],['2026-10-02','PAG BOLETO CONTABILIDADE PRADO',-150],['2026-10-02','TARIFA PACOTE SERVICOS',-89.90]];
M.screen('financeiro/conciliacao',{title:'Conciliar extrato',dock:'financeiro',hidden:true,
 help:['Escolha a conta bancária e envie o arquivo OFX que o banco fornece.',
  'Cada linha do extrato recebe um veredito: Casada, Empate, Sem título ou Já conciliada.',
  'Resolva os empates escolhendo o título certo e crie um título para o que não tem.',
  'O botão azul dá baixa em todas as linhas casadas e marcadas.'],
 variants:{A:{label:'Atual',
 render:()=>U.page({kick:'Financeiro',title:'Conciliar extrato',sub:'O extrato do banco casado com os títulos, linha a linha, antes de dar baixa.',acts:[voltarFin,{label:'Aplicar baixas',icon:'check',act:'aplicar',pri:true}]})+
   U.bar(U.select('Conta bancária',G.contas.filter(c=>c.id!=='cofre').map(c=>[c.id,'Conta bancária: '+c.nome]),'gs-cconta','min(264px,100%)')+
     `<label class="btn ctl" style="width:min(224px,100%);cursor:pointer">${ic('upload')}Enviar arquivo OFX<input type="file" accept=".ofx,.OFX" class="sr" id="gs-ofx"></label>`+
     U.btn('Usar extrato de exemplo',{ctl:true,act:'exemplo',w:'min(224px,100%)'}),'')+`<div id="gs-conc"></div>`,
 mount:v=>{let L=null,arq='';
  const cands=(val)=>G.tit.filter(t=>t.status==='open'&&t.tipo===(val>0?'rec':'pag')&&Math.abs(resta(t)-Math.abs(val))<1.01);
  const gerar=nome=>{arq=nome;L=OFX.map(([data,desc,valor,ja])=>{const c=ja?[]:cands(valor);return {data,desc,valor,ver:ja?'Já conciliada':c.length===1?'Casada':c.length>1?'Empate':'Sem título',tid:c.length===1?c[0].id:null,cands:c.map(t=>t.id),sel:true}});draw()};
  const nBaixas=()=>L?L.filter(l=>l.ver==='Casada'&&l.sel).length:0;
  const tone={'Casada':'g','Empate':'w','Sem título':'r','Já conciliada':'n'};
  const draw=()=>{const box=$('#gs-conc',v),pb=$('.head [data-act="aplicar"]',v);pb.innerHTML=ic('check')+(L?`Aplicar ${nBaixas()} baixa${nBaixas()===1?'':'s'}`:'Aplicar baixas');
   if(!L){box.innerHTML=`<section class="card rv" style="--d:2">${U.empty({title:'Envie o extrato da conta.',text:'Escolha a conta e envie o arquivo OFX do banco. O Maestro casa cada linha com um título em aberto antes de dar qualquer baixa.'})}</section>`;M.wire(v,H);return}
   const c=k=>L.filter(l=>l.ver===k).length;
   box.innerHTML=U.kpis([{label:'Linhas',value:String(L.length),sub:esc(arq)},{label:'Casadas',value:String(c('Casada')),chip:'prontas',tone:'g'},{label:'Empates',value:String(c('Empate')),chip:c('Empate')?'escolher':'',tone:'w'},
     {label:'Sem título',value:String(c('Sem título')),chip:c('Sem título')?'criar':'',tone:'r'},{label:'Já conciliadas',value:String(c('Já conciliada'))}],5)+
    TB({title:'Linhas do extrato · '+conta($('#gs-cconta',v).value).nome,rows:L,
     cols:[{h:'Baixar',w:'56px',html:(l,i)=>l.ver==='Casada'?`<input type="checkbox" class="gs-chk" data-ln="${i}" ${l.sel?'checked':''} aria-label="Incluir esta baixa">`:''},
      {h:'Data',w:'64px',html:l=>`<span class="num soft">${d2(l.data)}</span>`},{h:'Descrição no extrato',html:l=>`<span style="font-family:var(--mono);font-size:12px" title="${esc(l.desc)}">${esc(l.desc)}</span>`},
      {h:'Valor',r:true,w:'136px',html:l=>`<b class="num ${l.valor>0?'pos':''}">${l.valor>0?'+ ':'− '}${brl(Math.abs(l.valor))}</b>`},
      {h:'Veredito',w:'128px',html:l=>U.chip(l.ver,tone[l.ver])},
      {h:'Título',w:'264px',html:(l,i)=>{const t=l.tid&&G.tit.find(x=>x.id===l.tid);
        if(l.ver==='Empate')return U.btn(`Escolher entre ${l.cands.length} títulos`,{sm:true,act:'escolher',w:'240px',attrs:`data-ln="${i}"`});
        if(l.ver==='Sem título')return U.btn('Criar título',{sm:true,icon:'mais',act:'criar',w:'240px',attrs:`data-ln="${i}"`});
        if(l.ver==='Já conciliada')return `<span class="lbl">baixa já registrada</span>`;
        return t?`<div class="gs-d"><b title="${esc(t.desc)}">${esc(t.desc)}</b><span class="gs-sub">${esc(t.contato)} · ${t.parc?'parcela '+t.parc+' · ':''}vence ${d2(t.venc)}</span></div>`:''}}]},{flex:240});
   $$('[data-ln].gs-chk',box).forEach(c=>c.onchange=()=>{L[+c.dataset.ln].sel=c.checked;draw()});
   M.wire(v,H)};
  const H={voltar:()=>go('#/financeiro'),exemplo:()=>gerar('extrato-itau-out-2026.ofx'),
   escolher:el=>{const l=L[+el.dataset.ln];M.menu(el,l.cands.map(id=>{const t=G.tit.find(x=>x.id===id);return {label:`${t.contato} · ${t.parc?'parcela '+t.parc+' · ':''}${brl(resta(t))}`,icon:'check',run:()=>{l.tid=id;l.ver='Casada';draw()}}}))},
   criar:el=>{const l=L[+el.dataset.ln];novoTitulo(l.valor>0?'rec':'pag',out=>{l.tid=out[0].id;l.ver='Casada';draw();M.toast('Título criado e casado com a linha do extrato.')},
     {desc:l.desc.charAt(0)+l.desc.slice(1).toLowerCase(),valor:Math.abs(l.valor),venc:l.data,data:l.data,contato:l.valor>0?'':'Itaú',plano:l.valor>0?'':'Tarifas bancárias',conta:$('#gs-cconta',v).value})},
   aplicar:()=>{if(!L)return M.toast('Envie o extrato primeiro: arquivo OFX ou o extrato de exemplo.');
     const ok=L.filter(l=>l.ver==='Casada'&&l.sel);if(!ok.length)return M.toast('Nenhuma linha casada marcada.');
     const cid=$('#gs-cconta',v).value;
     ok.forEach(l=>{const t=G.tit.find(x=>x.id===l.tid);if(!t||t.status!=='open'){l.ver='Já conciliada';return}
       const val=Math.min(resta(t),Math.abs(l.valor));t.pago=r2(t.pago+val);t.conta=cid;if(t.pago>=t.valor-.005){t.status='paid';t.baixa=l.data}
       conta(cid).saldo=r2(conta(cid).saldo+(t.tipo==='rec'?val:-val));G.mov.unshift({data:l.data,desc:(t.tipo==='rec'?'Recebimento · ':'Pagamento · ')+t.contato,conta:cid,valor:t.tipo==='rec'?val:-val});l.ver='Já conciliada'});
     draw();M.toast(`${ok.length} baixa${ok.length>1?'s':''} aplicada${ok.length>1?'s':''} em ${conta(cid).nome}.`,'Ver Financeiro',()=>go('#/financeiro'))}};
  $('#gs-ofx',v).onchange=e=>{const f=e.target.files[0];if(f)gerar(f.name)};
  $('#gs-cconta',v).onchange=()=>{if(L){L=null;draw();M.toast('Conta trocada: envie o extrato desta conta.')}};
  draw();
 }}}});

/* =====================================================================
   FINANCEIRO · Contratos / Despesas fixas
   ===================================================================== */
const CICLO_M={Mensal:1,Bimestral:2,Trimestral:3,Semestral:6,Anual:12};
M.screen('financeiro/contratos',{title:'Contratos',dock:'financeiro',hidden:true,
 help:['Contratos geram cobranças recorrentes; despesas fixas geram contas a pagar a cada ciclo.',
  'Ciclos esperando são vencimentos que ainda não viraram título: clique no indicador para gerar.',
  'Suspender pausa a geração; Encerrar é definitivo. Os dois pedem o motivo.',
  'O botão azul cadastra um contrato ou uma despesa fixa, conforme a aba.'],
 variants:{A:{label:'Atual',
 render:()=>{const pg=M.q&&M.q.get('aba')==='pagar';
  return U.page({kick:'Financeiro',title:'Contratos e despesas fixas',sub:'O que se repete todo ciclo: mensalidades de clientes e contas fixas da empresa.',acts:[voltarFin,{label:pg?'Nova despesa fixa':'Novo contrato',icon:'mais',act:'novo',pri:true}]})+
   U.bar(U.tabs(['A receber','A pagar'],pg?1:0,'Tipo de contrato'))+`<div id="gs-ctr"></div>`},
 mount:v=>{let tab=M.q&&M.q.get('aba')==='pagar'?1:0;
  const draw=()=>{const tipo=tab?'pag':'rec',L=G.ctr.filter(c=>c.tipo===tipo),at=L.filter(c=>c.status==='Ativo'),esp=sum(at,c=>c.esp);
   const nb=$('.head [data-act="novo"]',v);nb.innerHTML=ic('mais')+(tab?'Nova despesa fixa':'Novo contrato');
   $('#gs-ctr',v).innerHTML=U.kpis([{label:'Ativos',value:String(at.length),sub:`de ${L.length} cadastrados`},
     {label:tab?'Despesa fixa mensal':'Receita mensal contratada',value:brl(sum(at,c=>c.valor/CICLO_M[c.ciclo])),sub:'ciclos convertidos para mês'},
     {label:'Ciclos esperando',value:String(esp),chip:esp?'Gerar ciclos vencidos':'em dia',tone:esp?'w':'g',sub:esp?'Clique para gerar os títulos.':'Nenhum vencimento sem título.',act:esp?'gerar':''}],3)+
    TB({rows:L,empty:{title:tab?'Nenhuma despesa fixa.':'Nenhum contrato.',text:'Cadastre pelo botão azul no topo.'},
     cols:[{h:'Descrição',html:c=>{const sub=`${c.contato} · desde ${d3(c.inicio)}${c.fim?' até '+d3(c.fim):''}${c.motivo&&c.status!=='Ativo'?' · '+c.motivo:''}`;return `<div class="gs-d"><b title="${esc(c.desc)}">${esc(c.desc)}</b><span class="gs-sub" title="${esc(sub)}">${esc(sub)}</span></div>`}},
      {h:'Valor',r:true,w:'208px',html:c=>`<div class="gs-d" style="align-items:flex-end"><b class="num">${brl(c.valor)}</b><span class="gs-sub">${c.ciclo} · dia ${c.dia} · ${c.reaj==='Nenhum'?'sem reajuste':'reajuste '+c.reaj}</span></div>`},
      {h:'Situação',w:'120px',html:c=>U.chip(c.status,c.status==='Ativo'?'g':c.status==='Suspenso'?'w':'n')},
      {h:'',w:'var(--gs-actw)',r:true,html:c=>c.status==='Encerrado'?'':`<div class="gs-acts"><span class="gs-wid" style="display:contents">${c.status==='Ativo'?U.btn('Suspender',{sm:true,act:'suspender',w:'152px',attrs:`data-id="${c.id}"`}):U.btn('Reativar',{sm:true,act:'reativar',w:'152px',attrs:`data-id="${c.id}"`})}${U.btn('Encerrar',{sm:true,act:'encerrar',w:'152px',attrs:`data-id="${c.id}"`})}</span>${U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Ações do contrato',act:'maisC',attrs:`data-id="${c.id}"`}).replace('class="btn','class="gs-nar btn')}</div>`}]},{aw:[312,36]});
   M.wire(v,H)};
  const byId=el=>G.ctr.find(c=>c.id===el.dataset.id);
  const H={voltar:()=>go('#/financeiro'),
   maisC:el=>{const c=byId(el);M.menu(el,[c.status==='Ativo'?{label:'Suspender',icon:'relogio',run:()=>H.suspender(el)}:{label:'Reativar',icon:'trocar',run:()=>H.reativar(el)},{label:'Encerrar',icon:'x',danger:true,run:()=>H.encerrar(el)}])},
   suspender:el=>{const c=byId(el);M.confirm({title:'Suspender '+c.desc+'?',text:'Nenhum título novo é gerado até reativar.',ok:'Suspender',field:'Motivo',run:x=>{c.status='Suspenso';c.motivo=x.motivo;draw();M.toast('Suspenso.')}})},
   reativar:el=>{const c=byId(el);c.status='Ativo';c.motivo='';draw();M.toast(`${c.desc} reativado. O próximo ciclo vence no dia ${c.dia}.`)},
   encerrar:el=>{const c=byId(el);M.confirm({title:'Encerrar '+c.desc+'?',text:'É definitivo: o contrato para de gerar títulos.',ok:'Encerrar',danger:true,field:'Motivo',run:x=>{c.status='Encerrado';c.fim=HOJE;c.motivo=x.motivo;draw();M.toast('Encerrado.')}})},
   gerar:()=>{const tipo=tab?'pag':'rec';let n=0;G.ctr.filter(c=>c.tipo===tipo&&c.status==='Ativo'&&c.esp).forEach(c=>{for(let k=0;k<c.esp;k++){n++;
       G.tit.push(T(nid('t'),tipo,c.desc,c.contato,'','',c.valor,`2026-${c.dia>2?'09':'10'}-${String(Math.min(c.dia,28)).padStart(2,'0')}`,{plano:c.plano}))}c.esp=0});
     draw();M.toast(`${n} título${n>1?'s':''} gerado${n>1?'s':''} em ${tipo==='rec'?'A receber':'A pagar'}.`,'Ver',()=>go('#/financeiro?aba='+(tipo==='rec'?'receber':'pagar')))},
   novo:()=>{const rec=!tab,pessoas=rec?D.contatos.map(c=>c.nome):D.fornecedores.map(f=>f.nome).concat(['Imobiliária Savassi','Contabilidade Prado','Vivo Empresas','Porto Seguro']);
     M.modal({title:rec?'Novo contrato':'Nova despesa fixa',sub:rec?'Cobrança recorrente de um cliente.':'Conta que se repete todo ciclo.',ok:rec?'Criar contrato':'Criar despesa fixa',
      fields:[{k:'contato',label:rec?'Cliente':'Fornecedor',type:'select',req:true,span:6,opts:pessoas,ph:'Escolher…'},
       {k:'conta',label:'Conta prevista',type:'select',span:6,opts:G.contas.map(c=>[c.id,c.nome]),value:'itau'},
       {k:'desc',label:'Descrição',req:true,span:12,ph:rec?'Ex.: Manutenção mensal da automação':'Ex.: Aluguel do escritório'},
       {k:'valor',label:'Valor do ciclo',type:'money',req:true,span:4},{k:'ciclo',label:'Ciclo',type:'select',req:true,span:4,opts:Object.keys(CICLO_M),value:'Mensal'},
       {k:'dia',label:'Dia do vencimento',type:'number',req:true,span:4,value:'10'},
       {k:'inicio',label:'Início',type:'date',req:true,span:4,value:HOJE},{k:'fim',label:'Fim',type:'date',span:4,help:'Em branco = sem prazo.'},
       {k:'reaj',label:'Reajuste anual',type:'select',span:4,opts:['Nenhum','IPCA','IGP-M','INPC'],value:'IPCA'},
       {k:'plano',label:'Conta do plano',type:'select',req:true,span:12,opts:rec?PLANO_REC:PLANO_PAG,ph:'Escolher…',value:rec?'Receita de serviços recorrentes':''}],
      onOk:x=>{const val=num(x.valor),dia=parseInt(x.dia,10);if(val<=0){M.toast('Informe o valor do ciclo.');return false}if(!(dia>=1&&dia<=31)){M.toast('O dia do vencimento vai de 1 a 31.');return false}
        G.ctr.unshift({id:nid('k'),tipo:rec?'rec':'pag',desc:x.desc,contato:x.contato,valor:val,ciclo:x.ciclo,dia,reaj:x.reaj,inicio:x.inicio,fim:x.fim,status:'Ativo',esp:0,plano:x.plano});
        draw();M.toast(rec?'Contrato criado.':'Despesa fixa criada.')}})}};
  $('[data-tabs]',v).addEventListener('tab',e=>{tab=e.detail;draw()});
  draw();
 }}}});

/* =====================================================================
   COMPRAS
   ===================================================================== */
const PED_ST={'Rascunho':'n','Enviado':'b','Confirmado':'b','Recebido em parte':'w','Recebido':'g','Cancelado':'r','Encerrado':'n'};
const pedTot=p=>r2(sum(p.itens,i=>i.q*i.custo));
const obraTxt=id=>id?obraNome(id):'Reposição de estoque';
const filaTot=L=>r2(sum(L,q=>q.q*q.custo));
let compTab=0;
const sel=new Set(), abertoG=new Set();

function pedidoSheet(p,refresh){
  const st=p.status,f=fornNome(p.forn);
  const foot={Rascunho:[{label:'Cancelar pedido',act:'cancelar'},{label:'Marcar como enviado',act:'enviar',pri:true}],
    Enviado:[{label:'Cancelar pedido',act:'cancelar'},{label:'Fornecedor confirmou',act:'confirmar',pri:true}],
    Confirmado:[{label:'Cancelar pedido',act:'cancelar'},{label:'Receber',act:'receber',pri:true}],
    'Recebido em parte':[{label:'Encerrar',act:'encerrar'},{label:'Receber',act:'receber',pri:true}]}[st]||[];
  const nr=sum(p.itens,i=>i.rec),nq=sum(p.itens,i=>i.q);
  let s;
  const reabrir=()=>{s.close();refresh();setTimeout(()=>pedidoSheet(p,refresh),320)};
  s=M.sheet({kick:`Pedido ${p.n} · ${d3(p.data)}`,title:f,sub:`${p.itens.length} itens · ${nr} de ${nq} recebidos`,chips:U.chip(st,PED_ST[st]),
    acts:[{label:'PDF',act:'pdf',icon:'doc'},{label:'PDF sem preços',act:'pdfsp',icon:'doc'},{label:'WhatsApp',act:'zap',icon:'zap'}],
    body:`<div class="sec"><h3>Itens</h3><div class="gs-mtbl" style="margin-top:0"><table class="tbl"><thead><tr><th>Item</th><th>Obra</th><th class="r">Qtd</th><th class="r">Recebido</th><th class="r">Custo unit.</th><th class="r">Subtotal</th></tr></thead><tbody>
      ${p.itens.map(i=>`<tr><td><div class="gs-d"><b>${esc(i.nome)}</b><span class="gs-sub" style="font-family:var(--mono)">${esc(i.sku)}</span></div></td><td class="soft">${esc(obraTxt(i.obra))}</td><td class="r num">${i.q}</td><td class="r num ${i.rec<i.q?'warn':'pos'}">${i.rec}</td><td class="r num">${brl(i.custo)}</td><td class="r num">${brl(i.q*i.custo)}</td></tr>`).join('')}
      <tr><td colspan="5"><b>Total · prazo de ${p.prazo} dias</b></td><td class="r num"><b>${brl(pedTot(p))}</b></td></tr></tbody></table></div></div>
     <div class="sec"><h3>Recebimentos</h3>${p.receb.length?p.receb.map(r=>`<div class="gs-li"><span class="thumb sm" aria-hidden="true">${ic('caixa',16)}</span><span class="gs-grow"><b style="font-weight:600">${r.nf?'NF '+esc(r.nf):'Por bipagem'}</b><br><span class="lbl" style="font-size:12px">${d3(r.data)} · ${esc(depNome(r.dep))}</span></span><span class="num">${r.qt} un.</span></div>`).join(''):`<p class="lbl" style="margin:0">Nenhum recebimento ainda.</p>`}</div>
     ${p.motivo?`<div class="sec"><h3>Motivo ${st==='Cancelado'?'do cancelamento':'do encerramento'}</h3><p style="margin:0">${esc(p.motivo)}</p></div>`:''}`,
    foot,on:{
     pdf:()=>M.toast(`Gera o PDF do pedido ${p.n} com preços (simulação).`),pdfsp:()=>M.toast(`Gera o PDF do pedido ${p.n} sem preços, para conferência na obra (simulação).`),
     zap:()=>M.toast(`Abre o WhatsApp de ${f} com o PDF do pedido ${p.n} (simulação).`),
     enviar:()=>{p.status='Enviado';M.toast(`Pedido ${p.n} marcado como enviado.`);reabrir()},
     confirmar:()=>{p.status='Confirmado';G.tit.push(T(nid('t'),'pag',`Pedido ${p.n} · Compra`,f,p.itens[0].obra||'','',pedTot(p),addDias(HOJE,28),{emissao:HOJE}));
       M.toast(`Fornecedor confirmou. Conta a pagar de ${brl(pedTot(p))} criada no Financeiro.`);reabrir()},
     receber:()=>receberModal(p,reabrir),
     cancelar:()=>M.confirm({title:`Cancelar o pedido ${p.n}?`,text:`${f} · ${brl(pedTot(p))}. Os itens voltam para A comprar.`,ok:'Cancelar pedido',danger:true,field:'Motivo',
       run:x=>{p.status='Cancelado';p.motivo=x.motivo;p.itens.filter(i=>i.rec<i.q).forEach(i=>G.fila.push({id:nid('q'),sku:i.sku,nome:i.nome,q:i.q-i.rec,custo:i.custo,obra:i.obra,forn:p.forn}));
         M.toast(`Pedido ${p.n} cancelado. Os itens voltaram para A comprar.`);reabrir()}}),
     encerrar:()=>M.confirm({title:`Encerrar o pedido ${p.n}?`,text:'O que faltou receber deixa de ser esperado.',ok:'Encerrar',field:'Motivo',
       run:x=>{p.status='Encerrado';p.motivo=x.motivo;M.toast(`Pedido ${p.n} encerrado.`);reabrir()}})}});
}
function receberModal(p,after){
  const pend=p.itens.map(i=>Math.max(0,i.q-i.rec));
  const {el}=M.modal({title:'Receber · '+p.n,sub:esc(fornNome(p.forn)),width:'880px',ok:'Confirmar recebimento',
    body:`${M.tabsHTML(['Pela nota fiscal','Por bipagem'],0,'in','Forma de recebimento')}
     <div class="gs-pan fgrid" data-pan="0">${U.field({k:'nfnum',label:'Número da NF',req:true,span:6})}${U.field({k:'nfdata',label:'Data',type:'date',span:6,value:HOJE})}</div>
     <div class="gs-pan fgrid" data-pan="1" hidden>${U.field({k:'bip',label:'Código do produto',span:8,ph:'Bipe ou digite o código e tecle Enter'})}
       <div class="field f4"><span>Câmera</span>${U.btn('Ler com a câmera',{icon:'camera',act:'cam',w:'100%'})}</div>${U.field({k:'nfopc',label:'Nota fiscal (opcional)',span:12})}</div>
     <div class="fgrid mt16">${U.field({k:'dep',label:'Depósito',type:'select',span:6,opts:G.deps.filter(d=>d.ativo).map(d=>[d.id,d.nome]),value:(G.deps.find(d=>d.padrao)||{}).id})}</div>
     <div class="gs-mtbl"><table class="tbl"><thead><tr><th>Produto</th><th class="r">Pedido</th><th class="r">Já recebido</th><th class="r">Agora</th><th>Nº de série</th></tr></thead><tbody>
      ${p.itens.map((i,k)=>`<tr><td><div class="gs-d"><b>${esc(i.nome)}</b><span class="gs-sub" style="font-family:var(--mono)">${esc(i.sku)}</span></div></td><td class="r num">${i.q}</td><td class="r num">${i.rec}</td>
        <td class="r"><input class="input sm num gs-in" data-ag="${k}" type="number" min="0" max="${pend[k]}" value="${pend[k]}" aria-label="Quantidade recebida agora de ${esc(i.nome)}" ${pend[k]?'':'disabled'}></td>
        <td><input class="input sm" data-sn="${k}" placeholder="Opcional" aria-label="Número de série de ${esc(i.nome)}" style="width:160px"></td></tr>`).join('')}</tbody></table></div>`,
    onOk:()=>{const modo=$$('[data-tabs] .tab',el).findIndex(b=>b.classList.contains('on'));
      const nf=modo===0?$('[name=nfnum]',el).value.trim():$('[name=nfopc]',el).value.trim();
      if(modo===0&&!nf){const w=$('[name=nfnum]',el).closest('.field');w.classList.add('err');$('.msg',w).hidden=false;$('[name=nfnum]',el).focus();return false}
      const ag=$$('[data-ag]',el).map((x,k)=>Math.max(0,Math.min(pend[k],parseInt(x.value,10)||0)));
      const tot=sum(ag,x=>x);if(!tot){M.toast('Informe quanto chegou agora.');return false}
      const dep=$('[name=dep]',el).value,quando=(modo===0?$('[name=nfdata]',el).value:HOJE)||HOJE;
      p.itens.forEach((i,k)=>{if(!ag[k])return;i.rec+=ag[k];let pr=prodBy(i.sku);
        if(!pr){pr={sku:i.sku,nome:i.nome,un:'un',forn:p.forn,custo:i.custo,min:0,dep:{},res:[]};G.prod.push(pr)}
        const f0=fis(pr);pr.custo=r2((pr.custo*f0+i.custo*ag[k])/(f0+ag[k]||1));pr.dep[dep]=(pr.dep[dep]||0)+ag[k];
        if(i.obra)pr.res.push({obra:i.obra,q:ag[k],dep});
        G.emov.unshift({data:quando+' '+new Date().toTimeString().slice(0,5),tipo:'Entrada',sku:i.sku,q:ag[k],dep,motivo:`Pedido ${p.n}${nf?' · NF '+nf:''}`})});
      p.receb.push({data:quando,nf:nf||'',dep,qt:tot});
      p.status=p.itens.every(i=>i.rec>=i.q)?'Recebido':'Recebido em parte';
      M.toast(`${tot} unidade${tot>1?'s':''} recebida${tot>1?'s':''} no ${depNome(dep)}. Pedido ${p.status.toLowerCase()}.`);after&&after()}});
  M.tabs(el);
  $('[data-tabs]',el).addEventListener('tab',e=>{$$('[data-pan]',el).forEach(x=>x.hidden=+x.dataset.pan!==e.detail);if(e.detail===1){$$('[data-ag]',el).forEach(x=>{if(!x.disabled)x.value=0});$('[name=bip]',el).focus()}});
  $('[name=bip]',el).addEventListener('keydown',e=>{if(e.key!=='Enter')return;e.preventDefault();const c=e.target.value.trim().toUpperCase(),k=p.itens.findIndex(i=>i.sku.toUpperCase()===c);
    if(k<0){M.toast(`Código ${c||'vazio'} não está neste pedido.`);return}
    const inp=$(`[data-ag="${k}"]`,el),n=(parseInt(inp.value,10)||0)+1;if(n>pend[k]){M.toast(`${p.itens[k].nome}: já bateu a quantidade pendente.`);return}
    inp.value=n;e.target.value='';M.toast(`${c} · ${n} de ${pend[k]}`)});
  M.wire($('.mb',el),{cam:()=>M.toast('Abre a câmera do celular para ler o código de barras (simulação).')});
}
function avulsoModal(after){
  const linhas=[];
  const {el}=M.modal({title:'Uso comum',sub:'Compra avulsa, fora de obra: material de escritório, ferramentas, consumo da equipe.',width:'880px',ok:'Gerar pedido',
    fields:[{k:'forn',label:'Fornecedor',type:'select',req:true,span:6,opts:D.fornecedores.filter(f=>f.situacao==='Ativo').map(f=>[f.id,f.nome]),ph:'Escolher…'}],
    body:`<div class="fgrid mt16"><label class="field f8" for="gs-avp"><span>Produto do catálogo</span><select class="select" id="gs-avp"><option value="">Escolher produto…</option>${G.prod.map(p=>`<option value="${esc(p.sku)}">${esc(p.nome)} · ${esc(p.sku)}</option>`).join('')}</select></label>
      <div class="field f4"><span class="gs-sp">&nbsp;</span>${U.btn('Adicionar produto',{icon:'mais',act:'addp',w:'100%'})}</div>
      <label class="field f8" for="gs-avd"><span>Ou descrição livre</span><input class="input" id="gs-avd" placeholder="Ex.: Fita isolante, abraçadeiras"></label>
      <div class="field f4"><span class="gs-sp">&nbsp;</span>${U.btn('Adicionar item',{icon:'mais',act:'addd',w:'100%'})}</div></div>
     <div class="gs-mtbl"><table class="tbl"><thead><tr><th>Item</th><th class="r">Qtd</th><th class="r">Custo unit.</th><th class="r">Subtotal</th><th><span class="sr">Ações</span></th></tr></thead><tbody id="gs-avl"></tbody></table></div>`,
    onOk:v=>{if(!linhas.length){M.toast('Adicione pelo menos um item.');return false}
      const n=Math.max(...G.ped.map(p=>p.n))+1;
      G.ped.push({n,data:HOJE,forn:v.forn,prazo:7,status:'Rascunho',itens:linhas.map(l=>({sku:l.sku||'AVULSO',nome:l.nome,obra:'',q:l.q,rec:0,custo:l.custo})),receb:[],uso:true});
      M.toast(`Pedido ${n} de uso comum criado em Rascunho.`);after&&after(n)}});
  const tb=$('#gs-avl',el);
  const draw=()=>{tb.innerHTML=linhas.length?linhas.map((l,k)=>`<tr><td><div class="gs-d"><b>${esc(l.nome)}</b>${l.sku?`<span class="gs-sub" style="font-family:var(--mono)">${esc(l.sku)}</span>`:''}</div></td>
      <td class="r"><input class="input sm num gs-in" type="number" min="1" data-lq="${k}" value="${l.q}" aria-label="Quantidade"></td>
      <td class="r"><input class="input sm num gs-in" data-lc="${k}" value="${fmtIn(l.custo)}" aria-label="Custo unitário" style="width:120px"></td>
      <td class="r num">${brl(l.q*l.custo)}</td><td class="r">${U.btn('Tirar',{sm:true,act:'tirar',w:'88px',attrs:`data-k="${k}"`})}</td></tr>`).join('')
      :`<tr><td colspan="5" class="lbl" style="text-align:center">Nenhum item ainda. Adicione do catálogo ou por descrição livre.</td></tr>`;
    $$('[data-lq]',tb).forEach(i=>i.onchange=()=>{linhas[+i.dataset.lq].q=Math.max(1,parseInt(i.value,10)||1);draw()});
    $$('[data-lc]',tb).forEach(i=>i.onchange=()=>{linhas[+i.dataset.lc].custo=num(i.value);draw()});
    M.wire(tb,{tirar:b=>{linhas.splice(+b.dataset.k,1);draw()}})};
  M.wire($('.mb',el),{addp:()=>{const s=$('#gs-avp',el).value,p=prodBy(s);if(!p)return M.toast('Escolha um produto do catálogo.');linhas.push({sku:p.sku,nome:p.nome,q:1,custo:p.custo});$('#gs-avp',el).value='';draw()},
    addd:()=>{const d=$('#gs-avd',el).value.trim();if(d.length<3)return M.toast('Descreva o item (pelo menos 3 letras).');linhas.push({sku:'',nome:d,q:1,custo:0});$('#gs-avd',el).value='';draw()}});
  draw();
}
function fornecedorModal(f,after){
  const x=(f&&f.extra)||{}, val=k=>x[k]!=null?x[k]:'';
  const pessoas=(f&&f.pessoas)?f.pessoas.slice():f?[{nome:'Vendedor(a) responsável',cargo:'Comercial',tel:f.tel,email:f.email}]:[];
  const anexos=(f&&f.anexos)?f.anexos.slice():f?['Tabela de preços 2026.pdf']:[];
  const P=[
   [{k:'tipo',label:'Tipo',type:'select',span:4,opts:['Pessoa jurídica','Pessoa física'],value:val('tipo')||'Pessoa jurídica'},{k:'doc',label:'CNPJ ou CPF',req:true,span:4,value:f?f.doc:''},
    {k:'situacao',label:'Situação',type:'select',span:4,opts:['Ativo','Bloqueado'],value:f?f.situacao:'Ativo'},{k:'razao',label:'Razão social',req:true,span:6,value:f?f.razao:''},
    {k:'nome',label:'Nome fantasia',span:6,value:f?f.nome:''},{k:'tel',label:'Telefone',type:'tel',span:4,value:f?f.tel:''},{k:'email',label:'E-mail',type:'email',span:4,value:f?f.email:''},
    {k:'site',label:'Site',span:4,value:val('site')},{k:'cep',label:'CEP',span:3,value:val('cep')},{k:'end',label:'Endereço',span:6,value:val('end')},{k:'numero',label:'Número',span:3,value:val('numero')},
    {k:'bairro',label:'Bairro',span:4,value:val('bairro')},{k:'cidade',label:'Cidade',span:4,value:val('cidade')},{k:'uf',label:'UF',span:4,value:val('uf')}],
   [{k:'marcas',label:'Marcas que fornece',span:12,value:f?f.marcas.join(', '):'',ph:'Separe por vírgula',help:'O A comprar usa as marcas para sugerir este fornecedor.'},
    {k:'prazo',label:'Prazo de entrega (dias)',type:'number',span:4,value:val('prazo')||'10'},{k:'minimo',label:'Pedido mínimo',type:'money',span:4,value:val('minimo')},
    {k:'frete',label:'Frete',type:'select',span:4,opts:['CIF (fornecedor paga)','FOB (nós pagamos)'],value:val('frete')||'CIF (fornecedor paga)'},
    {k:'cond',label:'Condição de pagamento',type:'select',span:6,opts:['À vista','28 dias','30/60','30/60/90'],value:val('cond')||'28 dias'},{k:'vend',label:'Vendedor responsável',span:6,value:val('vend')},
    {k:'obs',label:'Observações',type:'textarea',span:12,value:val('obs')}],
   [{k:'ie',label:'Inscrição estadual',span:6,value:val('ie')},{k:'im',label:'Inscrição municipal',span:6,value:val('im')},
    {k:'regime',label:'Regime tributário',type:'select',span:6,opts:['Simples Nacional','Lucro presumido','Lucro real','MEI'],value:val('regime')||'Lucro presumido'},
    {k:'icms',label:'Contribuinte de ICMS',type:'select',span:6,opts:['Contribuinte','Isento','Não contribuinte'],value:val('icms')||'Contribuinte'},
    {k:'cnae',label:'CNAE principal',span:6,value:val('cnae')},{k:'st',label:'Vende com ICMS-ST',type:'select',span:6,opts:['Não','Sim'],value:val('st')||'Não'}],
   [{k:'forma',label:'Forma preferida',type:'select',span:6,opts:['Boleto','Pix','Transferência','Cartão'],value:val('forma')||'Boleto'},{k:'pix',label:'Chave Pix',span:6,value:val('pix')},
    {k:'banco',label:'Banco',span:4,value:val('banco')},{k:'ag',label:'Agência',span:4,value:val('ag')},{k:'cc',label:'Conta',span:4,value:val('cc')},{k:'fav',label:'Favorecido',span:12,value:val('fav')||(f?f.razao:'')}],
   [{k:'p_nome',label:'Nome',span:6},{k:'p_cargo',label:'Cargo',span:6},{k:'p_tel',label:'Telefone',type:'tel',span:6},{k:'p_email',label:'E-mail',type:'email',span:6}],
   [{k:'anexo',label:'Anexar arquivo',type:'file',span:12,ph:'Escolher arquivo (contrato, tabela de preços, certidões)'}]];
  const {el}=M.modal({title:f?f.nome:'Novo fornecedor',sub:f?esc(f.razao+' · '+f.doc):'Cadastro completo: dados, comercial, fiscal, pagamento, pessoas e anexos.',width:'880px',ok:f?'Salvar fornecedor':'Criar fornecedor',
    body:`${M.tabsHTML(['Dados','Comercial','Fiscal','Pagamento','Pessoas','Anexos'],0,'in','Seções do cadastro')}
     ${P.map((fs,i)=>`<div class="gs-pan" data-pan="${i}" ${i?'hidden':''}><div class="fgrid">${fs.map(U.field).join('')}</div>${i===4?`<div class="btnrow mt16" style="width:240px">${U.btn('Adicionar pessoa',{icon:'mais',act:'addpes'})}</div><div class="gs-ppl" id="gs-ppl"></div>`:i===5?`<div class="gs-ppl" id="gs-anx"></div>`:''}</div>`).join('')}`,
    onOk:()=>{const g=k=>{const e=$(`[name="${k}"]`,el);return e?e.value.trim():''};
      const miss=['doc','razao'].filter(k=>!g(k));
      $$('.field',el).forEach(w=>w.classList.remove('err'));
      if(miss.length){clickTab(el,0);miss.forEach(k=>{const w=$(`[name="${k}"]`,el).closest('.field');w.classList.add('err');$('.msg',w).hidden=false});$(`[name="${miss[0]}"]`,el).focus();return false}
      const ex={};P.slice(0,4).flat().forEach(fl=>ex[fl.k]=g(fl.k));
      const dados={nome:g('nome')||g('razao'),razao:g('razao'),doc:g('doc'),tel:g('tel'),email:g('email'),marcas:g('marcas').split(',').map(s=>s.trim()).filter(Boolean),situacao:g('situacao'),extra:ex,pessoas,anexos};
      if(f)Object.assign(f,dados);else D.fornecedores.push(Object.assign({id:'f'+(++G.seq)},dados));
      M.toast(f?'Fornecedor salvo.':'Fornecedor criado.');after&&after()}});
  M.tabs(el);$('.mb',el).style.minHeight='min(520px,calc(100vh - 280px))';
  $('[data-tabs]',el).addEventListener('tab',e=>$$('[data-pan]',el).forEach(x=>x.hidden=+x.dataset.pan!==e.detail));
  const drawP=()=>{$('#gs-ppl',el).innerHTML=pessoas.map((p,k)=>`<div class="in">${U.av(p.nome)}<span class="gs-grow" style="flex:1;min-width:0"><b style="font-weight:600">${esc(p.nome)}</b> <span class="lbl">· ${esc(p.cargo||'—')}</span><br><span class="lbl" style="font-size:12px">${esc([p.tel,p.email].filter(Boolean).join(' · ')||'sem contato')}</span></span>${U.btn('Tirar',{sm:true,act:'tirarp',w:'88px',attrs:`data-k="${k}"`})}</div>`).join('')||`<p class="lbl" style="margin:0">Ninguém cadastrado ainda.</p>`;
    $('#gs-anx',el).innerHTML=anexos.map((a,k)=>`<div class="in"><span class="thumb sm" aria-hidden="true">${ic('doc',16)}</span><span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(a)}</span>${U.btn('Tirar',{sm:true,act:'tirara',w:'88px',attrs:`data-k="${k}"`})}</div>`).join('')||`<p class="lbl" style="margin:0">Nenhum anexo.</p>`;
    M.wire($('.mb',el),H)};
  const H={addpes:()=>{const g=k=>$(`[name="${k}"]`,el).value.trim();if(g('p_nome').length<2){M.toast('Informe o nome da pessoa.');$('[name=p_nome]',el).focus();return}
      pessoas.push({nome:g('p_nome'),cargo:g('p_cargo'),tel:g('p_tel'),email:g('p_email')});['p_nome','p_cargo','p_tel','p_email'].forEach(k=>$(`[name="${k}"]`,el).value='');drawP()},
    tirarp:b=>{pessoas.splice(+b.dataset.k,1);drawP()},tirara:b=>{anexos.splice(+b.dataset.k,1);drawP()}};
  $('[name=anexo]',el).addEventListener('change',e=>{const a=e.target.files[0];if(a){anexos.push(a.name);drawP()}});
  drawP();
}

M.screen('compras',{title:'Compras',dock:'compras',
 help:['A comprar junta o que falta comprar de todas as obras, agrupado por fornecedor.',
  'Marque os itens e use “Gerar pedido por fornecedor”: cada fornecedor vira um pedido em Rascunho.',
  'Quando o estoque já tem o item, “Usar do estoque” reserva para a obra e tira da fila.',
  'Em Pedidos, abra um pedido para enviar, confirmar, receber, encerrar ou cancelar.'],
 variants:{A:{label:'Atual',
 render:()=>{const a=M.q&&M.q.get('aba');compTab=a==='pedidos'?1:a==='fornecedores'?2:0;
  const obrasF=[...new Set(G.fila.map(q=>q.obra||''))].length;
  return U.page({kick:`${obrasF} obras com itens pendentes`,title:'Compras',sub:'Tudo o que falta comprar, de todas as obras, e os pedidos aos fornecedores.',acts:[
     {label:'Reposição de estoque',icon:'mais',act:'repo'},{label:'Uso comum',icon:'mais',act:'avulso',pri:true}]})+
   U.bar(U.tabs(['A comprar','Pedidos','Fornecedores'],compTab,'Seções de Compras'),`<span class="gs-fr" id="gs-cr"></span>`)+`<div id="gs-comp"></div>`},
 mount:v=>{
  const F={neg:'',forn:'',st:'',q:'',sit:'Todos'};
  const right=()=>{const r=$('#gs-cr',v);
    r.innerHTML=compTab===0?U.select('Negócio',[['','Todos os negócios'],...D.obras.map(o=>[o.id,o.nome]),['__est','Reposição de estoque']],'gs-fneg','224px')+U.select('Fornecedor',[['','Todos os fornecedores'],...D.fornecedores.map(f=>[f.id,f.nome]),['__sem','Sem fornecedor']],'gs-fforn','224px')
     :compTab===1?U.select('Situação',[['','Todas as situações'],...Object.keys(PED_ST).map(s=>[s,s])],'gs-fst','224px')
     :U.search('Buscar por nome, razão social, CNPJ ou CPF','gs-fq','360px')+U.select('Situação',['Todos','Ativos','Bloqueados'],'gs-fsit','160px')+U.btn('Novo fornecedor',{icon:'mais',ctl:true,act:'novoForn',w:'224px'});
    const s=(id,k)=>{const e=$('#'+id,r);if(!e)return;e.value=F[k];e.addEventListener(e.tagName==='INPUT'?'input':'change',()=>{F[k]=e.value;draw()})};
    s('gs-fneg','neg');s('gs-fforn','forn');s('gs-fst','st');s('gs-fq','q');s('gs-fsit','sit')};
  const comprarHTML=()=>{
    const L=G.fila.filter(q=>(!F.neg||(F.neg==='__est'?!q.obra:q.obra===F.neg))&&(!F.forn||(F.forn==='__sem'?!q.forn:q.forn===F.forn)));
    [...sel].forEach(id=>{if(!G.fila.find(q=>q.id===id))sel.delete(id)});
    const fs=[...new Set(L.filter(q=>q.forn).map(q=>q.forn))];
    const colsBase=(semForn)=>[{h:'Produto',html:q=>`<div class="gs-d"><b title="${esc(q.nome)}">${esc(q.nome)}</b><span class="gs-sub" style="font-family:var(--mono)">${esc(q.sku)}</span></div>`},
      {h:'Qtd',r:true,w:'56px',html:q=>String(q.q)},{h:'Custo unit.',r:true,w:'112px',html:q=>brl(q.custo)},{h:'Obra',w:'176px',html:q=>`<span class="soft" title="${esc(obraTxt(q.obra))}">${esc(obraTxt(q.obra))}</span>`},
      {h:'Disponível',w:'136px',html:q=>{const p=prodBy(q.sku),d=p?disp(p):0;return d>0?`<span title="Atender pelo estoque?">${U.chip(`${d} em estoque`,'g')}</span>`:`<span class="soft">${p?'0 no estoque':'não estocado'}</span>`}},
      ...(semForn?[{h:'Fornecedor',w:'152px',html:q=>U.btn('Definir…',{sm:true,act:'definir',w:'152px',attrs:`data-q="${q.id}"`})}]:[]),
      {h:'',w:'152px',r:true,html:q=>{const p=prodBy(q.sku);return p&&disp(p)>0?U.btn('Usar do estoque',{sm:true,icon:'estoque',act:'usar',w:'152px',attrs:`data-q="${q.id}"`}):''}}];
    const grupos=fs.map(fid=>{const all=L.filter(q=>q.forn===fid),rows=abertoG.has(fid)||all.length<=4?all:all.slice(0,4),f=D.byId('fornecedores',fid)||{};
      return TB({id:'gs-g-'+fid,title:fornNome(fid),rows,check:true,cols:colsBase(false),
        head:`${f.situacao==='Bloqueado'?U.chip('Fornecedor bloqueado','r'):''}<span class="lbl">${all.length} ite${all.length>1?'ns':'m'}</span><b class="num">${brl(filaTot(all))}</b>${all.length>4?U.btn(abertoG.has(fid)?'Mostrar menos':`Mostrar todos os ${all.length} itens`,{sm:true,ghost:true,act:'expand',attrs:`data-f="${fid}"`}):''}`},{flex:220})});
    const sem=L.filter(q=>!q.forn);
    const abaixo=G.prod.filter(p=>p.min>0&&disp(p)<p.min);
    const tot=filaTot(G.fila.filter(q=>sel.has(q.id)));
    return `<div class="stack">${grupos.join('')||''}
      ${sem.length?TB({title:'Sem fornecedor no catálogo',head:`<span class="lbl">Defina quem vende para poder pedir</span>${U.chip(String(sem.length),'w')}`,rows:sem,cols:colsBase(true)},{flex:220}):''}
      ${!grupos.length&&!sem.length?`<section class="card">${U.empty({title:'Nada a comprar com esses filtros.',text:'Quando uma obra aprova itens, eles aparecem aqui, agrupados por fornecedor.'})}</section>`:''}
      ${abaixo.length?TB({title:'Abaixo do mínimo',head:`<span class="lbl">Estoque da empresa</span>${U.chip(String(abaixo.length),'w')}`,rows:abaixo,
        cols:[{h:'Produto',html:p=>`<div class="gs-d"><b title="${esc(p.nome)}">${esc(p.nome)}</b><span class="gs-sub" style="font-family:var(--mono)">${esc(p.sku)}</span></div>`},{h:'Disponível',r:true,w:'112px',html:p=>`<span class="warn">${disp(p)}</span>`},
          {h:'Mínimo',r:true,w:'112px',html:p=>String(p.min)},{h:'Fornecedor',w:'200px',html:p=>`<span class="soft">${esc(fornNome(p.forn))}</span>`},
          {h:'',w:'152px',r:true,html:p=>U.btn(`Repor ${p.min-disp(p)}`,{sm:true,act:'repor',w:'152px',attrs:`data-sku="${esc(p.sku)}"`})}]}):''}
      <div class="card gs-sel" id="gs-sel" ${sel.size?'':'hidden'}><b class="num">${sel.size} selecionado${sel.size===1?'':'s'} · ${brl(tot)}</b>
        <label class="lbl" for="gs-prazo">Prazo (dias)<input class="input sm num" id="gs-prazo" type="number" min="1" value="${esc(String(comprarHTML.prazo||10))}" style="width:80px;text-align:right"></label>
        <div class="gs-b2">${U.btn('Limpar seleção',{sm:true,act:'limpar'})}${U.btn('Gerar pedido por fornecedor',{sm:true,icon:'compras',act:'gerarPed'})}</div></div></div>`};
  const pedidosHTML=()=>{const L=G.ped.filter(p=>!F.st||p.status===F.st).sort((a,b)=>b.n-a.n);pedidosHTML.rows=L;
    return TB({rows:L,rowAct:'ped',empty:{title:'Nenhum pedido com essa situação.'},
      cols:[{h:'Pedido',w:'112px',html:p=>`<div class="gs-d"><b class="num">Nº ${p.n}</b><span class="gs-sub">${d3(p.data)}</span></div>`},
       {h:'Fornecedor',html:p=>{const o=([...new Set(p.itens.map(i=>obraTxt(i.obra)||'Uso comum'))].join(', ')||'Uso comum')+(p.uso?' · uso comum':'');return `<div class="gs-d"><b title="${esc(fornNome(p.forn))}">${esc(fornNome(p.forn))}</b><span class="gs-sub" title="${esc(o)}">${esc(o)}</span></div>`}},
       {h:'Itens',w:'176px',html:p=>`<span class="soft">${p.itens.length} ite${p.itens.length>1?'ns':'m'} · ${sum(p.itens,i=>i.rec)} recebidos</span>`},
       {h:'Total',r:true,w:'144px',html:p=>`<b>${brl(pedTot(p))}</b>`},{h:'Situação',w:'160px',html:p=>U.chip(p.status,PED_ST[p.status])},
       {h:'',w:'36px',r:true,html:()=>U.btn('',{icon:'seta',sm:true,ghost:true,title:'Abrir pedido',act:'abrirPed'})}]},{flex:240})};
  const fornHTML=()=>{const q=F.q.toLowerCase(),L=D.fornecedores.filter(f=>(!q||(f.nome+' '+f.razao+' '+f.doc.replace(/\D/g,'')+' '+f.doc).toLowerCase().includes(q))&&(F.sit==='Todos'||(F.sit==='Ativos'?f.situacao==='Ativo':f.situacao==='Bloqueado')));fornHTML.rows=L;
    return TB({rows:L,rowAct:'forn',empty:{title:'Nenhum fornecedor encontrado.',text:'Tente outro nome, razão social, CNPJ ou CPF.'},
      cols:[{h:'Fornecedor',html:f=>`<div class="row" style="gap:12px;flex-wrap:nowrap">${U.av(f.nome)}<div class="gs-d"><b title="${esc(f.nome)}">${esc(f.nome)}</b><span class="gs-sub" title="${esc(f.razao)}">${esc(f.razao)}</span></div></div>`},
       {h:'CNPJ / CPF',w:'176px',html:f=>`<span class="num soft">${esc(f.doc)}</span>`},
       {h:'Contato',w:'224px',html:f=>`<div class="gs-d"><span class="num">${esc(f.tel||'—')}</span><span class="gs-sub" title="${esc(f.email||'')}">${esc(f.email||'')}</span></div>`},
       {h:'Marcas',w:'192px',html:f=>f.marcas.length?`<span class="soft" title="${esc(f.marcas.join(', '))}">${esc(f.marcas.join(', '))}</span>`:'<span class="faint">—</span>'},
       {h:'Situação',w:'112px',html:f=>U.chip(f.situacao,f.situacao==='Ativo'?'g':'r')}]},{flex:240})};
  const draw=()=>{const box=$('#gs-comp',v);box.innerHTML=compTab===0?comprarHTML():compTab===1?pedidosHTML():fornHTML();
    M.wire(v,H);
    if(compTab===0){const pz=$('#gs-prazo',box);if(pz)pz.oninput=()=>{comprarHTML.prazo=pz.value};
     $$('[id^="gs-g-"]',box).forEach(sec=>{const fid=sec.id.slice(5),rows=G.fila.filter(q=>q.forn===fid&&(!F.neg||(F.neg==='__est'?!q.obra:q.obra===F.neg)));
      const vis=abertoG.has(fid)||rows.length<=4?rows:rows.slice(0,4), all=$('[data-checkall]',sec), cs=$$('[data-check]',sec);
      cs.forEach(c=>{const q=vis[+c.dataset.check];c.checked=sel.has(q.id);c.onchange=()=>{c.checked?sel.add(q.id):sel.delete(q.id);draw()}});
      all.setAttribute('aria-label','Selecionar todos de '+fornNome(fid));all.checked=vis.length&&vis.every(q=>sel.has(q.id));
      all.onchange=()=>{vis.forEach(q=>all.checked?sel.add(q.id):sel.delete(q.id));draw()}})}};
  const H={
   repo:()=>M.modal({title:'Reposição de estoque',sub:'Coloca um produto do estoque na fila de A comprar, sem obra.',width:'640px',ok:'Adicionar à fila',
     fields:[{k:'sku',label:'Produto',type:'select',req:true,span:12,opts:G.prod.map(p=>[p.sku,`${p.nome} · disponível ${disp(p)}${p.min?' · mínimo '+p.min:''}`]),ph:'Escolher…'},
       {k:'q',label:'Quantidade',type:'number',req:true,span:6,value:'1'},{k:'forn',label:'Fornecedor',type:'select',span:6,opts:D.fornecedores.map(f=>[f.id,f.nome]),ph:'Sem fornecedor'}],
     onOk:x=>{const p=prodBy(x.sku),q=parseInt(x.q,10)||0;if(q<1){M.toast('Informe a quantidade.');return false}
       G.fila.push({id:nid('q'),sku:p.sku,nome:p.nome,q,custo:p.custo,obra:'',forn:x.forn||p.forn||null});
       compTab===0?draw():clickTab(v,0);M.toast(`${p.nome} · ${q} ${p.un} na fila de A comprar.`)}}),
   avulso:()=>avulsoModal(n=>{compTab===1?draw():clickTab(v,1);const p=G.ped.find(x=>x.n===n);setTimeout(()=>pedidoSheet(p,draw),360)}),
   novoForn:()=>fornecedorModal(null,draw),
   forn:tr=>fornecedorModal(fornHTML.rows[+tr.dataset.i],draw),
   ped:tr=>pedidoSheet(pedidosHTML.rows[+tr.dataset.i],draw),
   abrirPed:el=>pedidoSheet(pedidosHTML.rows[+el.closest('tr').dataset.i],draw),
   expand:el=>{const f=el.dataset.f;abertoG.has(f)?abertoG.delete(f):abertoG.add(f);draw()},
   definir:el=>{const q=G.fila.find(x=>x.id===el.dataset.q);M.menu(el,D.fornecedores.filter(f=>f.situacao==='Ativo').map(f=>({label:f.nome,icon:'compras',run:()=>{q.forn=f.id;draw();M.toast(`${q.nome} agora sai pela ${f.nome}.`)}})))},
   usar:el=>{const q=G.fila.find(x=>x.id===el.dataset.q),p=prodBy(q.sku),dep=(Object.entries(p.dep).sort((a,b)=>b[1]-a[1])[0]||['d1'])[0],u=Math.min(q.q,disp(p));
     const r={obra:q.obra,q:u,dep};p.res.push(r);const antes=q.q;q.q-=u;const tirou=q.q<=0;if(tirou)G.fila.splice(G.fila.indexOf(q),1);sel.delete(q.id);draw();
     M.toast(`${u} ${p.un} reservados do estoque para ${obraTxt(q.obra)}.${tirou?' Item saiu da fila.':` Faltam ${q.q} para comprar.`}`,'Desfazer',()=>{p.res.splice(p.res.indexOf(r),1);q.q=antes;if(tirou)G.fila.push(q);draw()})},
   repor:el=>{const p=prodBy(el.dataset.sku);if(G.fila.find(q=>q.sku===p.sku&&!q.obra))return M.toast(`${p.nome} já está na fila de reposição.`);
     G.fila.push({id:nid('q'),sku:p.sku,nome:p.nome,q:p.min-disp(p),custo:p.custo,obra:'',forn:p.forn});draw();M.toast(`${p.nome} · ${p.min-disp(p)} ${p.un} na fila de A comprar.`)},
   limpar:()=>{sel.clear();draw()},
   gerarPed:()=>{const its=G.fila.filter(q=>sel.has(q.id)),prazo=Math.max(1,parseInt($('#gs-prazo',v).value,10)||10),_p=(comprarHTML.prazo=prazo),fs=[...new Set(its.map(q=>q.forn))];
     let n=Math.max(...G.ped.map(p=>p.n));
     fs.forEach(fid=>{G.ped.push({n:++n,data:HOJE,forn:fid,prazo,status:'Rascunho',itens:its.filter(q=>q.forn===fid).map(q=>({sku:q.sku,nome:q.nome,obra:q.obra,q:q.q,rec:0,custo:q.custo})),receb:[]})});
     its.forEach(q=>G.fila.splice(G.fila.indexOf(q),1));sel.clear();draw();
     M.toast(`${fs.length} pedido${fs.length>1?'s':''} criado${fs.length>1?'s':''} em Rascunho.`,'Ver pedidos',()=>clickTab(v,1))}};
  $('[data-tabs]',v).addEventListener('tab',e=>{compTab=e.detail;right();draw()});
  right();draw();
 }}}});

/* =====================================================================
   ESTOQUE
   ===================================================================== */
M.screen('estoque',{title:'Estoque',dock:'estoque',
 help:['Saldo mostra o físico, o reservado para obras e o disponível de cada produto.',
  'Movimentos lista entradas, saídas e transferências, sempre com o motivo.',
  'Abaixo do mínimo aponta o que precisa repor; “Repor” manda o item para a fila de Compras.',
  'O botão azul registra um movimento manual e já altera o saldo.'],
 variants:{A:{label:'Atual',
 render:()=>U.page({kick:`${G.deps.filter(d=>d.ativo).length} depósitos ativos`,title:'Estoque',sub:'O que a empresa tem guardado, o que já está reservado para obras e o que precisa repor.',acts:[{label:'Movimento manual',icon:'mais',act:'mov',pri:true}]})+
   U.bar(U.tabs(['Saldo','Movimentos','Reservas por obra','Abaixo do mínimo','Depósitos'],0,'Seções do Estoque'),`<span class="gs-fr" id="gs-er"></span>`)+`<div id="gs-est"></div>`,
 mount:v=>{let tab=0;const F={q:'',so:false};
  const right=()=>{const r=$('#gs-er',v);r.innerHTML=tab===0?U.search('Buscar produto, código, modelo…','gs-eq','320px')+`<label class="btn ctl gs-chk" style="width:256px"><input type="checkbox" id="gs-eso" ${F.so?'checked':''}>só com saldo ou reserva</label>`:'';
    if(tab===0){const q=$('#gs-eq',r);q.value=F.q;q.oninput=()=>{F.q=q.value;draw()};$('#gs-eso',r).onchange=e=>{F.so=e.target.checked;draw()}}};
  const prodCell=p=>`<div class="gs-d"><b title="${esc(p.nome)}">${esc(p.nome)}</b><span class="gs-sub" style="font-family:var(--mono)">${esc(p.sku)}</span></div>`;
  const draw=()=>{const box=$('#gs-est',v);let h='';
   if(tab===0){const q=F.q.toLowerCase(),L=G.prod.filter(p=>(!q||(p.nome+' '+p.sku).toLowerCase().includes(q))&&(!F.so||fis(p)>0||resv(p)>0));
    h=U.kpis([{label:'Produtos em estoque',value:String(G.prod.filter(p=>fis(p)>0).length)},{label:'Valor em estoque',value:brl(sum(G.prod,p=>fis(p)*p.custo)),sub:'pelo custo médio'},
      {label:'Reservado para obras',value:brl(sum(G.prod,p=>resv(p)*p.custo)),sub:`${sum(G.prod,p=>p.res.length)} reservas`},{label:'Abaixo do mínimo',value:String(G.prod.filter(p=>p.min>0&&disp(p)<p.min).length),tone:'w',chip:'repor',act:'irMin'}],4)+
     TB({rows:L,empty:{title:'Nenhum produto encontrado.',text:'Tente outro nome, código ou modelo.'},cols:[{h:'Produto',html:prodCell},
      {h:'Depósitos',html:p=>{const t=Object.entries(p.dep).filter(e=>e[1]).map(([d,n])=>`${depNome(d)} ${n}`).join(' · ')||'—';return `<span class="soft" title="${esc(t)}">${esc(t)}</span>`}},
      {h:'Físico',r:true,w:'72px',html:p=>String(fis(p))},{h:'Reservado',r:true,w:'88px',html:p=>resv(p)?`<span class="warn">${resv(p)}</span>`:'0'},
      {h:'Disponível',r:true,w:'88px',html:p=>`<b>${disp(p)}</b>`},{h:'Custo médio',r:true,w:'128px',html:p=>brl(p.custo)},
      {h:'Mínimo',r:true,w:'112px',html:p=>p.min?(disp(p)<p.min?`${U.chip('abaixo','w')} ${p.min}`:String(p.min)):'<span class="faint">—</span>'}]},{flex:440})}
   else if(tab===1)h=TB({rows:G.emov,empty:{title:'Nenhum movimento ainda.'},cols:[{h:'Quando',w:'136px',html:m=>`<span class="num soft">${d3(m.data.slice(0,10))} ${m.data.slice(11)}</span>`},
      {h:'Tipo',w:'120px',html:m=>U.chip(m.tipo,m.tipo==='Entrada'?'g':m.tipo==='Saída'?'r':'b')},{h:'Produto',html:m=>{const p=prodBy(m.sku);return p?prodCell(p):esc(m.sku)}},
      {h:'Qtd',r:true,w:'72px',html:m=>`<b class="${m.tipo==='Saída'?'neg':m.tipo==='Entrada'?'pos':''}">${m.tipo==='Saída'?'− ':m.tipo==='Entrada'?'+ ':''}${m.q}</b>`},
      {h:'Depósito',html:m=>{const t=depNome(m.dep)+(m.para?' → '+depNome(m.para):'');return `<span class="soft" title="${esc(t)}">${esc(t)}</span>`}},{h:'Motivo',html:m=>`<span class="soft" title="${esc(m.motivo)}">${esc(m.motivo)}</span>`}]},{flex:600});
   else if(tab===2){const R=[];G.prod.forEach(p=>p.res.forEach(r=>R.push({p,r})));const os=[...new Set(R.map(x=>x.r.obra))];
    h=TB({rows:R,groups:os.map(o=>({title:obraNome(o)||'Sem obra',rows:R.filter(x=>x.r.obra===o)})),empty:{title:'Nenhuma reserva.',text:'Reservas nascem quando um item de obra é atendido pelo estoque ou recebido de um pedido.'},
      cols:[{h:'Produto',html:x=>prodCell(x.p)},{h:'Depósito',w:'200px',html:x=>`<span class="soft" title="${esc(depNome(x.r.dep))}">${esc(depNome(x.r.dep))}</span>`},{h:'Reservado',r:true,w:'112px',html:x=>`<b>${x.r.q}</b> <span class="lbl">${x.p.un}</span>`},
       {h:'Valor',r:true,w:'136px',html:x=>brl(x.r.q*x.p.custo)},{h:'',w:'152px',r:true,html:(x,i)=>U.btn('Liberar',{sm:true,act:'liberar',w:'152px',attrs:`data-i="${i}"`})}]},{flex:240});draw.R=R}
   else if(tab===3){const L=G.prod.filter(p=>p.min>0&&disp(p)<p.min);
    h=TB({rows:L,empty:{title:'Nada abaixo do mínimo.',text:'Todos os produtos com mínimo definido estão acima dele.'},cols:[{h:'Produto',html:prodCell},
      {h:'Disponível',r:true,w:'112px',html:p=>`<span class="warn">${disp(p)}</span>`},{h:'Mínimo',r:true,w:'112px',html:p=>String(p.min)},{h:'Falta',r:true,w:'96px',html:p=>`<b>${p.min-disp(p)}</b>`},
      {h:'Fornecedor',w:'184px',html:p=>`<span class="soft" title="${esc(fornNome(p.forn))}">${esc(fornNome(p.forn))}</span>`},
      {h:'',w:'152px',r:true,html:p=>G.fila.find(q=>q.sku===p.sku&&!q.obra)?U.chip('na fila de compras','b'):U.btn(`Repor ${p.min-disp(p)}`,{sm:true,act:'repor',w:'152px',attrs:`data-sku="${esc(p.sku)}"`})}]},{flex:240})}
   else h=TB({rows:G.deps,cols:[{h:'Depósito',html:d=>`<div class="row" style="gap:8px;flex-wrap:nowrap;min-width:0"><b style="font-weight:600;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${esc(d.nome)}">${esc(d.nome)}</b>${d.padrao?U.chip('padrão','b'):''}${d.ativo?'':U.chip('inativo','n')}</div>`},
      {h:'Produtos',r:true,w:'112px',html:d=>String(G.prod.filter(p=>p.dep[d.id]>0).length)},{h:'Unidades',r:true,w:'112px',html:d=>String(sum(G.prod,p=>p.dep[d.id]||0))},
      {h:'',w:'var(--gs-actw)',r:true,html:d=>d.padrao?'':`<div class="gs-acts"><span class="gs-wid" style="display:contents">${!d.ativo?'<span style="width:152px"></span>':U.btn('Tornar padrão',{sm:true,act:'padrao',w:'152px',attrs:`data-d="${d.id}"`})}${U.btn(d.ativo?'Desativar':'Reativar',{sm:true,act:'ativo',w:'152px',attrs:`data-d="${d.id}"`})}</span>${U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Ações do depósito',act:'maisD',attrs:`data-d="${d.id}"`}).replace('class="btn','class="gs-nar btn')}</div>`}]},{flex:240,aw:[312,36]})+
     `<section class="card rv mt24" style="--d:4"><div class="ch"><h2>Novo depósito</h2></div><div class="mt16" style="display:grid;grid-template-columns:minmax(0,1fr) 144px;gap:12px"><input class="input" id="gs-ndep" placeholder="Novo depósito (ex.: Carro do técnico)" aria-label="Nome do novo depósito">${U.btn('Criar',{act:'criarDep',w:'144px'})}</div></section>`;
   box.innerHTML=h;M.wire(v,H);
   const nd=$('#gs-ndep',box);if(nd)nd.onkeydown=e=>{if(e.key==='Enter')H.criarDep()}};
  const H={
   irMin:()=>clickTab(v,3),
   maisD:el=>{const d=G.deps.find(x=>x.id===el.dataset.d);M.menu(el,[...(d.ativo?[{label:'Tornar padrão',icon:'check',run:()=>H.padrao(el)}]:[]),{label:d.ativo?'Desativar':'Reativar',icon:d.ativo?'x':'trocar',danger:d.ativo,run:()=>H.ativo(el)}])},
   mov:()=>{const deps=G.deps.filter(d=>d.ativo).map(d=>[d.id,d.nome]);
    const {el}=M.modal({title:'Movimento manual',sub:'Entrada, saída ou transferência fora de pedido e de obra.',ok:'Registrar',
     fields:[{k:'sku',label:'Produto',type:'select',req:true,span:12,opts:G.prod.map(p=>[p.sku,`${p.nome} · ${p.sku}`]),ph:'Escolher…'},
      {k:'tipo',label:'Tipo',type:'select',req:true,span:4,opts:['Entrada','Saída','Transferência'],value:'Entrada'},{k:'q',label:'Quantidade',type:'number',req:true,span:4,value:'1'},
      {k:'custo',label:'Custo unitário (entrada)',type:'money',span:4},
      {k:'de',label:'Depósito',type:'select',req:true,span:6,opts:deps,value:(G.deps.find(d=>d.padrao)||{}).id},{k:'para',label:'Para (transferência)',type:'select',span:6,opts:deps,ph:'—'},
      {k:'motivo',label:'Motivo',req:true,span:12,ph:'Ex.: Ajuste de inventário',help:'Pelo menos 3 letras.'}],
     onOk:x=>{const p=prodBy(x.sku),q=parseInt(x.q,10)||0;
      if(q<1){M.toast('A quantidade precisa ser pelo menos 1.');return false}
      if(x.motivo.length<3){M.toast('Escreva o motivo (pelo menos 3 letras).');return false}
      if(x.tipo!=='Entrada'&&(p.dep[x.de]||0)<q){M.toast(`${depNome(x.de)} só tem ${p.dep[x.de]||0} ${p.un} de ${p.nome}.`);return false}
      if(x.tipo==='Transferência'&&(!x.para||x.para===x.de)){M.toast('Escolha o depósito de destino, diferente da origem.');return false}
      if(x.tipo==='Entrada'){const c=num(x.custo),f0=fis(p);if(c>0)p.custo=r2((p.custo*f0+c*q)/(f0+q));p.dep[x.de]=(p.dep[x.de]||0)+q}
      else if(x.tipo==='Saída')p.dep[x.de]-=q;
      else{p.dep[x.de]-=q;p.dep[x.para]=(p.dep[x.para]||0)+q}
      G.emov.unshift({data:HOJE+' '+new Date().toTimeString().slice(0,5),tipo:x.tipo,sku:p.sku,q,dep:x.de,para:x.tipo==='Transferência'?x.para:'',motivo:x.motivo});
      draw();M.toast(`${x.tipo} de ${q} ${p.un} registrada. Disponível agora: ${disp(p)}.`,tab===1?'':'Ver movimentos',()=>clickTab(v,1))}});
    const tp=$('[name=tipo]',el),sync=()=>{$('[name=para]',el).closest('.field').style.opacity=tp.value==='Transferência'?1:.4;$('[name=custo]',el).closest('.field').style.opacity=tp.value==='Entrada'?1:.4};tp.onchange=sync;sync()},
   liberar:el=>{const x=draw.R[+el.dataset.i];M.confirm({title:'Liberar a reserva?',text:`${x.r.q} ${x.p.un} de ${x.p.nome} voltam a ficar disponíveis (${obraNome(x.r.obra)}).`,ok:'Liberar',
     run:()=>{x.p.res.splice(x.p.res.indexOf(x.r),1);draw();M.toast('Reserva liberada.')}})},
   repor:el=>{const p=prodBy(el.dataset.sku);G.fila.push({id:nid('q'),sku:p.sku,nome:p.nome,q:p.min-disp(p),custo:p.custo,obra:'',forn:p.forn});draw();
     M.toast(`${p.nome} · ${p.min-disp(p)} ${p.un} na fila de A comprar.`,'Abrir Compras',()=>go('#/compras'))},
   padrao:el=>{G.deps.forEach(d=>d.padrao=d.id===el.dataset.d);draw();M.toast(`${depNome(el.dataset.d)} agora é o depósito padrão.`)},
   ativo:el=>{const d=G.deps.find(x=>x.id===el.dataset.d);
     if(d.ativo&&sum(G.prod,p=>p.dep[d.id]||0)>0)return M.confirm({title:`Desativar ${d.nome}?`,text:'Ainda há produtos nele. Eles continuam no saldo, mas o depósito some das escolhas.',ok:'Desativar',run:()=>{d.ativo=false;draw();M.toast('Depósito desativado.')}});
     d.ativo=!d.ativo;draw();M.toast(d.ativo?'Depósito reativado.':'Depósito desativado.')},
   criarDep:()=>{const i=$('#gs-ndep',v),n=i.value.trim();if(n.length<3){M.toast('Dê um nome ao depósito (pelo menos 3 letras).');i.focus();return}
     if(G.deps.find(d=>d.nome.toLowerCase()===n.toLowerCase()))return M.toast('Já existe um depósito com esse nome.');
     G.deps.push({id:nid('d'),nome:n,padrao:false,ativo:true});draw();M.toast(`Depósito ${n} criado.`)}};
  $('[data-tabs]',v).addEventListener('tab',e=>{tab=e.detail;right();draw()});
  right();draw();
 }}}});
})();

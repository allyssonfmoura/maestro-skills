/* Maestro OS · celular · Gestão — Financeiro (+ Resultado, Previsto x Realizado, Conciliação, Contratos), Compras, Estoque.
   Mesmo estado do computador (window.__gs, igual ao mod-gestao.js): títulos, contas, contratos, fila, pedidos, estoque.
   Padrão da tela-modelo (cel-inicio.js): título grande, listas agrupadas, deslizar = ações rápidas, folhas que sobem. */
(function(){
const {ic,brl,esc,$,$$}=M, K=M.m, D=M.D;

/* ---------- estilo só desta área (prefixo cg-) ---------- */
if(!document.getElementById('cg-css'))document.head.insertAdjacentHTML('beforeend',`<style id="cg-css">
.cg-ib{width:44px;height:44px;border:0;border-radius:999px;background:transparent;color:rgb(var(--primary));display:grid;place-items:center;flex:none;margin:-10px -10px -10px 0}
.cg-th{display:flex;align-items:center;gap:8px}.cg-th .tl{flex:1;min-width:0}
.cg-chartb{display:block;width:100%;border:0;padding:0;margin:0;background:transparent;color:inherit;text-align:left}
.cg-chart{display:block;width:100%;margin-top:8px}.cg-chart svg{display:block}
.cg-leg{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:10px;font-size:13px;color:var(--soft)}
.cg-leg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:-1px}
.cg-note{margin:0 0 4px;font-size:15px;color:var(--soft);line-height:1.45}.cg-note b{color:var(--text);font-variant-numeric:tabular-nums}
.cg-tags{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 16px}
.cg-wrap .t2,.cg-wrap .t1{white-space:normal}
.cg-sel{position:fixed;z-index:45;left:12px;right:12px;bottom:calc(84px + env(safe-area-inset-bottom));display:flex;align-items:center;gap:6px;padding:6px 6px 6px 16px;border-radius:18px;background:var(--elev);box-shadow:0 12px 30px -10px rgba(0,0,0,.35),0 0 0 .5px var(--line)}
.cg-sel[hidden]{display:none}
.cg-sel span{flex:1;min-width:0;display:flex;flex-direction:column}.cg-sel span b{font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cg-sel span small{font-size:13px;color:var(--soft);font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cg-sel button{height:44px;border:0;border-radius:12px;padding:0 12px;font-size:15px;font-weight:600;flex:none;background:transparent;color:rgb(var(--primary))}
.cg-sel button.p{background:rgb(var(--primary));color:#fff}
.cg-pad{height:76px}
.rw .mic.cg-ck{width:26px;height:26px;margin:0 7px;border-radius:999px;background:transparent!important;box-shadow:inset 0 0 0 2px var(--faint);color:transparent}
.rw .mic.cg-ck.on{background:rgb(var(--primary))!important;box-shadow:none;color:#fff}
.cg-step{display:flex;align-items:center;gap:6px;flex:none}
.cg-step button{width:44px;height:44px;border:0;border-radius:12px;background:color-mix(in srgb,var(--text) 7%,transparent);color:rgb(var(--primary));font-size:22px;font-weight:600;display:grid;place-items:center}
.cg-step b{min-width:32px;text-align:center;font-size:17px;font-variant-numeric:tabular-nums}
.cg-big{font-size:30px;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums;margin:2px 0 4px}
.cg-mono{font-family:var(--mono);font-size:13px}
.cg-gap{margin-top:12px}
.cg-ctl{margin-bottom:12px}
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
const pl=(n,a,b)=>n===1?a:b;
const chip=(t,tone='')=>`<span class="chip ${tone}">${esc(t)}</span>`;
const rr=()=>dispatchEvent(new HashChangeEvent('hashchange'));
const MESES_N=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const MES3=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const PLANO_REC=['Receita de projetos','Receita de serviços recorrentes','Receita de produtos'];
const PLANO_PAG=['Compra de materiais','Folha de pagamento','Aluguel','Serviços contábeis','Tarifas bancárias','Combustível e deslocamento','Software e assinaturas','Marketing'];
/* linha só de leitura (sem toque) e grupo dessas linhas */
const kv=(l,v,sub='',v2='')=>`<li><div class="rw"><span class="tx"><span class="t1">${l}</span>${sub?`<span class="t2">${sub}</span>`:''}</span>${v!=null&&v!==''?`<span class="vl"><b>${v}</b>${v2}</span>`:''}</div></li>`;
const kvg=(title,rows,foot='',cls='')=>rows.length?`<section class="grp ${cls}">${title?`<h2>${esc(title)}</h2>`:''}<ul class="lst">${rows.join('')}</ul>${foot?`<div class="foot">${foot}</div>`:''}</section>`:'';
const setPick=(root,id,v)=>$$('#'+id+' button',root).forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===String(v)));
/* folha de formulário com conteúdo antes/depois dos campos */
const fs=(o,pre='',post='')=>{const s=K.formSheet(o);const mf=$('.mf',s.el);if(pre)mf.insertAdjacentHTML('beforebegin',pre);if(post)mf.insertAdjacentHTML('afterend',post);return s};
const motivoSheet=(title,ctx,ok,run)=>K.formSheet({title,ok,cheia:false,groups:[{title:ctx,fields:[{k:'motivo',label:'Motivo',type:'textarea',req:true,ph:'Escreva o motivo'}]}],onOk:v=>run(v.motivo)});

/* =====================================================================
   ESTADO (o mesmo do computador: window.__gs)
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
   FINANCEIRO · regras dos títulos (iguais ao computador)
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
function statusCurto(t){
  if(t.status==='paid')return 'baixa '+d2(t.baixa);if(t.status==='canceled')return t.tipo==='rec'?'distrato':t.recusado?'recusado':'cancelado';
  if(t.status==='replaced')return 'renegociado';if(t.status==='pending')return 'aprovação';
  const n=dias(t.venc,HOJE);return n>0?'há '+n+(n>1?' dias':' dia'):n===0?'vence hoje':'vence '+d2(t.venc)}
const toneT=t=>t.status==='pending'?'warn':grupo(t)===0?'neg':grupo(t)===1?'warn':t.status==='paid'?'pos':'';
const subTit=t=>[t.contato,obraNome(t.obra),t.parc?'parcela '+t.parc:''].filter(Boolean).join(' · ');
function sinais(t){const s=[];
  if(t.status==='pending')s.push(chip('Aguarda aprovação','w'));
  if(t.tipo==='rec'&&!t.obra&&isOpen(t))s.push(chip('Sem obra'));
  if(t.tipo==='rec'&&t.semEmail&&isOpen(t))s.push(chip('Contato sem e-mail','w'));
  if(t.aviso&&t.avisoOld&&isOpen(t))s.push(chip('Aviso desatualizado','w'));
  if(t.nf)s.push(chip('NF '+t.nf.numero,'g'));return s}
const swTit=t=>t.status==='pending'?[{label:'Aprovar',icon:'check',act:'aprovar',tone:4},{label:'Recusar',icon:'x',act:'recusar',tone:3}]
  :t.status==='open'?[{label:t.tipo==='rec'?'Receber':'Pagar',icon:'check',act:'baixa',tone:4},
    t.tipo==='rec'?(t.aviso?{label:'Copiar link',icon:'copiar',act:'copiar',tone:1}:{label:'Gerar aviso',icon:'enviar',act:'aviso',tone:1}):{label:t.nf?'NF '+t.nf.numero:'NF',icon:'doc',act:'nf',tone:1}]:null;
const titRow=t=>({title:esc(t.desc),sub:esc(subTit(t)),value:brl(isOpen(t)&&t.pago>0?resta(t):t.valor),value2:`<span class="${toneT(t)}">${esc(statusCurto(t))}</span>`,href:'#/financeiro?tit='+t.id,i:t.id,swipe:swTit(t)});
function previsao(){
  const fim=addDias(HOJE,29), ent=sum(abertos('rec').filter(t=>t.venc<=fim),resta), sai=sum(G.tit.filter(t=>t.tipo==='pag'&&isOpen(t)&&t.venc<=fim),resta);
  const labels=['out','nov','dez','jan','fev','mar'], E=[ent,180400,95200,150300,175800,160100], S=[sai,140200,168400,130500,128300,135600];
  const net=E.map((e,i)=>r2(e-S[i])), saldo=[]; let s=sum(G.contas,c=>c.saldo); net.forEach(n=>{s+=n;saldo.push(r2(s))});
  return {labels,E,S,net,saldo,ent,sai}}

/* ---------- gráfico: barras (resultado do mês) + linha (saldo); mede a largura, redesenha ao girar o celular ---------- */
const CH={};let chN=0;
const slot=(spec,h=200)=>{const id='cgc'+(++chN);CH[id]=spec;return `<span class="cg-chart" data-ch="${id}" style="height:${h}px"></span>`};
function graficos(root){$$('.cg-chart[data-ch]',root).forEach(el=>{const sp=CH[el.dataset.ch];if(!sp||el._ro)return;
  const paint=()=>{if(!el.isConnected){el._ro&&el._ro.disconnect&&el._ro.disconnect();return}desenha(el,sp)};paint();
  el._ro=window.ResizeObserver?new ResizeObserver(paint):1;if(el._ro.observe)el._ro.observe(el)})}
function desenha(el,{labels,net,saldo}){
  const w=Math.round(el.clientWidth),h=Math.round(el.clientHeight);if(w<40||h<40||el._wh===w+'x'+h)return;el._wh=w+'x'+h;
  const all=[...net,...(saldo||[]),0],nt=4;
  const nice=r=>{const p=10**Math.floor(Math.log10(r||1)),m=r/p;return (m<=1?1:m<=2?2:m<=2.5?2.5:m<=5?5:10)*p};
  const st=nice((Math.max(...all)-Math.min(...all))/nt),lo=Math.floor(Math.min(...all)/st)*st,hi=Math.ceil(Math.max(...all)/st)*st;
  const k=v=>{if(Math.abs(v)<1e-6)return '0';const a=Math.abs(v),sg=v<0?'−':'';return sg+(a>=1e6?(a/1e6).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mi':a>=1000?Math.round(a/1000)+' mil':String(Math.round(a)))};
  const ticks=[];for(let v=lo;v<=hi+st/2;v+=st)ticks.push(v);
  const pL=Math.max(...ticks.map(t=>k(t).length))*7+12,pr=4,pt=10,pb=28,n=labels.length;
  const Y=v=>pt+(hi-v)/(hi-lo)*(h-pt-pb),bw=(w-pL-pr)/n,X=i=>pL+bw*i+bw/2,bwid=Math.max(6,Math.min(36,bw*.5)),pulo=Math.max(1,Math.ceil(34/bw)),f=x=>x.toFixed(1);
  const grid=ticks.map(v=>`<line x1="${pL}" x2="${w-pr}" y1="${f(Y(v))}" y2="${f(Y(v))}" style="stroke:var(--line)"/><text x="${pL-8}" y="${f(Y(v)+4)}" font-size="12" text-anchor="end" style="fill:var(--faint)">${k(v)}</text>`).join('');
  const bars=net.map((v,i)=>`<rect x="${f(X(i)-bwid/2)}" y="${f(Math.min(Y(v),Y(0)))}" width="${f(bwid)}" height="${f(Math.max(2,Math.abs(Y(v)-Y(0))))}" rx="4" style="fill:rgb(var(--${v<0?'neg':'pos'}));fill-opacity:.85"/>`).join('');
  const line=saldo?`<path d="${saldo.map((v,i)=>`${i?'L':'M'}${f(X(i))},${f(Y(v))}`).join(' ')}" fill="none" style="stroke:rgb(var(--primary))" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`+
    saldo.map((v,i)=>`<circle cx="${f(X(i))}" cy="${f(Y(v))}" r="4" style="fill:var(--panel);stroke:rgb(var(--${v<0?'neg':'primary'}))" stroke-width="2"/>`).join(''):'';
  const lab=labels.map((m,i)=>i%pulo?'':`<text x="${f(X(i))}" y="${h-8}" font-size="12" text-anchor="middle" style="fill:${net[i]<0?'rgb(var(--neg))':'var(--faint)'};font-weight:${net[i]<0?700:500}">${m}</text>`).join('');
  el.innerHTML=`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">${grid}<line x1="${pL}" x2="${w-pr}" y1="${f(Y(0))}" y2="${f(Y(0))}" style="stroke:var(--faint);stroke-opacity:.5"/>${bars}${line}${lab}</svg>`}
const legPrev=`<div class="cg-leg"><span><i style="background:rgb(var(--pos))"></i>Resultado do mês</span><span><i style="background:rgb(var(--neg))"></i>Mês negativo</span><span><i style="background:rgb(var(--primary))"></i>Saldo projetado</span></div>`;
const grafPrev=(aria)=>{const P=previsao();return `<button type="button" class="cg-chartb" data-act="prevDet" aria-label="${esc(aria)}: abrir os números mês a mês">${slot({labels:P.labels,net:P.net,saldo:P.saldo})}</button>${legPrev}`};
function prevSheet(){const P=previsao(),mes=['outubro','novembro','dezembro','janeiro','fevereiro','março'];
  K.sheet({title:'Previsão mês a mês',cancel:'Fechar',cheia:true,body:`<p class="cg-note" style="margin-bottom:16px">Entradas e saídas previstas, o resultado de cada mês e o saldo projetado das contas. Mês negativo em vermelho.</p>`+
    P.labels.map((m,i)=>kvg(mes[i],[kv('Entra',brl(P.E[i])),kv('Sai',brl(P.S[i])),kv('Resultado do mês',`<span class="${P.net[i]<0?'neg':'pos'}">${P.net[i]<0?'− ':''}${brl(Math.abs(P.net[i]))}</span>`),kv('Saldo projetado',brl(P.saldo[i]))])).join('')})}

/* ---------- folhas do Financeiro ---------- */
function novoTitulo(tipo,after,pre={}){
  const rec=tipo==='rec';
  const pessoas=rec?D.contatos.map(c=>c.nome):D.fornecedores.map(f=>f.nome).concat(['Imobiliária Savassi','Contabilidade Prado','Equipe']);
  const s=fs({title:rec?'Novo título':'Nova conta a pagar',ok:'Criar',groups:[
    {title:rec?'Cobrança para um cliente':'Conta da empresa',fields:[{k:'desc',label:'Descrição',req:true,value:pre.desc||'',ph:rec?'Ex.: Automação · Parcela':'Ex.: Compra de materiais'},
      {k:'valor',label:'Valor',type:'money',req:true,value:pre.valor?fmtIn(pre.valor):'',ph:'0,00'},
      {k:'emissao',label:rec?'Emissão':'Data da compra',type:'date',value:pre.data||HOJE},{k:'venc',label:'Vencimento',type:'date',req:true,value:pre.venc||addDias(HOJE,30)}]},
    {title:'Quem e onde',fields:[{k:'contato',label:rec?'Cliente':'Fornecedor',type:'select',opts:pessoas,ph:'Escolher',value:pre.contato||''},
      {k:'obra',label:'Obra',type:'select',opts:D.obras.map(o=>[o.id,o.nome]),ph:'Sem obra',value:''}]},
    {title:'Classificação',fields:[{k:'comp',label:'Competência',ph:'mm/aaaa',value:'10/2026'},{k:'plano',label:'Conta do plano',type:'select',req:true,opts:rec?PLANO_REC:PLANO_PAG,ph:'Escolher',value:pre.plano||''},
      {k:'conta',label:'Conta prevista',type:'select',opts:G.contas.map(c=>[c.id,c.nome]),value:pre.conta||'itau'}]},
    {title:'Parcelas',fields:[{k:'parc',label:'Parcelas',type:'number',value:'1'}],foot:'Uma por mês, a partir do vencimento.'}],
    onOk:v=>{const val=num(v.valor),n=Math.max(1,Math.min(60,parseInt(v.parc,10)||1));
      if(val<=0){M.toast('Informe um valor maior que zero.');return false}
      const base=Math.floor(val*100/n)/100,out=[];
      for(let i=0;i<n;i++){const t=T(nid('t'),tipo,v.desc,v.contato||(rec?'Cliente sem cadastro':'Fornecedor sem cadastro'),v.obra,n>1?`${i+1}/${n}`:'',i===n-1?r2(val-base*(n-1)):base,addMeses(v.venc,i),{emissao:v.emissao||HOJE,plano:v.plano,conta:v.conta});G.tit.push(t);out.push(t)}
      after&&after(out)}},'',kvg('Prévia',[kv('<span id="cg-prev"></span>','')]));
  const prev=()=>{const val=num($('[name=valor]',s.el).value),n=Math.max(1,parseInt($('[name=parc]',s.el).value,10)||1),vc=$('[name=venc]',s.el).value||HOJE,o=$('#cg-prev',s.el);
    if(val<=0){o.textContent='Informe o valor para ver as parcelas.';return}const base=Math.floor(val*100/n)/100;
    o.textContent=n===1?`1 parcela · ${brl(val)} · vence ${d3(vc)}`:`${n} parcelas de ${brl(base)} · de ${d3(vc)} a ${d3(addMeses(vc,n-1))}`};
  $('#cg-prev',s.el).closest('.t1').style.whiteSpace='normal';
  s.el.addEventListener('input',prev);prev();
}
function baixaSheet(t,after){
  const rec=t.tipo==='rec';
  const s=fs({title:rec?'Recebimento':'Pagamento',ok:'Lançar',groups:[
    {title:t.desc+' · '+t.contato,fields:[{k:'valor',label:'Valor',type:'money',req:true,value:fmtIn(resta(t))},{k:'data',label:'Data de caixa',type:'date',req:true,value:HOJE},
      {k:'conta',label:'Conta bancária',type:'select',req:true,opts:G.contas.map(c=>[c.id,c.nome]),value:t.conta||'itau'},
      {k:'plano',label:'Conta do plano',type:'select',req:true,opts:rec?PLANO_REC:PLANO_PAG,value:t.plano}],foot:'Valor menor que o que resta vira baixa parcial.'},
    {title:'Acréscimos e descontos',fields:[{k:'juros',label:'Juros',type:'money',ph:'0,00'},{k:'multa',label:'Multa',type:'money',ph:'0,00'},{k:'descto',label:'Desconto',type:'money',ph:'0,00'},{k:'tarifa',label:'Tarifa',type:'money',ph:'0,00'}]},
    {fields:[{k:'obs',label:'Observação',type:'textarea',ph:'Opcional'}]}],
    onOk:v=>{const val=num(v.valor);
      if(val<=0){M.toast('Informe um valor maior que zero.');return false}
      if(val>resta(t)+.001){M.toast(`O valor passa do que resta (${brl(resta(t))}).`);return false}
      const liq=calc();t.pago=r2(t.pago+val);t.plano=v.plano;t.conta=v.conta;
      if(t.pago>=t.valor-.005){t.status='paid';t.baixa=v.data}
      conta(v.conta).saldo=r2(conta(v.conta).saldo+(rec?liq:-liq));
      G.mov.unshift({data:v.data,desc:(rec?'Recebimento · ':'Pagamento · ')+t.contato,conta:v.conta,valor:rec?liq:-liq});
      M.toast(t.status==='paid'?`${rec?'Recebimento':'Pagamento'} lançado. O título foi para ${rec?'Concluídos e encerrados':'Pagos e encerrados'}.`:`Baixa parcial lançada. Resta ${brl(resta(t))}.`);
      after&&after()}},'',kvg('',[kv(rec?'Líquido creditado em conta':'Total debitado da conta','<span id="cg-liq"></span>')]));
  const calc=()=>{const f=k=>num($(`[name=${k}]`,s.el).value);const base=f('valor')+f('juros')+f('multa')-f('descto');return r2(rec?base-f('tarifa'):base+f('tarifa'))};
  const upd=()=>{$('#cg-liq',s.el).textContent=brl(calc())};s.el.addEventListener('input',upd);upd();
}
function nfSheet(t,after){K.formSheet({title:'Nota fiscal',ok:'Salvar',cheia:false,groups:[{title:t.desc+' · '+t.contato,fields:[{k:'numero',label:'Número',req:true,value:t.nf?t.nf.numero:''},
  {k:'data',label:'Emissão',type:'date',req:true,value:t.nf?t.nf.data:HOJE},{k:'valor',label:'Valor',type:'money',req:true,value:fmtIn(t.nf?t.nf.valor:t.valor)}]}],
  onOk:v=>{t.nf={numero:v.numero,data:v.data,valor:num(v.valor)};M.toast('NF '+v.numero+' registrada no título.');after&&after()}})}
function editarSheet(t,after){const rec=t.tipo==='rec';
  K.formSheet({title:'Editar título',ok:'Salvar',groups:[{title:t.contato,fields:[{k:'desc',label:'Descrição',req:true,value:t.desc},{k:'valor',label:'Valor',type:'money',req:true,value:fmtIn(t.valor)},
    {k:'venc',label:'Vencimento',type:'date',req:true,value:t.venc},{k:'plano',label:'Conta do plano',type:'select',req:true,opts:rec?PLANO_REC:PLANO_PAG,value:t.plano},
    {k:'obra',label:'Obra',type:'select',opts:D.obras.map(o=>[o.id,o.nome]),ph:'Sem obra',value:t.obra||''},{k:'conta',label:'Conta prevista',type:'select',opts:G.contas.map(c=>[c.id,c.nome]),value:t.conta}]}],
    onOk:v=>{const val=num(v.valor);if(val<t.pago){M.toast('O valor não pode ficar abaixo do que já foi baixado.');return false}
      Object.assign(t,{desc:v.desc,valor:val,venc:v.venc,plano:v.plano,obra:v.obra,conta:v.conta});if(t.aviso)t.avisoOld=true;
      M.toast(t.aviso?'Título salvo. O aviso enviado ficou desatualizado: regere o link.':'Título salvo.');after&&after()}})}
function transferSheet(after,de){K.formSheet({title:'Transferir',ok:'Transferir',groups:[{title:'Entre contas da empresa',fields:[
  {k:'de',label:'De',type:'select',req:true,opts:G.contas.map(c=>[c.id,`${c.nome} · ${brl(c.saldo)}`]),value:de||'itau'},{k:'para',label:'Para',type:'select',req:true,opts:G.contas.map(c=>[c.id,c.nome]),value:de==='cofre'?'itau':'cofre'},
  {k:'valor',label:'Valor',type:'money',req:true,ph:'0,00'},{k:'data',label:'Data',type:'date',req:true,value:HOJE},{k:'obs',label:'Observação',type:'textarea',ph:'Opcional'}]}],
  onOk:v=>{const val=num(v.valor);if(v.de===v.para){M.toast('Escolha contas diferentes.');return false}if(val<=0){M.toast('Informe um valor maior que zero.');return false}
    conta(v.de).saldo=r2(conta(v.de).saldo-val);conta(v.para).saldo=r2(conta(v.para).saldo+val);
    G.mov.unshift({data:v.data,desc:`Transferência · ${conta(v.de).nome} → ${conta(v.para).nome}`,conta:v.de,valor:val,tr:true});
    M.toast(`${brl(val)} transferidos de ${conta(v.de).nome} para ${conta(v.para).nome}.`);after&&after()}})}
function faturaSheet(after){const c=G.cartao,total=r2(sum(c.compras,x=>x[2])-c.pago);
  if(total<=0)return M.toast('A fatura de '+c.ref+' já está paga.');
  fs({title:'Fatura do cartão',ok:'Pagar',groups:[{title:'Pagamento',fields:[{k:'agora',label:'A pagar agora',type:'money',req:true,value:fmtIn(total)},
    {k:'conta',label:'Pagar da conta',type:'select',req:true,opts:G.contas.map(x=>[x.id,x.nome]),value:'itau'},{k:'data',label:'Data',type:'date',req:true,value:HOJE}],foot:'Pode pagar parte agora e o resto depois.'}],
    onOk:v=>{const val=num(v.agora);if(val<=0||val>total+.001){M.toast(`Informe um valor entre R$ 0,01 e ${brl(total)}.`);return false}
      c.pago=r2(c.pago+val);conta(v.conta).saldo=r2(conta(v.conta).saldo-val);G.mov.unshift({data:v.data,desc:'Pagamento da fatura · '+c.nome,conta:v.conta,valor:-val});
      M.toast(`Fatura paga: ${brl(val)} da conta ${conta(v.conta).nome}.`);after&&after()}},
    kvg(`${c.nome} · fora do consolidado`,[...c.compras.map(x=>kv(esc(x[1]),brl(x[2]),x[0])),...(c.pago?[kv('Já pago','− '+brl(c.pago))]:[]),kv('<b>Total</b>',brl(total))],`Fatura ${esc(c.ref)} · fecha ${d2(c.fecha)} · vence ${d2(c.vence)}`))}
const movRow=(m)=>{const [tp,...rest]=m.desc.split(' · ');return {icon:m.tr?'⇄':m.valor<0?'−':'+',color:m.tr?'#8e8e93':m.valor<0?'rgb(var(--neg))':'rgb(var(--pos))',title:esc(rest.length?rest.join(' · '):tp),sub:`${rest.length?esc(tp)+' · ':''}${d2(m.data)} · ${esc(conta(m.conta).nome)}`,
  value:`<span class="${m.tr||m.valor<0?'':'pos'}">${brl(Math.abs(m.valor))}</span>`,act:'conta',i:m.conta}};
function contaSheet(c,after){const ms=G.mov.filter(m=>m.conta===c.id).slice(0,8);let s;
  s=K.sheet({title:c.nome,cancel:'Fechar',body:`<p class="cg-note">${esc(c.tipo)}</p><div class="cg-big">${G.oculto?'R$ ••••••':brl(c.saldo)}</div><p class="cg-note" style="margin-bottom:16px">Saldo de hoje</p>
    ${kvg('Últimas movimentações',ms.map(m=>kv(esc(m.desc),`<span class="${m.tr||m.valor<0?'':'pos'}">${m.valor<0?'− ':'+ '}${brl(Math.abs(m.valor))}</span>`,d2(m.data))))||'<p class="cg-note">Nenhuma movimentação recente.</p>'}
    ${K.btn('Transferir desta conta',{pri:true,act:'tr',icon:'trocar'})}`,on:{tr:()=>{s.close();setTimeout(()=>transferSheet(after,c.id),200)}}})}
function contasSheet(after){let s;
  s=K.sheet({title:'Contas',cancel:'Fechar',body:K.group({title:`${G.contas.length} no consolidado`,rows:G.contas.map(c=>({icon:'financeiro',title:esc(c.nome),sub:esc(c.tipo),value:G.oculto?'R$ ••••':brl(c.saldo),act:'c',i:c.id}))})+
    K.group({title:'Fora do consolidado',rows:[{icon:'doc',color:'#8e8e93',title:esc(G.cartao.nome),sub:`Fatura ${esc(G.cartao.ref)} · vence ${d2(G.cartao.vence)}`,value:brl(Math.max(0,r2(sum(G.cartao.compras,x=>x[2])-G.cartao.pago))),act:'fat'}]}),
    on:{c:b=>{s.close();setTimeout(()=>contaSheet(conta(b.dataset.i),after),200)},fat:()=>{s.close();setTimeout(()=>faturaSheet(after),200)}}})}
const copiar=t=>{try{navigator.clipboard&&navigator.clipboard.writeText(t.aviso).catch(()=>{})}catch(e){}M.toast('Link do aviso copiado.')};
const gerarAviso=(t,after)=>{t.aviso='https://maestro.app/aviso/'+Math.random().toString(36).slice(2,6).toUpperCase();t.avisoOld=false;after&&after();
  M.toast(t.semEmail?'Aviso gerado. O contato não tem e-mail: copie o link e envie por WhatsApp.':'Aviso gerado e enviado por e-mail ao cliente.','Copiar link',()=>copiar(t))};
const regerar=(t,after)=>K.confirm({title:'Regerar o aviso?',text:'O link atual deixa de funcionar; o cliente precisa receber o novo.',ok:'Regerar',
  run:()=>{t.aviso='https://maestro.app/aviso/'+Math.random().toString(36).slice(2,6).toUpperCase();t.avisoOld=false;after&&after();M.toast('Aviso regerado. Envie o novo link ao cliente.')}});
const aprovar=(t,after)=>{t.status='open';M.toast(`Pagamento aprovado: ${t.desc} entrou em A pagar.`);after&&after()};
const recusar=(t,after)=>motivoSheet('Recusar pagamento',`${t.desc} · ${brl(t.valor)}`,'Recusar',m=>{t.status='canceled';t.recusado=true;t.baixa=HOJE;t.motivo=m;M.toast('Pagamento recusado. O solicitante vê o motivo.');after&&after()});
/* tratadores comuns das linhas de título (deslizar e detalhe) */
const titH=(after)=>{const by=el=>G.tit.find(t=>t.id===el.dataset.i);return {
  baixa:el=>baixaSheet(by(el),after),aprovar:el=>aprovar(by(el),after),recusar:el=>recusar(by(el),after),
  aviso:el=>gerarAviso(by(el),after),copiar:el=>copiar(by(el)),nf:el=>nfSheet(by(el),after),editar:el=>editarSheet(by(el),after),regerar:el=>regerar(by(el),after)}};

/* =====================================================================
   FINANCEIRO · tela principal (Painel / A receber / A pagar) e detalhe do título
   ===================================================================== */
let finTab=0,finQ='';
function painel(){
  const cons=sum(G.contas,c=>c.saldo),P=previsao(),pend=G.tit.filter(t=>t.status==='pending');
  const card=tipo=>{const L=abertos(tipo),hj=L.filter(t=>t.venc===HOJE),at=L.filter(t=>t.venc<HOJE);
    return {label:tipo==='rec'?'A receber':'A pagar',value:M.brl0(sum(L,resta)),sub:`${L.length} em aberto${at.length?` · <span class="neg">${at.length} em atraso</span>`:''}${hj.length?` · <span class="warn">${hj.length} hoje</span>`:''}`,act:tipo==='rec'?'irRec':'irPag'}};
  const saldo=`<div class="tile wide"><div class="cg-th"><span class="tl">Saldo em contas</span><button type="button" class="cg-ib" data-act="olho" aria-label="${G.oculto?'Mostrar saldo':'Ocultar saldo'}" aria-pressed="${G.oculto}">${ic('olho',22)}</button></div>
    <span class="tv">${G.oculto?'R$ ••••••':brl(cons)}</span><span class="tl" style="font-size:12.5px">${G.contas.length} contas no consolidado · cartão fora${G.contas.some(c=>c.saldo<0)?' · <span class="neg">uma conta negativa</span>':''}</span>
    <div class="mbtns cg-gap">${K.btn(G.contas.length+' contas',{act:'contas'})}${K.btn('Transferir',{act:'transferir',icon:'trocar'})}</div></div>`;
  const dev=Object.values(abertos('rec').filter(t=>t.venc<HOJE).reduce((a,t)=>{(a[t.contato]=a[t.contato]||{n:t.contato,v:0,c:0,d:0});a[t.contato].v+=resta(t);a[t.contato].c++;a[t.contato].d=Math.max(a[t.contato].d,dias(t.venc,HOJE));return a},{})).sort((a,b)=>b.v-a.v).slice(0,4);
  const atr=abertos('pag').filter(t=>t.venc<HOJE).sort((a,b)=>resta(b)-resta(a)).slice(0,4);
  const negMes=P.labels.filter((_,i)=>P.net[i]<0);
  return `${K.tiles([card('rec'),card('pag')]).replace('<div class="tiles">','<div class="tiles">'+saldo)}
   ${K.group({title:`Aguardando aprovação · ${pend.length} · ${brl(sum(pend,t=>t.valor))}`,foot:pend.length?'Deslize a linha para a esquerda para aprovar ou recusar.':'',empty:'Nada aguardando aprovação.',
     rows:pend.map(t=>({icon:'relogio',color:'rgb(var(--warn))',title:esc(t.desc),sub:`${esc(t.solic||t.contato)} · vence ${d2(t.venc)}`,value:brl(t.valor),href:'#/financeiro?tit='+t.id,i:t.id,swipe:swTit(t)}))})}
   <section class="grp"><h2>Previsão</h2><div class="mcard"><p class="cg-note">Nos próximos 30 dias entram <b>${brl(P.ent)}</b> e saem <b>${brl(P.sai)}</b>.${negMes.length?` ${negMes.map(m=>m==='dez'?'Dezembro':m).join(', ')} fecha negativo: vale antecipar cobranças ou segurar compras.`:''}</p>${grafPrev('Previsão de caixa')}</div></section>
   ${K.group({title:'Maiores devedores',empty:'Ninguém em atraso.',rows:dev.map(x=>({icon:x.n.split(' ').map(p=>p[0]).slice(0,2).join(''),color:'rgb(var(--neg))',title:esc(x.n),sub:`${x.c} ${pl(x.c,'título','títulos')} · há ${x.d} dias`,value:`<span class="neg">${brl(x.v)}</span>`,act:'irRec'}))})}
   ${K.group({title:'Maiores atrasos a pagar',empty:'Nada em atraso.',rows:atr.map(t=>({title:esc(t.contato),sub:`${esc(t.desc)} · há ${dias(t.venc,HOJE)} dias`,value:`<span class="neg">${brl(resta(t))}</span>`,href:'#/financeiro?tit='+t.id}))})}
   ${K.group({title:'Últimas movimentações',rows:G.mov.slice(0,5).map(movRow)})}
   ${K.group({title:'Mais do Financeiro',rows:[{icon:'barras',title:'Resultado',sub:'Receita, custos e lucro mês a mês',href:'#/financeiro/resultado'},
     {icon:'relogio',title:'Previsto x Realizado',sub:'O orçamento contra o que aconteceu',href:'#/financeiro/orcamento'},
     {icon:'check',title:'Conciliação',sub:'Extrato do banco casado com os títulos',href:'#/financeiro/conciliacao'},
     {icon:'doc',title:'Contratos',sub:'Mensalidades de clientes',href:'#/financeiro/contratos'},
     {icon:'doc',color:'#8e8e93',title:'Despesas fixas',sub:'Contas que se repetem todo mês',href:'#/financeiro/contratos?aba=pagar'},
     {icon:'trocar',title:'Transferir entre contas',act:'transferir'},{icon:'financeiro',color:'#8e8e93',title:'Fatura do cartão',sub:`${esc(G.cartao.nome)} · fora do consolidado`,act:'fatura'},
     {icon:'ajustes',color:'#8e8e93',title:'Ajustes do Financeiro',sub:'Pix, avisos, aprovação, plano de contas',href:'#/ajustes/financeiro'}]})}`}
function lista(tipo){const rec=tipo==='rec',ql=finQ.trim().toLowerCase();
  const L=G.tit.filter(t=>t.tipo===tipo&&(!ql||(t.desc+' '+t.contato+' '+obraNome(t.obra)).toLowerCase().includes(ql))).sort((a,b)=>a.venc<b.venc?-1:1);
  const nomes=['Vencidos','Vence hoje','A vencer',rec?'Concluídos e encerrados':'Pagos e encerrados'];let first=true;
  const h=nomes.map((n,i)=>{let rows=L.filter(t=>grupo(t)===i);if(i===3)rows.reverse();if(!rows.length)return '';const tot=i===3?sum(rows,t=>t.pago):sum(rows,resta);
    const foot=first&&i<3?`Deslize a linha para a esquerda para ${rec?'registrar o recebimento':'registrar o pagamento'}.`:'';first=false;
    return K.group({title:`${n} · ${rows.length} · ${brl(tot)}`,rows:rows.map(titRow),foot})}).join('');
  return h||K.empty(ql?{title:'Nada encontrado.',text:'Tente outra palavra: descrição, contato ou obra.'}:{title:rec?'Nenhum título a receber.':'Nenhuma conta a pagar.',text:'Crie o primeiro pelo + no topo.'})}
function titDetalhe(t){const rec=t.tipo==='rec',open=t.status==='open';
  const acoes=[];
  if(rec&&isOpen(t))acoes.push(t.aviso?{icon:'copiar',title:'Copiar link do aviso',sub:t.avisoOld?'O aviso está desatualizado':'Para mandar por WhatsApp',act:'copiar',i:t.id}:{icon:'enviar',title:'Gerar aviso de cobrança',sub:t.semEmail?'O contato não tem e-mail: copie o link':'Vai por e-mail com link e Pix',act:'aviso',i:t.id});
  if(rec&&t.aviso&&isOpen(t))acoes.push({icon:'trocar',title:'Regerar aviso',sub:'O link atual deixa de funcionar',act:'regerar',i:t.id});
  if(isOpen(t)||t.nf)acoes.push({icon:'doc',title:t.nf?'NF '+esc(t.nf.numero):'Registrar NF',sub:t.nf?`Emitida em ${d3(t.nf.data)} · ${brl(t.nf.valor)}`:'Número, data e valor',act:'nf',i:t.id});
  if(isOpen(t))acoes.push({icon:'ajustes',color:'#8e8e93',title:'Editar título',sub:'Descrição, valor, vencimento, obra',act:'editar',i:t.id});
  const sg=sinais(t);
  return `${K.nav({title:t.desc,back:rec?'A receber':'A pagar',kick:rec?'A receber':'A pagar',sub:esc(subTit(t))})}
   <div class="cg-tags">${chip(statusTxt(t),grupo(t)===0&&open?'r':t.status==='paid'?'g':t.status==='pending'?'w':'')}${sg.join('')}</div>
   ${open?`<div class="mcard">${K.btn(rec?'Registrar recebimento':'Registrar pagamento',{pri:true,act:'baixa',icon:'check'}).replace('data-act="baixa"',`data-act="baixa" data-i="${t.id}"`)}</div>`:''}
   ${t.status==='pending'?`<div class="mcard"><p class="cg-note" style="margin-bottom:12px">Solicitado por ${esc(t.solic||t.contato)}. Só entra em A pagar depois de aprovado.</p><div class="mbtns">${K.btn('Recusar',{dng:true,act:'recusar'}).replace('data-act="recusar"',`data-act="recusar" data-i="${t.id}"`)}${K.btn('Aprovar',{pri:true,act:'aprovar'}).replace('data-act="aprovar"',`data-act="aprovar" data-i="${t.id}"`)}</div></div>`:''}
   ${kvg('Valores',[kv('Valor',brl(t.valor)),kv(rec?'Recebido':'Pago',brl(t.pago)),kv('Resta',brl(isOpen(t)?resta(t):0))])}
   ${kvg('Datas e contas',[kv('Emissão',d3(t.emissao)),kv('Vencimento',d3(t.venc)),...(t.baixa?[kv(t.status==='paid'?'Baixa':'Encerrado em',d3(t.baixa))]:[]),kv('Conta do plano',esc(t.plano)),kv('Conta prevista',esc(conta(t.conta).nome))])}
   ${t.motivo?kvg('Motivo',[kv(esc(t.motivo),'')],'','cg-wrap'):''}
   ${acoes.length?K.group({title:'Ações',rows:acoes}):''}`}

M.mscreen('financeiro',{title:'Financeiro',tab:'financeiro',
  help:['O Painel mostra o saldo das contas, o que entra, o que sai e o que espera aprovação; o olho esconde o saldo.',
    'Em A receber e A pagar os títulos ficam agrupados por vencimento: deslize a linha para a esquerda para dar baixa, ou toque para ver o detalhe.',
    'O + cria um título novo, à vista ou parcelado; Resultado, Previsto x Realizado, Conciliação e Contratos ficam no fim do Painel.'],
  render:q=>{const id=q.get('tit');if(id){const t=G.tit.find(x=>x.id===id);return t?titDetalhe(t):K.nav({title:'Título',back:'Financeiro'})+K.empty({title:'Título não encontrado.',text:'Ele pode ter sido renegociado ou excluído.'})}
    const a=q.get('aba');if(a)finTab=a==='receber'?1:a==='pagar'?2:0;
    return `${K.nav({title:'Financeiro',kick:'Outubro de 2026',acts:[{icon:'mais',title:finTab===2?'Nova conta a pagar':'Novo título',act:'novo'}]})}
     ${K.seg('fin-seg',[['0','Painel'],['1','A receber'],['2','A pagar']],String(finTab),'Seções do Financeiro')}
     <div id="fin-q" ${finTab?'':'hidden'}>${K.search('Buscar descrição, contato ou obra','fin-qi')}</div>
     <div id="fin-b">${finTab?lista(finTab===1?'rec':'pag'):painel()}</div>`},
  mount:(v,q)=>{
    if(q.get('tit')){M.wire(v,titH(rr));return}
    const box=$('#fin-b',v);
    const draw=()=>{box.innerHTML=finTab?lista(finTab===1?'rec':'pag'):painel();$('#fin-q',v).hidden=!finTab;
      const nb=$('.nav [data-act="novo"]',v),t=finTab===2?'Nova conta a pagar':'Novo título';nb.setAttribute('aria-label',t);nb.title=t;
      M.wire(box,H);K.bindSwipe(box);graficos(box)};
    const ir=n=>{finTab=n;setPick(v,'fin-seg',n);draw();scrollTo({top:0,behavior:'smooth'})};
    const H={...titH(draw),
      novo:()=>{const tipo=finTab===2?'pag':'rec';novoTitulo(tipo,out=>{draw();M.toast(`${out.length>1?out.length+' parcelas criadas':'Título criado'} em ${tipo==='rec'?'A receber':'A pagar'}.`,finTab===(tipo==='rec'?1:2)?'':'Ver',()=>ir(tipo==='rec'?1:2))})},
      olho:()=>{G.oculto=!G.oculto;draw()},contas:()=>contasSheet(draw),transferir:()=>transferSheet(draw),fatura:()=>faturaSheet(draw),
      irRec:()=>ir(1),irPag:()=>ir(2),conta:el=>contaSheet(conta(el.dataset.i),draw),prevDet:()=>prevSheet()};
    K.bindPick(v,'fin-seg',x=>{finTab=+x;draw()});
    const qi=$('#fin-qi',v);qi.value=finQ;qi.oninput=()=>{finQ=qi.value;draw()};
    M.wire(v,H);graficos(box);
  }});

/* =====================================================================
   FINANCEIRO · Resultado (DRE)
   ===================================================================== */
const DRE={comp:{rb:[182,205,240,228,251,196],cd:[84,96,110,104,118,92]},caixa:{rb:[160,190,230,240,236,214],cd:[90,88,112,98,120,96]},dop:[52.4,54.1,55.3,53.2,56.8,55.1],rf:[-1.2,.8,1.5,-.6,2.1,.4]};
const DRE_M=['mai','jun','jul','ago','set','out'];
let dreReg='comp',dreAno='2026',dreMes='6';
const sinal=x=>`<span class="${x<0?'neg':''}">${x<0?'− ':''}${M.brl0(Math.abs(x))}</span>`;
function dreBody(){const f=dreAno==='2025'?.82:1,b=DRE[dreReg];
  const rb=b.rb.map(x=>x*1000*f),ded=rb.map(x=>-x*.09),rl=rb.map((x,i)=>x+ded[i]),cd=b.cd.map(x=>-x*1000*f),lb=rl.map((x,i)=>x+cd[i]),
    dop=DRE.dop.map(x=>-x*1000*f),ro=lb.map((x,i)=>x+dop[i]),rf=DRE.rf.map(x=>x*1000*f),res=ro.map((x,i)=>x+rf[i]);
  const mi=+dreMes,pick=a=>mi===6?sum(a,x=>x):a[mi];
  const L=[['Receita bruta',rb],['(−) Deduções e impostos',ded],['= Receita líquida',rl,1],['(−) Custo direto',cd,0,'Materiais e mão de obra'],['= Lucro bruto',lb,1],
    ['(−) Despesas operacionais',dop],['= Resultado operacional',ro,1],['(±) Resultado financeiro',rf],['= Resultado líquido',res,1]].map(([n,a,acc,s])=>({n,acc,s,v:pick(a)}));
  const per=mi===6?`mai a out de ${dreAno}`:`${MESES_N[mi+4]} de ${dreAno}`;
  const fora=[['Transferências entre contas',45000,'Mexe no caixa de cada conta, não no consolidado.'],['Retirada dos sócios',-30000,'Pró-labore e distribuição.'],['Compra de equipamento (ativo)',-8400,'Escada, furadeira e analisador de rede.']];
  return `${K.tiles([{label:'Receita líquida',value:M.brl0(L[2].v),sub:per},{label:'Lucro bruto',value:M.brl0(L[4].v),sub:`margem ${Math.round(L[4].v/L[2].v*100)}%`},
      {label:'Resultado líquido',value:M.brl0(L[8].v),sub:`margem ${Math.round(L[8].v/L[2].v*100)}% · ${dreReg==='comp'?'competência':'caixa'}`,tone:L[8].v<0?'neg':'pos',wide:true}])}
    ${kvg(`Resultado · ${per}`,L.map(r=>kv(r.acc?`<b>${esc(r.n)}</b>`:`<span class="soft">${esc(r.n)}</span>`,sinal(r.v),r.s||'')),'Valores em reais. As linhas com “=” são os acumulados.')}
    ${kvg('Fora do resultado',fora.map(r=>kv(esc(r[0]),sinal(r[1]*f),esc(r[2]))),'Mexem no caixa, não no lucro: por isso ficam fora do resultado.','cg-wrap')}
    <section class="grp"><h2>Fluxo de caixa projetado</h2><div class="mcard">${grafPrev('Fluxo de caixa projetado')}</div></section>`}
M.mscreen('financeiro/resultado',{title:'Resultado',tab:'financeiro',
  help:['Competência mostra o resultado pelo mês em que o fato aconteceu; Caixa, pelo mês em que o dinheiro entrou ou saiu.',
    'Escolha um mês nos botões ou veja o acumulado de maio a outubro; as linhas com “=” são os acumulados.',
    'Fora do resultado ficam transferências e retiradas: mexem no caixa, não no lucro. Toque no gráfico para ver o fluxo mês a mês.'],
  render:()=>`${K.nav({title:'Resultado',back:'Financeiro',kick:'Financeiro',sub:'Quanto a empresa ganhou de verdade: receita, custos e despesas.'})}
    ${K.seg('dre-reg',[['comp','Competência'],['caixa','Caixa']],dreReg,'Regime')}
    ${K.seg('dre-ano',[['2026','2026'],['2025','2025']],dreAno,'Ano')}
    ${K.chips('dre-mes',[['6','Acumulado'],...DRE_M.map((m,i)=>[String(i),m])],dreMes)}
    <div id="dre-b">${dreBody()}</div>`,
  mount:v=>{const box=$('#dre-b',v),H={prevDet:()=>prevSheet()};
    const draw=()=>{box.innerHTML=dreBody();M.wire(box,H);graficos(box)};
    K.bindPick(v,'dre-reg',x=>{dreReg=x;draw()});K.bindPick(v,'dre-ano',x=>{dreAno=x;draw()});K.bindPick(v,'dre-mes',x=>{dreMes=x;draw()});
    M.wire(v,H);graficos(box)}});

/* =====================================================================
   FINANCEIRO · Previsto x Realizado
   ===================================================================== */
const ORC=[['Receita de projetos','r',240000],['Receita de serviços recorrentes','r',9800],['Compra de materiais','d',98000],['Folha de pagamento','d',38400],['Aluguel','d',12060],
  ['Serviços contábeis','d',150],['Tarifas bancárias','d',300],['Combustível e deslocamento','d',2800],['Software e assinaturas','d',1490],['Marketing','d',3500]];
const orcKey=(a,m)=>a+'-'+m;
const prevOf=(a,m,i)=>{const k=orcKey(a,m);return G.orc[k]&&G.orc[k][i]!=null?G.orc[k][i]:ORC[i][2]};
const realOf=(a,m,i,reg)=>{const f=.62+((i*7+m*3)%9)/10, part=(+a===2026&&m===9)?.58:(+a===2026&&m>9)?0:1;return r2(ORC[i][2]*f*part*(reg==='caixa'?.94:1))};
let orcTab='cmp',orcMes=9,orcAno='2026',orcReg='comp';
const orcRows=()=>ORC.map((o,i)=>({i,n:o[0],t:o[1],p:prevOf(orcAno,orcMes,i),r:realOf(orcAno,orcMes,i,orcReg)}));
function orcBody(){const rows=orcRows(),mes=`${MESES_N[orcMes]} de ${orcAno}`;
  if(orcTab==='cmp'){const res=x=>sum(rows.filter(r=>r.t==='r'),r=>r[x])-sum(rows.filter(r=>r.t==='d'),r=>r[x]),P=res('p'),R=res('r'),df=R-P;
    const row=r=>{const d=r.r-r.p,bom=r.t==='r'?d>=0:d<=0,pc=r.p?r.r/r.p*100:0,over=r.t==='d'&&pc>100;
      return {title:esc(r.n),sub:`<span class="${over?'neg':''}">${Math.round(pc)}% do previsto</span> · previsto ${M.brl0(r.p)}`,value:M.brl0(r.r),value2:`<span class="${bom?'pos':'neg'}">${d<0?'− ':'+ '}${M.brl0(Math.abs(d))}</span>`,act:'linha',i:r.i}};
    return `${K.tiles([{label:'Previsto',value:M.brl0(P),sub:'receitas menos despesas'},{label:'Realizado',value:M.brl0(R),sub:mes},
        {label:'Diferença',value:(df<0?'− ':'+ ')+M.brl0(Math.abs(df)),tone:df<0?'neg':'pos',sub:df<0?'abaixo do previsto':'acima do previsto',wide:true}])}
      ${K.group({title:'Receitas',rows:rows.filter(r=>r.t==='r').map(row)})}
      ${K.group({title:'Despesas',rows:rows.filter(r=>r.t==='d').map(row),foot:'Em vermelho, a despesa que passou do previsto. Toque para ver o consumo.'})}`}
  return `${K.form([{title:`Receitas · ${mes}`,fields:rows.filter(r=>r.t==='r').map(r=>({k:'orc'+r.i,label:r.n,type:'money',value:fmtIn(r.p)}))},
      {title:'Despesas',fields:rows.filter(r=>r.t==='d').map(r=>({k:'orc'+r.i,label:r.n,type:'money',value:fmtIn(r.p)})),foot:'“Repetir até dezembro” copia estes valores para os meses seguintes.'}])}
    <div class="mcard cg-gap"><div class="mbtns">${K.btn('Repetir até dez.',{act:'repetir'})}${K.btn('Salvar',{pri:true,act:'salvar'})}</div></div>`}
M.mscreen('financeiro/orcamento',{title:'Previsto x Realizado',tab:'financeiro',
  help:['Em Comparar você vê, por conta do plano, quanto foi previsto e quanto já se realizou no mês escolhido.',
    'Despesa que passou do previsto fica em vermelho; toque numa linha para ver a barra de consumo.',
    'Em Definir, ajuste os valores e salve; “Repetir até dezembro” copia para os meses seguintes.'],
  render:()=>`${K.nav({title:'Previsto x Realizado',back:'Financeiro',kick:'Financeiro',sub:'O orçamento do mês contra o que de fato entrou e saiu.'})}
    ${K.seg('orc-tab',[['cmp','Comparar'],['def','Definir orçamento']],orcTab,'Modo')}
    ${K.chips('orc-mes',MES3.map((m,i)=>[String(i),m]),String(orcMes))}
    ${K.seg('orc-ano',[['2026','2026'],['2025','2025']],orcAno,'Ano')}
    ${K.seg('orc-reg',[['comp','Competência'],['caixa','Caixa']],orcReg,'Regime')}
    <div id="orc-b">${orcBody()}</div>`,
  mount:v=>{const box=$('#orc-b',v);
    const ler=()=>ORC.map((_,i)=>num($(`[name="orc${i}"]`,box).value));
    const H={linha:el=>{const r=orcRows()[+el.dataset.i],d=r.r-r.p,pc=r.p?r.r/r.p*100:0,over=r.t==='d'&&pc>100;
        K.sheet({title:r.n,cancel:'Fechar',body:`${kvg(`${r.t==='r'?'Receita':'Despesa'} · ${MESES_N[orcMes]} de ${orcAno}`,[kv('Previsto',brl(r.p)),kv('Realizado',brl(r.r)),kv('Diferença',`<span class="${(r.t==='r'?d>=0:d<=0)?'pos':'neg'}">${d<0?'− ':'+ '}${brl(Math.abs(d))}</span>`)])}
          <div class="mcard"><h3>Consumo do previsto · ${Math.round(pc)}%</h3><div class="prog"><b style="width:${Math.min(100,pc)}%;${over?'background:rgb(var(--neg))':r.t==='r'?'background:rgb(var(--pos))':''}"></b></div>
          <p class="cg-note cg-gap">${over?'Passou do previsto: vale rever o orçamento ou segurar gastos.':r.t==='r'?'Receita realizada sobre a prevista.':'Dentro do previsto.'}</p></div>`})},
      salvar:()=>{G.orc[orcKey(orcAno,orcMes)]=ler();M.toast(`Orçamento de ${MESES_N[orcMes]} salvo.`,'Comparar',()=>{orcTab='cmp';setPick(v,'orc-tab','cmp');draw()})},
      repetir:()=>{const val=ler();for(let k=orcMes;k<12;k++)G.orc[orcKey(orcAno,k)]=val.slice();M.toast(`Valores copiados de ${MESES_N[orcMes]} até dezembro.`)}};
    const draw=()=>{box.innerHTML=orcBody();M.wire(box,H)};
    K.bindPick(v,'orc-tab',x=>{orcTab=x;draw()});K.bindPick(v,'orc-mes',x=>{orcMes=+x;draw()});K.bindPick(v,'orc-ano',x=>{orcAno=x;draw()});K.bindPick(v,'orc-reg',x=>{orcReg=x;draw()});
    M.wire(v,H);
    const on=$('#orc-mes [aria-pressed="true"]',v);on&&on.scrollIntoView({block:'nearest',inline:'center'})}});

/* =====================================================================
   FINANCEIRO · Conciliação (extrato OFX)
   ===================================================================== */
const OFX=[['2026-10-01','PIX RECEBIDO HELENA T LEMOS',96927.25,1],['2026-10-02','PIX RECEBIDO PAULA LOPES',39342.11],['2026-10-02','TED RECEBIDA R CAMPOS',73471.08],
  ['2026-10-02','PAG BOLETO LUMINAR SUL',-38214.30],['2026-10-02','PAG BOLETO CONTABILIDADE PRADO',-150],['2026-10-02','TARIFA PACOTE SERVICOS',-89.90]];
let ccConta='itau',ccL=null,ccArq='';
const VER={'Casada':['check','rgb(var(--pos))'],'Empate':['filtro','rgb(var(--warn))'],'Sem título':['mais','rgb(var(--neg))'],'Já conciliada':['check','#8e8e93']};
const cands=val=>G.tit.filter(t=>t.status==='open'&&t.tipo===(val>0?'rec':'pag')&&Math.abs(resta(t)-Math.abs(val))<1.01);
const nBaixas=()=>ccL?ccL.filter(l=>l.ver==='Casada'&&l.sel).length:0;
function ccBody(){
  if(!ccL)return `<div class="mcard soft" style="text-align:center;font-size:15px">Escolha a conta e envie o arquivo OFX do banco. O Maestro casa cada linha com um título em aberto antes de dar qualquer baixa.</div>`;
  const c=k=>ccL.filter(l=>l.ver===k).length,n=nBaixas();
  return `${K.tiles([{label:'Linhas do extrato',value:String(ccL.length),sub:esc(ccArq),wide:true},{label:'Casadas',value:String(c('Casada')),sub:'prontas para baixar',tone:'pos'},
      {label:'Empates',value:String(c('Empate')),sub:c('Empate')?'escolher o título':'nenhum',tone:c('Empate')?'warn':''},{label:'Sem título',value:String(c('Sem título')),sub:c('Sem título')?'criar o título':'nenhuma',tone:c('Sem título')?'neg':''},
      {label:'Já conciliadas',value:String(c('Já conciliada')),sub:'baixa já registrada'}])}
    ${K.group({title:'Linhas do extrato · '+conta(ccConta).nome,foot:'Toque na linha para ver o título casado, escolher num empate ou criar o título.',rows:ccL.map((l,i)=>{const [icn,cor]=VER[l.ver];
      return {icon:icn,color:cor,title:`<span class="cg-mono">${esc(l.desc)}</span>`,sub:`${d2(l.data)} · ${l.ver}${l.ver==='Casada'?(l.sel?' · entra na baixa':' · fora da baixa'):''}`,
        value:`<span class="${l.valor>0?'pos':''}">${l.valor>0?'+ ':'− '}${brl(Math.abs(l.valor))}</span>`,act:'ln',i,
        swipe:l.ver==='Casada'?[{label:l.sel?'Tirar':'Incluir',icon:l.sel?'x':'check',act:'tsel',tone:l.sel?2:4}]:null}})})}
    <div class="mcard">${K.btn(n?`Aplicar ${n} ${pl(n,'baixa','baixas')}`:'Nenhuma baixa marcada',{pri:!!n,act:'aplicar',icon:'check'})}</div>`}
M.mscreen('financeiro/conciliacao',{title:'Conciliação',tab:'financeiro',
  help:['Escolha a conta bancária e envie o arquivo OFX que o banco fornece (ou use o extrato de exemplo).',
    'Cada linha recebe um veredito: Casada, Empate, Sem título ou Já conciliada. Toque para resolver empates e criar títulos.',
    '“Aplicar baixas” dá baixa em todas as linhas casadas que estão marcadas; deslize uma linha para tirá-la da baixa.'],
  render:()=>`${K.nav({title:'Conciliação',back:'Financeiro',kick:'Financeiro',sub:'O extrato do banco casado com os títulos, linha a linha, antes de dar baixa.'})}
    ${K.form([{title:'Conta bancária',fields:[{k:'ccconta',label:'Conta',type:'select',opts:G.contas.filter(c=>c.id!=='cofre').map(c=>[c.id,c.nome]),value:ccConta}]}])}
    <section class="grp"><h2>Extrato</h2><ul class="lst"><li><label class="rw ic40" style="cursor:pointer"><span class="mic" aria-hidden="true">${ic('upload',22)}</span><span class="tx"><span class="t1">Enviar arquivo OFX</span><span class="t2">O arquivo que o banco fornece</span></span><span class="chev">${ic('seta',18)}</span><input type="file" accept=".ofx,.OFX" class="sr" id="cc-ofx"></label></li>
      ${K.row({icon:'doc',color:'#8e8e93',title:'Usar extrato de exemplo',sub:'extrato-itau-out-2026.ofx',act:'exemplo'})}</ul></section>
    <div id="cc-b">${ccBody()}</div>`,
  mount:v=>{const box=$('#cc-b',v);
    const draw=()=>{box.innerHTML=ccBody();M.wire(box,H);K.bindSwipe(box)};
    const gerar=nome=>{ccArq=nome;ccL=OFX.map(([data,desc,valor,ja])=>{const c=ja?[]:cands(valor);return {data,desc,valor,ver:ja?'Já conciliada':c.length===1?'Casada':c.length>1?'Empate':'Sem título',tid:c.length===1?c[0].id:null,cands:c.map(t=>t.id),sel:true}});draw();box.scrollIntoView({behavior:'smooth',block:'start'})};
    const criar=l=>novoTitulo(l.valor>0?'rec':'pag',out=>{l.tid=out[0].id;l.ver='Casada';draw();M.toast('Título criado e casado com a linha do extrato.')},
      {desc:l.desc.charAt(0)+l.desc.slice(1).toLowerCase(),valor:Math.abs(l.valor),venc:l.data,data:l.data,contato:l.valor>0?'':'Itaú',plano:l.valor>0?'':'Tarifas bancárias',conta:ccConta});
    const H={exemplo:()=>gerar('extrato-itau-out-2026.ofx'),
      tsel:el=>{const l=ccL[+el.dataset.i];l.sel=!l.sel;draw()},
      ln:el=>{const l=ccL[+el.dataset.i],t=l.tid&&G.tit.find(x=>x.id===l.tid);let s;
        const body=`${kvg('Linha do extrato',[kv(`<span class="cg-mono">${esc(l.desc)}</span>`,''),kv('Data',d3(l.data)),kv('Valor',`${l.valor>0?'+ ':'− '}${brl(Math.abs(l.valor))}`),kv('Veredito',l.ver)])}
          ${l.ver==='Casada'&&t?kvg('Título casado',[kv(esc(t.desc),brl(resta(t)),`${esc(t.contato)}${t.parc?' · parcela '+t.parc:''} · vence ${d2(t.venc)}`)])+K.btn(l.sel?'Tirar desta baixa':'Incluir na baixa',{act:'tg',pri:!l.sel}):''}
          ${l.ver==='Empate'?K.group({title:`Escolha entre ${l.cands.length} títulos`,rows:l.cands.map(id=>{const x=G.tit.find(y=>y.id===id);return {icon:'check',title:esc(x.contato),sub:`${esc(x.desc)}${x.parc?' · parcela '+x.parc:''} · vence ${d2(x.venc)}`,value:brl(resta(x)),act:'esc',i:id}})}):''}
          ${l.ver==='Sem título'?`<p class="cg-note" style="margin-bottom:12px">Nenhum título em aberto tem este valor. Crie o título e ele já sai casado com a linha.</p>${K.btn('Criar título',{pri:true,act:'criar',icon:'mais'})}`:''}
          ${l.ver==='Já conciliada'?`<p class="cg-note">A baixa desta linha já está registrada no Financeiro.</p>`:''}`;
        s=K.sheet({title:l.ver,cancel:'Fechar',body,on:{tg:()=>{l.sel=!l.sel;s.close();draw()},esc:b=>{l.tid=b.dataset.i;l.ver='Casada';s.close();draw();M.toast('Título escolhido: a linha ficou casada.')},criar:()=>{s.close();setTimeout(()=>criar(l),200)}}})},
      aplicar:()=>{if(!ccL)return M.toast('Envie o extrato primeiro: arquivo OFX ou o extrato de exemplo.');
        const ok=ccL.filter(l=>l.ver==='Casada'&&l.sel);if(!ok.length)return M.toast('Nenhuma linha casada marcada.');
        ok.forEach(l=>{const t=G.tit.find(x=>x.id===l.tid);if(!t||t.status!=='open'){l.ver='Já conciliada';return}
          const val=Math.min(resta(t),Math.abs(l.valor));t.pago=r2(t.pago+val);t.conta=ccConta;if(t.pago>=t.valor-.005){t.status='paid';t.baixa=l.data}
          conta(ccConta).saldo=r2(conta(ccConta).saldo+(t.tipo==='rec'?val:-val));G.mov.unshift({data:l.data,desc:(t.tipo==='rec'?'Recebimento · ':'Pagamento · ')+t.contato,conta:ccConta,valor:t.tipo==='rec'?val:-val});l.ver='Já conciliada'});
        draw();M.toast(`${ok.length} ${pl(ok.length,'baixa aplicada','baixas aplicadas')} em ${conta(ccConta).nome}.`,'Ver Financeiro',()=>go('#/financeiro'))}};
    $('#cc-ofx',v).onchange=e=>{const f=e.target.files[0];if(f)gerar(f.name)};
    $('[name="ccconta"]',v).onchange=e=>{ccConta=e.target.value;if(ccL){ccL=null;draw();M.toast('Conta trocada: envie o extrato desta conta.')}};
    M.wire(v,H)}});

/* =====================================================================
   FINANCEIRO · Contratos e despesas fixas
   ===================================================================== */
const CICLO_M={Mensal:1,Bimestral:2,Trimestral:3,Semestral:6,Anual:12};
let ctrTab=0;
function ctrBody(){const tipo=ctrTab?'pag':'rec',L=G.ctr.filter(c=>c.tipo===tipo),at=L.filter(c=>c.status==='Ativo'),esp=sum(at,c=>c.esp);
  const sw=c=>c.status==='Ativo'?[{label:'Suspender',icon:'relogio',act:'suspender',tone:5},{label:'Encerrar',icon:'x',act:'encerrar',tone:3}]:c.status==='Suspenso'?[{label:'Reativar',icon:'trocar',act:'reativar',tone:4},{label:'Encerrar',icon:'x',act:'encerrar',tone:3}]:null;
  const row=c=>({icon:'doc',color:c.status==='Ativo'?'rgb(var(--pos))':c.status==='Suspenso'?'rgb(var(--warn))':'#8e8e93',title:esc(c.desc),sub:`${esc(c.contato)} · ${c.ciclo.toLowerCase()} · dia ${c.dia}`,value:brl(c.valor),value2:c.reaj==='Nenhum'?'sem reajuste':esc(c.reaj),act:'ctr',i:c.id,swipe:sw(c)});
  return `${K.tiles([{label:'Ativos',value:String(at.length),sub:`de ${L.length} cadastrados`},{label:ctrTab?'Despesa fixa mensal':'Receita mensal',value:M.brl0(sum(at,c=>c.valor/CICLO_M[c.ciclo])),sub:'ciclos convertidos para mês'},
      {label:'Ciclos esperando',value:String(esp),sub:esp?'Toque para gerar os títulos vencidos':'Nenhum vencimento sem título',tone:esp?'warn':'pos',act:esp?'gerar':'',wide:true}])}
    ${['Ativo','Suspenso','Encerrado'].map((s,i)=>K.group({title:['Ativos','Suspensos','Encerrados'][i],rows:L.filter(c=>c.status===s).map(row),foot:i===0&&L.some(c=>c.status==='Ativo')?'Deslize a linha para suspender ou encerrar.':''})).join('')}
    ${L.length?'':K.empty({title:ctrTab?'Nenhuma despesa fixa.':'Nenhum contrato.',text:'Cadastre pelo + no topo.'})}`}
M.mscreen('financeiro/contratos',{title:'Contratos',tab:'financeiro',
  help:['Contratos geram cobranças recorrentes; despesas fixas geram contas a pagar a cada ciclo.',
    'Ciclos esperando são vencimentos que ainda não viraram título: toque no quadro para gerar.',
    'Deslize a linha para suspender, reativar ou encerrar (pedem o motivo); o + cadastra um novo.'],
  render:q=>{if(q.get('aba'))ctrTab=q.get('aba')==='pagar'?1:0;
    return `${K.nav({title:'Contratos',back:'Financeiro',kick:'Financeiro',sub:'O que se repete todo ciclo: mensalidades de clientes e contas fixas.',acts:[{icon:'mais',title:ctrTab?'Nova despesa fixa':'Novo contrato',act:'novo'}]})}
    ${K.seg('ctr-tab',[['0','Contratos'],['1','Despesas fixas']],String(ctrTab),'Tipo')}<div id="ctr-b">${ctrBody()}</div>`},
  mount:v=>{const box=$('#ctr-b',v),by=el=>G.ctr.find(c=>c.id===el.dataset.i);
    const draw=()=>{box.innerHTML=ctrBody();const nb=$('.nav [data-act="novo"]',v),t=ctrTab?'Nova despesa fixa':'Novo contrato';nb.setAttribute('aria-label',t);nb.title=t;M.wire(box,H);K.bindSwipe(box)};
    const suspender=c=>motivoSheet('Suspender',c.desc+' · nenhum título novo até reativar','Suspender',m=>{c.status='Suspenso';c.motivo=m;draw();M.toast(`${c.desc} suspenso.`)});
    const encerrar=c=>motivoSheet('Encerrar',c.desc+' · é definitivo','Encerrar',m=>{c.status='Encerrado';c.fim=HOJE;c.motivo=m;draw();M.toast(`${c.desc} encerrado.`)});
    const reativar=c=>{c.status='Ativo';c.motivo='';draw();M.toast(`${c.desc} reativado. O próximo ciclo vence no dia ${c.dia}.`)};
    const H={suspender:el=>suspender(by(el)),encerrar:el=>encerrar(by(el)),reativar:el=>reativar(by(el)),
      ctr:el=>{const c=by(el);let s;s=K.sheet({title:c.desc,cancel:'Fechar',body:`<div class="cg-tags">${chip(c.status,c.status==='Ativo'?'g':c.status==='Suspenso'?'w':'')}</div>
        ${kvg(ctrTab?'Despesa fixa':'Contrato',[kv(ctrTab?'Fornecedor':'Cliente',esc(c.contato)),kv('Valor do ciclo',brl(c.valor)),kv('Ciclo',c.ciclo),kv('Dia do vencimento',String(c.dia)),kv('Reajuste anual',c.reaj),kv('Início',d3(c.inicio)),...(c.fim?[kv('Fim',d3(c.fim))]:[]),kv('Conta do plano',esc(c.plano))])}
        ${c.motivo?kvg('Motivo',[kv(esc(c.motivo),'')],'','cg-wrap'):''}
        ${c.status==='Encerrado'?'':`<div class="mbtns">${c.status==='Ativo'?K.btn('Suspender',{act:'s'}):K.btn('Reativar',{act:'r'})}${K.btn('Encerrar',{dng:true,act:'e'})}</div>`}`,
        on:{s:()=>{s.close();setTimeout(()=>suspender(c),200)},r:()=>{s.close();reativar(c)},e:()=>{s.close();setTimeout(()=>encerrar(c),200)}}})},
      gerar:()=>{const tipo=ctrTab?'pag':'rec';let n=0;G.ctr.filter(c=>c.tipo===tipo&&c.status==='Ativo'&&c.esp).forEach(c=>{for(let k=0;k<c.esp;k++){n++;
          G.tit.push(T(nid('t'),tipo,c.desc,c.contato,'','',c.valor,`2026-${c.dia>2?'09':'10'}-${String(Math.min(c.dia,28)).padStart(2,'0')}`,{plano:c.plano}))}c.esp=0});
        draw();M.toast(`${n} ${pl(n,'título gerado','títulos gerados')} em ${tipo==='rec'?'A receber':'A pagar'}.`,'Ver',()=>go('#/financeiro?aba='+(tipo==='rec'?'receber':'pagar')))},
      novo:()=>{const rec=!ctrTab,pessoas=rec?D.contatos.map(c=>c.nome):D.fornecedores.map(f=>f.nome).concat(['Imobiliária Savassi','Contabilidade Prado','Vivo Empresas','Porto Seguro']);
        K.formSheet({title:rec?'Novo contrato':'Nova despesa fixa',ok:'Criar',groups:[
          {title:rec?'Cobrança recorrente de um cliente':'Conta que se repete todo ciclo',fields:[{k:'contato',label:rec?'Cliente':'Fornecedor',type:'select',req:true,opts:pessoas,ph:'Escolher'},
            {k:'desc',label:'Descrição',req:true,ph:rec?'Ex.: Manutenção mensal':'Ex.: Aluguel'},{k:'conta',label:'Conta prevista',type:'select',opts:G.contas.map(c=>[c.id,c.nome]),value:'itau'}]},
          {title:'Valor e ciclo',fields:[{k:'valor',label:'Valor do ciclo',type:'money',req:true,ph:'0,00'},{k:'ciclo',label:'Ciclo',type:'select',req:true,opts:Object.keys(CICLO_M),value:'Mensal'},
            {k:'dia',label:'Dia do vencimento',type:'number',req:true,value:'10'},{k:'reaj',label:'Reajuste anual',type:'select',opts:['Nenhum','IPCA','IGP-M','INPC'],value:'IPCA'}]},
          {title:'Vigência',fields:[{k:'inicio',label:'Início',type:'date',req:true,value:HOJE},{k:'fim',label:'Fim',type:'date'}],foot:'Fim em branco = sem prazo.'},
          {title:'Classificação',fields:[{k:'plano',label:'Conta do plano',type:'select',req:true,opts:rec?PLANO_REC:PLANO_PAG,ph:'Escolher',value:rec?'Receita de serviços recorrentes':''}]}],
          onOk:x=>{const val=num(x.valor),dia=parseInt(x.dia,10);if(val<=0){M.toast('Informe o valor do ciclo.');return false}if(!(dia>=1&&dia<=31)){M.toast('O dia do vencimento vai de 1 a 31.');return false}
            G.ctr.unshift({id:nid('k'),tipo:rec?'rec':'pag',desc:x.desc,contato:x.contato,valor:val,ciclo:x.ciclo,dia,reaj:x.reaj,inicio:x.inicio,fim:x.fim,status:'Ativo',esp:0,plano:x.plano});
            draw();M.toast(rec?'Contrato criado.':'Despesa fixa criada.')}})}};
    K.bindPick(v,'ctr-tab',x=>{ctrTab=+x;draw()});M.wire(v,H)}});

/* =====================================================================
   COMPRAS
   ===================================================================== */
const PED_ST={'Rascunho':'','Enviado':'b','Confirmado':'b','Recebido em parte':'w','Recebido':'g','Cancelado':'r','Encerrado':''};
const PED_COR={'Rascunho':'#8e8e93','Enviado':'rgb(var(--primary))','Confirmado':'rgb(var(--primary))','Recebido em parte':'rgb(var(--warn))','Recebido':'rgb(var(--pos))','Cancelado':'rgb(var(--neg))','Encerrado':'#8e8e93'};
const pedTot=p=>r2(sum(p.itens,i=>i.q*i.custo));
const obraTxt=id=>id?obraNome(id):'Reposição de estoque';
const filaTot=L=>r2(sum(L,q=>q.q*q.custo));
const tel=s=>String(s||'').replace(/\D/g,'');
let compTab=0,compObra='',compSt='',fornQ='',fornSit='Todos';
const sel=new Set(),abertoG=new Set();
const filaVis=()=>G.fila.filter(q=>!compObra||(compObra==='__est'?!q.obra:q.obra===compObra));
function filaRow(q,semForn){const p=prodBy(q.sku),d=p?disp(p):0,on=sel.has(q.id);
  const r=K.row({icon:semForn?'compras':'check',color:semForn?'rgb(var(--warn))':'',title:esc(q.nome),sub:`${q.q} × ${brl(q.custo)} · ${esc(obraTxt(q.obra))}${d>0?` · <span class="pos">${d} em estoque</span>`:''} · ${esc(q.sku)}`,
    value:brl(q.q*q.custo),act:semForn?'definir':'tg',i:q.id,chev:!!semForn,swipe:d>0?[{label:'Usar do estoque',icon:'estoque',act:'usar',tone:4}]:null});
  return semForn?r:r.replace('class="rw ic40"',`class="rw ic40" role="checkbox" aria-checked="${on}"`).replace('class="mic"',`class="mic cg-ck${on?' on':''}"`)}
function comprarHTML(){
  const L=filaVis();[...sel].forEach(id=>{if(!G.fila.find(q=>q.id===id))sel.delete(id)});
  const fsF=[...new Set(L.filter(q=>q.forn).map(q=>q.forn))];
  const grupos=fsF.map(fid=>{const all=L.filter(q=>q.forn===fid),vis=abertoG.has(fid)||all.length<=4?all:all.slice(0,4),f=D.byId('fornecedores',fid)||{},tudo=all.every(q=>sel.has(q.id));
    const rows=vis.map(q=>filaRow(q));
    if(all.length>4)rows.push(K.row({icon:'lista',color:'#8e8e93',title:abertoG.has(fid)?'Mostrar menos':`Mostrar todos os ${all.length} itens`,act:'expand',i:fid,chev:false}));
    rows.push(K.row({icon:'check',color:'#8e8e93',title:tudo?'Tirar a seleção deste fornecedor':`Selecionar ${all.length>1?'os '+all.length+' itens':'o item'}`,act:'selAll',i:fid,chev:false}));
    return `<section class="grp"><h2>${esc(fornNome(fid))} · ${all.length} ${pl(all.length,'item','itens')} · ${brl(filaTot(all))}</h2><ul class="lst">${rows.join('')}</ul>${f.situacao==='Bloqueado'?`<div class="foot"><span class="neg">Fornecedor bloqueado</span>: desbloqueie no cadastro antes de pedir.</div>`:''}</section>`});
  const sem=L.filter(q=>!q.forn),abaixo=G.prod.filter(p=>p.min>0&&disp(p)<p.min);
  return `${grupos.join('')}
    ${sem.length?K.group({title:`Sem fornecedor no catálogo · ${sem.length}`,rows:[],foot:''}).replace('</section>',`<ul class="lst">${sem.map(q=>filaRow(q,true)).join('')}</ul><div class="foot">Toque para definir quem vende; só então dá para pedir.</div></section>`):''}
    ${!grupos.length&&!sem.length?K.empty({title:'Nada a comprar com esse filtro.',text:'Quando uma obra aprova itens, eles aparecem aqui, agrupados por fornecedor.'}):''}
    ${abaixo.length?K.group({title:`Abaixo do mínimo · ${abaixo.length}`,foot:'Estoque da empresa. Toque para pôr a reposição na fila.',rows:abaixo.map(p=>{const na=G.fila.find(q=>q.sku===p.sku&&!q.obra);
      return {icon:'estoque',color:'rgb(var(--warn))',title:esc(p.nome),sub:`disponível ${disp(p)} · mínimo ${p.min} · ${esc(fornNome(p.forn))}`,value:na?'na fila':`Repor ${p.min-disp(p)}`,act:'repor',i:p.sku}})}):''}
    ${sel.size?'<div class="cg-pad"></div>':''}`}
function pedidosHTML(){const L=G.ped.filter(p=>!compSt||p.status===compSt).sort((a,b)=>b.n-a.n);
  return L.length?K.group({title:`${L.length} ${pl(L.length,'pedido','pedidos')}`,rows:L.map(p=>{const o=[...new Set(p.itens.map(i=>i.obra?obraNome(i.obra):(p.uso?'Uso comum':'Reposição')))].join(', ');
    return {icon:'compras',color:PED_COR[p.status],title:`Nº ${p.n} · ${esc(fornNome(p.forn))}`,sub:`${d2(p.data)} · ${esc(o)} · ${p.itens.length} ${pl(p.itens.length,'item','itens')} · ${sum(p.itens,i=>i.rec)} recebidos`,value:brl(pedTot(p)),value2:esc(p.status),href:'#/compras?ped='+p.n}})})
    :K.empty({title:'Nenhum pedido com essa situação.',text:'Troque o filtro acima.'})}
function fornHTML(){const q=fornQ.trim().toLowerCase(),L=D.fornecedores.filter(f=>(!q||(f.nome+' '+f.razao+' '+f.doc.replace(/\D/g,'')+' '+f.doc).toLowerCase().includes(q))&&(fornSit==='Todos'||(fornSit==='Ativos'?f.situacao==='Ativo':f.situacao==='Bloqueado')));
  return L.length?K.group({title:`${L.length} ${pl(L.length,'fornecedor','fornecedores')}`,rows:L.map(f=>({icon:f.nome.split(/\s+/).filter(w=>/^[A-ZÀ-Ú0-9]/.test(w)).map(w=>w[0]).slice(0,2).join('')||'F',color:f.situacao==='Ativo'?'':'rgb(var(--neg))',
      title:esc(f.nome),sub:`${esc(f.doc)}${f.marcas.length?' · '+esc(f.marcas.join(', ')):''}`,value2:f.situacao==='Ativo'?'':'<span class="neg">Bloqueado</span>',value:f.situacao==='Ativo'?null:'',href:'#/compras?forn='+f.id}))})
    :K.empty({title:'Nenhum fornecedor encontrado.',text:'Tente outro nome, razão social, CNPJ ou CPF.'})}
function compFiltros(){
  if(compTab===0){const obras=[...new Set(G.fila.map(q=>q.obra||''))];return K.chips('cp-obra',[['','Todas as obras'],...obras.filter(Boolean).map(o=>[o,obraNome(o)]),...(obras.includes('')?[['__est','Reposição de estoque']]:[])],compObra)}
  if(compTab===1)return K.chips('cp-st',[['','Todas'],...Object.keys(PED_ST).map(s=>[s,s])],compSt);
  return K.search('Nome, razão social, CNPJ ou CPF','cp-fq')+K.seg('cp-sit',[['Todos','Todos'],['Ativos','Ativos'],['Bloqueados','Bloqueados']],fornSit,'Situação')}
/* --- pedido: tela própria --- */
function pedPage(p){const st=p.status,f=D.byId('fornecedores',p.forn)||{nome:fornNome(p.forn)},nr=sum(p.itens,i=>i.rec),nq=sum(p.itens,i=>i.q);
  const pri={Rascunho:['Marcar como enviado','enviar'],Enviado:['Fornecedor confirmou','confirmar'],Confirmado:['Receber','receber'],'Recebido em parte':['Receber o que falta','receber']}[st];
  const sec={Rascunho:['Cancelar pedido','cancelar'],Enviado:['Cancelar pedido','cancelar'],Confirmado:['Cancelar pedido','cancelar'],'Recebido em parte':['Encerrar pedido','encerrar']}[st];
  const msg=`Olá! Segue o pedido ${p.n} da Teste Maestro: ${p.itens.map(i=>`${i.q}× ${i.nome}`).join('; ')}. Total ${brl(pedTot(p))}.`;
  return `${K.nav({title:`Pedido ${p.n}`,back:'Compras',kick:f.nome,sub:`${d3(p.data)} · prazo de ${p.prazo} dias · ${nr} de ${nq} recebidos`})}
   <div class="cg-tags">${chip(st,PED_ST[st])}${p.uso?chip('Uso comum'):''}</div>
   ${pri||sec?`<div class="mcard">${pri?K.btn(pri[0],{pri:true,act:pri[1],icon:pri[1]==='receber'?'caixa':'check'}):''}${sec?`<div class="${pri?'cg-gap':''}">${K.btn(sec[0],{dng:sec[1]==='cancelar',act:sec[1]})}</div>`:''}
     ${st==='Enviado'?'<p class="cg-note cg-gap">Quando o fornecedor confirmar, a conta a pagar nasce no Financeiro.</p>':''}</div>`:''}
   ${kvg('Itens',[...p.itens.map(i=>kv(esc(i.nome),brl(i.q*i.custo),`${esc(i.sku)} · ${esc(i.obra?obraNome(i.obra):p.uso?'Uso comum':'Reposição de estoque')}`,`<span class="${i.rec<i.q?'warn':'pos'}">${i.rec} de ${i.q}</span> · ${brl(i.custo)}`)),kv('<b>Total</b>',brl(pedTot(p)),`prazo de ${p.prazo} dias`)])}
   ${kvg('Recebimentos',p.receb.map(r=>kv(r.nf?'NF '+esc(r.nf):'Por bipagem',r.qt+' un.',`${d3(r.data)} · ${esc(depNome(r.dep))}`)))||kvg('Recebimentos',[kv('<span class="soft">Nenhum recebimento ainda.</span>','')])}
   ${p.motivo?kvg(st==='Cancelado'?'Motivo do cancelamento':'Motivo do encerramento',[kv(esc(p.motivo),'')],'','cg-wrap'):''}
   ${K.group({title:'Mandar ao fornecedor',rows:[{icon:'doc',title:'PDF do pedido',sub:'Com preços',act:'pdf'},{icon:'doc',color:'#8e8e93',title:'PDF sem preços',sub:'Para conferência na obra',act:'pdfsp'},
     ...(f.tel?[{icon:'zap',color:'#25d366',title:'WhatsApp',sub:esc(f.tel),href:`https://wa.me/55${tel(f.tel)}?text=${encodeURIComponent(msg)}`}]:[]),
     ...(f.email?[{icon:'email',title:'E-mail',sub:esc(f.email),href:`mailto:${f.email}?subject=${encodeURIComponent('Pedido '+p.n)}&body=${encodeURIComponent(msg)}`}]:[])]}).replace(/href="https:\/\/wa\.me/,'target="_blank" rel="noopener" href="https://wa.me')}
   ${K.group({rows:[{icon:'contatos',color:'#8e8e93',title:'Ver cadastro do fornecedor',href:'#/compras?forn='+p.forn}]})}`}
function receberSheet(p,after){
  const pend=p.itens.map(i=>Math.max(0,i.q-i.rec)),ag=pend.slice();let modo='nf';
  const itens=()=>p.itens.map((i,k)=>`<li><div class="rw"><span class="tx"><span class="t1">${esc(i.nome)}</span><span class="t2">${esc(i.sku)} · pedido ${i.q} · já ${i.rec}</span></span>
    ${pend[k]?`<span class="cg-step"><button type="button" data-act="menos" data-k="${k}" aria-label="Menos 1 de ${esc(i.nome)}">−</button><b>${ag[k]}</b><button type="button" data-act="mais" data-k="${k}" aria-label="Mais 1 de ${esc(i.nome)}">+</button></span>`:'<span class="vl">completo</span>'}</div></li>`).join('');
  const deps=G.deps.filter(d=>d.ativo).map(d=>[d.id,d.nome]);
  let s;
  const on={menos:b=>{const k=+b.dataset.k;ag[k]=Math.max(0,ag[k]-1);drawI()},mais:b=>{const k=+b.dataset.k;if(ag[k]>=pend[k])return M.toast(`${p.itens[k].nome}: já bateu a quantidade pendente.`);ag[k]++;drawI()},
    cam:()=>M.toast('Abre a câmera do celular para ler o código de barras (simulação).')};
  s=K.sheet({title:'Receber · '+p.n,ok:'Confirmar',cheia:true,body:`${K.seg('rc-modo',[['nf','Pela nota fiscal'],['bip','Por bipagem']],'nf','Forma de recebimento')}
    <div id="rc-nf">${K.form([{fields:[{k:'nfnum',label:'Número da NF',req:true,ph:'Obrigatório'},{k:'nfdata',label:'Data',type:'date',value:HOJE}]}])}</div>
    <div id="rc-bip" hidden>${K.form([{fields:[{k:'bip',label:'Código',ph:'Bipe ou digite'},{k:'nfopc',label:'Nota fiscal',ph:'Opcional'}],foot:'Cada leitura soma 1 ao item. Toque em Ir no teclado depois de digitar.'}])}<div class="cg-gap">${K.btn('Ler com a câmera',{icon:'camera',act:'cam'})}</div></div>
    <div class="cg-gap">${K.form([{title:'Depósito',fields:[{k:'dep',label:'Depósito',type:'select',opts:deps,value:(G.deps.find(d=>d.padrao)||{}).id}]}])}</div>
    <section class="grp"><h2>Quanto chegou agora</h2><ul class="lst" id="rc-it">${itens()}</ul></section>
    ${K.form([{title:'Nº de série (opcional)',fields:p.itens.map((i,k)=>pend[k]?{k:'sn'+k,label:i.nome,ph:'Opcional'}:null).filter(Boolean)}])}`,
    on,onOk:el=>{const nf=modo==='nf'?$('[name=nfnum]',el).value.trim():$('[name=nfopc]',el).value.trim();
      if(modo==='nf'&&!nf){$('[name=nfnum]',el).closest('.fr').classList.add('err');$('[name=nfnum]',el).focus();M.toast('Informe o número da nota fiscal.');return false}
      const tot=sum(ag,x=>x);if(!tot){M.toast('Informe quanto chegou agora.');return false}
      const dep=$('[name=dep]',el).value,quando=(modo==='nf'?$('[name=nfdata]',el).value:HOJE)||HOJE;
      p.itens.forEach((i,k)=>{if(!ag[k])return;i.rec+=ag[k];let pr=prodBy(i.sku);
        if(!pr){pr={sku:i.sku,nome:i.nome,un:'un',forn:p.forn,custo:i.custo,min:0,dep:{},res:[]};G.prod.push(pr)}
        const f0=fis(pr);pr.custo=r2((pr.custo*f0+i.custo*ag[k])/(f0+ag[k]||1));pr.dep[dep]=(pr.dep[dep]||0)+ag[k];if(i.obra)pr.res.push({obra:i.obra,q:ag[k],dep});
        G.emov.unshift({data:quando+' '+new Date().toTimeString().slice(0,5),tipo:'Entrada',sku:i.sku,q:ag[k],dep,motivo:`Pedido ${p.n}${nf?' · NF '+nf:''}`})});
      p.receb.push({data:quando,nf:nf||'',dep,qt:tot});p.status=p.itens.every(i=>i.rec>=i.q)?'Recebido':'Recebido em parte';
      M.toast(`${tot} ${pl(tot,'unidade recebida','unidades recebidas')} no ${depNome(dep)}. Pedido ${p.status.toLowerCase()}.`);after&&after()}});
  const drawI=()=>{const u=$('#rc-it',s.el);u.innerHTML=itens();M.wire(u,on)};
  K.bindPick(s.el,'rc-modo',x=>{modo=x;$('#rc-nf',s.el).hidden=x!=='nf';$('#rc-bip',s.el).hidden=x!=='bip';if(x==='bip'){ag.fill(0);drawI();$('[name=bip]',s.el).focus()}else{pend.forEach((n,k)=>ag[k]=n);drawI()}});
  const bip=$('[name=bip]',s.el);bip.setAttribute('enterkeyhint','go');
  bip.addEventListener('keydown',e=>{if(e.key!=='Enter')return;e.preventDefault();const c=bip.value.trim().toUpperCase(),k=p.itens.findIndex(i=>i.sku.toUpperCase()===c);
    if(k<0)return M.toast(`Código ${c||'vazio'} não está neste pedido.`);if(ag[k]>=pend[k])return M.toast(`${p.itens[k].nome}: já bateu a quantidade pendente.`);
    ag[k]++;bip.value='';drawI();M.toast(`${c} · ${ag[k]} de ${pend[k]}`)});
}
/* --- fornecedor --- */
function fornPage(f){const x=f.extra||{},pes=f.pessoas||[{nome:'Vendedor(a) responsável',cargo:'Comercial',tel:f.tel,email:f.email}],anx=f.anexos||['Tabela de preços 2026.pdf'];
  const peds=G.ped.filter(p=>p.forn===f.id).sort((a,b)=>b.n-a.n);
  return `${K.nav({title:f.nome,back:'Compras',kick:'Fornecedor',sub:esc(f.razao)})}
   <div class="cg-tags">${chip(f.situacao,f.situacao==='Ativo'?'g':'r')}${f.marcas.map(m=>chip(m)).join('')}</div>
   ${K.group({rows:[...(f.tel?[{icon:'telefone',color:'rgb(var(--pos))',title:'Ligar',sub:esc(f.tel),href:'tel:'+tel(f.tel)},{icon:'zap',color:'#25d366',title:'WhatsApp',sub:esc(f.tel),href:`https://wa.me/55${tel(f.tel)}`}]:[]),
     ...(f.email?[{icon:'email',title:'E-mail',sub:esc(f.email),href:'mailto:'+f.email}]:[])]}).replace(/href="https:\/\/wa\.me/,'target="_blank" rel="noopener" href="https://wa.me')}
   ${kvg('Dados',[kv('CNPJ ou CPF',esc(f.doc)),kv('Razão social','',esc(f.razao)),...(x.site?[kv('Site',esc(x.site))]:[]),...(x.end?[kv('Endereço','',esc([x.end,x.numero,x.bairro,x.cidade,x.uf].filter(Boolean).join(', ')))]:[])])}
   ${kvg('Comercial',[kv('Marcas',esc(f.marcas.join(', ')||'—')),kv('Prazo de entrega',(x.prazo||'10')+' dias'),kv('Condição',esc(x.cond||'28 dias')),kv('Frete',esc((x.frete||'CIF (fornecedor paga)').split(' ')[0]))])}
   ${kvg('Pessoas',pes.map(p=>kv(esc(p.nome),'',esc([p.cargo,p.tel,p.email].filter(Boolean).join(' · ')))))}
   ${kvg('Anexos',anx.map(a=>kv(esc(a),'')))}
   ${peds.length?K.group({title:'Pedidos',rows:peds.map(p=>({icon:'compras',color:PED_COR[p.status],title:`Nº ${p.n}`,sub:`${d2(p.data)} · ${esc(p.status)}`,value:brl(pedTot(p)),href:'#/compras?ped='+p.n}))}):''}
   <div class="mcard"><div class="mbtns">${K.btn(f.situacao==='Ativo'?'Bloquear':'Desbloquear',{act:'bloq',dng:f.situacao==='Ativo'})}${K.btn('Editar cadastro',{pri:true,act:'editF'})}</div></div>`}
function fornSheet(f,after){const x=(f&&f.extra)||{},val=k=>x[k]!=null?x[k]:'';
  const groups=[
   {title:'Dados',fields:[{k:'tipo',label:'Tipo',type:'select',opts:['Pessoa jurídica','Pessoa física'],value:val('tipo')||'Pessoa jurídica'},{k:'doc',label:'CNPJ ou CPF',req:true,value:f?f.doc:''},
    {k:'situacao',label:'Situação',type:'select',opts:['Ativo','Bloqueado'],value:f?f.situacao:'Ativo'},{k:'razao',label:'Razão social',req:true,value:f?f.razao:''},{k:'nome',label:'Nome fantasia',value:f?f.nome:''},
    {k:'tel',label:'Telefone',type:'tel',value:f?f.tel:''},{k:'email',label:'E-mail',type:'email',value:f?f.email:''},{k:'site',label:'Site',value:val('site')}]},
   {title:'Endereço',fields:[{k:'cep',label:'CEP',value:val('cep')},{k:'end',label:'Endereço',value:val('end')},{k:'numero',label:'Número',value:val('numero')},{k:'bairro',label:'Bairro',value:val('bairro')},{k:'cidade',label:'Cidade',value:val('cidade')},{k:'uf',label:'UF',value:val('uf')}]},
   {title:'Comercial',fields:[{k:'marcas',label:'Marcas',value:f?f.marcas.join(', '):'',ph:'Separe por vírgula'},{k:'prazo',label:'Prazo (dias)',type:'number',value:val('prazo')||'10'},{k:'minimo',label:'Pedido mínimo',type:'money',value:val('minimo')},
    {k:'frete',label:'Frete',type:'select',opts:['CIF (fornecedor paga)','FOB (nós pagamos)'],value:val('frete')||'CIF (fornecedor paga)'},{k:'cond',label:'Condição',type:'select',opts:['À vista','28 dias','30/60','30/60/90'],value:val('cond')||'28 dias'},
    {k:'vend',label:'Vendedor',value:val('vend')},{k:'obs',label:'Observações',type:'textarea',value:val('obs')}],foot:'O A comprar usa as marcas para sugerir este fornecedor.'},
   {title:'Fiscal',fields:[{k:'ie',label:'Inscrição estadual',value:val('ie')},{k:'im',label:'Inscrição municipal',value:val('im')},{k:'regime',label:'Regime',type:'select',opts:['Simples Nacional','Lucro presumido','Lucro real','MEI'],value:val('regime')||'Lucro presumido'},
    {k:'icms',label:'ICMS',type:'select',opts:['Contribuinte','Isento','Não contribuinte'],value:val('icms')||'Contribuinte'},{k:'cnae',label:'CNAE principal',value:val('cnae')},{k:'st',label:'Vende com ICMS-ST',type:'select',opts:['Não','Sim'],value:val('st')||'Não'}]},
   {title:'Pagamento',fields:[{k:'forma',label:'Forma preferida',type:'select',opts:['Boleto','Pix','Transferência','Cartão'],value:val('forma')||'Boleto'},{k:'pix',label:'Chave Pix',value:val('pix')},
    {k:'banco',label:'Banco',value:val('banco')},{k:'ag',label:'Agência',value:val('ag')},{k:'cc',label:'Conta',value:val('cc')},{k:'fav',label:'Favorecido',value:val('fav')||(f?f.razao:'')}]},
   {title:'Nova pessoa de contato',fields:[{k:'p_nome',label:'Nome',ph:'Opcional'},{k:'p_cargo',label:'Cargo',ph:'Opcional'},{k:'p_tel',label:'Telefone',type:'tel',ph:'Opcional'},{k:'p_email',label:'E-mail',type:'email',ph:'Opcional'}]}];
  const anexos=(f&&f.anexos)?f.anexos.slice():f?['Tabela de preços 2026.pdf']:[];
  const s=fs({title:f?'Editar fornecedor':'Novo fornecedor',ok:f?'Salvar':'Criar',groups,
    onOk:v=>{const ex={};groups.slice(0,5).flatMap(g=>g.fields).forEach(fl=>ex[fl.k]=v[fl.k]);
      const pessoas=(f&&f.pessoas)?f.pessoas.slice():f?[{nome:'Vendedor(a) responsável',cargo:'Comercial',tel:f.tel,email:f.email}]:[];
      if(v.p_nome)pessoas.push({nome:v.p_nome,cargo:v.p_cargo,tel:v.p_tel,email:v.p_email});
      const dados={nome:v.nome||v.razao,razao:v.razao,doc:v.doc,tel:v.tel,email:v.email,marcas:v.marcas.split(',').map(z=>z.trim()).filter(Boolean),situacao:v.situacao,extra:ex,pessoas,anexos};
      let id=f&&f.id;if(f)Object.assign(f,dados);else{id='f'+(++G.seq);D.fornecedores.push(Object.assign({id},dados))}
      M.toast(f?'Fornecedor salvo.':'Fornecedor criado.');after&&after(id)}},'',
    `<section class="grp"><h2>Anexos</h2><ul class="lst" id="fo-anx"></ul><ul class="lst cg-gap"><li><label class="rw ic40" style="cursor:pointer"><span class="mic" aria-hidden="true">${ic('upload',22)}</span><span class="tx"><span class="t1">Anexar arquivo</span><span class="t2">Contrato, tabela de preços, certidões</span></span><input type="file" class="sr" id="fo-file"></label></li></ul></section>`);
  const drawA=()=>{$('#fo-anx',s.el).innerHTML=anexos.map(a=>kv(esc(a),'')).join('')||kv('<span class="soft">Nenhum anexo.</span>','')};
  $('#fo-file',s.el).onchange=e=>{const a=e.target.files[0];if(a){anexos.push(a.name);drawA()}};drawA();
}
/* --- Uso comum (compra avulsa) --- */
function avulsoSheet(after){const linhas=[];let s;
  const drawL=()=>{const u=$('#av-l',s.el);u.innerHTML=linhas.length?linhas.map((l,k)=>K.row({title:esc(l.nome),sub:`${l.q} × ${brl(l.custo)}${l.sku?' · '+esc(l.sku):''}`,value:brl(l.q*l.custo),act:'it',i:k,swipe:[{label:'Tirar',icon:'lixo',act:'tirar',tone:3}]})).join('')
    :kv('<span class="soft">Nenhum item ainda.</span>','');M.wire(u,on);K.bindSwipe(u)};
  const on={addp:()=>{const sk=$('[name=av_p]',s.el).value,p=prodBy(sk);if(!p)return M.toast('Escolha um produto do estoque.');linhas.push({sku:p.sku,nome:p.nome,q:1,custo:p.custo});$('[name=av_p]',s.el).value='';drawL()},
    addd:()=>{const d=$('[name=av_d]',s.el).value.trim();if(d.length<3)return M.toast('Descreva o item (pelo menos 3 letras).');linhas.push({sku:'',nome:d,q:1,custo:0});$('[name=av_d]',s.el).value='';drawL();M.toast('Item adicionado: toque nele para pôr quantidade e custo.')},
    tirar:b=>{linhas.splice(+b.dataset.i,1);drawL()},
    it:b=>{const l=linhas[+b.dataset.i];K.formSheet({title:'Item',ok:'OK',cheia:false,groups:[{title:l.nome,fields:[{k:'q',label:'Quantidade',type:'number',req:true,value:String(l.q)},{k:'c',label:'Custo unitário',type:'money',value:fmtIn(l.custo)}]}],
      onOk:v=>{const q=parseInt(v.q,10);if(!(q>=1)){M.toast('A quantidade precisa ser pelo menos 1.');return false}l.q=q;l.custo=num(v.c);drawL()}})}};
  s=K.sheet({title:'Uso comum',ok:'Gerar pedido',cheia:true,on,body:`<p class="cg-note" style="margin-bottom:16px">Compra avulsa, fora de obra: escritório, ferramentas, consumo da equipe.</p>
    ${K.form([{title:'Fornecedor',fields:[{k:'av_f',label:'Fornecedor',type:'select',req:true,opts:D.fornecedores.filter(f=>f.situacao==='Ativo').map(f=>[f.id,f.nome]),ph:'Escolher'}]},
      {title:'Do estoque',fields:[{k:'av_p',label:'Produto',type:'select',opts:G.prod.map(p=>[p.sku,p.nome]),ph:'Escolher'}]}])}<div class="cg-gap">${K.btn('Adicionar produto',{icon:'mais',act:'addp'})}</div>
    <div class="cg-gap">${K.form([{title:'Ou descrição livre',fields:[{k:'av_d',label:'Item',ph:'Ex.: Fita isolante'}]}])}</div><div class="cg-gap">${K.btn('Adicionar item',{icon:'mais',act:'addd'})}</div>
    <section class="grp cg-gap"><h2>Itens do pedido</h2><ul class="lst" id="av-l"></ul></section>`,
    onOk:el=>{const fo=$('[name=av_f]',el).value;if(!fo){$('[name=av_f]',el).closest('.fr').classList.add('err');M.toast('Escolha o fornecedor.');return false}
      if(!linhas.length){M.toast('Adicione pelo menos um item.');return false}
      const n=Math.max(...G.ped.map(p=>p.n))+1;G.ped.push({n,data:HOJE,forn:fo,prazo:7,status:'Rascunho',itens:linhas.map(l=>({sku:l.sku||'AVULSO',nome:l.nome,obra:'',q:l.q,rec:0,custo:l.custo})),receb:[],uso:true});
      M.toast(`Pedido ${n} de uso comum criado em Rascunho.`,'Abrir',()=>go('#/compras?ped='+n));after&&after(n)}});
  drawL()}

M.mscreen('compras',{title:'Compras',tab:'compras',
  help:['A comprar junta o que falta comprar de todas as obras, agrupado por fornecedor: toque nos itens para marcar e use “Gerar pedido”.',
    'Deslize um item para usar o que já tem no estoque; em Pedidos, abra um pedido para enviar, confirmar, receber, encerrar ou cancelar.',
    'O + cria reposição de estoque, compra de uso comum ou um fornecedor novo.'],
  render:q=>{
    if(q.get('ped')){const p=G.ped.find(x=>x.n===+q.get('ped'));return p?pedPage(p):K.nav({title:'Pedido',back:'Compras'})+K.empty({title:'Pedido não encontrado.'})}
    if(q.get('forn')){const f=D.byId('fornecedores',q.get('forn'));return f?fornPage(f):K.nav({title:'Fornecedor',back:'Compras'})+K.empty({title:'Fornecedor não encontrado.'})}
    const a=q.get('aba');if(a)compTab=a==='pedidos'?1:a==='fornecedores'?2:0;
    const obrasF=[...new Set(G.fila.map(x=>x.obra||''))].length;
    return `${K.nav({title:'Compras',kick:`${obrasF} obras com itens pendentes`,acts:[{icon:'mais',title:'Novo em Compras',act:'novo'}]})}
     ${K.seg('cp-tab',[['0','A comprar'],['1','Pedidos'],['2','Fornecedores']],String(compTab),'Seções de Compras')}
     <div id="cp-f">${compFiltros()}</div><div id="cp-b">${[comprarHTML,pedidosHTML,fornHTML][compTab]()}</div>
     <div class="cg-sel" id="cp-sel" hidden role="region" aria-label="Itens selecionados"><span><b id="cp-n"></b><small id="cp-t"></small></span><button type="button" data-act="limpar">Limpar</button><button type="button" class="p" data-act="gerarPed">Gerar pedido</button></div>`},
  mount:(v,q)=>{
    if(q.get('ped')){const p=G.ped.find(x=>x.n===+q.get('ped'));if(!p)return;const f=fornNome(p.forn);
      M.wire(v,{pdf:()=>M.toast(`Gera o PDF do pedido ${p.n} com preços (simulação).`),pdfsp:()=>M.toast(`Gera o PDF do pedido ${p.n} sem preços, para conferência na obra (simulação).`),
        enviar:()=>{p.status='Enviado';M.toast(`Pedido ${p.n} marcado como enviado.`);rr()},
        confirmar:()=>{p.status='Confirmado';G.tit.push(T(nid('t'),'pag',`Pedido ${p.n} · Compra`,f,p.itens[0].obra||'','',pedTot(p),addDias(HOJE,28),{emissao:HOJE}));
          M.toast(`Fornecedor confirmou. Conta a pagar de ${brl(pedTot(p))} criada no Financeiro.`,'Ver',()=>go('#/financeiro?aba=pagar'));rr()},
        receber:()=>receberSheet(p,rr),
        cancelar:()=>motivoSheet(`Cancelar pedido ${p.n}`,`${f} · ${brl(pedTot(p))} · os itens voltam para A comprar`,'Cancelar pedido',m=>{p.status='Cancelado';p.motivo=m;
          p.itens.filter(i=>i.rec<i.q).forEach(i=>G.fila.push({id:nid('q'),sku:i.sku,nome:i.nome,q:i.q-i.rec,custo:i.custo,obra:i.obra,forn:p.forn}));M.toast(`Pedido ${p.n} cancelado. Os itens voltaram para A comprar.`);rr()}),
        encerrar:()=>motivoSheet(`Encerrar pedido ${p.n}`,'O que faltou receber deixa de ser esperado','Encerrar',m=>{p.status='Encerrado';p.motivo=m;M.toast(`Pedido ${p.n} encerrado.`);rr()})});return}
    if(q.get('forn')){const f=D.byId('fornecedores',q.get('forn'));if(!f)return;
      M.wire(v,{editF:()=>fornSheet(f,rr),bloq:()=>{if(f.situacao==='Ativo')K.confirm({title:`Bloquear ${f.nome}?`,text:'Não entra em pedidos novos até desbloquear.',ok:'Bloquear',dng:true,run:()=>{f.situacao='Bloqueado';rr();M.toast('Fornecedor bloqueado.')}});
        else{f.situacao='Ativo';rr();M.toast('Fornecedor desbloqueado.')}}});return}
    const box=$('#cp-b',v),flt=$('#cp-f',v),bar=$('#cp-sel',v);
    const selBar=()=>{const n=sel.size;bar.hidden=compTab!==0||!n;if(n){$('#cp-n',v).textContent=`${n} ${pl(n,'selecionado','selecionados')}`;$('#cp-t',v).textContent=brl(filaTot(G.fila.filter(x=>sel.has(x.id))))}};
    const draw=()=>{box.innerHTML=[comprarHTML,pedidosHTML,fornHTML][compTab]();M.wire(box,H);K.bindSwipe(box);selBar()};
    const filtros=()=>{flt.innerHTML=compFiltros();
      K.bindPick(flt,'cp-obra',x=>{compObra=x;draw()});K.bindPick(flt,'cp-st',x=>{compSt=x;draw()});K.bindPick(flt,'cp-sit',x=>{fornSit=x;draw()});
      const fq=$('#cp-fq',flt);if(fq){fq.value=fornQ;fq.oninput=()=>{fornQ=fq.value;draw()}}};
    const byQ=el=>G.fila.find(x=>x.id===el.dataset.i);
    const H={
      tg:el=>{const id=el.dataset.i;sel.has(id)?sel.delete(id):sel.add(id);draw()},
      selAll:el=>{const all=filaVis().filter(x=>x.forn===el.dataset.i),tudo=all.every(x=>sel.has(x.id));all.forEach(x=>tudo?sel.delete(x.id):sel.add(x.id));draw()},
      expand:el=>{const f=el.dataset.i;abertoG.has(f)?abertoG.delete(f):abertoG.add(f);draw()},
      definir:el=>{const it=byQ(el);K.actions({title:`Quem vende ${it.nome}?`,items:D.fornecedores.filter(f=>f.situacao==='Ativo').map(f=>({label:f.nome,run:()=>{it.forn=f.id;draw();M.toast(`${it.nome} agora sai pela ${f.nome}.`)}}))})},
      usar:el=>{const it=byQ(el),p=prodBy(it.sku),dep=(Object.entries(p.dep).sort((a,b)=>b[1]-a[1])[0]||['d1'])[0],u=Math.min(it.q,disp(p));
        const r={obra:it.obra,q:u,dep};p.res.push(r);const antes=it.q;it.q-=u;const tirou=it.q<=0;if(tirou)G.fila.splice(G.fila.indexOf(it),1);sel.delete(it.id);draw();
        M.toast(`${u} ${p.un} reservados do estoque para ${obraTxt(it.obra)}.${tirou?' Item saiu da fila.':` Faltam ${it.q} para comprar.`}`,'Desfazer',()=>{p.res.splice(p.res.indexOf(r),1);it.q=antes;if(tirou)G.fila.push(it);draw()})},
      repor:el=>{const p=prodBy(el.dataset.i);if(G.fila.find(x=>x.sku===p.sku&&!x.obra))return M.toast(`${p.nome} já está na fila de reposição.`);
        K.confirm({title:`Repor ${p.min-disp(p)} ${p.un} de ${p.nome}?`,text:`Vai para a fila de A comprar, pela ${fornNome(p.forn)}.`,ok:'Pôr na fila',run:()=>{G.fila.push({id:nid('q'),sku:p.sku,nome:p.nome,q:p.min-disp(p),custo:p.custo,obra:'',forn:p.forn});draw();M.toast(`${p.nome} · ${p.min-disp(p)} ${p.un} na fila de A comprar.`)}})},
      limpar:()=>{sel.clear();draw()},
      gerarPed:()=>{const its=G.fila.filter(x=>sel.has(x.id)),fsx=[...new Set(its.map(x=>x.forn))];
        const bloq=fsx.filter(fid=>(D.byId('fornecedores',fid)||{}).situacao==='Bloqueado');if(bloq.length)return M.toast(`${fornNome(bloq[0])} está bloqueado: tire os itens dele ou desbloqueie no cadastro.`);
        K.formSheet({title:'Gerar pedido',ok:'Gerar',cheia:false,groups:[{title:`${its.length} ${pl(its.length,'item','itens')} · ${fsx.length} ${pl(fsx.length,'fornecedor','fornecedores')} · ${brl(filaTot(its))}`,
          fields:[{k:'prazo',label:'Prazo (dias)',type:'number',req:true,value:'10'}],foot:'Cada fornecedor vira um pedido em Rascunho.'}],
          onOk:x=>{const prazo=Math.max(1,parseInt(x.prazo,10)||10);let n=Math.max(...G.ped.map(p=>p.n));
            fsx.forEach(fid=>G.ped.push({n:++n,data:HOJE,forn:fid,prazo,status:'Rascunho',itens:its.filter(i=>i.forn===fid).map(i=>({sku:i.sku,nome:i.nome,obra:i.obra,q:i.q,rec:0,custo:i.custo})),receb:[]}));
            its.forEach(i=>G.fila.splice(G.fila.indexOf(i),1));sel.clear();draw();
            M.toast(`${fsx.length} ${pl(fsx.length,'pedido criado','pedidos criados')} em Rascunho.`,'Ver pedidos',()=>{compTab=1;setPick(v,'cp-tab','1');filtros();draw()})}})},
      novo:()=>K.actions({title:'Novo em Compras',items:[
        {label:'Reposição de estoque',run:()=>K.formSheet({title:'Reposição',ok:'Pôr na fila',cheia:false,groups:[{title:'Produto do estoque, sem obra',fields:[
            {k:'sku',label:'Produto',type:'select',req:true,opts:G.prod.map(p=>[p.sku,`${p.nome} · disp. ${disp(p)}`]),ph:'Escolher'},{k:'q',label:'Quantidade',type:'number',req:true,value:'1'},
            {k:'forn',label:'Fornecedor',type:'select',opts:D.fornecedores.map(f=>[f.id,f.nome]),ph:'Sem fornecedor'}]}],
          onOk:x=>{const p=prodBy(x.sku),n=parseInt(x.q,10)||0;if(n<1){M.toast('Informe a quantidade.');return false}
            G.fila.push({id:nid('q'),sku:p.sku,nome:p.nome,q:n,custo:p.custo,obra:'',forn:x.forn||p.forn||null});if(compTab!==0){compTab=0;setPick(v,'cp-tab','0');filtros()}draw();M.toast(`${p.nome} · ${n} ${p.un} na fila de A comprar.`)}})},
        {label:'Uso comum (compra avulsa)',run:()=>avulsoSheet(()=>{if(compTab===1)draw()})},
        {label:'Novo fornecedor',run:()=>fornSheet(null,id=>go('#/compras?forn='+id))}]})};
    K.bindPick(v,'cp-tab',x=>{compTab=+x;filtros();draw()});
    filtros();M.wire(v,H);selBar();
  }});

/* =====================================================================
   ESTOQUE
   ===================================================================== */
let estTab='saldo',estQ='',estSo=false;
const prodSub=p=>{const t=Object.entries(p.dep).filter(e=>e[1]).map(([d,n])=>`${depNome(d)} ${n}`).join(' · ')||'sem saldo';return `${esc(p.sku)} · ${esc(t)}`};
const minAbaixo=()=>G.prod.filter(p=>p.min>0&&disp(p)<p.min);
function estFiltros(){return estTab==='saldo'?K.search('Buscar produto, código, modelo…','es-q')+K.chips('es-so',[['1','Só com saldo ou reserva']],estSo?'1':''):''}
function estBody(){
  if(estTab==='saldo'){const q=estQ.trim().toLowerCase(),L=G.prod.filter(p=>(!q||(p.nome+' '+p.sku).toLowerCase().includes(q))&&(!estSo||fis(p)>0||resv(p)>0)),ab=minAbaixo().length;
    return `${K.tiles([{label:'Produtos em estoque',value:String(G.prod.filter(p=>fis(p)>0).length)},{label:'Valor em estoque',value:M.brl0(sum(G.prod,p=>fis(p)*p.custo)),sub:'pelo custo médio'},
        {label:'Reservado para obras',value:M.brl0(sum(G.prod,p=>resv(p)*p.custo)),sub:`${sum(G.prod,p=>p.res.length)} reservas`},{label:'Abaixo do mínimo',value:String(ab),sub:ab?'toque para repor':'tudo acima',tone:ab?'warn':'',act:'irMin'}])}
      ${L.length?K.group({title:`${L.length} ${pl(L.length,'produto','produtos')}`,rows:L.map(p=>({icon:'caixa',color:p.min&&disp(p)<p.min?'rgb(var(--warn))':'',title:esc(p.nome),sub:prodSub(p),value:`${disp(p)} ${p.un}`,value2:`físico ${fis(p)}${resv(p)?` · <span class="warn">res. ${resv(p)}</span>`:''}`,act:'prod',i:p.sku}))})
        :K.empty({title:'Nenhum produto encontrado.',text:'Tente outro nome, código ou modelo.'})}`}
  if(estTab==='mov')return G.emov.length?K.group({title:`${G.emov.length} movimentos`,foot:'Toque para ver o motivo completo.',rows:G.emov.map((m,i)=>{const p=prodBy(m.sku);
      return {icon:m.tipo==='Entrada'?'+':m.tipo==='Saída'?'−':'⇄',color:m.tipo==='Entrada'?'rgb(var(--pos))':m.tipo==='Saída'?'rgb(var(--neg))':'rgb(var(--primary))',title:esc(p?p.nome:m.sku),
        sub:`${d2(m.data.slice(0,10))} ${m.data.slice(11)} · ${esc(depNome(m.dep)+(m.para?' → '+depNome(m.para):''))} · ${esc(m.motivo)}`,value:`<span class="${m.tipo==='Saída'?'neg':m.tipo==='Entrada'?'pos':''}">${m.tipo==='Saída'?'− ':m.tipo==='Entrada'?'+ ':''}${m.q}</span>`,act:'mov',i}})}):K.empty({title:'Nenhum movimento ainda.'});
  if(estTab==='res'){const R=[];G.prod.forEach(p=>p.res.forEach((r,k)=>R.push({p,r,k})));const os=[...new Set(R.map(x=>x.r.obra))];
    return R.length?os.map((o,gi)=>K.group({title:obraNome(o)||'Sem obra',foot:gi===0?'Deslize para liberar a reserva.':'',rows:R.filter(x=>x.r.obra===o).map(x=>({icon:'caixa',title:esc(x.p.nome),sub:`${esc(x.p.sku)} · ${esc(depNome(x.r.dep))}`,value:`${x.r.q} ${x.p.un}`,value2:brl(x.r.q*x.p.custo),act:'res',i:x.p.sku+'|'+x.k,swipe:[{label:'Liberar',icon:'x',act:'liberar',tone:3}]}))})).join('')
      :K.empty({title:'Nenhuma reserva.',text:'Reservas nascem quando um item de obra é atendido pelo estoque ou recebido de um pedido.'})}
  if(estTab==='min'){const L=minAbaixo();return L.length?K.group({title:`${L.length} abaixo do mínimo`,foot:'Deslize ou toque para mandar a reposição para Compras.',rows:L.map(p=>{const na=G.fila.find(q=>q.sku===p.sku&&!q.obra);
      return {icon:'estoque',color:'rgb(var(--warn))',title:esc(p.nome),sub:`disponível ${disp(p)} · mínimo ${p.min} · ${esc(fornNome(p.forn))}`,value:na?'na fila':`falta ${p.min-disp(p)}`,act:'repor',i:p.sku,swipe:na?null:[{label:'Repor',icon:'compras',act:'repor',tone:4}]}})})
      :K.empty({title:'Nada abaixo do mínimo.',text:'Todos os produtos com mínimo definido estão acima dele.'})}
  return `${K.group({title:'Depósitos',foot:'Deslize para tornar padrão ou desativar.',rows:G.deps.map(d=>({icon:'casa',color:d.ativo?'':'#8e8e93',title:`${esc(d.nome)}${d.padrao?' '+chip('padrão','b'):''}${d.ativo?'':' '+chip('inativo')}`,
      sub:`${G.prod.filter(p=>p.dep[d.id]>0).length} produtos · ${sum(G.prod,p=>p.dep[d.id]||0)} unidades`,act:'dep',i:d.id,
      swipe:d.padrao?null:[...(d.ativo?[{label:'Tornar padrão',icon:'check',act:'padrao',tone:1}]:[]),{label:d.ativo?'Desativar':'Reativar',icon:d.ativo?'x':'trocar',act:'ativo',tone:d.ativo?3:4}]}))})}
    ${K.form([{title:'Novo depósito',fields:[{k:'ndep',label:'Nome',ph:'Ex.: Carro do técnico'}]}])}<div class="cg-gap">${K.btn('Criar depósito',{icon:'mais',act:'criarDep'})}</div>`}
function movSheet(after,sku){const deps=G.deps.filter(d=>d.ativo).map(d=>[d.id,d.nome]);
  const s=K.formSheet({title:'Movimento manual',ok:'Registrar',groups:[
    {title:'Entrada, saída ou transferência fora de pedido e de obra',fields:[{k:'sku',label:'Produto',type:'select',req:true,opts:G.prod.map(p=>[p.sku,p.nome]),ph:'Escolher',value:sku||''},
      {k:'tipo',label:'Tipo',type:'select',req:true,opts:['Entrada','Saída','Transferência'],value:'Entrada'},{k:'q',label:'Quantidade',type:'number',req:true,value:'1'},{k:'custo',label:'Custo unitário',type:'money',ph:'Só na entrada'}]},
    {title:'Onde',fields:[{k:'de',label:'Depósito',type:'select',req:true,opts:deps,value:(G.deps.find(d=>d.padrao)||{}).id},{k:'para',label:'Para',type:'select',opts:deps,ph:'Só na transferência'}]},
    {fields:[{k:'motivo',label:'Motivo',req:true,ph:'Ex.: Ajuste de inventário'}],foot:'Pelo menos 3 letras.'}],
    onOk:x=>{const p=prodBy(x.sku),q=parseInt(x.q,10)||0;
      if(q<1){M.toast('A quantidade precisa ser pelo menos 1.');return false}
      if(x.motivo.length<3){M.toast('Escreva o motivo (pelo menos 3 letras).');return false}
      if(x.tipo!=='Entrada'&&(p.dep[x.de]||0)<q){M.toast(`${depNome(x.de)} só tem ${p.dep[x.de]||0} ${p.un} de ${p.nome}.`);return false}
      if(x.tipo==='Transferência'&&(!x.para||x.para===x.de)){M.toast('Escolha o depósito de destino, diferente da origem.');return false}
      if(x.tipo==='Entrada'){const c=num(x.custo),f0=fis(p);if(c>0)p.custo=r2((p.custo*f0+c*q)/(f0+q));p.dep[x.de]=(p.dep[x.de]||0)+q}
      else if(x.tipo==='Saída')p.dep[x.de]-=q;else{p.dep[x.de]-=q;p.dep[x.para]=(p.dep[x.para]||0)+q}
      G.emov.unshift({data:HOJE+' '+new Date().toTimeString().slice(0,5),tipo:x.tipo,sku:p.sku,q,dep:x.de,para:x.tipo==='Transferência'?x.para:'',motivo:x.motivo});
      after&&after();M.toast(`${x.tipo} de ${q} ${p.un} registrada. Disponível agora: ${disp(p)}.`)}});
  const tp=$('[name=tipo]',s.el),sync=()=>{$('[name=para]',s.el).closest('.fr').style.display=tp.value==='Transferência'?'':'none';$('[name=custo]',s.el).closest('.fr').style.display=tp.value==='Entrada'?'':'none'};tp.onchange=sync;sync()}
M.mscreen('estoque',{title:'Estoque',tab:'estoque',
  help:['Saldo mostra o físico, o reservado para obras e o disponível de cada produto; toque para ver por depósito.',
    'Movimentos lista entradas, saídas e transferências com o motivo; Reservas e Abaixo do mínimo deslizam para liberar ou repor.',
    'O + registra um movimento manual e já altera o saldo; em Depósitos você cria, torna padrão ou desativa.'],
  render:()=>`${K.nav({title:'Estoque',kick:`${G.deps.filter(d=>d.ativo).length} depósitos ativos`,acts:[{icon:'mais',title:'Movimento manual',act:'novo'}]})}
    ${K.chips('es-tab',[['saldo','Saldo'],['mov','Movimentos'],['res','Reservas'],['min','Abaixo do mínimo'],['dep','Depósitos']],estTab)}
    <div id="es-f">${estFiltros()}</div><div id="es-b">${estBody()}</div>`,
  mount:v=>{const box=$('#es-b',v),flt=$('#es-f',v);
    const draw=()=>{box.innerHTML=estBody();M.wire(box,H);K.bindSwipe(box)};
    const filtros=()=>{flt.innerHTML=estFiltros();const qi=$('#es-q',flt);if(qi){qi.value=estQ;qi.oninput=()=>{estQ=qi.value;draw()}}
      const so=$('#es-so button',flt);if(so)so.onclick=()=>{estSo=!estSo;so.setAttribute('aria-pressed',estSo);draw()}};
    const ir=t=>{estTab=t;setPick(v,'es-tab',t);filtros();draw();const b=$(`#es-tab [data-v="${t}"]`,v);b&&b.scrollIntoView({block:'nearest',inline:'center'})};
    const repor=p=>{if(G.fila.find(q=>q.sku===p.sku&&!q.obra))return M.toast(`${p.nome} já está na fila de compras.`);
      G.fila.push({id:nid('q'),sku:p.sku,nome:p.nome,q:p.min-disp(p),custo:p.custo,obra:'',forn:p.forn});draw();M.toast(`${p.nome} · ${p.min-disp(p)} ${p.un} na fila de A comprar.`,'Abrir Compras',()=>go('#/compras'))};
    const resOf=el=>{const [sku,k]=el.dataset.i.split('|');const p=prodBy(sku);return {p,r:p.res[+k]}};
    const liberar=x=>K.confirm({title:'Liberar a reserva?',text:`${x.r.q} ${x.p.un} de ${x.p.nome} voltam a ficar disponíveis (${obraNome(x.r.obra)}).`,ok:'Liberar',run:()=>{x.p.res.splice(x.p.res.indexOf(x.r),1);draw();M.toast('Reserva liberada.')}});
    const depAtivo=d=>{if(d.ativo&&sum(G.prod,p=>p.dep[d.id]||0)>0)return K.confirm({title:`Desativar ${d.nome}?`,text:'Ainda há produtos nele: continuam no saldo, mas o depósito some das escolhas.',ok:'Desativar',dng:true,run:()=>{d.ativo=false;draw();M.toast('Depósito desativado.')}});
      d.ativo=!d.ativo;draw();M.toast(d.ativo?'Depósito reativado.':'Depósito desativado.')};
    const depPadrao=d=>{G.deps.forEach(x=>x.padrao=x.id===d.id);draw();M.toast(`${d.nome} agora é o depósito padrão.`)};
    const H={novo:()=>movSheet(draw),irMin:()=>ir('min'),
      prod:el=>{const p=prodBy(el.dataset.i);let s;const ab=p.min>0&&disp(p)<p.min;
        s=K.sheet({title:p.nome,cancel:'Fechar',cheia:true,body:`<div class="cg-tags">${chip(p.sku)}${ab?chip('abaixo do mínimo','w'):''}</div>
          ${kvg('Saldo',[kv('Físico',`${fis(p)} ${p.un}`),kv('Reservado',`${resv(p)} ${p.un}`),kv('Disponível',`${disp(p)} ${p.un}`),kv('Custo médio',brl(p.custo)),kv('Mínimo',p.min?String(p.min):'—'),kv('Fornecedor',esc(fornNome(p.forn)))])}
          ${kvg('Por depósito',Object.entries(p.dep).filter(e=>e[1]).map(([d,n])=>kv(esc(depNome(d)),`${n} ${p.un}`)))}
          ${kvg('Reservas',p.res.map(r=>kv(esc(obraNome(r.obra)||'Sem obra'),`${r.q} ${p.un}`,esc(depNome(r.dep)))))}
          ${ab?`<div class="cg-gap">${K.btn(`Repor ${p.min-disp(p)} ${p.un}`,{act:'rp',icon:'compras'})}</div>`:''}<div class="cg-gap">${K.btn('Movimento deste produto',{pri:true,act:'mv',icon:'trocar'})}</div>`,
          on:{mv:()=>{s.close();setTimeout(()=>movSheet(draw,p.sku),200)},rp:()=>{s.close();repor(p)}}})},
      mov:el=>{const m=G.emov[+el.dataset.i],p=prodBy(m.sku);K.sheet({title:m.tipo,cancel:'Fechar',body:kvg(p?p.nome:m.sku,[kv('Quando',`${d3(m.data.slice(0,10))} ${m.data.slice(11)}`),kv('Quantidade',`${m.q} ${p?p.un:''}`),kv('Depósito',esc(depNome(m.dep))),...(m.para?[kv('Para',esc(depNome(m.para)))]:[]),kv('Motivo','',esc(m.motivo))],'','cg-wrap')})},
      res:el=>{const x=resOf(el);K.actions({title:`${x.p.nome} · ${x.r.q} ${x.p.un} para ${obraNome(x.r.obra)}`,items:[{label:'Liberar a reserva',dng:true,run:()=>liberar(x)}]})},
      liberar:el=>liberar(resOf(el)),
      repor:el=>{const p=prodBy(el.dataset.i);if(G.fila.find(q=>q.sku===p.sku&&!q.obra))return M.toast(`${p.nome} já está na fila de compras.`,'Abrir Compras',()=>go('#/compras'));
        K.confirm({title:`Repor ${p.min-disp(p)} ${p.un} de ${p.nome}?`,text:`Vai para a fila de A comprar, pela ${fornNome(p.forn)}.`,ok:'Pôr na fila',run:()=>repor(p)})},
      dep:el=>{const d=G.deps.find(x=>x.id===el.dataset.i);if(d.padrao)return M.toast(`${d.nome} é o depósito padrão: recebe as entradas sem depósito escolhido.`);
        K.actions({title:d.nome,items:[...(d.ativo?[{label:'Tornar padrão',run:()=>depPadrao(d)}]:[]),{label:d.ativo?'Desativar':'Reativar',dng:d.ativo,run:()=>depAtivo(d)}]})},
      padrao:el=>depPadrao(G.deps.find(x=>x.id===el.dataset.i)),ativo:el=>depAtivo(G.deps.find(x=>x.id===el.dataset.i)),
      criarDep:()=>{const i=$('[name=ndep]',box),n=i.value.trim();if(n.length<3){M.toast('Dê um nome ao depósito (pelo menos 3 letras).');i.focus();return}
        if(G.deps.find(d=>d.nome.toLowerCase()===n.toLowerCase()))return M.toast('Já existe um depósito com esse nome.');G.deps.push({id:nid('d'),nome:n,padrao:false,ativo:true});draw();M.toast(`Depósito ${n} criado.`)}};
    K.bindPick(v,'es-tab',x=>{estTab=x;filtros();draw()});filtros();M.wire(v,H)}});
})();

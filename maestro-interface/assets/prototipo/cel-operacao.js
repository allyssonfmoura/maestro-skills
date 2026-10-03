/* Maestro OS · celular · Operação — Projetos, Painel 360, Obra (detalhe + 12 abas em telas próprias), Técnica, Experiência.
   Mesmo estado do computador: window.__op (criado igual ao mod-operacao.js quando o celular abre primeiro).
   Rotas: #/projetos?id=pr1 · #/tecnica?id=t1 · #/experiencia?id=x1 · #/obra?id=o1 · #/obra?id=o1&aba=relatorios */
(function(){
const {ic,brl,brl0,esc,$,$$}=M, K=M.m, D=M.D;

document.head.insertAdjacentHTML('beforeend',`<style id="co-css">
.nav .ib:has(>b){width:auto;min-width:44px;padding:0 8px}
.co-rp{display:block;height:4px;margin-top:6px}
.co-v2{display:block;font-size:13px;color:var(--soft)}
.co-v2.neg{color:rgb(var(--neg));font-weight:600}
.co-steps{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);gap:4px;margin-top:14px}
.co-steps>i{display:block;height:6px;border-radius:3px;background:color-mix(in srgb,var(--text) 10%,transparent)}
.co-steps>i.on{background:rgb(var(--primary))}
.co-steps>i.cur{background:rgb(var(--primary)/.4);box-shadow:inset 0 0 0 1.5px rgb(var(--primary))}
.co-sn{display:flex;align-items:baseline;gap:8px;margin-top:10px;font-size:15px;color:var(--soft)}
.co-sn>span{flex:1;min-width:0}
.co-sn b{color:var(--text)}
.co-chips{display:flex;gap:6px;flex-wrap:wrap}
.co-chips .chip{height:26px;font-size:13px}
.co-note{display:flex;gap:8px;align-items:flex-start;border-radius:12px;padding:12px;margin-top:14px;font-size:15px;line-height:1.35;background:rgb(var(--warn)/.13)}
.co-note svg{flex:none;margin-top:2px;color:rgb(var(--warn))}
.co-big3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:16px}
.co-big3 .mbtn{height:64px;flex-direction:column;gap:2px;font-size:14px;padding:0 4px}
.co-ph3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:3px;border-radius:14px;overflow:hidden;margin:0 0 8px}
.co-ph{position:relative;aspect-ratio:1;border:0;padding:0;display:grid;place-items:center;color:rgba(255,255,255,.9);min-width:0}
.co-ph span{position:absolute;left:6px;right:6px;bottom:6px;font-size:11.5px;font-weight:600;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 2px rgba(0,0,0,.35)}
.co-phbig{aspect-ratio:4/3;border-radius:14px;margin-bottom:16px}
.co-wrap .t1,.co-wrap .t2{white-space:normal}
.co-oc{display:block;color:inherit;text-decoration:none}
.co-oc h3{margin:10px 0 2px;font-size:19px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.co-oc .co-st{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:14px;padding-top:12px;border-top:.5px solid var(--line)}
.co-oc .co-st span{display:block;font-size:12.5px;color:var(--soft)}
.co-oc .co-st b{display:block;font-size:16px;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.co-hs{display:flex;align-items:baseline;gap:10px}
.co-hs b{font-size:44px;line-height:1;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.co-hs span{font-size:15px;color:var(--soft)}
.co-sel .rw{padding-right:16px}
.co-sel .rw[aria-pressed="true"] .mic{background:rgb(var(--pos))}
.co-sel .rw[aria-pressed="false"] .mic{background:color-mix(in srgb,var(--text) 14%,transparent)}
</style>`);

/* ---------- utilidades (iguais às do computador) ---------- */
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
let SEQ=0; const nid=p=>p+'-c'+(++SEQ)+'-'+Math.random().toString(36).slice(2,6);
const EQ=D.equipe.map(u=>u.nome);
const ini=n=>n.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase();
const chip=(t,c='n')=>`<span class="chip ${c}">${esc(t)}</span>`;
const bar=(p,cor)=>`<span class="prog co-rp"><b style="width:${Math.max(0,Math.min(100,p))}%;${cor?'background:'+cor:''}"></b></span>`;
const steps=(n,cur,done)=>`<div class="co-steps" role="img" aria-label="Etapa ${Math.min(cur+1,n)} de ${n}">${Array.from({length:n},(_,i)=>`<i class="${done||i<cur?'on':i===cur?'cur':''}"></i>`).join('')}</div>`;
/* linha estática (sem toque) e grupo de linhas livres */
const info=({title,sub='',value=null,icon='',color='',wrap=false})=>`<li><div class="rw ${icon?'ic40':''} ${wrap?'co-wrap':''}">${icon?`<span class="mic" style="${color?'background:'+color:''}" aria-hidden="true">${/^[a-z]+\d*$/.test(icon)?ic(icon,22):`<b style="font-size:13px;font-weight:700">${esc(icon)}</b>`}</span>`:''}<span class="tx"><span class="t1">${title}</span>${sub?`<span class="t2">${sub}</span>`:''}</span>${value!=null?`<span class="vl">${value}</span>`:''}</div></li>`;
const grp=(title,lis,foot='')=>`<section class="grp">${title?`<h2>${esc(title)}</h2>`:''}<ul class="lst">${lis}</ul>${foot?`<div class="foot">${foot}</div>`:''}</section>`;
const addRow=(label,act,icon='mais')=>({icon,title:`<span style="color:rgb(var(--primary))">${esc(label)}</span>`,act,chev:false});
const go=h=>{location.hash=h};
const tel=t=>'tel:+55'+String(t).replace(/\D/g,'');
const wa=t=>'https://wa.me/55'+String(t).replace(/\D/g,'');
/* redesenha a tela atual sem perder a rolagem (o kit só redesenha ao trocar de rota) */
const re=()=>{const v=$('#view'),h=(location.hash.replace(/^#\/?/,'')||'dashboard').split('?'),sc=M.mscreens[h[0]];if(!sc)return;
  const q=new URLSearchParams(h[1]||''),y=scrollY;M.q=q;v.innerHTML=sc.render(q);$$('[data-back]',v).forEach(b=>b.onclick=K.back);
  sc.mount&&sc.mount(v,q);M.wire(v,{});K.bindSwipe(v);scrollTo(0,y);
  const lt=$('.lt',v);if(lt&&'IntersectionObserver' in window)new IntersectionObserver(([e])=>document.documentElement.classList.toggle('scrolled',!e.isIntersecting),{rootMargin:'-56px 0px 0px 0px'}).observe(lt)};
const notFound=(back,href,o)=>`${K.nav({title:o,back})}${K.empty({title:`Não encontramos este ${o.toLowerCase()}.`,text:'Ele pode ter sido arquivado ou o link está incompleto.',btn:'Voltar para '+back,act:'nf'})}`;
const nfH=href=>({nf:()=>go(href)});
/* escolha múltipla numa folha (substitui as caixas de marcar do computador) */
function escolher({title,items,sel=[],ok='OK',onOk}){let on=new Set(sel);
  const body=()=>`<section class="grp co-sel"><ul class="lst">${items.map((t,i)=>`<li><button type="button" class="rw ic40" data-act="pk" data-i="${i}" aria-pressed="${on.has(i)}"><span class="mic" aria-hidden="true">${ic('check',22)}</span><span class="tx"><span class="t1">${esc(t)}</span></span></button></li>`).join('')}</ul><div class="foot">Toque para marcar ou desmarcar.</div></section>`;
  const s=K.sheet({title,ok,body:body(),onOk:()=>{if(!on.size){M.toast('Escolha pelo menos um.');return false}onOk([...on].sort((a,b)=>a-b))}});
  $$('[data-act="pk"]',s.el).forEach(b=>b.onclick=()=>{const i=+b.dataset.i;on.has(i)?on.delete(i):on.add(i);b.setAttribute('aria-pressed',on.has(i))});
}

/* ---------- etapas e dicionários (iguais ao computador) ---------- */
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

/* ---------- obras: as compartilhadas + históricas do módulo ---------- */
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

/* ---------- estado do módulo (o mesmo objeto do computador) ---------- */
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
/* filtros do celular (por pessoa, só nesta sessão) */
const F=S.cel||(S.cel={pe:'all',pq:'',te:'all',ce:'all',oq:'',ost:'',olim:8});
const projOf=oid=>S.proj.find(p=>p.obra===oid);
const csOf=nome=>S.cs.find(c=>c.cliente===nome);
const telOf=nome=>{const c=D.contatos.find(x=>x.nome===nome);return c?c.tel:(csOf(nome)||{}).tel||'(31) 0000-0000'};
const oEt=o=>{const p=projOf(o.id);if(p)return p.etapa;const i=PE.indexOf(o.etapa);return i>=0?i:(o.status==='Concluída'?PE.length-1:0)};
const syncObra=p=>{const o=obraBy(p.obra);if(!o)return;o.pct=p.pct;o.etapa=PE[p.etapa];o.status=P2O[p.status]||o.status};
const pctP=i=>Math.round(i/(PE.length-1)*100);
const pctT=t=>t.done?100:Math.round(t.etapa/(TE.length-1)*100);
const hc=s=>s>=70?'rgb(var(--pos))':s>=40?'rgb(var(--warn))':'rgb(var(--neg))';
const ht=s=>s>=70?'g':s>=40?'w':'r';

/* ---------- dados de cada obra (mesmo gerador do computador; o cache S.od é compartilhado) ---------- */
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
 if(d.contrato)d.contrato.parcelas.filter(x=>x.st==='Vencida').forEach(x=>a.push({tone:'neg',t:`Parcela ${x.n} vencida em ${dm(x.venc)} · ${brl(x.v)}`,go:`#/obra?id=${o.id}&aba=contrato`}));
 d.nexos.filter(n=>n.atrasado).forEach(n=>a.push({tone:'neg',t:'Nexo atrasado: '+n.t,go:'#/nexos'}));
 if(d.compra)a.push({tone:'warn',t:d.compra,go:'#/compras'});
 return a};

/* ---------- peças compartilhadas ---------- */
const fotoBtn=f=>`<button type="button" class="co-ph" data-act="foto" data-i="${f.id}" aria-label="Foto: ${esc(f.leg)}, ${f.data}" style="background:linear-gradient(140deg,hsl(${f.h} 42% 56%),hsl(${(f.h+40)%360} 46% 32%))">${ic('camera',22)}<span>${esc(f.leg)}</span></button>`;
const fotoVer=f=>K.sheet({title:f.leg,ok:'OK',cancel:'',body:`<div class="co-ph co-phbig" role="img" aria-label="${esc(f.leg)}" style="background:linear-gradient(140deg,hsl(${f.h} 42% 56%),hsl(${(f.h+40)%360} 46% 32%))">${ic('camera',32)}</div>${grp('',info({title:'Data',value:f.data})+(f.etapa?info({title:'Etapa',value:esc(f.etapa)}):''))}`});
const agRows=arr=>arr.map(a=>info({icon:a.data.slice(0,5),color:'rgb(var(--primary))',title:esc(a.t),sub:`${esc(a.hora)}${a.tipo?' · '+esc(a.tipo):''} · ${esc(a.r)}`})).join('');
const histRows=arr=>arr.map(e=>info({title:esc(e.t),sub:`${esc(e.q)}${e.d?' · '+esc(e.d):''}`,wrap:true})).join('');
const pushAgenda=(arr,a)=>{arr.push(a);arr.sort((x,y)=>pd(x.data)-pd(y.data))};
function agendar({titulo='',onOk}){
 K.formSheet({title:'Agendar',ok:'Agendar',groups:[{fields:[{k:'t',label:'Título',req:true,value:titulo,ph:'Ex.: Visita técnica'},{k:'tipo',label:'Tipo',type:'select',opts:AG_TIPOS},{k:'r',label:'Responsável',type:'select',opts:EQ,value:'Bruno Lima'}]},
  {title:'Quando',fields:[{k:'data',label:'Data',type:'date',req:true,value:'2026-10-05'},{k:'hora',label:'Hora',type:'time',req:true,value:'09:00'}]},
  {fields:[{k:'obs',label:'Observação',type:'textarea'}],foot:'O compromisso aparece na Agenda da equipe e nesta ficha.'}],
  onOk:v=>{const a={data:br(v.data),hora:v.hora,t:v.t,tipo:v.tipo,r:v.r};onOk(a);M.toast(`Agendado para ${dm(a.data)} às ${a.hora}.`)}});
}
function anexoNovo(d,done){
 K.formSheet({title:'Enviar anexo',ok:'Enviar',groups:[{fields:[{k:'f',label:'Arquivo',type:'file',req:true},{k:'n',label:'Nome',ph:'Ex.: Planta rev. 4'},{k:'tipo',label:'Tipo',type:'select',opts:['Planta','Projeto','Contrato','Manual','Outro']}]}],
  onOk:v=>{const fi=$('.msheet input[type=file]'),nm=v.n||(fi&&fi.files[0]?fi.files[0].name:'Anexo');d.anexos.unshift({id:nid('x'),n:nm,tipo:v.tipo,por:'Allysson Moura',em:HOJE});done();M.toast('Anexo enviado.')}});
}
const anexoAcoes=(d,a,done)=>K.actions({title:a.n,items:[{label:'Baixar',run:()=>M.toast(`Baixando “${a.n}”.`)},{label:'Remover anexo',dng:true,run:()=>anexoRem(d,a,done)}]});
const anexoRem=(d,a,done)=>{const i=d.anexos.indexOf(a);d.anexos.splice(i,1);done();M.toast('Anexo removido.','Desfazer',()=>{d.anexos.splice(i,0,a);done()})};
const anexoRows=(d,swipe=true)=>d.anexos.map(a=>({icon:'doc',color:'#8e8e93',title:esc(a.n),sub:`${esc(a.tipo||'Arquivo')} · ${esc(a.por)} · ${a.em}`,act:'ax',i:a.id,
  swipe:swipe?[{label:'Baixar',icon:'upload',act:'ax-get',tone:1},{label:'Remover',icon:'lixo',act:'ax-rem',tone:3}]:null}));
const pessoaNova=(lista,done,msg)=>{const rest=EQ.filter(n=>!lista.includes(n));if(!rest.length)return M.toast(msg);
 K.actions({title:'Adicionar à equipe',items:rest.map(n=>({label:n,run:()=>{lista.push(n);done();M.toast(`${n} adicionado(a).`)}}))})};

/* =====================================================================
   PROJETOS
   ===================================================================== */
const gateBloq=(p,to)=>to>p.etapa?p.gates.find(g=>!g.ok&&!g.just&&to>=g.em):null;
const bloqP=p=>p.status==='Concluído'||p.etapa>=PE.length-1?null:gateBloq(p,p.etapa+1);
function justGate(p,g,done){K.formSheet({title:'Justificar gate',ok:'Justificar',groups:[{fields:[{k:'j',label:'Justificativa',type:'textarea',req:true}],foot:`“${g.n}” deixa de bloquear o avanço. A justificativa fica registrada.`}],
 onOk:v=>{g.just=v.j;p.obs.unshift({t:`Gate “${g.n}” justificado: ${v.j}`,autor:'Allysson Moura',quando:HOJE});done();M.toast('Gate justificado.')}})}
function concluirProj(p,done){
 const fin=()=>{const fs=p.status;p.status='Concluído';p.pct=100;syncObra(p);done();M.toast(`${p.nome} concluído.`,'Desfazer',()=>{p.status=fs;p.pct=pctP(p.etapa);syncObra(p);done()})};
 const t=S.tec.find(x=>x.obra===p.obra&&!x.done);
 if(t)return K.actions({title:`A Técnica ainda está nesta obra (“${TE[t.etapa]}”). Concluir mesmo assim?`,items:[{label:'Concluir obra',run:fin},{label:'Manter em andamento',run:()=>M.toast('Projeto mantido em andamento.')}]});
 fin();
}
function avancarProj(p,done){
 if(p.status==='Concluído')return M.toast('Este projeto já está concluído.');
 if(p.etapa>=PE.length-1)return concluirProj(p,done);
 const to=p.etapa+1,g=gateBloq(p,to);
 if(g)return K.actions({title:`Não dá para ir para “${PE_N(to)}”: falta “${g.n}”.${g.motivo?' '+g.motivo:''}`,items:[
  {label:'Marcar gate como cumprido',run:()=>{g.ok=true;done();M.toast(`Gate “${g.n}” cumprido.`,'Desfazer',()=>{g.ok=false;done()})}},{label:'Justificar gate…',run:()=>justGate(p,g,done)}]});
 const from=p.etapa,fs=p.status;p.etapa=to;p.pct=pctP(to);if(p.status==='Planejamento')p.status='Em execução';syncObra(p);done();
 M.toast(`${curto(p.cliente)} → ${PE_N(to)}`,'Desfazer',()=>{p.etapa=from;p.pct=pctP(from);p.status=fs;syncObra(p);done()});
}
function editProj(p,done){
 K.formSheet({title:'Editar projeto',groups:[{fields:[{k:'nome',label:'Nome',req:true,value:p.nome},{k:'resp',label:'Responsável',type:'select',opts:EQ,value:p.resp},{k:'status',label:'Status',type:'select',opts:PST,value:p.status}]},
  {title:'Datas',fields:[{k:'ini',label:'Início',type:'date',value:iso(p.inicio)},{k:'prev',label:'Previsão',type:'date',value:iso(p.previsao)}]},
  {fields:[{k:'conj',label:'Cônjuge',value:p.conjuge||''}],foot:'O cônjuge entra na busca de projetos.'}],
  onOk:v=>{p.nome=v.nome;p.resp=v.resp;p.status=v.status;p.inicio=br(v.ini)||p.inicio;p.previsao=br(v.prev)||'—';p.conjuge=v.conj;if(p.status==='Concluído')p.pct=100;syncObra(p);done();M.toast('Projeto salvo.')}});
}
const projRow=p=>{const g=gateBloq(p,p.etapa+1);
 return {icon:ini(p.cliente),color:p.status==='Concluído'?'rgb(var(--pos))':p.status==='Em pausa'?'rgb(var(--warn))':'',title:esc(curto(p.cliente)),sub:`${esc(PE_N(p.etapa))} · ${esc(p.nome)}${bar(p.pct)}`,
  value:p.pct+'%',value2:g?'<span class="co-v2 neg">Bloqueado</span>':p.status!=='Em execução'?`<span class="co-v2">${esc(p.status)}</span>`:'',href:'#/projetos?id='+p.id,i:p.id,
  swipe:p.status==='Concluído'?null:[{label:p.etapa>=PE.length-1?'Concluir':'Avançar',icon:'seta',act:'avancar',tone:g?2:1}]}};
const projList=()=>{const t=F.pq.toLowerCase(),l=S.proj.filter(p=>(p.cliente+' '+p.nome+' '+(p.conjuge||'')).toLowerCase().includes(t)),show=F.pe==='all'?l:l.filter(p=>p.etapa===+F.pe);
 if(!S.proj.length)return K.empty({title:'Nenhum projeto ainda.',text:'Projetos são criados automaticamente quando um negócio é marcado como ganho.'});
 if(!show.length)return K.empty({title:'Nenhum projeto com esse filtro.',text:'Troque a etapa ou limpe a busca.',btn:'Limpar filtros',act:'limpar'});
 return F.pe==='all'?PE.map((n,i)=>{const r=show.filter(p=>p.etapa===i);return r.length?K.group({title:`${PE_N(i)} · ${r.length}`,rows:r.map(projRow)}):''}).join('')
  :K.group({title:PE_N(+F.pe),rows:show.map(projRow),foot:'Deslize a linha para a esquerda para avançar a etapa.'})};
function projDetalhe(p){const d=OD(p.obra),g=bloqP(p),last=p.etapa>=PE.length-1,ab=p.tarefas.filter(t=>t.st==='aberta'),fe=p.tarefas.filter(t=>t.st!=='aberta');
 const c=d.contrato,parc=c?c.parcelas:[],rec=parc.filter(x=>x.st==='Recebida').reduce((a,x)=>a+x.v,0),tot=parc.reduce((a,x)=>a+x.v,0),venc=parc.filter(x=>x.st==='Vencida'),prox=parc.find(x=>x.st!=='Recebida'&&x.st!=='Aguardando assinatura');
 const a0=pd(p.inicio),z0=okD(p.previsao)?pd(p.previsao):new Date(a0.getTime()+120*864e5),stp=(z0-a0)/PE.length,plan=i=>[fd(new Date(a0.getTime()+stp*i)),fd(new Date(a0.getTime()+stp*(i+1)))];
 return `${K.nav({title:p.nome,back:'Projetos',kick:'Projeto',acts:[{text:'Editar',title:'Editar projeto',act:'editar'},{icon:'pontos',title:'Mais ações do projeto',act:'mais'}]})}
 <section class="mcard"><div class="co-chips">${chip(p.status,ST_PROJ[p.status])}${g?chip('Bloqueado por gate','r'):''}</div>
  ${steps(PE.length,p.etapa,p.status==='Concluído')}
  <div class="co-sn"><span>Etapa ${p.etapa+1} de ${PE.length} · <b>${esc(PE_N(p.etapa))}</b></span><b class="num">${p.pct}%</b></div>
  ${g?`<div class="co-note" role="note">${ic('chave',16)}<span>Não dá para avançar: falta “${esc(g.n)}”. ${esc(g.motivo||'')}</span></div>`:''}
  <div class="mt16">${p.status==='Concluído'?`<p class="soft" style="margin:0;font-size:15px">Projeto concluído.</p>`:K.btn(last?'Concluir projeto':`Avançar para “${PE_N(p.etapa+1)}”`,{act:'avancar',pri:!g,icon:g?'chave':''})}</div></section>
 ${K.group({title:'Dados',rows:[{icon:'contatos',title:esc(p.cliente),sub:p.conjuge?'Cônjuge: '+esc(p.conjuge):'Cliente',href:'#/contatos?ficha='+p.cid},{icon:'painel',title:'Abrir no Painel 360',sub:'Obra completa: relatórios, fotos, contrato',href:'#/obra?id='+p.obra}]})}
 ${grp('',info({title:'Responsável',value:esc(p.resp||'Sem responsável')})+info({title:'Início',value:p.inicio})+info({title:'Previsão de entrega',value:p.previsao}))}
 ${K.group({title:`Tarefas · ${ab.length} abertas`,foot:'Deslize a tarefa para concluir, adiar ou dispensar.',rows:[...ab.map(t=>({icon:'atividades',color:before(t.prazo,HOJE)?'rgb(var(--neg))':'',title:esc(t.t),sub:`${esc(t.resp)} · prazo ${dm(t.prazo)}${before(t.prazo,HOJE)?' · atrasada':''}${t.adiada?' · adiada':''}`,act:'t',i:t.id,
   swipe:[{label:'Concluir',icon:'check',act:'t-ok',tone:4},{label:'Adiar',icon:'relogio',act:'t-adiar',tone:5},{label:'Dispensar',icon:'x',act:'t-disp',tone:2}]})),addRow('Nova tarefa','t-nova')]})}
 ${fe.length?grp('Feitas e dispensadas',fe.map(t=>info({title:`<s class="faint">${esc(t.t)}</s>`,value:chip(t.st==='feita'?'Feita':'Dispensada',t.st==='feita'?'g':'n')})).join('')):''}
 ${p.gates.length?K.group({title:'Gates',foot:'Toque num gate pendente para marcá-lo como cumprido ou justificar.',rows:p.gates.map(x=>x.ok||x.just?{icon:'check',color:x.ok?'rgb(var(--pos))':'rgb(var(--warn))',title:esc(x.n),sub:`Para entrar em “${esc(PE_N(x.em))}”${x.just?' · justificado: '+esc(x.just):''}`,value:x.ok?'Cumprido':'Justificado',act:'g-info',i:x.id,chev:false}
   :{icon:'chave',color:'rgb(var(--neg))',title:esc(x.n),sub:`Exigido para “${esc(PE_N(x.em))}”`,value:'Pendente',act:'g',i:x.id})}):grp('Gates',info({title:'<span class="soft">Nenhum gate neste pipeline.</span>'}))}
 ${K.group({title:'Próximas ações',rows:[...p.acoes.map(a=>({icon:'relogio',title:esc(a.t),sub:`${dm(a.quando)} · ${esc(a.resp)}`,act:'a',i:a.id,swipe:[{label:'Concluir',icon:'check',act:'a-ok',tone:4},{label:'Delegar',icon:'contatos',act:'a-del',tone:1}]})),addRow('Nova próxima ação','a-nova')],
   foot:p.acoes.length?'':'Sem próxima ação. Toda obra andando tem uma.'})}
 ${grp('Cronograma',PE.map((e,i)=>{const [a,z]=plan(i);return info({icon:String(i+1),color:i<p.etapa?'rgb(var(--pos))':i===p.etapa?'rgb(var(--primary))':'#8e8e93',title:esc(PE_N(i)),sub:`${dm(a)} – ${dm(z)}`,value:i<p.etapa?'Feita':i===p.etapa?'Agora':'Prevista'})}).join(''))}
 ${grp('Escopo da obra',p.escopo.map(x=>info({title:esc(x),wrap:true})).join(''))}
 ${c?grp('Contrato e recebimento',info({title:'Situação',value:chip(c.st,c.st==='Assinado'?'g':'b')})+info({title:'Valor',value:brl(c.valor)})+info({title:'Recebido',value:`<span class="pos">${brl(rec)}</span>`})+info({title:'A receber',value:brl(tot-rec)})+info({title:'Próxima parcela',value:prox?`${esc(prox.n)} · ${dm(prox.venc)}`:'—'}),venc.length?`<span class="neg">${venc.length} parcela vencida.</span>`:'')
   +K.group({rows:[{icon:'doc',title:'Abrir contrato e parcelas',href:`#/obra?id=${p.obra}&aba=contrato`}]}):grp('Contrato',info({title:'<span class="soft">Sem contrato no Maestro.</span>'}))}
 ${K.group({title:'Lista de venda',rows:[...d.lista.slice(0,4).map(l=>({title:esc(l.p),sub:esc(l.a),value:`${l.ent} de ${l.q}`,href:`#/obra?id=${p.obra}&aba=lista`})),{icon:'caixa',title:'Ver lista completa',href:`#/obra?id=${p.obra}&aba=lista`}]})}
 ${grp('Equipe',p.equipe.map(n=>info({icon:ini(n),color:'#8e8e93',title:esc(n)})).join('')+K.row(addRow('Adicionar pessoa','eq-add')))}
 <section class="grp"><h2>Fotos · ${OD(p.obra).fotos.length?obraBy(p.obra).fotos:0}</h2>${d.fotos.length?`<div class="co-ph3">${d.fotos.slice(0,6).map(fotoBtn).join('')}</div>`:''}${K.group({rows:[{icon:'camera',title:d.fotos.length?'Ver todas as fotos':'Nenhuma foto ainda',href:`#/obra?id=${p.obra}&aba=fotos`}]})}</section>
 ${K.group({title:'Anexos',rows:[...anexoRows(d),addRow('Enviar anexo','ax-novo','upload')]})}
 ${K.group({title:'Observações',rows:[...p.obs.map((o,i)=>({icon:'chat',color:'#8e8e93',title:esc(o.t),sub:`${o.quando} · ${esc(o.autor)}`,act:'obs-ver',i})),addRow('Registrar observação','obs-nova')]})}`;
}
function projH(p){const obsNova=()=>K.formSheet({title:'Registrar observação',ok:'Registrar',groups:[{fields:[{k:'t',label:'Observação',type:'textarea',req:true}]}],onOk:v=>{p.obs.unshift({t:v.t,autor:'Allysson Moura',quando:HOJE});re();M.toast('Observação registrada.')}});
 const d=OD(p.obra),fT=b=>p.tarefas.find(t=>t.id===b.dataset.i),fA=b=>p.acoes.find(a=>a.id===b.dataset.i),fG=b=>p.gates.find(g=>g.id===b.dataset.i);
 const tOk=t=>{t.st='feita';re();M.toast('Tarefa concluída.','Desfazer',()=>{t.st='aberta';re()})};
 const tAdiar=t=>K.formSheet({title:'Adiar tarefa',ok:'Adiar',groups:[{title:t.t,fields:[{k:'d',label:'Nova data',type:'date',req:true,value:iso(addD(HOJE,3))},{k:'m',label:'Motivo',type:'textarea',req:true}]}],
  onOk:v=>{t.prazo=br(v.d);t.adiada=true;p.obs.unshift({t:`Tarefa adiada para ${t.prazo}: ${v.m}`,autor:'Allysson Moura',quando:HOJE});re();M.toast('Tarefa adiada.')}});
 const tDisp=t=>K.formSheet({title:'Dispensar tarefa',ok:'Dispensar',groups:[{title:t.t,fields:[{k:'m',label:'Motivo',type:'textarea',req:true}]}],
  onOk:v=>{t.st='dispensada';p.obs.unshift({t:`Tarefa dispensada (“${t.t}”): ${v.m}`,autor:'Allysson Moura',quando:HOJE});re();M.toast('Tarefa dispensada.')}});
 const aOk=a=>K.formSheet({title:'Concluir próxima ação',ok:'Concluir',groups:[{title:a.t,fields:[{k:'f',label:'O que foi feito?',type:'textarea',req:true}]}],
  onOk:v=>{p.acoes=p.acoes.filter(x=>x!==a);p.obs.unshift({t:`${a.t}: ${v.f}`,autor:a.resp,quando:HOJE});re();M.toast('Próxima ação concluída.')}});
 const aDel=a=>K.actions({title:'Delegar para quem?',items:EQ.map(n=>({label:n+(n===a.resp?' (atual)':''),run:()=>{a.resp=n;re();M.toast(`Delegada para ${n}.`)}}))});
 return {editar:()=>editProj(p,re),avancar:()=>avancarProj(p,re),
  mais:()=>K.actions({title:p.nome,items:[{label:'Agendar',run:()=>agendar({onOk:a=>{pushAgenda(d.agenda,a);re()}})},{label:'Abrir no Painel 360',run:()=>go('#/obra?id='+p.obra)},
   {label:'Registrar observação',run:obsNova},{label:'Excluir projeto',dng:true,run:()=>K.formSheet({title:'Excluir projeto',ok:'Excluir',groups:[{fields:[{k:'senha',label:'Senha (protótipo: não use a real)',ph:'qualquer texto',type:'password',req:true},{k:'just',label:'Justificativa',type:'textarea',req:true,ph:'Por que este projeto está sendo excluído?'}],foot:'O projeto vai para a Lixeira e pode ser restaurado em até 30 dias.'}],
    onOk:()=>{const i=S.proj.indexOf(p);S.proj.splice(i,1);go('#/projetos');M.toast('Projeto movido para a Lixeira.','Desfazer',()=>{S.proj.splice(i,0,p);re()})}})}]}),
  t:b=>{const t=fT(b);K.actions({title:t.t,items:[{label:'Concluir',run:()=>tOk(t)},{label:'Adiar…',run:()=>tAdiar(t)},{label:'Dispensar…',dng:true,run:()=>tDisp(t)}]})},
  't-ok':b=>tOk(fT(b)),'t-adiar':b=>tAdiar(fT(b)),'t-disp':b=>tDisp(fT(b)),
  't-nova':()=>K.formSheet({title:'Nova tarefa',ok:'Criar',groups:[{fields:[{k:'t',label:'Tarefa',req:true},{k:'r',label:'Responsável',type:'select',opts:EQ,value:p.resp},{k:'d',label:'Prazo',type:'date',req:true,value:iso(addD(HOJE,3))}]}],
   onOk:v=>{p.tarefas.unshift(T(v.t,v.r,br(v.d)));re();M.toast('Tarefa criada.')}}),
  g:b=>{const g=fG(b);K.actions({title:`${g.n}${g.motivo?' — '+g.motivo:''}`,items:[{label:'Marcar como cumprido',run:()=>{g.ok=true;re();M.toast(`Gate “${g.n}” cumprido.`,'Desfazer',()=>{g.ok=false;re()})}},{label:'Justificar…',run:()=>justGate(p,g,re)}]})},
  'g-info':b=>{const g=fG(b);M.toast(g.ok?`“${g.n}” já foi cumprido.`:`Justificado: ${g.just}`)},
  a:b=>{const a=fA(b);K.actions({title:a.t,items:[{label:'Concluir…',run:()=>aOk(a)},{label:'Delegar…',run:()=>aDel(a)}]})},'a-ok':b=>aOk(fA(b)),'a-del':b=>aDel(fA(b)),
  'a-nova':()=>K.formSheet({title:'Nova próxima ação',ok:'Criar',groups:[{fields:[{k:'t',label:'Próxima ação',req:true},{k:'d',label:'Quando',type:'date',req:true,value:iso(addD(HOJE,1))},{k:'r',label:'Responsável',type:'select',opts:EQ,value:p.resp}]}],
   onOk:v=>{p.acoes.push(AC(v.t,br(v.d),v.r));re();M.toast('Próxima ação criada.')}}),
  'eq-add':()=>pessoaNova(p.equipe,re,'Toda a equipe já está neste projeto.'),
  foto:b=>fotoVer(d.fotos.find(f=>f.id===b.dataset.i)),
  ax:b=>anexoAcoes(d,d.anexos.find(a=>a.id===b.dataset.i),re),'ax-get':b=>M.toast(`Baixando “${d.anexos.find(a=>a.id===b.dataset.i).n}”.`),
  'ax-rem':b=>anexoRem(d,d.anexos.find(a=>a.id===b.dataset.i),re),'ax-novo':()=>anexoNovo(d,re),
  'obs-ver':b=>{const o=p.obs[+b.dataset.i];K.sheet({title:'Observação',ok:'OK',cancel:'',body:`<p style="font-size:17px;line-height:1.45;margin:0 0 12px">${esc(o.t)}</p><p class="soft" style="margin:0">${o.quando} · ${esc(o.autor)}</p>`})},
  'obs-nova':obsNova};
}
M.mscreen('projetos',{title:'Projetos',tab:'projetos',
 help:['Cada negócio ganho vira um projeto aqui. Os chips do topo filtram pela etapa.','Deslize a linha para avançar a etapa; se faltar um gate, o sistema mostra o que falta.','Toque no projeto para ver tarefas, gates, contrato e recebimento.'],
 render:q=>{const id=q.get('id');if(id){const p=S.proj.find(x=>x.id===id);return p?projDetalhe(p):notFound('Projetos','#/projetos','Projeto')}
  return `${K.nav({title:'Projetos',sub:'Criados automaticamente a partir de negócios ganhos.'})}${K.search('Buscar cliente, título ou cônjuge','co-pq')}
   ${K.chips('co-pe',[['all',`Todas · ${S.proj.length}`],...PE.map((n,i)=>[String(i),`${n} · ${S.proj.filter(p=>p.etapa===i).length}`])],F.pe)}<div id="co-pl">${projList()}</div>`},
 mount:(v,q)=>{const id=q.get('id');
  if(id){const p=S.proj.find(x=>x.id===id);return M.wire(v,p?projH(p):nfH('#/projetos'))}
  const box=$('#co-pl',v),inp=$('#co-pq',v);inp.value=F.pq;
  const H={avancar:b=>avancarProj(S.proj.find(p=>p.id===b.dataset.i),re),limpar:()=>{F.pq='';F.pe='all';re()}};
  const draw=()=>{box.innerHTML=projList();M.wire(box,H);K.bindSwipe(box)};
  inp.oninput=()=>{F.pq=inp.value;draw()}; K.bindPick(v,'co-pe',x=>{F.pe=x;draw()}); M.wire(v,H);
 }});

/* =====================================================================
   PAINEL 360 (lista de obras)
   ===================================================================== */
const P360=[['','Todas'],['Em andamento','Em andamento'],['Pausada','Pausadas'],['Concluída','Concluídas']];
const obraCard=o=>`<a class="mcard co-oc" href="#/obra?id=${o.id}" aria-label="Abrir obra ${esc(o.nome)}">
 <div class="row" style="gap:8px"><span class="thumb" aria-hidden="true">${ic('casa',20)}</span><span class="spacer" style="flex:1"></span>${chip(o.status,ST_OBRA[o.status])}</div>
 <h3>${esc(o.nome)}</h3><div class="soft" style="font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(o.cliente)} · ${esc(o.cidade)}</div>
 <div class="co-st"><div><span>Relatórios</span><b>${o.relatorios}</b></div><div><span>Fotos</span><b>${o.fotos}</b></div><div><span>Valor fechado</span><b>${o.valor?brl0(o.valor):'<span class="faint" style="font-size:14px;font-weight:500">Sem fechamento</span>'}</b></div></div></a>`;
const obraList=()=>{const t=F.oq.toLowerCase(),all=OBRAS(),cur=all.filter(o=>(!F.ost||o.status===F.ost)&&(o.nome+' '+o.cliente).toLowerCase().includes(t)),show=cur.slice(0,F.olim);
 if(!all.length)return K.empty({title:'Nenhuma obra ainda.',text:'A obra nasce quando um negócio é ganho.'});
 if(!cur.length)return K.empty({title:'Nenhuma obra com esse filtro.',text:'Troque o status ou limpe a busca.',btn:'Limpar filtros',act:'limpar'});
 return `<section class="grp"><h2>${cur.length} de ${all.length} obras</h2>${show.map(obraCard).join('')}</section>
  ${show.length<cur.length?K.group({rows:[{icon:'baixo',title:`Mostrar mais ${Math.min(8,cur.length-show.length)} obras`,sub:`Mostrando ${show.length} de ${cur.length}`,act:'mais',chev:false}]}):''}`};
M.mscreen('painel360',{title:'Painel 360',tab:'painel360',
 help:['Cada obra com campo, comercial, compras e financeiro numa tela só.','Busque pelo nome da obra ou do cliente e filtre pelo status nos chips.','Toque numa obra para abrir o painel completo dela.'],
 render:()=>`${K.nav({title:'Painel 360',kick:'Operação',sub:'Campo, comercial, compras e financeiro de cada obra.'})}${K.search('Buscar obra ou cliente','co-oq')}${K.chips('co-ost',P360,F.ost)}<div id="co-ol">${obraList()}</div>`,
 mount:v=>{const box=$('#co-ol',v),inp=$('#co-oq',v);inp.value=F.oq;
  const H={mais:()=>{F.olim+=8;draw()},limpar:()=>{F.oq='';F.ost='';F.olim=8;re()}};
  const draw=()=>{box.innerHTML=obraList();M.wire(box,H)};
  inp.oninput=()=>{F.oq=inp.value;F.olim=8;draw()};K.bindPick(v,'co-ost',x=>{F.ost=x;F.olim=8;draw()});M.wire(v,H)}});

/* =====================================================================
   OBRA (detalhe do Painel 360) — cada aba em tela própria
   ===================================================================== */
const GR=[['Obra',[['visao','Visão geral','painel'],['etapas','Etapas e tarefas','check'],['agenda','Agenda','agenda'],['timeline','Timeline','relogio']]],
 ['Registros',[['relatorios','Relatórios','doc'],['fotos','Fotos','camera'],['anexos','Anexos','upload']]],
 ['Venda',[['orcamentos','Orçamentos','propostas'],['lista','Lista de venda','caixa'],['equipamentos','Equipamentos','wifi']]],
 ['Financeiro',[['contrato','Contrato','financeiro'],['custo','Centro de custo','barras']]]];
const ABA=Object.fromEntries(GR.flatMap(g=>g[1].map(([k,l,i])=>[k,{l,i,g:g[0]}])));
const ADD={etapas:['Nova tarefa','et-nova'],agenda:['Agendar','agendar'],relatorios:['Registrar','registrar'],fotos:['Enviar fotos','foto-nova'],anexos:['Enviar anexo','ax-novo'],lista:['Gerar romaneio','rom-novo'],equipamentos:['Cadastrar equipamento','eq-novo'],custo:['Lançar custo','cc-novo']};
const NOVO=new Set(['equipamentos','custo']);
const CSTEPS=['Rascunho','Gerado','Enviado','Assinado'];
const ORFAOS=[['30/09/2026','Visita sem obra ligada · troca de fonte','Bruno Lima'],['27/09/2026','Ajuste de rack registrado pelo celular','Diego Rocha']];
const pac=(o,d)=>{const p=projOf(o.id);return p&&p.acoes[0]?{t:p.acoes[0].t,q:dm(p.acoes[0].quando)}:d.nexos[0]?{t:d.nexos[0].t,q:dm(d.nexos[0].prazo)}:null};
function obraMain(o){const d=OD(o.id),et=oEt(o),att=atencao(o),neg=negOf(o),pa=pac(o,d),p=projOf(o.id),eq=p?p.equipe:['Bruno Lima'];
 const cnt=k=>({relatorios:o.relatorios,fotos:o.fotos,anexos:d.anexos.length,agenda:d.agenda.length,orcamentos:D.propostas.filter(x=>x.cliente===o.cliente).length,lista:d.lista.length,equipamentos:d.equip.length,timeline:d.eventos.length}[k]);
 return `${K.nav({title:o.nome,back:'Painel 360',kick:o.status,sub:`${esc(o.cliente)} · ${o.bairro?esc(o.bairro)+', ':''}${esc(o.cidade)}`})}
 <section class="mcard"><div class="co-chips">${chip(o.status,ST_OBRA[o.status])}${o.legado?chip('Obra anterior','n'):''}</div>
  ${steps(PE.length,et,o.status==='Concluída')}
  <div class="co-sn"><span>Etapa ${et+1} de ${PE.length} · <b>${esc(PE_N(et))}</b></span><b class="num">${o.pct}%</b></div>
  <div class="co-big3">${K.btn('Registrar',{act:'registrar',pri:true,icon:'mais'})}${K.btn('Agendar',{act:'agendar',icon:'agenda'})}${K.btn('Copiar link',{act:'link',icon:'copiar'})}</div></section>
 ${K.group({title:'Próxima ação',rows:[pa?{icon:'relogio',title:esc(pa.t),sub:pa.q+' · ver todos os Nexos',href:'#/nexos'}:{icon:'relogio',color:'#8e8e93',title:'Sem próxima ação',sub:'Criar um Nexo para esta obra',href:'#/nexos'}]})}
 ${att.length?K.group({title:`Pontos de atenção · ${att.length}`,rows:att.map(a=>({icon:'sino',color:`rgb(var(--${a.tone}))`,title:esc(a.t),href:a.go}))}):''}
 ${GR.map(([g,items])=>K.group({title:g,rows:items.map(([k,l,i])=>({icon:i,title:l,value:NOVO.has(k)?chip('Novo','b'):cnt(k)!=null?String(cnt(k)):null,href:`#/obra?id=${o.id}&aba=${k}`}))})).join('')}
 ${neg&&neg.id?K.group({title:'Negócio',rows:[{icon:'negocios',title:esc(neg.titulo),sub:neg.valor?brl(neg.valor):'',value:esc(neg.status),href:'#/negocios?card='+neg.id}]}):grp('Negócio',neg?info({icon:'negocios',title:esc(neg.titulo),sub:neg.valor?brl(neg.valor):'',value:esc(neg.status)}):info({icon:'negocios',color:'#8e8e93',title:'Obra sem negócio'}))}
 ${grp('Dados da obra',info({icon:ini(o.gestor),color:'#8e8e93',title:esc(o.gestor),sub:'Gestor da obra'})+eq.map(n=>info({icon:ini(n),color:'#8e8e93',title:esc(n),sub:'Equipe'})).join('')+info({title:'Início',value:o.inicio})+info({title:'Previsão de entrega',value:o.previsao}))}`;
}
function obraAba(o,k){const d=OD(o.id),a=ABA[k],et=oEt(o),ent=d.lista.reduce((s,l)=>s+(l.ent>=l.q?1:0),0),cs=csOf(o.cliente);
 const nav=K.nav({title:a.l,back:o.nome,kick:a.g+(NOVO.has(k)?' · Novo':''),sub:esc(o.nome),acts:ADD[k]?[{icon:'mais',title:ADD[k][0],act:ADD[k][1]}]:[]});
 const relRows=arr=>arr.map(r=>({icon:'doc',color:r.status==='Salvo'?'rgb(var(--pos))':'rgb(var(--warn))',title:esc(r.resumo),sub:`${r.data} · ${esc(r.autor)} · ${r.fotos} fotos · cliente ${r.ve?'vê':'não vê'}`,value:esc(r.status==='Salvo'?'Salvo':'Revisar'),act:'rel',i:r.id}));
 const C={
  visao:()=>K.tiles([{label:'Relatórios',value:o.relatorios,act:'k-relatorios'},{label:'Fotos',value:o.fotos,act:'k-fotos'},{label:'Nexos abertos',value:d.nexos.length,act:'nexos'},{label:'Valor fechado',value:o.valor?brl0(o.valor):'—',sub:o.valor?'':'Sem fechamento'}])
   +K.group({title:'Próximas visitas',rows:[...d.agenda.slice(0,3).map(x=>({icon:x.data.slice(0,5),title:esc(x.t),sub:`${x.hora} · ${esc(x.r)}`,act:'k-agenda'})),{icon:'agenda',title:'Ver agenda da obra',act:'k-agenda'}]})
   +K.group({title:'Relatórios recentes',rows:[...relRows(d.rel.slice(0,3)),{icon:'doc',title:'Ver todos os relatórios',act:'k-relatorios'}]})
   +`<section class="grp"><h2>Fotos recentes</h2>${d.fotos.length?`<div class="co-ph3">${d.fotos.slice(0,6).map(fotoBtn).join('')}</div>`:''}${K.group({rows:[{icon:'camera',title:d.fotos.length?'Ver todas as fotos':'Nenhuma foto ainda',act:'k-fotos'}]})}</section>`
   +K.group({title:'Nexos abertos',rows:d.nexos.length?d.nexos.map(n=>({icon:'trocar',color:n.atrasado?'rgb(var(--neg))':'',title:esc(n.t),sub:`${esc(n.quem)} · prazo ${dm(n.prazo)}${n.atrasado?' · atrasado':''}`,href:'#/nexos'})):[{icon:'trocar',color:'#8e8e93',title:'Nenhum Nexo aberto',sub:'Ver Nexos',href:'#/nexos'}]})
   +K.group({title:'Lista de venda',rows:[{icon:'caixa',title:`${ent} de ${d.lista.length} itens entregues`,sub:bar(ent/d.lista.length*100),act:'k-lista'}]})
   +K.group({title:'Pós-venda',rows:[cs?{icon:String(cs.saude),color:hc(cs.saude),title:`${esc(cs.status)} · ${esc(CE[cs.etapa])}`,sub:cs.alertas.length?cs.alertas.length+' alerta(s) aberto(s)':'Nenhum alerta aberto',href:'#/experiencia?id='+cs.id}:{icon:'coracao',color:'#8e8e93',title:'Começa quando a obra é entregue',href:'#/experiencia'}]})
   +grp('Últimos eventos',histRows(d.eventos.slice(0,4)))+K.group({rows:[{icon:'relogio',title:'Ver timeline completa',act:'k-timeline'}]}),
  etapas:()=>PE.map((e,i)=>{const ts=d.tarefas[i],ok=ts.length&&ts.every(t=>t.ok);return K.group({title:`${PE_N(i)} · ${ts.filter(t=>t.ok).length}/${ts.length}`,foot:i<et||ok?'Etapa feita.':i===et?'Etapa em andamento.':'',
   rows:ts.map((t,j)=>({icon:'check',color:t.ok?'rgb(var(--pos))':'color-mix(in srgb,var(--text) 18%,transparent)',title:t.ok?`<s class="faint">${esc(t.t)}</s>`:esc(t.t),sub:t.ok?'Feita · toque para desfazer':'A fazer · toque para marcar',act:'tk',i:`${i}:${j}`,chev:false}))})}).join(''),
  agenda:()=>d.agenda.length?grp(`${d.agenda.length} compromissos`,agRows(d.agenda))+K.group({rows:[{icon:'agenda',title:'Abrir a Agenda da equipe',href:'#/agenda'}]}):K.empty({title:'Nenhuma visita marcada.',text:'Use o + no topo para marcar a próxima.'}),
  timeline:()=>grp(`${d.eventos.length} eventos`,histRows(d.eventos)),
  relatorios:()=>(d.rel.length?K.group({title:`${d.rel.length} relatórios`,rows:relRows(d.rel),foot:'Toque no relatório para gerar o PDF ou revisar.'}):K.empty({title:'Nenhum relatório nesta obra.',text:'Use o + no topo para registrar o relatório do dia.'}))
   +K.group({rows:[{icon:'trocar',title:'Ligar a esta obra',sub:'Relatórios feitos sem obra escolhida',act:'rel-ligar'}]}),
  fotos:()=>d.fotos.length?`<div class="co-ph3">${d.fotos.map(fotoBtn).join('')}</div>${o.fotos>d.fotos.length?`<p class="soft" style="font-size:13px;margin:4px 4px 24px">Mostrando as ${d.fotos.length} mais recentes de ${o.fotos}.</p>`:''}`:K.empty({title:'Nenhuma foto nesta obra.',text:'Fotos enviadas pelo celular ou pelos relatórios aparecem aqui.'}),
  anexos:()=>d.anexos.length?K.group({title:`${d.anexos.length} anexos`,rows:anexoRows(d),foot:'Deslize o anexo para baixar ou remover.'}):K.empty({title:'Nenhum anexo.',text:'Plantas, projetos e contratos desta obra ficam aqui.'}),
  orcamentos:()=>{const ps=D.propostas.filter(x=>x.cliente===o.cliente);return ps.length?K.group({title:`${ps.length} propostas do cliente`,rows:ps.map(x=>({icon:'propostas',title:esc(x.titulo),sub:`${esc(x.numero)} · ${esc(x.status)}`,value:brl(x.valor),href:'#/construtor'}))}):K.empty({title:'Nenhum orçamento ligado a esta obra.',text:'Propostas do mesmo cliente aparecem aqui.'})},
  lista:()=>(d.romaneios.length?grp('Romaneios',d.romaneios.map(r=>info({icon:'caixa',title:esc(r.n),sub:`Saída ${r.data} · ${r.itens} itens`,value:esc(r.st)})).join('')):K.group({title:'Romaneios',rows:[],empty:'Nenhum romaneio gerado ainda.'}))
   +grp(`Lista de venda · ${ent} de ${d.lista.length} entregues`,d.lista.map(l=>info({title:esc(l.p),sub:`${esc(l.a)} · ${esc(l.m)} · separado ${l.sep}`,value:`<b>${l.ent}/${l.q}</b><span class="co-v2 ${l.ent>=l.q?'':'neg'}" style="${l.ent>=l.q?'color:rgb(var(--pos))':l.sep>=l.q?'color:rgb(var(--primary));font-weight:400':''}">${l.ent>=l.q?'Entregue':l.sep>=l.q?'Separado':'A separar'}</span>`})).join('')),
  equipamentos:()=>{const on=d.equip.filter(e=>e.st==='Online').length,gv=d.equip.filter(e=>okD(e.gar)&&(pd(e.gar)-pd(HOJE))/864e5<=90).length;
   return K.tiles([{label:'Instalados',value:d.equip.length},{label:'Online agora',value:on,sub:d.equip.length?`${d.equip.length-on} sem resposta`:''},{label:'Garantia vence em 90 dias',value:gv,tone:gv?'warn':'',wide:true}])
    +(d.equip.length?grp('Equipamentos instalados',d.equip.map(e=>info({icon:'wifi',color:e.st==='Online'?'rgb(var(--pos))':e.st==='Offline'?'rgb(var(--neg))':'#8e8e93',title:esc(e.e),sub:`${esc(e.a)} · série ${esc(e.sn)} · IP ${esc(e.ip)}`,value:`<b>${esc(e.st)}</b><span class="co-v2">até ${e.gar||'—'}</span>`})).join(''),'Série, endereço de rede e garantia: a base do pós-venda.')
     :K.empty({title:'Nenhum equipamento cadastrado.',text:'Tudo o que for instalado nesta obra, com série, IP e garantia. Use o + no topo.'}))},
  contrato:()=>{const c=d.contrato;if(!c)return K.empty({title:'Obra sem contrato no Maestro.',text:o.legado?'Obra anterior ao Maestro: o contrato ficou fora do sistema. Cadastre para acompanhar as parcelas.':'Gere o contrato a partir da proposta aceita.',btn:'Cadastrar contrato',act:'c-novo'});
   const si=CSTEPS.indexOf(c.st),rec=c.parcelas.filter(x=>x.st==='Recebida').reduce((s,x)=>s+x.v,0);
   const acts=c.st==='Rascunho'?[['Gerar contrato','c-gerar']]:c.st==='Gerado'?[['Enviar para assinatura','c-enviar'],['Regerar','c-regerar'],['Baixar DOCX','c-docx']]:c.st==='Enviado'?[['Marcar como assinado','c-assinar'],['Regerar','c-regerar'],['Baixar DOCX','c-docx']]:[['Baixar DOCX','c-docx']];
   return `<section class="mcard"><div class="row" style="gap:8px">${chip(c.st,c.st==='Assinado'?'g':'b')}<span style="flex:1"></span><b class="num" style="font-size:20px">${brl(c.valor)}</b></div>
    ${steps(4,si,false)}<div class="co-sn"><span>${CSTEPS.map((x,i)=>i===si?`<b>${x}</b>`:x).join(' · ')}</span></div>
    <div class="stack mt16" style="gap:8px">${acts.map(([l,x],i)=>K.btn(l,{act:x,pri:i===0&&c.st!=='Assinado'})).join('')}</div></section>
    ${K.tiles([{label:'Recebido',value:brl0(rec),tone:'pos'},{label:'A receber',value:brl0(c.valor-rec)}])}
    ${K.group({title:`Parcelas · ${c.parcelas.length}`,foot:'Deslize a parcela para registrar o recebimento.',rows:c.parcelas.map(x=>{const pode=x.st==='Vencida'||x.st==='A vencer';
     return {icon:'financeiro',color:x.st==='Recebida'?'rgb(var(--pos))':x.st==='Vencida'?'rgb(var(--neg))':'#8e8e93',title:esc(x.n),sub:`Vence ${x.venc} · ${esc(x.st)}`,value:brl(x.v),act:pode?'parc':'parc-info',i:x.id,chev:pode,
      swipe:pode?[{label:'Receber',icon:'check',act:'c-receber',tone:4}]:null}})})}`},
  custo:()=>{const orc=d.custos.reduce((s,x)=>s+x.orc,0),real=d.custos.reduce((s,x)=>s+x.real,0),mg=o.valor?(o.valor-Math.max(orc,real))/o.valor*100:0;
   return K.tiles([{label:'Orçado',value:brl0(orc)},{label:'Realizado',value:brl0(real),sub:orc?Math.round(real/orc*100)+'% do orçado':'Sem orçamento'},{label:'Margem prevista',value:o.valor?Math.round(mg)+'%':'—',tone:mg<15?'warn':'pos',sub:o.valor?'Sobre '+brl0(o.valor)+' fechados':'Obra sem valor fechado',wide:true}])
    +(d.custos.length?grp('Orçado × realizado',d.custos.map(x=>{const pc=x.orc?x.real/x.orc*100:0;return info({title:esc(x.c),sub:`${Math.round(pc)}% usado${bar(Math.min(100,pc),pc>100?'rgb(var(--neg))':'')}`,value:`<b>${brl0(x.real)}</b><span class="co-v2">de ${brl0(x.orc)}</span>`})}).join('')):K.empty({title:'Sem orçamento para comparar.',text:'Obra sem valor fechado. Os custos lançados aparecem abaixo.'}))
    +(d.lanc.length?grp('Lançamentos',d.lanc.map(x=>info({title:esc(x.d),sub:`${x.data} · ${esc(x.c)} · ${esc(x.f)}`,value:brl(x.v)})).join('')):K.empty({title:'Nenhum custo lançado.',text:'Compras, diárias e deslocamentos desta obra entram aqui. Use o + no topo.'}))}};
 return nav+C[k]();
}
function obraH(o){const d=OD(o.id),fR=b=>d.rel.find(r=>r.id===b.dataset.i),fP=b=>d.contrato.parcelas.find(z=>z.id===b.dataset.i),aba=k=>()=>go(`#/obra?id=${o.id}&aba=${k}`);
 const receber=x=>K.formSheet({title:'Registrar recebimento',ok:'Registrar',groups:[{title:`Parcela ${x.n} · ${brl(x.v)}`,fields:[{k:'d',label:'Data',type:'date',req:true,value:iso(HOJE)},{k:'c',label:'Conta',type:'select',opts:['Itaú','Inter','Caixa','Cofre']}]}],
  onOk:v=>{const fs=x.st;x.st='Recebida';d.eventos.unshift({q:br(v.d),t:'Parcela recebida',d:`${x.n} · ${brl(x.v)} · ${v.c}`});re();M.toast('Recebimento registrado.','Desfazer',()=>{x.st=fs;re()})}});
 const revisar=r=>K.formSheet({title:'Revisar relatório',ok:'Salvar',groups:[{title:`${r.data} · ${r.autor}`,fields:[{k:'res',label:'Resumo do dia',type:'textarea',req:true,value:r.resumo},{k:'ve',label:'Cliente vê',type:'select',opts:['Sim','Não'],value:r.ve?'Sim':'Não'}]}],
  onOk:v=>{r.resumo=v.res;r.ve=v.ve==='Sim';r.status='Salvo';re();M.toast('Relatório salvo.')}});
 const H={
  link:()=>{const u=location.href.split('&aba=')[0];try{navigator.clipboard.writeText(u).then(()=>M.toast('Link da obra copiado.'),()=>M.toast('Link: '+u))}catch(e){M.toast('Link: '+u)}},
  agendar:()=>agendar({onOk:a=>{pushAgenda(d.agenda,a);d.eventos.unshift({q:HOJE,t:'Visita agendada',d:`${a.t} · ${dm(a.data)} ${a.hora}`});re()}}),
  registrar:()=>K.formSheet({title:'Registrar',ok:'Enviar',groups:[{title:'Relatório do dia · '+o.nome,fields:[{k:'res',label:'Resumo do dia',type:'textarea',req:true,ph:'O que foi feito, o que ficou pendente, o que o cliente pediu.'}]},
    {fields:[{k:'aut',label:'Elaborado por',type:'select',opts:EQ,value:'Bruno Lima'},{k:'fot',label:'Fotos',type:'file'},{k:'ve',label:'Cliente vê',type:'select',opts:['Sim','Não'],value:'Sim'}],foot:'O cliente vê o relatório no portal depois de revisado.'}],
   onOk:v=>{d.rel.unshift({id:nid('r'),data:HOJE,resumo:v.res,autor:v.aut,fotos:0,status:'Pendente revisão',ve:v.ve==='Sim'});o.relatorios++;d.eventos.unshift({q:HOJE,t:'Relatório registrado',d:v.res});re();M.toast('Relatório registrado.','Ver',aba('relatorios'))}}),
  nexos:()=>go('#/nexos'),
  foto:b=>fotoVer(d.fotos.find(f=>f.id===b.dataset.i)),
  'foto-nova':()=>K.formSheet({title:'Enviar fotos',ok:'Enviar',groups:[{fields:[{k:'f',label:'Fotos',type:'file',req:true},{k:'leg',label:'Legenda',ph:'Ex.: Rack técnico'},{k:'et',label:'Etapa',type:'select',opts:PE,value:PE[oEt(o)]}]}],
   onOk:v=>{d.fotos.unshift({id:nid('f'),leg:v.leg||'Foto da obra',data:HOJE,etapa:v.et,h:(d.fotos.length*53)%360});o.fotos++;d.eventos.unshift({q:HOJE,t:'Fotos enviadas',d:v.leg||'1 foto'});re();M.toast('Foto enviada.')}}),
  rel:b=>{const r=fR(b);K.actions({title:`${r.data} · ${r.resumo}`,items:[{label:'Salvar em PDF',run:()=>M.toast(`PDF do relatório de ${r.data} gerado.`)},{label:'Revisar…',run:()=>revisar(r)}]})},
  'rel-ligar':()=>escolher({title:'Ligar a esta obra',ok:'Ligar',items:ORFAOS.map(x=>`${x[0].slice(0,5)} · ${x[1]} · ${x[2]}`),
   onOk:ix=>{ix.forEach(i=>{const x=ORFAOS[i];d.rel.push({id:nid('r'),data:x[0],resumo:x[1],autor:x[2],fotos:2,status:'Salvo',ve:false});o.relatorios++});d.rel.sort((a,b)=>pd(b.data)-pd(a.data));re();M.toast(`${ix.length} relatório(s) ligado(s) a esta obra.`)}}),
  ax:b=>anexoAcoes(d,d.anexos.find(a=>a.id===b.dataset.i),re),'ax-get':b=>M.toast(`Baixando “${d.anexos.find(a=>a.id===b.dataset.i).n}”.`),
  'ax-rem':b=>anexoRem(d,d.anexos.find(a=>a.id===b.dataset.i),re),'ax-novo':()=>anexoNovo(d,re),
  tk:b=>{const [i,j]=b.dataset.i.split(':').map(Number),t=d.tarefas[i][j];t.ok=!t.ok;re()},
  'et-nova':()=>K.formSheet({title:'Nova tarefa',ok:'Criar',groups:[{fields:[{k:'t',label:'Tarefa',req:true},{k:'et',label:'Etapa',type:'select',opts:PE,value:PE[oEt(o)]}]}],
   onOk:v=>{d.tarefas[PE.indexOf(v.et)].push({id:nid('k'),t:v.t,ok:false});re();M.toast('Tarefa criada.')}}),
  'rom-novo':()=>{const pend=d.lista.filter(l=>l.ent<l.q);if(!pend.length)return M.toast('Todos os itens já foram entregues.');
   escolher({title:'Gerar romaneio',ok:'Gerar',items:pend.map(l=>l.p),sel:pend.map((_,i)=>i),onOk:ix=>{ix.forEach(i=>{pend[i].sep=pend[i].q;pend[i].ent=pend[i].q});d.romaneios.unshift({id:nid('m'),n:'Romaneio #'+(20+d.romaneios.length),data:HOJE,itens:ix.length,st:'Entregue'});re();M.toast('Romaneio gerado.')}})},
  'eq-novo':()=>K.formSheet({title:'Cadastrar equipamento',ok:'Cadastrar',groups:[{fields:[{k:'e',label:'Equipamento',req:true,ph:'Ex.: Access point U7-Pro'},{k:'a',label:'Ambiente',type:'select',opts:LEG}]},
    {fields:[{k:'sn',label:'Nº de série'},{k:'ip',label:'IP',ph:'192.168.10.30'},{k:'gar',label:'Garantia até',type:'date'},{k:'st',label:'Situação',type:'select',opts:['Online','Offline','Sem rede']}]}],
   onOk:v=>{d.equip.push({id:nid('e'),e:v.e,a:v.a,sn:v.sn||'—',ip:v.ip||'—',gar:br(v.gar),st:v.st});re();M.toast('Equipamento cadastrado.')}}),
  'c-novo':()=>K.formSheet({title:'Cadastrar contrato',ok:'Cadastrar',groups:[{fields:[{k:'v',label:'Valor',type:'money',req:true,ph:'R$ 0,00'},{k:'n',label:'Parcelas',type:'number',req:true,value:'6'},{k:'d',label:'1º vencimento',type:'date',req:true,value:iso(HOJE)}]}],
   onOk:v=>{const val=money(v.v),n=Math.max(1,Math.min(24,parseInt(v.n)||1)),d0=pd(br(v.d));if(!val){M.toast('Informe o valor do contrato.');return false}
    d.contrato={st:'Gerado',valor:val,parcelas:Array.from({length:n},(_,k)=>({id:nid('p'),n:`${k+1}/${n}`,venc:fd(new Date(d0.getFullYear(),d0.getMonth()+k,d0.getDate())),v:Math.round(val/n*100)/100,st:'Aguardando assinatura'}))};re();M.toast('Contrato cadastrado.')}}),
  'c-gerar':()=>{d.contrato.st='Gerado';re();M.toast('Contrato gerado.')},
  'c-regerar':()=>K.confirm({title:'Regerar contrato?',text:'O documento é refeito com os dados atuais da proposta. A versão anterior fica no histórico.',ok:'Regerar',run:()=>M.toast('Contrato regerado.')}),
  'c-docx':()=>M.toast(`Baixando “Contrato · ${o.nome}.docx”.`),
  'c-enviar':()=>{const ct=D.contatos.find(x=>x.nome===o.cliente);K.formSheet({title:'Enviar para assinatura',ok:'Enviar',groups:[{fields:[{k:'e',label:'E-mail',type:'email',req:true,value:ct?ct.email:''}]}],
   onOk:v=>{d.contrato.st='Enviado';re();M.toast(`Contrato enviado para ${v.e}.`)}})},
  'c-assinar':()=>K.confirm({title:'Marcar como assinado?',text:'As parcelas passam a valer e entram no Financeiro.',ok:'Marcar como assinado',run:()=>{d.contrato.st='Assinado';d.contrato.parcelas.forEach(x=>{if(x.st==='Aguardando assinatura')x.st='A vencer'});re();M.toast('Contrato assinado.')}}),
  parc:b=>{const x=fP(b);K.actions({title:`Parcela ${x.n} · ${brl(x.v)} · vence ${x.venc}`,items:[{label:'Registrar recebimento…',run:()=>receber(x)}]})},
  'parc-info':b=>{const x=fP(b);M.toast(`Parcela ${x.n}: ${x.st.toLowerCase()}.`)},
  'c-receber':b=>receber(fP(b)),
  'cc-novo':()=>K.formSheet({title:'Lançar custo',ok:'Lançar',groups:[{fields:[{k:'c',label:'Categoria',type:'select',opts:['Equipamentos','Mão de obra','Infraestrutura','Deslocamento'],req:true},{k:'v',label:'Valor',type:'money',req:true,ph:'R$ 0,00'},{k:'d',label:'Descrição',req:true}]},
    {fields:[{k:'dt',label:'Data',type:'date',value:iso(HOJE)},{k:'f',label:'Fornecedor',type:'select',opts:['—',...D.fornecedores.map(f=>f.nome)]}]}],
   onOk:v=>{const val=money(v.v);if(!val){M.toast('Informe o valor.');return false}d.lanc.unshift({id:nid('c'),data:br(v.dt)||HOJE,d:v.d,c:v.c,f:v.f,v:val});const cc=d.custos.find(x=>x.c===v.c);if(cc)cc.real+=val;re();M.toast('Custo lançado.')}})};
 Object.keys(ABA).forEach(k=>H['k-'+k]=aba(k));
 return H;
}
M.mscreen('obra',{title:'Obra',tab:'painel360',
 help:['O topo mostra a etapa da obra e os três atalhos: Registrar, Agendar e Copiar link.','Pontos de atenção levam direto ao que está atrasado.','Cada seção (Obra, Registros, Venda, Financeiro) abre em tela própria.'],
 render:q=>{const o=obraBy(q.get('id'));if(!o)return notFound('Painel 360','#/painel360','Obra');const k=q.get('aba');return ABA[k]?obraAba(o,k):obraMain(o)},
 mount:(v,q)=>{const o=obraBy(q.get('id'));M.wire(v,o?obraH(o):nfH('#/painel360'))}});

/* =====================================================================
   TÉCNICA
   ===================================================================== */
const tecRow=t=>({icon:ini(t.cliente),color:t.done?'rgb(var(--pos))':t.reaberta?'rgb(var(--warn))':'',title:esc(curto(t.cliente)),sub:`${esc(t.projeto)} · ${esc(TE_N(t.etapa))}${bar(pctT(t))}`,
 value:pctT(t)+'%',value2:t.reaberta?'<span class="co-v2" style="color:rgb(var(--warn));font-weight:600">↺ Reaberta</span>':t.origem==='Obra anterior'?'<span class="co-v2">Obra anterior</span>':t.done?'<span class="co-v2">Concluída</span>':'',
 href:'#/tecnica?id='+t.id,i:t.id,swipe:t.done?null:[{label:t.etapa>=TE.length-1?'Concluir':'Avançar',icon:'seta',act:'avancar',tone:1}]});
const tecList=()=>{const show=F.te==='all'?S.tec:S.tec.filter(t=>t.etapa===+F.te);
 if(!S.tec.length)return K.empty({title:'Nenhuma implementação técnica em andamento.',text:'Execuções nascem dos projetos, da Experiência ou de uma obra anterior ao Maestro.'});
 if(!show.length)return K.empty({title:'Nenhuma execução nesta etapa.',text:'Escolha outra etapa nos chips acima.'});
 return F.te==='all'?TE.map((n,i)=>{const r=show.filter(t=>t.etapa===i);return r.length?K.group({title:`${TE_N(i)} · ${r.length}`,rows:r.map(tecRow)}):''}).join('')
  :K.group({title:TE_N(+F.te),rows:show.map(tecRow),foot:'Deslize a linha para avançar a etapa técnica.'})};
function avancarTec(t,done){if(t.done)return M.toast('Execução já concluída.');
 if(t.etapa>=TE.length-1){t.done=true;t.fim=HOJE;done();return M.toast('Execução técnica concluída.','Desfazer',()=>{t.done=false;t.fim='';done()})}
 const f=t.etapa;t.etapa++;done();M.toast(`${curto(t.cliente)} → ${TE_N(t.etapa)}`,'Desfazer',()=>{t.etapa=f;done()})}
function legado(done){
 K.formSheet({title:'Obra anterior ao Maestro',ok:'Cadastrar',groups:[{fields:[{k:'cli',label:'Cliente',type:'select',opts:[...new Set([...D.contatos.filter(c=>c.papel==='Cliente').map(c=>c.nome),...EXTRA.map(o=>o.cliente)])],ph:'Escolha',req:true},
   {k:'nome',label:'Nome da obra',req:true,ph:'Ex.: Casa Vila da Serra'},{k:'end',label:'Endereço',ph:'Rua, número · bairro'}]},
  {title:'Onde ela está',fields:[{k:'et',label:'Etapa na Técnica',type:'select',opts:TE,ph:'Escolha',req:true},{k:'cs',label:'Sucesso do Cliente',type:'select',opts:CE,ph:'Não incluir agora'},{k:'ini',label:'Início',type:'date'}]},
  {fields:[{k:'obs',label:'Observação',type:'textarea'}],foot:'Cadastre uma obra que começou antes do sistema para acompanhá-la na Técnica e no Sucesso do Cliente.'}],
  onOk:v=>{S.tec.push({id:nid('t'),cliente:v.cli,projeto:v.nome,obra:null,endereco:v.end,etapa:TE.indexOf(v.et),inicio:br(v.ini)||HOJE,fim:'',origem:'Obra anterior',resp:'Bruno Lima',equipe:['Bruno Lima'],agenda:[],check:CK(),coment:v.obs?[{t:v.obs,autor:'Allysson Moura',quando:HOJE}]:[]});
   if(v.cs&&!csOf(v.cli))S.cs.push({id:nid('x'),cliente:v.cli,obra:null,etapa:CE.indexOf(v.cs),status:'Ativo',saude:70,ultimo:HOJE,tel:telOf(v.cli),resp:'Elisa Prado',legado:true,alertas:[],acoes:[],agenda:[],expansoes:[],hist:[{q:HOJE,t:'Cadastrada como obra anterior ao Maestro',d:v.nome}]});
   done();M.toast(`“${v.nome}” cadastrada na Técnica${v.cs?' e na Experiência':''}.`)}});
}
function tecDetalhe(t){const od=t.obra&&obraBy(t.obra)?OD(t.obra):null,ck=t.check.filter(c=>c.ok).length,last=t.etapa>=TE.length-1;
 return `${K.nav({title:t.projeto,back:'Técnica',kick:'Técnica · '+curto(t.cliente),sub:esc(t.endereco||'Sem endereço'),acts:[{text:'Editar',title:'Editar execução',act:'editar'},{icon:'pontos',title:'Mais ações',act:'mais'}]})}
 <section class="mcard"><div class="co-chips">${chip(TE_N(t.etapa),'b')}${t.reaberta?chip('↺ Reaberta via CS','w'):''}${t.origem==='Obra anterior'?chip('Obra anterior','n'):''}${t.done?chip('Concluída','g'):''}</div>
  ${steps(TE.length,t.etapa,t.done)}
  <div class="co-sn"><span>Etapa ${t.etapa+1} de ${TE.length} · <b>${esc(TE_N(t.etapa))}</b></span><b class="num">${pctT(t)}%</b></div>
  <p class="soft" style="margin:6px 0 0;font-size:15px">${t.done?'Execução concluída.':last?'Última etapa.':'Próxima: '+esc(TE_N(t.etapa+1))}</p>
  <div class="mt16">${t.done?'':K.btn(last?'Concluir execução':`Avançar para: ${TE_N(t.etapa+1)}`,{act:'avancar',pri:true})}</div></section>
 ${grp('Origem',info({title:'Origem',value:t.origem==='CS'?'Experiência (CS)':esc(t.origem)})+(t.reaberta?info({title:'Motivo',value:esc(t.reaberta.motivo)})+info({title:'Pedido',sub:esc(t.reaberta.titulo),wrap:true})+info({title:'Aberta por',value:esc(t.reaberta.por||'Elisa Prado')}):'')+info({title:'Responsável',value:esc(t.resp)})+info({title:'Início',value:t.inicio})+info({title:'Fim',value:t.fim||'—'}))}
 ${t.obra&&obraBy(t.obra)?K.group({rows:[{icon:'painel',title:'Abrir a obra no Painel 360',href:'#/obra?id='+t.obra}]}):''}
 ${K.group({title:'Agenda operacional',rows:[...t.agenda.map(a=>({icon:a.data.slice(0,5),title:esc(a.t),sub:`${a.hora}${a.tipo?' · '+esc(a.tipo):''} · ${esc(a.r)}`,href:'#/agenda'})),addRow('Agendar visita','agendar','agenda')]})}
 ${K.group({title:`Checklist técnico · ${ck} de ${t.check.length}`,rows:[...t.check.map(c=>({icon:'check',color:c.ok?'rgb(var(--pos))':'color-mix(in srgb,var(--text) 18%,transparent)',title:c.ok?`<s class="faint">${esc(c.t)}</s>`:esc(c.t),sub:c.ok?'Feito':'Toque para marcar',act:'ck',i:c.id,chev:false})),addRow('Nova atividade','ck-nova')]})}
 <section class="grp"><h2>Fotos da obra</h2>${od&&od.fotos.length?`<div class="co-ph3">${od.fotos.slice(0,9).map(fotoBtn).join('')}</div>`:''}${od?K.group({rows:[addRow('Enviar fotos','foto-nova','camera')]}):`<div class="mcard soft" style="text-align:center">Sem obra ligada: as fotos ficam no Painel 360 quando houver.</div>`}</section>
 ${od?K.group({title:'Anexos',rows:[...od.anexos.map(a=>({icon:'doc',color:'#8e8e93',title:esc(a.n),sub:`${esc(a.por)} · ${a.em}`,act:'ax-get',i:a.id,swipe:[{label:'Baixar',icon:'upload',act:'ax-get',tone:1}]})),addRow('Enviar anexo','ax-novo','upload')]}):''}
 ${grp('Equipe técnica',t.equipe.map(n=>info({icon:ini(n),color:'#8e8e93',title:esc(n)})).join('')+K.row(addRow('Adicionar pessoa','eq-add')))}
 ${K.group({title:'Comentários',rows:[...t.coment.map((c,i)=>({icon:'chat',color:'#8e8e93',title:esc(c.t),sub:`${c.quando} · ${esc(c.autor)}`,act:'cm-ver',i})),addRow('Comentar','coment','chat')]})}`;
}
function tecH(t){const od=()=>t.obra&&obraBy(t.obra)?OD(t.obra):null;
 const coment=()=>K.formSheet({title:'Comentário',ok:'Comentar',groups:[{fields:[{k:'t',label:'Comentário',type:'textarea',req:true}]}],onOk:v=>{t.coment.unshift({t:v.t,autor:'Allysson Moura',quando:HOJE});re();M.toast('Comentário registrado.')}});
 const ag=()=>agendar({titulo:'Visita técnica · '+t.projeto,onOk:a=>{pushAgenda(t.agenda,a);const d=od();if(d)pushAgenda(d.agenda,{...a});re()}});
 return {avancar:()=>avancarTec(t,re),agendar:ag,coment,
  editar:()=>K.formSheet({title:'Editar execução técnica',groups:[{fields:[{k:'p',label:'Nome da obra',req:true,value:t.projeto},{k:'r',label:'Responsável',type:'select',opts:EQ,value:t.resp},{k:'e',label:'Endereço',value:t.endereco||''}]},
    {fields:[{k:'et',label:'Etapa atual',type:'select',opts:TE,value:TE[t.etapa]},{k:'i',label:'Início',type:'date',value:iso(t.inicio)}]}],
   onOk:v=>{t.projeto=v.p;t.resp=v.r;t.endereco=v.e;t.etapa=TE.indexOf(v.et);t.inicio=br(v.i)||t.inicio;re();M.toast('Execução salva.')}}),
  mais:()=>K.actions({title:t.projeto,items:[{label:'Agendar visita',run:ag},{label:'Comentário',run:coment},...(t.obra&&obraBy(t.obra)?[{label:'Abrir no Painel 360',run:()=>go('#/obra?id='+t.obra)}]:[])]}),
  ck:b=>{const c=t.check.find(x=>x.id===b.dataset.i);c.ok=!c.ok;re()},
  'ck-nova':()=>K.formSheet({title:'Nova atividade',ok:'Adicionar',groups:[{fields:[{k:'t',label:'Atividade',req:true}]}],onOk:v=>{t.check.push({id:nid('k'),t:v.t,ok:false});re()}}),
  foto:b=>fotoVer(od().fotos.find(f=>f.id===b.dataset.i)),
  'foto-nova':()=>K.formSheet({title:'Enviar fotos',ok:'Enviar',groups:[{fields:[{k:'f',label:'Fotos',type:'file',req:true},{k:'leg',label:'Legenda',ph:'Ex.: Rack técnico'}]}],
   onOk:v=>{const d=od(),o=obraBy(t.obra);d.fotos.unshift({id:nid('f'),leg:v.leg||'Foto da obra',data:HOJE,etapa:TE[t.etapa],h:(d.fotos.length*53)%360});o.fotos++;re();M.toast('Foto enviada.')}}),
  'ax-novo':()=>anexoNovo(od(),re),'ax-get':b=>M.toast(`Baixando “${od().anexos.find(a=>a.id===b.dataset.i).n}”.`),
  'eq-add':()=>pessoaNova(t.equipe,re,'Toda a equipe já está nesta execução.'),
  'cm-ver':b=>{const c=t.coment[+b.dataset.i];K.sheet({title:'Comentário',ok:'OK',cancel:'',body:`<p style="font-size:17px;line-height:1.45;margin:0 0 12px">${esc(c.t)}</p><p class="soft" style="margin:0">${c.quando} · ${esc(c.autor)}</p>`})}};
}
M.mscreen('tecnica',{title:'Técnica',tab:'tecnica',
 help:['A Técnica acompanha a execução em campo, em paralelo a Projetos. Os chips filtram a etapa.','Deslize a linha ou abra a execução e use “Avançar para”. ↺ indica reaberta pela Experiência.','O + cadastra uma obra que começou antes do Maestro.'],
 render:q=>{const id=q.get('id');if(id){const t=S.tec.find(x=>x.id===id);return t?tecDetalhe(t):notFound('Técnica','#/tecnica','Execução')}
  const reab=S.tec.filter(t=>t.reaberta).length;
  return `${K.nav({title:'Técnica',sub:`Execução técnica · ${TE.length} etapas · ${S.tec.length} execuções${reab?` · ↺ ${reab} reaberta${reab>1?'s':''}`:''}`,acts:[{icon:'mais',title:'Obra anterior ao Maestro',act:'legado'}]})}
   ${K.chips('co-te',[['all',`Todas · ${S.tec.length}`],...TE.map((n,i)=>[String(i),`${n} · ${S.tec.filter(t=>t.etapa===i).length}`])],F.te)}<div id="co-tl">${tecList()}</div>`},
 mount:(v,q)=>{const id=q.get('id');
  if(id){const t=S.tec.find(x=>x.id===id);return M.wire(v,t?tecH(t):nfH('#/tecnica'))}
  const box=$('#co-tl',v),H={avancar:b=>avancarTec(S.tec.find(t=>t.id===b.dataset.i),re),legado:()=>legado(re)};
  K.bindPick(v,'co-te',x=>{F.te=x;box.innerHTML=tecList();M.wire(box,H);K.bindSwipe(box)});M.wire(v,H)}});

/* =====================================================================
   EXPERIÊNCIA (Sucesso do Cliente)
   ===================================================================== */
const csStatus=(c,s)=>c.status==='Perdido'?'Perdido':s>=70?'Saudável':s>=40?'Ativo':'Em risco';
const ligar=c=>{location.href=tel(c.tel)};
const zap=c=>{window.open(wa(c.tel),'_blank','noopener')};
const csRow=c=>{const o=c.obra?obraBy(c.obra):null;
 return {icon:String(c.saude),color:hc(c.saude),title:esc(curto(c.cliente)),sub:`${o?esc(o.nome):'Sem obra'} · ${esc(c.status)}${c.alertas[0]?' · '+esc(c.alertas[0].t):''}`,
  value:c.alertas.length?`<b class="neg">${c.alertas.length}</b><span class="co-v2">alerta${c.alertas.length>1?'s':''}</span>`:`<span class="co-v2">${dm(c.ultimo)}</span>`,href:'#/experiencia?id='+c.id,i:c.id,
  swipe:[{label:'Ligar',icon:'telefone',act:'ligar',tone:4},{label:'WhatsApp',icon:'zap',act:'zap',tone:1}]}};
const csList=()=>{const show=F.ce==='all'?S.cs:S.cs.filter(c=>c.etapa===+F.ce);
 if(!S.cs.length)return K.empty({title:'Nenhum cliente em acompanhamento.',text:'O cliente entra aqui quando a obra é entregue.'});
 if(!show.length)return K.empty({title:'Nenhum cliente nesta etapa.',text:'Escolha outra etapa nos chips acima.'});
 return F.ce==='all'?CE.map((n,i)=>{const r=show.filter(c=>c.etapa===i);return r.length?K.group({title:`${n} · ${r.length}`,rows:r.map(csRow)}):''}).join('')+'<div class="foot" style="padding:0 16px 24px;font-size:13px;color:var(--faint)">O número colorido é a saúde (0 a 100). Deslize para ligar ou chamar no WhatsApp.</div>'
  :K.group({title:CE[+F.ce],rows:show.map(csRow),foot:'Deslize para ligar ou chamar no WhatsApp.'})};
function pulso(c,done){K.formSheet({title:'Pulso do cliente',ok:'Registrar',groups:[{title:c.cliente,fields:[{k:'s',label:'Saúde (0 a 100)',type:'number',req:true,value:String(c.saude)},{k:'h',label:'Como está?',type:'select',opts:['Muito satisfeito','Satisfeito','Neutro','Insatisfeito'],value:'Satisfeito'}]},{fields:[{k:'o',label:'Observação',type:'textarea'}]}],
 onOk:v=>{const n=parseInt(v.s);if(isNaN(n)||n<0||n>100){M.toast('Use um número de 0 a 100.');return false}c.saude=n;c.status=csStatus(c,n);c.ultimo=HOJE;c.hist.unshift({q:HOJE,t:'Pulso registrado',d:`Saúde ${n} · ${v.h}${v.o?' · '+v.o:''}`});done();M.toast('Pulso registrado.')}})}
function alerta(c,done){K.formSheet({title:'Registrar alerta',ok:'Registrar',groups:[{fields:[{k:'t',label:'Alerta',req:true,ph:'Ex.: Câmera sem imagem'},{k:'g',label:'Gravidade',type:'select',opts:['Alta','Média','Baixa'],value:'Média'}]},{fields:[{k:'d',label:'Descrição',type:'textarea'}]}],
 onOk:v=>{c.alertas.unshift({id:nid('al'),t:v.t,em:HOJE,g:v.g});c.hist.unshift({q:HOJE,t:'Alerta registrado',d:v.t});done();M.toast('Alerta registrado.')}})}
function anotar(c,done){K.formSheet({title:'Anotar',ok:'Salvar',groups:[{fields:[{k:'t',label:'Anotação',type:'textarea',req:true}]}],onOk:v=>{c.hist.unshift({q:HOJE,t:'Anotação',d:v.t});done();M.toast('Anotação salva.')}})}
function csDetalhe(c){const o=c.obra?obraBy(c.obra):null,tecs=S.tec.filter(t=>t.cliente===c.cliente),last=c.etapa>=CE.length-1;
 return `${K.nav({title:c.cliente,back:'Experiência',kick:'Experiência · '+CE[c.etapa],sub:`${o?esc(o.nome):'Sem obra'} · último contato ${dm(c.ultimo)}`,acts:[{text:'Editar',title:'Editar acompanhamento',act:'editar'},{icon:'pontos',title:'Mais ações',act:'mais'}]})}
 <section class="mcard"><div class="co-chips">${chip(c.status,ST_CS[c.status])}${c.alertas.length?chip(c.alertas.length+' alerta'+(c.alertas.length>1?'s':''),'r'):''}${c.legado?chip('Obra anterior','n'):''}</div>
  <div class="co-hs mt16"><b style="color:${hc(c.saude)}">${c.saude}</b><span>de 100 · ${c.saude>=70?'faixa verde (70 ou mais)':c.saude>=40?'faixa amarela (40 a 69)':'faixa vermelha (abaixo de 40)'}</span></div>
  <div class="mt8">${`<div class="prog"><b style="width:${c.saude}%;background:${hc(c.saude)}"></b></div>`}</div>
  <div class="mbtns mt16"><a class="mbtn" href="${tel(c.tel)}">${ic('telefone',20)}Ligar</a><a class="mbtn" href="${wa(c.tel)}" target="_blank" rel="noopener">${ic('zap',20)}WhatsApp</a></div>
  <div class="mt8">${last?`<p class="soft" style="margin:8px 0 0;font-size:15px">Última etapa do acompanhamento.</p>`:K.btn(`Avançar para “${CE[c.etapa+1]}”`,{act:'avancar',pri:true})}</div></section>
 ${K.group({title:'Saúde',rows:[addRow('Registrar pulso','pulso','coracao')],foot:`Telefone ${esc(c.tel)} · responsável ${esc(c.resp)}`})}
 ${K.group({title:'Sugerir expansão',foot:'Viu uma oportunidade nova com este cliente? Vira um negócio no Comercial, já ligado a ele.',rows:[...c.expansoes.map(x=>({icon:'negocios',title:esc(x.titulo),sub:`${x.quando}${x.valor?' · '+brl(x.valor):''}`,href:'#/negocios?card='+x.id})),addRow('Sugerir expansão','expandir','brilho')]})}
 ${K.group({title:'Alertas',rows:[...c.alertas.map(a=>({icon:'sino',color:`rgb(var(--${a.g==='Alta'?'neg':a.g==='Média'?'warn':'primary'}))`,title:esc(a.t),sub:`${a.em} · gravidade ${a.g.toLowerCase()}`,act:'al',i:a.id,swipe:[{label:'Resolver',icon:'check',act:'al-ok',tone:4}]})),addRow('Registrar alerta','alerta')]})}
 ${K.group({title:'Próximas ações',rows:[...c.acoes.map(a=>({icon:'relogio',title:esc(a.t),sub:`${dm(a.quando)} · ${esc(a.resp)}`,act:'a',i:a.id,swipe:[{label:'Concluir',icon:'check',act:'a-ok',tone:4},{label:'Delegar',icon:'contatos',act:'a-del',tone:1}]})),addRow('Nova ação','a-nova')]})}
 ${K.group({title:'Agenda',rows:[...c.agenda.map(a=>({icon:a.data.slice(0,5),title:esc(a.t),sub:`${a.hora} · ${esc(a.r)}`,href:'#/agenda'})),addRow('Agendar visita','agendar','agenda')]})}
 ${K.group({title:'Técnica',rows:[...tecs.map(t=>({icon:'chave',color:t.reaberta?'rgb(var(--warn))':'',title:esc(t.projeto),sub:`${esc(TE_N(t.etapa))} · desde ${dm(t.inicio)}${t.reaberta?' · ↺ reaberta':''}`,value:t.done?'Concluída':pctT(t)+'%',href:'#/tecnica?id='+t.id})),addRow('Reabrir Técnica','reabrir','trocar')]})}
 ${grp('Histórico',histRows(c.hist))}`;
}
function csH(c){const fA=b=>c.acoes.find(a=>a.id===b.dataset.i),fL=b=>c.alertas.find(a=>a.id===b.dataset.i);
 const ag=()=>agendar({titulo:'Visita de acompanhamento',onOk:a=>{pushAgenda(c.agenda,a);c.hist.unshift({q:HOJE,t:'Visita agendada',d:`${a.t} · ${dm(a.data)} ${a.hora}`});re()}});
 const aOk=a=>K.formSheet({title:'Concluir ação',ok:'Concluir',groups:[{title:a.t,fields:[{k:'f',label:'O que foi feito?',type:'textarea',req:true}]}],onOk:v=>{c.acoes=c.acoes.filter(x=>x!==a);c.ultimo=HOJE;c.hist.unshift({q:HOJE,t:a.t,d:v.f});re();M.toast('Ação concluída.')}});
 const aDel=a=>K.actions({title:'Delegar para quem?',items:EQ.map(n=>({label:n+(n===a.resp?' (atual)':''),run:()=>{a.resp=n;re();M.toast(`Delegada para ${n}.`)}}))});
 const resolver=a=>K.formSheet({title:'Resolver alerta',ok:'Resolver',groups:[{title:a.t,fields:[{k:'m',label:'Como foi resolvido?',type:'textarea',req:true}]}],onOk:v=>{c.alertas=c.alertas.filter(x=>x!==a);c.hist.unshift({q:HOJE,t:'Alerta resolvido',d:`${a.t} · ${v.m}`});re();M.toast('Alerta resolvido.')}});
 return {ligar:()=>ligar(c),zap:()=>zap(c),pulso:()=>pulso(c,re),alerta:()=>alerta(c,re),agendar:ag,
  avancar:()=>{const f=c.etapa;c.etapa++;c.hist.unshift({q:HOJE,t:'Etapa mudou',d:CE[c.etapa]});re();M.toast(`${curto(c.cliente)} → ${CE[c.etapa]}`,'Desfazer',()=>{c.etapa=f;c.hist.shift();re()})},
  editar:()=>K.formSheet({title:'Editar acompanhamento',groups:[{fields:[{k:'e',label:'Etapa',type:'select',opts:CE,value:CE[c.etapa]},{k:'s',label:'Status',type:'select',opts:CST,value:c.status},{k:'r',label:'Responsável',type:'select',opts:EQ,value:c.resp},{k:'t',label:'Telefone',type:'tel',value:c.tel}]}],
   onOk:v=>{c.etapa=CE.indexOf(v.e);c.status=v.s;c.resp=v.r;c.tel=v.t;re();M.toast('Acompanhamento salvo.')}}),
  mais:()=>K.actions({title:c.cliente,items:[{label:'Agendar visita',run:ag},{label:'Pulso / saúde',run:()=>pulso(c,re)},{label:'Registrar alerta',run:()=>alerta(c,re)},{label:'Anotar',run:()=>anotar(c,re)}]}),
  expandir:()=>K.formSheet({title:'Sugerir expansão',ok:'Criar negócio',groups:[{title:c.cliente,fields:[{k:'t',label:'Título',req:true,ph:'Ex.: Áudio na área gourmet'},{k:'v',label:'Valor estimado',type:'money',ph:'R$ 0,00'}]},{fields:[{k:'c',label:'Contexto',type:'textarea',ph:'O que o cliente comentou, por que é uma boa hora.'}],foot:'Cria o negócio de expansão no Comercial, já ligado ao cliente.'}],
   onOk:v=>{const ct=D.contatos.find(x=>x.nome===c.cliente),n={id:nid('n'),titulo:v.t,cliente:c.cliente,cid:ct?ct.id:'',etapa:0,valor:money(v.v),status:'Aberto',origem:'Expansão (Experiência)',resp:'Allysson Moura',prob:20};
    D.negocios.push(n);c.expansoes.unshift({id:n.id,titulo:v.t,valor:n.valor,quando:HOJE});c.hist.unshift({q:HOJE,t:'Expansão sugerida',d:v.t});re();M.toast('Negócio de expansão criado no Comercial.','Abrir',()=>go('#/negocios?card='+n.id))}}),
  al:b=>{const a=fL(b);K.actions({title:`${a.t} · gravidade ${a.g.toLowerCase()}`,items:[{label:'Resolver…',run:()=>resolver(a)}]})},'al-ok':b=>resolver(fL(b)),
  a:b=>{const a=fA(b);K.actions({title:a.t,items:[{label:'Concluir…',run:()=>aOk(a)},{label:'Delegar…',run:()=>aDel(a)}]})},'a-ok':b=>aOk(fA(b)),'a-del':b=>aDel(fA(b)),
  'a-nova':()=>K.formSheet({title:'Nova ação',ok:'Criar',groups:[{fields:[{k:'t',label:'Ação',req:true},{k:'d',label:'Quando',type:'date',req:true,value:iso(addD(HOJE,1))},{k:'r',label:'Responsável',type:'select',opts:EQ,value:c.resp}]}],onOk:v=>{c.acoes.push(AC(v.t,br(v.d),v.r));re();M.toast('Ação criada.')}}),
  reabrir:()=>K.formSheet({title:'Reabrir Técnica',ok:'Reabrir',groups:[{fields:[{k:'m',label:'Motivo',type:'select',opts:['Manutenção','Ajuste','Reparo','Personalização','Nova demanda'],req:true,ph:'Escolha'},{k:'r',label:'Responsável',type:'select',opts:EQ,value:'Bruno Lima'},{k:'t',label:'Título',req:true,ph:'Ex.: Câmera sem imagem'}]},
    {fields:[{k:'d',label:'Descrição',type:'textarea'}],foot:`Abre uma nova execução técnica para ${c.cliente}, marcada como reaberta via Experiência.`}],
   onOk:v=>{const ob=c.obra?obraBy(c.obra):null,nt={id:nid('t'),cliente:c.cliente,projeto:ob?ob.nome:c.cliente,obra:c.obra,endereco:'',etapa:0,inicio:HOJE,fim:'',origem:'CS',reaberta:{motivo:v.m,titulo:v.t,por:'Allysson Moura'},resp:v.r,equipe:[v.r],agenda:[],check:CK(),coment:v.d?[{t:v.d,autor:'Allysson Moura',quando:HOJE}]:[]};
    S.tec.push(nt);c.hist.unshift({q:HOJE,t:'Técnica reaberta: '+v.m,d:v.t});re();M.toast('Técnica reaberta.','Abrir',()=>go('#/tecnica?id='+nt.id))}})};
}
M.mscreen('experiencia',{title:'Experiência',tab:'experiencia',
 help:['Cada cliente entregue entra aqui para acompanhamento contínuo. O número colorido é a saúde: verde a partir de 70, amarelo a partir de 40.','Deslize a linha para ligar ou chamar no WhatsApp.','Abra o cliente para registrar pulso e alertas, sugerir expansão ou reabrir a Técnica.'],
 render:q=>{const id=q.get('id');if(id){const c=S.cs.find(x=>x.id===id);return c?csDetalhe(c):notFound('Experiência','#/experiencia','Cliente')}
  const al=S.cs.reduce((a,c)=>a+c.alertas.length,0);
  return `${K.nav({title:'Experiência',sub:`${S.cs.length} clientes · ${al} alertas · acompanhamento contínuo`})}
   ${K.chips('co-ce',[['all',`Todas · ${S.cs.length}`],...CE.map((n,i)=>[String(i),`${n} · ${S.cs.filter(c=>c.etapa===i).length}`])],F.ce)}<div id="co-cl">${csList()}</div>`},
 mount:(v,q)=>{const id=q.get('id');
  if(id){const c=S.cs.find(x=>x.id===id);return M.wire(v,c?csH(c):nfH('#/experiencia'))}
  const box=$('#co-cl',v),f=b=>S.cs.find(c=>c.id===b.dataset.i),H={ligar:b=>ligar(f(b)),zap:b=>zap(f(b))};
  K.bindPick(v,'co-ce',x=>{F.ce=x;box.innerHTML=csList();M.wire(box,H);K.bindSwipe(box)});M.wire(v,H)}});
})();

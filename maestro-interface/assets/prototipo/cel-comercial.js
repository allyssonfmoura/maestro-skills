/* Maestro OS · celular · Comercial: Contatos (com a Ficha do cliente), Negócios (com o painel e o fechamento em passos) e Propostas
   Mesmos registros, estados e ações do computador (mod-comercial.js), redesenhados para o toque.
   Detalhes são rotas da pilha: #/contatos?ficha=, #/negocios?card=, #/propostas?p= */
(function(){
const {ic,$,$$,esc,brl}=M, K=M.m, D=M.D;
const brl0=n=>'R$ '+Math.round(n).toLocaleString('pt-BR');

/* ---------- peças comuns às telas de celular deste lote (iguais em cel-rotina.js; a primeira que carregar define) ---------- */
if(!M.mx){const X=M.mx={};
  X.ini=n=>String(n||'?').split(/\s+/).filter(w=>w.length>2||/^[A-Z]/.test(w)).slice(0,2).map(w=>w[0]).join('').toUpperCase();
  X.digits=t=>String(t||'').replace(/\D/g,'');
  X.tel=t=>'tel:+55'+X.digits(t); X.wa=(t,txt)=>'https://wa.me/55'+X.digits(t)+(txt?'?text='+encodeURIComponent(txt):'');
  /* linha só de leitura (rótulo à esquerda, valor à direita, pode quebrar) */
  X.kv=(l,v)=>`<li><div class="rw cx-kv"><span class="cx-l">${esc(l)}</span><span class="cx-v">${v}</span></div></li>`;
  X.info=(title,rows,foot='')=>`<section class="grp">${title?`<h2>${esc(title)}</h2>`:''}<ul class="lst">${rows.filter(Boolean).map(([l,v])=>X.kv(l,v)).join('')}</ul>${foot?`<div class="foot">${foot}</div>`:''}</section>`;
  /* linhas de texto (histórico, comentários): {t, s, icon, color} */
  X.lines=(title,items,empty='')=>`<section class="grp">${title?`<h2>${esc(title)}</h2>`:''}${items.length?`<ul class="lst">${items.map(i=>`<li><div class="rw cx-kv ${i.icon?'ic40':''}">${i.icon?`<span class="mic sm" style="${i.color?'background:'+i.color:''}" aria-hidden="true">${/^[a-z]+$/.test(i.icon)?ic(i.icon,18):`<b style="font-size:12px">${esc(i.icon)}</b>`}</span>`:''}<span class="tx"><span class="t1 cx-wrap">${i.t}</span>${i.s?`<span class="t2 cx-wrap">${i.s}</span>`:''}</span>${i.v?`<span class="vl">${i.v}</span>`:''}</div></li>`).join('')}</ul>`:`<div class="mcard soft cx-p">${esc(empty)}</div>`}</section>`;
  X.text=(title,html,cls='')=>`<section class="grp">${title?`<h2>${esc(title)}</h2>`:''}<div class="mcard cx-p ${cls}">${html}</div></section>`;
  X.hd=({kick='',title,sub='',chips='',val=''})=>`<header class="cx-hd">${kick?`<div class="k">${esc(kick)}</div>`:''}<h1>${esc(title)}</h1>${sub?`<p>${sub}</p>`:''}${val?`<div class="cx-val num">${val}</div>`:''}${chips?`<div class="cx-chips">${chips}</div>`:''}</header>`;
  X.chip=(t,tone='n')=>`<span class="chip ${tone}">${esc(t)}</span>`;
  /* grupo de escolhas múltiplas (substitui caixas de marcar: linha inteira é o alvo, ≥ 52) */
  X.checks=g=>{const c=g.checks;return `<section class="grp" data-ckg="${c.k}">${g.title?`<h2>${esc(g.title)}${c.req?' <b class="req" aria-hidden="true">*</b>':''}</h2>`:''}<ul class="lst" role="group" aria-label="${esc(g.title||c.k)}">${c.opts.map(o=>`<li><button type="button" class="rw cx-ck" data-ck="${c.k}" data-v="${esc(o)}" aria-pressed="${(c.value||[]).includes(o)}"><span class="tx"><span class="t1">${esc(o)}</span></span><span class="cx-cm">${ic('check',22)}</span></button></li>`).join('')}</ul>${g.foot?`<div class="foot">${esc(g.foot)}</div>`:''}</section>`};
  /* folha de formulário: grupos de campos (kit) + grupos de escolha; valida obrigatórios visíveis */
  X.fsheet=({title,groups,ok='Salvar',onOk,cheia=true,top='',bottom='',dng=false})=>{
    const fields=groups.filter(g=>g.fields).flatMap(g=>g.fields);
    const body=top+groups.map(g=>g.checks?X.checks(g):K.form([g])).join('')+bottom;
    const s=K.sheet({title,ok,cheia,body,onOk:el=>{const v={};let bad=null;
      fields.forEach(f=>{const e=$(`[name="${f.k}"]`,el),row=e&&e.closest('.fr'),off=row&&row.hidden,val=e?e.value.trim():'';v[f.k]=val;
        const miss=f.req&&!val&&!off;row&&row.classList.toggle('err',!!miss);if(miss&&!bad)bad=e});
      groups.filter(g=>g.checks).forEach(g=>{const k=g.checks.k;v[k]=$$(`[data-ck="${k}"][aria-pressed="true"]`,el).map(b=>b.dataset.v);
        const miss=g.checks.req&&!v[k].length;$(`[data-ckg="${k}"]`,el).classList.toggle('cx-err',miss);if(miss&&!bad)bad=$(`[data-ck="${k}"]`,el)});
      if(bad){bad.focus();M.toast('Preencha os campos obrigatórios.');return false}
      return onOk&&onOk(v,el)}});
    $$('[data-ck]',s.el).forEach(b=>b.onclick=()=>b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true'));
    X.ltr(s.el);
    if(dng)$('[data-ok]',s.el).style.color='rgb(var(--neg))';
    return s};
  X.motivo=({title,label='Motivo',ph='',ok,dng=false,top='',run})=>X.fsheet({title,ok,cheia:false,dng,top,groups:[{fields:[{k:'motivo',label,type:'textarea',req:true,ph}]}],onOk:v=>run(v.motivo)});
  /* o kit usa dir=rtl para alinhar a escolha à direita; com texto misto (#1051 · Vista) a ordem embaralha: volta para ltr alinhado à direita */
  X.ltr=root=>$$('.mf select',root).forEach(s=>{s.dir='ltr';s.style.textAlignLast='right'});
  X.show=(el,k,on)=>{const i=$(`[name="${k}"]`,el);if(i)i.closest('.fr').hidden=!on};
  /* repinta a tela atual sem mudar de lugar na página */
  X.refresh=()=>{const y=scrollY;dispatchEvent(new HashChangeEvent('hashchange'));scrollTo(0,y)};
  X.css=(id,txt)=>{if(document.getElementById(id))return;const s=document.createElement('style');s.id=id;s.textContent=txt;document.head.append(s)};
  X.css('cx-css',`
  .mf [hidden]{display:none!important}
  .cx-kv{cursor:default;align-items:flex-start}
  .cx-kv:active{background:var(--panel)!important}
  [data-transp="on"][data-glass="tudo"] .cx-kv:active{background:transparent!important}
  .cx-kv .cx-l{flex:none;max-width:46%;color:var(--soft);font-size:16px;line-height:1.4}
  .cx-kv .cx-v{flex:1;min-width:0;text-align:right;font-size:16px;line-height:1.4;overflow-wrap:anywhere}
  .cx-kv .tx{align-self:center}.cx-kv .mic{align-self:center}
  .rw .cx-wrap{white-space:normal;overflow:visible;line-height:1.4}
  .rw .t1:has(>.cx-2l){white-space:normal}.cx-2l{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.3}
  .cx-ck .cx-cm{color:rgb(var(--primary));opacity:0;flex:none;display:inline-flex}
  .cx-ck[aria-pressed="true"] .cx-cm{opacity:1}
  .cx-err>h2{color:rgb(var(--neg))!important}
  .grp>h2 .req{color:rgb(var(--neg))}
  .cx-p{font-size:16px;line-height:1.5}.cx-p p{margin:0}.cx-p p+p{margin-top:8px}
  .cx-hd{padding:4px 4px 20px}
  .cx-hd .k{font-size:13px;font-weight:600;color:var(--faint);text-transform:uppercase;letter-spacing:.04em}
  .cx-hd h1{margin:4px 0 0;font-size:28px;line-height:1.15;font-weight:700;letter-spacing:-.02em;overflow-wrap:anywhere}
  .cx-hd p{margin:6px 0 0;color:var(--soft);font-size:15px;line-height:1.4}
  .cx-val{margin-top:10px;font-size:30px;font-weight:700;letter-spacing:-.02em}
  .cx-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
  .cx-chips .chip{height:28px;font-size:13px;padding:0 12px;max-width:100%;overflow:hidden;text-overflow:ellipsis}
  .cx-acts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:0 0 24px}
  .cx-acts>.full{grid-column:1 / -1}
  .cx-acts .mbtn{padding:0 8px;min-width:0}
  .cx-big{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:0 0 24px}
  .cx-big>a,.cx-big>button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:64px;min-width:0;padding:0 2px;border:0;border-radius:14px;
    background:var(--panel);box-shadow:0 0 0 .5px var(--line-2);color:rgb(var(--primary));font-size:12.5px;font-weight:600;text-decoration:none}
  .cx-big>a:active,.cx-big>button:active{opacity:.6}
  .cx-big span{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cx-err-t{color:rgb(var(--neg));font-size:15px;margin:0 4px 16px;min-height:0}
  .cx-err-t:empty{display:none}
  .cx-cmp{display:flex;gap:8px;align-items:center;margin-top:12px}
  .cx-cmp input{flex:1;min-width:0;height:44px;padding:0 14px;border-radius:12px;border:0;font-size:17px;background:color-mix(in srgb,var(--text) 7%,transparent);color:var(--text);outline:none}
  .cx-cmp button{flex:none;height:44px;min-width:44px;padding:0 14px;border:0;border-radius:12px;background:color-mix(in srgb,var(--text) 7%,transparent);color:rgb(var(--primary));font-size:16px;font-weight:600}
  `);
}
const X=M.mx;

/* ---------- constantes e utilidades (iguais ao computador) ---------- */
const ME='Allysson Moura';
const ETAPAS=D.etapasComerciais;
const PARCEIROS=['Arquiteto(a)','Engenheiro(a)','Designer de Interiores','Construtora','Integrador','Mestre de Obras','Eletricista','Responsável de Escritório','Outros'];
const ORIGENS=['Arquiteto','Engenheiro','Designer de Interiores','Indicação Interna','Relacionamento Pessoal','Showroom','Site','Instagram'];
const MOTIVOS=['Orçamento acima do planejado','Obra adiada pelo cliente','Escolheu outra empresa','Cliente parou de responder'];
const REG=[['Registro Técnico','Visita, execução, pendências.'],['Passagem de bastão','Contexto da venda pra Projetos.'],['Registro de Projetos','Ata, decisões, adequações.'],['Registro de Experiência','Contato pós-venda, percepção.']];
const TIPOS_AG=['Visita técnica','Showroom','Apresentação de proposta','Reunião','Entrega'];
const TAREFAS=[['Fazer o primeiro contato','Registrar origem e quem indicou'],['Entender escopo e momento da obra','Confirmar faixa de investimento'],
  ['Agendar visita técnica','Registrar relatório da visita'],['Montar proposta no construtor','Apresentar proposta ao cliente'],
  ['Registrar objeções do cliente','Ajustar condição de pagamento'],['Confirmar decisão com o cliente','Conferir dados para o fechamento']];
const FASE_TONE={Lead:'n',Comercial:'b',Projetos:'b','Técnica':'w','Experiência':'g'};
const ST_TONE={Rascunho:'n',Enviada:'b',Vista:'b',Aceita:'g',Recusada:'r',Expirada:'w'};
const SORDER=['Rascunho','Enviada','Vista','Aceita','Recusada','Expirada'];
const NEG_TONE={Aberto:'b',Ganho:'g',Perdido:'r'};
const TONE={r:'rgb(var(--neg))',w:'rgb(var(--warn))',b:'rgb(var(--primary))',g:'rgb(var(--pos))',n:'#8e8e93'};
const fd=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');return m?`${m[3]}/${m[2]}/${m[1]}`:(s||'—')};
const fdc=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');return m?`${m[3]}/${m[2]}`:(s||'—')};
const addDays=(iso,n)=>{const d=new Date(iso+'T12:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
const dias=s=>Math.round((new Date(s+'T12:00')-new Date(D.hoje+'T12:00'))/864e5);
const prazoTxt=s=>{if(!s)return 'sem prazo';const n=dias(s);return n===0?'hoje':n===1?'amanhã':n===-1?'ontem':n>0?`em ${n}d`:`há ${-n}d`};
const money=s=>{if(typeof s==='number')return s;const t=String(s||'').replace(/[^\d,.-]/g,'');if(!t)return 0;return +(t.includes(',')?t.replace(/\./g,'').replace(',','.'):t)||0};
const uid=p=>p+Math.random().toString(36).slice(2,8);
const agora=()=>{const d=new Date();return 'hoje, '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')};
const dkey=q=>{if(!q)return 0;if(/^(hoje|agora)/.test(q))return 99999999;const m=/^(\d{2})\/(\d{2})\/(\d{4})/.exec(q);return m?+(m[3]+m[2]+m[1]):0};
const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const first=n=>n?n.split(' ')[0]:'';
const contato=id=>D.byId('contatos',id);
const negocio=id=>D.byId('negocios',id);
const prop=id=>D.byId('propostas',id);
const propsDe=d=>D.propostas.filter(p=>p.nid===d.id).sort((a,b)=>b.upd-a.upd);
const negsDe=c=>D.negocios.filter(n=>n.cid===c.id);
const obrasDe=c=>D.obras.filter(o=>o.cliente===c.nome);
const etapaNome=d=>d.status==='Aberto'?ETAPAS[d.etapa]:d.status;
const maxUpd=()=>Math.max(0,...D.propostas.map(p=>p.upd||0))+1;
const tl=(cid,t,d)=>{const c=contato(cid);if(c)c.tl.unshift({q:agora(),t,d})};
const nav=o=>K.nav(o);
const top=t=>`<p class="soft cx-p" style="margin:0 4px 16px">${t}</p>`;
const goObra=id=>{location.hash=M.mscreens.obra?'#/obra?id='+id:M.mscreens.projetos?'#/projetos':'#/dashboard';if(!M.mscreens.obra&&!M.mscreens.projetos)M.toast('A obra abre em Projetos.')};

/* ---------- dados próprios do módulo (os mesmos do computador; completam M.D sem duplicar) ---------- */
if(!D._cm){D._cm=1;
  D.contatos.forEach(c=>{if(!c.papeis)c.papeis=c.papel==='Parceiro'?['Parceiro']:['Cliente'];
    ['tl','ag','obs','exp'].forEach(k=>{if(!c[k])c[k]=[]});if(!c.resp)c.resp=ME;if(!c.uf)c.uf='MG'});
  const CX={
    c1:{cpf:'041.552.876-10',tl:[{q:'28/09/2026',t:'Registro Técnico',d:'Conferência da infra elétrica com o eletricista da obra. Sem pendências.'}],
      ag:[{tipo:'Entrega',data:'2026-10-06',ini:'17:30',fim:'18:30',local:'Residência Duarte',resp:'Bruno Lima',brief:'Entrega de equipamentos.'}],
      obs:[{t:'Prefere contato por WhatsApp depois das 18h.',quem:ME,q:'12/08/2026'}]},
    c2:{cpf:'332.118.906-44',resp:'Felipe Nunes'},
    c3:{cpf:'118.940.276-02',obs:[{t:'Quer ver o cenário com cortinas motorizadas antes de decidir.',quem:ME,q:'30/09/2026'}]},
    c4:{resp:'Felipe Nunes'},c7:{resp:'Felipe Nunes'},c8:{resp:'Felipe Nunes',cnpj:'21.554.880/0001-31',razao:'Sushi Yoru Bar Ltda'},
    c6:{conjuge:'Miranda Lemos',exp:[{t:'Reunião de boas-vindas da segunda fase',q:'28/09/2026',st:'Concluída'}]},
    c9:{conjuge:'Renato Lopes',exp:[{t:'Visita de 30 dias após a entrega',q:'30/07/2026',st:'Concluída'},{t:'Pesquisa de satisfação',q:'15/08/2026',st:'Nota 9'}]},
    c10:{cnpj:'11.203.448/0001-70',razao:'MC Arquitetura Ltda'}};
  Object.entries(CX).forEach(([id,x])=>Object.assign(contato(id)||{},x));
  const NX={
    n1:{indicado:'c10',fech:{pid:'p1',tier:1,valor:46320.99,destino:'novo',faturar:'c1',q:'04/08/2026',parc:[['Entrada',13896.30,'2026-08-11'],['2ª parcela',16212.35,'2026-09-12'],['3ª parcela',16212.34,'2026-10-12']]}},
    n2:{fech:{pid:'p9',tier:0,valor:73471.08,destino:'novo',faturar:'c2',q:'28/08/2026',parc:[['Entrada',36735.54,'2026-09-01'],['Saldo',36735.54,'2026-10-01']]}},
    n9:{fech:{pid:'p5',tier:1,valor:387709.02,destino:'novo',faturar:'c6',q:'26/09/2026',parc:[['Entrada',96927.25,'2026-10-01'],['2ª parcela',96927.25,'2026-11-01'],['3ª parcela',96927.26,'2026-12-01'],['4ª parcela',96927.26,'2027-01-01']]}},
    n11:{perda:{motivo:'Escolheu outra empresa',texto:'Preferiu o integrador que já atendia o escritório anterior.',pid:'p10',tier:0,valor:21400,q:'25/09/2026'}},
    n3:{indicado:'c10',acoes:[{t:'Ligar para confirmar a apresentação da proposta',prazo:'2026-10-02',resp:ME,done:false}],
      ag:[{tipo:'Apresentação de proposta',data:'2026-10-03',ini:'10:00',fim:'11:00',local:'Showroom Maestro',resp:ME,brief:'Mostrar a opção Completa com cortinas.'}],
      obs:[{t:'Cliente gostou da opção Completa; quer ver cenário com cortinas.',quem:ME,q:'30/09/2026'}],anexos:['Planta baixa — térreo.pdf','Fotos da obra.zip']},
    n4:{acoes:[{t:'Agendar visita técnica no home theater',prazo:'2026-10-05',resp:'Felipe Nunes',done:false}],
      ag:[{tipo:'Visita técnica',data:'2026-10-05',ini:'09:00',fim:'10:30',local:'Obra do cliente',resp:'Bruno Lima',brief:'Medir a sala de cinema.'}]},
    n5:{indicado:'c11',acoes:[{t:'Enviar fotos do rack para a proposta',prazo:'2026-10-01',resp:ME,done:false}],
      nexos:[{t:'Conferir infra de rede antes da proposta',resp:'Bruno Lima',prazo:'2026-10-04',prio:'Alta',status:'Aberto'}]},
    n6:{acoes:[{t:'Retornar sobre a escolha das fitas de LED',prazo:'2026-10-06',resp:'Felipe Nunes',done:false}]},
    n7:{acoes:[{t:'Entender o horário de funcionamento para a instalação',prazo:'2026-10-08',resp:'Felipe Nunes',done:false}]},
    n8:{indicado:'c10',acoes:[{t:'Levantar planta do apartamento com a arquiteta',prazo:'2026-10-04',resp:ME,done:false}],
      ag:[{tipo:'Showroom',data:'2026-10-07',ini:'15:00',fim:'16:00',local:'Showroom Maestro',resp:ME,brief:'Mostrar som ambiente e cenas de luz.'}]},
    n10:{acoes:[{t:'Fazer o primeiro contato',prazo:'2026-10-02',resp:'Felipe Nunes',done:false}]}};
  D.negocios.forEach(n=>{Object.assign(n,NX[n.id]||{});['acoes','ag','obs','anexos','nexos'].forEach(k=>{if(!n[k])n[k]=[]});
    if(!n.feitas){n.feitas={};for(let e=0;e<6;e++)n.feitas[e]=(e<n.etapa||n.status!=='Aberto')?[true,true]:(e===n.etapa&&n.etapa>=3?[true,false]:[false,false])}});
  const PX={
    p1:{nid:'n1',opc:[['Essencial',39880.40],['Completa',46320.99]],esc:1,vers:2,enviada:'04/08/2026',abertas:7,validade:'03/09/2026',upd:40,quando:'04/08'},
    p2:{nid:'n3',opc:[['Essencial',98421.10],['Completa',113587.66],['Premium',141230.00]],esc:-1,vers:2,enviada:'28/09/2026',abertas:3,validade:'28/10/2026',upd:99,quando:'há 50 min'},
    p3:{nid:'n4',opc:[['Completa',249281.84]],esc:-1,vers:1,enviada:'',abertas:0,validade:'',upd:98,quando:'há 7 h'},
    p4:{nid:'n5',opc:[['Essencial',71902.40],['Completa',88411.31]],esc:-1,vers:1,enviada:'01/10/2026',abertas:1,validade:'31/10/2026',upd:97,quando:'ontem'},
    p5:{nid:'n9',opc:[['Essencial',301120.00],['Completa',387709.02],['Premium',452880.50]],esc:1,vers:3,enviada:'15/09/2026',abertas:12,validade:'15/10/2026',upd:94,quando:'há 3 dias'}};
  D.propostas.forEach(p=>Object.assign(p,PX[p.id]||{}));
  D.propostas.push(
    {id:'p6',numero:'#1050',titulo:'Iluminação',cliente:'Marta Albuquerque',valor:29200,status:'Enviada',nid:'n6',opc:[['Completa',29200]],esc:-1,vers:1,enviada:'30/09/2026',abertas:2,validade:'30/10/2026',upd:95,quando:'há 2 dias'},
    {id:'p7',numero:'#1036',titulo:'Som ambiente',cliente:'Sushi Yoru Bar',valor:35273.6,status:'Expirada',nid:'n7',opc:[['Completa',35273.6]],esc:-1,vers:1,enviada:'24/08/2026',abertas:1,validade:'23/09/2026',upd:70,quando:'há 9 dias'},
    {id:'p8',numero:'#1052',titulo:'Automação · apartamento',cliente:'Paula e Renato Lopes',valor:157368.44,status:'Enviada',nid:'n8',opc:[['Essencial',132004.00],['Completa',157368.44]],esc:-1,vers:1,enviada:'29/09/2026',abertas:0,validade:'29/10/2026',upd:93,quando:'há 3 dias'},
    {id:'p9',numero:'#1040',titulo:'Casa Valente — Rede e áudio',cliente:'Marcos Valente',valor:73471.08,status:'Aceita',nid:'n2',opc:[['Completa',73471.08],['Premium',86210.00]],esc:0,vers:1,enviada:'20/08/2026',abertas:5,validade:'19/09/2026',upd:50,quando:'20/08'},
    {id:'p10',numero:'#1041',titulo:'Escritório — Áudio',cliente:'Marina Costa Arquitetura',valor:21400,status:'Recusada',nid:'n11',opc:[['Completa',21400]],esc:-1,vers:1,enviada:'22/08/2026',abertas:2,validade:'21/09/2026',upd:55,quando:'há 1 mês',motivo:'Escolheu outra empresa'},
    {id:'p11',numero:'#1054',titulo:'Casa de campo — Wi-Fi',cliente:'Rodrigo Alencar',valor:18900,status:'Rascunho',nid:'n10',opc:[['Completa',18900]],esc:-1,vers:1,enviada:'',abertas:0,validade:'',upd:96,quando:'há 1 h'},
    {id:'p12',numero:'#1047',titulo:'Automação residencial — versão enxuta',cliente:'Sérgio Bastos',valor:96400,status:'Recusada',nid:'n3',opc:[['Essencial',96400]],esc:-1,vers:1,enviada:'10/09/2026',abertas:2,validade:'10/10/2026',upd:80,quando:'há 3 semanas',motivo:'Cliente pediu a opção completa'});
}

X.css('cc-css',`
  .cc-hero{text-align:center;padding:4px 4px 20px}
  .cc-hero .cc-av{width:88px;height:88px;border-radius:999px;margin:0 auto 12px;display:grid;place-items:center;font-size:32px;font-weight:700;color:#fff;background:linear-gradient(160deg,rgb(var(--primary)),color-mix(in srgb,rgb(var(--primary)) 55%,#000))}
  .cc-hero h1{margin:0;font-size:26px;line-height:1.15;font-weight:700;letter-spacing:-.02em;overflow-wrap:anywhere}
  .cc-hero p{margin:6px 0 0;color:var(--soft);font-size:15px;overflow-wrap:anywhere}
  .cc-hero .cx-chips{justify-content:center}
  .cc-steps{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px}
  .cc-steps i{display:block;height:6px;border-radius:99px;background:color-mix(in srgb,var(--text) 10%,transparent)}
  .cc-steps i.on{background:rgb(var(--primary))}
  .cc-stl{display:flex;justify-content:space-between;gap:8px;margin-top:10px;font-size:14px;color:var(--soft)}
  .cc-stl b{color:var(--text);font-weight:600}
  .cc-ta{display:block;width:100%;min-height:96px;border:0;border-radius:12px;padding:12px 14px;font-size:17px;line-height:1.4;background:color-mix(in srgb,var(--text) 6%,transparent);color:var(--text);resize:none;outline:none;font-family:inherit}
  .cc-wz .cc-steps{margin:4px 4px 0}
  .cc-wz .cc-stl{margin:10px 4px 20px}
  .cc-doc{border-radius:16px;padding:20px;background:var(--panel);box-shadow:0 0 0 .5px var(--line-2)}
  .cc-doc .k{font-size:12px;font-weight:600;color:var(--faint);text-transform:uppercase;letter-spacing:.04em}
  .cc-doc h3{margin:6px 0 0;font-family:var(--serif);font-weight:400;font-size:26px;line-height:1.15}
  .cc-doc .ln{display:flex;gap:12px;padding:12px 0;border-top:.5px solid var(--line);font-size:16px}
  .cc-doc .ln span{flex:1;min-width:0}
  .cc-tier[aria-pressed="true"] .t1{color:rgb(var(--primary))}
  .cc-s{display:none}
  @media (max-width:389px){#ccFt .cc-l{display:none}#ccFt .cc-s{display:inline}}
`);

/* ---------- ações compartilhadas: agendar, Nexo, ligar ---------- */
const sheetAgendar=(tipo,cliente,save)=>X.fsheet({title:tipo==='Showroom'?'Agendar Showroom':tipo==='Apresentação de proposta'?'Agendar proposta':'Novo agendamento',ok:'Agendar',top:top('Cliente: '+esc(cliente)),
  groups:[{title:'Agendamento',fields:[{k:'tipo',label:'Tipo',type:'select',req:true,opts:TIPOS_AG,value:tipo||'Visita técnica'},{k:'resp',label:'Responsável',type:'select',req:true,opts:D.equipe.map(u=>u.nome),value:ME},
      {k:'local',label:'Local',req:true,value:tipo==='Showroom'?'Showroom Maestro':'',ph:'Showroom, obra do cliente'}]},
    {title:'Quando',fields:[{k:'data',label:'Data',type:'date',req:true,value:addDays(D.hoje,3)},{k:'ini',label:'Início',type:'time',req:true,value:'10:00'},{k:'fim',label:'Término',type:'time',value:'11:00'}]},
    {title:'Briefing',fields:[{k:'brief',label:'Briefing',type:'textarea',req:true,ph:'O que precisa acontecer neste encontro'}]}],
  onOk:v=>{save({tipo:v.tipo,data:v.data,ini:v.ini,fim:v.fim,local:v.local,resp:v.resp,brief:v.brief});M.toast(`Agendado: ${v.tipo} em ${fd(v.data)} às ${v.ini}.`)}});
const sheetNexo=(cliente,save)=>X.fsheet({title:'Encaminhar Nexo',ok:'Encaminhar',top:top('Trabalho direcionado entre áreas e pessoas · '+esc(cliente)),
  groups:[{fields:[{k:'titulo',label:'Título',req:true,ph:'O que precisa ser feito'},{k:'desc',label:'Descrição',type:'textarea'}]},
    {fields:[{k:'resp',label:'Responsável',type:'select',req:true,ph:'Escolha',opts:D.equipe.map(u=>u.nome)},{k:'prazo',label:'Prazo',type:'date'},{k:'prio',label:'Prioridade',type:'select',opts:['Urgente','Alta','Média','Baixa'],value:'Média'}]}],
  onOk:v=>{save({t:v.titulo,resp:v.resp,prazo:v.prazo,prio:v.prio,status:'Aberto'});M.toast(`Nexo encaminhado para ${v.resp}.`)}});
const ligar=c=>{if(!c||!c.tel)return M.toast('Sem telefone cadastrado.');location.href=X.tel(c.tel)};
const whats=(c,txt)=>{if(!c||!c.tel)return M.toast('Sem telefone cadastrado.');window.open(X.wa(c.tel,txt),'_blank','noopener')};
const email=c=>{if(!c||!c.email)return M.toast('Sem e-mail cadastrado.');location.href='mailto:'+c.email};
const bigLinks=(c,extra)=>`<div class="cx-big">
  ${c&&c.tel?`<a href="${X.tel(c.tel)}">${ic('telefone',22)}<span>Ligar</span></a><a href="${X.wa(c.tel)}" target="_blank" rel="noopener">${ic('zap',22)}<span>WhatsApp</span></a>`
    :`<button type="button" data-act="semtel">${ic('telefone',22)}<span>Ligar</span></button><button type="button" data-act="semtel">${ic('zap',22)}<span>WhatsApp</span></button>`}
  ${c&&c.email?`<a href="mailto:${esc(c.email)}">${ic('email',22)}<span>E-mail</span></a>`:`<button type="button" data-act="semmail">${ic('email',22)}<span>E-mail</span></button>`}
  ${extra}</div>`;

/* =====================================================================
   CONTATOS
   ===================================================================== */
const PFK=['nasc','cpf','rg','orgao','genero','civil','empresa'], PJK=['cnpj','razao','fundacao','respEmp'];
const CEPS={'30':'Belo Horizonte','31':'Belo Horizonte','32':'Contagem','34':'Nova Lima','35':'Ipatinga'};
const papelTxt=c=>c.papeis.map(p=>p==='Parceiro'?'Parceiro'+(c.parceiro?' · '+c.parceiro:''):'Cliente').join(' e ');
const CS={q:'',papel:'todos'};
const FS={id:'',tab:'visao'};

function formContato(c,done){
  const ed=!!c, x=c||{tipo:'PF',papeis:['Cliente'],resp:ME,uf:'MG'};let pj=x.tipo==='PJ',s;
  s=X.fsheet({title:ed?'Editar contato':'Novo contato',ok:ed?'Salvar':'Cadastrar',
    top:`${ed?'':top('Cliente ou parceiro da operação.')}${K.seg('ccTipo',[['PF','Pessoa física'],['PJ','Pessoa jurídica']],pj?'PJ':'PF','Tipo')}`,
    groups:[{title:'Identificação',fields:[{k:'nome',label:pj?'Nome fantasia':'Nome',req:true,value:x.nome||'',ph:'Como é chamado'},
        {k:'nasc',label:'Aniversário',type:'date',value:x.nasc||''},{k:'cpf',label:'CPF',ph:'000.000.000-00',value:x.cpf||''},{k:'rg',label:'RG',value:x.rg||''},{k:'orgao',label:'Órgão emissor',ph:'SSP/MG',value:x.orgao||''},
        {k:'genero',label:'Gênero',type:'select',opts:['Não declarado','Feminino','Masculino','Outro'],value:x.genero||'Não declarado'},
        {k:'civil',label:'Estado civil',type:'select',ph:'—',opts:['Solteiro(a)','Casado(a)','União estável','Divorciado(a)','Viúvo(a)'],value:x.civil||''},{k:'empresa',label:'Empresa',value:x.empresa||''},
        {k:'cnpj',label:'CNPJ',ph:'00.000.000/0000-00',value:x.cnpj||''},{k:'razao',label:'Razão social',value:x.razao||''},{k:'fundacao',label:'Fundação',type:'date',value:x.fundacao||''},
        {k:'respEmp',label:'Contato na empresa',value:x.respEmp||''}]},
      {title:'Contato',fields:[{k:'tel',label:'Telefone',type:'tel',ph:'(31) 99999-0000',value:x.tel||''},{k:'email',label:'E-mail',type:'email',ph:'nome@email.com',value:x.email||''}]},
      {title:'Endereço',foot:'O CEP completa a cidade sozinho.',fields:[{k:'cep',label:'CEP',ph:'00000-000',value:x.cep||''},{k:'rua',label:'Logradouro',value:x.rua||''},{k:'numero',label:'Número',value:x.numero||''},
        {k:'compl',label:'Complemento',value:x.compl||''},{k:'bairro',label:'Bairro',value:x.bairro||''},{k:'cidade',label:'Cidade',value:x.cidade&&x.cidade!=='—'?x.cidade:''},{k:'uf',label:'UF',value:x.uf||''}]},
      {title:'Papel',checks:{k:'papeis',opts:['Cliente','Parceiro'],req:true,value:x.papeis||['Cliente']}},
      {title:'Relação com a empresa',fields:[{k:'parceiro',label:'Tipo de parceiro',type:'select',ph:'Escolha',opts:PARCEIROS,value:x.parceiro||''},{k:'resp',label:'Responsável',type:'select',req:true,opts:D.equipe.map(u=>u.nome),value:x.resp||ME}]},
      {title:'Notas',fields:[{k:'notas',label:'Notas',type:'textarea',value:x.notas||'',ph:'O que a equipe precisa saber'}]}],
    onOk:v=>{
      if(v.papeis.includes('Parceiro')&&!v.parceiro){const i=$('[name=parceiro]',s.el);i.closest('.fr').classList.add('err');i.focus();M.toast('Escolha o tipo de parceiro.');return false}
      const o={tipo:pj?'PJ':'PF',nome:v.nome,tel:v.tel,email:v.email,cep:v.cep,rua:v.rua,numero:v.numero,compl:v.compl,bairro:v.bairro,cidade:v.cidade||'—',uf:v.uf,
        papeis:v.papeis,papel:v.papeis.length>1?'Cliente e parceiro':v.papeis[0],parceiro:v.papeis.includes('Parceiro')?v.parceiro:'',notas:v.notas,resp:v.resp};
      (pj?PJK:PFK).forEach(k=>o[k]=v[k]);(pj?PFK:PJK).forEach(k=>o[k]='');
      if(ed){Object.assign(c,o);done&&done(c);M.toast('Contato salvo.');return}
      const criar=()=>{const n=Object.assign({id:uid('c'),fase:o.papeis.includes('Cliente')?'Lead':'—',tl:[{q:agora(),t:'Contato cadastrado',d:'por '+ME}],ag:[],obs:[],exp:[]},o);
        D.contatos.unshift(n);s.close();M.toast('Contato cadastrado.');location.hash='#/contatos?ficha='+n.id};
      const dup=D.contatos.find(y=>(o.email&&y.email&&y.email.toLowerCase()===o.email.toLowerCase())||y.nome.toLowerCase()===o.nome.toLowerCase());
      if(!dup){criar();return false}
      K.actions({title:`Já existe um contato parecido: ${dup.nome} · ${dup.email||dup.tel||'sem e-mail'}. Cadastrar de novo cria duas fichas para a mesma pessoa.`,
        items:[{label:'Usar contato existente',run:()=>{s.close();location.hash='#/contatos?ficha='+dup.id}},{label:'Cadastrar mesmo assim',run:criar}]});
      return false}});
  const el=s.el;
  const tipo=()=>{PFK.forEach(k=>X.show(el,k,!pj));PJK.forEach(k=>X.show(el,k,pj));$('[name=nome]',el).closest('.fr').querySelector('.fl').firstChild.nodeValue=pj?'Nome fantasia':'Nome'};
  const parc=()=>X.show(el,'parceiro',$$('[data-ck="papeis"][aria-pressed="true"]',el).some(b=>b.dataset.v==='Parceiro'));
  K.bindPick(el,'ccTipo',t=>{pj=t==='PJ';tipo()});
  $$('[data-ck="papeis"]',el).forEach(b=>b.addEventListener('click',parc));tipo();parc();
  const cep=$('[name=cep]',el);cep.setAttribute('inputmode','numeric');cep.addEventListener('input',()=>{const d=cep.value.replace(/\D/g,'').slice(0,8);cep.value=d.length>5?d.slice(0,5)+'-'+d.slice(5):d;
    if(d.length===8){const cid=CEPS[d.slice(0,2)];if(cid){$('[name=cidade]',el).value=cid;$('[name=uf]',el).value='MG';M.toast('Cidade preenchida pelo CEP.')}else M.toast('CEP não encontrado. Preencha o endereço.')}});
}
function excluirContato(c){
  const ativos=negsDe(c).filter(n=>n.status==='Aberto');
  if(ativos.length)return K.actions({title:`Não dá para excluir ${c.nome}: tem ${ativos.length} negócio${ativos.length>1?'s':''} ativo${ativos.length>1?'s':''}. Encerre ou transfira antes.`,
    items:[{label:'Ver negócios',run:()=>{NS.q=c.nome;NS.f='abertos';location.hash='#/negocios'}}]});
  X.fsheet({title:'Excluir contato',ok:'Excluir',dng:true,cheia:false,top:top(esc(c.nome)+' sai da lista. Fica registrado quem excluiu e por quê.'),
    groups:[{fields:[{k:'senha',label:'Senha (protótipo: não use a real)',ph:'qualquer texto',type:'password',req:true},{k:'motivo',label:'Justificativa',type:'textarea',req:true,ph:'Por que este contato está saindo?'}]}],
    onOk:()=>{const i=D.contatos.indexOf(c);D.contatos.splice(i,1);location.hash='#/contatos';M.toast(`${c.nome} excluído.`,'Desfazer',()=>{D.contatos.splice(i,0,c);X.refresh()})}});
}
const ctRows=L=>L.map(c=>({icon:X.ini(c.nome),color:c.papeis.includes('Cliente')?'rgb(var(--primary))':'#5b6476',title:esc(c.nome),
  sub:`${esc(papelTxt(c))}${c.cidade&&c.cidade!=='—'?' · '+esc(c.cidade):''}`,href:'#/contatos?ficha='+c.id,i:c.id,
  swipe:[{label:'Ligar',icon:'telefone',act:'ligar',tone:1},{label:'WhatsApp',icon:'zap',act:'whats',tone:4}]}));
const ctBody=()=>{const L=D.contatos.filter(c=>(CS.papel==='todos'||c.papeis.includes(CS.papel))&&(!CS.q||norm([c.nome,c.email,c.empresa,c.razao,c.tel].join(' ')).includes(norm(CS.q))))
    .sort((a,b)=>a.nome.localeCompare(b.nome,'pt'));
  if(!L.length)return K.empty({title:'Nenhum contato encontrado.',text:CS.q?'Busque por outro nome, e-mail ou empresa.':'Toque em + para cadastrar.'});
  const letras=[...new Set(L.map(c=>norm(c.nome)[0].toUpperCase()))];
  return letras.map((l,i)=>K.group({title:l,rows:ctRows(L.filter(c=>norm(c.nome)[0].toUpperCase()===l)),foot:i===letras.length-1?`${L.length} contato${L.length>1?'s':''} · deslize a linha para ligar ou chamar no WhatsApp.`:''})).join('')};

/* ---------- Ficha do cliente ---------- */
const vinculos=c=>{const it=[];
  if(c.conjuge)it.push(['Cônjuge',c.conjuge,null]);
  [...new Set(negsDe(c).map(n=>n.indicado).filter(Boolean))].map(contato).filter(Boolean).forEach(p=>it.push(['Indicou este cliente'+(p.parceiro?' · '+p.parceiro:''),p.nome,p.id]));
  if(c.papeis.includes('Parceiro'))[...new Set(D.negocios.filter(n=>n.indicado===c.id).map(n=>n.cid))].map(contato).filter(Boolean).forEach(x=>it.push(['Cliente indicado',x.nome,x.id]));
  return it};
const alertas=c=>{const a=[];
  negsDe(c).forEach(n=>{propsDe(n).forEach(p=>{if(p.status==='Vista'&&p.abertas>=2)a.push(['b',`Abriu a proposta ${p.numero} ${p.abertas} vezes`,'Ainda sem resposta. Bom momento para ligar.'])});
    n.acoes.filter(x=>!x.done&&x.prazo&&x.prazo<D.hoje).forEach(x=>a.push(['w','Ação atrasada: '+x.t,`${n.titulo} · venceu ${prazoTxt(x.prazo)}`]))});
  return a};
const evRows=L=>L.map(e=>({icon:fdc(e.data),color:e.data<D.hoje?'#8e8e93':'rgb(var(--primary))',t:`${esc(e.tipo)} · ${esc(e.ini||'')}`,s:`${esc(e.local)} · ${esc(e.resp)}${e.de?' · '+esc(e.de):''}`,
  v:`<span style="color:${e.data<D.hoje?TONE.g:TONE.b}">${e.data<D.hoje?'Concluído':'Agendado'}</span>`}));
const fVisao=c=>{const ns=negsDe(c),obs=obrasDe(c),acoes=ns.flatMap(n=>n.acoes.filter(a=>!a.done).map(a=>({...a,neg:n}))),al=alertas(c),pj=c.tipo==='PJ',vi=vinculos(c);
  return `${al.length?X.lines('Alertas',al.map(([t,a,b])=>({icon:'sino',color:t==='w'?TONE.w:TONE.b,t:esc(a),s:esc(b)}))):''}
   ${X.info('Contato',[['Tipo',pj?'Pessoa jurídica':'Pessoa física'],['E-mail',esc(c.email||'—')],['Telefone',esc(c.tel||'—')],['Cidade',esc((c.cidade||'—')+(c.uf?' · '+c.uf:''))],[pj?'CNPJ':'CPF',esc((pj?c.cnpj:c.cpf)||'—')],['Responsável',esc(c.resp||ME)]])}
   ${vi.length?`<section class="grp"><h2>Vínculos</h2><ul class="lst">${vi.map(([l,n,id])=>id?K.row({icon:X.ini(n),color:'#5b6476',title:esc(n),sub:esc(l),href:'#/contatos?ficha='+id})
      :`<li><div class="rw cx-kv ic40"><span class="mic" style="background:#5b6476" aria-hidden="true"><b style="font-size:13px;font-weight:700">${esc(X.ini(n))}</b></span><span class="tx"><span class="t1">${esc(n)}</span><span class="t2">${esc(l)}</span></span></div></li>`).join('')}</ul></section>`
     :X.text('Vínculos','<p class="soft">Nenhum vínculo registrado.</p>')}
   ${X.lines('Próximas ações',acoes.map(a=>({icon:'atividades',color:a.prazo&&a.prazo<D.hoje?TONE.w:TONE.b,t:esc(a.t),s:`${prazoTxt(a.prazo)} · ${esc(a.resp)} · ${esc(a.neg.titulo)}`})),'Nada pendente para este cliente.')}
   ${K.group({title:'Negócios deste cliente',rows:ns.map(n=>({icon:'negocios',color:TONE[NEG_TONE[n.status]],title:esc(n.titulo),sub:`${esc(etapaNome(n))} · ${esc(n.resp)}`,value:brl0(n.valor),href:'#/negocios?card='+n.id})),empty:'Nenhum negócio ainda. Use Mais › Novo negócio.'})}
   ${K.group({title:'Projetos',rows:obs.map(o=>({icon:'projetos',color:TONE.g,title:esc(o.nome),sub:`${esc(o.etapa)} · ${esc(o.status)}`,value:o.pct+'%',href:'#/obra?id='+o.id})),empty:'Nenhum projeto aberto.'})}
   ${X.lines('Experiência',c.exp.map(x=>({icon:'coracao',color:'#7858f8',t:esc(x.t),s:esc(x.q),v:esc(x.st)})),'Nada registrado em Experiência ainda.')}`};
const fAgenda=c=>{const ev=[...c.ag.map(e=>({...e,de:''})),...negsDe(c).flatMap(n=>n.ag.map(e=>({...e,de:n.titulo})))].sort((a,b)=>(a.data+a.ini).localeCompare(b.data+b.ini));
  return ev.length?X.lines('Agendamentos',evRows(ev)):K.empty({title:'Nada agendado para este cliente.',text:'Use “Agendar” para marcar visita, showroom ou apresentação.'})};
const fTimeline=c=>{const der=[];
  negsDe(c).forEach(n=>{propsDe(n).forEach(p=>{if(p.enviada)der.push({q:p.enviada,t:`Proposta ${p.numero} enviada`,d:`${p.titulo} · ${brl(p.valor)}`})});
    if(n.status==='Ganho'&&n.fech)der.push({q:n.fech.q,t:'Negócio ganho',d:`${n.titulo} · ${brl(n.fech.valor)}`});
    if(n.status==='Perdido'&&n.perda)der.push({q:n.perda.q,t:'Negócio perdido',d:`${n.titulo} · ${n.perda.motivo}`})});
  obrasDe(c).forEach(o=>der.push({q:o.inicio,t:'Projeto aberto',d:o.nome}));
  const all=[...c.tl,...der].map((x,i)=>({...x,i})).sort((a,b)=>dkey(b.q)-dkey(a.q)||a.i-b.i);
  return all.length?X.lines('Timeline',all.map(x=>({t:esc(x.t),s:`${esc(x.q)}${x.d?' · '+esc(x.d):''}`}))):K.empty({title:'Nada na timeline ainda.'})};
const fObs=c=>{const all=[...c.obs.map(o=>({...o,de:''})),...negsDe(c).flatMap(n=>n.obs.map(o=>({...o,de:n.titulo})))];
  return `<section class="grp"><h2>Nova observação</h2><div class="mcard"><textarea class="cc-ta" id="ccObs" aria-label="Nova observação" placeholder="O que a equipe precisa saber sobre este cliente"></textarea>
    <div class="mt16">${K.btn('Salvar observação',{act:'salvarobs'})}</div></div></section>
   ${X.lines('Observações',all.map(o=>({t:esc(o.t),s:`${esc(o.quem)} · ${esc(o.q)}${o.de?' · '+esc(o.de):''}`})),'Nenhuma observação ainda.')}`};
const FT={visao:fVisao,agenda:fAgenda,timeline:fTimeline,obs:fObs};

function fichaHTML(c){
  if(FS.id!==c.id){FS.id=c.id;FS.tab='visao'}
  return `${nav({title:c.nome,back:'Contatos',large:false,acts:[{icon:'pontos',title:'Mais ações do contato',act:'mais'}]})}
   <header class="cc-hero"><div class="cc-av" aria-hidden="true">${esc(X.ini(c.nome))}</div><div class="k" style="font-size:13px;font-weight:600;color:var(--faint);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">Ficha do cliente</div>
     <h1>${esc(c.nome)}</h1><p>${[c.email,c.tel,c.cidade!=='—'?c.cidade:''].filter(Boolean).map(esc).join(' · ')}</p>
     <div class="cx-chips">${c.fase&&c.fase!=='—'?X.chip(c.fase,FASE_TONE[c.fase]||'n'):''}${X.chip(papelTxt(c),c.papeis.includes('Cliente')?'b':'n')}</div></header>
   ${bigLinks(c,`<button type="button" data-act="agendar">${ic('agenda',22)}<span>Agendar</span></button>`)}
   ${K.seg('ccFt',[['visao','Visão'],['agenda','Agenda'],['timeline','Timeline'],['obs','Observações']],FS.tab,'Seções da ficha').replace('>Observações<','><span class="cc-l">Observações</span><span class="cc-s">Notas</span><')}
   <div id="ccFc">${FT[FS.tab](c)}</div>`;
}
function fichaMount(v,c){
  const fc=$('#ccFc',v);
  const H={
    semtel:()=>M.toast('Sem telefone cadastrado.'),semmail:()=>M.toast('Sem e-mail cadastrado.'),
    agendar:()=>sheetAgendar('',c.nome,e=>{c.ag.push(e);tl(c.id,'Agendamento',`${e.tipo} em ${fd(e.data)} às ${e.ini}`);FS.tab='agenda';X.refresh()}),
    salvarobs:()=>{const t=$('#ccObs',v),val=t.value.trim();if(!val){t.focus();return M.toast('Escreva a observação antes de salvar.')}c.obs.unshift({t:val,quem:ME,q:agora()});X.refresh();M.toast('Observação salva.')},
    mais:()=>K.actions({title:c.nome,items:[
      {label:'Encaminhar Nexo',run:()=>sheetNexo(c.nome,n=>{tl(c.id,'Nexo encaminhado',`${n.t} · para ${n.resp}`);X.refresh()})},
      {label:'Registrar…',run:()=>K.actions({title:'Registrar na timeline',items:REG.map(([l,dsc])=>({label:l,run:()=>{
        const extra=l==='Registro Técnico'?{k:'x',label:'Pendências',type:'textarea'}:l==='Passagem de bastão'?{k:'x',label:'Para quem passa',type:'select',req:true,opts:D.equipe.map(u=>u.nome),value:'Diego Rocha'}
          :l==='Registro de Projetos'?{k:'x',label:'Decisões',type:'textarea'}:{k:'x',label:'Percepção do cliente',type:'select',opts:['Muito satisfeito','Satisfeito','Neutro','Insatisfeito'],value:'Satisfeito'};
        X.fsheet({title:l,ok:'Salvar',top:top(esc(dsc)+' · '+esc(c.nome)),groups:[{fields:[{k:'data',label:'Data',type:'date',req:true,value:D.hoje},{k:'resumo',label:'Resumo',type:'textarea',req:true},extra]}],
          onOk:r=>{tl(c.id,l,r.resumo+(r.x?' · '+r.x:''));FS.tab='timeline';X.refresh();M.toast('Registro salvo na timeline.')}})}}))})},
      {label:'Chat sobre este cliente',run:()=>M.mchatCliente?M.mchatCliente(c.nome):(location.hash='#/chat')},
      {label:'Editar contato',run:()=>formContato(c,()=>X.refresh())},
      {label:'Novo negócio',run:()=>formNegocio(null,{cid:c.id})},
      {label:'Excluir contato',dng:true,run:()=>excluirContato(c)}]})};
  M.wire(v,H);
  K.bindPick(v,'ccFt',t=>{FS.tab=t;fc.innerHTML=FT[t](c);M.wire(fc,H)});
}

M.mscreen('contatos',{title:'Contatos',tab:'contatos',
  help:['Clientes e parceiros da operação, em ordem alfabética.','Deslize a linha para a esquerda para ligar ou chamar no WhatsApp.','Toque no nome para abrir a Ficha do cliente: negócios, obras, agenda e timeline.'],
  render:q=>{const c=q.get('ficha')&&contato(q.get('ficha'));if(c)return fichaHTML(c);
    return `${nav({title:'Contatos',sub:'Clientes e parceiros da operação.',acts:[{icon:'mais',title:'Novo contato',act:'novo'}]})}
     ${K.search('Buscar por nome, e-mail, empresa…','ccQ')}
     ${K.chips('ccPapel',[['todos','Todos'],['Cliente','Clientes'],['Parceiro','Parceiros']],CS.papel)}
     <div id="ccCb">${ctBody()}</div>`},
  mount:(v,q)=>{const c=q.get('ficha')&&contato(q.get('ficha'));if(c)return fichaMount(v,c);
    const b=$('#ccCb',v);
    const H={ligar:el=>ligar(contato(el.dataset.i)),whats:el=>whats(contato(el.dataset.i))};
    const draw=()=>{b.innerHTML=ctBody();M.wire(b,H);K.bindSwipe(b)};
    M.wire(b,H);M.wire(v,{novo:()=>formContato(null)});
    K.bindPick(v,'ccPapel',x=>{CS.papel=x;draw()});
    const qi=$('#ccQ',v);qi.value=CS.q;qi.oninput=()=>{CS.q=qi.value.trim();draw()}}});

/* =====================================================================
   NEGÓCIOS
   ===================================================================== */
const NS={f:'abertos',q:''};
const regras=d=>{const t=TAREFAS[d.etapa],f=d.feitas[d.etapa]||[],n=t.filter((_,i)=>f[i]).length,ps=propsDe(d);
  const r=[[`Tarefas desta etapa concluídas (${n}/${t.length})`,n===t.length],['Valor estimado preenchido',d.valor>0]];
  if(d.etapa>=3)r.push(['Proposta enviada ao cliente',ps.some(p=>['Enviada','Vista','Aceita'].includes(p.status))]);
  if(d.etapa>=4)r.push(['Próxima ação marcada',d.acoes.some(a=>!a.done)]);
  return r};

function formNegocio(d,pre={}){
  const ed=!!d, x=d||Object.assign({etapa:0,resp:ME,prob:20,escopo:'Individual'},pre);
  const clientes=D.contatos.filter(c=>c.papeis.includes('Cliente')), parc=D.contatos.filter(c=>c.papeis.includes('Parceiro'));
  const s=X.fsheet({title:ed?'Editar negócio':'Novo negócio',ok:ed?'Salvar':'Criar',top:ed?'':top('Entra no pipeline comercial.'),
    groups:[{title:'Negócio',fields:[{k:'cid',label:'Cliente',type:'select',req:true,ph:'Escolha',opts:clientes.map(c=>[c.id,c.nome]),value:x.cid||''},
        {k:'titulo',label:'Título',ph:'Ex.: Automação residencial',value:x.titulo||''},{k:'pipeline',label:'Pipeline',type:'select',req:true,opts:['Comercial'],value:'Comercial'},
        {k:'etapa',label:ed?'Etapa':'Etapa inicial',type:'select',req:true,opts:ETAPAS.map((e,i)=>[String(i),e]),value:String(x.etapa)},{k:'origem',label:'Origem',type:'select',ph:'—',opts:ORIGENS,value:x.origem||''}]},
      {title:'Valor',fields:[{k:'valor',label:'Valor',type:'money',value:x.valor?brl(x.valor):'',ph:'R$ 0,00'},{k:'prob',label:'Probabilidade (%)',type:'number',value:String(x.prob??'')},
        {k:'fech',label:'Fechamento previsto',type:'date',value:x.fech&&!x.fech.pid?x.fech:''}]},
      {title:'Pessoas',fields:[{k:'indicado',label:'Indicado por',type:'select',ph:'Ninguém',opts:parc.map(c=>[c.id,c.nome]),value:x.indicado||''},
        {k:'faturar',label:'Faturar para',type:'select',ph:'O próprio cliente',opts:D.contatos.map(c=>[c.id,c.nome]),value:x.faturar||''},
        {k:'escopo',label:'Escopo',type:'select',opts:['Individual','Casal'],value:x.escopo||'Individual'},{k:'conjuge',label:'Cônjuge',value:x.conjuge||'',ph:'Nome do cônjuge'},
        {k:'resp',label:'Responsável',type:'select',req:true,opts:D.equipe.map(u=>u.nome),value:x.resp||ME}]}],
    onOk:v=>{const c=contato(v.cid);
      const o={titulo:v.titulo||('Negócio · '+c.nome),cliente:c.nome,cid:c.id,etapa:+v.etapa,origem:v.origem,valor:money(v.valor),prob:Math.max(0,Math.min(100,+v.prob||0)),
        indicado:v.indicado,faturar:v.faturar,escopo:v.escopo,conjuge:v.escopo==='Casal'?v.conjuge:'',resp:v.resp};
      if(!(x.fech&&x.fech.pid))o.fech=v.fech;
      if(ed){Object.assign(d,o);X.refresh();M.toast('Negócio salvo.');return}
      const n=Object.assign({id:uid('n'),status:'Aberto',feitas:{0:[false,false],1:[false,false],2:[false,false],3:[false,false],4:[false,false],5:[false,false]},acoes:[],ag:[],obs:[],anexos:[],nexos:[]},o);
      for(let e=0;e<n.etapa;e++)n.feitas[e]=[true,true];
      D.negocios.push(n);if(c.fase==='Lead')c.fase='Comercial';tl(c.id,'Negócio criado',`${n.titulo} · ${ETAPAS[n.etapa]}`);
      M.toast('Negócio criado.');location.hash='#/negocios?card='+n.id}});
  const cj=()=>X.show(s.el,'conjuge',$('[name=escopo]',s.el).value==='Casal');$('[name=escopo]',s.el).onchange=cj;cj();
}
function avancar(d){
  if(d.etapa>=5)return fechamento(d);
  const pend=regras(d).filter(r=>!r[1]),
    go=()=>{const old=d.etapa;d.etapa++;tl(d.cid,'Negócio avançou',`${d.titulo} → ${ETAPAS[d.etapa]}`);X.refresh();M.toast(`Avançou para “${ETAPAS[d.etapa]}”.`,'Desfazer',()=>{d.etapa=old;X.refresh()})};
  if(!pend.length)return go();
  X.fsheet({title:'Avançar mesmo assim?',ok:'Avançar',cheia:false,
    top:X.lines(`Pendente para “${ETAPAS[d.etapa+1]}”`,pend.map(r=>({icon:'!',color:TONE.w,t:esc(r[0])}))),
    groups:[{fields:[{k:'just',label:'Justificativa',type:'textarea',req:true,ph:'Por que avançar mesmo assim?'}]}],
    onOk:v=>{d.obs.unshift({t:v.just,quem:ME,q:agora(),just:true});go()}});
}
function reverter(d,etapa=5){
  X.motivo({title:'Reverter decisão',ok:'Reverter',top:top(`${esc(d.titulo)} volta para o pipeline, na etapa “${ETAPAS[etapa]}”.`),run:m=>{
    const was=d.status;d.status='Aberto';d.etapa=etapa;d.prob=50;
    if(was==='Perdido'&&d.perda){const p=prop(d.perda.pid);if(p&&p.status==='Recusada'&&p.antes){p.status=p.antes;p.motivo=''}}
    d.obs.unshift({t:'Decisão revertida: '+m,quem:ME,q:agora()});tl(d.cid,'Decisão revertida',d.titulo);X.refresh();M.toast('Negócio de volta ao pipeline.')}});
}
function excluirNeg(d){
  X.motivo({title:'Excluir negócio',ok:'Excluir',dng:true,top:top(`${esc(d.titulo)} · ${esc(d.cliente)}`),run:()=>{
    const i=D.negocios.indexOf(d);D.negocios.splice(i,1);location.hash='#/negocios';M.toast('Negócio excluído.','Desfazer',()=>{D.negocios.splice(i,0,d);X.refresh()})}});
}
function perda(d){
  const ps=propsDe(d), cur=ps.find(p=>!['Recusada','Expirada'].includes(p.status))||ps[0];
  const tiers=p=>p?p.opc.map((o,k)=>[String(k),`${o[0]} — ${brl(o[1])}`]):[];
  const tdef=p=>String(p.esc>=0?p.esc:p.opc.length-1);
  const f1=[{k:'motivo',label:'Motivo da perda',type:'select',req:true,ph:'Escolha',opts:[...MOTIVOS,'Outro']}];
  if(cur)f1.push({k:'pid',label:'Proposta perdida',type:'select',req:true,opts:ps.map(p=>[p.id,`${p.numero} · ${p.titulo}`]),value:cur.id},{k:'tier',label:'Nível perdido',type:'select',opts:tiers(cur),value:tdef(cur)});
  const s=X.fsheet({title:'Registrar perda',ok:'Marcar perdido',dng:true,top:top(`${esc(d.titulo)} · ${esc(d.cliente)}`),
    groups:[{fields:f1,foot:cur?' ':''},{title:'O que aconteceu',foot:'Obrigatório quando o motivo é “Outro” (mín. 10 caracteres).',fields:[{k:'texto',label:'Conte o que aconteceu',type:'textarea'}]}],
    onOk:v=>{
      if(v.motivo==='Outro'&&v.texto.length<10){const t=$('[name=texto]',s.el);t.closest('.fr').classList.add('err');t.focus();M.toast('Conte o que aconteceu (mínimo de 10 caracteres).');return false}
      const snap={status:d.status,prob:d.prob,perda:d.perda},p=v.pid?prop(v.pid):null,ps0=p&&{status:p.status,motivo:p.motivo};
      d.status='Perdido';d.prob=0;d.perda={motivo:v.motivo,texto:v.texto,pid:v.pid||'',tier:+v.tier||0,valor:p?p.opc[+v.tier||0][1]:d.valor,q:fd(D.hoje)};
      if(p&&p.status!=='Aceita'){p.antes=p.status;p.status='Recusada';p.motivo=v.motivo}
      tl(d.cid,'Negócio perdido',`${d.titulo} · ${v.motivo}`);X.refresh();
      M.toast('Negócio marcado como perdido.','Desfazer',()=>{Object.assign(d,snap);if(p)Object.assign(p,ps0);X.refresh()})}});
  if(cur){const el=s.el,sp=$('[name=pid]',el),st=$('[name=tier]',el),ft=$$('.grp .foot',el)[0];
    const upd=()=>{const p=prop(sp.value);ft.textContent='Valor que será congelado: '+brl(p.opc[+st.value||0][1])};
    sp.onchange=()=>{const p=prop(sp.value);st.innerHTML=tiers(p).map(([a,b])=>`<option value="${a}">${esc(b)}</option>`).join('');st.value=tdef(p);upd()};st.onchange=upd;upd()}
}

/* ---------- fechamento em passos (ganho), numa folha cheia com Voltar / Continuar ---------- */
const PASSOS=['Proposta e valor','Conferência de dados','Escopo e pré-projeto','Condição de pagamento','Destino do projeto','Confirmação'];
const DESTINOS=[['novo','Abrir novo projeto','Cria Projeto + Técnica + Sucesso do Cliente.'],['integrar','Integrar a projeto em andamento','Vincula sem duplicar cards; o escopo entra como bloco adicional.'],['nao','Não abrir projeto agora','Fecha o ganho sem abrir Projeto, Técnica ou Sucesso do Cliente.']];
function fechamento(d){
  const ps=propsDe(d).filter(p=>p.status!=='Recusada'&&p.status!=='Expirada'), c=contato(d.cid)||{};
  const ini=ps.find(p=>p.status==='Aceita')||ps.find(p=>p.status==='Vista')||ps.find(p=>p.status==='Enviada')||ps[0];
  const tdef=p=>p.esc>=0?p.esc:Math.min(1,p.opc.length-1);
  const arqs=D.contatos.filter(x=>x.parceiro==='Arquiteto(a)'), engs=D.contatos.filter(x=>x.parceiro==='Engenheiro(a)');
  const ind=d.indicado&&contato(d.indicado);
  const W={step:0,pid:ini?ini.id:'',tier:ini?tdef(ini):null,rua:c.rua||'',cidade:c.cidade&&c.cidade!=='—'?c.cidade:'',uf:c.uf||'MG',
    arq:ind&&ind.parceiro==='Arquiteto(a)'?ind.id:'',eng:ind&&ind.parceiro==='Engenheiro(a)'?ind.id:'',escopo:'',
    tarefas:[['Levantamento de medidas na obra',7],['Reunião de passagem com Projetos',3]],parc:null,base:0,destino:'novo',obraInt:'',faturar:d.faturar||d.cid};
  const P=()=>prop(W.pid), V=()=>{const p=P();return p&&W.tier!=null?p.opc[W.tier][1]:0};
  const obrasCli=D.obras.filter(o=>o.cliente===d.cliente&&o.status!=='Concluída');
  const s=K.sheet({title:'Fechar como ganho',ok:'Continuar',cancel:'Cancelar',cheia:true,body:'<div class="cc-wz" id="ccWz"></div>'});
  const wz=$('#ccWz',s.el), okB=$('[data-ok]',s.el), backB=$('[data-c]',s.el);
  const soma=()=>W.parc.reduce((a,x)=>a+x[1],0);
  const somaTxt=()=>{const df=soma()-V();return `Soma das parcelas: ${brl(soma())} · ${Math.abs(df)<0.01?'confere':'diferença de '+brl(Math.abs(df))}`};
  const g=n=>{const i=$(`[name="${n}"]`,wz);return i?i.value.trim():''};
  const read=()=>{
    if(W.step===0&&ps.length){W.pid=g('w_pid')||W.pid;const t=$('.cc-tier[aria-pressed="true"]',wz);if(t)W.tier=+t.dataset.k}
    if(W.step===1){W.rua=g('w_rua');W.cidade=g('w_cidade');W.uf=g('w_uf');W.arq=g('w_arq');W.eng=g('w_eng')}
    if(W.step===2)W.escopo=g('w_escopo');
    if(W.step===3)W.parc=W.parc.map((_,i)=>[g('p_d_'+i),money(g('p_v_'+i)),g('p_t_'+i)]);
    if(W.step===4){const t=$('.cc-dest[aria-pressed="true"]',wz);if(t)W.destino=t.dataset.k;W.obraInt=g('w_obra')}
    if(W.step===5)W.faturar=g('w_fat')};
  const check=()=>{switch(W.step){
    case 0:if(!ps.length)return 'Este negócio não tem proposta.';if(!W.pid)return 'Escolha a proposta vencedora.';if(W.tier==null)return 'Escolha o nível fechado.';return '';
    case 1:if(!W.rua||!W.cidade||!W.uf)return 'Endereço da obra: rua, cidade e UF são obrigatórios.';if(!W.arq)return 'Arquiteto: escolha um contato ou “Não tem”.';if(!W.eng)return 'Engenheiro: escolha um contato ou “Não tem”.';return '';
    case 2:return W.escopo?'':'Descreva o escopo da obra.';
    case 3:if(!W.parc.length)return 'Adicione pelo menos uma parcela para continuar.';if(W.parc.some(x=>!x[2]))return 'Toda parcela precisa de data prevista. Sem data não existe fluxo de caixa projetado.';
      if(W.parc.some(x=>!(x[1]>0)))return 'Toda parcela precisa de valor.';if(Math.abs(soma()-V())>0.01)return 'A soma das parcelas não bate com o valor fechado. Corrija a lista.';return '';
    case 4:return W.destino==='integrar'&&!W.obraInt?'Escolha o projeto que vai receber este negócio.':'';
    case 5:return W.faturar?'':'Escolha em nome de quem o negócio será faturado.'}};
  const opt=(cls,k,on,t1,t2,v)=>`<li><button type="button" class="rw cx-ck ${cls}" data-k="${k}" aria-pressed="${on}"><span class="tx"><span class="t1">${t1}</span>${t2?`<span class="t2 cx-wrap">${t2}</span>`:''}</span>${v?`<span class="vl"><b>${v}</b></span>`:''}<span class="cx-cm">${ic('check',22)}</span></button></li>`;
  const passo=()=>{const p=P();switch(W.step){
    case 0:return ps.length?`${K.form([{title:'Proposta vencedora',fields:[{k:'w_pid',label:'Proposta',type:'select',req:true,opts:ps.map(x=>[x.id,`${x.numero} · ${x.titulo} (${x.status})`]),value:W.pid}]}])}
      <section class="grp"><h2>Nível fechado <b class="req">*</b></h2><ul class="lst">${p.opc.map((o,k)=>opt('cc-tier',k,W.tier===k,`Opção ${k+1} · ${esc(o[0])}`,'',brl(o[1]))).join('')}</ul></section>
      ${X.info('',[['Valor fechado',`<b class="num">${W.tier!=null?brl(V()):'—'}</b>`]])}`
      :K.empty({title:'Este negócio não tem proposta.',text:'Monte a proposta no construtor antes de fechar.'})+`<div class="cx-acts"><span class="full">${K.btn('Abrir construtor',{act:'wcons'})}</span></div>`;
    case 1:{const doc=c.tipo==='PJ'?c.cnpj:c.cpf;
      return `${X.lines('Conferência',[{icon:'check',color:TONE.g,t:'Cliente vinculado',s:esc(c.nome||d.cliente)},doc?{icon:'check',color:TONE.g,t:(c.tipo==='PJ'?'CNPJ':'CPF'),s:esc(doc)}:{icon:'!',color:TONE.w,t:`Sem ${c.tipo==='PJ'?'CNPJ':'CPF'}`,s:'Dá para completar depois na ficha'}])}
        ${K.form([{title:'Endereço da obra',fields:[{k:'w_rua',label:'Rua e número',req:true,value:W.rua},{k:'w_cidade',label:'Cidade',req:true,value:W.cidade},{k:'w_uf',label:'UF',req:true,value:W.uf}]},
          {title:'Parceiros da obra',fields:[{k:'w_arq',label:'Arquiteto',type:'select',req:true,ph:'Escolha',opts:[['nao','Não tem'],...arqs.map(x=>[x.id,x.nome])],value:W.arq},{k:'w_eng',label:'Engenheiro',type:'select',req:true,ph:'Escolha',opts:[['nao','Não tem'],...engs.map(x=>[x.id,x.nome])],value:W.eng}]}])}`}
    case 2:if(!W.escopo)W.escopo=`${p.titulo} — opção ${p.opc[W.tier][0]}, conforme os ambientes da proposta ${p.numero}.`;
      return `${K.form([{fields:[{k:'w_escopo',label:'Escopo da obra',type:'textarea',req:true,value:W.escopo}]}])}
        ${K.group({title:'Tarefas do pré-projeto',rows:W.tarefas.map((t,i)=>({icon:'atividades',color:TONE.b,title:esc(t[0]),sub:`${t[1]} dias depois do ganho`,value:'Remover',act:'wdelt',i,chev:false})),empty:'Nenhuma tarefa.'})}
        ${K.form([{title:'Acrescentar tarefa',fields:[{k:'w_tt',label:'Tarefa',ph:'O que fazer'},{k:'w_tp',label:'Dias depois',type:'number',value:'7'}]}])}
        <div class="cx-acts"><span class="full">${K.btn('Acrescentar tarefa',{act:'waddt',icon:'mais'})}</span></div>`;
    case 3:if(!W.parc||W.base!==V()){const v=V(),a=Math.round(v*30)/100,b=Math.round(v*35)/100;W.base=v;W.parc=[['Entrada',a,addDays(D.hoje,7)],['2ª parcela',b,addDays(D.hoje,37)],['3ª parcela',Math.round((v-a-b)*100)/100,addDays(D.hoje,67)]]}
      return `${X.info('',[['Valor fechado',`<b class="num">${brl(V())}</b>`]])}
        ${W.parc.map((x,i)=>K.form([{title:`Parcela ${i+1}`,fields:[{k:'p_d_'+i,label:'Descrição',value:x[0]},{k:'p_v_'+i,label:'Valor',type:'money',value:brl(x[1])},{k:'p_t_'+i,label:'Data prevista',type:'date',value:x[2]}]}])
          +`<div class="cx-acts" style="margin-top:-12px"><span class="full">${K.btn('Remover parcela '+(i+1),{act:'wdelp',dng:true}).replace('data-act','data-k="'+i+'" data-act')}</span></div>`).join('')}
        <div class="cx-acts"><span class="full">${K.btn('Adicionar parcela',{act:'waddp',icon:'mais'})}</span></div>
        <p class="soft cx-p" id="ccWsum" style="margin:0 4px 16px" aria-live="polite">${somaTxt()}</p>`;
    case 4:return `<section class="grp"><h2>O que acontece depois do ganho?</h2><ul class="lst">${DESTINOS.map(([k,l,s])=>opt('cc-dest',k,W.destino===k,esc(l),esc(s))).join('')}</ul></section>
      ${W.destino==='integrar'?(obrasCli.length?K.form([{fields:[{k:'w_obra',label:'Projeto',type:'select',req:true,ph:'Escolha',opts:obrasCli.map(o=>[o.id,`${o.nome} · ${o.etapa}`]),value:W.obraInt}]}])
        :`<div class="mcard soft cx-p">Este contato não tem projeto que possa receber este negócio.</div>`):''}`;
    case 5:{const dest=DESTINOS.find(x=>x[0]===W.destino);
      return `${X.info('Resumo',[['Negócio',esc(d.titulo)],['Proposta vencedora',`${p.numero} · Opção ${W.tier+1} · ${esc(p.opc[W.tier][0])}`],['Valor fechado',`<b class="num">${brl(V())}</b>`],['Condição de pagamento',`${W.parc.length} parcela${W.parc.length>1?'s':''}`],['Destino',dest[1]]])}
        ${K.form([{fields:[{k:'w_fat',label:'Faturar para',type:'select',req:true,opts:D.contatos.map(x=>[x.id,x.nome]),value:W.faturar}]}])}
        ${X.lines('O que vai acontecer ao confirmar',[`O negócio vai para Ganho e a proposta ${p.numero} fica congelada como Aceita.`,W.destino==='novo'?'Abre o projeto com Projetos, Técnica e Sucesso do Cliente.':W.destino==='integrar'?'O escopo entra no projeto escolhido.':'Nenhum projeto é aberto agora.',`Financeiro recebe ${W.parc.length} parcela${W.parc.length>1?'s':''} a receber, somando ${brl(soma())}.`].map(t=>({icon:'check',color:TONE.g,t:esc(t)})))}`}}};
  const finish=()=>{const p=P(),val=V();
    d.status='Ganho';d.etapa=5;d.prob=100;d.valor=val;p.status='Aceita';p.esc=W.tier;p.valor=val;p.upd=maxUpd();p.quando='agora';
    let obra=null;
    if(W.destino==='novo'){obra=uid('o');D.obras.push({id:obra,nome:`${d.titulo.split(' — ')[0]} · ${d.cliente.split(' ')[0]}`,cliente:d.cliente,cidade:W.cidade,bairro:'',status:'Planejamento',etapa:'Pré-projeto',pct:0,valor:val,relatorios:0,fotos:0,gestor:'Diego Rocha',inicio:fd(D.hoje),previsao:'—'});
      if(contato(d.cid))contato(d.cid).fase='Projetos'}
    else if(W.destino==='integrar')obra=W.obraInt;
    if(obra)d.obra=obra;
    d.fech={pid:p.id,tier:W.tier,valor:val,parc:W.parc,destino:W.destino,faturar:W.faturar,q:fd(D.hoje),escopo:W.escopo,end:`${W.rua}, ${W.cidade} · ${W.uf}`};
    tl(d.cid,'Negócio ganho',`${d.titulo} · ${brl(val)}`);X.refresh();
    M.toast(W.destino==='nao'?'Negócio fechado como ganho.':'Negócio fechado como ganho. Projeto aberto.')};
  const H={wcons:()=>{s.close();location.hash='#/construtor'},
    wdelt:el=>{read();W.tarefas.splice(+el.dataset.i,1);draw()},
    waddt:()=>{read();const t=$('[name=w_tt]',wz),v=t.value.trim();if(!v){t.focus();return M.toast('Escreva a tarefa.')}W.tarefas.push([v,Math.max(0,+g('w_tp')||0)]);draw()},
    wdelp:el=>{read();W.parc.splice(+el.dataset.k,1);draw()},
    waddp:()=>{read();W.parc.push([`${W.parc.length+1}ª parcela`,Math.max(0,Math.round((V()-soma())*100)/100),addDays(D.hoje,30*(W.parc.length+1))]);draw()}};
  const draw=()=>{
    wz.innerHTML=`<div class="cc-steps" aria-hidden="true">${PASSOS.map((_,i)=>`<i class="${i<=W.step?'on':''}"></i>`).join('')}</div>
      <div class="cc-stl" aria-live="polite"><b>${PASSOS[W.step]}</b><span class="num">Passo ${W.step+1} de ${PASSOS.length}</span></div>
      <p class="cx-err-t" role="alert" id="ccWerr"></p>${passo()}`;
    okB.textContent=W.step===PASSOS.length-1?'Fechar':'Continuar';backB.textContent=W.step?'Voltar':'Cancelar';
    okB.disabled=W.step===0&&!ps.length;
    M.wire(wz,H);X.ltr(wz);
    $$('.cc-tier,.cc-dest',wz).forEach(b=>b.onclick=()=>{$$('.'+b.classList[2],wz).forEach(x=>x.setAttribute('aria-pressed',x===b));read();if(W.step===4||W.step===0)draw()});
    const sp=$('[name=w_pid]',wz);if(sp)sp.onchange=()=>{W.pid=sp.value;W.tier=tdef(P());draw()};
    if(W.step===3)$$('input',wz).forEach(i=>i.addEventListener('input',()=>{read();$('#ccWsum',wz).textContent=somaTxt()}));
    $('.mb',s.el).scrollTop=0};
  backB.onclick=()=>{if(!W.step)return s.close();read();W.step--;draw()};
  okB.onclick=()=>{read();const e=check();if(e){const er=$('#ccWerr',wz);er.textContent=e;$('.mb',s.el).scrollTop=0;return}
    if(W.step<PASSOS.length-1){W.step++;draw()}else{finish();s.close()}};
  draw();
}

/* ---------- lista e detalhe ---------- */
const negFiltro=d=>NS.f==='abertos'?d.status==='Aberto':NS.f==='ganho'?d.status==='Ganho':NS.f==='perdido'?d.status==='Perdido':d.status==='Aberto'&&d.etapa===+NS.f;
const negQ=d=>!NS.q||norm([d.titulo,d.cliente,d.resp,d.origem].join(' ')).includes(norm(NS.q));
const negRow=d=>{const ob=d.obra&&D.byId('obras',d.obra);
  return {icon:X.ini(d.cliente),color:TONE[NEG_TONE[d.status]],title:esc(d.cliente),sub:esc(d.titulo)+(ob?` · Obra: ${esc(ob.nome)}`:''),value:brl0(d.valor),value2:d.status==='Aberto'?`${d.prob}%`:esc(d.status),
    href:'#/negocios?card='+d.id,i:d.id,swipe:d.status==='Aberto'?[{label:d.etapa<5?'Avançar':'Ganho',icon:'seta',act:'avancar',tone:1},{label:'Perdido',icon:'x',act:'perder',tone:3}]:null}};
const negChips=()=>{const n=f=>D.negocios.filter(d=>{const o=NS.f;NS.f=f;const r=negFiltro(d);NS.f=o;return r}).length;
  return [['abertos',`Abertos · ${n('abertos')}`],...ETAPAS.map((e,i)=>[String(i),`${e} · ${n(String(i))}`]),['ganho',`Ganhos · ${n('ganho')}`],['perdido',`Perdidos · ${n('perdido')}`]]};
const negBody=()=>{const L=D.negocios.filter(d=>negFiltro(d)&&negQ(d)),tot=L.reduce((a,d)=>a+d.valor,0);
  const tiles=K.tiles([{label:'Negócios',value:String(L.length),sub:NS.f==='abertos'?'no pipeline':NS.f==='ganho'?'ganhos':NS.f==='perdido'?'perdidos':'nesta etapa'},{label:'Total',value:brl0(tot),sub:NS.f==='abertos'?'em pipeline':''}]);
  if(!L.length)return tiles+K.empty({title:'Nenhum negócio aqui.',text:NS.q?'Troque a busca.':'Toque em + para criar um negócio.'});
  if(NS.f==='abertos')return tiles+ETAPAS.map((e,i)=>{const g=L.filter(d=>d.etapa===i);return g.length?K.group({title:`${e} · ${g.length} · ${brl0(g.reduce((a,d)=>a+d.valor,0))}`,rows:g.sort((a,b)=>b.valor-a.valor).map(negRow),
    foot:i===L[0].etapa?'Deslize a linha para avançar a etapa ou marcar como perdido.':''}):''}).join('');
  return tiles+K.group({rows:L.sort((a,b)=>b.valor-a.valor).map(negRow)})};

const fechInfo=d=>{const f=d.fech;if(!f)return X.text('Fechamento','<p>Fechado como ganho.</p>');const p=prop(f.pid),dest=DESTINOS.find(x=>x[0]===f.destino);
  return X.info('Fechamento',[['Proposta vencedora',p?`${p.numero} · Opção ${f.tier+1} · ${esc(p.opc[f.tier][0])}`:'—'],['Valor fechado',`<b class="num">${brl(f.valor)}</b>`],['Fechado em',f.q],['Destino',dest?dest[1]:'—'],['Faturar para',esc((contato(f.faturar)||{}).nome||d.cliente)]])
   +X.lines('Condição de pagamento',f.parc.map(x=>({t:esc(x[0]),s:fd(x[2]),v:`<b class="num" style="color:var(--text)">${brl(x[1])}</b>`})))};
const perdaInfo=d=>{const f=d.perda;if(!f)return X.text('Perda','<p>Marcado como perdido.</p>');const p=prop(f.pid);
  return X.info('Perda',[['Motivo da perda',esc(f.motivo)],['Proposta perdida',p?`${p.numero} · ${esc(p.opc[f.tier]?p.opc[f.tier][0]:'')}`:'—'],['Valor congelado',`<b class="num">${brl(f.valor)}</b>`],['Perdido em',f.q]],f.texto?esc(f.texto):'')};

function negDetalhe(d){
  const dec=d.status!=='Aberto',ob=d.obra&&D.byId('obras',d.obra),next=d.etapa<5?ETAPAS[d.etapa+1]:'Ganho',c=contato(d.cid),ps=propsDe(d);
  let h=`${nav({title:'Negócio',back:'Negócios',large:false,acts:[{icon:'pontos',title:'Mais ações do negócio',act:'mais'}]})}
   ${X.hd({kick:`Negócio · ${etapaNome(d)}`,title:d.titulo,sub:`${esc(d.cliente)} · ${esc(d.origem||'Sem origem')}`,val:brl(d.valor),
     chips:X.chip(d.status,NEG_TONE[d.status])+X.chip('Responsável: '+first(d.resp),'n')+(dec?'':X.chip(d.prob+'% de chance','n'))})}
   <section class="mcard"><div class="cc-steps" aria-hidden="true">${ETAPAS.map((_,i)=>`<i class="${i<=d.etapa?'on':''}"></i>`).join('')}</div>
     <div class="cc-stl"><b>${esc(etapaNome(d))}</b><span class="num">Etapa ${d.etapa+1} de ${ETAPAS.length}</span></div></section>
   ${bigLinks(c,`<button type="button" data-act="agendar">${ic('agenda',22)}<span>Agendar</span></button>`)}
   <div class="cx-acts">${dec?`<span class="full">${K.btn('Reverter decisão',{act:'reverter'})}</span>`
     :`<span class="full">${K.btn(`Avançar para “${next}”`,{act:'avancar',pri:true})}</span>${K.btn('Marcar ganho',{act:'ganho',icon:'check'})}${K.btn('Marcar perdido',{act:'perder',dng:true})}`}</div>`;
  if(!dec){const t=TAREFAS[d.etapa],f=d.feitas[d.etapa]||(d.feitas[d.etapa]=[false,false]),rg=regras(d);
    h+=`<section class="grp"><h2>Tarefas esperadas desta etapa</h2><ul class="lst">${t.map((x,i)=>`<li><button type="button" class="rw cx-ck" data-act="tarefa" data-i="${i}" aria-pressed="${!!f[i]}"><span class="tx"><span class="t1 cx-wrap">${esc(x)}</span><span class="t2">${f[i]?'Feita':'Toque para concluir'}</span></span><span class="cx-cm">${ic('check',22)}</span></button></li>`).join('')}</ul></section>`;
    h+=X.lines('Regras de avanço',rg.map(([l,ok])=>({icon:ok?'check':'!',color:ok?TONE.g:TONE.w,t:esc(l),s:ok?'':'Pendente'})));
    h+=`<p class="soft cx-p" style="margin:-16px 4px 24px;font-size:13px">${rg.every(r=>r[1])?`Tudo certo para avançar para “${esc(next)}”.`:'Dá para avançar com justificativa.'}</p>`}
  else h+=d.status==='Ganho'?fechInfo(d):perdaInfo(d);
  const ac=d.acoes.map((a,i)=>({a,i})).sort((x,y)=>(x.a.done-y.a.done)||String(x.a.prazo).localeCompare(String(y.a.prazo)));
  h+=`<section class="grp"><h2>Próximas ações</h2><ul class="lst">${ac.map(({a,i})=>`<li><button type="button" class="rw cx-ck" data-act="acaook" data-i="${i}" aria-pressed="${a.done}"><span class="tx"><span class="t1 cx-wrap" style="${a.done?'text-decoration:line-through;color:var(--soft)':''}">${esc(a.t)}</span><span class="t2" style="${!a.done&&a.prazo&&a.prazo<D.hoje?'color:'+TONE.w:''}">${prazoTxt(a.prazo)} · ${esc(a.resp)}</span></span><span class="cx-cm">${ic('check',22)}</span></button></li>`).join('')}
    ${K.row({icon:'mais',color:'#8e8e93',title:'Nova próxima ação',act:'acao',chev:false})}</ul></section>`;
  h+=d.ag.length?X.lines('Agenda',evRows([...d.ag].sort((a,b)=>(a.data+a.ini).localeCompare(b.data+b.ini)))):'';
  h+=K.group({title:'Propostas',rows:ps.map(p=>({icon:'propostas',color:TONE[ST_TONE[p.status]],title:`${p.numero} · ${esc(p.titulo)}`,sub:`${p.status}${p.enviada?' · enviada em '+p.enviada:''}`,value:brl0(p.valor),href:'#/propostas?p='+p.id})),
    empty:'Este negócio ainda não tem proposta. Monte a primeira no construtor.'});
  h+=K.group({title:'Obra',rows:ob?[{icon:'projetos',color:TONE.g,title:esc(ob.nome),sub:`${esc(ob.etapa)} · ${esc(ob.status)}`,value:ob.pct+'%',href:'#/obra?id='+ob.id}]:[],empty:'Sem obra vinculada. A obra nasce no fechamento como ganho.'});
  h+=K.group({title:'Anexos',rows:[...d.anexos.map((a,i)=>({icon:'propostas',color:'#5b6476',title:esc(a),act:'anexo',i})),{icon:'upload',color:'#8e8e93',title:'Anexar arquivo',act:'anexar',chev:false}]});
  h+=`${X.lines('Observações',d.obs.map(o=>({t:esc(o.t),s:`${esc(o.quem)} · ${esc(o.q)}${o.just?' · justificativa':''}`})),'Nenhuma observação ainda.')}`;
  h+=K.group({rows:[{icon:'mais',color:'#8e8e93',title:'Registrar observação',act:'obs',chev:false}]});
  h+=X.lines('Nexos',d.nexos.map(n=>({icon:'trocar',color:TONE.b,t:esc(n.t),s:`${esc(n.resp)} · ${prazoTxt(n.prazo)} · ${esc(n.prio)}`,v:esc(n.status)})),'Nenhum Nexo ligado a este negócio.');
  h+=K.group({rows:[{icon:'trocar',color:'#8e8e93',title:'Encaminhar Nexo',act:'nexo',chev:false}]});
  return h;
}
function negMount(v,d){
  const c=contato(d.cid);
  const agTipo=tipo=>sheetAgendar(tipo,d.cliente,e=>{d.ag.push(e);tl(d.cid,'Agendamento',`${e.tipo} em ${fd(e.data)}`);X.refresh()});
  M.wire(v,{
    semtel:()=>M.toast('Sem telefone cadastrado.'),semmail:()=>M.toast('Sem e-mail cadastrado.'),
    agendar:()=>K.actions({title:'Agendar com '+d.cliente,items:[{label:'Agendar Showroom',run:()=>agTipo('Showroom')},{label:'Agendar proposta',run:()=>agTipo('Apresentação de proposta')},{label:'Visita técnica',run:()=>agTipo('Visita técnica')}]}),
    avancar:()=>avancar(d),ganho:()=>fechamento(d),perder:()=>perda(d),reverter:()=>reverter(d),
    tarefa:el=>{const f=d.feitas[d.etapa],k=+el.dataset.i;f[k]=!f[k];X.refresh()},
    acaook:el=>{const a=d.acoes[+el.dataset.i];a.done=!a.done;X.refresh();if(a.done)M.toast('Ação concluída.','Desfazer',()=>{a.done=false;X.refresh()})},
    acao:()=>X.fsheet({title:'Nova próxima ação',ok:'Criar',cheia:false,groups:[{fields:[{k:'t',label:'O que fazer',req:true,ph:'Ex.: Ligar para confirmar'},{k:'prazo',label:'Prazo',type:'date',req:true,value:D.hoje},
      {k:'resp',label:'Responsável',type:'select',req:true,opts:D.equipe.map(u=>u.nome),value:d.resp}]}],onOk:r=>{d.acoes.push({t:r.t,prazo:r.prazo,resp:r.resp,done:false});X.refresh();M.toast('Próxima ação criada.')}}),
    obs:()=>X.fsheet({title:'Registrar observação',ok:'Registrar',cheia:false,groups:[{fields:[{k:'t',label:'Observação',type:'textarea',req:true,ph:'O que a equipe precisa saber'}]}],
      onOk:r=>{d.obs.unshift({t:r.t,quem:ME,q:agora()});X.refresh();M.toast('Observação registrada.')}}),
    nexo:()=>sheetNexo(d.cliente,n=>{d.nexos.unshift(n);tl(d.cid,'Nexo encaminhado',`${n.t} · para ${n.resp}`);X.refresh()}),
    anexar:()=>X.fsheet({title:'Anexar arquivo',ok:'Anexar',cheia:false,groups:[{fields:[{k:'arq',label:'Arquivo',type:'file',req:true}]}],
      onOk:r=>{const n=r.arq.split(/[\\/]/).pop();d.anexos.push(n);X.refresh();M.toast(`${n} anexado.`)}}),
    anexo:el=>{const k=+el.dataset.i,a=d.anexos[k];K.actions({title:a,items:[{label:'Abrir arquivo',run:()=>M.toast(`Abre o arquivo ${a} (simulação).`)},
      {label:'Remover anexo',dng:true,run:()=>{d.anexos.splice(k,1);X.refresh();M.toast(`${a} removido.`,'Desfazer',()=>{d.anexos.splice(k,0,a);X.refresh()})}}]})},
    mais:()=>K.actions({title:d.titulo,items:[
      {label:'Editar negócio completo',run:()=>formNegocio(d)},
      {label:'Justificar',run:()=>X.fsheet({title:'Justificar',ok:'Registrar',cheia:false,groups:[{fields:[{k:'sobre',label:'Sobre',type:'select',req:true,opts:['Etapa parada há muitos dias','Tarefa esperada não feita','Desconto acima do padrão','Outro']},{k:'t',label:'Justificativa',type:'textarea',req:true}]}],
        onOk:r=>{d.obs.unshift({t:`${r.sobre}: ${r.t}`,quem:ME,q:agora(),just:true});X.refresh();M.toast('Justificativa registrada.')}})},
      {label:'Chat desta entidade',run:()=>M.mchatCliente?M.mchatCliente(d.cliente):(location.hash='#/chat')},
      {label:'E-mail',run:()=>email(c)},
      ...(d.status==='Aberto'?[{label:'Marcar como perdido',dng:true,run:()=>perda(d)}]:[{label:'Reverter decisão',run:()=>reverter(d)}]),
      {label:'Excluir negócio',dng:true,run:()=>excluirNeg(d)}]})});
}

M.mscreen('negocios',{title:'Negócios',tab:'negocios',
  help:['O pipeline comercial vira lista: escolha a etapa nos botões do topo.','Deslize a linha para avançar a etapa ou marcar como perdido.','Abra o negócio para ver próximas ações, propostas e fechar como ganho em passos.'],
  render:q=>{const d=q.get('card')&&negocio(q.get('card'));if(d)return negDetalhe(d);
    return `${nav({title:'Negócios',sub:'Pipeline comercial.',acts:[{icon:'mais',title:'Novo negócio',act:'novo'}]})}
     ${K.search('Buscar negócio ou cliente…','ccNq')}
     ${K.chips('ccNf',negChips(),NS.f)}
     <div id="ccNb">${negBody()}</div>`},
  mount:(v,q)=>{const d=q.get('card')&&negocio(q.get('card'));if(d)return negMount(v,d);
    const b=$('#ccNb',v);
    const H={avancar:el=>avancar(negocio(el.dataset.i)),perder:el=>perda(negocio(el.dataset.i))};
    const draw=()=>{b.innerHTML=negBody();M.wire(b,H);K.bindSwipe(b)};
    M.wire(b,H);M.wire(v,{novo:()=>formNegocio(null)});
    K.bindPick(v,'ccNf',x=>{NS.f=x;draw()});
    const qi=$('#ccNq',v);qi.value=NS.q;qi.oninput=()=>{NS.q=qi.value.trim();draw()}}});

/* =====================================================================
   PROPOSTAS
   ===================================================================== */
const PS={f:'0',q:''};
const PSTL=['Todas','Rascunho','Enviadas','Vistas','Aceitas','Recusadas','Expiradas'];
const pcnt=i=>i?D.propostas.filter(p=>p.status===SORDER[i-1]).length:D.propostas.length;
const pUrl=p=>`https://app.maestroos.com.br/p/${p.numero.replace('#','')}`;
const semLink=()=>M.toast('Gere o link no construtor (passo 4 · Enviar) antes.','Abrir construtor',()=>{location.hash='#/construtor'});
const pEditar=p=>{if(p.status==='Aceita')return M.toast('Proposta aceita fica congelada. Crie uma revisão para mudar.','Criar revisão',()=>pRevisao(p));
  if(window.__prop){window.__prop.nome=p.titulo;window.__prop.cliente=p.cliente}location.hash='#/construtor'};
const pLink=p=>{if(p.status==='Rascunho')return semLink();const url=pUrl(p);
  try{navigator.clipboard.writeText(url).then(()=>M.toast('Link público copiado.'),()=>M.toast('Link público: '+url))}catch(e){M.toast('Link público: '+url)}};
const pWhats=p=>{if(p.status==='Rascunho')return semLink();const c=D.contatos.find(x=>x.nome===p.cliente);
  whats(c,`Olá! Segue a proposta ${p.numero} · ${p.titulo}: ${pUrl(p)}`)};
const pRevisao=p=>X.fsheet({title:'Criar revisão',ok:'Criar',cheia:false,top:top(`${esc(p.numero)} ganha a versão v${p.vers+1}. A versão atual fica no histórico.`),
  groups:[{fields:[{k:'nota',label:'O que muda',type:'textarea',ph:'Ex.: troca do receiver e desconto de 5%'}]}],
  onOk:v=>{p.vers++;(p.hist||(p.hist=[])).unshift({v:p.vers,q:fd(D.hoje),t:v.nota||'Revisão criada'});p.status='Rascunho';p.esc=-1;p.enviada='';p.abertas=0;p.validade='';p.upd=maxUpd();p.quando='agora';
    X.refresh();M.toast(`Revisão v${p.vers} criada como rascunho.`,'Abrir no construtor',()=>pEditar(p))}});
const pRecusar=p=>X.motivo({title:'Recusar proposta',ok:'Recusar',dng:true,top:top(`${esc(p.numero)} · ${esc(p.titulo)} · ${esc(p.cliente)}`),run:m=>{
  const old={status:p.status,motivo:p.motivo};p.status='Recusada';p.motivo=m;p.upd=maxUpd();p.quando='agora';X.refresh();
  M.toast(`Proposta ${p.numero} recusada.`,'Desfazer',()=>{Object.assign(p,old);X.refresh()})}});
const pDoc=p=>K.sheet({title:'Proposta '+p.numero,ok:'Baixar PDF',cancel:'Fechar',onOk:()=>{M.toast(`Geraria o PDF da proposta ${p.numero}.`);return false},
  body:`<p class="soft cx-p" style="margin:0 4px 16px">Como o cliente vê o documento.</p><div class="cc-doc"><div class="k">Proposta ${esc(p.numero)}${p.vers>1?' · v'+p.vers:''} · ${esc(p.status)}</div>
    <h3>${esc(p.titulo)}</h3><p class="soft" style="margin:6px 0 16px">Para ${esc(p.cliente)}${p.validade?' · válida até '+p.validade:''}</p>
    ${p.opc.map((o,k)=>`<div class="ln"><span>Opção ${k+1} · ${esc(o[0])}${k===p.esc?' · ✓ Escolhida':''}</span><b class="num">${brl(o[1])}</b></div>`).join('')}
    <p class="soft" style="margin:16px 0 0;font-size:14px;line-height:1.5">Forma de pagamento: entrada de 30% e saldo em 2 parcelas. Não incluído no escopo: obra civil, pintura e infraestrutura elétrica.</p></div>`});
const pBody=()=>{const L=D.propostas.filter(p=>(PS.f==='0'||p.status===SORDER[+PS.f-1])&&(!PS.q||norm([p.numero,p.titulo,p.cliente].join(' ')).includes(norm(PS.q)))).sort((a,b)=>b.upd-a.upd);
  if(!L.length)return K.empty({title:'Nenhuma proposta encontrada.',text:'Troque o status ou a busca.'});
  const nids=[...new Set(L.map(p=>p.nid||p.id))];
  return nids.map(nid=>{const g=L.filter(p=>(p.nid||p.id)===nid),n=negocio(nid);
    return K.group({title:n?`${n.cliente} · ${n.titulo}`:g[0].cliente,rows:g.map(p=>({icon:'propostas',color:TONE[ST_TONE[p.status]],title:`${p.numero} · ${esc(p.titulo)}`,
      sub:`${p.status} · ${esc(p.quando||'')}${p.abertas?` · aberta ${p.abertas}×`:''}`,value:brl0(p.valor),value2:p.opc.length>1?`${p.opc.length} opções`:'1 opção',href:'#/propostas?p='+p.id}))})}).join('')};

function propDetalhe(p){
  const n=p.nid&&negocio(p.nid),fim=['Aceita','Recusada'].includes(p.status);
  const hist=[...(p.hist||[]),...Array.from({length:Math.max(0,p.vers-(p.hist||[]).length)},(_,i)=>({v:p.vers-(p.hist||[]).length-i,q:i===p.vers-(p.hist||[]).length-1?(p.enviada||'—'):'—',t:i===p.vers-(p.hist||[]).length-1?'Primeira versão':'Revisão'}))];
  return `${nav({title:'Proposta '+p.numero,back:'Propostas',large:false,acts:[{icon:'pontos',title:'Mais ações da proposta',act:'mais'}]})}
   ${X.hd({kick:`Proposta ${p.numero} · v${p.vers}`,title:p.titulo,sub:esc(p.cliente),val:brl(p.valor),chips:X.chip(p.status,ST_TONE[p.status])})}
   <div class="cx-acts"><span class="full">${K.btn('Abrir no construtor',{act:'editar',pri:true,icon:'propostas'})}</span>${K.btn('Ver documento',{act:'doc',icon:'olho'})}${K.btn('Copiar link',{act:'link',icon:'copiar'})}
     <span class="full">${K.btn(p.status==='Rascunho'?'Enviar por WhatsApp':'Reenviar por WhatsApp',{act:'whats',icon:'zap'})}</span>
     ${fim?'':`<span class="full">${K.btn('Recusar proposta',{act:'recusar',dng:true})}</span>`}</div>
   ${X.lines('Opções desta proposta',p.opc.map((x,k)=>({icon:String(k+1),color:k===p.esc?TONE.g:'#8e8e93',t:`Opção ${k+1} · ${esc(x[0])}`,s:k===p.esc?'✓ Escolhida':'',v:`<b class="num" style="color:var(--text)">${brl(x[1])}</b>`})))}
   ${X.info('Andamento',[['Versões',Array.from({length:p.vers},(_,i)=>'v'+(i+1)).join(' · ')],['Enviada em',p.enviada||'—'],['Vezes aberta',String(p.abertas)],['Validade',p.validade||'—'],p.motivo&&p.status==='Recusada'?['Motivo da recusa',esc(p.motivo)]:null])}
   ${X.lines('Histórico de versões',hist.map(x=>({icon:'v'+x.v,color:'#5b6476',t:esc(x.t),s:esc(x.q)})))}
   ${n?K.group({title:'Negócio',rows:[{icon:'negocios',color:TONE[NEG_TONE[n.status]],title:esc(n.titulo),sub:`${esc(n.cliente)} · ${esc(etapaNome(n))}`,href:'#/negocios?card='+n.id}]}):''}`;
}

M.mscreen('propostas',{title:'Propostas',tab:'propostas',
  help:['Propostas agrupadas por negócio, das mais recentes para as mais antigas.','Os botões do topo filtram pelo status, com a contagem de cada um.','Toque numa proposta para abrir no construtor, ver o documento, copiar o link ou enviar por WhatsApp.'],
  render:q=>{const p=q.get('p')&&prop(q.get('p'));if(p)return propDetalhe(p);
    const a=D.propostas.filter(x=>['Rascunho','Enviada','Vista'].includes(x.status)).length;
    return `${nav({title:'Propostas',sub:`${D.propostas.length} propostas · ${a} em andamento.`,acts:[{icon:'mais',title:'Nova proposta',act:'nova'}]})}
     ${K.search('Buscar negócio, cliente ou número','ccPq')}
     ${K.chips('ccPf',PSTL.map((l,i)=>[String(i),`${l} · ${pcnt(i)}`]),PS.f)}
     <div id="ccPb">${pBody()}</div>`},
  mount:(v,q)=>{const p=q.get('p')&&prop(q.get('p'));
    if(p)return M.wire(v,{editar:()=>pEditar(p),doc:()=>pDoc(p),link:()=>pLink(p),whats:()=>pWhats(p),recusar:()=>pRecusar(p),
      mais:()=>K.actions({title:`${p.numero} · ${p.titulo}`,items:[{label:'Criar revisão',run:()=>pRevisao(p)},{label:'Copiar link público',run:()=>pLink(p)},...(['Aceita','Recusada'].includes(p.status)?[]:[{label:'Recusar proposta',dng:true,run:()=>pRecusar(p)}])]})});
    const b=$('#ccPb',v);const draw=()=>{b.innerHTML=pBody();M.wire(b,{})};
    M.wire(v,{nova:()=>K.actions({title:'Nova proposta',items:[{label:'Pelo construtor',run:()=>location.hash='#/construtor'},{label:'Pelo catálogo',run:()=>location.hash='#/catalogo'}]})});
    K.bindPick(v,'ccPf',x=>{PS.f=x;draw()});
    const qi=$('#ccPq',v);qi.value=PS.q;qi.oninput=()=>{PS.q=qi.value.trim();draw()}}});
})();

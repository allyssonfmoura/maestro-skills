/* Maestro OS · celular · Rotina: Atividades, Nexos, Agenda e Chat
   Mesmos registros, estados e ações do computador (mod-rotina.js), redesenhados para o toque.
   Detalhes são rotas da pilha: #/atividades?t=, #/nexos?x=, #/agenda?e=, #/chat?c= */
(function(){
const {ic,$,$$,esc}=M, K=M.m, D=M.D;

/* ---------- peças comuns às telas de celular deste lote (iguais em cel-comercial.js; a primeira que carregar define) ---------- */
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

/* ---------- utilidades (mesmas do computador) ---------- */
const ME='Allysson Moura';
const EQ=D.equipe.map(u=>u.nome);
const AREAS=['Comercial','Projetos','Técnica','Experiência','Administrativo'];
const HOJE=D.hoje;
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const dt=s=>new Date(s.slice(0,10)+'T12:00:00');
const addD=(s,n)=>{const d=dt(s);d.setDate(d.getDate()+n);return iso(d)};
const mon=s=>addD(s,-((dt(s).getDay()+6)%7));
const dias=s=>Math.round((dt(s)-dt(HOJE))/864e5);
const rel=s=>{if(!s)return 'sem prazo';const n=dias(s);return n===0?'hoje':n===1?'amanhã':n===-1?'ontem':n>1?`em ${n}d`:`há ${-n}d`};
const toneP=s=>{if(!s)return 'n';const n=dias(s);return n<0?'r':n===0?'w':'n'};
const br=s=>s?s.slice(8,10)+'/'+s.slice(5,7):'—';
const agora=()=>{const d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')};
const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const first=n=>n?n.split(' ')[0]:'';
const cidOf=nome=>(D.contatos.find(c=>c.nome===nome)||{}).id;
const CLIENTES=D.contatos.filter(c=>c.papel==='Cliente').map(c=>c.nome);
const PARCEIROS=D.contatos.filter(c=>c.papel==='Parceiro').map(c=>c.nome);
const stamp=t=>({q:'Hoje '+agora(),t});
const TONE={r:'rgb(var(--neg))',w:'rgb(var(--warn))',b:'rgb(var(--primary))',g:'rgb(var(--pos))',n:'#8e8e93'};
const histItems=h=>(h||[]).map(x=>({t:esc(x.t),s:esc(x.q)}));
const nav=(o)=>K.nav(o);

X.css('cr-css',`
  .cr-flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px}
  .cr-flow i{display:block;height:6px;border-radius:99px;background:color-mix(in srgb,var(--text) 10%,transparent)}
  .cr-flow i.on{background:rgb(var(--primary))}.cr-flow i.dev{background:rgb(var(--warn))}
  .cr-flowl{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;margin-top:8px;font-size:12px;color:var(--soft)}
  .cr-flowl span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cr-flowl span.on{color:var(--text);font-weight:600}
  .cr-days{display:flex;gap:6px;overflow-x:auto;margin:0 -16px 16px;padding:0 16px 4px;scrollbar-width:none;scroll-snap-type:x proximity}
  .cr-days::-webkit-scrollbar{display:none}
  .cr-days button{flex:none;width:52px;height:68px;border:0;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;scroll-snap-align:start;
    background:color-mix(in srgb,var(--text) 6%,transparent);color:var(--text)}
  .cr-days button .w{font-size:12px;font-weight:600;color:var(--soft);text-transform:uppercase}
  .cr-days button .n{font-size:20px;font-weight:700;font-variant-numeric:tabular-nums}
  .cr-days button .p{width:6px;height:6px;border-radius:99px;background:transparent}
  .cr-days button .p.on{background:rgb(var(--primary))}
  .cr-days button.hoje .n{color:rgb(var(--primary))}
  .cr-days button[aria-pressed="true"]{background:rgb(var(--primary));color:#fff}
  .cr-days button[aria-pressed="true"] .w,.cr-days button[aria-pressed="true"] .n{color:#fff}
  .cr-days button[aria-pressed="true"] .p.on{background:#fff}
  .cr-days .sem{flex:none;align-self:center;font-size:12px;font-weight:600;color:var(--faint);padding:0 2px;writing-mode:vertical-rl;transform:rotate(180deg)}
  .cr-novas{display:inline-block;margin-top:2px;padding:2px 8px;border-radius:999px;background:rgb(var(--primary));color:#fff;font-size:12px;font-weight:700}
  .cr-parts{margin:4px 4px 16px;color:var(--soft);font-size:14px;text-align:center;line-height:1.4}
  .cr-msgs{display:flex;flex-direction:column;gap:4px;margin-bottom:88px}
  .cr-msgs .bubble{max-width:80%;font-size:16px;overflow-wrap:anywhere}
  .cr-who{font-size:12px;color:var(--faint);margin:10px 8px 2px}
  .cr-who.me{text-align:right}
  .cr-sys{align-self:center;font-size:12px;color:var(--faint);margin:10px 0}
  .cr-more{align-self:center;height:44px;padding:0 18px;border:0;border-radius:999px;background:color-mix(in srgb,var(--text) 7%,transparent);color:rgb(var(--primary));font-size:15px;font-weight:600;margin-bottom:8px}
  .cr-comp{position:fixed;z-index:45;left:12px;right:12px;bottom:calc(80px + env(safe-area-inset-bottom));display:flex;gap:8px;align-items:center;padding:6px;border-radius:28px;
    background:color-mix(in srgb,var(--panel) 88%,transparent);-webkit-backdrop-filter:blur(24px) saturate(180%);backdrop-filter:blur(24px) saturate(180%);box-shadow:0 0 0 .5px var(--line-2),0 8px 24px -12px rgba(0,0,0,.3)}
  .cr-comp input{flex:1;min-width:0;height:44px;padding:0 14px;border:0;border-radius:22px;background:color-mix(in srgb,var(--text) 6%,transparent);font-size:17px;color:var(--text);outline:none}
  .cr-comp button{flex:none;width:44px;height:44px;border:0;border-radius:999px;display:grid;place-items:center;background:rgb(var(--primary));color:#fff}
  .cr-warn{color:rgb(var(--warn))}
`);

/* =====================================================================
   ATIVIDADES
   ===================================================================== */
const TAREFAS=[
 {id:'t1',titulo:'Ligar para confirmar a apresentação da proposta',prazo:'2026-10-02',cliente:'Sérgio Bastos',etapa:'Proposta',tipo:'Negócio',area:'Comercial',resp:'Allysson Moura',ent:'Automação residencial'},
 {id:'t2',titulo:'Enviar proposta revisada com cinema 7.2',prazo:'2026-09-30',cliente:'Caio Ferraz',etapa:'Visita técnica',tipo:'Proposta',area:'Comercial',resp:'Felipe Nunes',ent:'Cinema e áudio'},
 {id:'t3',titulo:'Conferir lista de compras da infra de rede',prazo:'2026-10-03',cliente:'Marcos Valente',etapa:'Infra de rede',tipo:'Projeto',area:'Projetos',resp:'Diego Rocha',ent:'Casa Valente'},
 {id:'t4',titulo:'Registrar relatório de visita com fotos',prazo:'2026-10-01',cliente:'Helena Duarte',etapa:'Instalação elétrica',tipo:'Técnica',area:'Técnica',resp:'Bruno Lima',ent:'Residência Duarte',comprova:true,obrig:true},
 {id:'t5',titulo:'Agendar visita técnica',prazo:'2026-10-05',cliente:'Rodrigo Alencar',etapa:'Visita técnica',tipo:'Negócio',area:'Comercial',resp:'Allysson Moura',ent:'Rede e segurança'},
 {id:'t6',titulo:'Emitir cobrança da parcela 3/6',prazo:'2026-09-28',cliente:'Helena Duarte',etapa:'Instalação elétrica',tipo:'Projeto',area:'Administrativo',resp:'Carla Souza',ent:'Residência Duarte',obrig:true},
 {id:'t7',titulo:'Validar pré-projeto com a arquiteta',prazo:'2026-10-06',cliente:'Lívia Prates e Otávio Lemos',etapa:'Pré-projeto',tipo:'Projeto',area:'Projetos',resp:'Diego Rocha',ent:'Residência Prates Lemos',comprova:true},
 {id:'t8',titulo:'Pesquisa de satisfação pós-entrega',prazo:'2026-10-09',cliente:'Paula e Renato Lopes',etapa:'Entregue',tipo:'Contato',area:'Experiência',resp:'Elisa Prado',ent:'Apartamento Savassi'},
 {id:'t9',titulo:'Qualificar lead: entender o espaço do salão',prazo:'2026-10-02',cliente:'Sushi Yoru Bar',etapa:'Lead',tipo:'Negócio',area:'Comercial',resp:'',ent:'Som ambiente',obrig:true},
 {id:'t10',titulo:'Revisar orçamento de iluminação com o designer',prazo:'2026-10-07',cliente:'Marta Albuquerque',etapa:'Negociação',tipo:'Proposta',area:'Comercial',resp:'Felipe Nunes',ent:'Iluminação'},
 {id:'t11',titulo:'Levantamento do Wi-Fi da casa de campo',prazo:'',cliente:'Rodrigo Alencar',etapa:'Lead',tipo:'Negócio',area:'Comercial',resp:'',ent:'Casa de campo — Wi-Fi'},
 {id:'t12',titulo:'Enviar contrato assinado para o financeiro',prazo:'2026-09-29',cliente:'Lívia Prates e Otávio Lemos',etapa:'Decisão',tipo:'Negócio',area:'Comercial',resp:'Allysson Moura',ent:'Segunda fase · Upgrade Automação',status:'Concluída'},
 {id:'t13',titulo:'Treinamento do app de automação',prazo:'2026-09-25',cliente:'Paula e Renato Lopes',etapa:'Entregue',tipo:'Técnica',area:'Experiência',resp:'Elisa Prado',ent:'Apartamento Savassi',status:'Concluída'},
 {id:'t14',titulo:'Follow-up da proposta de áudio do escritório',prazo:'2026-09-20',cliente:'Marina Costa Arquitetura',etapa:'Decisão',tipo:'Proposta',area:'Comercial',resp:'Felipe Nunes',ent:'Escritório — Áudio',status:'Cancelada'}
].map(t=>({status:'Aberta',comprova:false,obrig:false,hist:[{q:'25/09',t:'Criada pelo fluxo da etapa “'+t.etapa+'”.'}],...t}));
const cardLink=t=>['Negócio','Proposta','Contato'].includes(t.tipo)?'#/negocios':'#/projetos';
const AS={st:'Aberta',esc:'todos',q:''};
const GORD=['Atrasadas','Hoje','Próximos dias','Sem prazo','Concluídas','Canceladas'];
const gPrazo=t=>t.status==='Concluída'?'Concluídas':t.status==='Cancelada'?'Canceladas':!t.prazo?'Sem prazo':dias(t.prazo)<0?'Atrasadas':dias(t.prazo)===0?'Hoje':'Próximos dias';
const atvList=()=>TAREFAS.filter(t=>(AS.st==='todas'||t.status===AS.st)&&(AS.esc==='todos'||(AS.esc==='minhas'?t.resp===ME:t.resp!==ME))
  &&(!AS.q||norm([t.titulo,t.cliente,t.ent,t.etapa,t.tipo,t.resp].join(' ')).includes(norm(AS.q)))).sort((a,b)=>(a.prazo||'9999')<(b.prazo||'9999')?-1:1);
const tById=id=>TAREFAS.find(t=>t.id===id);

/* ações reais (as mesmas do computador), em folhas */
const tConcluir=(t,after=X.refresh)=>{
  if(t.status!=='Aberta'){t.status='Aberta';t.hist.push(stamp('Reaberta por '+ME+'.'));after();return M.toast('Tarefa reaberta.')}
  if(t.comprova)return M.toast('Esta tarefa exige comprovação: conclua pelo card.','Abrir card',()=>location.hash=cardLink(t));
  X.fsheet({title:'Concluir tarefa',ok:'Concluir',cheia:false,top:`<p class="soft cx-p" style="margin:0 4px 16px">${esc(t.titulo)} · ${esc(t.cliente)}</p>`,
    groups:[{fields:[{k:'reg',label:'Registrar no Maestro OS',type:'textarea',req:true,ph:'O que foi feito? Fica no histórico do cliente.'}]}],
    onOk:x=>{t.status='Concluída';t.hist.push(stamp('Concluída: '+x.reg));after();M.toast('Tarefa concluída.','Desfazer',()=>{t.status='Aberta';X.refresh()})}});
};
const tAdiar=(t,after=X.refresh)=>X.fsheet({title:'Adiar tarefa',ok:'Adiar',cheia:false,top:`<p class="soft cx-p" style="margin:0 4px 16px">${esc(t.titulo)}</p>`,
  groups:[{fields:[{k:'prazo',label:'Novo prazo',type:'date',req:true,value:t.prazo||HOJE},{k:'motivo',label:'Motivo',type:'textarea',req:true,ph:'Por que o prazo muda?'}]}],
  onOk:x=>{const de=t.prazo;t.prazo=x.prazo;t.hist.push(stamp(`Adiada de ${br(de)} para ${br(x.prazo)}: ${x.motivo}`));after();M.toast(`Prazo movido para ${br(x.prazo)}.`)}});
const tDispensar=(t,after=X.refresh)=>{
  if(t.obrig)return M.toast('Tarefa obrigatória não é dispensável.');
  X.motivo({title:'Dispensar tarefa',ok:'Dispensar',dng:true,ph:'Por que esta tarefa não precisa mais ser feita?',top:`<p class="soft cx-p" style="margin:0 4px 16px">${esc(t.titulo)}</p>`,
    run:m=>{t.status='Cancelada';t.hist.push(stamp('Dispensada: '+m));after();M.toast('Tarefa dispensada.','Desfazer',()=>{t.status='Aberta';X.refresh()})}});
};
const tDelegar=(t,after=X.refresh)=>X.fsheet({title:'Delegar tarefa',ok:'Delegar',cheia:true,top:`<p class="soft cx-p" style="margin:0 4px 16px">${esc(t.titulo)}</p>`,
  groups:[{fields:[{k:'para',label:'Para',type:'select',req:true,ph:'Escolha',opts:EQ.filter(n=>n!==t.resp)},{k:'motivo',label:'Motivo',type:'textarea',ph:'Contexto para quem recebe (opcional)'}]}],
  bottom:X.lines('Histórico',histItems(t.hist)),
  onOk:x=>{const de=t.resp||'Sem responsável';t.resp=x.para;t.hist.push(stamp(`Delegada de ${de} para ${x.para}${x.motivo?': '+x.motivo:''}`));after();M.toast(`Tarefa com ${first(x.para)} agora.`)}});

const atvRow=t=>{const tn=t.status==='Aberta'?toneP(t.prazo):t.status==='Concluída'?'g':'n';
  return {icon:t.status==='Concluída'?'check':t.status==='Cancelada'?'x':'atividades',color:t.status==='Aberta'?(tn==='n'?TONE.b:TONE[tn]):TONE[tn],
    title:`<span class="cx-2l">${esc(t.titulo)}</span>`,sub:`${esc(t.cliente)} · ${esc(t.resp?first(t.resp):'Sem responsável')}${t.comprova&&t.status==='Aberta'?' · exige comprovação':''}`,
    value:`<span style="color:${tn==='r'?TONE.r:tn==='w'?TONE.w:'inherit'}">${esc(t.status==='Aberta'?rel(t.prazo):br(t.prazo))}</span>`,href:'#/atividades?t='+t.id,i:t.id,
    swipe:t.status==='Aberta'?[{label:'Concluir',icon:'check',act:'concluir',tone:4},{label:'Adiar',icon:'relogio',act:'adiar',tone:5}]:null}};
const atvBody=()=>{const R=atvList();
  if(!R.length){const filtr=AS.esc!=='todos'||AS.q;
    return filtr?K.empty({title:'Nenhuma atividade encontrada com esses filtros.',text:'Troque o escopo ou a busca.'})+`<div class="cx-acts"><span class="full">${K.btn('Limpar filtros',{act:'limpar'})}</span></div>`
      :AS.st==='Aberta'?K.empty({title:'Painel zerado! ✨',text:'Tudo em dia por aqui. Que silêncio bom.'}):K.empty({title:'Nenhuma atividade encontrada.',text:'Nada neste status.'})}
  const ks=GORD.filter(g=>R.some(t=>gPrazo(t)===g));
  return ks.map((g,i)=>{const rows=R.filter(t=>gPrazo(t)===g);return K.group({title:`${g} · ${rows.length}`,rows:rows.map(atvRow),
    foot:i===0&&rows.some(t=>t.status==='Aberta')?'Deslize a linha para a esquerda para concluir ou adiar.':''})}).join('')};

function atvDetalhe(t){
  const open=t.status==='Aberta';
  return `${nav({title:'Tarefa',back:'Atividades',large:false})}
   ${X.hd({kick:`${t.tipo} · ${t.area}`,title:t.titulo,sub:`${esc(t.cliente)} · ${esc(t.ent)}`,
     chips:X.chip(t.status,open?'b':t.status==='Concluída'?'g':'n')+X.chip(rel(t.prazo),open?toneP(t.prazo):'n')+(t.comprova?X.chip('Exige comprovação','w'):'')+(t.obrig?X.chip('Obrigatória','n'):'')})}
   <div class="cx-acts">${open?`<span class="full">${K.btn(t.comprova?'Concluir pelo card':'Concluir',{act:'con',pri:true,icon:'check'})}</span>${K.btn('Adiar',{act:'adi',icon:'relogio'})}${K.btn('Delegar',{act:'del',icon:'trocar'})}
     <span class="full">${K.btn('Dispensar',{act:'dis',dng:true})}</span>`:`<span class="full">${K.btn('Reabrir tarefa',{act:'con',pri:true})}</span>`}</div>
   ${X.info('Dados',[['Prazo',`${br(t.prazo)} · ${rel(t.prazo)}`],['Cliente',esc(t.cliente)],['Etapa',esc(t.etapa)],['Tipo',esc(t.tipo)],['Área',esc(t.area)],['Responsável',esc(t.resp||'Sem responsável')]])}
   ${t.comprova?K.group({title:'Comprovação',foot:'Esta tarefa só conclui pelo card, com o comprovante anexado.',rows:[{icon:'propostas',color:TONE.w,title:'Abrir card',sub:esc(t.ent),href:cardLink(t)}]}):''}
   ${cidOf(t.cliente)?K.group({rows:[{icon:'contatos',title:'Ficha do cliente',sub:esc(t.cliente),href:'#/contatos?ficha='+cidOf(t.cliente)}]}):''}
   ${X.lines('Histórico',histItems(t.hist).reverse())}`;
}

M.mscreen('atividades',{title:'Atividades',tab:'atividades',
  help:['Suas próximas ações, agrupadas pelo prazo: atrasadas primeiro.','Deslize a linha para a esquerda para concluir ou adiar sem abrir.','Toque na tarefa para ver tudo e Concluir, Adiar, Delegar ou Dispensar.'],
  render:q=>{const t=q.get('t')&&tById(q.get('t'));if(t)return atvDetalhe(t);
    const ab=TAREFAS.filter(x=>x.status==='Aberta'),at=ab.filter(x=>x.prazo&&dias(x.prazo)<0).length;
    return `${nav({title:'Atividades',sub:`${ab.length} abertas · ${at} atrasadas`})}
     ${K.search('Buscar por tarefa, cliente, entidade…','crAq')}
     ${K.chips('crAst',[['Aberta','Abertas'],['Concluída','Concluídas'],['Cancelada','Canceladas'],['todas','Todas']],AS.st)}
     ${K.seg('crAesc',[['todos','Todos'],['minhas','Minhas'],['equipe','Da equipe']],AS.esc,'Escopo')}
     <div id="crAb">${atvBody()}</div>`},
  mount:(v,q)=>{const t=q.get('t')&&tById(q.get('t'));
    if(t){const fim=()=>X.refresh();M.wire(v,{con:()=>tConcluir(t,fim),adi:()=>tAdiar(t,fim),del:()=>tDelegar(t,fim),dis:()=>tDispensar(t,fim)});return}
    const b=$('#crAb',v);
    const H={concluir:el=>tConcluir(tById(el.dataset.i),draw),adiar:el=>tAdiar(tById(el.dataset.i),draw),limpar:()=>{AS.esc='todos';AS.q='';X.refresh()}};
    const draw=()=>{b.innerHTML=atvBody();M.wire(b,H);K.bindSwipe(b)};
    M.wire(b,H);
    K.bindPick(v,'crAst',x=>{AS.st=x;draw()});K.bindPick(v,'crAesc',x=>{AS.esc=x;draw()});
    const qi=$('#crAq',v);qi.value=AS.q;qi.oninput=()=>{AS.q=qi.value.trim();draw()}}});

/* =====================================================================
   NEXOS
   ===================================================================== */
const PRIOS=['Urgente','Alta','Média','Baixa'];
const PT={Urgente:'r',Alta:'w','Média':'b',Baixa:'n'};
const NST={Aberto:'b',Aceito:'b','Em andamento':'b',Devolvido:'w',Resolvido:'g',Cancelado:'n'};
const VIS=['Equipe toda','Só os envolvidos'];
const areaDe=n=>(D.equipe.find(u=>u.nome===n)||{}).area||'Comercial';
const NX=[
 {id:'x1',titulo:'Conferir lista de compras da infra de rede',desc:'Antes de fechar o pedido com o distribuidor, conferir quantidades de cabo CAT6 e access points com o projeto executivo.',status:'Aberto',prio:'Alta',prazo:'2026-10-02',resp:ME,criador:'Diego Rocha',colabs:['Bruno Lima'],cliente:'Marcos Valente',area:'Projetos',anexos:['lista-compras-rede.pdf'],coms:[{a:'Diego Rocha',q:'há 1 h',t:'Preciso disso antes de enviar o pedido para a Ubiquiti.'}]},
 {id:'x2',titulo:'Aprovar desconto de 5% na proposta #1051',desc:'Cliente abriu a proposta 3 vezes e pediu condição melhor à vista.',status:'Aceito',prio:'Urgente',prazo:'2026-10-01',resp:ME,criador:'Felipe Nunes',colabs:[],cliente:'Sérgio Bastos',area:'Comercial',anexos:[],coms:[]},
 {id:'x3',titulo:'Liberar pagamento dos cabos CAT6',desc:'Compra solicitada pelo Bruno para a Residência Duarte. Valor R$ 4.210,50.',status:'Em andamento',prio:'Média',prazo:'2026-10-05',resp:'Carla Souza',criador:ME,colabs:['Bruno Lima'],cliente:'Helena Duarte',area:'Comercial',anexos:['orcamento-cat6.pdf'],coms:[{a:'Carla Souza',q:'ontem',t:'Aguardando a nota do fornecedor.'}]},
 {id:'x4',titulo:'Agendar treinamento do app com a família',desc:'Família pediu uma segunda sessão para os filhos.',status:'Aberto',prio:'Baixa',prazo:'2026-10-12',resp:'Elisa Prado',criador:'Bruno Lima',colabs:[ME],cliente:'Paula e Renato Lopes',area:'Técnica',anexos:[],coms:[]},
 {id:'x5',titulo:'Revisar pré-projeto com a arquiteta Marina',desc:'Alinhar pontos de iluminação cênica e cortinas antes da apresentação.',status:'Devolvido',prio:'Alta',prazo:'2026-10-03',resp:'Diego Rocha',criador:ME,colabs:['Bruno Lima'],cliente:'Lívia Prates e Otávio Lemos',parc:'Marina Costa Arquitetura',area:'Comercial',anexos:['pre-projeto-v2.pdf','planta-baixa.dwg'],coms:[],devolvido:'Falta a planta de iluminação atualizada. Anexe antes de eu seguir.'},
 {id:'x6',titulo:'Enviar fotos da instalação elétrica para o relatório',desc:'',status:'Resolvido',prio:'Média',prazo:'2026-09-30',resp:'Bruno Lima',criador:'Diego Rocha',colabs:[ME],cliente:'Helena Duarte',area:'Projetos',anexos:[],coms:[],conclusao:'86 fotos enviadas na pasta da obra.'},
 {id:'x7',titulo:'Levantar disponibilidade de Sonos Arc no distribuidor',desc:'Para fechar a opção Premium da proposta de cinema.',status:'Aberto',prio:'Média',prazo:'',resp:'Diego Rocha',criador:'Felipe Nunes',colabs:[ME],cliente:'Caio Ferraz',area:'Comercial',anexos:[],coms:[]},
 {id:'x8',titulo:'Confirmar endereço de entrega dos equipamentos',desc:'Entrega marcada para hoje às 17h30.',status:'Em andamento',prio:'Alta',prazo:'2026-10-02',resp:'Bruno Lima',criador:ME,colabs:[],cliente:'Helena Duarte',area:'Comercial',anexos:[],coms:[]},
 {id:'x9',titulo:'Primeiro contato do lead que veio pelo site',desc:'Salão novo na Savassi; querem som ambiente em 3 zonas.',status:'Aberto',prio:'Média',prazo:'2026-10-08',resp:'Felipe Nunes',criador:ME,colabs:[],cliente:'Sushi Yoru Bar',area:'Comercial',anexos:[],coms:[]}
].map(x=>({vis:'Equipe toda',parc:'',hist:[{q:'28/09',t:'Criado por '+x.criador+'.'}],...x}));
const SUG=[
 {id:'s1',t:'Orçar mais 2 câmeras na área da piscina',cli:'Rodrigo Alencar',fonte:'WhatsApp · ontem 18:20'},
 {id:'s2',t:'Confirmar visita da equipe na quinta pela manhã',cli:'Helena Duarte',fonte:'Chat interno · há 2 h'},
 {id:'s3',t:'Rever posição da sala de cinema no projeto',cli:'Caio Ferraz',fonte:'Áudio transcrito · há 3 h'}];
const FLUXO=['Aberto','Aceito','Em andamento','Resolvido'];
const BANDS=['Atrasados','Vencem hoje','Próximos 7 dias','Mais tarde','Sem prazo','Resolvidos','Cancelados'];
const band=x=>x.status==='Cancelado'?'Cancelados':x.status==='Resolvido'?'Resolvidos':!x.prazo?'Sem prazo':dias(x.prazo)<0?'Atrasados':dias(x.prazo)===0?'Vencem hoje':dias(x.prazo)<=7?'Próximos 7 dias':'Mais tarde';
const NS={box:'0',st:'Ativos',q:''};
const inBox=x=>[x.resp===ME&&x.criador!==ME,x.resp===ME,x.colabs.includes(ME),x.criador===ME,true][+NS.box];
const stOk=x=>x.status==='Cancelado'?NS.st==='Cancelado':NS.st==='Ativos'?x.status!=='Resolvido':x.status===NS.st;
const nxList=()=>NX.filter(x=>inBox(x)&&stOk(x)&&(!NS.q||norm([x.titulo,x.cliente,x.resp,x.criador,x.desc].join(' ')).includes(norm(NS.q))));
const nxById=id=>NX.find(x=>x.id===id);
const flowHTML=x=>{const k=x.status==='Devolvido'?0:FLUXO.indexOf(x.status);
  return `<div class="cr-flow" role="img" aria-label="Fluxo: ${esc(x.status)}">${FLUXO.map((f,i)=>`<i class="${i<=k?(x.status==='Devolvido'?'dev':'on'):''}"></i>`).join('')}</div><div class="cr-flowl">${FLUXO.map((f,i)=>`<span class="${i===k?'on':''}">${f==='Em andamento'?'Andamento':f}</span>`).join('')}</div>`};

function nexoForm({base=null,cont=false,titulo,ok,onSave}){
  const b=base||{};
  return X.fsheet({title:titulo,ok,top:cont?'<p class="soft cx-p" style="margin:0 4px 16px">O Nexo original fica resolvido; este nasce ligado a ele.</p>':'',
    groups:[...(cont?[{title:'Continuidade',fields:[{k:'motivo',label:'Motivo (continuidade)',type:'textarea',req:true,ph:'Por que o trabalho continua?'}]}]:[]),
      {title:'Nexo',fields:[{k:'titulo',label:'Título',req:true,value:b.titulo||'',ph:'O que precisa ser feito'},{k:'desc',label:'Descrição',type:'textarea',value:b.desc||''}]},
      {title:'Quem e quando',fields:[{k:'resp',label:'Responsável',type:'select',opts:EQ,value:b.resp||'',ph:'Selecione'},{k:'prazo',label:'Prazo',type:'date',value:b.prazo||''},{k:'prio',label:'Prioridade',type:'select',opts:PRIOS,value:b.prio||'Média'}]},
      {title:'Colaboradores',checks:{k:'colabs',opts:EQ,value:b.colabs||[]}},
      {title:'Referência',fields:[{k:'cliente',label:'Cliente referente',type:'select',opts:CLIENTES,value:b.cliente||'',ph:'Nenhum'},{k:'parc',label:'Parceiros externos',type:'select',opts:PARCEIROS,value:b.parc||'',ph:'Nenhum'},{k:'vis',label:'Visibilidade',type:'select',opts:VIS,value:b.vis||VIS[0]}]},
      {title:'Anexos',foot:'Até 20 MB por arquivo.',fields:[{k:'anexo',label:'Anexar',type:'file'}]}],
    onOk:x=>{x.anexo=x.anexo?x.anexo.split(/[\\/]/).pop():'';onSave(x)}});
}
const salvarNovo=(x,extra={})=>{const n={id:'x'+Date.now(),titulo:x.titulo,desc:x.desc,status:'Aberto',prio:x.prio||'Média',prazo:x.prazo,resp:x.resp||ME,criador:ME,colabs:x.colabs||[],cliente:x.cliente,parc:x.parc,
  area:areaDe(ME),vis:x.vis||VIS[0],anexos:x.anexo?[x.anexo]:[],coms:[],hist:[stamp('Criado por '+ME+'.')],...extra};NX.unshift(n);return n};

const nxBody=()=>{const r=nxList(),nIgn=SUG.filter(s=>s.ign).length,L=SUG.filter(s=>!s.ign);
  const sug=K.group({title:`Sugestões da IA · ${L.length}`,foot:'Na dúvida, mantenha. Deslize para virar pendência ou ignorar.',
    rows:[...L.map(s=>({icon:'brilho',color:'#7858f8',title:`<span class="cx-2l">${esc(s.t)}</span>`,sub:`${esc(s.cli)} · ${esc(s.fonte)}`,act:'sug',i:s.id,
      swipe:[{label:'Virar pendência',icon:'mais',act:'virar',tone:1},{label:'Ignorar',icon:'x',act:'ignorar',tone:2}]})),
      ...(nIgn?[{icon:'relogio',color:'#8e8e93',title:`Ignoradas · ${nIgn}`,sub:'Recuperar uma sugestão',act:'verIgn'}]:[])],
    empty:'Sem sugestões novas. A IA lê o chat e as mensagens dos clientes e propõe Nexos aqui.'});
  if(!r.length)return sug+K.empty({title:'Nenhum Nexo por aqui.',text:'Troque a caixa, o status ou a busca.'});
  const ks=BANDS.filter(k=>r.some(x=>band(x)===k));
  return sug+ks.map(k=>{const g=r.filter(x=>band(x)===k);return K.group({title:`${k} · ${g.length}`,rows:g.map(x=>({icon:'trocar',color:TONE[PT[x.prio]],title:`<span class="cx-2l">${esc(x.titulo)}</span>`,
    sub:`${esc(x.status)} · ${esc(first(x.resp))}${x.colabs.length?' +'+x.colabs.length:''}${x.cliente?' · '+esc(x.cliente):''}`,
    value:x.prazo?`<span style="color:${k==='Atrasados'?TONE.r:k==='Vencem hoje'?TONE.w:'inherit'}">${rel(x.prazo)}</span>`:'—',href:'#/nexos?x='+x.id}))})}).join('')};

function nxDetalhe(x){
  const P={Aberto:['Aceitar','aceitar'],Devolvido:['Aceitar','aceitar'],Aceito:['Marcar em andamento','andamento'],'Em andamento':['Resolver','resolver'],Resolvido:['Dar continuidade','continuar'],Cancelado:['Reabrir','reabrir']}[x.status];
  const fim=['Resolvido','Cancelado'].includes(x.status), cid=x.cliente&&cidOf(x.cliente);
  return `${nav({title:'Nexo',back:'Nexos',large:false,acts:[{icon:'pontos',title:'Mais ações do Nexo',act:'mais'}]})}
   ${X.hd({kick:'Nexo · '+x.area,title:x.titulo,sub:`Criado por ${esc(x.criador)} · ${esc(x.cliente||'sem cliente')}`,
     chips:X.chip(x.status,NST[x.status])+X.chip(x.prio,PT[x.prio])+(x.prazo?X.chip(rel(x.prazo),toneP(x.prazo)):X.chip('Sem prazo','n'))})}
   <section class="mcard">${flowHTML(x)}</section>
   <div class="cx-acts"><span class="full">${K.btn(P[0],{act:P[1],pri:true})}</span>${fim?'':K.btn('Devolver',{act:'devolver'})+K.btn('Delegar',{act:'delegar'})}</div>
   ${x.devolvido&&x.status==='Devolvido'?X.text('Devolvido',`<p class="cr-warn">${esc(x.devolvido)}</p>`):''}
   ${x.desc?X.text('Descrição',`<p>${esc(x.desc)}</p>`):''}
   ${x.conclusao?X.text('Conclusão',`<p>${esc(x.conclusao)}</p>`):''}
   ${x.origem?X.text('Continuidade',`<p class="soft">Continua o Nexo “${esc(x.origem)}”. Motivo: ${esc(x.motivo||'')}</p>`):''}
   ${X.info('Dados',[['Responsável',esc(x.resp)],['Colaboradores',esc(x.colabs.join(', ')||'—')],['Prazo',x.prazo?br(x.prazo)+' · '+rel(x.prazo):'Sem prazo'],['Criado por',esc(x.criador)],['Área de origem',esc(x.area)],['Visibilidade',esc(x.vis)],x.parc?['Parceiro externo',esc(x.parc)]:null,['Cliente',esc(x.cliente||'—')]])}
   ${cid?K.group({rows:[{icon:'contatos',title:'Abrir ficha do cliente',sub:esc(x.cliente),href:'#/contatos?ficha='+cid}]}):''}
   ${K.group({title:'Anexos',rows:x.anexos.map((a,i)=>({icon:'propostas',color:'#5b6476',title:esc(a),act:'anexo',i})),empty:'Sem anexos.'})}
   ${X.lines('Histórico',histItems(x.hist).reverse())}
   ${X.lines('Comentários',x.coms.map(c=>({icon:X.ini(c.a),t:esc(c.t),s:`${esc(c.a)} · ${esc(c.q)}`})),'Nenhum comentário ainda.')}
   <form class="cx-cmp" id="crCom" style="margin:-12px 0 24px"><input id="crComI" placeholder="Escreva um comentário…" aria-label="Escreva um comentário" autocomplete="off" enterkeyhint="send"><button type="submit">Comentar</button></form>`;
}
function nxMountDet(v,x){
  const set=(st,t,msg)=>{x.status=st;x.hist.push(stamp(t));X.refresh();msg&&M.toast(msg)};
  M.wire(v,{
    aceitar:()=>set('Aceito','Aceito por '+ME+'.','Nexo aceito.'),
    andamento:()=>set('Em andamento','Marcado em andamento por '+ME+'.','Nexo em andamento.'),
    resolver:()=>X.fsheet({title:'Resolver Nexo',ok:'Resolver',cheia:false,groups:[{fields:[{k:'c',label:'Conclusão',type:'textarea',req:true,ph:'O que foi feito? Quem criou o Nexo recebe isto.'}]}],
      onOk:r=>{x.conclusao=r.c;set('Resolvido','Resolvido: '+r.c,'Nexo resolvido.')}}),
    reabrir:()=>set('Aberto','Reaberto por '+ME+'.','Nexo reaberto.'),
    continuar:()=>nexoForm({base:{...x,titulo:x.titulo+' (continuidade)',prazo:''},cont:true,titulo:'Dar continuidade',ok:'Criar',
      onSave:r=>{x.hist.push(stamp('Continuado em um novo Nexo.'));const n=salvarNovo(r,{origem:x.titulo,motivo:r.motivo});M.toast('Novo Nexo criado.');location.hash='#/nexos?x='+n.id}}),
    devolver:()=>X.motivo({title:'Devolver Nexo',label:'Motivo da devolução',ok:'Devolver',top:'<p class="soft cx-p" style="margin:0 4px 16px">Volta para quem criou, com o motivo.</p>',
      run:m=>{x.devolvido=m;set('Devolvido','Devolvido: '+m,'Nexo devolvido.')}}),
    delegar:()=>X.fsheet({title:'Delegar Nexo',ok:'Delegar',cheia:false,groups:[{fields:[{k:'para',label:'Para',type:'select',req:true,ph:'Escolha',opts:EQ.filter(n=>n!==x.resp)},{k:'motivo',label:'Motivo',type:'textarea'}]}],
      onOk:r=>{const de=x.resp;x.resp=r.para;x.status='Aberto';x.hist.push(stamp(`Delegado de ${de} para ${r.para}${r.motivo?': '+r.motivo:''}`));X.refresh();M.toast(`Nexo com ${first(r.para)} agora.`)}}),
    mais:()=>K.actions({title:x.titulo,items:[
      {label:'Editar',run:()=>nexoForm({base:x,titulo:'Editar Nexo',ok:'Salvar',onSave:r=>{Object.assign(x,{titulo:r.titulo,desc:r.desc,resp:r.resp||x.resp,prazo:r.prazo,prio:r.prio,colabs:r.colabs,cliente:r.cliente,parc:r.parc,vis:r.vis});
        if(r.anexo)x.anexos.push(r.anexo);x.hist.push(stamp('Editado por '+ME+'.'));X.refresh();M.toast('Nexo salvo.')}})},
      ...(x.status==='Cancelado'?[]:[{label:'Cancelar Nexo',dng:true,run:()=>X.motivo({title:'Cancelar Nexo',ok:'Cancelar Nexo',dng:true,top:'<p class="soft cx-p" style="margin:0 4px 16px">Ele sai das listas ativas; dá para ver no status “Cancelados”.</p>',
        run:m=>set('Cancelado','Cancelado: '+m,'Nexo cancelado.')})}]),
      {label:'Excluir',dng:true,run:()=>K.confirm({title:'Excluir Nexo?',text:'Some para todos os envolvidos.',ok:'Excluir',dng:true,run:()=>{const i=NX.indexOf(x);NX.splice(i,1);
        location.hash='#/nexos';M.toast('Nexo excluído.','Desfazer',()=>{NX.splice(i,0,x);X.refresh()})}})}]}),
    anexo:el=>M.toast(`Abre o arquivo ${x.anexos[+el.dataset.i]} (simulação).`)});
  $('#crCom',v).onsubmit=e=>{e.preventDefault();const i=$('#crComI',v),t=i.value.trim();if(!t)return i.focus();x.coms.push({a:ME,q:'agora',t});X.refresh();M.toast('Comentário enviado.')};
}

M.mscreen('nexos',{title:'Nexos',tab:'nexos',
  help:['Um Nexo é um pedido de trabalho para outra pessoa ou área, com prazo e cliente.','As caixas no topo separam o que chegou para você, o que você criou e onde é colaborador.','Abra um Nexo para avançar o fluxo: Aceitar, Em andamento e Resolver.'],
  render:q=>{const x=q.get('x')&&nxById(q.get('x'));if(x)return nxDetalhe(x);
    const rec=NX.filter(n=>n.resp===ME&&n.criador!==ME&&!['Resolvido','Cancelado'].includes(n.status)).length;
    return `${nav({title:'Nexos',sub:`Trabalho direcionado entre áreas e pessoas · ${rec} recebidos ativos`,acts:[{icon:'mais',title:'Novo Nexo',act:'novo'}]})}
     ${K.search('Buscar por título, cliente ou pessoa…','crNq')}
     ${K.chips('crBox',[['0','Recebidos'],['1','Meus'],['2','Sou colaborador'],['3','Criados por mim'],['4','Todos']],NS.box)}
     ${K.chips('crNst',['Ativos','Aberto','Aceito','Em andamento','Devolvido','Resolvido','Cancelado'].map(s=>[s,s==='Cancelado'?'Cancelados':s]),NS.st)}
     <div id="crNb">${nxBody()}</div>`},
  mount:(v,q)=>{const x=q.get('x')&&nxById(q.get('x'));if(x)return nxMountDet(v,x);
    const b=$('#crNb',v);
    const sug=id=>SUG.find(s=>s.id===id);
    const virar=s=>nexoForm({base:{titulo:s.t,cliente:s.cli,desc:'Sugerido pela IA a partir de: '+s.fonte},titulo:'Virar pendência',ok:'Criar',
      onSave:r=>{SUG.splice(SUG.indexOf(s),1);const n=salvarNovo(r);draw();M.toast('Pendência criada como Nexo.','Abrir',()=>location.hash='#/nexos?x='+n.id)}});
    const ignorar=s=>{s.ign=true;draw();M.toast('Sugestão ignorada.','Desfazer',()=>{s.ign=false;draw()})};
    const H={virar:el=>virar(sug(el.dataset.i)),ignorar:el=>ignorar(sug(el.dataset.i)),
      sug:el=>{const s=sug(el.dataset.i);K.actions({title:s.t,items:[{label:'Virar pendência',run:()=>virar(s)},{label:'Ignorar',run:()=>ignorar(s)}]})},
      verIgn:()=>K.actions({title:'Sugestões ignoradas',items:SUG.filter(s=>s.ign).map(s=>({label:'Recuperar: '+s.t,run:()=>{s.ign=false;draw();M.toast('Sugestão recuperada.')}}))})};
    const draw=()=>{b.innerHTML=nxBody();M.wire(b,H);K.bindSwipe(b)};
    M.wire(b,H);
    M.wire(v,{novo:()=>nexoForm({titulo:'Novo Nexo',ok:'Criar',onSave:r=>{const n=salvarNovo(r);draw();M.toast('Nexo criado.','Abrir',()=>location.hash='#/nexos?x='+n.id)}})});
    K.bindPick(v,'crBox',x=>{NS.box=x;draw()});K.bindPick(v,'crNst',x=>{NS.st=x;draw()});
    const qi=$('#crNq',v);qi.value=NS.q;qi.oninput=()=>{NS.q=qi.value.trim();draw()}}});

/* =====================================================================
   AGENDA
   ===================================================================== */
const TIPOS=['Visita técnica','Apresentação de proposta','Reunião com fornecedor','Reunião de projeto','Visita ao Showroom','Entrega de equipamentos','Visita de relacionamento'];
const TA={'Visita técnica':'Técnica','Apresentação de proposta':'Comercial','Reunião com fornecedor':'Administrativo','Reunião de projeto':'Projetos','Visita ao Showroom':'Comercial','Entrega de equipamentos':'Técnica','Visita de relacionamento':'Experiência'};
const AC={Comercial:'rgb(var(--primary))',Técnica:'rgb(var(--warn))',Projetos:'rgb(var(--pos))',Experiência:'#7858f8',Administrativo:'#5b6476'};
const RECURSOS=['Carro 1','Carro 2','Showroom','Kit de ferramentas','Escada 6 m'];
const CHECK=['Confirmar com o cliente','Conferir endereço e acesso','Separar equipamentos','Levar proposta ou projeto'];
const ST_T={Agendado:'b',Confirmado:'g',Remarcado:'w',Concluído:'n',Cancelado:'r'};
const ev=(id,d,i,f,tipo,com,resp,local,status,o={})=>({id,ini:d+'T'+i,fim:d+'T'+f,tipo,area:TA[tipo],com,cliente:CLIENTES.includes(com)?com:'',resp,local,status,recursos:[],parts:[],resumo:'',briefing:'',notas:'',check:[],rem:[],resultado:'',...o});
const EV=[
 ev('e0','2026-09-24','10:00','11:30','Visita técnica','Caio Ferraz','Bruno Lima','Rua Pium-í, 1200 · Cruzeiro','Concluído',{recursos:['Carro 1'],briefing:'Medir a sala de cinema e o rack.',resultado:'Medidas feitas; sala comporta 7.2.'}),
 ev('e1','2026-09-28','09:00','11:00','Visita técnica','Lívia Prates e Otávio Lemos','Bruno Lima','Residência Prates Lemos · Belvedere','Concluído',{recursos:['Carro 1','Kit de ferramentas'],parts:['Diego Rocha'],briefing:'Levantamento para o pré-projeto da segunda fase.',check:CHECK.slice(0,2),resultado:'Pontos de rede e de áudio definidos.'}),
 ev('e2','2026-09-28','14:00','15:30','Reunião de projeto','Lívia Prates e Otávio Lemos','Diego Rocha','Escritório Maestro','Concluído',{parts:['Allysson Moura','Marina Costa Arquitetura'],briefing:'Abrir o pré-projeto com a arquiteta.',resultado:'Ajustes de iluminação cênica pedidos.'}),
 ev('e3','2026-09-29','10:00','11:30','Visita técnica','Marcos Valente','Bruno Lima','Casa Valente · Pampulha','Concluído',{recursos:['Carro 2'],briefing:'Conferir a passagem da infra de rede.',resultado:'Infra liberada para cabeamento.'}),
 ev('e4','2026-09-30','10:00','11:00','Visita de relacionamento','Paula e Renato Lopes','Elisa Prado','Apartamento Savassi','Concluído',{briefing:'Três meses de entrega: ouvir a família.',resultado:'Pediram um treinamento extra do app.'}),
 ev('e5','2026-09-30','15:00','16:00','Apresentação de proposta','Rodrigo Alencar','Allysson Moura','Showroom','Concluído',{recursos:['Showroom'],resumo:'Rede e segurança · #1049',briefing:'Mostrar as duas opções; foco em câmeras.',resultado:'Pediu orçamento de mais 2 câmeras.'}),
 ev('e6','2026-10-01','08:00','12:00','Visita técnica','Helena Duarte','Bruno Lima','Residência Duarte · Cidade Jardim','Concluído',{recursos:['Carro 1','Escada 6 m'],parts:['Diego Rocha'],briefing:'Conferir a instalação elétrica da sala.',resultado:'Instalação elétrica da sala pronta.'}),
 ev('e7','2026-10-01','16:00','17:00','Reunião com fornecedor','Sonos Brasil','Diego Rocha','Online','Cancelado',{briefing:'Prazo de entrega do Arc e dos Era 300.',resultado:'Cancelado: o fornecedor remarcou para novembro.'}),
 ev('e8','2026-10-02','09:00','10:30','Visita técnica','Marcos Valente','Bruno Lima','Casa Valente · Pampulha','Confirmado',{recursos:['Carro 2','Kit de ferramentas'],briefing:'Início do cabeamento da infra de rede.',check:CHECK.slice(0,3)}),
 ev('e9','2026-10-02','11:30','12:30','Apresentação de proposta','Paula e Renato Lopes','Allysson Moura','Showroom','Agendado',{recursos:['Showroom'],resumo:'Automação · apartamento',briefing:'Apresentar as opções Essencial e Completa.',check:[CHECK[0],CHECK[3]]}),
 ev('e10','2026-10-02','15:00','16:00','Reunião com fornecedor','Luminar Sul','Diego Rocha','Luminar Sul · Barro Preto','Confirmado',{briefing:'Confirmar o pedido 112 e o prazo das fitas LED.'}),
 ev('e11','2026-10-02','17:30','18:30','Entrega de equipamentos','Helena Duarte','Bruno Lima','Residência Duarte · Cidade Jardim','Agendado',{recursos:['Carro 2'],briefing:'Entregar Sonos Amp e controlador CORE 5.',check:CHECK.slice(1,3)}),
 ev('e12','2026-10-03','10:00','11:00','Visita ao Showroom','Caio Ferraz','Felipe Nunes','Showroom','Agendado',{recursos:['Showroom'],briefing:'Ouvir o 7.2 na sala de demonstração.'}),
 ev('e13','2026-10-06','14:00','15:00','Apresentação de proposta','Sérgio Bastos','Allysson Moura','Showroom','Remarcado',{recursos:['Showroom'],resumo:'Automação residencial · #1051',briefing:'Fechar a opção Completa.',rem:[{q:'29/09',t:'De 29/09 16:00 para 06/10 14:00: cliente em viagem.'}]}),
 ev('e14','2026-10-08','14:00','15:30','Reunião de projeto','Lívia Prates e Otávio Lemos','Diego Rocha','Escritório Maestro','Agendado',{parts:['Marina Costa Arquitetura'],briefing:'Pré-projeto v3 com a planta de iluminação.'})];
const hm=s=>s.slice(11,16), mins=s=>+s.slice(11,13)*60+ +s.slice(14,16);
const dur=e=>{const m=mins(e.fim)-mins(e.ini);return `${Math.floor(m/60)?Math.floor(m/60)+' h':''}${m%60?' '+m%60+' min':''}`.trim()};
const longo=d=>{const s=dt(d).toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'});return s[0].toUpperCase()+s.slice(1)};
const WD=['dom','seg','ter','qua','qui','sex','sáb'];
const GS={dia:HOJE,at:''};
const atOk=e=>!GS.at||(GS.at==='meus'?e.resp===ME:GS.at==='show'?(e.recursos.includes('Showroom')||e.local==='Showroom'):e.area==='Técnica');
const evDia=d=>EV.filter(e=>e.ini.slice(0,10)===d&&atOk(e)).sort((a,b)=>a.ini.localeCompare(b.ini));
const evById=id=>EV.find(e=>e.id===id);
const diasStrip=()=>{const a=addD(mon(HOJE),-14),out=[];for(let i=0;i<42;i++){const d=addD(a,i);if(i&&i%7===0)out.push(`<span class="sem" aria-hidden="true">sem ${br(d)}</span>`);
  const n=EV.some(e=>e.ini.slice(0,10)===d&&atOk(e));
  out.push(`<button type="button" data-d="${d}" class="${d===HOJE?'hoje':''}" aria-pressed="${d===GS.dia}" aria-label="${esc(longo(d))}${n?', com eventos':''}"><span class="w">${WD[dt(d).getDay()]}</span><span class="n">${+d.slice(8,10)}</span><span class="p ${n?'on':''}"></span></button>`)}
  return `<div class="cr-days" id="crDias" role="group" aria-label="Dias">${out.join('')}</div>`};
const agBody=()=>{const L=evDia(GS.dia);
  return K.group({title:longo(GS.dia)+(GS.dia===HOJE?' · hoje':''),rows:L.map(e=>({icon:hm(e.ini),color:e.status==='Cancelado'?'#8e8e93':AC[e.area],title:esc(e.tipo),
    sub:`${esc(e.com)} · ${esc(e.local)}`,value:`<span style="color:${TONE[ST_T[e.status]]}">${esc(e.status)}</span>`,href:'#/agenda?e='+e.id})),
    empty:'Nada agendado neste dia. Toque em + para agendar.'})};

const agForm=({base=null,d=GS.dia,onSave})=>{const b=base||{},ed=!!base;let s;
  s=X.fsheet({title:ed?'Editar agendamento':'Novo agendamento',ok:ed?'Salvar':'Agendar',
    groups:[{title:'Agendamento',fields:[{k:'tipo',label:'Tipo',type:'select',opts:TIPOS,req:true,ph:'Selecione',value:b.tipo||''},{k:'cliente',label:'Cliente',type:'select',opts:CLIENTES,ph:'Sem cliente',value:b.cliente||''},
        {k:'resp',label:'Responsável',type:'select',opts:EQ,req:true,value:b.resp||ME},{k:'local',label:'Local',req:true,ph:'Endereço, Showroom ou Online',value:b.local||''}]},
      {title:'Quando',fields:[{k:'data',label:'Data',type:'date',req:true,value:b.ini?b.ini.slice(0,10):d},{k:'ini',label:'Início',type:'time',req:true,value:b.ini?hm(b.ini):'09:00'},{k:'fim',label:'Término',type:'time',req:true,value:b.fim?hm(b.fim):'10:00'}]},
      {title:'Recursos',checks:{k:'recursos',opts:RECURSOS,value:b.recursos||[]}},
      {title:'Detalhes',fields:[{k:'resumo',label:'Resumo',ph:'Uma linha na agenda',value:b.resumo||''},{k:'briefing',label:'Briefing',type:'textarea',req:true,ph:'O que a equipe precisa saber antes de ir',value:b.briefing||''},{k:'notas',label:'Notas internas',type:'textarea',value:b.notas||''}]},
      {title:'Checklist de preparação',checks:{k:'check',opts:CHECK,req:true,value:b.check||[]}},
      ...(ed?[{title:'Remarcação',foot:'Obrigatório se mudar a data ou o horário.',fields:[{k:'motivoRem',label:'Motivo da remarcação',type:'textarea'}]}]:[])],
    onOk:x=>{if(x.fim<=x.ini){M.toast('O término precisa ser depois do início.');return false}
      const mudou=ed&&(x.data!==b.ini.slice(0,10)||x.ini!==hm(b.ini)||x.fim!==hm(b.fim));
      if(mudou&&!x.motivoRem){M.toast('Informe o motivo da remarcação.');$('[name="motivoRem"]',s.el).focus();return false}
      const choque=EV.find(e=>e!==base&&e.status!=='Cancelado'&&e.resp===x.resp&&e.ini.slice(0,10)===x.data&&hm(e.ini)<x.fim&&hm(e.fim)>x.ini);
      const go=()=>{onSave(x,mudou);s.close()};
      if(choque){K.confirm({title:`Conflito de horário — ${x.resp} já tem ${choque.tipo} com ${choque.com} das ${hm(choque.ini)} às ${hm(choque.fim)}.`,ok:'Agendar mesmo assim',run:go});return false}
      go();return false}});
  return s};
const agNovo=()=>agForm({onSave:x=>{const e=ev('e'+Date.now(),x.data,x.ini,x.fim,x.tipo,x.cliente||x.resumo||x.tipo,x.resp,x.local,'Agendado',{recursos:x.recursos,resumo:x.resumo,briefing:x.briefing,notas:x.notas,check:x.check});
  EV.push(e);GS.dia=x.data;X.refresh();M.toast(`Agendado: ${x.tipo} em ${br(x.data)} às ${x.ini}.`)}});

function agDetalhe(e){const fim=['Concluído','Cancelado'].includes(e.status),cid=e.cliente&&cidOf(e.cliente);
  return `${nav({title:'Evento',back:'Agenda',large:false,acts:[{icon:'pontos',title:'Mais ações do evento',act:'mais'}]})}
   ${X.hd({kick:`${e.tipo} · ${e.area}`,title:e.com,sub:`${esc(longo(e.ini.slice(0,10)))} · ${hm(e.ini)}–${hm(e.fim)}`,chips:X.chip(e.status,ST_T[e.status])})}
   <div class="cx-acts">${fim?`<span class="full">${K.btn('Editar',{act:'editar'})}</span>`:`<span class="full">${K.btn('Concluir',{act:'concluir',pri:true,icon:'check'})}</span>${K.btn('Editar',{act:'editar'})}${K.btn('Cancelar',{act:'cancelar',dng:true})}`}</div>
   ${X.info('Dados',[['Quando',`${br(e.ini)} · ${hm(e.ini)}–${hm(e.fim)}`],['Duração',dur(e)],['Local',esc(e.local)],['Responsável',esc(e.resp)],['Recursos',esc(e.recursos.join(', ')||'—')],['Participantes',esc(e.parts.join(', ')||'—')]])}
   ${cid?K.group({rows:[{icon:'contatos',title:'Abrir ficha do cliente',sub:esc(e.cliente),href:'#/contatos?ficha='+cid}]}):''}
   ${e.resumo?X.text('Resumo',`<p>${esc(e.resumo)}</p>`):''}
   ${X.text('Briefing',`<p>${esc(e.briefing||'—')}</p>`)}
   ${e.notas?X.text('Notas internas',`<p class="soft">${esc(e.notas)}</p>`):''}
   ${X.lines('Checklist de preparação',CHECK.map(c=>({icon:e.check.includes(c)?'check':'relogio',color:e.check.includes(c)?TONE.g:'#8e8e93',t:esc(c),s:e.check.includes(c)?'Feito':'Pendente'})))}
   ${X.lines('Histórico de remarcações',histItems(e.rem),'Sem remarcações.')}
   ${e.resultado?X.text(e.status==='Cancelado'?'Cancelamento':'Resultado',`<p>${esc(e.resultado)}</p>`):''}`}
function agMountDet(v,e){
  M.wire(v,{
    editar:()=>agForm({base:e,onSave:(x,mudou)=>{if(mudou){e.rem.push(stamp(`De ${br(e.ini)} ${hm(e.ini)} para ${br(x.data)} ${x.ini}: ${x.motivoRem}`));e.status='Remarcado'}
      Object.assign(e,{ini:x.data+'T'+x.ini,fim:x.data+'T'+x.fim,tipo:x.tipo,area:TA[x.tipo],cliente:x.cliente,com:x.cliente||e.com,resp:x.resp,local:x.local,recursos:x.recursos,resumo:x.resumo,briefing:x.briefing,notas:x.notas,check:x.check});
      X.refresh();M.toast(mudou?'Evento remarcado.':'Evento salvo.')}}),
    cancelar:()=>X.motivo({title:'Cancelar evento',ok:'Cancelar evento',dng:true,top:`<p class="soft cx-p" style="margin:0 4px 16px">${esc(e.tipo)} · ${esc(e.com)} · ${br(e.ini)} ${hm(e.ini)}</p>`,
      run:m=>{e.status='Cancelado';e.resultado='Cancelado: '+m;X.refresh();M.toast('Evento cancelado.')}}),
    concluir:()=>X.fsheet({title:'Concluir evento',ok:'Concluir',cheia:false,groups:[{fields:[{k:'res',label:'Resultado',type:'textarea',req:true,ph:'Como foi? Fica no histórico do cliente.'}]}],
      onOk:r=>{e.status='Concluído';e.resultado=r.res;X.refresh();M.toast('Evento concluído.')}}),
    mais:()=>K.actions({title:`${e.tipo} · ${e.com}`,items:[{label:'Ver na agenda',run:()=>{GS.dia=e.ini.slice(0,10);location.hash='#/agenda'}},{label:'Editar',run:()=>v.querySelector('[data-act="editar"]').click()}]})});
}

M.mscreen('agenda',{title:'Agenda',tab:'agenda',
  help:['Deslize a faixa de dias e toque num dia para ver o que está marcado.','Toque num evento para ver briefing e checklist; dali dá para Editar, Cancelar ou Concluir.','Mudar a data ou o horário pede o motivo da remarcação.'],
  render:q=>{const e=q.get('e')&&evById(q.get('e'));if(e)return agDetalhe(e);
    return `${nav({title:'Agenda',sub:'Tudo que está agendado pelo Maestro.',acts:[{text:'Hoje',title:'Ir para hoje',act:'hoje'},{icon:'mais',title:'Novo agendamento',act:'novo'}]})}
     ${diasStrip()}
     ${K.chips('crAt',[['','Todos'],['meus','Meus'],['show','Showroom'],['tec','Técnicos']],GS.at)}
     <div id="crGb">${agBody()}</div>`},
  mount:(v,q)=>{const e=q.get('e')&&evById(q.get('e'));if(e)return agMountDet(v,e);
    const b=$('#crGb',v),strip=$('#crDias',v);
    const center=(smooth)=>{const s=$('[aria-pressed="true"]',strip);if(s)strip.scrollTo({left:s.offsetLeft-strip.clientWidth/2+s.offsetWidth/2,behavior:smooth?'smooth':'auto'})};
    const draw=()=>{b.innerHTML=agBody();M.wire(b,{})};
    const bindDias=()=>$$('button',strip).forEach(x=>x.onclick=()=>{GS.dia=x.dataset.d;$$('button',strip).forEach(y=>y.setAttribute('aria-pressed',y===x));draw();center(true)});
    bindDias();center(false);
    M.wire(v,{novo:agNovo,hoje:()=>{GS.dia=HOJE;$$('button',strip).forEach(y=>y.setAttribute('aria-pressed',y.dataset.d===HOJE));draw();center(true)}});
    /* atalho muda a lista e os pontinhos dos dias: repinta a tela no mesmo lugar */
    K.bindPick(v,'crAt',x=>{GS.at=x;X.refresh()})}});

/* =====================================================================
   CHAT (sempre ligado a um cliente)
   ===================================================================== */
const CONV=[
 {id:'k1',cliente:'Helena Duarte',parts:['Bruno Lima','Diego Rocha',ME],novas:1,quando:'há 2 h',msgs:[
   {a:'Diego Rocha',h:'09:12',t:'Bom dia! A instalação elétrica da sala ficou pronta ontem.'},
   {a:ME,h:'09:20',t:'Ótimo. Já dá para marcar a entrega dos equipamentos?'},
   {a:'Bruno Lima',h:'10:05',t:'A Helena perguntou: “Conseguem vir quinta pela manhã?”'}],
  old:[{a:'Bruno Lima',h:'30/09',t:'Subi as fotos da instalação no relatório 12.'},{a:'Diego Rocha',h:'30/09',t:'Perfeito, obrigado.'}]},
 {id:'k2',cliente:'Marcos Valente',parts:['Diego Rocha','Bruno Lima',ME],novas:1,quando:'há 1 h',msgs:[
   {a:'Bruno Lima',h:'08:30',t:'Começamos o cabeamento hoje às 9h.'},
   {a:'Diego Rocha',h:'11:02',t:'Abri um Nexo para conferir a lista de compras da infra de rede antes do pedido.'}],old:[]},
 {id:'k3',cliente:'Sérgio Bastos',parts:['Felipe Nunes',ME],novas:0,quando:'há 50 min',msgs:[
   {a:'Felipe Nunes',h:'10:40',t:'Ele abriu a proposta #1051 pela 3ª vez hoje.'},
   {a:ME,h:'10:44',t:'Vou ligar para confirmar a apresentação de terça.'}],old:[]},
 {id:'k4',cliente:'Lívia Prates e Otávio Lemos',parts:['Elisa Prado','Diego Rocha',ME],novas:0,quando:'ontem',msgs:[
   {a:'Diego Rocha',h:'ontem',t:'A arquiteta pediu a planta de iluminação atualizada.'},
   {a:'Elisa Prado',h:'ontem',t:'Aviso a família que a reunião do dia 8 está confirmada.'}],old:[]},
 {id:'k5',cliente:'Sushi Yoru Bar',parts:['Felipe Nunes',ME],novas:0,quando:'há 3 dias',msgs:[
   {a:'Felipe Nunes',h:'29/09',t:'Lead novo pelo site: som ambiente em 3 zonas.'}],old:[]}];
const CS={q:''};
const convById=id=>CONV.find(c=>c.id===id);
/* usado pelo negócio e pela ficha ("Chat desta entidade"): abre a conversa do cliente, criando se não existir */
M.mchatCliente=nome=>{let c=CONV.find(k=>k.cliente===nome);if(!c){c={id:'k'+Date.now(),cliente:nome,parts:[ME],novas:0,quando:'agora',msgs:[],old:[]};CONV.unshift(c)}location.hash='#/chat?c='+c.id};
const chatBody=()=>{const L=CONV.filter(c=>!CS.q||norm(c.cliente+' '+c.parts.join(' ')).includes(norm(CS.q)));
  if(!L.length)return K.empty({title:CS.q?'Nenhum resultado.':'Nenhuma conversa.',text:CS.q?'Busque por outro cliente ou colega.':'Toque em + para começar.'});
  return K.group({rows:L.map(c=>{const u=c.msgs[c.msgs.length-1];return {icon:X.ini(c.cliente),color:'rgb(var(--primary))',title:esc(c.cliente),
    sub:u?(u.sys?esc(u.t):`${esc(first(u.a))}: ${esc(u.t)}`):`${c.parts.length} participantes · sem mensagens`,
    value:`<span style="font-size:13px">${esc(c.quando)}</span>`,value2:c.novas?`<span class="cr-novas">${c.novas} ${c.novas>1?'novas':'nova'}</span>`:undefined,href:'#/chat?c='+c.id}})})};
const msgHTML=c=>`${c.old.length?`<button type="button" class="cr-more" data-act="maisMsg">Carregar mais</button>`:'<div class="cr-sys">· início da conversa ·</div>'}
  ${c.msgs.map(m=>m.sys?`<div class="cr-sys">${esc(m.t)}</div>`:m.a===ME?`<div class="cr-who me">${esc(m.h)}</div><div class="bubble me">${esc(m.t)}</div>`:`<div class="cr-who">${esc(m.a)} · ${esc(m.h)}</div><div class="bubble ot">${esc(m.t)}</div>`).join('')}`;
const novaConversa=()=>X.fsheet({title:'Nova conversa',ok:'Abrir',top:'<p class="soft cx-p" style="margin:0 4px 16px">Toda conversa fica ligada a um cliente.</p>',
  groups:[{fields:[{k:'cliente',label:'Cliente',type:'select',opts:CLIENTES,req:true,ph:'Escolha'}]},{title:'Convidar colegas (opcional)',checks:{k:'p',opts:EQ.filter(n=>n!==ME)}}],
  onOk:x=>{let c=CONV.find(k=>k.cliente===x.cliente);
    if(c){x.p.forEach(n=>{if(!c.parts.includes(n))c.parts.push(n)});M.toast('Já existia uma conversa deste cliente: abrimos ela.')}
    else{c={id:'k'+Date.now(),cliente:x.cliente,parts:[...x.p,ME],novas:0,quando:'agora',msgs:[],old:[]};CONV.unshift(c)}
    location.hash='#/chat?c='+c.id}});

M.mscreen('chat',{title:'Chat',tab:'chat',
  help:['Chat interno da equipe: toda conversa fica ligada a um cliente.','Toque numa conversa para abrir; escreva embaixo e toque em enviar (ou Enter).','Use + para começar uma conversa nova e convidar colegas.'],
  render:q=>{const c=q.get('c')&&convById(q.get('c'));
    if(c){c.novas=0;
      return `${nav({title:c.cliente,back:'Chat',large:false,acts:[{icon:'mais',title:'Convidar colegas',act:'convidar'}]})}
       <p class="cr-parts">${esc(c.parts.join(', '))}</p>
       <div class="cr-msgs" id="crMsgs" aria-live="polite">${msgHTML(c)}</div>
       <form class="cr-comp" id="crComp"><input id="crMsg" placeholder="Escreva uma mensagem…" aria-label="Escreva uma mensagem" autocomplete="off" enterkeyhint="send"><button type="submit" aria-label="Enviar">${ic('enviar',20)}</button></form>`}
    const n=CONV.reduce((a,c)=>a+c.novas,0);
    return `${nav({title:'Chat',sub:n?`${n} ${n>1?'novas':'nova'} · ${CONV.length} conversas`:`${CONV.length} conversas`,acts:[{icon:'mais',title:'Nova conversa',act:'nova'}]})}
     ${K.search('Buscar cliente ou colega…','crCq')}<div id="crCb">${chatBody()}</div>`},
  mount:(v,q)=>{const c=q.get('c')&&convById(q.get('c'));
    if(c){const ms=$('#crMsgs',v),inp=$('#crMsg',v),fim=()=>scrollTo(0,document.documentElement.scrollHeight);
      const H={maisMsg:()=>{c.msgs=[...c.old,...c.msgs];c.old=[];ms.innerHTML=msgHTML(c);M.wire(ms,H);scrollTo(0,0)},
        convidar:()=>{const fora=EQ.filter(n=>!c.parts.includes(n));if(!fora.length)return M.toast('Toda a equipe já está nesta conversa.');
          X.fsheet({title:'Convidar colegas',ok:'Convidar',cheia:false,groups:[{title:c.cliente,checks:{k:'p',opts:fora,req:true}}],
            onOk:x=>{c.parts.push(...x.p);x.p.forEach(n=>c.msgs.push({sys:true,t:`${n} entrou na conversa`}));X.refresh();fim();M.toast(`${x.p.length>1?x.p.length+' colegas convidados':first(x.p[0])+' convidado'}.`)}})}};
      M.wire(v,H);
      $('#crComp',v).onsubmit=e=>{e.preventDefault();const t=inp.value.trim();if(!t)return inp.focus();const h=agora();
        c.msgs.push({a:ME,h,t});c.quando='agora';CONV.splice(CONV.indexOf(c),1);CONV.unshift(c);
        ms.insertAdjacentHTML('beforeend',`<div class="cr-who me">${h}</div><div class="bubble me">${esc(t)}</div>`);inp.value='';inp.focus();fim()};
      requestAnimationFrame(fim);return}
    const b=$('#crCb',v);M.wire(v,{nova:novaConversa});
    const qi=$('#crCq',v);qi.value=CS.q;qi.oninput=()=>{CS.q=qi.value.trim();b.innerHTML=chatBody()}}});
})();

/* Maestro OS · protótipo · módulo Rotina: Atividades, Nexos, Agenda e Chat (drawer)
   Fonte dos rótulos: inventario/03 (o código do sistema, lido em 02/10/2026).
   Estado em memória: concluir, adiar, delegar, mudar status, agendar e enviar mensagem mudam a tela de verdade. */
(function(){
const {ic,$,$$,esc}=M, U=M.ui, D=M.D;

/* ---------- CSS próprio (prefixo rt-, medidas em múltiplos de 4, cores do tema) ---------- */
document.head.insertAdjacentHTML('beforeend',`<style id="rt-css">
.rt-ell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.rt-done{border-radius:999px;color:var(--faint)}
.rt-done:hover{color:rgb(var(--pos))}
.rt-done[aria-pressed="true"]{color:rgb(var(--pos));background:rgb(var(--pos)/.12)}
.rt-tt{font-weight:600;max-width:320px;overflow:hidden;text-overflow:ellipsis}
.rt-sub{font-size:12px;color:var(--soft);margin-top:4px;max-width:320px;overflow:hidden;text-overflow:ellipsis}
.rt-acts{display:grid;grid-template-columns:repeat(3,96px);gap:8px;justify-content:end;align-items:center}
.rt-acts .rt-more{display:none}
#rtCorpo{container-type:inline-size}
@container (max-width:1379px){.rt-acts{grid-template-columns:96px 36px}.rt-acts .rt-wide{display:none}.rt-acts .rt-more{display:inline-flex}}
.rt-bulk{display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px;padding:12px 12px 12px 24px;margin-bottom:16px}
.rt-bulk>.lbl{flex:1 1 240px}
.rt-bulk .btnrow{width:min(456px,100%);grid-auto-flow:column;grid-template-columns:none}
.grid.rt-nxg{grid-template-columns:repeat(auto-fill,minmax(min(320px,100%),1fr))}
.rt-flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px}
.rt-flow i{display:block;height:4px;border-radius:4px;background:color-mix(in srgb,var(--text) 10%,transparent)}
.rt-flow i.on{background:rgb(var(--primary))}
.rt-flow i.dev{background:rgb(var(--warn))}
.rt-flowl{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;margin-top:4px;font-size:11px;color:var(--faint)}
.rt-flowl span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rt-nexo{display:flex;flex-direction:column;align-items:stretch;gap:12px;width:100%;border:0;text-align:left;color:inherit;font:inherit;cursor:pointer;transition:transform .2s var(--ease)}
.rt-nexo:hover{transform:translateY(-2px)}
.rt-meta{display:flex;flex-wrap:wrap;gap:8px 16px;font-size:12px;color:var(--soft)}
.rt-meta span{display:inline-flex;align-items:center;gap:4px}
.rt-sug{display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px;padding:12px 12px 12px 16px;border-radius:16px}
.rt-sug>div:nth-child(2){flex:1 1 200px}
.rt-sug>.btnrow{margin-left:auto;max-width:100%}
.rt-grp{display:flex;align-items:center;gap:12px;height:36px;margin-bottom:16px}
.rt-grp h2{margin:0;font-size:16px;font-weight:600}
.rt-filt{position:sticky;top:88px;max-height:calc(100vh - 216px);overflow:auto;overscroll-behavior:contain}
.rt-fh{display:flex;align-items:center;gap:12px;min-height:36px;margin-bottom:16px}
.rt-fh h2{margin:0;font-size:16px;font-weight:600}
.rt-filt .rt-ftog{display:none}
.rt-fb section+section{margin-top:24px}
.rt-filt h3{margin:0 0 12px;font-size:13px;font-weight:600;color:var(--soft)}
.rt-filt .checks{display:grid;grid-template-columns:minmax(0,1fr);gap:8px}
.rt-filt .checks.rt-ck2{grid-template-columns:repeat(auto-fill,minmax(108px,1fr))}
.rt-filt .checks label{min-width:0}
.rt-filt .select{height:36px;border-radius:10px}
.rt-filt .btn[aria-pressed="true"]{background:rgb(var(--primary)/.12);color:rgb(var(--primary))}
.rt-legend{display:flex;flex-wrap:wrap;gap:8px 16px}
.rt-legend span{display:inline-flex;align-items:center;gap:8px;font-size:12px;color:var(--soft)}
.rt-nav{display:flex;align-items:center;gap:12px;min-width:0}
.lat-side .rt-nav>.btn:first-child{flex:1}
#rtPer{overflow:hidden;text-overflow:ellipsis;min-width:0;max-width:100%}
.rt-calsc{overflow-x:auto}
.rt-calin .hh,.rt-calh>.rt-hc{position:sticky;left:0;z-index:2;background:var(--panel)}
.rt-evl{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rt-mn{display:none}
.rt-calh{display:grid;grid-template-columns:64px repeat(7,minmax(0,1fr));border-top:1px solid var(--line-2)}
.rt-calh>div{height:56px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:12px;color:var(--soft);border-left:1px solid var(--line-2)}
.rt-calh>div:first-child{border-left:0}
.rt-calh b{font-size:17px;font-weight:600;color:var(--text);line-height:24px}
.rt-calh .rt-hoje b,.rt-today{color:rgb(var(--primary))!important;font-weight:700}
.cal .cell.rt-cell{cursor:pointer;transition:background .2s var(--ease)}
.cal .cell.rt-cell:hover{background:rgb(var(--primary)/.05)}
.cal .ev.rt-ev{border:0;text-align:left;font:inherit;font-size:12px}
.cal .ev.rt-ok{opacity:.72}
.cal .ev.rt-x{opacity:.45;text-decoration:line-through}
.rt-month{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));border-top:1px solid var(--line-2)}
.rt-wd{height:40px;display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--soft);font-weight:600}
.rt-mday{min-height:112px;border:0;border-top:1px solid var(--line-2);border-left:1px solid var(--line-2);background:transparent;padding:8px 12px;text-align:left;display:flex;flex-direction:column;align-items:flex-start;gap:8px;color:inherit;font:inherit;cursor:pointer}
.rt-mday:nth-child(7n+8){border-left:0}
.rt-mday:hover{background:rgb(var(--primary)/.05)}
.rt-mday.rt-out{opacity:.45}
.rt-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.rt-list li{display:flex;align-items:flex-start;gap:12px;font-size:14px}
.rt-list .lbl{font-size:12px}
.rt-chat{grid-template-rows:minmax(0,1fr)}
.rt-cl{display:flex;flex-direction:column;min-height:0;border-right:1px solid var(--line-2)}
.rt-chh{display:flex;flex-direction:column;gap:12px;padding:24px 16px 12px}
.rt-chh h2{margin:0;font-size:17px;font-weight:700}
.rt-clist{flex:1;overflow:auto;list-style:none;margin:0;padding:4px 8px 16px}
.rt-ci{display:flex;align-items:flex-start;gap:12px;width:100%;border:0;background:transparent;padding:12px 8px;border-radius:12px;text-align:left;color:inherit;font:inherit;cursor:pointer}
.rt-ci:hover{background:color-mix(in srgb,var(--text) 4%,transparent)}
.rt-ci[aria-current="true"]{background:rgb(var(--primary)/.1)}
.rt-cv{display:flex;flex-direction:column;min-width:0;min-height:0}
.rt-cvh{display:flex;align-items:center;gap:12px;min-height:76px;padding:16px 16px 16px 24px;border-bottom:1px solid var(--line-2)}
.rt-msgs{flex:1;overflow:auto;padding:16px 24px;display:flex;flex-direction:column;align-items:flex-start;gap:4px}
.rt-who{align-self:stretch;font-size:12px;color:var(--soft);margin-top:12px}
.rt-who.rt-me{text-align:right}
.rt-sys{align-self:stretch;text-align:center;font-size:12px;color:var(--faint);margin:8px 0}
.rt-cvf{display:flex;gap:12px;padding:16px 24px;border-top:1px solid var(--line-2)}
.rt-cvf .input{flex:1}
@media (max-width:900px){
 #rtQ,#rtNq{width:auto!important;flex:1 1 220px}
 .row:has(>#rtQ)>.spacer,.row:has(>#rtNq)>.spacer,.row:has(>#rtGrp)>.spacer,.row:has(>#rtEtapas)>.spacer{display:none}
 #rtGrp,#rtOrd{width:auto!important;flex:1 1 200px}
 #rtVisao,#rtEsc,#rtView,#rtEtapas{width:100%!important}
 #rtAreas,#rtNst{width:100%!important;height:auto;grid-auto-flow:row;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));grid-auto-rows:36px}
 .rt-sug>.btnrow{width:100%!important;margin-left:0}
 .rt-bulk>b{flex:1}
 .rt-bulk>.btn{order:1}
 .rt-bulk>.lbl{order:2;flex-basis:100%}
 .rt-bulk>.btnrow{order:3;width:100%}
}
@media (max-width:767px){
 .rt-mday{min-height:64px;padding:8px 4px;align-items:center;gap:4px}
 .rt-mday>.chip,.rt-mday>.lbl{display:none}
 .rt-mn{display:grid;place-items:center;min-width:20px;height:20px;padding:0 4px;border-radius:999px;font-size:11px;font-weight:700;color:rgb(var(--primary));background:rgb(var(--primary)/.13)}
}
.rt-mob{display:none!important}
@media (max-width:900px){.rt-chat .rt-desk{display:none!important}}
@media (max-width:900px){
 .rt-chat .rt-mob{display:inline-flex!important}
 .rt-chat.rt-lista .rt-cl{display:flex!important;border-right:0}
 .rt-chat.rt-lista .rt-cv{display:none}
 .rt-cvh{padding:12px 16px;min-height:64px}
 .rt-msgs,.rt-cvf{padding-left:16px;padding-right:16px}
 .bubble{max-width:85%}
}
${(()=>{const C=p=>`${p} .rt-filt{position:static;max-height:none;overflow:visible;grid-column:1/-1!important}
${p} .rt-ag>.s9{grid-column:1/-1!important}
${p} .rt-filt .rt-ftog{display:inline-flex}
${p} .rt-fh{margin-bottom:0}
${p} .rt-filt.rt-open .rt-fh{margin-bottom:16px}
${p} .rt-filt:not(.rt-open) .rt-fb{display:none}
${p} .rt-fb{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:24px}
${p} .rt-fb section+section{margin-top:0}`;
  return `@media (max-width:1180px){${C('html')}}\n${C('[data-layout="coluna"]')}\n${C('[data-layout="lateral"]')}`})()}
</style>`);

/* ---------- utilidades ---------- */
const ME='Allysson Moura';
const EQ=D.equipe.map(u=>u.nome);
const AREAS=['Comercial','Projetos','Técnica','Experiência','Administrativo'];
const HOJE=D.hoje;
const MES=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const WD=['seg','ter','qua','qui','sex','sáb','dom'];
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
/* segmentado com largura própria (mesma marcação do kit; ligado por U.bindSeg) */
const sg=(id,opts,on,label,w,cls='ctl')=>`<div class="seg ${cls}" id="${id}" role="group" aria-label="${esc(label)}" style="width:${w||opts.length*112}px">${opts.map(([v,l])=>`<button type="button" data-v="${esc(v)}" aria-pressed="${v===on}">${esc(l)}</button>`).join('')}</div>`;
const setSeg=(root,id,val)=>$$(`#${id} button`,root).forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===val));
/* modais abertos por cima de painel lateral ou do chat ficam acima deles */
const lift=m=>{if(m&&m.el){m.el.style.zIndex=78;const o=m.el.previousElementSibling;if(o&&o.classList.contains('ovl'))o.style.zIndex=77}return m};
const mm=o=>lift(M.modal(o));
const cf=o=>lift(M.confirm(o));
const kv=(k,v)=>`<div class="kv"><span>${esc(k)}</span><b class="rt-ell" style="max-width:60%">${v}</b></div>`;
const sec=(t,h)=>`<div class="sec"><h3>${esc(t)}</h3>${h}</div>`;
const hist=arr=>arr&&arr.length?`<ul class="rt-list">${arr.map(h=>`<li><span class="lbl num" style="width:88px;flex:none">${esc(h.q)}</span><span>${esc(h.t)}</span></li>`).join('')}</ul>`:'<p class="lbl" style="margin:0">Sem registros ainda.</p>';
const stamp=t=>({q:'Hoje '+agora(),t});
/* acrescenta classe própria a um botão do kit */
const cls=(h,c)=>h.replace('class="btn','class="btn '+c);

/* =====================================================================
   ATIVIDADES — /activities
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
const ETAPAS=[...new Set(TAREFAS.map(t=>t.etapa))];
const cardLink=t=>['Negócio','Proposta','Contato'].includes(t.tipo)?'#/negocios':'#/projetos';

function atvRender(){return `
 ${U.page({kick:'Rotina',title:'Atividades',sub:'Painel global de próximas ações — filtre por área, etapa, responsável.',acts:[{label:'Limpar filtros',icon:'x',act:'limpar'}]})}
 ${U.bar(sg('rtVisao',[['lista','Lista'],['colab','Por colaborador']],'lista','Visão',288)+U.tabs(['Abertas','Concluídas','Canceladas','Todas'],0,'Status'),U.search('Buscar por tarefa, cliente, entidade…','rtQ','320px'))}
 <div class="row wrap rv" style="--d:2;margin-bottom:24px;gap:12px">${sg('rtEsc',[['todos','Todos'],['minhas','Minhas'],['equipe','Da equipe']],'todos','Escopo')}
   ${sg('rtAreas',AREAS.map(a=>[a,a]),'','Áreas',600)}<span class="spacer"></span>${U.btn('Etapas',{act:'etapas',icon:'filtro',ctl:true,w:'176px',attrs:'id="rtEtapas"'})}</div>
 <div id="rtBulk"></div><div id="rtCorpo"></div>`}

function atvMount(v){
  const S={st:0,visao:'lista',esc:'todos',areas:new Set(),etapas:new Set(),q:''}; const sel=new Set(); let R=[];
  const STS=['Aberta','Concluída','Cancelada',null];
  const filtrado=()=>S.esc!=='todos'||S.areas.size||S.etapas.size||S.q;
  const list=()=>TAREFAS.filter(t=>(STS[S.st]==null||t.status===STS[S.st])
    &&(S.esc==='todos'||(S.esc==='minhas'?t.resp===ME:t.resp!==ME))
    &&(!S.areas.size||S.areas.has(t.area))&&(!S.etapas.size||S.etapas.has(t.etapa))
    &&(!S.q||norm([t.titulo,t.cliente,t.ent,t.etapa,t.tipo,t.resp].join(' ')).includes(norm(S.q))))
    .sort((a,b)=>(a.prazo||'9999')<(b.prazo||'9999')?-1:1);
  const byId=id=>TAREFAS.find(t=>t.id===id);
  const cols=[
    {h:'',w:'52px',html:t=>`<button type="button" class="btn sm icon rt-done" data-act="concluir" data-id="${t.id}" aria-pressed="${t.status==='Concluída'}" aria-label="${t.status==='Aberta'?'Concluir':'Reabrir'}: ${esc(t.titulo)}" title="${t.status==='Aberta'?'Concluir tarefa':'Reabrir tarefa'}">${ic('check',16)}</button>`},
    {h:'Tarefa',html:t=>`<div class="rt-tt">${esc(t.titulo)}</div>${t.comprova&&t.status==='Aberta'?`<a class="rt-sub" style="display:block;color:rgb(var(--primary))" href="${cardLink(t)}">Exige comprovação: concluir no card →</a>`:`<div class="rt-sub">${esc(t.ent)}${t.obrig?' · obrigatória':''}</div>`}`},
    {h:'Prazo',w:'112px',html:t=>`<span title="${br(t.prazo)}">${U.chip(rel(t.prazo),t.status==='Aberta'?toneP(t.prazo):'n')}</span>`},
    {h:'Cliente',html:t=>`<span class="rt-ell" style="display:block;max-width:180px" title="${esc(t.cliente)}">${esc(t.cliente)}</span>`},
    {h:'Etapa · Tipo',html:t=>`<div>${esc(t.etapa)}</div><div class="rt-sub">${esc(t.tipo)}</div>`},
    {h:'Responsável',html:t=>t.resp?`<span class="row" style="gap:8px">${U.av(t.resp)}${esc(first(t.resp))}</span>`:'<span class="faint">Sem responsável</span>'},
    {h:'',r:true,html:t=>t.status==='Aberta'?`<div class="rt-acts">${U.btn('Adiar',{sm:true,act:'adiar',attrs:`data-id="${t.id}"`})}${cls(U.btn('Dispensar',{sm:true,act:'dispensar',attrs:`data-id="${t.id}"`}),'rt-wide')}${cls(U.btn('Delegar',{sm:true,act:'delegar',attrs:`data-id="${t.id}"`}),'rt-wide')}${cls(U.btn('',{sm:true,icon:'pontos',title:'Mais ações',act:'maisT',attrs:`data-id="${t.id}"`}),'rt-more')}</div>`:U.chip(t.status,t.status==='Concluída'?'g':'n')}];
  const grupos=rows=>[...EQ,''].map(n=>({title:n||'Sem responsável',rows:rows.filter(t=>(t.resp||'')===n)})).filter(g=>g.rows.length);
  const draw=()=>{
    R=list(); const open=STS[S.st]==='Aberta';
    [...sel].forEach(id=>{if(!R.some(t=>t.id===id))sel.delete(id)});
    const empty=filtrado()?{title:'Nenhuma atividade encontrada com esses filtros.',text:'Troque a área, a etapa ou a busca.',btn:'Limpar filtros',act:'limpar'}
      :open?{title:'Painel zerado! ✨',text:'Tudo em dia por aqui. Que silêncio bom.'}:{title:'Nenhuma atividade encontrada com esses filtros.',text:'Nada neste status.'};
    const title=`${R.length} ${R.length===1?'tarefa':'tarefas'}`;
    $('#rtCorpo',v).innerHTML=U.table({cols,rows:R,check:open,rowAct:'abrir',title,empty,groups:S.visao==='colab'&&R.length?grupos(R):null});
    $$('#rtCorpo [data-check]',v).forEach(cb=>{const t=R[+cb.dataset.check];cb.checked=sel.has(t.id);cb.onchange=()=>{cb.checked?sel.add(t.id):sel.delete(t.id);bulk()}});
    M.wire($('#rtCorpo',v),H); bulk();
  };
  const bulk=()=>{const b=$('#rtBulk',v),n=sel.size;
    b.innerHTML=n?`<div class="card rt-bulk" role="region" aria-label="Ações em massa"><b style="white-space:nowrap">${n} ${n>1?'selecionadas':'selecionada'}</b>
      <span class="lbl">Tarefa comprovada só conclui pelo card; obrigatória não é dispensável.</span>
      <div class="btnrow">${U.btn('Concluir',{sm:true,act:'bConcluir'})}${U.btn('Adiar',{sm:true,act:'bAdiar'})}${U.btn('Dispensar',{sm:true,act:'bDispensar'})}</div>
      ${U.btn('',{sm:true,icon:'x',ghost:true,title:'Limpar seleção',act:'bLimpar'})}</div>`:'';
    M.wire(b,H)};
  const concluir=(t,after)=>{
    if(t.status!=='Aberta'){t.status='Aberta';t.hist.push(stamp('Reaberta por '+ME+'.'));draw();return M.toast('Tarefa reaberta.')}
    if(t.comprova)return M.toast('Esta tarefa exige comprovação: conclua pelo card.','Abrir card',()=>location.hash=cardLink(t));
    mm({title:'Concluir tarefa',sub:esc(t.titulo)+' · '+esc(t.cliente),width:'560px',ok:'Concluir',
      fields:[{k:'reg',label:'Registrar no Maestro OS',type:'textarea',req:true,span:12,ph:'O que foi feito? Fica no histórico do cliente.'}],
      onOk:x=>{t.status='Concluída';t.hist.push(stamp('Concluída: '+x.reg));sel.delete(t.id);draw();after&&after();
        M.toast('Tarefa concluída.','Desfazer',()=>{t.status='Aberta';draw()})}});
  };
  const adiar=(t,after)=>mm({title:'Adiar tarefa',sub:esc(t.titulo),width:'560px',ok:'Adiar',
    fields:[{k:'prazo',label:'Novo prazo',type:'date',req:true,span:6,value:t.prazo||HOJE},{k:'motivo',label:'Motivo',type:'textarea',req:true,span:12,ph:'Por que o prazo muda?'}],
    onOk:x=>{const de=t.prazo;t.prazo=x.prazo;t.hist.push(stamp(`Adiada de ${br(de)} para ${br(x.prazo)}: ${x.motivo}`));draw();after&&after();M.toast(`Prazo movido para ${br(x.prazo)}.`)}});
  const dispensar=(t,after)=>{
    if(t.obrig)return M.toast('Tarefa obrigatória não é dispensável.');
    mm({title:'Dispensar tarefa',sub:esc(t.titulo),width:'560px',ok:'Dispensar',danger:true,
      fields:[{k:'motivo',label:'Motivo',type:'textarea',req:true,span:12,ph:'Por que esta tarefa não precisa mais ser feita?'}],
      onOk:x=>{t.status='Cancelada';t.hist.push(stamp('Dispensada: '+x.motivo));sel.delete(t.id);draw();after&&after();
        M.toast('Tarefa dispensada.','Desfazer',()=>{t.status='Aberta';draw()})}});
  };
  const delegar=(t,after)=>mm({title:'Delegar tarefa',sub:esc(t.titulo),width:'560px',ok:'Delegar',
    fields:[{k:'para',label:'Para',type:'select',req:true,span:12,ph:'Escolha quem assume',opts:EQ.filter(n=>n!==t.resp)},{k:'motivo',label:'Motivo',type:'textarea',span:12,ph:'Contexto para quem recebe (opcional)'}],
    body:`<div class="lbl" style="margin:24px 0 12px">Histórico</div>${hist(t.hist)}`,
    onOk:x=>{const de=t.resp||'Sem responsável';t.resp=x.para;t.hist.push(stamp(`Delegada de ${de} para ${x.para}${x.motivo?': '+x.motivo:''}`));draw();after&&after();M.toast(`Tarefa com ${first(x.para)} agora.`)}});
  const abrir=t=>{let s;
    const foot=t.status==='Aberta'?[{label:'Dispensar',act:'dis'},{label:'Adiar',act:'adi'},{label:'Delegar',act:'del'},{label:'Concluir',act:'con',pri:true}]:[{label:'Reabrir',act:'con',pri:true}];
    s=M.sheet({kick:`${t.tipo} · ${t.area}`,title:t.titulo,sub:`${esc(t.cliente)} · ${esc(t.ent)}`,chips:U.chip(t.status,t.status==='Aberta'?'b':t.status==='Concluída'?'g':'n')+U.chip(rel(t.prazo),toneP(t.prazo))+(t.comprova?U.chip('Exige comprovação','w'):'')+(t.obrig?U.chip('Obrigatória','n'):''),
      body:sec('Dados',kv('Prazo',br(t.prazo)+' · '+rel(t.prazo))+kv('Cliente',esc(t.cliente))+kv('Etapa',esc(t.etapa))+kv('Tipo',esc(t.tipo))+kv('Área',esc(t.area))+kv('Responsável',esc(t.resp||'Sem responsável')))
        +(t.comprova?sec('Comprovação',`<p class="soft" style="margin:0 0 12px">Esta tarefa só conclui pelo card, com o comprovante anexado.</p>${U.btn('Abrir card',{sm:true,act:'card',w:'176px'})}`):'')
        +sec('Histórico',hist(t.hist)),
      foot,on:{con:()=>concluir(t,()=>s.close()),adi:()=>adiar(t,()=>s.close()),del:()=>delegar(t,()=>s.close()),dis:()=>dispensar(t,()=>s.close()),card:()=>{s.close();location.hash=cardLink(t)}}});
  };
  const sels=()=>[...sel].map(byId).filter(Boolean);
  const limpar=()=>{S.esc='todos';S.areas.clear();S.etapas.clear();S.q='';$('#rtQ',v).value='';setSeg(v,'rtEsc','todos');setSeg(v,'rtAreas','');etLabel();draw()};
  const etLabel=()=>{$('[data-act="etapas"]',v).innerHTML=ic('filtro',20)+(S.etapas.size?`Etapas · ${S.etapas.size}`:'Etapas')};
  const H={
    concluir:el=>concluir(byId(el.dataset.id)), adiar:el=>adiar(byId(el.dataset.id)), dispensar:el=>dispensar(byId(el.dataset.id)), delegar:el=>delegar(byId(el.dataset.id)),
    abrir:tr=>abrir(R[+tr.dataset.i]), limpar,
    maisT:el=>{const t=byId(el.dataset.id);M.menu(el,[{label:'Dispensar',icon:'x',run:()=>dispensar(t)},{label:'Delegar',icon:'contatos',run:()=>delegar(t)}])},
    etapas:()=>mm({title:'Etapas',sub:'Mostrar só as tarefas destas etapas.',width:'560px',ok:'Aplicar',
      fields:[{k:'et',label:'Etapas',type:'checks',opts:ETAPAS,value:[...S.etapas],span:12}],onOk:x=>{S.etapas=new Set(x.et);etLabel();draw()}}),
    bLimpar:()=>{sel.clear();draw()},
    bConcluir:()=>{const ts=sels(),ok=ts.filter(t=>!t.comprova),skip=ts.length-ok.length;
      if(!ok.length)return M.toast('As selecionadas exigem comprovação: conclua pelo card.');
      mm({title:`Concluir ${ok.length} ${ok.length>1?'tarefas':'tarefa'}`,sub:skip?`${skip} ${skip>1?'exigem':'exige'} comprovação e fica${skip>1?'m':''} de fora.`:'',width:'560px',ok:'Concluir',
        fields:[{k:'reg',label:'Registrar no Maestro OS',type:'textarea',req:true,span:12,ph:'O que foi feito? Vale para todas.'}],
        onOk:x=>{ok.forEach(t=>{t.status='Concluída';t.hist.push(stamp('Concluída em massa: '+x.reg));sel.delete(t.id)});draw();
          M.toast(`${ok.length} ${ok.length>1?'concluídas':'concluída'}.`,'Desfazer',()=>{ok.forEach(t=>t.status='Aberta');draw()})}})},
    bAdiar:()=>{const ts=sels();mm({title:`Adiar ${ts.length} ${ts.length>1?'tarefas':'tarefa'}`,width:'560px',ok:'Adiar',
      fields:[{k:'prazo',label:'Novo prazo',type:'date',req:true,span:6,value:addD(HOJE,1)},{k:'motivo',label:'Motivo',type:'textarea',req:true,span:12}],
      onOk:x=>{ts.forEach(t=>{t.hist.push(stamp(`Adiada de ${br(t.prazo)} para ${br(x.prazo)}: ${x.motivo}`));t.prazo=x.prazo});sel.clear();draw();M.toast(`Prazo movido para ${br(x.prazo)}.`)}})},
    bDispensar:()=>{const ts=sels(),ok=ts.filter(t=>!t.obrig),skip=ts.length-ok.length;
      if(!ok.length)return M.toast('Tarefa obrigatória não é dispensável.');
      mm({title:`Dispensar ${ok.length} ${ok.length>1?'tarefas':'tarefa'}`,sub:skip?`${skip} ${skip>1?'são obrigatórias e ficam':'é obrigatória e fica'} de fora.`:'',width:'560px',ok:'Dispensar',danger:true,
        fields:[{k:'motivo',label:'Motivo',type:'textarea',req:true,span:12}],
        onOk:x=>{ok.forEach(t=>{t.status='Cancelada';t.hist.push(stamp('Dispensada: '+x.motivo));sel.delete(t.id)});draw();
          M.toast(`${ok.length} ${ok.length>1?'dispensadas':'dispensada'}.`,'Desfazer',()=>{ok.forEach(t=>t.status='Aberta');draw()})}})}};
  M.wire(v,H);
  U.bindSeg(v,'rtVisao',x=>{S.visao=x;draw()});
  U.bindSeg(v,'rtEsc',x=>{S.esc=x;draw()});
  $$('#rtAreas button',v).forEach(b=>b.onclick=()=>{const a=b.dataset.v;S.areas.has(a)?S.areas.delete(a):S.areas.add(a);b.setAttribute('aria-pressed',S.areas.has(a));draw()});
  $$('[data-tabs]',v)[0].addEventListener('tab',e=>{S.st=e.detail;sel.clear();draw()});
  $('#rtQ',v).oninput=e=>{S.q=e.target.value.trim();draw()};
  draw();
}

M.screen('atividades',{title:'Atividades',dock:'atividades',
  help:['Marque o círculo para concluir uma tarefa; ela sai das Abertas e fica no histórico do cliente.',
        'Use Adiar, Dispensar ou Delegar na própria linha. Selecione várias para agir em massa.',
        'Tarefa com “Exige comprovação” só conclui pelo card, com o comprovante anexado.',
        'Filtre por escopo, área, etapa ou busca; “Por colaborador” agrupa por responsável.'],
  variants:{A:{label:'Atual',render:atvRender,mount:atvMount}}});

/* =====================================================================
   NEXOS — /nexos
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
const flow=x=>{const k=x.status==='Devolvido'?0:FLUXO.indexOf(x.status);
  return `<div><div class="rt-flow" aria-label="Fluxo: ${esc(x.status)}">${FLUXO.map((f,i)=>`<i class="${i<=k?(x.status==='Devolvido'?'dev':'on'):''}"></i>`).join('')}</div><div class="rt-flowl">${FLUXO.map(f=>`<span>${f}</span>`).join('')}</div></div>`};
const BANDS=['Atrasados','Vencem hoje','Próximos 7 dias','Mais tarde','Resolvidos','Sem prazo','Cancelados'];
const band=x=>x.status==='Cancelado'?'Cancelados':x.status==='Resolvido'?'Resolvidos':!x.prazo?'Sem prazo':dias(x.prazo)<0?'Atrasados':dias(x.prazo)===0?'Vencem hoje':dias(x.prazo)<=7?'Próximos 7 dias':'Mais tarde';

function nexoForm({base=null,cont=null,titulo,ok,onSave}){
  const b=base||{};
  return mm({title:titulo,sub:cont?'O Nexo original fica resolvido; este nasce ligado a ele.':'',ok,
    fields:[...(cont?[{k:'motivo',label:'Motivo (continuidade)',type:'textarea',req:true,span:12,ph:'Por que o trabalho continua?'}]:[]),
      {k:'titulo',label:'Título',req:true,span:12,value:b.titulo||'',ph:'O que precisa ser feito'},
      {k:'desc',label:'Descrição',type:'textarea',span:12,value:b.desc||''},
      {k:'resp',label:'Responsável',type:'select',opts:EQ,span:6,value:b.resp||'',ph:'Selecione'},
      {k:'prazo',label:'Prazo',type:'date',span:3,value:b.prazo||''},
      {k:'prio',label:'Prioridade',type:'select',opts:PRIOS,span:3,value:b.prio||'Média'},
      {k:'colabs',label:'Colaboradores',type:'checks',opts:EQ,span:12,value:b.colabs||[]},
      {k:'cliente',label:'Cliente referente',type:'select',opts:CLIENTES,span:6,value:b.cliente||'',ph:'Nenhum'},
      {k:'parc',label:'Parceiros externos',type:'select',opts:PARCEIROS,span:6,value:b.parc||'',ph:'Nenhum'},
      {k:'vis',label:'Visibilidade',type:'select',opts:VIS,span:6,value:b.vis||VIS[0]},
      {k:'anexo',label:'Anexos',type:'file',span:6,ph:'Anexar arquivo',help:'Até 20 MB por arquivo.'}],
    onOk:x=>{x.anexo=x.anexo?x.anexo.split(/[\\/]/).pop():'';onSave(x)}});
}

function nxRender(){return `
 ${U.page({kick:'Rotina',title:'Nexos',sub:'Trabalho direcionado entre áreas e pessoas.',acts:[{label:'Novo Nexo',icon:'mais',act:'novo',pri:true}]})}
 <div id="rtSug"></div>
 ${U.bar(U.tabs(['Nexos recebidos','Meus Nexos','Sou colaborador','Criados por mim','Todos'],0,'Caixas'),U.search('Buscar por título, cliente ou pessoa…','rtNq','280px')+U.btn('',{icon:'trocar',ctl:true,title:'Recarregar',act:'recarregar'})+U.btn('Filtros',{act:'filtros',icon:'filtro',ctl:true,w:'176px',attrs:'id="rtFiltros"'}))}
 <div class="row wrap rv" style="--d:2;margin-bottom:24px;gap:12px">${sg('rtNst',['Ativos','Aberto','Aceito','Em andamento','Devolvido','Resolvido'].map(s=>[s,s]),'Ativos','Status')}<span class="spacer"></span>
   ${U.select('Agrupar',['Prazo','Prioridade','Cliente','Responsável','Área de origem'].map(o=>[o,'Agrupar: '+o]),'rtGrp','220px')}
   ${U.select('Ordenar',['Mais recentes','Prazo','Prioridade','Cliente'].map(o=>[o,'Ordenar: '+o]),'rtOrd','220px')}</div>
 <div id="rtNx"></div>`}

function nxMount(v){
  const S={box:0,st:'Ativos',grp:'Prazo',ord:'Mais recentes',q:'',ign:false,f:{resp:'',prio:'',cliente:'',area:'',vis:'',criador:'',canc:false}};
  const inBox=x=>[x.resp===ME&&x.criador!==ME,x.resp===ME,x.colabs.includes(ME),x.criador===ME,true][S.box];
  const stOk=x=>x.status==='Cancelado'?S.f.canc:S.st==='Ativos'?x.status!=='Resolvido':x.status===S.st;
  const fOk=x=>Object.entries(S.f).every(([k,val])=>k==='canc'||!val||(k==='criador'?x.criador:x[k])===val);
  const list=()=>{const r=NX.filter(x=>inBox(x)&&stOk(x)&&fOk(x)&&(!S.q||norm([x.titulo,x.cliente,x.resp,x.criador,x.desc].join(' ')).includes(norm(S.q))));
    const o=S.ord; return o==='Prazo'?r.sort((a,b)=>(a.prazo||'9999')<(b.prazo||'9999')?-1:1):o==='Prioridade'?r.sort((a,b)=>PRIOS.indexOf(a.prio)-PRIOS.indexOf(b.prio)):o==='Cliente'?r.sort((a,b)=>a.cliente.localeCompare(b.cliente)):r};
  const key=x=>({Prazo:band(x),Prioridade:x.prio,Cliente:x.cliente||'Sem cliente','Responsável':x.resp,'Área de origem':x.area})[S.grp];
  const ordem=()=>S.grp==='Prazo'?BANDS:S.grp==='Prioridade'?PRIOS:null;
  const card=x=>`<button type="button" class="card rt-nexo" data-act="abrirNx" data-id="${x.id}" aria-label="Abrir Nexo: ${esc(x.titulo)}">
    <div class="row" style="gap:8px">${U.chip(x.prio,PT[x.prio])}${U.chip(x.status,NST[x.status])}<span class="spacer"></span><span class="lbl">${esc(x.area)}</span></div>
    <div style="font-weight:600;line-height:1.35">${esc(x.titulo)}</div>${flow(x)}
    <div class="rt-meta"><span>${ic('relogio',16)}${x.prazo?br(x.prazo)+' · '+rel(x.prazo):'Sem prazo'}</span>${x.cliente?`<span>${ic('contatos',16)}<span class="rt-ell" style="max-width:200px">${esc(x.cliente)}</span></span>`:''}${x.coms.length?`<span>${ic('chat',16)}${x.coms.length}</span>`:''}</div>
    <div class="row" style="gap:8px">${U.av(x.resp)}<span class="lbl rt-ell">${esc(x.resp)}${x.colabs.length?` + ${x.colabs.length}`:''}</span></div></button>`;
  const sugDraw=()=>{const nIgn=SUG.filter(s=>s.ign).length,nAt=SUG.length-nIgn,L=SUG.filter(s=>!!s.ign===S.ign);
    $('#rtSug',v).innerHTML=`<section class="card rv" style="--d:1;margin-bottom:24px"><div class="ch"><h2>Sugestões da IA</h2>${U.chip(String(nAt),'b')}<span class="lbl">Na dúvida, mantenha.</span><span class="spacer"></span>
      ${U.btn(S.ign?'Voltar às sugestões':`Ignorados · ${nIgn}`,{sm:true,ghost:true,act:'verIgn',w:'176px'})}</div>
      <div class="stack mt16" style="gap:12px">${L.map(s=>`<div class="in rt-sug"><span class="thumb sm" aria-hidden="true">${ic('brilho',16)}</span>
        <div style="flex:1;min-width:0"><div class="rt-ell" style="font-weight:600">${esc(s.t)}</div><div class="lbl rt-ell">${esc(s.cli)} · ${esc(s.fonte)}</div></div>
        ${S.ign?`<div class="btnrow" style="width:144px">${U.btn('Recuperar',{sm:true,act:'recuperar',attrs:`data-id="${s.id}"`})}</div>`
          :`<div class="btnrow" style="width:300px">${U.btn('Virar pendência',{sm:true,act:'virar',attrs:`data-id="${s.id}"`})}${U.btn('Ignorar',{sm:true,act:'ignorar',attrs:`data-id="${s.id}"`})}</div>`}</div>`).join('')
        ||`<p class="lbl" style="margin:0">${S.ign?'Nenhuma sugestão ignorada.':'Sem sugestões novas. A IA lê o chat e as mensagens dos clientes e propõe Nexos aqui.'}</p>`}</div></section>`;
    M.wire($('#rtSug',v),H)};
  const draw=()=>{const r=list(),c=$('#rtNx',v);
    if(!r.length){c.innerHTML=`<section class="card rv" style="--d:3">${U.empty({title:'Nenhum Nexo por aqui.',text:'Troque a caixa, o status ou os filtros.'})}</section>`;return}
    const ks=[...new Set(r.map(key))],ord=ordem(); if(ord)ks.sort((a,b)=>ord.indexOf(a)-ord.indexOf(b)); else ks.sort((a,b)=>a.localeCompare(b));
    c.innerHTML=`<div class="stack">${ks.map((k,i)=>{const g=r.filter(x=>key(x)===k);return `<section class="rv" style="--d:${3+i}" aria-label="${esc(k)}">
      <div class="rt-grp"><h2>${esc(k)}</h2>${U.chip(String(g.length),k==='Atrasados'?'r':k==='Vencem hoje'?'w':'n')}</div>
      <div class="grid rt-nxg">${g.map(card).join('')}</div></section>`}).join('')}</div>`;
    M.wire(c,H)};
  const salvarNovo=(x,extra={})=>{const n={id:'x'+Date.now(),titulo:x.titulo,desc:x.desc,status:'Aberto',prio:x.prio||'Média',prazo:x.prazo,resp:x.resp||ME,criador:ME,colabs:x.colabs,cliente:x.cliente,parc:x.parc,
      area:areaDe(ME),vis:x.vis,anexos:x.anexo?[x.anexo]:[],coms:[],hist:[stamp('Criado por '+ME+'.')],...extra};NX.unshift(n);draw();return n};
  const abrir=x=>{let s;
    const reopen=msg=>{s.close();draw();msg&&M.toast(msg);abrir(x)};
    const P={Aberto:['Aceitar','aceitar'],Devolvido:['Aceitar','aceitar'],Aceito:['Marcar em andamento','andamento'],'Em andamento':['Resolver','resolver'],Resolvido:['Dar continuidade','continuar'],Cancelado:['Reabrir','reabrir']}[x.status];
    const fim=['Resolvido','Cancelado'].includes(x.status);
    const foot=fim?[{label:P[0],act:P[1],pri:true}]:[{label:'Devolver',act:'devolver'},{label:'Delegar',act:'delegar'},{label:P[0],act:P[1],pri:true}];
    const coms=()=>x.coms.length?`<ul class="rt-list">${x.coms.map(c=>`<li>${U.av(c.a)}<div style="min-width:0"><div class="lbl">${esc(c.a)} · ${esc(c.q)}</div><div>${esc(c.t)}</div></div></li>`).join('')}</ul>`:'<p class="lbl" style="margin:0">Nenhum comentário ainda.</p>';
    const body=sec('Dados',kv('Responsável',esc(x.resp))+kv('Colaboradores',esc(x.colabs.join(', ')||'—'))+kv('Prazo',x.prazo?br(x.prazo)+' · '+rel(x.prazo):'Sem prazo')+kv('Criado por',esc(x.criador))+kv('Área de origem',esc(x.area))+kv('Visibilidade',esc(x.vis))
        +(x.parc?kv('Parceiro externo',esc(x.parc)):'')+kv('Cliente',esc(x.cliente||'—'))+(x.cliente&&cidOf(x.cliente)?`<div class="mt8">${U.btn('Abrir ficha do cliente →',{sm:true,ghost:true,act:'ficha'})}</div>`:''))
      +sec('Fluxo',flow(x))
      +(x.desc?sec('Descrição',`<p style="margin:0;line-height:1.5">${esc(x.desc)}</p>`):'')
      +(x.devolvido&&x.status==='Devolvido'?sec('Devolvido',`<p style="margin:0" class="warn">${esc(x.devolvido)}</p>`):'')
      +(x.conclusao?sec('Conclusão',`<p style="margin:0">${esc(x.conclusao)}</p>`):'')
      +(x.origem?sec('Continuidade',`<p style="margin:0" class="soft">Continua o Nexo “${esc(x.origem)}”. Motivo: ${esc(x.motivo||'')}</p>`):'')
      +sec('Anexos',x.anexos.length?`<ul class="rt-list">${x.anexos.map((a,i)=>`<li style="align-items:center"><span class="thumb sm" aria-hidden="true">${ic('doc',16)}</span><span class="rt-ell" style="flex:1">${esc(a)}</span>${U.btn('Abrir',{sm:true,act:'anexo',w:'96px',attrs:`data-i="${i}"`})}</li>`).join('')}</ul>`:'<p class="lbl" style="margin:0">Sem anexos.</p>')
      +sec('Histórico',hist(x.hist))
      +sec('Comentários',`<div id="rtComs">${coms()}</div><div class="row mt16"><input class="input" id="rtCom" placeholder="Escreva um comentário…" aria-label="Escreva um comentário" style="flex:1">${U.btn('Comentar',{act:'comentar',w:'144px'})}</div>`);
    const set=(st,t,msg)=>{x.status=st;x.hist.push(stamp(t));reopen(msg)};
    s=M.sheet({kick:'Nexo · '+x.area,title:x.titulo,sub:`Criado por ${esc(x.criador)} · ${esc(x.cliente||'sem cliente')}`,chips:U.chip(x.status,NST[x.status])+U.chip(x.prio,PT[x.prio])+(x.prazo?U.chip(rel(x.prazo),toneP(x.prazo)):''),
      acts:[{label:'Editar',act:'editar'},{label:'Cancelar Nexo',act:'cancelar'},{label:'Excluir',act:'excluir'}],body,foot,
      on:{
        aceitar:()=>set('Aceito','Aceito por '+ME+'.','Nexo aceito.'),
        andamento:()=>set('Em andamento','Marcado em andamento por '+ME+'.','Nexo em andamento.'),
        resolver:()=>mm({title:'Resolver Nexo',sub:esc(x.titulo),width:'560px',ok:'Resolver',fields:[{k:'c',label:'Conclusão',type:'textarea',req:true,span:12,ph:'O que foi feito? Quem criou o Nexo recebe isto.'}],
          onOk:r=>{x.conclusao=r.c;set('Resolvido','Resolvido: '+r.c,'Nexo resolvido.')}}),
        reabrir:()=>set('Aberto','Reaberto por '+ME+'.','Nexo reaberto.'),
        continuar:()=>nexoForm({base:{...x,titulo:x.titulo+' (continuidade)',prazo:''},cont:true,titulo:'Dar continuidade',ok:'Criar Nexo',
          onSave:r=>{x.hist.push(stamp('Continuado em um novo Nexo.'));const n=salvarNovo(r,{origem:x.titulo,motivo:r.motivo});s.close();M.toast('Novo Nexo criado.');abrir(n)}}),
        devolver:()=>cf({title:'Devolver Nexo',text:'Volta para quem criou, com o motivo.',ok:'Devolver',field:'Motivo da devolução',run:r=>{x.devolvido=r.motivo;set('Devolvido','Devolvido: '+r.motivo,'Nexo devolvido.')}}),
        delegar:()=>mm({title:'Delegar Nexo',sub:esc(x.titulo),width:'560px',ok:'Delegar',fields:[{k:'para',label:'Para',type:'select',req:true,span:12,ph:'Escolha quem assume',opts:EQ.filter(n=>n!==x.resp)},{k:'motivo',label:'Motivo',type:'textarea',span:12}],
          onOk:r=>{const de=x.resp;x.resp=r.para;x.status='Aberto';x.hist.push(stamp(`Delegado de ${de} para ${r.para}${r.motivo?': '+r.motivo:''}`));reopen(`Nexo com ${first(r.para)} agora.`)}}),
        editar:()=>nexoForm({base:x,titulo:'Editar Nexo',ok:'Salvar',onSave:r=>{Object.assign(x,{titulo:r.titulo,desc:r.desc,resp:r.resp||x.resp,prazo:r.prazo,prio:r.prio,colabs:r.colabs,cliente:r.cliente,parc:r.parc,vis:r.vis});if(r.anexo)x.anexos.push(r.anexo);x.hist.push(stamp('Editado por '+ME+'.'));reopen('Nexo salvo.')}}),
        cancelar:()=>cf({title:'Cancelar Nexo',text:'Ele sai das listas ativas; dá para ver em Filtros › Cancelados.',ok:'Cancelar Nexo',danger:true,field:'Motivo',run:r=>set('Cancelado','Cancelado: '+r.motivo,'Nexo cancelado.')}),
        excluir:()=>cf({title:'Excluir Nexo?',text:'Some para todos os envolvidos.',ok:'Excluir',danger:true,run:()=>{const i=NX.indexOf(x);NX.splice(i,1);s.close();draw();M.toast('Nexo excluído.','Desfazer',()=>{NX.splice(i,0,x);draw()})}}),
        ficha:()=>{s.close();location.hash='#/contatos?ficha='+cidOf(x.cliente)},
        anexo:el=>M.toast(`Abre o arquivo ${x.anexos[+el.dataset.i]} (simulação).`),
        comentar:()=>{const i=$('#rtCom',s.el),t=i.value.trim();if(!t)return i.focus();x.coms.push({a:ME,q:'agora',t});i.value='';$('#rtComs',s.el).innerHTML=coms();draw();i.focus()}}});
    /* o kit foca o primeiro campo (o comentário, no fim) e rola o painel: volta ao topo e foca o Fechar */
    requestAnimationFrame(()=>requestAnimationFrame(()=>{$('.sb',s.el).scrollTop=0;$('[data-act="__x"]',s.el).focus({preventScroll:true})}));
    $('#rtCom',s.el).onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();$('[data-act="comentar"]',s.el).click()}};
  };
  const H={
    novo:()=>nexoForm({titulo:'Novo Nexo',ok:'Criar Nexo',onSave:x=>{salvarNovo(x);M.toast('Nexo criado.')}}),
    abrirNx:el=>abrir(NX.find(x=>x.id===el.dataset.id)),
    recarregar:()=>{draw();sugDraw();M.toast('Nexos atualizados.')},
    verIgn:()=>{S.ign=!S.ign;sugDraw()},
    ignorar:el=>{const s=SUG.find(x=>x.id===el.dataset.id);s.ign=true;sugDraw();M.toast('Sugestão ignorada.','Desfazer',()=>{s.ign=false;sugDraw()})},
    recuperar:el=>{SUG.find(x=>x.id===el.dataset.id).ign=false;sugDraw();M.toast('Sugestão recuperada.')},
    virar:el=>{const s=SUG.find(x=>x.id===el.dataset.id);nexoForm({base:{titulo:s.t,cliente:s.cli,desc:'Sugerido pela IA a partir de: '+s.fonte},titulo:'Virar pendência',ok:'Criar Nexo',
      onSave:x=>{SUG.splice(SUG.indexOf(s),1);sugDraw();salvarNovo(x);M.toast('Pendência criada como Nexo.')}})},
    filtros:b=>{const m=mm({title:'Filtros',width:'640px',ok:'Aplicar',extra:U.btn('Limpar',{ghost:true,attrs:'data-limpa'}),
      fields:[{k:'resp',label:'Responsável',type:'select',opts:EQ,span:6,ph:'Todos',value:S.f.resp},{k:'prio',label:'Prioridade',type:'select',opts:PRIOS,span:6,ph:'Todas',value:S.f.prio},
        {k:'cliente',label:'Cliente',type:'select',opts:CLIENTES,span:6,ph:'Todos',value:S.f.cliente},{k:'area',label:'Área',type:'select',opts:AREAS,span:6,ph:'Todas',value:S.f.area},
        {k:'vis',label:'Visibilidade',type:'select',opts:VIS,span:6,ph:'Todas',value:S.f.vis},{k:'criador',label:'Criado por',type:'select',opts:EQ,span:6,ph:'Todos',value:S.f.criador},
        {k:'canc',label:'Mostrar cancelados',type:'toggle',span:12,value:S.f.canc}],
      onOk:x=>{S.f=x;const n=Object.values(x).filter(Boolean).length;b.innerHTML=ic('filtro',20)+(n?`Filtros · ${n}`:'Filtros');draw()}});
      $('[data-limpa]',m.el).onclick=()=>{$$('select',m.el).forEach(s=>s.value='');$$('[data-toggle]',m.el).forEach(t=>t.setAttribute('aria-checked','false'))}}};
  M.wire(v,H);
  $$('[data-tabs]',v)[0].addEventListener('tab',e=>{S.box=e.detail;draw()});
  U.bindSeg(v,'rtNst',x=>{S.st=x;draw()});
  $('#rtGrp',v).onchange=e=>{S.grp=e.target.value;draw()};
  $('#rtOrd',v).onchange=e=>{S.ord=e.target.value;draw()};
  $('#rtNq',v).oninput=e=>{S.q=e.target.value.trim();draw()};
  sugDraw(); draw();
}

M.screen('nexos',{title:'Nexos',dock:'nexos',
  help:['Um Nexo é um pedido de trabalho para outra pessoa ou área, com prazo e cliente.',
        'As caixas no topo separam o que chegou para você, o que você criou e onde é colaborador.',
        'Abra um Nexo para avançar o fluxo: Aceitar, Marcar em andamento e Resolver. Devolver e Delegar ficam no rodapé.',
        'Sugestões da IA vêm do chat e das mensagens dos clientes: vire pendência ou ignore.'],
  variants:{A:{label:'Atual',render:nxRender,mount:nxMount}}});

/* =====================================================================
   AGENDA — /agenda
   ===================================================================== */
const STATUS=['Agendado','Confirmado','Remarcado','Concluído','Cancelado'];
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
const H0=7,H1=20,RH=56;

function agRender(){
  const chk=(n,opts,c='')=>`<div class="checks ${c}">${opts.map(o=>`<label title="${esc(o)}"><input type="checkbox" data-f="${n}" value="${esc(o)}" checked><span class="rt-ell">${esc(o)}</span></label>`).join('')}</div>`;
  return `
 ${U.page({kick:'Rotina',title:'Agenda',sub:'Tudo que está agendado pelo Maestro — eventos de Negócios, Projetos, Técnica, Experiência e contatos.',acts:[{label:'Novo evento',icon:'mais',act:'novo',pri:true}]})}
 ${U.bar(`<div class="rt-nav">${U.btn('Hoje',{act:'hoje',ctl:true,w:'96px'})}${U.btn('',{icon:'voltar',ctl:true,title:'Anterior',act:'ant'})}${U.btn('',{icon:'seta',ctl:true,title:'Próximo',act:'prox'})}</div><h2 id="rtPer" style="margin:0 0 0 8px;font-size:20px;font-weight:600;letter-spacing:-.01em;white-space:nowrap"></h2>`,
   sg('rtView',[['mes','Mês'],['semana','Semana'],['dia','Dia']],'semana','Visão'))}
 <div class="grid rt-ag">
  <aside class="card s3 rt-filt rv" id="rtFilt" style="--d:2;align-self:start" aria-label="Filtros da agenda">
   <div class="rt-fh"><h2>Filtros</h2><span id="rtFn"></span><span class="spacer"></span>${cls(U.btn('Mostrar filtros',{sm:true,icon:'filtro',act:'ftog',w:'176px',attrs:'aria-expanded="false" aria-controls="rtFb"'}),'rt-ftog')}</div>
   <div class="rt-fb" id="rtFb">
   <section><h3>Atalhos</h3><div class="stack" style="gap:8px">${[['meus','Eventos meus'],['showroom','Eventos do Showroom'],['tecnicos','Eventos técnicos']].map(([k,l])=>`<button type="button" class="btn sm" data-act="atalho" data-k="${k}" aria-pressed="false" style="width:100%">${l}</button>`).join('')}</div></section>
   <section><h3>Status</h3>${chk('st',STATUS,'rt-ck2')}</section>
   <section><h3>Áreas</h3>${chk('ar',AREAS,'rt-ck2')}</section>
   <section><h3>Tipos de tarefa</h3>${chk('tp',TIPOS)}</section>
   <section><h3>Recurso</h3><select class="select" id="rtRec" aria-label="Recurso"><option value="">Todos os recursos</option>${RECURSOS.map(r=>`<option>${r}</option>`).join('')}</select></section>
   <section><h3>Responsável</h3><select class="select" id="rtResp" aria-label="Responsável"><option value="">Todos</option>${EQ.map(r=>`<option>${r}</option>`).join('')}</select></section>
   <section>${U.btn('Limpar filtros',{sm:true,act:'limpar',w:'100%'})}</section>
   </div>
  </aside>
  <div class="s9" id="rtCal"></div>
 </div>`}

function agMount(v){
  const S={view:'semana',cur:HOJE,st:new Set(STATUS),ar:new Set(AREAS),tp:new Set(TIPOS),rec:'',resp:'',at:''};
  /* abaixo de 768 a semana não cabe: passa sozinha para Dia (e volta ao alargar, se a troca foi automática) */
  const estreito=()=>innerWidth<768; let auto=false, era=estreito();
  if(era){S.view='dia';auto=true;setSeg(v,'rtView','dia')}
  const ok=e=>S.st.has(e.status)&&S.ar.has(e.area)&&S.tp.has(e.tipo)&&(!S.rec||e.recursos.includes(S.rec))&&(!S.resp||e.resp===S.resp)
    &&(!S.at||(S.at==='meus'?(e.resp===ME||e.parts.includes(ME)):S.at==='showroom'?(e.recursos.includes('Showroom')||e.local==='Showroom'):e.area==='Técnica'));
  const hm=s=>s.slice(11,16), mins=s=>+s.slice(11,13)*60+ +s.slice(14,16);
  const dur=e=>{const m=mins(e.fim)-mins(e.ini);return `${Math.floor(m/60)?Math.floor(m/60)+' h':''}${m%60?' '+m%60+' min':''}`.trim()};
  const longo=d=>{const s=dt(d).toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});return s[0].toUpperCase()+s.slice(1)};
  const per=()=>{if(S.view==='dia')return longo(S.cur);
    if(S.view==='mes'){const s=dt(S.cur).toLocaleDateString('pt-BR',{month:'long',year:'numeric'});return s[0].toUpperCase()+s.slice(1)}
    const a=mon(S.cur),b=addD(a,6);return `${+a.slice(8)} de ${MES[+a.slice(5,7)-1]} – ${+b.slice(8)} de ${MES[+b.slice(5,7)-1]} de ${b.slice(0,4)}`};
  const legend=`<div class="rt-legend">${AREAS.map(a=>`<span><i class="dot" style="background:${AC[a]}"></i>${a}</span>`).join('')}</div>`;
  const evBtn=e=>{const top=(mins(e.ini)%60)/60*RH+2,h=Math.max(24,(mins(e.fim)-mins(e.ini))/60*RH-4);
    const nome=`${esc(e.tipo)} · ${esc(e.com)} · ${hm(e.ini)} às ${hm(e.fim)} · ${e.status}`;
    return `<button type="button" class="ev rt-ev ${e.status==='Concluído'?'rt-ok':e.status==='Cancelado'?'rt-x':''}" data-act="ev" data-id="${e.id}" style="top:${top}px;height:${h}px;background:${AC[e.area]}" aria-label="${nome}" title="${nome}"><span class="rt-evl">${hm(e.ini)} ${esc(e.tipo)}</span><b class="rt-evl">${esc(e.com)}</b></button>`};
  const grade=days=>{const cols=days.length===1?'64px minmax(0,1fr)':'';const evs=EV.filter(ok);
    return `<div class="rt-calsc"><div class="rt-calin" style="min-width:${cols?0:680}px"><div class="rt-calh" ${cols?`style="grid-template-columns:${cols}"`:''}><div class="rt-hc"></div>${days.map(d=>`<div class="${d===HOJE?'rt-hoje':''}"><span>${WD[(dt(d).getDay()+6)%7]}</span><b>${+d.slice(8)}</b></div>`).join('')}</div>
     <div class="cal" ${cols?`style="grid-template-columns:${cols}"`:''}>${Array.from({length:H1-H0},(_,k)=>H0+k).map(h=>`<div class="hh">${h}:00</div>${days.map(d=>`<div class="cell rt-cell" data-act="novoEm" data-d="${d}" data-h="${h}" role="button" tabindex="0" aria-label="Novo agendamento em ${br(d)} às ${h}:00">${evs.filter(e=>e.ini.slice(0,10)===d&&+e.ini.slice(11,13)===h).map(evBtn).join('')}</div>`).join('')}`).join('')}</div></div></div>`};
  const mes=()=>{const m1=S.cur.slice(0,8)+'01',a=mon(m1),evs=EV.filter(ok);
    return `<div class="rt-month">${WD.map(w=>`<div class="rt-wd">${w}</div>`).join('')}${Array.from({length:42},(_,i)=>addD(a,i)).map(d=>{const n=evs.filter(e=>e.ini.slice(0,10)===d);
      return `<button type="button" class="rt-mday ${d.slice(0,7)!==m1.slice(0,7)?'rt-out':''}" data-act="dia" data-d="${d}" aria-label="${br(d)}: ${n.length} ${n.length===1?'evento':'eventos'}"><span class="${d===HOJE?'rt-today':''}" style="font-weight:600">${+d.slice(8)}</span>${n.length?`<span class="rt-mn" aria-hidden="true">${n.length}</span>`:''}${n.length?U.chip(`${n.length} ${n.length>1?'eventos':'evento'}`,'b'):''}${n.slice(0,2).map(e=>`<span class="lbl rt-ell" style="font-size:12px;max-width:100%"><i class="dot" style="background:${AC[e.area]};margin-right:4px"></i>${hm(e.ini)} ${esc(e.com)}</span>`).join('')}</button>`}).join('')}</div>`};
  const draw=()=>{$('#rtPer',v).textContent=per();fn();
    const body=S.view==='mes'?mes():grade(S.view==='dia'?[S.cur]:Array.from({length:7},(_,i)=>addD(mon(S.cur),i)));
    const n=EV.filter(ok).filter(e=>S.view==='dia'?e.ini.slice(0,10)===S.cur:S.view==='semana'?(e.ini.slice(0,10)>=mon(S.cur)&&e.ini.slice(0,10)<=addD(mon(S.cur),6)):e.ini.slice(0,7)===S.cur.slice(0,7)).length;
    $('#rtCal',v).innerHTML=`<section class="card flush rv" style="--d:3"><div class="ch"><h2>${n} ${n===1?'evento':'eventos'}</h2><span class="spacer"></span>${legend}</div>${body}</section>`;
    const c=$('#rtCal',v); M.wire(c,H);
    $$('.rt-cell',c).forEach(el=>el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click()}}))};
  const form=({base=null,d=S.cur,h=9,onSave})=>{const b=base||{};const ed=!!base;
    const m=mm({title:ed?'Editar agendamento':'Novo agendamento',sub:ed?esc(b.tipo+' · '+b.com):'',ok:ed?'Salvar':'Agendar',
      fields:[{k:'tipo',label:'Tipo',type:'select',opts:TIPOS,req:true,span:6,ph:'Selecione',value:b.tipo||''},
        {k:'cliente',label:'Cliente',type:'select',opts:CLIENTES,span:6,ph:'Sem cliente',value:b.cliente||''},
        {k:'resp',label:'Responsável',type:'select',opts:EQ,req:true,span:6,value:b.resp||ME},
        {k:'local',label:'Local',req:true,span:6,ph:'Endereço, Showroom ou Online',value:b.local||''},
        {k:'data',label:'Data',type:'date',req:true,span:4,value:b.ini?b.ini.slice(0,10):d},
        {k:'ini',label:'Início',type:'time',req:true,span:4,value:b.ini?hm(b.ini):String(h).padStart(2,'0')+':00'},
        {k:'fim',label:'Término',type:'time',req:true,span:4,value:b.fim?hm(b.fim):String(h+1).padStart(2,'0')+':00'},
        {k:'recursos',label:'Recursos',type:'checks',opts:RECURSOS,span:12,value:b.recursos||[]},
        {k:'resumo',label:'Resumo',span:12,ph:'Uma linha que aparece na agenda',value:b.resumo||''},
        {k:'briefing',label:'Briefing',type:'textarea',req:true,span:12,ph:'O que a equipe precisa saber antes de ir',value:b.briefing||''},
        {k:'notas',label:'Notas internas',type:'textarea',span:12,value:b.notas||''},
        {k:'check',label:'Checklist de preparação',type:'checks',opts:CHECK,req:true,span:12,value:b.check||[]},
        ...(ed?[{k:'motivoRem',label:'Motivo da remarcação',type:'textarea',span:12,help:'Obrigatório se mudar a data ou o horário.'}]:[])],
      onOk:x=>{if(x.fim<=x.ini){M.toast('O término precisa ser depois do início.');return false}
        const mudou=ed&&(x.data!==b.ini.slice(0,10)||x.ini!==hm(b.ini)||x.fim!==hm(b.fim));
        if(mudou&&!x.motivoRem){M.toast('Informe o motivo da remarcação.');$('[name="motivoRem"]',m.el).focus();return false}
        const choque=EV.find(e=>e!==base&&e.status!=='Cancelado'&&e.resp===x.resp&&e.ini.slice(0,10)===x.data&&hm(e.ini)<x.fim&&hm(e.fim)>x.ini);
        const go=()=>{onSave(x,mudou);m.close()};
        if(choque){cf({title:'Conflito de horário',text:`${x.resp} já tem ${choque.tipo} com ${choque.com} das ${hm(choque.ini)} às ${hm(choque.fim)}.`,ok:'Agendar mesmo assim',run:go});return false}
        go();return false}});
    return m};
  const novo=(d,h)=>form({d,h,onSave:x=>{const e=ev('e'+Date.now(),x.data,x.ini,x.fim,x.tipo,x.cliente||x.resumo||x.tipo,x.resp,x.local,'Agendado',{recursos:x.recursos,resumo:x.resumo,briefing:x.briefing,notas:x.notas,check:x.check});
    EV.push(e);S.cur=x.data;draw();M.toast(`Agendado: ${x.tipo} em ${br(x.data)} às ${x.ini}.`)}});
  const abrir=e=>{let s;
    const reopen=msg=>{s.close();draw();msg&&M.toast(msg);abrir(e)};
    const fim=['Concluído','Cancelado'].includes(e.status);
    const body=sec('Dados',kv('Quando',`${br(e.ini)} · ${hm(e.ini)}–${hm(e.fim)}`)+kv('Duração',dur(e))+kv('Local',esc(e.local))+kv('Responsável',esc(e.resp))+kv('Recursos',esc(e.recursos.join(', ')||'—'))+kv('Participantes',esc(e.parts.join(', ')||'—'))
        +(e.cliente&&cidOf(e.cliente)?`<div class="mt8">${U.btn('Abrir ficha do cliente →',{sm:true,ghost:true,act:'ficha'})}</div>`:''))
      +(e.resumo?sec('Resumo',`<p style="margin:0">${esc(e.resumo)}</p>`):'')
      +sec('Briefing',`<p style="margin:0;line-height:1.5">${esc(e.briefing||'—')}</p>`)
      +(e.notas?sec('Notas internas',`<p style="margin:0" class="soft">${esc(e.notas)}</p>`):'')
      +sec('Checklist de preparação',`<ul class="rt-list">${CHECK.map(c=>`<li style="align-items:center"><span style="color:${e.check.includes(c)?'rgb(var(--pos))':'var(--faint)'};display:inline-flex">${ic(e.check.includes(c)?'check':'relogio',16)}</span><span class="${e.check.includes(c)?'':'soft'}">${esc(c)}</span></li>`).join('')}</ul>`)
      +sec('Histórico de remarcações',hist(e.rem))
      +(e.resultado?sec(e.status==='Cancelado'?'Cancelamento':'Resultado',`<p style="margin:0">${esc(e.resultado)}</p>`):'');
    s=M.sheet({kick:`${e.tipo} · ${e.area}`,title:e.com,sub:`${longo(e.ini.slice(0,10))} · ${hm(e.ini)}–${hm(e.fim)}`,chips:U.chip(e.status,ST_T[e.status]),
      acts:[{label:'Ver na agenda',act:'ver'},{label:'Editar',act:'editar'}],body,
      foot:fim?[]:[{label:'Cancelar evento',act:'cancelar'},{label:'Concluir',act:'concluir',pri:true}],
      on:{ver:()=>{s.close();S.view='dia';S.cur=e.ini.slice(0,10);setSeg(v,'rtView','dia');draw()},
        ficha:()=>{s.close();location.hash='#/contatos?ficha='+cidOf(e.cliente)},
        editar:()=>form({base:e,onSave:(x,mudou)=>{if(mudou){e.rem.push(stamp(`De ${br(e.ini)} ${hm(e.ini)} para ${br(x.data)} ${x.ini}: ${x.motivoRem}`));e.status='Remarcado'}
          Object.assign(e,{ini:x.data+'T'+x.ini,fim:x.data+'T'+x.fim,tipo:x.tipo,area:TA[x.tipo],cliente:x.cliente,com:x.cliente||e.com,resp:x.resp,local:x.local,recursos:x.recursos,resumo:x.resumo,briefing:x.briefing,notas:x.notas,check:x.check});
          reopen(mudou?'Evento remarcado.':'Evento salvo.')}}),
        cancelar:()=>cf({title:'Cancelar evento',text:`${e.tipo} · ${e.com} · ${br(e.ini)} ${hm(e.ini)}`,ok:'Cancelar evento',danger:true,field:'Motivo',run:r=>{e.status='Cancelado';e.resultado='Cancelado: '+r.motivo;reopen('Evento cancelado.')}}),
        concluir:()=>mm({title:'Concluir evento',sub:esc(e.tipo+' · '+e.com),width:'560px',ok:'Concluir',fields:[{k:'res',label:'Resultado',type:'textarea',req:true,span:12,ph:'Como foi? Fica no histórico do cliente.'}],
          onOk:r=>{e.status='Concluído';e.resultado=r.res;reopen('Evento concluído.')}})}});
  };
  const nFiltros=()=>[S.st.size<STATUS.length,S.ar.size<AREAS.length,S.tp.size<TIPOS.length,S.rec,S.resp,S.at].filter(Boolean).length;
  const fn=()=>{const n=nFiltros();$('#rtFn',v).innerHTML=n?U.chip(n+(n>1?' ativos':' ativo'),'b'):''};
  const sync=()=>{$$('[data-f]',v).forEach(c=>{c.checked=S[c.dataset.f].has(c.value)});$('#rtRec',v).value=S.rec;$('#rtResp',v).value=S.resp;$$('[data-act="atalho"]',v).forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===S.at))};
  const step=k=>{S.cur=S.view==='dia'?addD(S.cur,k):S.view==='semana'?addD(S.cur,7*k):(()=>{const d=dt(S.cur.slice(0,8)+'01');d.setMonth(d.getMonth()+k);return iso(d)})();draw()};
  const H={novo:()=>novo(S.cur,9),hoje:()=>{S.cur=HOJE;draw()},ant:()=>step(-1),prox:()=>step(1),
    novoEm:el=>novo(el.dataset.d,+el.dataset.h), ev:el=>abrir(EV.find(e=>e.id===el.dataset.id)),
    dia:el=>{S.cur=el.dataset.d;S.view='dia';setSeg(v,'rtView','dia');draw()},
    atalho:el=>{S.at=S.at===el.dataset.k?'':el.dataset.k;sync();draw()},
    ftog:el=>{const f=$('#rtFilt',v),o=!f.classList.contains('rt-open');f.classList.toggle('rt-open',o);el.setAttribute('aria-expanded',o);$('.bt',el).textContent=o?'Ocultar filtros':'Mostrar filtros'},
    limpar:()=>{S.st=new Set(STATUS);S.ar=new Set(AREAS);S.tp=new Set(TIPOS);S.rec='';S.resp='';S.at='';sync();draw()}};
  M.wire(v,H);
  $$('[data-f]',v).forEach(c=>c.onchange=()=>{const set=S[c.dataset.f];c.checked?set.add(c.value):set.delete(c.value);draw()});
  $('#rtRec',v).onchange=e=>{S.rec=e.target.value;draw()};
  $('#rtResp',v).onchange=e=>{S.resp=e.target.value;draw()};
  U.bindSeg(v,'rtView',x=>{S.view=x;auto=false;draw()});
  const onR=()=>{if(!v.isConnected)return removeEventListener('resize',onR);const n=estreito();if(n===era)return;era=n;
    if(n&&S.view==='semana'){S.view='dia';auto=true;setSeg(v,'rtView','dia');draw()}
    else if(!n&&auto&&S.view==='dia'){S.view='semana';auto=false;setSeg(v,'rtView','semana');draw()}};
  addEventListener('resize',onR);
  draw();
}

M.screen('agenda',{title:'Agenda',dock:'agenda',
  help:['Clique num horário vazio para criar um agendamento já com o dia e a hora preenchidos.',
        'Clique num evento para ver o briefing, o checklist e o histórico; dali dá para Editar, Cancelar ou Concluir.',
        'Mudar a data ou o horário pede o motivo da remarcação, que fica no histórico do evento.',
        'Os filtros à esquerda combinam entre si; os atalhos mostram só os seus, os do Showroom ou os técnicos.'],
  variants:{A:{label:'Atual',render:agRender,mount:agMount}}});

/* =====================================================================
   CHAT — drawer (M.chat), sempre ligado a um cliente
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
let chatSel=null;

M.chat=()=>{
  const aberto=$('.rt-chat'); if(aberto){const f=$('#rtMsg',aberto)||$('#rtCq',aberto);f&&f.focus();return}
  const o=document.createElement('div');o.className='ovl';
  const el=document.createElement('aside');el.className='chatd rt-chat';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Chat interno');
  el.innerHTML=`<div class="cl rt-cl"><div class="rt-chh"><div class="row" style="gap:8px;min-height:36px"><h2 style="flex:1">Chat interno</h2>${cls(U.btn('',{icon:'x',sm:true,ghost:true,title:'Fechar chat',act:'fechar'}),'rt-mob')}</div>
      <input class="input" type="search" id="rtCq" placeholder="Buscar cliente ou colega…" aria-label="Buscar cliente ou colega">
      ${U.btn('Nova conversa',{icon:'mais',act:'nova',w:'100%'})}</div>
    <ul class="rt-clist" id="rtCl" aria-label="Conversas"></ul></div>
   <section class="rt-cv" id="rtCv" aria-label="Conversa"></section>`;
  document.body.append(o,el);
  const prev=document.activeElement; let q='';
  const close=()=>{el.classList.remove('open');o.classList.remove('open');setTimeout(()=>{o.remove();el.remove()},300);prev&&prev.focus&&prev.focus()};
  const lista=()=>{const L=CONV.filter(c=>!q||norm(c.cliente+' '+c.parts.join(' ')).includes(norm(q)));
    $('#rtCl',el).innerHTML=L.map(c=>{const u=c.msgs[c.msgs.length-1];return `<li><button type="button" class="rt-ci" data-act="abrirConv" data-id="${c.id}" aria-current="${c.id===chatSel}">
      ${U.av(c.cliente)}<span style="flex:1;min-width:0"><span class="row" style="gap:8px"><b class="rt-ell" style="flex:1;font-weight:600">${esc(c.cliente)}</b><span class="lbl" style="font-size:12px;white-space:nowrap">${esc(c.quando)}</span></span>
      <span class="lbl" style="display:block;font-size:12px">${c.parts.length} participantes</span>
      <span class="row" style="gap:8px;margin-top:4px"><span class="soft rt-ell" style="flex:1;font-size:13px">${u?`${esc(first(u.a))}: ${esc(u.t)}`:'Sem mensagens'}</span>${c.novas?U.chip(`${c.novas} ${c.novas>1?'novas':'nova'}`,'b'):''}</span></span></button></li>`}).join('')
      ||`<li>${U.empty({title:q?'Nenhum resultado.':'Nenhuma conversa.'})}</li>`;
    M.wire($('#rtCl',el),H)};
  const msgHTML=c=>`${c.old.length?`<div style="align-self:center">${U.btn('Carregar mais',{sm:true,ghost:true,act:'mais'})}</div>`:'<div class="rt-sys">· início da conversa ·</div>'}
    ${c.msgs.map(m=>m.sys?`<div class="rt-sys">${esc(m.t)}</div>`:m.a===ME?`<div class="rt-who rt-me">${esc(m.h)}</div><div class="bubble me">${esc(m.t)}</div>`:`<div class="rt-who">${esc(m.a)} · ${esc(m.h)}</div><div class="bubble ot">${esc(m.t)}</div>`).join('')}`;
  const conversa=()=>{const c=CONV.find(x=>x.id===chatSel),cv=$('#rtCv',el);
    const fechar=U.btn('',{icon:'x',sm:true,ghost:true,title:'Fechar chat',act:'fechar'});
    if(!c){cv.innerHTML=`<div class="rt-cvh"><span class="spacer"></span>${fechar}</div><div style="flex:1;display:grid;place-items:center">${U.empty({title:'Escolha uma conversa pra começar.',text:'Toda conversa fica ligada a um cliente.'})}</div>`;M.wire(cv,H);return}
    const voltar=cls(U.btn('',{icon:'voltar',sm:true,ghost:true,title:'Voltar às conversas',act:'voltar'}),'rt-mob');
    cv.innerHTML=`<div class="rt-cvh">${voltar}${U.av(c.cliente)}<div style="flex:1;min-width:0"><b class="rt-ell" style="display:block;font-weight:600">${esc(c.cliente)}</b><span class="lbl rt-ell" style="display:block">${esc(c.parts.join(', '))}</span></div>
      ${cls(U.btn('Convidar',{sm:true,act:'convidar',w:'112px'}),'rt-desk')}${cls(U.btn('',{icon:'mais',sm:true,title:'Convidar colegas',act:'convidar'}),'rt-mob')}${fechar}</div>
      <div class="rt-msgs" id="rtMsgs" aria-live="polite">${msgHTML(c)}</div>
      <div class="rt-cvf"><input class="input" id="rtMsg" placeholder="Escreva uma mensagem…" aria-label="Escreva uma mensagem" autocomplete="off">${U.btn('',{icon:'enviar',pri:true,title:'Enviar',act:'enviar'})}</div>`;
    M.wire(cv,H); const ms=$('#rtMsgs',cv); ms.scrollTop=ms.scrollHeight;
    $('#rtMsg',cv).onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();H.enviar()}}};
  const abrirConv=id=>{chatSel=id;el.classList.remove('rt-lista');const c=CONV.find(x=>x.id===id);if(c)c.novas=0;lista();conversa();const f=$('#rtMsg',el);f&&f.focus()};
  const H={
    fechar:close, abrirConv:b=>abrirConv(b.dataset.id),
    voltar:()=>{el.classList.add('rt-lista');const b=$(`[data-id="${chatSel}"]`,$('#rtCl',el));(b||$('#rtCq',el)).focus()},
    enviar:()=>{const i=$('#rtMsg',el),c=CONV.find(x=>x.id===chatSel);if(!i||!c)return;const t=i.value.trim();if(!t)return i.focus();
      c.msgs.push({a:ME,h:agora(),t});c.quando='agora';CONV.splice(CONV.indexOf(c),1);CONV.unshift(c);
      const ms=$('#rtMsgs',el);ms.insertAdjacentHTML('beforeend',`<div class="rt-who rt-me">${agora()}</div><div class="bubble me">${esc(t)}</div>`);ms.scrollTop=ms.scrollHeight;i.value='';lista();i.focus()},
    mais:()=>{const c=CONV.find(x=>x.id===chatSel);c.msgs=[...c.old,...c.msgs];c.old=[];const ms=$('#rtMsgs',el);ms.innerHTML=msgHTML(c);M.wire(ms,H);ms.scrollTop=0},
    convidar:()=>{const c=CONV.find(x=>x.id===chatSel),fora=EQ.filter(n=>!c.parts.includes(n));
      if(!fora.length)return M.toast('Toda a equipe já está nesta conversa.');
      mm({title:'Convidar colegas',sub:esc(c.cliente),width:'560px',ok:'Convidar',fields:[{k:'p',label:'Colegas',type:'checks',opts:fora,req:true,span:12}],
        onOk:x=>{c.parts.push(...x.p);x.p.forEach(n=>c.msgs.push({sys:true,t:`${n} entrou na conversa`}));conversa();lista();M.toast(`${x.p.length>1?x.p.length+' colegas convidados':first(x.p[0])+' convidado'}.`)}})},
    nova:()=>mm({title:'Nova conversa',sub:'Toda conversa fica ligada a um cliente.',width:'560px',ok:'Abrir conversa',
      fields:[{k:'cliente',label:'Cliente',type:'select',opts:CLIENTES,req:true,span:12,ph:'Escolha o cliente'},{k:'p',label:'Convidar colegas (opcional)',type:'checks',opts:EQ.filter(n=>n!==ME),span:12}],
      onOk:x=>{let c=CONV.find(k=>k.cliente===x.cliente);
        if(c){x.p.forEach(n=>{if(!c.parts.includes(n))c.parts.push(n)});M.toast('Já existia uma conversa deste cliente: abrimos ela.')}
        else{c={id:'k'+Date.now(),cliente:x.cliente,parts:[...x.p,ME],novas:0,quando:'agora',msgs:[],old:[]};CONV.unshift(c)}
        q='';$('#rtCq',el).value='';abrirConv(c.id)}})};
  M.wire($('.rt-chh',el),H);
  $('#rtCq',el).oninput=e=>{q=e.target.value.trim();lista()};
  o.onclick=close;
  el.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();close()}
    if(e.key==='Tab'){const f=$$('button:not([disabled]),input,select,textarea,a[href]',el).filter(x=>x.offsetParent);if(!f.length)return;const a=f[0],z=f[f.length-1];
      if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
  el.classList.toggle('rt-lista',!chatSel);
  lista(); conversa();
  requestAnimationFrame(()=>{o.classList.add('open');el.classList.add('open');($('#rtMsg',el)||$('#rtCq',el)).focus()});
};
})();

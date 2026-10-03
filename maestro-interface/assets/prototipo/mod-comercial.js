/* Maestro OS · protótipo · módulo Comercial: Contatos (+ Ficha do cliente 360), Negócios (+ painel do cartão e
   fechamento em passos) e Propostas (substitui a lista de telas.js).
   Fonte: inventário 01 e 03. O estado vive em M.D e muda de verdade: criar, mover, fechar, excluir. */
(function(){
const {ic,brl,brl0,$,$$,esc}=M, U=M.ui, D=M.D;

/* ---------- estilo próprio do módulo (prefixo cm-, medidas múltiplas de 4) ---------- */
document.head.insertAdjacentHTML('beforeend',`<style id="cm-css">
@media (min-width:901px){.cm-wide{width:min(960px,calc(100vw - 24px))!important}.cm-mid{width:min(800px,calc(100vw - 24px))!important}}
.cm-sht{margin:4px 0 0;font-size:22px;font-weight:700;letter-spacing:-.01em}
.cm-ell{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.cm-acts{display:grid;grid-auto-flow:column;grid-auto-columns:36px;gap:8px;justify-content:end}
.cm-th{height:36px;padding:0;border:0;background:none;font:inherit;color:inherit;display:inline-flex;align-items:center;gap:4px;cursor:pointer;white-space:nowrap}
.cm-th:hover{color:var(--text)}
.cm-ar{display:inline-flex;opacity:0;transition:opacity .2s var(--ease)}
.cm-th:hover .cm-ar{opacity:.5}.cm-ar.on,.cm-th:hover .cm-ar.on{opacity:1}
.cm-ar.up svg{transform:rotate(180deg)}
.cm-sel{height:36px;border-radius:10px;width:176px}
.cm-n{margin-left:8px;font-weight:500;color:var(--faint);font-variant-numeric:tabular-nums}
.cm-code{font-family:var(--mono);font-size:12px;color:var(--faint)}
.cm-sh{display:flex;align-items:center;gap:12px;margin-bottom:12px;min-height:36px}
.cm-sh h3{margin:0!important;flex:1;font-size:14px;font-weight:600;color:var(--soft)}
.cm-list{display:flex;flex-direction:column;gap:8px}
.cm-li{display:flex;align-items:center;gap:12px;min-height:52px;padding:8px 8px 8px 12px;border-radius:12px}
.cm-click{cursor:pointer;transition:background .2s var(--ease)}
.cm-click:hover{background:color-mix(in srgb,var(--text) 7%,transparent)}
.cm-box{border-radius:16px;padding:16px}
.cm-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.cm-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.cm-g4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.cm-qa{display:grid;grid-template-columns:repeat(4,minmax(0,1fr)) 36px;gap:12px}
.sheet .sf.cm-eq{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr)}
.cm-eq .btn{width:100%}
.cm-chk{color:var(--faint)}
.cm-chk[aria-pressed="true"]{color:rgb(var(--pos))}
.cm-done{text-decoration:line-through;color:var(--faint)}
.cm-rules{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px}
.cm-rules li{display:flex;align-items:center;gap:12px;min-height:32px}
.cm-ok{color:rgb(var(--pos));display:inline-flex;width:16px}
.cm-no{color:rgb(var(--warn));font-weight:700;width:16px;text-align:center}
.cm-date{display:flex;flex-direction:column;align-items:flex-start;width:64px;flex:none}
.cm-steps{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}
.cm-steps i{display:block;height:4px;border-radius:4px;background:color-mix(in srgb,var(--text) 10%,transparent);transition:background .3s var(--ease)}
.cm-steps i.on{background:rgb(var(--primary))}
.cm-fs{border:0;padding:0;margin:16px 0 0}
.cm-fs legend{margin-bottom:8px}
.cm-opt{display:flex;align-items:center;gap:12px;min-height:52px;padding:12px 16px;border-radius:12px;cursor:pointer;box-shadow:inset 0 0 0 1px var(--line);transition:background .2s var(--ease),box-shadow .2s var(--ease)}
.cm-opt:has(input:checked){box-shadow:inset 0 0 0 2px rgb(var(--primary));background:rgb(var(--primary)/.06)}
.cm-opt input{accent-color:rgb(var(--primary));margin:0;flex:none}
.cm-err{color:rgb(var(--neg));font-size:13px;margin:16px 0 0;min-height:20px}
.cm-wiz .mf .btn{width:192px;min-width:0}
.cm-par,.cm-parh{display:grid;grid-template-columns:minmax(0,1fr) 176px 176px 44px;gap:12px;align-items:center}
.cm-par{margin-top:8px}
.cm-addt{display:grid;grid-template-columns:minmax(0,1fr) 120px 192px;gap:12px;margin-top:12px}
.cm-fsec{grid-column:span 12;font-size:13px;font-weight:600;color:var(--soft);padding-top:16px;border-top:1px solid var(--line-2)}
.cm-tl{list-style:none;margin:0;padding:0}
.cm-tl li{position:relative;padding:0 0 20px 28px}
.cm-tl li::before{content:"";position:absolute;left:4px;top:8px;width:8px;height:8px;border-radius:8px;background:rgb(var(--primary))}
.cm-tl li::after{content:"";position:absolute;left:8px;top:20px;bottom:0;width:2px;transform:translateX(-50%);background:var(--line)}
.cm-tl li:last-child::after{display:none}
.cm-prow{border-bottom:1px solid var(--line-2)}
.cm-prow:last-child{border-bottom:0}
.cm-exp{padding:0 var(--pad) 8px calc(var(--pad) + 104px)}
.cm-pblk{padding:16px 0;border-top:1px solid var(--line-2)}
.cm-doc{border-radius:16px;padding:24px}
.cm-doct{margin:12px 0 0;font-size:20px;font-weight:700;letter-spacing:-.01em}
.cm-docl{min-height:48px;border-top:1px solid var(--line-2);gap:12px}
.cm-board{grid-auto-columns:minmax(272px,1fr)}
.cm-drop{padding:16px;text-align:center}
@media (max-width:900px){.cm-wiz .mf .btn{width:auto;flex:1}
 .cm-qa{grid-template-columns:minmax(0,1fr) minmax(0,1fr) 36px}.cm-qa>.btn:nth-child(3),.cm-qa>.btn:nth-child(4){order:2}
 .cm-parh{display:none}.cm-par{grid-template-columns:minmax(0,1fr) 44px;padding-top:8px;border-top:1px solid var(--line-2)}.cm-addt{grid-template-columns:minmax(0,1fr)}
 .sheet .sf.cm-eq{grid-auto-flow:row;grid-template-columns:repeat(2,minmax(0,1fr))}.sheet .sf.cm-eq>.btn:last-child:nth-child(odd){grid-column:1/-1}.sheet .sf.cm-eq>.btn.pri{order:-1}
 .btnrow.cm-b3{grid-template-columns:repeat(3,minmax(0,1fr))}
 .cm-par{grid-template-columns:minmax(0,1fr) minmax(0,1fr) 44px}.cm-par>:first-child{grid-column:1/3}.cm-par>.btn{grid-column:3;grid-row:1}.cm-par>input:nth-child(3){grid-column:2/4}}
.cm-s{display:none}
@container (max-width:479px){.cm-ftabs .tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));width:100%;overflow:visible}.cm-ftabs .tab{padding:0;font-size:12px;overflow:hidden;text-overflow:ellipsis}}
@media (max-width:480px){.cm-l{display:none}.cm-s{display:inline}.cm-b3 .btn svg{display:none}.btnrow.cm-b1{grid-template-columns:minmax(0,1fr)}}
/* contêineres: tabelas, listas e painéis medem a própria largura (vale para os 3 arranjos de layout) */
.cm-ct,.cm-cq,.sheet.cm-mid .sb,.sheet.cm-wide .sb,.cm-wiz .mb{container-type:inline-size}
.cm-ct .tblwrap{position:relative}
.cm-ct .tbl{table-layout:fixed}
.cm-ct .tbl td{overflow:hidden;text-overflow:ellipsis}
.cm-ch{display:inline-block;max-width:100%;line-height:24px;overflow:hidden;text-overflow:ellipsis;vertical-align:middle}
.cm-pap{display:flex;gap:8px;min-width:0;overflow:hidden}
.cm-nm{display:flex;align-items:center;gap:12px;min-width:0}
.cm-nm>div{min-width:0;flex:1}
.cm-nr{display:none}
/* Contatos: Nome · Tipo · Papel · E-mail · Telefone · ações */
@container (max-width:1143px){.cm-tc .tbl tr>:nth-child(2){display:none}}
@container (max-width:1071px){.cm-tc .tbl tr>:nth-child(5){display:none}}
@container (max-width:919px){.cm-tc .tbl tr>:nth-child(4){display:none}.cm-tc .cm-wd{display:none}.cm-tc .cm-nr{display:block}}
@container (max-width:663px){.cm-tc .tbl tr>:nth-child(3){display:none}}
@container (max-width:479px){.cm-tc .tbl th:last-child{width:80px!important}.cm-tc .cm-acts>:not(:last-child){display:none}}
@container (min-width:1400px){.cm-tc .tbl th:nth-child(3){width:280px!important}.cm-tc .tbl th:nth-child(4){width:360px!important}.cm-tc .tbl th:nth-child(5){width:200px!important}
 .cm-tn .tbl th:nth-child(2){width:320px!important}.cm-tn .tbl th:nth-child(4){width:192px!important}
 .cm-tp .tbl th:nth-child(4),.cm-tp .tbl th:nth-child(6){width:160px!important}.cm-tp .tbl th:nth-child(7){width:192px!important}}
/* Negócios (lista): Título · Contato e obra · Etapa · Valor · Status · ações */
@container (max-width:1111px){.cm-tn .tbl tr>:nth-child(5){display:none}}
@container (max-width:999px){.cm-tn .tbl tr>:nth-child(2){display:none}.cm-tn .cm-nr.cm-n1{display:block}}
@container (max-width:759px){.cm-tn .tbl tr>:nth-child(3){display:none}}
@container (max-width:559px){.cm-tn .tbl tr>:nth-child(4){display:none}.cm-tn .cm-nr.cm-n2{display:inline}.cm-tn .tbl th:last-child{width:80px!important}.cm-tn .cm-acts>:not(:last-child){display:none}}
/* Propostas (lista): Número · Proposta · Status · Enviada · Aberta · Validade · Valor · ações */
@container (max-width:1015px){.cm-tp .tbl tr>:nth-child(5),.cm-tp .tbl tr>:nth-child(6){display:none}}
@container (max-width:807px){.cm-tp .tbl tr>:nth-child(1),.cm-tp .tbl tr>:nth-child(4){display:none}.cm-tp .cm-nr.cm-n1{display:inline}}
@container (max-width:591px){.cm-tp .tbl tr>:nth-child(3),.cm-tp .tbl tr>:nth-child(7){display:none}.cm-tp .cm-nr.cm-n2{display:inline}}
/* Propostas por negócio: linha em grade; abaixo de 600 o status e o valor descem para baixo do nome */
.cm-pr{display:grid;grid-template-columns:36px 36px minmax(0,1fr) 96px 144px 36px;gap:16px;align-items:center;padding:12px var(--pad);min-height:72px}
.cm-pi{display:contents}
.cm-pi .chip{width:96px;justify-content:center}
.cm-pi b{text-align:right;white-space:nowrap}
@container (max-width:599px){.cm-pr{grid-template-columns:36px minmax(0,1fr) 36px;gap:4px 12px}.cm-pr>.av{display:none}
 .cm-pi{display:flex;align-items:center;gap:12px;grid-column:2;grid-row:2}.cm-pr>.btn:last-child{grid-column:3;grid-row:1}
 .cm-exp{padding-left:var(--pad)}}
@container (max-width:719px){.cm-g3{grid-template-columns:minmax(0,1fr)}.cm-g4{grid-template-columns:repeat(2,minmax(0,1fr))}}
@container (max-width:759px){.cm-g2{grid-template-columns:minmax(0,1fr)}}
/* linhas de lista com chip/valor: abaixo de 560 o complemento desce para a linha de baixo */
@container (max-width:559px){.cm-r2{flex-wrap:wrap}.cm-r2>div:first-of-type{flex:1 1 calc(100% - 48px)}.cm-r2>.cm-code{flex:1 1 100%}}
/* Kanban: rolagem horizontal suave dentro do quadro, coluna com largura boa em qualquer tela */
.cm-board{grid-auto-columns:minmax(min(280px,calc(100vw - 72px)),1fr);scroll-snap-type:x proximity;scroll-behavior:smooth;overscroll-behavior-x:contain;scroll-padding:0 4px;padding-bottom:12px}
.cm-board>section{scroll-snap-align:start;min-width:0}
.cm-board .colh .lbl{white-space:nowrap}
.cm-board.cm-fr{-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 48px),transparent);mask-image:linear-gradient(90deg,#000 calc(100% - 48px),transparent)}
.cm-board.cm-fl{-webkit-mask-image:linear-gradient(90deg,transparent,#000 48px);mask-image:linear-gradient(90deg,transparent,#000 48px)}
.cm-board.cm-fl.cm-fr{-webkit-mask-image:linear-gradient(90deg,transparent,#000 48px,#000 calc(100% - 48px),transparent);mask-image:linear-gradient(90deg,transparent,#000 48px,#000 calc(100% - 48px),transparent)}
.cm-board .kcard>div:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cm-board .kcard .row{flex-wrap:nowrap}
.cm-board .kcard .row>.chip{min-width:0}
.cm-board .kcard .row>b{white-space:nowrap;flex:none}
@media (prefers-reduced-motion:reduce){.cm-board{scroll-behavior:auto}}
</style>`);

/* ---------- constantes reais ---------- */
const ME='Allysson Moura';
const ETAPAS=D.etapasComerciais;
const PARCEIROS=['Arquiteto(a)','Engenheiro(a)','Designer de Interiores','Construtora','Integrador','Mestre de Obras','Eletricista','Responsável de Escritório','Outros'];
const ORIGENS=['Arquiteto','Engenheiro','Designer de Interiores','Indicação Interna','Relacionamento Pessoal','Showroom','Site','Instagram'];
const MOTIVOS=['Orçamento acima do planejado','Obra adiada pelo cliente','Escolheu outra empresa','Cliente parou de responder'];
const REG=[['Registro Técnico','Visita, execução, pendências.','chave'],['Passagem de bastão','Contexto da venda pra Projetos.','trocar'],
  ['Registro de Projetos','Ata, decisões, adequações.','projetos'],['Registro de Experiência','Contato pós-venda, percepção.','coracao']];
const TIPOS_AG=['Visita técnica','Showroom','Apresentação de proposta','Reunião','Entrega'];
const TAREFAS=[['Fazer o primeiro contato','Registrar origem e quem indicou'],['Entender escopo e momento da obra','Confirmar faixa de investimento'],
  ['Agendar visita técnica','Registrar relatório da visita'],['Montar proposta no construtor','Apresentar proposta ao cliente'],
  ['Registrar objeções do cliente','Ajustar condição de pagamento'],['Confirmar decisão com o cliente','Conferir dados para o fechamento']];
const FASE_TONE={Lead:'n',Comercial:'b',Projetos:'b','Técnica':'w','Experiência':'g'};
const ST_TONE={Rascunho:'n',Enviada:'b',Vista:'b',Aceita:'g',Recusada:'r',Expirada:'w'};
const SORDER=['Rascunho','Enviada','Vista','Aceita','Recusada','Expirada'];
const NEG_TONE={Aberto:'b',Ganho:'g',Perdido:'r'};

/* ---------- utilidades ---------- */
const fd=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');return m?`${m[3]}/${m[2]}/${m[1]}`:(s||'—')};
const fdc=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');return m?`${m[3]}/${m[2]}`:(s||'—')};
const addDays=(iso,n)=>{const d=new Date(iso+'T12:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
const dias=s=>Math.round((new Date(s+'T12:00')-new Date(D.hoje+'T12:00'))/864e5);
const prazoTxt=s=>{if(!s)return 'sem prazo';const n=dias(s);return n===0?'hoje':n===1?'amanhã':n===-1?'ontem':n>0?`em ${n}d`:`há ${-n}d`};
const money=s=>{if(typeof s==='number')return s;const t=String(s||'').replace(/[^\d,.-]/g,'');if(!t)return 0;return +(t.includes(',')?t.replace(/\./g,'').replace(',','.'):t)||0};
const uid=p=>p+Math.random().toString(36).slice(2,8);
const agora=()=>{const d=new Date();return 'hoje, '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')};
const dkey=q=>{if(!q)return 0;if(/^(hoje|agora)/.test(q))return 99999999;const m=/^(\d{2})\/(\d{2})\/(\d{4})/.exec(q);return m?+(m[3]+m[2]+m[1]):0};
const contato=id=>D.byId('contatos',id);
const negocio=id=>D.byId('negocios',id);
const prop=id=>D.byId('propostas',id);
const propsDe=d=>D.propostas.filter(p=>p.nid===d.id).sort((a,b)=>b.upd-a.upd);
const negsDe=c=>D.negocios.filter(n=>n.cid===c.id);
const obrasDe=c=>D.obras.filter(o=>o.cliente===c.nome);
const etapaNome=d=>d.status==='Aberto'?ETAPAS[d.etapa]:d.status;
const maxUpd=()=>Math.max(0,...D.propostas.map(p=>p.upd||0))+1;
const show=(el,on)=>{if(el)el.style.display=on?'':'none'};
const fld=(root,k)=>{const i=$(`[name="${k}"]`,root);return i&&i.closest('.field')};
const setParam=(k,p,id)=>{if(location.hash.replace(/\?.*/,'')==='#/'+k)history.replaceState(null,'',`#/${k}?${p}=${id}`)};
const clearParam=(k,p,id)=>{if(location.hash===`#/${k}?${p}=${id}`)history.replaceState(null,'','#/'+k)};
const tl=(cid,t,d)=>{const c=contato(cid);if(c)c.tl.unshift({q:agora(),t,d})};
const kv=(l,v)=>`<div class="kv"><span>${esc(l)}</span><b>${esc(v)}</b></div>`;
const kvh=(l,v)=>`<div class="kv"><span>${esc(l)}</span><b>${v}</b></div>`;
const sec=(t,inner,btn='')=>`<section class="sec"><div class="cm-sh"><h3>${esc(t)}</h3>${btn}</div>${inner}</section>`;
const nada=t=>`<p class="lbl" style="margin:0">${esc(t)}</p>`;
const noTable=h=>h.replace('card flush rv','card flush');
const ext={
  ligar:c=>M.toast(c&&c.tel?`Ligaria para ${c.nome} · ${c.tel}.`:'Sem telefone cadastrado.'),
  whats:c=>M.toast(c&&c.tel?`Abriria o WhatsApp com ${c.nome} (${c.tel}).`:'Sem telefone cadastrado.'),
  email:c=>M.toast(c&&c.email?`Abriria o e-mail para ${c.email}.`:'Sem e-mail cadastrado.')};
const goObra=id=>{if(M.screens.obra)location.hash='#/obra?id='+id;else if(M.screens.projetos)location.hash='#/projetos';else M.toast('Abriria a obra em Projetos.')};

/* ---------- dados próprios do módulo (completam M.D sem duplicar) ---------- */
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

/* ---------- painel lateral redesenhável (usa M.sheet; repinta o conteúdo sem fechar) ---------- */
const sheetHTML=o=>`<div class="sh"><div class="row" style="align-items:flex-start"><div style="flex:1;min-width:0">${o.kick?`<div class="kick">${esc(o.kick)}</div>`:''}<h2 class="cm-sht">${esc(o.title)}</h2>${o.sub?`<div class="lbl mt8">${o.sub}</div>`:''}${o.chips?`<div class="row mt8" style="gap:8px;flex-wrap:wrap">${o.chips}</div>`:''}</div>${U.btn('',{icon:'x',ghost:true,title:'Fechar',act:'__x'})}</div>${o.top||''}</div>
  <div class="sb">${o.body}</div>${o.foot&&o.foot.length?`<div class="sf cm-eq">${o.foot.map(a=>a.curto?bt2(a.label,a.curto,{act:a.act,icon:a.icon,pri:a.pri}):U.btn(a.label,{act:a.act,icon:a.icon,pri:a.pri,title:a.label})).join('')}</div>`:''}`;
function openPanel(cls,build,h,onClose){
  const s=M.sheet({title:' '}); s.el.classList.add(cls);
  s.paint=()=>{const old=$('.sb',s.el),top=old?old.scrollTop:0,o=build();s.el.setAttribute('aria-label',o.title);s.el.innerHTML=sheetHTML(o);
    M.wire(s.el,{__x:s.close,...h});M.tabs(s.el);o.mount&&o.mount(s.el);$('.sb',s.el).scrollTop=top};
  s.paint();
  const mo=new MutationObserver(()=>{if(!s.el.isConnected){mo.disconnect();onClose&&onClose()}});mo.observe(document.body,{childList:true});
  return s;
}

/* ---------- modais compartilhados ---------- */
function agendar(tipo,cliente,save){
  M.modal({title:tipo==='Showroom'?'Agendar Showroom':tipo==='Apresentação de proposta'?'Agendar proposta':'Novo agendamento',sub:'Cliente: '+esc(cliente),fields:[
    {k:'tipo',label:'Tipo',type:'select',req:true,opts:TIPOS_AG,value:tipo||'Visita técnica',span:6},
    {k:'resp',label:'Responsável',type:'select',req:true,opts:D.equipe.map(u=>u.nome),value:ME,span:6},
    {k:'data',label:'Data',type:'date',req:true,value:addDays(D.hoje,3),span:4},{k:'ini',label:'Início',type:'time',req:true,value:'10:00',span:4},{k:'fim',label:'Término',type:'time',value:'11:00',span:4},
    {k:'local',label:'Local',req:true,span:12,value:tipo==='Showroom'?'Showroom Maestro':'',ph:'Ex.: Showroom Maestro, obra do cliente'},
    {k:'brief',label:'Briefing',type:'textarea',req:true,span:12,ph:'O que precisa acontecer neste encontro'}],ok:'Agendar',
    onOk:v=>{save({tipo:v.tipo,data:v.data,ini:v.ini,fim:v.fim,local:v.local,resp:v.resp,brief:v.brief});M.toast(`Agendado: ${v.tipo} em ${fd(v.data)} às ${v.ini}.`)}});
}
function nexoModal(cliente,save){
  M.modal({title:'Encaminhar Nexo',sub:'Trabalho direcionado entre áreas e pessoas · '+esc(cliente),fields:[
    {k:'titulo',label:'Título',req:true,span:12,ph:'O que precisa ser feito'},{k:'desc',label:'Descrição',type:'textarea',span:12},
    {k:'resp',label:'Responsável',type:'select',req:true,ph:'— Escolha —',opts:D.equipe.map(u=>u.nome),span:4},{k:'prazo',label:'Prazo',type:'date',span:4},
    {k:'prio',label:'Prioridade',type:'select',opts:['Urgente','Alta','Média','Baixa'],value:'Média',span:4}],ok:'Encaminhar',
    onOk:v=>{save({t:v.titulo,resp:v.resp,prazo:v.prazo,prio:v.prio,status:'Aberto'});M.toast(`Nexo encaminhado para ${v.resp}.`)}});
}
const evRow=e=>`<div class="cm-li in"><div class="cm-date"><b class="num">${fdc(e.data)}</b><span class="lbl num" style="font-size:12px">${esc(e.ini||'')}</span></div>
  <div style="flex:1;min-width:0"><div style="font-weight:600">${esc(e.tipo)}</div><div class="lbl cm-ell" style="font-size:12px">${esc(e.local)} · ${esc(e.resp)}${e.de?' · '+esc(e.de):''}</div></div>${U.chip(e.data<D.hoje?'Concluído':'Agendado',e.data<D.hoje?'g':'b')}</div>`;

/* =====================================================================
   CONTATOS
   ===================================================================== */
const PFK=['nasc','cpf','rg','orgao','genero','civil','empresa'], PJK=['cnpj','razao','fundacao','respEmp'];
const CEPS={'30':'Belo Horizonte','31':'Belo Horizonte','32':'Contagem','34':'Nova Lima','35':'Ipatinga'};
const bt2=(label,curto,o={})=>U.btn(label,{...o,title:label,attrs:`${o.attrs||''} aria-label="${esc(label)}"`}).replace(`<span class="bt">${esc(label)}</span>`,`<span class="bt"><span class="cm-l">${esc(label)}</span><span class="cm-s">${esc(curto)}</span></span>`);
const chipE=(t,tone='n')=>`<span class="chip ${tone} cm-ch" title="${esc(t)}">${esc(t)}</span>`;
const papelChips=c=>c.papeis.map(p=>p==='Parceiro'?U.chip('Parceiro'+(c.parceiro?' · '+c.parceiro:''),'n'):U.chip('Cliente','b')).join(' ');
const papelCell=c=>`<div class="cm-pap">${c.papeis.map(p=>p==='Parceiro'?chipE('Parceiro'+(c.parceiro?' · '+c.parceiro:''),'n'):chipE('Cliente','b')).join('')}</div>`;
const faseChip=c=>c.fase&&c.fase!=='—'?U.chip(c.fase,FASE_TONE[c.fase]||'n'):'';

function formContato(c,done){
  const ed=!!c, x=c||{tipo:'PF',papeis:['Cliente'],resp:ME,uf:'MG'};
  const fields=[
    {k:'tipo',label:'Tipo',type:'radio',opts:['Pessoa física','Pessoa jurídica'],value:x.tipo==='PJ'?'Pessoa jurídica':'Pessoa física',span:12},
    {k:'nome',label:x.tipo==='PJ'?'Nome fantasia':'Nome',req:true,span:8,value:x.nome||'',ph:'Como o cliente é chamado'},
    {k:'nasc',label:'Aniversário',type:'date',span:4,value:x.nasc||''},
    {k:'cnpj',label:'CNPJ',span:4,ph:'00.000.000/0000-00',value:x.cnpj||''},
    {k:'razao',label:'Razão social',span:8,value:x.razao||''},
    {k:'fundacao',label:'Fundação',type:'date',span:4,value:x.fundacao||''},
    {k:'tel',label:'Telefone',type:'tel',span:4,ph:'(31) 99999-0000',value:x.tel||''},
    {k:'email',label:'E-mail',type:'email',span:8,ph:'nome@email.com',value:x.email||''},
    {k:'cpf',label:'CPF',span:4,ph:'000.000.000-00',value:x.cpf||''},
    {k:'rg',label:'RG',span:4,value:x.rg||''},
    {k:'orgao',label:'Órgão emissor',span:4,ph:'SSP/MG',value:x.orgao||''},
    {k:'genero',label:'Gênero',type:'select',opts:['Não declarado','Feminino','Masculino','Outro'],span:4,value:x.genero||'Não declarado'},
    {k:'civil',label:'Estado civil',type:'select',ph:'—',opts:['Solteiro(a)','Casado(a)','União estável','Divorciado(a)','Viúvo(a)'],span:4,value:x.civil||''},
    {k:'empresa',label:'Empresa',span:4,value:x.empresa||''},
    {k:'respEmp',label:'Contato responsável na empresa',span:12,value:x.respEmp||''},
    {k:'cep',label:'CEP',span:3,ph:'00000-000',value:x.cep||'',help:'Completa a cidade sozinho.'},
    {k:'rua',label:'Logradouro',span:6,value:x.rua||''},{k:'numero',label:'Número',span:3,value:x.numero||''},
    {k:'compl',label:'Complemento',span:3,value:x.compl||''},{k:'bairro',label:'Bairro',span:3,value:x.bairro||''},
    {k:'cidade',label:'Cidade',span:3,value:x.cidade&&x.cidade!=='—'?x.cidade:''},{k:'uf',label:'UF',span:3,value:x.uf||''},
    {k:'resp',label:'Responsável',type:'select',req:true,opts:D.equipe.map(u=>u.nome),span:6,value:x.resp||ME},
    {k:'papeis',label:'Papel',type:'checks',req:true,opts:['Cliente','Parceiro'],span:6,value:x.papeis||['Cliente']},
    {k:'parceiro',label:'Tipo de parceiro',type:'select',ph:'— Escolha —',opts:PARCEIROS,span:12,value:x.parceiro||''},
    {k:'notas',label:'Notas',type:'textarea',span:12,value:x.notas||'',ph:'O que a equipe precisa saber'}];
  const m=M.modal({title:ed?'Editar contato':'Novo contato',sub:ed?esc(c.nome):'Cliente ou parceiro da operação.',fields,ok:ed?'Salvar':'Cadastrar contato',width:'760px',onOk:(v,el)=>{
    const pj=v.tipo==='Pessoa jurídica';
    if(v.papeis.includes('Parceiro')&&!v.parceiro){const f=fld(el,'parceiro');f.classList.add('err');$('.msg',f).hidden=false;$('[name=parceiro]',el).focus();return false}
    const o={tipo:pj?'PJ':'PF',nome:v.nome,tel:v.tel,email:v.email,cep:v.cep,rua:v.rua,numero:v.numero,compl:v.compl,bairro:v.bairro,cidade:v.cidade||'—',uf:v.uf,
      papeis:v.papeis,papel:v.papeis.length>1?'Cliente e parceiro':v.papeis[0],parceiro:v.papeis.includes('Parceiro')?v.parceiro:'',notas:v.notas,resp:v.resp};
    (pj?PJK:PFK).forEach(k=>o[k]=v[k]); (pj?PFK:PJK).forEach(k=>o[k]='');
    if(ed){Object.assign(c,o);done&&done(c);M.toast('Contato salvo.');return}
    const dup=D.contatos.find(y=>(o.email&&y.email&&y.email.toLowerCase()===o.email.toLowerCase())||y.nome.toLowerCase()===o.nome.toLowerCase());
    const criar=()=>{const n=Object.assign({id:uid('c'),fase:o.papeis.includes('Cliente')?'Lead':'—',tl:[{q:agora(),t:'Contato cadastrado',d:'por '+ME}],ag:[],obs:[],exp:[]},o);
      D.contatos.unshift(n);m.close();done&&done(n);M.toast('Contato cadastrado.','Abrir ficha',()=>openFicha(n.id,done))};
    if(!dup){criar();return false}
    const dm=M.modal({title:'Já existe um contato parecido',sub:`${esc(dup.nome)} · ${esc(dup.email||dup.tel||'sem e-mail')}`,width:'560px',
      body:`<p class="soft" style="margin:0">Cadastrar de novo cria duas fichas para a mesma pessoa. Use o contato existente ou cadastre assim mesmo.</p>`,
      cancel:'Cancelar',ok:'Usar contato existente',extra:U.btn('Cadastrar mesmo assim',{act:'dupok'}),onOk:()=>{m.close();openFicha(dup.id,done)}});
    $('[data-act="dupok"]',dm.el).onclick=()=>{dm.close();criar()};
    return false}});
  const el=m.el;
  fld(el,'cep').insertAdjacentHTML('beforebegin','<div class="cm-fsec">Endereço</div>');
  fld(el,'resp').insertAdjacentHTML('beforebegin','<div class="cm-fsec">Relação com a empresa</div>');
  const tipo=()=>{const pj=$('[name=tipo]:checked',el).value==='Pessoa jurídica';PFK.forEach(k=>show(fld(el,k),!pj));PJK.forEach(k=>show(fld(el,k),pj));
    $('span',fld(el,'nome')).firstChild.nodeValue=pj?'Nome fantasia':'Nome'};
  const parc=()=>show(fld(el,'parceiro'),$$('[name=papeis]:checked',el).some(i=>i.value==='Parceiro'));
  $$('[name=tipo]',el).forEach(r=>r.onchange=tipo); $$('[name=papeis]',el).forEach(r=>r.addEventListener('change',parc)); tipo(); parc();
  const cep=$('[name=cep]',el); cep.addEventListener('input',()=>{const d=cep.value.replace(/\D/g,'').slice(0,8);cep.value=d.length>5?d.slice(0,5)+'-'+d.slice(5):d;
    if(d.length===8){const cid=CEPS[d.slice(0,2)];if(cid){$('[name=cidade]',el).value=cid;$('[name=uf]',el).value='MG';M.toast('Cidade preenchida pelo CEP.')}else M.toast('CEP não encontrado. Preencha o endereço.')}});
}
function excluirContato(c,done){
  const ativos=negsDe(c).filter(n=>n.status==='Aberto');
  if(ativos.length)return M.modal({title:`Não dá para excluir ${c.nome}`,sub:`Tem ${ativos.length} negócio${ativos.length>1?'s':''} ativo${ativos.length>1?'s':''}. Encerre ou transfira antes.`,width:'560px',
    cancel:'Fechar',ok:'Ver negócios',onOk:()=>{location.hash='#/negocios?q='+encodeURIComponent(c.nome)}});
  M.modal({title:'Excluir contato',sub:esc(c.nome)+' sai da lista. Fica registrado quem excluiu e por quê.',width:'560px',danger:true,ok:'Excluir',fields:[
    {k:'senha',label:'Senha (protótipo: não use a real)',ph:'qualquer texto',type:'password',req:true,span:12},{k:'motivo',label:'Justificativa',type:'textarea',req:true,span:12,ph:'Por que este contato está saindo?'}],
    onOk:()=>{const i=D.contatos.indexOf(c);D.contatos.splice(i,1);done&&done();M.toast(`${c.nome} excluído.`,'Desfazer',()=>{D.contatos.splice(i,0,c);done&&done()})}});
}

/* ---------- Ficha do cliente (360) ---------- */
function vinculos(c){const it=[];
  if(c.conjuge)it.push(['Cônjuge',c.conjuge,null]);
  [...new Set(negsDe(c).map(n=>n.indicado).filter(Boolean))].map(contato).filter(Boolean).forEach(p=>it.push(['Indicou este cliente'+(p.parceiro?' · '+p.parceiro:''),p.nome,p.id]));
  if(c.papeis.includes('Parceiro'))[...new Set(D.negocios.filter(n=>n.indicado===c.id).map(n=>n.cid))].map(contato).filter(Boolean).forEach(x=>it.push(['Cliente indicado',x.nome,x.id]));
  return it.length?`<div class="cm-list">${it.map(([l,n,id])=>`<div class="row" style="min-height:44px;gap:12px">${U.av(n)}<div style="flex:1;min-width:0"><div class="cm-ell" style="font-weight:600">${esc(n)}</div><div class="lbl" style="font-size:12px">${esc(l)}</div></div>${id?U.btn('',{icon:'seta',sm:true,ghost:true,title:'Abrir ficha de '+n,act:'outra',attrs:`data-id="${id}"`}):''}</div>`).join('')}</div>`:nada('Nenhum vínculo registrado.');
}
function alertas(c){const a=[];
  negsDe(c).forEach(n=>{propsDe(n).forEach(p=>{if(p.status==='Vista'&&p.abertas>=2)a.push(['b',`Abriu a proposta ${p.numero} ${p.abertas} vezes`,'Ainda sem resposta. Bom momento para ligar.'])});
    n.acoes.filter(x=>!x.done&&x.prazo&&x.prazo<D.hoje).forEach(x=>a.push(['w','Ação atrasada: '+x.t,`${n.titulo} · venceu ${prazoTxt(x.prazo)}`]))});
  return a;
}
function fVisao(c){
  const ns=negsDe(c),obs=obrasDe(c),acoes=ns.flatMap(n=>n.acoes.filter(a=>!a.done).map(a=>({...a,neg:n}))),al=alertas(c),pj=c.tipo==='PJ';
  return `${al.length?`<div class="cm-list" style="margin-bottom:16px">${al.map(([t,a,b])=>`<div class="cm-li in"><span class="dot" style="background:rgb(var(--${t==='w'?'warn':'primary'}))"></span><div style="min-width:0"><div style="font-weight:600">${esc(a)}</div><div class="lbl" style="font-size:12px">${esc(b)}</div></div></div>`).join('')}</div>`:''}
  <div class="cm-g2">
    <div class="in cm-box"><div class="cm-sh"><h3>Contato</h3></div>
      ${kv('Tipo',pj?'Pessoa jurídica':'Pessoa física')}${kv('E-mail',c.email||'—')}${kv('Telefone',c.tel||'—')}${kv('Cidade',(c.cidade||'—')+(c.uf?' · '+c.uf:''))}
      ${kv(pj?'CNPJ':'CPF',(pj?c.cnpj:c.cpf)||'—')}${kv('Responsável',c.resp||ME)}
      <div class="btnrow cm-b3 mt16">${U.btn('Ligar',{sm:true,icon:'telefone',act:'ligar'})}${U.btn('WhatsApp',{sm:true,icon:'zap',act:'whats'})}${U.btn('E-mail',{sm:true,icon:'email',act:'email'})}</div></div>
    <div class="stack" style="gap:16px">
      <div class="in cm-box"><div class="cm-sh"><h3>Vínculos</h3></div>${vinculos(c)}</div>
      <div class="in cm-box"><div class="cm-sh"><h3>Próximas ações</h3><span class="lbl">${acoes.length}</span></div>${acoes.length?`<div class="cm-list">${acoes.map(a=>`<div style="min-width:0"><div style="font-weight:600">${esc(a.t)}</div><div class="lbl" style="font-size:12px">${prazoTxt(a.prazo)} · ${esc(a.resp)} · ${esc(a.neg.titulo)}</div></div>`).join('')}</div>`:nada('Nada pendente para este cliente.')}</div>
    </div></div>
  ${sec('Negócios deste cliente',ns.length?`<div class="cm-list">${ns.map(n=>`<article class="cm-li cm-r2 in cm-click" data-act="neg" data-id="${n.id}" tabindex="0" role="button" aria-label="Abrir negócio ${esc(n.titulo)}">
      <div style="flex:1;min-width:0"><div class="cm-ell" style="font-weight:600">${esc(n.titulo)}</div><div class="lbl" style="font-size:12px">${esc(n.resp)} · ${esc(n.origem||'Sem origem')}</div></div>
      ${U.chip(etapaNome(n),n.status==='Aberto'?'n':NEG_TONE[n.status])}<b class="num" style="width:128px;text-align:right">${brl(n.valor)}</b><span class="faint" aria-hidden="true">${ic('seta',16)}</span></article>`).join('')}</div>`:nada('Nenhum negócio ainda. Use “Novo negócio” no rodapé.'))}
  ${sec('Projetos',obs.length?`<div class="cm-list">${obs.map(o=>`<article class="cm-li cm-r2 in cm-click" data-act="obra" data-id="${o.id}" tabindex="0" role="button" aria-label="Abrir obra ${esc(o.nome)}">
      <div style="flex:1;min-width:0"><div class="cm-ell" style="font-weight:600">${esc(o.nome)}</div><div class="lbl" style="font-size:12px">${esc(o.etapa)} · ${esc(o.status)}</div></div>
      <div style="width:120px">${U.prog(o.pct)}</div><b class="num" style="width:48px;text-align:right">${o.pct}%</b><span class="faint" aria-hidden="true">${ic('seta',16)}</span></article>`).join('')}</div>`:nada('Nenhum projeto aberto.'))}
  ${sec('Experiência',c.exp.length?`<div class="cm-list">${c.exp.map(x=>`<div class="cm-li in"><div style="flex:1;min-width:0"><div style="font-weight:600">${esc(x.t)}</div><div class="lbl" style="font-size:12px">${esc(x.q)}</div></div>${U.chip(x.st,'g')}</div>`).join('')}</div>`:nada('Nada registrado em Experiência ainda.'))}`;
}
function fAgenda(c){
  const ev=[...c.ag.map(e=>({...e,de:''})),...negsDe(c).flatMap(n=>n.ag.map(e=>({...e,de:n.titulo})))].sort((a,b)=>(a.data+a.ini).localeCompare(b.data+b.ini));
  return ev.length?`<div class="cm-list">${ev.map(evRow).join('')}</div>`:U.empty({title:'Nada agendado para este cliente.',text:'Use “Agendar” para marcar visita, showroom ou apresentação.'});
}
function fTimeline(c){
  const der=[];
  negsDe(c).forEach(n=>{propsDe(n).forEach(p=>{if(p.enviada)der.push({q:p.enviada,t:`Proposta ${p.numero} enviada`,d:`${p.titulo} · ${brl(p.valor)}`})});
    if(n.status==='Ganho'&&n.fech)der.push({q:n.fech.q,t:'Negócio ganho',d:`${n.titulo} · ${brl(n.fech.valor)}`});
    if(n.status==='Perdido'&&n.perda)der.push({q:n.perda.q,t:'Negócio perdido',d:`${n.titulo} · ${n.perda.motivo}`})});
  obrasDe(c).forEach(o=>der.push({q:o.inicio,t:'Projeto aberto',d:o.nome}));
  const all=[...c.tl,...der].map((x,i)=>({...x,i})).sort((a,b)=>dkey(b.q)-dkey(a.q)||a.i-b.i);
  return all.length?`<ol class="cm-tl">${all.map(x=>`<li><div class="lbl" style="font-size:12px">${esc(x.q)}</div><div style="font-weight:600">${esc(x.t)}</div>${x.d?`<div class="soft" style="font-size:13px">${esc(x.d)}</div>`:''}</li>`).join('')}</ol>`:U.empty({title:'Nada na timeline ainda.'});
}
function fObs(c){
  const all=[...c.obs.map(o=>({...o,de:''})),...negsDe(c).flatMap(n=>n.obs.map(o=>({...o,de:n.titulo})))];
  return `<label class="field" for="cm-obs"><span>Nova observação</span><textarea class="input" id="cm-obs" placeholder="Escreva o que a equipe precisa saber sobre este cliente"></textarea></label>
   <div class="row mt16"><span class="spacer"></span>${U.btn('Salvar observação',{sm:true,act:'salvarobs',w:'176px'})}</div>
   <div class="cm-list mt16">${all.map(o=>`<div class="in cm-box"><div>${esc(o.t)}</div><div class="lbl mt8" style="font-size:12px">${esc(o.quem)} · ${esc(o.q)}${o.de?' · '+esc(o.de):''}</div></div>`).join('')||nada('Nenhuma observação ainda.')}</div>`;
}
function openFicha(id,onChange){
  const c=contato(id); if(!c)return M.toast('Contato não encontrado.');
  setParam('contatos','ficha',id);
  let s,tab=0;
  const TABS=[fVisao,fAgenda,fTimeline,fObs];
  const up=()=>{onChange&&onChange();s.paint()};
  const fora=fn=>{s.close();setTimeout(fn,0)};
  const h={
    agendar:()=>agendar('',c.nome,e=>{c.ag.push(e);tl(c.id,'Agendamento',`${e.tipo} em ${fd(e.data)} às ${e.ini}`);up()}),
    encaminhar:()=>nexoModal(c.nome,n=>{tl(c.id,'Nexo encaminhado',`${n.t} · para ${n.resp}`);up()}),
    registrar:el=>M.menu(el,REG.map(([l,dsc,i])=>({label:l,icon:i,run:()=>{
      const extra=l==='Registro Técnico'?{k:'x',label:'Pendências',type:'textarea',span:12}:l==='Passagem de bastão'?{k:'x',label:'Para quem passa',type:'select',req:true,opts:D.equipe.map(u=>u.nome),value:'Diego Rocha',span:6}
        :l==='Registro de Projetos'?{k:'x',label:'Decisões',type:'textarea',span:12}:{k:'x',label:'Percepção do cliente',type:'select',opts:['Muito satisfeito','Satisfeito','Neutro','Insatisfeito'],value:'Satisfeito',span:6};
      M.modal({title:l,sub:esc(dsc)+' · '+esc(c.nome),fields:[{k:'data',label:'Data',type:'date',req:true,value:D.hoje,span:6},...(extra.span===6?[extra]:[]),{k:'resumo',label:'Resumo',type:'textarea',req:true,span:12},...(extra.span===12?[extra]:[])],ok:'Salvar registro',
        onOk:v=>{tl(c.id,l,v.resumo+(v.x?' · '+v.x:''));tab=2;up();M.toast('Registro salvo na timeline.')}})}}))),
    ligar:()=>ext.ligar(c),whats:()=>ext.whats(c),email:()=>ext.email(c),
    editar:()=>formContato(c,up),
    novoneg:()=>formNegocio(null,up,{cid:c.id}),
    neg:el=>fora(()=>{location.hash='#/negocios?card='+el.dataset.id}),
    obra:el=>fora(()=>goObra(el.dataset.id)),
    outra:el=>fora(()=>openFicha(el.dataset.id,onChange)),
    salvarobs:()=>{const t=$('#cm-obs',s.el),v=t.value.trim();if(!v){t.focus();return M.toast('Escreva a observação antes de salvar.')}
      c.obs.unshift({t:v,quem:ME,q:agora()});up();M.toast('Observação salva.')}};
  s=openPanel('cm-wide',()=>({kick:'Ficha do cliente',title:c.nome,sub:[c.email,c.tel,c.cidade!=='—'?c.cidade:''].filter(Boolean).map(esc).join(' · '),chips:faseChip(c)+' '+papelChips(c),
    top:`<div class="btnrow cm-b3 mt16">${U.btn('Agendar',{sm:true,icon:'agenda',act:'agendar'})}${U.btn('Encaminhar',{sm:true,icon:'trocar',act:'encaminhar'})}${U.btn('Registrar',{sm:true,icon:'doc',act:'registrar',attrs:'aria-haspopup="menu"'})}</div>`,
    body:`<div class="mt16 cm-ftabs">${M.tabsHTML(['Visão','Agenda','Timeline','Observações'],tab,'in','Seções da ficha')}</div><div class="mt24" id="cm-fc">${TABS[tab](c)}</div>`,
    foot:[{label:'Editar contato',act:'editar'},{label:'Novo negócio',act:'novoneg'}],
    mount:el=>$('[data-tabs]',el).addEventListener('tab',e=>{tab=e.detail;const fc=$('#cm-fc',el);fc.innerHTML=TABS[tab](c);M.wire(fc,h);$('.sb',el).scrollTop=0})}),h,()=>clearParam('contatos','ficha',id));
}

/* ---------- tela Contatos ---------- */
const cS={q:'',papel:'todos',sort:'nome',dir:1};
const CSORT=[['nome','Nome'],['tipo','Tipo'],['papel','Papel'],['email','E-mail'],['tel','Telefone']];
M.screen('contatos',{title:'Contatos',dock:'contatos',
  help:['Busque por nome, e-mail ou empresa e filtre pelo Papel: clientes ou parceiros.',
        'Clique no título de uma coluna para ordenar. Os ícones da linha ligam, abrem o WhatsApp ou o e-mail; o ⋯ abre a ficha, edita ou exclui.',
        'Clique na linha para abrir a Ficha do cliente: visão geral, agenda, timeline e observações.',
        '“Novo contato” cadastra pessoa física ou jurídica. O CEP completa a cidade sozinho.'],
  variants:{A:{label:'Lista',render:()=>`${U.page({kick:'Comercial',title:'Contatos',sub:'Clientes e parceiros da operação.',acts:[{label:'Novo contato',icon:'mais',act:'novo',pri:true}]})}
    ${U.bar(U.search('Buscar por nome, e-mail, empresa…','cm-cq','360px')+U.seg('cm-papel',[['todos','Todos'],['Cliente','Clientes'],['Parceiro','Parceiros']],cS.papel,'Papel'),`<span class="lbl num" id="cm-ccount"></span>`)}
    <div id="cm-clist" class="rv cm-ct cm-tc" style="--d:2"></div>`,
  mount:v=>{
    const box=$('#cm-clist',v),qi=$('#cm-cq',v); qi.value=cS.q; let rows=[];
    const list=()=>{const q=cS.q.trim().toLowerCase();
      return D.contatos.filter(c=>(cS.papel==='todos'||c.papeis.includes(cS.papel))&&(!q||[c.nome,c.email,c.empresa,c.razao,c.tel,c.cidade].join(' ').toLowerCase().includes(q)))
        .sort((a,b)=>String(a[cS.sort]||'').localeCompare(String(b[cS.sort]||''),'pt')*cS.dir)};
    const h={
      ligar:el=>ext.ligar(contato(el.dataset.id)),whats:el=>ext.whats(contato(el.dataset.id)),email:el=>ext.email(contato(el.dataset.id)),
      mais:el=>{const c=contato(el.dataset.id);M.menu(el,[{label:'Abrir ficha',icon:'contatos',run:()=>openFicha(c.id,draw)},{label:'Editar',icon:'doc',run:()=>formContato(c,draw)},'-',
        {label:'Ligar',icon:'telefone',run:()=>ext.ligar(c)},{label:'WhatsApp',icon:'zap',run:()=>ext.whats(c)},{label:'E-mail',icon:'email',run:()=>ext.email(c)},'-',{label:'Excluir',icon:'lixo',danger:true,run:()=>excluirContato(c,draw)}])},
      ficha:tr=>openFicha(rows[+tr.dataset.i].id,draw),
      limpar:()=>{cS.q='';qi.value='';cS.papel='todos';$$('#cm-papel button',v).forEach(b=>b.setAttribute('aria-pressed',b.dataset.v==='todos'));draw()}};
    function draw(){
      rows=list();
      box.innerHTML=noTable(U.table({rows,rowAct:'ficha',empty:{title:'Nenhum contato encontrado.',text:'Tente outro nome, e-mail ou empresa.',btn:'Limpar busca',act:'limpar'},cols:[
        {h:'Nome',html:c=>`<div class="cm-nm">${U.av(c.nome)}<div><div class="cm-ell" style="font-weight:600" title="${esc(c.nome)}">${esc(c.nome)}</div><div class="lbl cm-ell cm-wd" style="font-size:12px">${esc(c.empresa||c.razao||(c.cidade!=='—'?c.cidade:'')||'')}</div><div class="lbl cm-ell cm-nr" style="font-size:12px">${esc(c.email||c.tel||c.empresa||c.razao||(c.cidade!=='—'?c.cidade:'')||'')}</div></div></div>`},
        {h:'Tipo',w:'72px',html:c=>U.chip(c.tipo,'n')},
        {h:'Papel',w:'208px',html:papelCell},
        {h:'E-mail',w:'256px',html:c=>c.email?`<span title="${esc(c.email)}">${esc(c.email)}</span>`:'<span class="faint">—</span>'},
        {h:'Telefone',w:'152px',html:c=>`<span class="num">${esc(c.tel||'—')}</span>`},
        {h:'',w:'216px',r:true,html:c=>`<div class="cm-acts">${U.btn('',{icon:'telefone',sm:true,ghost:true,title:'Ligar para '+c.nome,act:'ligar',attrs:`data-id="${c.id}"`})}${U.btn('',{icon:'zap',sm:true,ghost:true,title:'WhatsApp de '+c.nome,act:'whats',attrs:`data-id="${c.id}"`})}${U.btn('',{icon:'email',sm:true,ghost:true,title:'E-mail para '+c.nome,act:'email',attrs:`data-id="${c.id}"`})}${U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Mais ações de '+c.nome,act:'mais',attrs:`data-id="${c.id}" aria-haspopup="menu"`})}</div>`}]}));
      const ths=$$('thead th',box);
      CSORT.forEach(([k,l],i)=>{const th=ths[i];if(!th)return;const on=cS.sort===k;th.setAttribute('aria-sort',on?(cS.dir>0?'ascending':'descending'):'none');
        th.innerHTML=`<button type="button" class="cm-th" data-sort="${k}">${l}<span class="cm-ar${on?' on':''}${on&&cS.dir>0?' up':''}">${ic('baixo',12)}</span></button>`});
      $$('[data-sort]',box).forEach(b=>b.onclick=()=>{const k=b.dataset.sort;cS.dir=cS.sort===k?-cS.dir:1;cS.sort=k;draw();const nb=$(`[data-sort="${k}"]`,box);nb&&nb.focus()});
      M.wire(box,h);
      $('#cm-ccount',v).textContent=`${rows.length} de ${D.contatos.length} contatos`;
    }
    qi.oninput=()=>{cS.q=qi.value;draw()};
    U.bindSeg(v,'cm-papel',x=>{cS.papel=x;draw()});
    draw();
    M.wire(v,{novo:()=>formContato(null,draw)});
    const f=M.q&&M.q.get('ficha'); if(f)openFicha(f,draw);
  }}}});

/* =====================================================================
   NEGÓCIOS
   ===================================================================== */
const regras=d=>{const t=TAREFAS[d.etapa],f=d.feitas[d.etapa]||[],n=t.filter((_,i)=>f[i]).length,ps=propsDe(d);
  const r=[[`Tarefas desta etapa concluídas (${n}/${t.length})`,n===t.length],['Valor estimado preenchido',d.valor>0]];
  if(d.etapa>=3)r.push(['Proposta enviada ao cliente',ps.some(p=>['Enviada','Vista','Aceita'].includes(p.status))]);
  if(d.etapa>=4)r.push(['Próxima ação marcada',d.acoes.some(a=>!a.done)]);
  return r};

function formNegocio(d,done,pre={}){
  const ed=!!d, x=d||Object.assign({etapa:0,resp:ME,prob:20,escopo:'Individual'},pre);
  const clientes=D.contatos.filter(c=>c.papeis.includes('Cliente')), parc=D.contatos.filter(c=>c.papeis.includes('Parceiro'));
  const m=M.modal({title:ed?'Editar negócio':'Novo negócio',sub:ed?esc(d.titulo):'Entra no pipeline comercial.',width:'760px',ok:ed?'Salvar':'Criar negócio',fields:[
    {k:'cid',label:'Cliente',type:'select',req:true,ph:'— Escolha o cliente —',opts:clientes.map(c=>[c.id,c.nome]),span:6,value:x.cid||''},
    {k:'titulo',label:'Título',span:6,ph:'Ex.: Automação residencial',value:x.titulo||''},
    {k:'pipeline',label:'Pipeline',type:'select',req:true,opts:['Comercial'],span:4,value:'Comercial'},
    {k:'etapa',label:ed?'Etapa':'Etapa inicial',type:'select',req:true,opts:ETAPAS.map((e,i)=>[String(i),e]),span:4,value:String(x.etapa)},
    {k:'origem',label:'Origem',type:'select',ph:'—',opts:ORIGENS,span:4,value:x.origem||''},
    {k:'valor',label:'Valor',type:'money',span:4,value:x.valor?brl(x.valor):''},
    {k:'prob',label:'Probabilidade (%)',type:'number',span:4,value:String(x.prob??'')},
    {k:'fech',label:'Fechamento previsto',type:'date',span:4,value:x.fech&&!x.fech.pid?x.fech:''},
    {k:'indicado',label:'Indicado por',type:'select',ph:'— Ninguém —',opts:parc.map(c=>[c.id,c.nome]),span:6,value:x.indicado||''},
    {k:'faturar',label:'Faturar para',type:'select',ph:'— O próprio cliente —',opts:D.contatos.map(c=>[c.id,c.nome]),span:6,value:x.faturar||''},
    {k:'escopo',label:'Escopo',type:'radio',opts:['Individual','Casal'],span:6,value:x.escopo||'Individual'},
    {k:'resp',label:'Responsável',type:'select',req:true,opts:D.equipe.map(u=>u.nome),span:6,value:x.resp||ME},
    {k:'conjuge',label:'Cônjuge',span:12,value:x.conjuge||'',ph:'Nome do cônjuge'}],
    onOk:v=>{const c=contato(v.cid);
      const o={titulo:v.titulo||('Negócio · '+c.nome),cliente:c.nome,cid:c.id,etapa:+v.etapa,origem:v.origem,valor:money(v.valor),prob:Math.max(0,Math.min(100,+v.prob||0)),
        indicado:v.indicado,faturar:v.faturar,escopo:v.escopo,conjuge:v.escopo==='Casal'?v.conjuge:'',resp:v.resp};
      if(!(x.fech&&x.fech.pid))o.fech=v.fech;
      if(ed){Object.assign(d,o);done&&done(d);M.toast('Negócio salvo.');return}
      const n=Object.assign({id:uid('n'),status:'Aberto',feitas:{0:[false,false],1:[false,false],2:[false,false],3:[false,false],4:[false,false],5:[false,false]},acoes:[],ag:[],obs:[],anexos:[],nexos:[]},o);
      for(let e=0;e<n.etapa;e++)n.feitas[e]=[true,true];
      D.negocios.push(n); if(c.fase==='Lead')c.fase='Comercial'; tl(c.id,'Negócio criado',`${n.titulo} · ${ETAPAS[n.etapa]}`);
      done&&done(n); M.toast('Negócio criado.','Abrir',()=>openCard(n.id,done))}});
  const el=m.el, cj=()=>show(fld(el,'conjuge'),($('[name=escopo]:checked',el)||{}).value==='Casal');
  $$('[name=escopo]',el).forEach(r=>r.onchange=cj); cj();
}
function excluirNeg(d,done){
  M.confirm({title:'Excluir negócio',text:`${d.titulo} · ${d.cliente}`,ok:'Excluir',danger:true,field:'Motivo',run:()=>{
    const i=D.negocios.indexOf(d);D.negocios.splice(i,1);done&&done();M.toast('Negócio excluído.','Desfazer',()=>{D.negocios.splice(i,0,d);done&&done()})}});
}
function reverter(d,done,etapa=5){
  M.confirm({title:'Reverter decisão',text:`${d.titulo} volta para o pipeline, na etapa “${ETAPAS[etapa]}”.`,ok:'Reverter decisão',field:'Motivo',run:v=>{
    const was=d.status;d.status='Aberto';d.etapa=etapa;d.prob=50;
    if(was==='Perdido'&&d.perda){const p=prop(d.perda.pid);if(p&&p.status==='Recusada'&&p.antes){p.status=p.antes;p.motivo=''}}
    d.obs.unshift({t:'Decisão revertida: '+v.motivo,quem:ME,q:agora()});tl(d.cid,'Decisão revertida',d.titulo);done&&done();M.toast('Negócio de volta ao pipeline.')}});
}
function avancar(d,done){
  if(d.etapa>=5)return fechamento(d,done);
  const pend=regras(d).filter(r=>!r[1]),
    go=()=>{const old=d.etapa;d.etapa++;tl(d.cid,'Negócio avançou',`${d.titulo} → ${ETAPAS[d.etapa]}`);done&&done();M.toast(`Avançou para “${ETAPAS[d.etapa]}”.`,'Desfazer',()=>{d.etapa=old;done&&done()})};
  if(!pend.length)return go();
  M.modal({title:`Avançar para “${ETAPAS[d.etapa+1]}”?`,sub:'Estas regras de avanço ainda estão pendentes.',width:'560px',ok:'Avançar mesmo assim',
    body:`<ul class="cm-rules">${pend.map(r=>`<li><span class="cm-no" aria-hidden="true">!</span><span>${esc(r[0])}</span></li>`).join('')}</ul>
      <label class="field mt16" for="cm-just"><span>Justificativa <b class="req" aria-hidden="true">*</b></span><textarea class="input" id="cm-just" placeholder="Por que avançar mesmo assim?"></textarea><span class="msg" hidden>Obrigatório.</span></label>`,
    onOk:(v,el)=>{const t=$('#cm-just',el),j=t.value.trim(),f=t.closest('.field');f.classList.toggle('err',!j);$('.msg',f).hidden=!!j;if(!j){t.focus();return false}
      d.obs.unshift({t:j,quem:ME,q:agora(),just:true});go()}});
}

/* ---------- perda ---------- */
function perda(d,done){
  const ps=propsDe(d), cur=ps.find(p=>!['Recusada','Expirada'].includes(p.status))||ps[0];
  const tiers=p=>p?p.opc.map((o,k)=>[String(k),`${o[0]} — ${brl(o[1])}`]):[];
  const tdef=p=>String(p.esc>=0?p.esc:p.opc.length-1);
  const fields=[{k:'motivo',label:'Motivo da perda',type:'select',req:true,ph:'— Escolha o motivo —',opts:[...MOTIVOS,'Outro'],span:12}];
  if(cur)fields.push({k:'pid',label:'Qual proposta foi perdida?',type:'select',req:true,opts:ps.map(p=>[p.id,`${p.numero} · ${p.titulo}`]),value:cur.id,span:6},
    {k:'tier',label:'Nível perdido',type:'select',opts:tiers(cur),value:tdef(cur),span:6});
  fields.push({k:'texto',label:'Conte o que aconteceu',type:'textarea',span:12,ph:'Obrigatório quando o motivo é “Outro” (mín. 10 caracteres).'});
  const m=M.modal({title:'Registrar perda',sub:esc(`${d.titulo} · ${d.cliente}`),fields,width:'640px',danger:true,ok:'Marcar como perdido',
    body:cur?`<div class="kv mt16"><span>Valor que será congelado</span><b class="num" id="cm-cong"></b></div>`:'',
    onOk:(v,el)=>{
      if(v.motivo==='Outro'&&v.texto.length<10){const f=fld(el,'texto');f.classList.add('err');const ms=$('.msg',f);ms.textContent='Mínimo de 10 caracteres.';ms.hidden=false;$('[name=texto]',el).focus();return false}
      const snap={status:d.status,prob:d.prob,perda:d.perda},p=v.pid?prop(v.pid):null,ps0=p&&{status:p.status,motivo:p.motivo};
      d.status='Perdido';d.prob=0;d.perda={motivo:v.motivo,texto:v.texto,pid:v.pid||'',tier:+v.tier||0,valor:p?p.opc[+v.tier||0][1]:d.valor,q:fd(D.hoje)};
      if(p&&p.status!=='Aceita'){p.antes=p.status;p.status='Recusada';p.motivo=v.motivo}
      tl(d.cid,'Negócio perdido',`${d.titulo} · ${v.motivo}`);done&&done();
      M.toast('Negócio marcado como perdido.','Desfazer',()=>{Object.assign(d,snap);if(p)Object.assign(p,ps0);done&&done()})}});
  if(cur){const el=m.el,sp=$('[name=pid]',el),st=$('[name=tier]',el),upd=()=>{const p=prop(sp.value);$('#cm-cong',el).textContent=brl(p.opc[+st.value||0][1])};
    sp.onchange=()=>{const p=prop(sp.value);st.innerHTML=tiers(p).map(([a,b])=>`<option value="${a}">${esc(b)}</option>`).join('');st.value=tdef(p);upd()};st.onchange=upd;upd()}
}

/* ---------- fechamento em passos (ganho) ---------- */
const PASSOS=['Proposta e valor','Conferência de dados','Escopo e pré-projeto','Condição de pagamento','Destino do projeto','Confirmação'];
const DESTINOS=[['novo','Abrir novo projeto','Cria Projeto + Técnica + Sucesso do Cliente.'],['integrar','Integrar a projeto em andamento','Vincula sem duplicar cards; o escopo entra como bloco adicional.'],['nao','Não abrir projeto agora','Fecha o ganho sem abrir Projeto, Técnica ou Sucesso do Cliente.']];
function fechamento(d,done){
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
  const m=M.modal({title:'Fechar como ganho',sub:esc(`${d.titulo} · ${d.cliente}`),body:'<div id="cm-wz"></div>',ok:'Continuar',cancel:'Voltar',width:'760px'});
  m.el.classList.add('cm-wiz');
  const wz=$('#cm-wz',m.el), okB=$('[data-ok]',m.el), backB=$('[data-c]',m.el);
  const soma=()=>W.parc.reduce((a,x)=>a+x[1],0);
  const somaTxt=()=>{const df=soma()-V();return `<span class="lbl">Soma das parcelas</span> <b class="num">${brl(soma())}</b> ${Math.abs(df)<0.01?U.chip('Confere','g'):U.chip('Diferença '+brl(Math.abs(df)),'r')}`};
  const read=()=>{const g=n=>{const i=$(`[name="${n}"]`,wz);return i?i.value.trim():''},r=n=>{const i=$(`[name="${n}"]:checked`,wz);return i?i.value:null};
    if(W.step===0&&ps.length){W.pid=g('w_pid')||W.pid;const t=r('w_tier');if(t!=null)W.tier=+t}
    if(W.step===1){W.rua=g('w_rua');W.cidade=g('w_cidade');W.uf=g('w_uf');W.arq=g('w_arq');W.eng=g('w_eng')}
    if(W.step===2)W.escopo=g('w_escopo');
    if(W.step===3)W.parc=$$('.cm-par',wz).map(row=>{const i=$$('input',row);return [i[0].value.trim(),money(i[1].value),i[2].value]});
    if(W.step===4){W.destino=r('w_dest')||W.destino;W.obraInt=g('w_obra')}
    if(W.step===5)W.faturar=g('w_fat')};
  const check=()=>{switch(W.step){
    case 0:if(!ps.length)return 'Este negócio não tem proposta.';if(!W.pid)return 'Escolha a proposta vencedora.';if(W.tier==null)return 'Escolha o nível fechado.';return '';
    case 1:if(!W.rua||!W.cidade||!W.uf)return 'Endereço da obra: rua, cidade e UF são obrigatórios.';if(!W.arq)return 'Arquiteto: escolha um contato OU marque “Não tem”.';if(!W.eng)return 'Engenheiro: escolha um contato OU marque “Não tem”.';return '';
    case 2:return W.escopo?'':'Descreva o escopo da obra.';
    case 3:if(!W.parc.length)return 'Adicione pelo menos uma parcela para continuar.';if(W.parc.some(x=>!x[2]))return 'Toda parcela precisa de data prevista. Sem data não existe fluxo de caixa projetado.';
      if(W.parc.some(x=>!(x[1]>0)))return 'Toda parcela precisa de valor.';if(Math.abs(soma()-V())>0.01)return 'A soma das parcelas não bate com o valor fechado. Corrija a lista.';return '';
    case 4:return W.destino==='integrar'&&!W.obraInt?'Escolha o projeto que vai receber este negócio.':'';
    case 5:return W.faturar?'':'Escolha em “Faturar para” em nome de quem o negócio será faturado.'}};
  const passo=()=>{const p=P();switch(W.step){
    case 0:return ps.length?`<div class="fgrid">${U.field({k:'w_pid',label:'Proposta vencedora',type:'select',req:true,opts:ps.map(x=>[x.id,`${x.numero} · ${x.titulo} (${x.status})`]),value:W.pid,span:12})}</div>
      <fieldset class="cm-fs"><legend class="lbl">Nível fechado *</legend><div class="cm-list">${p.opc.map((o,k)=>`<label class="cm-opt"><input type="radio" name="w_tier" value="${k}" ${W.tier===k?'checked':''}><span style="flex:1">Opção ${k+1} · ${esc(o[0])}</span><b class="num">${brl(o[1])}</b></label>`).join('')}</div></fieldset>
      <div class="kv mt16"><span>Valor fechado</span><b class="num">${W.tier!=null?brl(V()):'—'}</b></div>`
      :U.empty({title:'Este negócio não tem proposta.',text:'Monte a proposta no construtor antes de fechar.',btn:'Abrir construtor',act:'wcons'});
    case 1:{const doc=c.tipo==='PJ'?c.cnpj:c.cpf;
      return `<ul class="cm-rules"><li><span class="cm-ok">${ic('check',16)}</span><span>Cliente vinculado · ${esc(c.nome||d.cliente)}</span></li>
        <li>${doc?`<span class="cm-ok">${ic('check',16)}</span><span>${c.tipo==='PJ'?'CNPJ':'CPF'} · ${esc(doc)}</span>`:`<span class="cm-no" aria-hidden="true">!</span><span>Sem ${c.tipo==='PJ'?'CNPJ':'CPF'} — dá para completar depois na ficha</span>`}</li></ul>
        <div class="fgrid mt16">${U.field({k:'w_rua',label:'Endereço da obra',req:true,span:6,value:W.rua,ph:'Rua e número'})}${U.field({k:'w_cidade',label:'Cidade',req:true,span:3,value:W.cidade})}${U.field({k:'w_uf',label:'UF',req:true,span:3,value:W.uf})}
        ${U.field({k:'w_arq',label:'Arquiteto',type:'select',req:true,ph:'— Escolha —',opts:[['nao','Não tem'],...arqs.map(x=>[x.id,x.nome])],value:W.arq,span:6})}
        ${U.field({k:'w_eng',label:'Engenheiro',type:'select',req:true,ph:'— Escolha —',opts:[['nao','Não tem'],...engs.map(x=>[x.id,x.nome])],value:W.eng,span:6})}</div>`}
    case 2:if(!W.escopo)W.escopo=`${p.titulo} — opção ${p.opc[W.tier][0]}, conforme os ambientes da proposta ${p.numero}.`;
      return `<div class="fgrid">${U.field({k:'w_escopo',label:'Escopo da obra',type:'textarea',req:true,span:12,value:W.escopo})}</div>
        <div class="lbl mt16" style="margin-bottom:8px">Tarefas do pré-projeto</div>
        <div class="cm-list">${W.tarefas.map((t,i)=>`<div class="cm-li in"><div style="flex:1;min-width:0"><div style="font-weight:600">${esc(t[0])}</div><div class="lbl" style="font-size:12px">${t[1]} dias depois do ganho</div></div>${U.btn('',{icon:'lixo',sm:true,ghost:true,title:'Remover '+t[0],act:'wdelt',attrs:`data-k="${i}"`})}</div>`).join('')||nada('Nenhuma tarefa.')}</div>
        <div class="cm-addt"><input class="input" id="cm-wtt" placeholder="Tarefa" aria-label="Nova tarefa"><input class="input num" id="cm-wtp" type="number" min="0" value="7" aria-label="Prazo em dias depois do ganho">${U.btn('Acrescentar tarefa',{act:'waddt'})}</div>`;
    case 3:if(!W.parc||W.base!==V()){const v=V(),a=Math.round(v*30)/100,b=Math.round(v*35)/100;W.base=v;W.parc=[['Entrada',a,addDays(D.hoje,7)],['2ª parcela',b,addDays(D.hoje,37)],['3ª parcela',Math.round((v-a-b)*100)/100,addDays(D.hoje,67)]]}
      return `<div class="kv" style="border-top:0"><span>Valor fechado</span><b class="num">${brl(V())}</b></div>
        <div class="cm-parh lbl mt16"><span>Parcela</span><span>Valor</span><span>Data prevista</span><span></span></div>
        ${W.parc.map((x,i)=>`<div class="cm-par"><input class="input" value="${esc(x[0])}" aria-label="Descrição da parcela ${i+1}"><input class="input num" inputmode="decimal" value="${esc(brl(x[1]))}" aria-label="Valor da parcela ${i+1}"><input class="input" type="date" value="${x[2]}" aria-label="Data prevista da parcela ${i+1}">${U.btn('',{icon:'lixo',ghost:true,title:'Remover parcela '+(i+1),act:'wdelp',attrs:`data-k="${i}"`})}</div>`).join('')}
        <div class="row mt16">${U.btn('Adicionar parcela',{icon:'mais',act:'waddp',w:'192px'})}<span class="spacer"></span><span id="cm-wsum" class="row" style="gap:8px">${somaTxt()}</span></div>`;
    case 4:return `<fieldset class="cm-fs" style="margin:0"><legend class="lbl">O que acontece depois do ganho?</legend><div class="cm-list">${DESTINOS.map(([k,l,s])=>`<label class="cm-opt"><input type="radio" name="w_dest" value="${k}" ${W.destino===k?'checked':''}><span style="flex:1;min-width:0"><b style="font-weight:600">${l}</b><br><span class="lbl" style="font-size:12px">${s}</span></span></label>`).join('')}</div></fieldset>
      ${W.destino==='integrar'?(obrasCli.length?`<div class="fgrid mt16">${U.field({k:'w_obra',label:'Projeto que vai receber este negócio',type:'select',req:true,ph:'— escolher o projeto que vai receber —',opts:obrasCli.map(o=>[o.id,`${o.nome} · ${o.etapa}`]),value:W.obraInt,span:12})}</div>`:`<p class="lbl mt16" style="margin-bottom:0">Este contato não tem projeto que possa receber este negócio.</p>`):''}`;
    case 5:{const dest=DESTINOS.find(x=>x[0]===W.destino);
      return `${kv('Negócio',d.titulo)}${kv('Proposta vencedora',`${p.numero} · Opção ${W.tier+1} · ${p.opc[W.tier][0]}`)}${kvh('Valor fechado',`<span class="num">${brl(V())}</span>`)}${kv('Condição de pagamento',`${W.parc.length} parcela${W.parc.length>1?'s':''}`)}${kv('Destino',dest[1])}
        <div class="fgrid mt16">${U.field({k:'w_fat',label:'Faturar para',type:'select',req:true,opts:D.contatos.map(x=>[x.id,x.nome]),value:W.faturar,span:12})}</div>
        <div class="lbl mt16" style="margin-bottom:8px">O que vai acontecer ao confirmar</div>
        <ul class="cm-rules">${[`O negócio vai para Ganho e a proposta ${p.numero} fica congelada como Aceita.`,W.destino==='novo'?'Abre o projeto com Projetos, Técnica e Sucesso do Cliente.':W.destino==='integrar'?'O escopo entra no projeto escolhido.':'Nenhum projeto é aberto agora.',`Financeiro recebe ${W.parc.length} parcela${W.parc.length>1?'s':''} a receber, somando ${brl(soma())}.`].map(t=>`<li><span class="cm-ok">${ic('check',16)}</span><span>${esc(t)}</span></li>`).join('')}</ul>`}}};
  const finish=()=>{const p=P(),val=V();
    d.status='Ganho';d.etapa=5;d.prob=100;d.valor=val;p.status='Aceita';p.esc=W.tier;p.valor=val;p.upd=maxUpd();p.quando='agora';
    let obra=null;
    if(W.destino==='novo'){obra=uid('o');D.obras.push({id:obra,nome:`${d.titulo.split(' — ')[0]} · ${d.cliente.split(' ')[0]}`,cliente:d.cliente,cidade:W.cidade,bairro:'',status:'Planejamento',etapa:'Pré-projeto',pct:0,valor:val,relatorios:0,fotos:0,gestor:'Diego Rocha',inicio:fd(D.hoje),previsao:'—'});
      if(contato(d.cid))contato(d.cid).fase='Projetos'}
    else if(W.destino==='integrar')obra=W.obraInt;
    if(obra)d.obra=obra;
    d.fech={pid:p.id,tier:W.tier,valor:val,parc:W.parc,destino:W.destino,faturar:W.faturar,q:fd(D.hoje),escopo:W.escopo,end:`${W.rua}, ${W.cidade} · ${W.uf}`};
    tl(d.cid,'Negócio ganho',`${d.titulo} · ${brl(val)}`);done&&done();
    M.toast(W.destino==='nao'?'Negócio fechado como ganho.':'Negócio fechado como ganho. Projeto aberto.')};
  const draw=()=>{
    wz.innerHTML=`<div class="cm-steps" aria-hidden="true">${PASSOS.map((_,i)=>`<i class="${i<=W.step?'on':''}"></i>`).join('')}</div>
      <div class="row mt8" style="margin-bottom:16px" aria-live="polite"><b>${PASSOS[W.step]}</b><span class="spacer"></span><span class="lbl num">Passo ${W.step+1} de ${PASSOS.length}</span></div>
      ${passo()}<p class="cm-err" role="alert" id="cm-werr"></p>`;
    okB.textContent=W.step===PASSOS.length-1?'Fechar como ganho':'Continuar'; backB.textContent=W.step?'Voltar':'Cancelar';
    okB.disabled=W.step===0&&!ps.length;
    M.wire(wz,{wcons:()=>{m.close();location.hash='#/construtor'},
      wdelt:el=>{read();W.tarefas.splice(+el.dataset.k,1);draw()},
      waddt:()=>{read();const t=$('#cm-wtt',wz),v=t.value.trim();if(!v){t.focus();return M.toast('Escreva a tarefa.')}W.tarefas.push([v,Math.max(0,+$('#cm-wtp',wz).value||0)]);draw();$('#cm-wtt',wz).focus()},
      wdelp:el=>{read();W.parc.splice(+el.dataset.k,1);draw()},
      waddp:()=>{read();W.parc.push([`${W.parc.length+1}ª parcela`,Math.max(0,Math.round((V()-soma())*100)/100),addDays(D.hoje,30*(W.parc.length+1))]);draw()}});
    $$('[name=w_pid],[name=w_tier]',wz).forEach(i=>i.onchange=()=>{const was=W.pid;read();if(W.pid!==was)W.tier=tdef(P());draw()});
    $$('[name=w_dest]',wz).forEach(i=>i.onchange=()=>{read();draw()});
    if(W.step===3)$$('.cm-par input',wz).forEach(i=>i.addEventListener('input',()=>{read();$('#cm-wsum',wz).innerHTML=somaTxt()}));
    $('.mb',m.el).scrollTop=0;
  };
  backB.onclick=()=>{if(!W.step)return m.close();read();W.step--;draw()};
  okB.onclick=()=>{read();const e=check();if(e){$('#cm-werr',wz).textContent=e;return}
    if(W.step<PASSOS.length-1){W.step++;draw()}else{finish();m.close()}};
  draw();
}

/* ---------- propostas do negócio ---------- */
function verPropostas(d){
  const ps=propsDe(d);
  const m=M.modal({title:'Propostas do negócio',sub:esc(`${d.titulo} · ${d.cliente}`),ok:'Fechar',cancel:'',width:'760px',
    body:ps.length?`<div class="cm-list cm-cq" id="cm-vp">${ps.map(p=>`<div class="cm-li cm-r2 in"><span class="cm-code">${p.numero}</span><div style="flex:1;min-width:0"><div class="cm-ell" style="font-weight:600">${esc(p.titulo)}</div><div class="lbl" style="font-size:12px">${p.vers>1?'v'+p.vers+' · ':''}${p.enviada?'Enviada em '+p.enviada:'Ainda não enviada'}</div></div>
      <span class="chip ${ST_TONE[p.status]}" style="width:88px;justify-content:center">${p.status}</span><b class="num" style="width:128px;text-align:right">${brl(p.valor)}</b>
      <div class="cm-acts">${U.btn('',{icon:'olho',sm:true,ghost:true,title:'Exibir documento pro cliente',act:'doc',attrs:`data-id="${p.id}"`})}${U.btn('',{icon:'seta',sm:true,ghost:true,title:'Abrir no construtor',act:'cons',attrs:`data-id="${p.id}"`})}</div></div>`).join('')}</div>`
      :`<div id="cm-vp">${U.empty({title:'Este negócio ainda não tem proposta.',text:'Monte a primeira no construtor.',btn:'Abrir construtor',act:'novaP'})}</div>`});
  M.wire($('#cm-vp',m.el),{doc:el=>docModal(prop(el.dataset.id)),cons:el=>{m.close();editar(prop(el.dataset.id))},novaP:()=>{m.close();location.hash='#/construtor'}});
}

/* ---------- painel do cartão (CardPanel) ---------- */
const fechKV=d=>{const f=d.fech;if(!f)return nada('Fechado como ganho.');const p=prop(f.pid),dest=DESTINOS.find(x=>x[0]===f.destino);
  return `${kv('Proposta vencedora',p?`${p.numero} · Opção ${f.tier+1} · ${p.opc[f.tier][0]}`:'—')}${kvh('Valor fechado',`<span class="num">${brl(f.valor)}</span>`)}${kv('Fechado em',f.q)}${kv('Destino',dest?dest[1]:'—')}${kv('Faturar para',(contato(f.faturar)||{}).nome||d.cliente)}
   <div class="lbl mt16" style="margin-bottom:8px">Condição de pagamento</div><div class="cm-list">${f.parc.map(x=>`<div class="row" style="min-height:36px"><span style="flex:1">${esc(x[0])}</span><span class="lbl num" style="width:96px">${fd(x[2])}</span><b class="num" style="width:128px;text-align:right">${brl(x[1])}</b></div>`).join('')}</div>`};
const perdaKV=d=>{const f=d.perda;if(!f)return nada('Marcado como perdido.');const p=prop(f.pid);
  return `${kv('Motivo da perda',f.motivo)}${kv('Proposta perdida',p?`${p.numero} · ${p.opc[f.tier]?p.opc[f.tier][0]:''}`:'—')}${kvh('Valor congelado',`<span class="num">${brl(f.valor)}</span>`)}${kv('Perdido em',f.q)}${f.texto?`<p class="soft mt16" style="margin-bottom:0">${esc(f.texto)}</p>`:''}`};
const chkRow=(text,done,act,k,sub)=>`<div class="cm-li in"><button type="button" class="btn sm icon cm-chk" data-act="${act}" data-k="${k}" aria-pressed="${done}" aria-label="${done?'Reabrir':'Concluir'}: ${esc(text)}" title="${done?'Reabrir':'Concluir'}">${done?ic('check',16):''}</button>
  <div style="flex:1;min-width:0"><div class="${done?'cm-done':''}">${esc(text)}</div>${sub?`<div class="lbl" style="font-size:12px">${sub}</div>`:''}</div></div>`;

function openCard(id,onChange){
  const d=negocio(id); if(!d)return M.toast('Negócio não encontrado.');
  setParam('negocios','card',id);
  let s;
  const up=()=>{onChange&&onChange();s.paint()};
  const fora=fn=>{s.close();setTimeout(fn,0)};
  const build=()=>{
    const dec=d.status!=='Aberto',ob=d.obra&&D.byId('obras',d.obra),next=d.etapa<5?ETAPAS[d.etapa+1]:'Ganho';
    let body='';
    if(!dec){const t=TAREFAS[d.etapa],f=d.feitas[d.etapa]||(d.feitas[d.etapa]=[false,false]),rg=regras(d);
      body+=sec('Tarefas esperadas desta etapa',`<div class="cm-list">${t.map((x,i)=>chkRow(x,!!f[i],'tarefa',i,'Etapa '+ETAPAS[d.etapa])).join('')}</div>`);
      body+=sec('Regras de avanço',`<ul class="cm-rules">${rg.map(([l,ok])=>`<li>${ok?`<span class="cm-ok">${ic('check',16)}</span>`:'<span class="cm-no" aria-hidden="true">!</span>'}<span class="${ok?'soft':''}">${esc(l)}</span>${ok?'':'<span class="sr">pendente</span>'}</li>`).join('')}</ul>
        <p class="lbl" style="margin:8px 0 0;font-size:12px">${rg.every(r=>r[1])?`Tudo certo para avançar para “${esc(next)}”.`:'Dá para avançar com justificativa.'}</p>`)}
    else body+=d.status==='Ganho'?sec('Fechamento',fechKV(d)):sec('Perda',perdaKV(d));
    const ac=d.acoes.map((a,i)=>({a,i})).sort((x,y)=>(x.a.done-y.a.done)||String(x.a.prazo).localeCompare(String(y.a.prazo)));
    body+=sec('Próximas ações',ac.length?`<div class="cm-list">${ac.map(({a,i})=>chkRow(a.t,a.done,'acaook',i,`<span class="${!a.done&&a.prazo&&a.prazo<D.hoje?'warn':''}">${prazoTxt(a.prazo)}</span> · ${esc(a.resp)}`)).join('')}</div>`:nada('Nenhuma próxima ação. Use “Nova próxima ação”.'));
    body+=sec('Agenda',d.ag.length?`<div class="cm-list">${[...d.ag].sort((a,b)=>(a.data+a.ini).localeCompare(b.data+b.ini)).map(evRow).join('')}</div>`:nada('Nada agendado para este negócio.'));
    body+=sec('Obra',ob?`<article class="cm-li cm-r2 in cm-click" data-act="obra" data-id="${ob.id}" tabindex="0" role="button" aria-label="Abrir obra ${esc(ob.nome)}"><div style="flex:1;min-width:0"><div class="cm-ell" style="font-weight:600">${esc(ob.nome)}</div><div class="lbl" style="font-size:12px">${esc(ob.etapa)} · ${esc(ob.status)}</div></div><div style="width:120px">${U.prog(ob.pct)}</div><b class="num" style="width:48px;text-align:right">${ob.pct}%</b><span class="faint" aria-hidden="true">${ic('seta',16)}</span></article>`:nada('Sem obra vinculada. A obra nasce no fechamento como ganho.'));
    body+=sec('Anexos',d.anexos.length?`<div class="cm-list">${d.anexos.map((a,i)=>`<div class="cm-li in"><span class="faint" aria-hidden="true">${ic('doc',16)}</span><span class="cm-ell" style="flex:1">${esc(a)}</span>${U.btn('',{icon:'lixo',sm:true,ghost:true,title:'Remover '+a,act:'rmanexo',attrs:`data-k="${i}"`})}</div>`).join('')}</div>`:nada('Nenhum anexo.'),U.btn('Anexar arquivo',{sm:true,icon:'upload',act:'anexar',w:'176px'}));
    body+=sec('Observações',d.obs.length?`<div class="cm-list">${d.obs.map(o=>`<div class="in cm-box"><div class="row" style="align-items:flex-start;gap:12px"><div style="flex:1;min-width:0">${esc(o.t)}</div>${o.just?U.chip('Justificativa','w'):''}</div><div class="lbl mt8" style="font-size:12px">${esc(o.quem)} · ${esc(o.q)}</div></div>`).join('')}</div>`:nada('Nenhuma observação ainda.'));
    body+=sec('Nexos',d.nexos.length?`<div class="cm-list">${d.nexos.map(n=>`<div class="cm-li in"><div style="flex:1;min-width:0"><div style="font-weight:600">${esc(n.t)}</div><div class="lbl" style="font-size:12px">${esc(n.resp)} · ${prazoTxt(n.prazo)} · ${esc(n.prio)}</div></div>${U.chip(n.status,'b')}</div>`).join('')}</div>`:nada('Nenhum Nexo ligado a este negócio.'),U.btn('Encaminhar Nexo',{sm:true,icon:'trocar',act:'nexo',w:'176px'}));
    return {kick:`Negócio · ${etapaNome(d)}`,title:d.titulo,
      sub:`${esc(d.cliente)} · <b class="num" style="color:var(--text)">${brl(d.valor)}</b> · ${esc(d.origem||'Sem origem')}`,
      chips:U.chip(d.status,NEG_TONE[d.status])+U.chip('Responsável: '+d.resp,'n')+(dec?'':U.chip(d.prob+'% de chance','n')),
      top:`<div class="cm-qa mt16">${bt2('Registrar observação','Observação',{sm:true,act:'obs'})}${bt2('Nova próxima ação','Próxima ação',{sm:true,act:'acao'})}${bt2('Agendar Showroom','Showroom',{sm:true,act:'showroom'})}${bt2('Agendar proposta','Apresentação',{sm:true,act:'agprop'})}${U.btn('',{icon:'pontos',sm:true,title:'Mais ações do negócio',act:'mais',attrs:'aria-haspopup="menu"'})}</div>`,
      body,
      foot:dec?[{label:'Ver proposta',act:'verprop'},{label:'Editar negócio completo',curto:'Editar negócio',act:'editar'},{label:'Reverter decisão',act:'reverter'}]
        :[{label:'Ver proposta',act:'verprop'},{label:'Editar negócio completo',curto:'Editar negócio',act:'editar'},{label:`Avançar para “${next}”`,act:'avancar',pri:true}]}};
  const h={
    tarefa:el=>{const f=d.feitas[d.etapa],k=+el.dataset.k;f[k]=!f[k];up()},
    acaook:el=>{const a=d.acoes[+el.dataset.k];a.done=!a.done;up();if(a.done)M.toast('Ação concluída.','Desfazer',()=>{a.done=false;up()})},
    obs:()=>M.modal({title:'Registrar observação',sub:esc(d.titulo),fields:[{k:'t',label:'Observação',type:'textarea',req:true,span:12,ph:'O que a equipe precisa saber'}],ok:'Registrar',
      onOk:v=>{d.obs.unshift({t:v.t,quem:ME,q:agora()});up();M.toast('Observação registrada.')}}),
    acao:()=>M.modal({title:'Nova próxima ação',sub:esc(d.titulo),fields:[{k:'t',label:'O que fazer',req:true,span:12,ph:'Ex.: Ligar para confirmar a visita'},
      {k:'prazo',label:'Prazo',type:'date',req:true,value:D.hoje,span:6},{k:'resp',label:'Responsável',type:'select',req:true,opts:D.equipe.map(u=>u.nome),value:d.resp,span:6}],ok:'Criar ação',
      onOk:v=>{d.acoes.push({t:v.t,prazo:v.prazo,resp:v.resp,done:false});up();M.toast('Próxima ação criada.')}}),
    showroom:()=>agendar('Showroom',d.cliente,e=>{d.ag.push(e);tl(d.cid,'Agendamento',`${e.tipo} em ${fd(e.data)}`);up()}),
    agprop:()=>agendar('Apresentação de proposta',d.cliente,e=>{d.ag.push(e);tl(d.cid,'Agendamento',`${e.tipo} em ${fd(e.data)}`);up()}),
    mais:el=>{const c=contato(d.cid);M.menu(el,[
      {label:'Justificar',icon:'doc',run:()=>M.modal({title:'Justificar',sub:esc(d.titulo),fields:[{k:'sobre',label:'Sobre',type:'select',req:true,opts:['Etapa parada há muitos dias','Tarefa esperada não feita','Desconto acima do padrão','Outro'],span:12},{k:'t',label:'Justificativa',type:'textarea',req:true,span:12}],ok:'Registrar justificativa',
        onOk:v=>{d.obs.unshift({t:`${v.sobre}: ${v.t}`,quem:ME,q:agora(),just:true});up();M.toast('Justificativa registrada.')}})},
      {label:'Chat desta entidade',icon:'chat',run:()=>M.chat?fora(()=>M.chat()):M.toast(`Abriria o chat interno ligado a ${d.cliente}.`)},
      {label:'Ligar',icon:'telefone',run:()=>ext.ligar(c)},{label:'WhatsApp',icon:'zap',run:()=>ext.whats(c)},{label:'E-mail',icon:'email',run:()=>ext.email(c)},'-',
      ...(d.status==='Aberto'?[{label:'Marcar como perdido',icon:'x',run:()=>perda(d,up)}]:[{label:'Reverter decisão',icon:'voltar',run:()=>reverter(d,up)}]),
      {label:'Excluir negócio',icon:'lixo',danger:true,run:()=>excluirNeg(d,()=>{if(D.negocios.includes(d))return up();s.close();onChange&&onChange()})}])},
    anexar:()=>M.modal({title:'Anexar arquivo',sub:esc(d.titulo),fields:[{k:'arq',label:'Arquivo',type:'file',req:true,span:12,ph:'Escolher arquivo'}],ok:'Anexar',
      onOk:v=>{const n=v.arq.split(/[\\/]/).pop();d.anexos.push(n);up();M.toast(`${n} anexado.`)}}),
    rmanexo:el=>{const k=+el.dataset.k,[a]=d.anexos.splice(k,1);up();M.toast(`${a} removido.`,'Desfazer',()=>{d.anexos.splice(k,0,a);up()})},
    nexo:()=>nexoModal(d.cliente,n=>{d.nexos.unshift(n);tl(d.cid,'Nexo encaminhado',`${n.t} · para ${n.resp}`);up()}),
    obra:el=>fora(()=>goObra(el.dataset.id)),
    verprop:()=>verPropostas(d), editar:()=>formNegocio(d,up), avancar:()=>avancar(d,up), reverter:()=>reverter(d,up)};
  s=openPanel('cm-mid',build,h,()=>clearParam('negocios','card',id));
}

/* ---------- tela Negócios ---------- */
const nS={view:'kanban',q:''};
const kc=d=>{const ob=d.obra&&D.byId('obras',d.obra);
  return U.kcard({title:d.cliente,sub:esc(d.titulo)+(ob?` · Obra: ${esc(ob.nome)}`:''),value:d.valor,chips:[chipE(d.origem||'Sem origem','n')],
    foot:d.status==='Perdido'&&d.perda?'Motivo: '+esc(d.perda.motivo):esc(d.resp)+(d.status==='Aberto'?` · ${d.prob}%`:''),act:'card',i:d.id,drag:true})};
const boardHTML=list=>{const open=list.filter(d=>d.status==='Aberto');
  const cols=[...ETAPAS.map((e,i)=>({name:e,dot:`rgb(var(--primary)/${(.3+i*.14).toFixed(2)})`,ds:open.filter(d=>d.etapa===i)})),
    {name:'Ganho',dot:'rgb(var(--pos))',ds:list.filter(d=>d.status==='Ganho')},{name:'Perdido',dot:'rgb(var(--neg))',ds:list.filter(d=>d.status==='Perdido')}];
  return `<div class="board cm-board">${cols.map((c,ci)=>`<section aria-label="${esc(c.name)}, ${c.ds.length} negócios"><div class="colh"><span class="dot" style="background:${c.dot}"></span><b class="cm-ell">${esc(c.name)}</b>${U.chip(String(c.ds.length))}<span class="spacer"></span><span class="lbl num">Total: ${brl0(c.ds.reduce((a,d)=>a+d.valor,0))}</span></div>
    <div class="colb" data-col="${ci}">${c.ds.map(kc).join('')||'<div class="lbl cm-drop">Solte aqui</div>'}</div></section>`).join('')}</div>`};
/* quadro: guarda a posição da rolagem e esmaece a borda que ainda tem coluna escondida */
function bindFade(b,sx){if(!b)return;b.style.scrollBehavior='auto';b.scrollLeft=sx;b.style.scrollBehavior='';
  const f=()=>{b.classList.toggle('cm-fl',b.scrollLeft>4);b.classList.toggle('cm-fr',b.scrollLeft+b.clientWidth<b.scrollWidth-4)};
  b.addEventListener('scroll',f,{passive:true});if(window.ResizeObserver)new ResizeObserver(f).observe(b);f()}
function mover(id,col,done){const d=negocio(id);if(!d)return;
  if(col===6){if(d.status!=='Ganho')fechamento(d,done);return}
  if(col===7){if(d.status!=='Perdido')perda(d,done);return}
  if(d.status!=='Aberto')return reverter(d,done,col);
  if(d.etapa===col)return;
  const old=d.etapa;d.etapa=col;tl(d.cid,'Negócio mudou de etapa',`${d.titulo} → ${ETAPAS[col]}`);done();
  M.toast(`${d.cliente} → ${ETAPAS[col]}`,'Desfazer',()=>{d.etapa=old;done()});
}
M.screen('negocios',{title:'Negócios',dock:'negocios',
  help:['Arraste o cartão entre as etapas. Solto em Ganho, abre o fechamento em passos; em Perdido, pede o motivo da perda.',
        'Clique no cartão para ver as tarefas da etapa, as regras de avanço, as próximas ações, a agenda, os anexos e os Nexos.',
        'No painel, o botão azul do rodapé avança para a próxima etapa. Regra pendente pede justificativa.',
        'Em Lista, troque a etapa direto na tabela. Os ícones da linha mostram as propostas e marcam como ganho.'],
  variants:{A:{label:'Pipeline',render:()=>`${U.page({kick:'Comercial',title:'Negócios',sub:'Pipeline comercial — arraste cards entre etapas.',acts:[{label:'Novo negócio',icon:'mais',act:'novo',pri:true}]})}
    ${U.bar(U.viewToggle(nS.view,'cm-nview')+U.search(nS.view==='kanban'?'Buscar no quadro...':'Buscar na lista...','cm-nq','320px'),`<span class="lbl num" id="cm-nsum"></span>`)}
    <div id="cm-nbody" class="rv cm-ct cm-tn" style="--d:2"></div>`,
  mount:v=>{
    const box=$('#cm-nbody',v),qi=$('#cm-nq',v); let rows=[];
    if(M.q&&M.q.get('q'))nS.q=M.q.get('q'); qi.value=nS.q;
    const h={
      card:el=>openCard(el.dataset.i,draw),abrir:tr=>openCard(rows[+tr.dataset.i].id,draw),
      props:el=>verPropostas(negocio(el.dataset.id)),ganho:el=>fechamento(negocio(el.dataset.id),draw),
      mais:el=>{const d=negocio(el.dataset.id);M.menu(el,[{label:'Abrir negócio',icon:'seta',run:()=>openCard(d.id,draw)},{label:'Editar',icon:'doc',run:()=>formNegocio(d,draw)},
        {label:'Ver propostas',icon:'propostas',run:()=>verPropostas(d)},...(d.status==='Aberto'?[{label:'Marcar como ganho',icon:'check',run:()=>fechamento(d,draw)}]:[]),
        ...(d.status==='Aberto'?[{label:'Marcar como perdido',icon:'x',run:()=>perda(d,draw)}]:[{label:'Reverter decisão',icon:'voltar',run:()=>reverter(d,draw)}]),'-',
        {label:'Excluir',icon:'lixo',danger:true,run:()=>excluirNeg(d,draw)}])},
      limpar:()=>{nS.q='';qi.value='';draw()}};
    function draw(){
      const q=nS.q.trim().toLowerCase(), list=D.negocios.filter(d=>!q||(d.titulo+' '+d.cliente).toLowerCase().includes(q));
      if(nS.view==='kanban'){const sx=($('.cm-board',box)||{}).scrollLeft||0;box.innerHTML=boardHTML(list);U.bindBoard(box,(id,col)=>mover(id,col,draw));bindFade($('.cm-board',box),sx)}
      else{rows=list;
        box.innerHTML=noTable(U.table({rows,rowAct:'abrir',empty:{title:'Nenhum negócio encontrado.',text:'Tente outro título ou cliente.',btn:'Limpar busca',act:'limpar'},cols:[
          {h:'Título',html:d=>`<div class="cm-ell" style="font-weight:600" title="${esc(d.titulo)}">${esc(d.titulo)}</div><div class="lbl cm-ell cm-nr cm-n1" style="font-size:12px">${esc(d.cliente)}<span class="cm-nr cm-n2"> · ${brl(d.valor)}</span></div>`},
          {h:'Contato e obra',w:'240px',html:d=>{const ob=d.obra&&D.byId('obras',d.obra);return `<div class="cm-ell" title="${esc(d.cliente)}">${esc(d.cliente)}</div><div class="lbl cm-ell" style="font-size:12px">${ob?'Obra: '+esc(ob.nome):'Sem obra'}</div>`}},
          {h:'Etapa',w:'200px',html:d=>d.status==='Aberto'?`<select class="select cm-sel" data-etapa="${d.id}" aria-label="Etapa de ${esc(d.titulo)}">${ETAPAS.map((e,i)=>`<option value="${i}" ${i===d.etapa?'selected':''}>${e}</option>`).join('')}</select>`:`<span class="lbl">${d.status==='Ganho'?'Fechado':'Encerrado'}</span>`},
          {h:'Valor',w:'152px',r:true,html:d=>`<b>${brl(d.valor)}</b>`},
          {h:'Status',w:'112px',html:d=>`<span class="chip ${NEG_TONE[d.status]}" style="width:80px;justify-content:center">${d.status}</span>`},
          {h:'',w:'168px',r:true,html:d=>`<div class="cm-acts">${U.btn('',{icon:'propostas',sm:true,ghost:true,title:'Ver propostas de '+d.titulo,act:'props',attrs:`data-id="${d.id}"`})}${d.status==='Aberto'?U.btn('',{icon:'check',sm:true,ghost:true,title:'Marcar como ganho',act:'ganho',attrs:`data-id="${d.id}"`}):'<span aria-hidden="true"></span>'}${U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Mais ações de '+d.titulo,act:'mais',attrs:`data-id="${d.id}" aria-haspopup="menu"`})}</div>`}]}));
        $$('[data-etapa]',box).forEach(sel=>sel.onchange=()=>{const d=negocio(sel.dataset.etapa);mover(d.id,+sel.value,draw)});
      }
      M.wire(box,h);
      const open=D.negocios.filter(d=>d.status==='Aberto');
      $('#cm-nsum',v).textContent=`${open.length} abertos · ${brl0(open.reduce((a,d)=>a+d.valor,0))} em pipeline`;
    }
    qi.oninput=()=>{nS.q=qi.value;draw()};
    U.bindSeg(v,'cm-nview',x=>{nS.view=x;qi.placeholder=x==='kanban'?'Buscar no quadro...':'Buscar na lista...';qi.setAttribute('aria-label',qi.placeholder);draw()});
    draw();
    M.wire(v,{novo:()=>formNegocio(null,draw)});
    const c=M.q&&M.q.get('card'); if(c)openCard(c,draw);
  }}}});

/* =====================================================================
   PROPOSTAS (substitui a definição de telas.js)
   ===================================================================== */
function editar(p){
  if(p.status==='Aceita')return M.toast('Proposta aceita fica congelada. Crie uma revisão para mudar.');
  if(window.__prop){window.__prop.nome=p.titulo;window.__prop.cliente=p.cliente}
  location.hash='#/construtor';
}
function docModal(p){
  const m=M.modal({title:'Proposta '+p.numero,sub:'Como o cliente vê o documento.',ok:'Fechar',cancel:'',width:'640px',extra:U.btn('Baixar PDF',{icon:'upload',act:'pdf'}),
    body:`<div class="in cm-doc"><div class="row"><span class="kick">Proposta ${esc(p.numero)}${p.vers>1?' · v'+p.vers:''}</span><span class="spacer"></span>${U.chip(p.status,ST_TONE[p.status])}</div>
      <h3 class="cm-doct">${esc(p.titulo)}</h3><p class="soft" style="margin:4px 0 0">Para ${esc(p.cliente)}${p.validade?' · válida até '+p.validade:''}</p>
      <div class="cm-list mt16" style="gap:0">${p.opc.map((o,k)=>`<div class="row cm-docl"><span style="flex:1">Opção ${k+1} · ${esc(o[0])}</span>${k===p.esc?U.chip('✓ Escolhida','g'):''}<b class="num">${brl(o[1])}</b></div>`).join('')}</div>
      <p class="lbl mt16" style="margin-bottom:0">Forma de pagamento: entrada de 30% e saldo em 2 parcelas. Não incluído no escopo: obra civil, pintura e infraestrutura elétrica.</p></div>`});
  $('[data-act="pdf"]',m.el).onclick=()=>M.toast(`Geraria o PDF da proposta ${p.numero}.`);
}
const semLink=()=>M.toast('Gere o link no construtor (passo 4 · Enviar) antes.','Abrir construtor',()=>{location.hash='#/construtor'});
function copiarLink(p){if(p.status==='Rascunho')return semLink();
  const url=`https://app.maestroos.com.br/p/${p.numero.replace('#','')}`;
  try{navigator.clipboard.writeText(url).then(()=>M.toast('Link público copiado.'),()=>M.toast('Link público: '+url))}catch(e){M.toast('Link público: '+url)}}
function whats(p){if(p.status==='Rascunho')return semLink();M.toast(`Abriria o WhatsApp de ${p.cliente} com o link da proposta ${p.numero}.`)}
function revisao(p,done){
  M.modal({title:'Criar revisão',sub:`${esc(p.numero)} ganha a versão v${p.vers+1}. A versão atual fica no histórico.`,width:'560px',ok:'Criar revisão',
    fields:[{k:'nota',label:'O que muda nesta revisão',type:'textarea',span:12,ph:'Ex.: troca do receiver e desconto de 5%'}],
    onOk:v=>{p.vers++;(p.hist||(p.hist=[])).unshift({v:p.vers,q:fd(D.hoje),t:v.nota||'Revisão criada'});p.status='Rascunho';p.esc=-1;p.enviada='';p.abertas=0;p.validade='';p.upd=maxUpd();p.quando='agora';
      done&&done();M.toast(`Revisão v${p.vers} criada como rascunho.`,'Abrir no construtor',()=>editar(p))}});
}
function recusar(p,done){
  M.confirm({title:'Recusar proposta',text:`${p.numero} · ${p.titulo} · ${p.cliente}`,ok:'Recusar proposta',danger:true,field:'Motivo',run:v=>{
    const old={status:p.status,motivo:p.motivo};p.status='Recusada';p.motivo=v.motivo;p.upd=maxUpd();p.quando='agora';done&&done();
    M.toast(`Proposta ${p.numero} recusada.`,'Desfazer',()=>{Object.assign(p,old);done&&done()})}});
}
const propMenu=(p,done)=>[{label:'Editar no construtor',icon:'propostas',run:()=>editar(p)},{label:'Ver documento',icon:'olho',run:()=>docModal(p)},
  {label:'Criar revisão',icon:'copiar',run:()=>revisao(p,done)},{label:'Copiar link público',icon:'copiar',run:()=>copiarLink(p)},
  {label:p.status==='Rascunho'?'Enviar por WhatsApp':'Reenviar por WhatsApp',icon:'zap',run:()=>whats(p)},
  ...(['Aceita','Recusada'].includes(p.status)?[]:['-',{label:'Recusar proposta',icon:'x',danger:true,run:()=>recusar(p,done)}])];
const opcoesHTML=p=>`<div class="cm-g3">${p.opc.map((x,k)=>`<div class="in cm-box"><div class="row" style="gap:8px"><span class="lbl cm-ell" style="flex:1">Opção ${k+1} · ${esc(x[0])}</span>${k===p.esc?U.chip('✓ Escolhida','g'):''}</div><div class="num mt8" style="font-size:20px;font-weight:600">${brl(x[1])}</div></div>`).join('')}</div>`;
const metaHTML=p=>`<div class="cm-g4 mt16">${[['Versões',Array.from({length:p.vers},(_,i)=>'v'+(i+1)).join(' · ')],['Enviada em',p.enviada||'—'],['Vezes aberta',String(p.abertas)],['Validade',p.validade||'—']]
  .map(([l,v])=>`<div><div class="lbl">${l}</div><div class="num" style="font-weight:600;margin-top:4px">${esc(v)}</div></div>`).join('')}</div>${p.motivo&&p.status==='Recusada'?`<p class="lbl mt16" style="margin-bottom:0">Motivo da recusa: ${esc(p.motivo)}</p>`:''}`;
function openProp(p,onChange){
  let s;
  const up=()=>{onChange&&onChange();s.paint()};
  const h={editar:()=>{s.close();editar(p)},doc:()=>docModal(p),link:()=>copiarLink(p),rev:()=>revisao(p,up),whats:()=>whats(p),recusar:()=>recusar(p,up),
    neg:el=>{s.close();setTimeout(()=>{location.hash='#/negocios?card='+el.dataset.id},0)}};
  s=openPanel('cm-mid',()=>{const n=p.nid&&negocio(p.nid),hist=[...(p.hist||[]),...Array.from({length:Math.max(0,p.vers-(p.hist||[]).length)},(_,i)=>({v:p.vers-(p.hist||[]).length-i,q:i===p.vers-(p.hist||[]).length-1?(p.enviada||'—'):'—',t:i===p.vers-(p.hist||[]).length-1?'Primeira versão':'Revisão'}))];
    return {kick:'Proposta '+p.numero,title:p.titulo,sub:esc(p.cliente)+` · <b class="num" style="color:var(--text)">${brl(p.valor)}</b>`,chips:U.chip(p.status,ST_TONE[p.status])+U.chip('v'+p.vers,'n'),
      top:`<div class="btnrow cm-b3 mt16">${bt2('Editar no construtor','Construtor',{sm:true,icon:'propostas',act:'editar'})}${bt2('Ver documento','Documento',{sm:true,icon:'olho',act:'doc'})}${bt2('Copiar link público','Copiar link',{sm:true,icon:'copiar',act:'link'})}</div>`,
      body:sec('Opções desta proposta',opcoesHTML(p)+metaHTML(p))+
        sec('Histórico de versões',`<div class="cm-list">${hist.map(x=>`<div class="cm-li in"><span class="cm-code" style="width:32px">v${x.v}</span><span style="flex:1" class="cm-ell">${esc(x.t)}</span><span class="lbl num">${esc(x.q)}</span></div>`).join('')}</div>`)+
        (n?sec('Negócio',`<article class="cm-li cm-r2 in cm-click" data-act="neg" data-id="${n.id}" tabindex="0" role="button" aria-label="Abrir negócio ${esc(n.titulo)}"><div style="flex:1;min-width:0"><div class="cm-ell" style="font-weight:600">${esc(n.titulo)}</div><div class="lbl" style="font-size:12px">${esc(n.cliente)} · ${esc(n.resp)}</div></div>${U.chip(etapaNome(n),n.status==='Aberto'?'n':NEG_TONE[n.status])}<span class="faint" aria-hidden="true">${ic('seta',16)}</span></article>`):''),
      foot:[{label:'Criar revisão',act:'rev'},{label:p.status==='Rascunho'?'Enviar por WhatsApp':'Reenviar por WhatsApp',curto:p.status==='Rascunho'?'Enviar WhatsApp':'Reenviar',act:'whats'},...(['Aceita','Recusada'].includes(p.status)?[]:[{label:'Recusar proposta',act:'recusar'}])]}},h);
}

const pS={view:'negocio',f:0,q:'',ord:'rec',open:new Set()};
const PSTL=['Todas','Rascunho','Enviadas','Vistas','Aceitas','Recusadas','Expiradas'];
const pcnt=i=>i?D.propostas.filter(p=>p.status===SORDER[i-1]).length:D.propostas.length;
const psub=()=>{const a=D.propostas.filter(p=>['Rascunho','Enviada','Vista'].includes(p.status)).length;return `${D.propostas.length} propostas · ${a} em andamento.`};
const PORD={rec:(a,b)=>b.upd-a.upd,valor:(a,b)=>b.valor-a.valor,az:(a,b)=>a.cliente.localeCompare(b.cliente,'pt'),status:(a,b)=>SORDER.indexOf(a.status)-SORDER.indexOf(b.status)||b.upd-a.upd};
M.screen('propostas',{title:'Propostas',dock:'propostas',
  help:['“Por negócio” junta as propostas de cada negócio. A seta abre as opções, as versões, o envio, as aberturas e a validade.',
        'Filtre pela situação nas abas, busque por negócio, cliente ou número e escolha a ordem.',
        'O ⋯ de cada proposta edita no construtor, mostra o documento, cria revisão, copia o link público, envia pelo WhatsApp ou recusa com motivo.',
        '“Nova proposta” abre o construtor. Proposta aceita fica congelada: para mudar, crie uma revisão.'],
  variants:{A:{label:'Propostas',render:()=>`${U.page({kick:'Comercial',title:'Propostas',sub:psub(),acts:[{label:'Nova proposta pelo catálogo',icon:'livro',act:'catalogo'},{label:'Nova proposta',icon:'mais',act:'nova',pri:true}]})}
    <div class="row wrap rv" style="--d:1;margin-bottom:16px;gap:12px">${U.tabs(PSTL.map((l,i)=>`${l}<span class="cm-n" data-pn="${i}">${pcnt(i)}</span>`),pS.f,'Situação da proposta')}<span class="spacer"></span>${U.seg('cm-pview',[['negocio','Por negócio'],['lista','Lista']],pS.view,'Visualização')}</div>
    ${U.bar(U.search('Buscar negócio, cliente ou número','cm-pq','360px'),U.select('Ordenar',[['rec','Ordenar: Recentes'],['valor','Ordenar: Valor'],['az','Ordenar: A–Z'],['status','Ordenar: Status']],'cm-pord','200px')+U.btn('Expandir tudo',{act:'expandir',ctl:true,w:'176px',attrs:'id="cm-pexp"'}))}
    <div id="cm-pbody" class="rv cm-ct cm-tp" style="--d:3"></div>`,
  mount:v=>{
    const box=$('#cm-pbody',v),qi=$('#cm-pq',v),ord=$('#cm-pord',v),exp=$('#cm-pexp',v); qi.value=pS.q; ord.value=pS.ord; let rows=[],keys=[];
    const filtered=()=>{const q=pS.q.trim().toLowerCase();
      return D.propostas.filter(p=>(!pS.f||p.status===SORDER[pS.f-1])&&(!q||[p.numero,p.titulo,p.cliente,(negocio(p.nid)||{}).titulo||''].join(' ').toLowerCase().includes(q))).sort(PORD[pS.ord])};
    const vazio={title:'Nenhuma proposta encontrada.',text:'Tente outro nome, número ou situação.',btn:'Limpar filtros',act:'limpar'};
    const h={
      tog:el=>{const k=el.dataset.k;pS.open.has(k)?pS.open.delete(k):pS.open.add(k);draw();const b=$(`[data-act="tog"][data-k="${k}"]`,box);b&&b.focus()},
      pmenu:el=>M.menu(el,propMenu(prop(el.dataset.id),draw)),
      abrir:tr=>openProp(rows[+tr.dataset.i],draw),
      limpar:()=>{pS.q='';qi.value='';pS.f=0;const t=$$('[data-tabs] .tab',v)[0];t&&t.click();draw()}};
    const menuBtn=p=>U.btn('',{icon:'pontos',sm:true,ghost:true,title:'Ações da proposta '+p.numero,act:'pmenu',attrs:`data-id="${p.id}" aria-haspopup="menu"`});
    function draw(){
      const ps=filtered();
      exp.style.display=pS.view==='negocio'?'':'none';
      if(pS.view==='negocio'){
        const map=new Map();ps.forEach(p=>{const k=p.nid&&negocio(p.nid)?p.nid:p.id;if(!map.has(k))map.set(k,[]);map.get(k).push(p)});
        const gs=[...map.entries()].map(([k,l])=>({k,n:negocio(k),ps:l}));keys=gs.map(g=>g.k);
        box.innerHTML=gs.length?`<section class="card flush"><ul style="list-style:none;margin:0;padding:0">${gs.map(g=>{const p=g.ps[0],o=pS.open.has(g.k),nome=g.n?g.n.titulo:p.titulo;
          return `<li class="cm-prow"><div class="cm-pr">
            ${U.btn('',{icon:'seta',sm:true,ghost:true,title:(o?'Recolher':'Ver')+' opções de '+nome,act:'tog',attrs:`data-k="${g.k}" aria-expanded="${o}" style="color:var(--soft);transform:rotate(${o?90:0}deg);transition:transform .3s var(--ease)"`})}
            ${U.av(p.cliente)}<div style="min-width:0"><div class="cm-ell" style="font-weight:600" title="${esc(nome)}">${esc(nome)}</div><div class="lbl cm-ell">${esc(p.cliente)} · ${g.ps.length>1?g.ps.length+' propostas · ':''}${esc(p.numero)} · ${esc(p.quando)}</div></div>
            <div class="cm-pi"><span class="chip ${ST_TONE[p.status]}">${p.status}</span><b class="num">${brl(p.valor)}</b></div>${menuBtn(p)}</div>
            ${o?`<div class="cm-exp">${g.ps.map(x=>`<div class="cm-pblk"><div class="row" style="gap:12px;min-height:36px"><span class="cm-code">${esc(x.numero)}</span><b class="cm-ell" style="font-weight:600;flex:1">${esc(x.titulo)}</b>${U.chip(x.status,ST_TONE[x.status])}${g.ps.length>1?menuBtn(x):''}</div>
              <div class="lbl mt16" style="margin-bottom:8px">Opções desta proposta</div>${opcoesHTML(x)}${metaHTML(x)}</div>`).join('')}</div>`:''}</li>`}).join('')}</ul></section>`
          :`<section class="card">${U.empty(vazio)}</section>`;
        exp.textContent=keys.length&&keys.every(k=>pS.open.has(k))?'Recolher tudo':'Expandir tudo';
      }else{rows=ps;
        box.innerHTML=noTable(U.table({rows,rowAct:'abrir',empty:vazio,cols:[
          {h:'Número',w:'96px',html:p=>`<span class="cm-code">${esc(p.numero)}</span>`},
          {h:'Proposta',html:p=>`<div class="cm-ell" style="font-weight:600" title="${esc(p.titulo)}">${esc(p.titulo)}</div><div class="lbl cm-ell" style="font-size:12px"><span class="cm-nr cm-n1">${esc(p.numero)} · </span>${esc(p.cliente)}<span class="cm-nr cm-n2"> · ${p.status} · ${brl(p.valor)}</span></div>`},
          {h:'Status',w:'120px',html:p=>`<span class="chip ${ST_TONE[p.status]}" style="width:96px;justify-content:center">${p.status}</span>`},
          {h:'Enviada em',w:'120px',html:p=>`<span class="num">${esc(p.enviada||'—')}</span>`},
          {h:'Aberta',w:'88px',r:true,html:p=>p.abertas+'×'},
          {h:'Validade',w:'120px',html:p=>`<span class="num">${esc(p.validade||'—')}</span>`},
          {h:'Valor',w:'152px',r:true,html:p=>`<b>${brl(p.valor)}</b>`},
          {h:'',w:'80px',r:true,html:menuBtn}]}));
      }
      M.wire(box,h);
      $$('[data-pn]',v).forEach(s=>s.textContent=pcnt(+s.dataset.pn));
      const sb=$('.psub',v);if(sb)sb.textContent=psub();
    }
    qi.oninput=()=>{pS.q=qi.value;draw()};
    ord.onchange=()=>{pS.ord=ord.value;draw()};
    $('[data-tabs]',v).addEventListener('tab',e=>{pS.f=e.detail;draw()});
    U.bindSeg(v,'cm-pview',x=>{pS.view=x;draw()});
    draw();
    M.wire(v,{nova:()=>{location.hash='#/construtor'},
      catalogo:()=>M.screens.catalogo?(location.hash='#/catalogo'):M.toast('Abriria o Catálogo para montar a proposta a partir dos produtos.'),
      expandir:()=>{const all=keys.every(k=>pS.open.has(k));keys.forEach(k=>all?pS.open.delete(k):pS.open.add(k));draw()}});
  }}}});
})();

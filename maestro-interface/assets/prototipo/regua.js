/* Régua do Maestro OS: mede a tela aberta e devolve o que está fora do padrão.
   Uso no console (ou por automação): await (await import('/regua.js')).medirTudo()
   Confere: blocos na grade, botões só 44/36, campos 44, um único botão azul fora de cartão,
   vidro dentro de vidro, letra ≥ 10,5 px, nada saindo da tela, botão com texto espremido, topo transbordando. */
export function medir(){
  const W=innerWidth, main=document.querySelector('main'), cs=getComputedStyle(main);
  const X0=main.getBoundingClientRect().left+parseFloat(cs.paddingLeft), X1=main.getBoundingClientRect().right-parseFloat(cs.paddingRight);
  const o={rolaDeLado:document.documentElement.scrollWidth>W+1,bordas:[],alturas:[],letra:[],azuis:0,vidroEmVidro:[],fora:[],espremidos:[],topo:''};
  const vis=e=>e.offsetParent!==null;
  document.querySelectorAll('#view .grid:not(.board)').forEach(g=>{const k=[...g.children].filter(x=>x.getBoundingClientRect().width&&!x.hidden);if(k.length<2)return;
    const gr=g.getBoundingClientRect(),L=Math.min(...k.map(x=>x.getBoundingClientRect().left));if(Math.abs(L-gr.left)>.6)o.bordas.push('grade não começa na borda: '+String(g.className).slice(0,30))});
  document.querySelectorAll('#view > *, .lat-main > *').forEach(b=>{const r=b.getBoundingClientRect();if(!r.width||b.matches('.lat-side'))return;if(r.left<X0-.6||r.right>X1+.6)o.bordas.push('bloco fora da grade: '+String(b.className).slice(0,30))});
  document.querySelectorAll('#view .btn, .topbar .btn').forEach(b=>{if(!vis(b)||b.closest('.seg,.tabs,label,.blk-ui'))return;const h=Math.round(b.getBoundingClientRect().height);if(![44,36].includes(h))o.alturas.push(h+'px '+b.textContent.trim().slice(0,20));
    const t=b.querySelector('.bt')||b;if(!b.classList.contains('rel')&&t.scrollWidth>t.clientWidth+2&&getComputedStyle(t).textOverflow!=='ellipsis')o.espremidos.push(b.textContent.trim().slice(0,20))});
  document.querySelectorAll('#view .field input:not([type=checkbox]):not([type=radio]):not(.sr), #view .field select').forEach(i=>{if(!vis(i))return;const h=Math.round(i.getBoundingClientRect().height);if(h!==44)o.alturas.push('campo '+h+'px')});
  document.querySelectorAll('#view *').forEach(e=>{if(e.closest('.sr')||![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const f=parseFloat(getComputedStyle(e).fontSize);if(f<10.5)o.letra.push(f+'px '+e.textContent.trim().slice(0,16));
    const r=e.getBoundingClientRect();if(!r.width)return;let p=e.parentElement,clip=false;while(p&&p.id!=='view'){if(/auto|scroll|hidden/.test(getComputedStyle(p).overflowX)){clip=true;break}p=p.parentElement}
    if(!clip&&r.right>W+1&&getComputedStyle(e).position!=='fixed')o.fora.push(e.tagName+' '+e.textContent.trim().slice(0,16))});
  o.azuis=[...document.querySelectorAll('#view .btn.pri')].filter(b=>vis(b)&&!b.closest('.card')).length;
  document.querySelectorAll('#view .card .ctl').forEach(e=>o.vidroEmVidro.push(String(e.className).slice(0,30)));
  const tb=document.querySelector('.topbar');if(tb&&tb.scrollWidth>tb.clientWidth+2)o.topo='transborda';
  for(const k in o)if(Array.isArray(o[k]))o[k]=[...new Set(o[k])].slice(0,5);
  return Object.fromEntries(Object.entries(o).filter(([k,v])=>k==='azuis'?v>1:Array.isArray(v)?v.length:v));
}
export const ROTAS=['dashboard','atividades','nexos','agenda','contatos','negocios','propostas','construtor','projetos','painel360','obra?id=o1','tecnica','experiencia','financeiro','financeiro/resultado','financeiro/orcamento','financeiro/conciliacao','financeiro/contratos','compras','estoque','fiscal','catalogo','relatorios','numbers','ajustes','ajustes/financeiro','ajustes/proposta','ajustes/fechamento','ajustes/modulos'];
const espera=ms=>new Promise(z=>setTimeout(z,ms));
/* percorre todas as rotas, cada aba e cada seletor de visão */
export async function medirTudo({abas=true}={}){
  const res={},n={telas:0};
  for(const r of ROTAS){location.hash='#/'+r;await espera(350);n.telas++;let m=medir();if(Object.keys(m).length)res[r]=m;
    if(!abas)continue;
    const ts=document.querySelectorAll('#view [data-tabs]');
    for(let ti=0;ti<ts.length;ti++){const c=(document.querySelectorAll('#view [data-tabs]')[ti]||{querySelectorAll:()=>[]}).querySelectorAll('.tab').length;
      for(let k=0;k<c;k++){const t=document.querySelectorAll('#view [data-tabs]')[ti]?.querySelectorAll('.tab')[k];if(!t)break;const nome=t.textContent.trim();t.click();await espera(220);n.telas++;m=medir();if(Object.keys(m).length)res[r+' › '+nome]=m}}
  }
  return {largura:innerWidth,estados:n.telas,falhas:res};
}

/* ---------- celular (celular.html): toque ≥ 44, letra ≥ 11, nada saindo da tela, conteúdo não escondido pela barra ---------- */
export function medirCelular(){
  const W=innerWidth,o={rolaDeLado:document.documentElement.scrollWidth>W+1,toque:[],letra:[],fora:[],espremidos:[]};
  const vis=e=>e.offsetParent!==null||getComputedStyle(e).position==='fixed';
  document.querySelectorAll('#view button, #view a[href], #view input:not([type=checkbox]):not([type=radio]):not([type=color]), #view select, #tabbar a, .msheet button, .msheet input, .msheet select').forEach(e=>{
    if(!vis(e)||e.closest('.sr,.sw-acts')||e.classList.contains('sr'))return;const r=e.getBoundingClientRect();if(!r.width)return;
    if(e.matches('.mf input,.mf select,.mf textarea'))return; /* a linha inteira do formulário (48) é o alvo */
    if(e.matches('.chips button,.mseg button,.sw'))return;  /* área de toque estendida por ::after/::before (≥44) */
    if(r.height<43.5&&r.width<43.5||r.height<43.5&&!e.closest('.rw'))o.toque.push(Math.round(r.width)+'×'+Math.round(r.height)+' '+(e.getAttribute('aria-label')||e.textContent||'').trim().slice(0,18))});
  document.querySelectorAll('#view *, .msheet *, #tabbar *').forEach(e=>{if(e.closest('.sr')||![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;
    const f=parseFloat(getComputedStyle(e).fontSize);if(f<10.5)o.letra.push(f+'px '+e.textContent.trim().slice(0,16));
    const r=e.getBoundingClientRect();if(!r.width)return;let p=e.parentElement,clip=false;while(p&&p!==document.body){if(/auto|scroll|hidden/.test(getComputedStyle(p).overflowX)){clip=true;break}p=p.parentElement}
    if(!clip&&(r.right>W+1||r.left<-1)&&getComputedStyle(e).position!=='fixed')o.fora.push(e.tagName+' '+e.textContent.trim().slice(0,16))});
  document.querySelectorAll('#view .mbtn, #view .btn').forEach(b=>{if(vis(b)&&b.scrollWidth>b.clientWidth+2)o.espremidos.push(b.textContent.trim().slice(0,18))});
  const m=document.querySelector('main'),tb=document.querySelector('#tabbar');if(m&&tb&&parseFloat(getComputedStyle(m).paddingBottom)<tb.offsetHeight+8)o.barraCobre='o fim da página fica atrás da barra';
  for(const k in o)if(Array.isArray(o[k]))o[k]=[...new Set(o[k])].slice(0,6);
  return Object.fromEntries(Object.entries(o).filter(([k,v])=>Array.isArray(v)?v.length:v));
}

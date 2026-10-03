// Conferência responsiva automática do protótipo (Playwright, navegador próprio — pode rodar em paralelo).
// Celular: node checar.mjs --app=celular --larguras=320,375,390,430 --fotos=1 --saida=/tmp/c
// Uso: node checar.mjs --rotas=financeiro,compras --larguras=375,768,1024,1280,1512,1728,1920,2560 --layout=padrao|coluna|lateral --dens=compacta|confortavel --fotos=1 --saida=/tmp/x
// Para cada largura e rota: abre a tela, roda a régua (regua.js) em cada aba e em cada seletor de visão,
// e (com --fotos=1) salva uma captura da página inteira por rota para revisão visual.
// Playwright: usa o pacote "playwright" instalado (npm i -D playwright) ou o caminho em PLAYWRIGHT_MODULE.
const pw=await import(process.env.PLAYWRIGHT_MODULE||'playwright').catch(()=>{console.error('Playwright não encontrado. Rode: npm i -D playwright && npx playwright install chromium (ou defina PLAYWRIGHT_MODULE com o caminho de index.mjs).');process.exit(1)});
const {chromium}=pw.default||pw;
import fs from 'node:fs';
const arg=Object.fromEntries(process.argv.slice(2).map(a=>{const x=a.replace(/^--/,''),i=x.indexOf('=');return [x.slice(0,i),x.slice(i+1)]}));
const URL=arg.url||'http://127.0.0.1:5330';
const larguras=(arg.larguras||'375,768,1024,1280,1512,1728,1920,2560').split(',').map(Number);
const saida=arg.saida||'/tmp/checar-maestro'; const fotos=arg.fotos==='1';
const rotas=arg.rotas?arg.rotas.split(','):null;
const browser=await chromium.launch();
const out={};
for(const w of larguras){
  const mobile=w<600, h=mobile?812:(w>=1920?1080:900);
  const ctx=await browser.newContext({viewport:{width:w,height:h},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile,reducedMotion:'reduce'});
  const lay=arg.layout||'padrao', dens=arg.dens||'compacta';
  await ctx.addInitScript(([lay,dens])=>{const ks=['dashboard','atividades','nexos','agenda','contatos','negocios','propostas','construtor','projetos','painel360','obra','tecnica','experiencia','financeiro','financeiro/resultado','financeiro/orcamento','financeiro/conciliacao','financeiro/contratos','compras','estoque','fiscal','catalogo','relatorios','numbers','ajustes','ajustes/financeiro','ajustes/proposta','ajustes/fechamento','ajustes/modulos'];
    try{localStorage.setItem('maestro-proto',JSON.stringify({v:2,dens,layout:Object.fromEntries(ks.map(k=>[k,lay]))}))}catch(e){}},[lay,dens]);
  const page=await ctx.newPage(); const erros=[]; page.on('pageerror',e=>erros.push(e.message));
  const cel=arg.app==='celular'; const PAG=cel?'/celular.html':'/';
  await page.goto(URL+PAG+'#/dashboard'); await page.waitForTimeout(600);
  const lista=rotas||(cel?await page.evaluate(()=>Object.keys(M.mscreens)):await page.evaluate(async()=>(await import('/regua.js')).ROTAS));
  for(const r of lista){
    await page.evaluate(x=>{location.hash='#/'+x},r); await page.waitForTimeout(450);
    if(fotos){fs.mkdirSync(`${saida}/${w}`,{recursive:true});await page.screenshot({path:`${saida}/${w}/${r.replace(/[^\w-]+/g,'_')}.png`,fullPage:true})}
    const res=await page.evaluate(async(cel)=>{const R=await import('/regua.js');const med=cel?R.medirCelular:R.medir;const o={};const put=(k,m)=>{if(Object.keys(m).length)o[k]=m};
      put('',med());
      const tabsets=()=>[...document.querySelectorAll('#view [data-tabs]')];
      for(let ti=0;ti<tabsets().length;ti++){const n=tabsets()[ti].querySelectorAll('.tab').length;
        for(let k=0;k<n;k++){const t=tabsets()[ti]?.querySelectorAll('.tab')[k];if(!t)break;const nome=t.textContent.trim();t.click();await new Promise(z=>setTimeout(z,200));put('aba '+nome,med())}}
      for(const s of [...document.querySelectorAll(cel?'#view .mseg, #view .chips':'#view .seg')]){for(const b of [...s.querySelectorAll('button')]){b.click();await new Promise(z=>setTimeout(z,200));put('visão '+b.textContent.trim(),med())}}
      return o},cel);
    if(Object.keys(res).length)(out[w]??={})[r]=res;
  }
  if(erros.length)(out[w]??={}).__erros=[...new Set(erros)].slice(0,5);
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out,null,1)||'{}');
if(fotos)console.log('fotos em',saida);

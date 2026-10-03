# KIT da interface nova do Maestro OS — regras para quem escreve um módulo

Protótipo base em `assets/prototipo/` (copie com `scripts/novo-prototipo.sh`; servidor em http://127.0.0.1:5330). Cada módulo é um arquivo
`mod-*.js` que registra telas com `M.screen(...)`. **Escreva só no seu arquivo.** Não edite `maestro.js`,
`ui.js`, `maestro.css`, `dados.js`, `telas.js`, `construtor.js`, `index.html`.

Leia antes: `ui.js` (o kit), `maestro.css` (classes), `telas.js` e `construtor.js` (exemplos de tela pronta),
`dados.js` (dados compartilhados) e o seu arquivo em `inventario/` (o que existe de verdade no sistema).

## 1. A lei do botão (o Allysson pediu "alinhamento e padronização impecáveis")
- Duas alturas só: **44** (botões de página, cabeçalho, barra de ferramentas, formulário) e **36** (botão dentro de linha de tabela, cartão ou painel). Use `M.ui.btn(label,{sm:true})` para 36.
- Ícone sozinho = quadrado (44×44 ou 36×36) **com `title`** (vira aria-label). Ex.: `M.ui.btn('',{icon:'pontos',sm:true,ghost:true,title:'Mais ações',act:'mais'})`.
- **Um único botão principal (azul) por tela**: o último do cabeçalho (`M.ui.page({acts:[...,{label,act,pri:true}]})`). Dentro de modal, o principal é o "OK" do modal.
- Irmãos têm a mesma largura: grupo de botões lado a lado = `<div class="btnrow">…</div>` (colunas iguais). Botões de ação numa coluna de tabela têm largura fixa igual (`w:'152px'`).
- Rótulo curto, verbo no infinitivo ou substantivo do sistema real ("Novo contato", "Registrar recebimento"). Texto nunca quebra linha.
- **Nenhum botão morto.** Todo botão: abre o formulário real (com os campos reais do inventário), muda o estado na tela, navega, ou — só para coisas externas (PDF, WhatsApp, ligar, e-mail) — mostra um toast dizendo o que faria. Um `data-act` sem tratador já mostra um toast genérico, mas **prefira tratar**.

## 2. Alinhamento
- Grade de página: `<div class="grid">` com 12 colunas e gutter 24; filhos `s3 s4 s6 s8 s9 s12`. Linhas de irmãos iguais: `grid g2|g3|g4|g5`.
- Todo bloco de primeiro nível encosta nas bordas da grade (nada de margem lateral extra). Espaço entre blocos: 24 (entre seções) e 16 (dentro de uma seção). Tudo múltiplo de 4.
- Formulários: sempre via `M.modal({fields})` — grade de 12 com `span` 3, 4, 6 ou 12. Nunca largura automática.
- Tabela: sempre `M.ui.table(...)` (primeira e última coluna já alinham com o padding do cartão). Números alinhados à direita (`r:true`).
- Letra mínima 10,5 px (use `.lbl` 13 px para rótulo, 12 px só em linha secundária).

## 3. Vidro e estilo
- Telas de módulo usam o estilo **discreto** (Apple): já é o automático. Não use Fraunces/serifa.
- Conteúdo em `.card` (cartão sólido ou vidro conforme o ajuste do usuário). Controles soltos na página com `.ctl`
  (o kit já faz: `M.ui.search`, `M.ui.select`, `M.ui.tabs`, `M.ui.seg`, botões do cabeçalho).
- **Nunca coloque `.ctl` dentro de `.card`** (vidro dentro de vidro quebra). Dentro de cartão use `.btn` comum ou `.in`.
- Menus/modais/painéis: sempre `M.menu`, `M.modal`, `M.sheet`, `M.confirm` (renderizam na raiz).

## 4. API do kit (resumo — detalhe em `ui.js`)
```js
const {ic,brl,brl0,$,$$,esc}=M, U=M.ui, D=M.D;
M.screen('chave',{title:'Nome', dock:'chave-da-dock', hidden:false, help:['passo 1','passo 2','passo 3'],
  variants:{A:{label:'Atual', render:()=>html, mount:v=>{/* liga eventos */}}}});
U.page({kick,title,sub,acts:[{label,icon,act},{label,icon,act,pri:true}]})   // cabeçalho
U.bar(esquerda, direita)            // linha de abas/busca/filtros (margem 24 abaixo)
U.tabs(['A','B'],on)                // abas (evento 'tab' com e.detail = índice)
U.search(placeholder,id,'320px') · U.select(rotulo,opcoes,id,'200px') · U.seg(id,[[v,rotulo,icone]],on,rotulo) · U.viewToggle(on,id)
U.bindSeg(root,id,fn)
U.kpis([{label,value,sub,chip,tone,act}],n)          // linha de indicadores (g n)
U.table({cols:[{h,w,r,c,html:(row,i)=>''}],rows,check,rowAct,empty:{title,text,btn,act},title,head,groups:[{title,rows,total}]})
U.board(cols:[{name,dot,total,cards:[U.kcard(...)]}],{drag:true}) · U.bindBoard(root,(i,col)=>{})
U.kcard({title,sub,value,chips:[U.chip(t,tone)],progress,foot,act,i,drag})
U.chip(texto,'n|b|g|r|w') · U.av(nome) · U.prog(pct) · U.empty({title,text,btn,act}) · U.btn(label,{act,icon,pri,sm,ghost,w,title})
M.wire(root,{acao:(el,ev)=>{}})     // liga todos os data-act e data-row-act do root (chame após cada innerHTML)
M.modal({title,sub,fields:[{k,label,type:'text|email|tel|date|time|number|money|select|textarea|checks|radio|toggle|file',opts,span,req,ph,value,help}],ok,onOk:vals=>{}})
M.sheet({kick,title,sub,chips,acts:[{label,act,icon,pri}],body,foot:[{label,act,pri}],on:{acao:fn}})   // painel lateral de detalhe
M.confirm({title,text,ok,danger,field:'Motivo',run:vals=>{}}) · M.menu(botao,[{label,icon,danger,run},'-']) · M.toast(msg,'Desfazer',fn)
M.tabs(root) (já chamado no render) · M.q (URLSearchParams da rota: #/chave?id=x)
```
Ícones disponíveis: veja o objeto `P` em `maestro.js` (inicio, buscar, chat, atividades, agenda, contatos, negocios, propostas,
projetos, painel, financeiro, compras, estoque, fiscal, ajustes, sino, mais, voltar, seta, baixo, x, lixo, copiar, olho, enviar,
check, filtro, relogio, casa, doc, pontos, alca, chip, wifi, som, luz, neve, camera, chave, caixa, trocar, coracao, livro, barras,
sair, upload, telefone, email, zap, estrela, kanban, lista, grade, brilho).

## 5. Padrão de uma tela
1. `U.page` com kick (contexto curto), título real do módulo, subtítulo real, ações reais.
2. `U.bar` com as abas reais + busca + filtros reais (placeholders exatamente como no inventário).
3. Conteúdo: indicadores (`U.kpis`) quando o real tem; lista/quadro; estados vazios com o texto real.
4. Detalhe de registro abre em `M.sheet` (painel lateral) com as seções reais; formulários em `M.modal` com os campos reais.
5. Sub-aba: renderize num contêiner (`<div id="corpo">`) e chame `M.wire` + `M.tabs` de novo.
6. `help`: 3 a 4 frases curtas de "como usar esta tela" (aparece no "?" do Suporte).
7. Pontos frágeis do real (ex.: `window.prompt`, "em breve") **não** são copiados: resolva do jeito certo (modal com motivo) e cite no relatório.

## 6. Conferência antes de entregar
- `node -e "new Function(require('fs').readFileSync('mod-x.js','utf8'))"` sem erro.
- Releia: só 44/36 nos botões? um único `pri` por tela? grupos em `.btnrow`/`gN`? nenhum `.ctl` dentro de `.card`? textos iguais ao inventário?
- No relatório final: telas registradas (chave e rota), o que cada botão faz, e qualquer coisa do real que você decidiu não reproduzir (e por quê).

## 7. Responsivo — 100% revisado (pedido do Allysson, 02/10/2026)
Uso principal: **MacBook 13", 14" e 15"** (1280, 1440/1512, 1728 de largura). Também monitores grandes
(1920, 2560) e tablet (1024, 768). Celular (375) terá **versão própria** depois; por ora a tela não pode quebrar nele.

Larguras de conferência obrigatórias: **375, 768, 1024, 1280, 1512, 1728, 1920, 2560**.
Pontos de quebra do CSS (já no `maestro.css`): ≥1800 conteúdo até 1680 · ≥2200 até 1920 · ≤1366 · ≤1180 (tablet:
s3/s4 viram metade, s5–s9 viram linha inteira, g4 vira 2) · ≤900 (uma coluna, linhas quebram).

Regras:
- Nada rola de lado na página. Tabela larga rola dentro de `.tblwrap`; quadro (kanban) rola dentro de `.board`.
- Largura fixa só em controle, e sempre encolhível: `width:min(320px,100%)`. Contêiner nunca com px fixo.
- Texto longo: reticências + `title` com o texto inteiro. Nunca cortar sem reticências, nunca espremer botão.
- Gráficos SVG se adaptam: medem a largura do contêiner ao desenhar (`el.clientWidth`) e redesenham no `resize`
  (com `ResizeObserver`); altura mínima legível (≥ 200 px); rótulos não se sobrepõem (pule rótulos quando faltar espaço).
- Grades internas com `minmax(0,1fr)` e colunas que diminuem por largura (use as classes `gN`, que já descem no tablet/celular,
  ou `grid-template-columns:repeat(auto-fill,minmax(280px,1fr))` para coleções de cartões).
- Em monitor grande a página cresce junto (não deixar blocos minúsculos nem linhas de texto com mais de ~90 caracteres).
- Os 3 arranjos do botão "Layout" (Padrão, Coluna única, Lateral) e as 2 densidades (Compacta, Confortável) também têm de ficar
  impecáveis — confira com `--layout=` e `--dens=`.

Conferência automática (navegador próprio, pode rodar em paralelo com outros):
```
cd <pasta do protótipo>
node checar.mjs --rotas=<suas rotas separadas por vírgula> --fotos=1 --saida=<sua pasta de rascunho>
node checar.mjs --rotas=... --layout=lateral --larguras=1280,1512,1728
node checar.mjs --rotas=... --layout=coluna --dens=confortavel --larguras=1280,1728
```
Saída vazia (`{}`) = régua limpa. **Além da régua, abra e olhe as capturas** (Read na imagem) de pelo menos 375, 768, 1280,
1512, 1728 e 2560 de cada rota: a régua não vê feiura (bloco vazio enorme, gráfico minúsculo, coluna espremida, desalinhamento visual).

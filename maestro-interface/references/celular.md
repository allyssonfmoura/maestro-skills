# Versão própria para celular — regras para quem escreve uma tela de celular

Entrada: `celular.html` (telas pequenas abrem nela sozinhas; "Versão para computador" no Mais).
Casca e kit: `celular.js` (`M.m`). Visual: `celular.css` (herda cores, tema, aura e vidro de `maestro.css`).
Tela-modelo: **`cel-inicio.js`** — copie o padrão dela. Dados: `M.D` (`dados.js`) + os dados/fluxos do módulo de
computador correspondente (`mod-*.js`, `construtor.js`) — reproduza os mesmos registros, estados e ações reais
(inventário em `inventario/`). **Escreva só nos seus arquivos `cel-*.js`.**

## Como o iPhone faz (Apple HIG — seguir)
- **Título grande** (34) no topo, que encolhe para a barra de vidro ao rolar: `M.m.nav({title, back, acts, kick, sub})`.
  Ação principal da tela = botão "+" (ou texto curto) no canto direito da barra (`acts:[{icon:'mais',title:'Novo contato',act:'novo'}]`).
  **Nada de botão flutuante, nada de botão azul gigante no meio da lista.**
- **Pilha:** lista → detalhe é uma rota com parâmetro (`#/negocios?card=n3`); o detalhe mostra `back:'Negócios'` (o kit anima a entrada e o voltar).
- **Listas agrupadas** (`M.m.group({title, foot, rows})`, `M.m.row({icon,color,title,sub,value,value2,href|act,i,swipe})`):
  linha mínima 52, toque na linha inteira, chevron quando abre algo, valor alinhado à direita.
- **Deslizar a linha** para ações rápidas (Ligar, Concluir, Arquivar…): `swipe:[{label,icon,act,tone}]` (tone 1 azul, 2 cinza, 3 vermelho, 4 verde, 5 laranja).
  Toda ação de deslizar também precisa existir no detalhe (acessibilidade).
- **Filtros:** `M.m.chips(id,[[v,rótulo]],on)` (rolagem horizontal) ou `M.m.seg(id,...)` (até 4 opções); busca `M.m.search(ph,id)`.
- **Indicadores:** `M.m.tiles([{label,value,sub,act,wide}])` (2 colunas). Cartões: `M.m.card(título,html)`.
- **Formulários** sempre numa folha que sobe de baixo: `M.m.formSheet({title, groups:[{title, fields:[{k,label,type,opts,req,ph,value}]}], ok:'Salvar', onOk:vals=>{}})`
  (mesmos campos reais do computador, agrupados; Cancelar à esquerda, Salvar à direita, puxador para fechar).
- **Detalhes curtos / escolhas:** `M.m.sheet({title, body, ok, onOk, on:{acao:fn}})`; **escolha destrutiva ou lista de opções:** `M.m.actions({title, items:[{label,dng,run}]})`.
- **Botões de largura total** só dentro de cartão/folha: `M.m.btn(label,{pri,dng,act})` (altura 50) e `<div class="mbtns">` para pares.
- **Quadro (kanban) no celular não existe:** vira lista agrupada por etapa (ou chips de etapa no topo); mover de etapa = ação no detalhe ("Avançar para …") ou deslizar.
- **Tabelas largas não existem:** cada registro é uma linha (título + linha de baixo + valor). Detalhe completo no toque.
- **Gráficos:** SVG que mede a largura (`clientWidth`), altura 180–240, poucos rótulos; toque abre o detalhe.
- Ligar / WhatsApp / e-mail: `href="tel:"`, `https://wa.me/55…`, `mailto:` (de verdade).

## Regras de medida
- **Toque ≥ 44×44** em tudo que se toca; letra ≥ 11 (texto corrido 15–17); nada sai da tela; nada fica escondido atrás da barra de baixo.
- Um único botão de destaque por folha (o "Salvar"/"OK" da barra da folha).
- `help:[...]` em toda tela (3 frases). `tab:` = a chave do módulo (para marcar a barra).

## Conferência (UM navegador por vez — o MacBook fica lento com vários)
```
node checar.mjs --app=celular --rotas=<suas chaves> --larguras=320,375,390,430 --fotos=1 --saida=<sua pasta>
```
`{}` = régua limpa (toque 44, letra, nada fora da tela, barra não cobre conteúdo). **Olhe as capturas** de 375 e 430.
Para folhas e detalhes, faça um script Playwright seu (modelo: `checar.mjs`, com `isMobile:true, hasTouch:true`) que abre
cada folha/detalhe, roda `(await import('/regua.js')).medirCelular()` e tira captura.

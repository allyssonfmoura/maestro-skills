---
name: maestro-interface
description: Sistema de interface do Maestro OS (Liquid Glass estilo Apple, versão computador e versão própria para celular) com kit de componentes, regras de botões e alinhamento, régua automática, conferência responsiva em navegador e o inventário funcional dos 20 módulos reais. Use SEMPRE que for desenhar, prototipar, construir, revisar ou ajustar qualquer tela, módulo, componente, dock, barra, construtor de propostas, dashboard, Numbers ou layout do Maestro OS (ou de uma instância de cliente) — no computador ou no celular — e também quando o pedido falar em vidro, liquid glass, aura, transparência, alinhamento, botões padronizados, responsivo, MacBook, densidade, layout por página, editar a tela tipo iPhone, paleta de cores ou "interface nova", mesmo que a palavra "skill" não apareça.
---

# Maestro OS · Interface

Esta skill guarda a interface nova do Maestro OS como um sistema que se reaproveita: um protótipo navegável e testável
(computador + celular), as regras que o dono do produto aprovou, e as ferramentas que medem se uma tela está certa.
A ideia é que qualquer tela nova nasça do mesmo kit e passe pela mesma régua — assim nada fica desalinhado nem diferente
entre módulos, que foi a maior reclamação nas rodadas anteriores.

## Mapa da skill
| Caminho | O que é | Quando ler |
|---|---|---|
| `references/decisoes.md` | Tudo que o Allysson decidiu (visual, dock, cores, densidade, layouts, celular, construtor, Numbers) | **Sempre, primeiro** |
| `references/computador.md` | Regras do kit de computador: lei do botão, grade, vidro, API, responsivo | Ao mexer numa tela de computador |
| `references/celular.md` | Regras da versão de celular (jeito iPhone) e API `M.m` | Ao mexer numa tela de celular |
| `references/inventario/*.md` | O que cada módulo **real** tem (campos, botões, estados, textos) lido do código. **Não vai no repositório público**: gere/mantenha só na cópia interna | Antes de desenhar um módulo |
| `assets/prototipo/` | O protótipo completo (HTML/CSS/JS puro, sem dependências) | Base de toda tela nova |
| `assets/prototipo/regua.js` · `checar.mjs` | Régua (mede a tela aberta) e conferência automática em várias larguras | Antes de entregar |
| `scripts/novo-prototipo.sh` | Copia o protótipo para uma pasta e sobe o servidor | Para começar |

## Fluxo de trabalho
1. **Ler `references/decisoes.md`.** Elas valem para toda tela; não reabra decisão já tomada.
2. **Ler o inventário do módulo** em `references/inventario/` (só existe na cópia interna; se faltar, levante no código do sistema antes de desenhar). A tela nova reproduz os campos, ações, estados e textos reais —
   o objetivo é que o protótipo vire especificação de implementação. O que o real tem de frágil ("em breve", `window.prompt`,
   botão sem ação) não se copia: resolva do jeito certo e diga no relatório.
3. **Começar do protótipo:** `sh scripts/novo-prototipo.sh <pasta> [porta]` (ou trabalhar numa cópia já existente).
   Telas de computador são arquivos `mod-*.js` que registram `M.screen(...)`; telas de celular são `cel-*.js` com `M.mscreen(...)`.
   Use só o kit (`ui.js` / `celular.js`): ele já garante alturas, grade, vidro e acessibilidade. Exemplos prontos: `telas.js`,
   `construtor.js`, `cel-inicio.js`.
4. **Medir.** Com o servidor no ar:
   - computador: `node checar.mjs --rotas=<chaves> --fotos=1 --saida=<pasta>` (8 larguras de 375 a 2560), depois
     `--layout=coluna`, `--layout=lateral` e `--dens=confortavel`;
   - celular: `node checar.mjs --app=celular --larguras=320,375,390,430 --fotos=1 --saida=<pasta>`.
   Saída `{}` = régua limpa. **Depois olhe as capturas**: a régua não vê feiura (gráfico minúsculo, bloco vazio enorme).
   Precisa de Playwright (`npm i -D playwright && npx playwright install chromium`, ou `PLAYWRIGHT_MODULE=<caminho/index.mjs>`).
5. **Entregar** dizendo o que a régua mediu (larguras, arranjos, densidades) e o que ficou de fora e por quê.

## Por que as regras existem (para decidir bem nos casos não previstos)
- **Botões em duas alturas (44/36), um único azul, irmãos iguais:** o dono pediu "alinhamento e padronização impecáveis". Quando
  cada tela escolhe tamanhos, o sistema parece montado por pessoas diferentes. Em dúvida, siga o que o kit já faz.
- **Vidro só onde o usuário age (controles) nas telas de trabalho:** leitura de tabela longa em vidro cansa; no Início, que é
  vitrine, vidro em tudo. A pessoa pode mudar isso no painel Aparência — a tela tem de ficar bonita nas três opções.
- **Nada de botão morto:** o protótipo serve para testar de verdade. Ação externa (PDF, WhatsApp, ligar) pode só avisar o que faria.
- **Fiel ao real:** o inventário existe para que a implementação depois não descubra campo ou ação que o protótipo esqueceu.
- **Celular não é computador espremido:** quadro vira lista por etapa, tabela vira linha com detalhe, formulário vira folha que sobe.
- **Desempenho:** o vidro (desfoque + manchas animadas) pesa. Ao rodar muitas conferências em paralelo, cuide da máquina;
  se travar, reduza a carga — sem mudar o visual.

## Comunicação com o Allysson
Português do Brasil, linguagem simples, resposta primeiro. Toda resposta termina com Resumo (e Opções + Sugestão quando houver
decisão). Número de TASK, card, decisão ou commit nunca aparece sem dizer o que é.

## Levar para o produto real
O protótipo é especificação, não código de produção. A implementação no `maestro-os` (React) segue o fluxo da casa:
Solicitação no GitHub → spec → Entrega (pull request) → validação → publicação com autorização expressa. Comece pelo tema
(tokens de cor, vidro, densidade), a dock e o kit de componentes; depois módulo a módulo, usando a régua para comparar.

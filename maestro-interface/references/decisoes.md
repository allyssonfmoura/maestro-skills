# Decisões do dono do produto (Allysson Moura) — 02 e 03/10/2026

Estas decisões valem para toda tela nova ou alterada do Maestro OS. Mudar alguma delas exige pedido dele.

## Referência visual
- A base é o protótipo feito no **Claude Code** com a skill `liquid-glass-frontend` (vidro estilo Apple, aura colorida,
  Fraunces só nos títulos editoriais + Hanken Grotesk + JetBrains Mono). Pranchas feitas no Cowork/Claude Design
  para esta interface foram reprovadas — não usar como base.
- **Layout "Padrão"** = o protótipo revisado: Modelo A + Arranjo Padrão + Densidade Compacta + nenhum bloco editado.
- **Início** é carregado e editorial (título grande com itálico, vidro em tudo). As demais telas são **discretas**, "realmente Apple".

## Configurável por pessoa (painel Aparência e botão Layout)
- **Aura:** liga/desliga + intensidade. **Transparência:** liga/desliga + intensidade (desligada = tudo sólido).
- **Onde tem vidro:** Automático (em tudo no Início, só nos controles nas demais) · Em tudo · Só nos controles.
- **Estilo dos títulos:** Automático · Editorial · Discreto. **Tema:** Claro · Escuro · Sistema.
- **Cor:** 14 paletas (Azul Maestro, Grafite, Terracota, Floresta, Ametista, Oceano, Petróleo, Índigo, Rubi, Rosa,
  Cobre, Âmbar, Oliva, Noite) + **Personalizada** (qualquer cor; escurece sozinha até o texto branco ter contraste 4,5:1).
- **Densidade:** Compacta (padrão; linhas de 48) · Confortável (linhas de 56, mais ar). A antiga "Confortável" virou a Compacta.
- **Layout por página, ao vivo:** Modelo (quando a tela tem mais de um), Arranjo (Padrão · Coluna única · Lateral).
- **Edição da tela estilo iPhone:** tocar e segurar um bloco (ou "Editar esta tela") → blocos tremem; arrastar move,
  (−) tira, ⊞ muda a largura, "Itens tirados" devolve, "Concluído" salva. Salvo por página e modelo.

## Dock (computador)
- **Idêntica à versão B de `teste-liquid-glass-dock/index.html`:** 16 itens (Home, Buscar, Chat, Atividades, Nexos, Agenda,
  Contatos, Negócios, Propostas, Projetos, Painel 360, Financeiro, Compras, Estoque | Ajustes, Sair), ícones 26, nomes 11,
  espaço 20, altura 80, borda de luz, aura atrás, brilho que segue o mouse, lupa 1,4× só no ícone, ativo = ladrilho, entrada em sequência.
- **+ item "Mais" antes de Ajustes** com Técnica, Experiência, IA Fiscal, Catálogo, Relatórios, Numbers.

## Botões e alinhamento ("alinhamento e padronização impecáveis")
- Só duas alturas: 44 (página/formulário) e 36 (dentro de linha/cartão). Ícone sozinho = quadrado com nome acessível.
- Um único botão principal (azul) por tela. Irmãos com a mesma largura. Nenhum botão morto.
- Grade de 12 colunas, gutter 24, tudo múltiplo de 4. Régua automática antes de entregar.

## Responsivo
- Foco: **MacBook 13", 14" e 15"** (1280, 1440/1512, 1728). Também monitores (1920, 2560) e tablet (768, 1024).
- Conferido em todas as larguras, nos 3 arranjos e nas 2 densidades. Celular tem versão própria.

## Celular (versão própria, `celular.html`)
- Telas pequenas abrem nela sozinhas. Jeito iPhone: título grande que encolhe, pilha com voltar, folhas que sobem de baixo,
  deslizar a linha para ações, Ligar/WhatsApp/e-mail de verdade.
- **Barra de baixo:** 4 botões escolhidos por cada pessoa (padrão = sistema real: Início, Negócios, Propostas, Chat) + "Mais".
- Todos os 20 módulos. Ferramentas de tela larga (Importar nota/Configuração/Cálculo da IA Fiscal, ações em massa,
  filtros avançados) ficam só no computador.

## Construtor de propostas (o que ele mais gostou)
- Montar a proposta **por ambiente**, incluindo produtos em cada ambiente. Kits (linha-mãe = soma das filhas), foto na linha,
  arrastar para reordenar e para outro ambiente (também Alt+↑/↓), menu ⋯ (Duplicar, Personalizar exibição, Mover, Remover),
  mão de obra em % por ambiente, até 3 opções, passos Itens · Opções · Documento · Enviar.

## Numbers (feedback de um cliente)
- Uma base de data para tudo (decisão ou criação), "Como calculamos" em cada cartão, período 3/6/12 meses + mês + personalizado,
  meta sem teto (ex.: 121%, "Superou em R$ 103 mil"), mesmas etapas em quantidade e valor, saúde da carteira explicada,
  drill-down com exportar CSV em todo número, tempo de fechamento por faixa e propostas em aberto "maduras".

## Desempenho
- O vidro custa processamento. Ao trabalhar com muitos agentes/navegadores, o MacBook travou com 7 em paralelo; ele depois
  liberou 100% da máquina. Se travar de novo: reduzir a carga, **sem mudar nada do visual**.

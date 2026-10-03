# maestro-interface · skill do Claude

Sistema de interface do **Maestro OS**: Liquid Glass estilo Apple, versão para computador e versão própria para celular,
kit de componentes, regras de botões e alinhamento, régua automática e conferência responsiva em navegador.

## Instalar
Copie a pasta `maestro-interface/` para `~/.claude/skills/` (Claude Code) — ou empacote e envie como skill no Claude.ai.

## Ver o protótipo
```sh
sh scripts/novo-prototipo.sh ~/maestro-prototipo 5330
```
- Computador: http://127.0.0.1:5330/
- Celular: http://127.0.0.1:5330/celular.html (telas pequenas abrem sozinhas na versão de celular)

## Conferir uma tela
```sh
cd ~/maestro-prototipo
npm i -D playwright && npx playwright install chromium   # uma vez
node checar.mjs --rotas=financeiro,compras --fotos=1 --saida=/tmp/conf
node checar.mjs --app=celular --larguras=320,375,390,430
```
`{}` = régua limpa.

## Conteúdo
- `SKILL.md` — como usar (o Claude lê isto).
- `references/decisoes.md` — decisões do dono do produto.
- `references/computador.md`, `references/celular.md` — regras e API dos kits.
- `references/inventario/` — inventário funcional dos módulos reais: **mantido só na cópia interna**, não publicado.
- `assets/prototipo/` — protótipo completo (HTML/CSS/JS puro, sem dependências; dados de exemplo).
- `scripts/novo-prototipo.sh` — copia o protótipo e sobe o servidor.

Dados do protótipo são de exemplo (ambiente de teste). Não há credenciais nem chamadas a serviços externos.

#!/bin/sh
# Copia o protótipo-base da skill para uma pasta de trabalho e sobe o servidor local.
# Uso: sh scripts/novo-prototipo.sh <pasta-destino> [porta]
set -e
AQUI="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${1:?Informe a pasta de destino}"; PORTA="${2:-5330}"
mkdir -p "$DEST"; cp -R "$AQUI/assets/prototipo/." "$DEST/"
echo "Protótipo copiado para $DEST"
echo "Computador: http://127.0.0.1:$PORTA/   ·   Celular: http://127.0.0.1:$PORTA/celular.html"
exec python3 "$DEST/servidor.py" "$PORTA"

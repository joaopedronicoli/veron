#!/bin/bash
set -e

APP_NAME="veron"
APP_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$APP_DIR/.env"

# Verifica se .env existe
if [ ! -f "$ENV_FILE" ]; then
  echo "Arquivo .env nao encontrado em $APP_DIR"
  echo "Criando .env com valores padrao..."
  cat > "$ENV_FILE" <<'EOF'
DB_HOST=postgres_n8n2
DB_USER=n8n2
DB_PASS=TOn9I17enQTOAIr
DB_NAME=veron
DB_PORT=5432
JWT_SECRET=TROCAR_ESSE_SECRET_AQUI
JWT_REFRESH_SECRET=TROCAR_ESSE_SECRET_AQUI
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=
CORS_ORIGIN=https://veron.pelg.com.br
EOF
  echo ".env criado. Edite os valores de JWT_SECRET e JWT_REFRESH_SECRET antes de continuar."
  exit 1
fi

echo "=== Carregando variaveis do .env ==="
export $(grep -v '^#' "$ENV_FILE" | grep -v '^$' | xargs)

echo "=== Build das imagens ==="
docker build -t veron-api:latest "$APP_DIR/backend"
docker build -t veron-web:latest "$APP_DIR"

echo ""
echo "=== Deploy do stack ==="
docker stack deploy -c "$APP_DIR/docker-compose.yml" "$APP_NAME"

echo ""
echo "=== Aguardando backend iniciar ==="
sleep 10

# Roda migrations
CONTAINER_ID=$(docker ps -q -f name="${APP_NAME}_backend" | head -1)
if [ -n "$CONTAINER_ID" ]; then
  echo "=== Rodando migrations ==="
  docker exec "$CONTAINER_ID" node dist/migrate.js
  echo ""
  echo "=== Migrations concluidas ==="
else
  echo "AVISO: Container do backend nao encontrado. Rode as migrations manualmente:"
  echo "  docker exec \$(docker ps -q -f name=${APP_NAME}_backend) node dist/migrate.js"
fi

echo ""
echo "=== Deploy finalizado ==="
echo "Frontend: https://veron.pelg.com.br"
echo "API:      https://veron.pelg.com.br/api/health"

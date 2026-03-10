#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "==> Stopping container..."
docker compose down

echo "==> Removing old image..."
docker compose rm -f 2>/dev/null || true
docker rmi $(docker images --filter "label=com.docker.compose.project=$(basename "$PWD")" -q) 2>/dev/null || true

echo "==> Pruning dangling build cache and unused images..."
docker builder prune -f
docker image prune -f

echo "==> Rebuilding and starting (database volume preserved)..."
docker compose up --build -d

echo "==> Done. Container is up on port 8003."
docker compose ps

#!/bin/sh
set -e

echo "Running database migrations..."
node node_modules/prisma/build/index.js migrate deploy

echo "Starting Nuxt 3 server..."
exec node server/index.mjs

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl \
  && npm install -g npm@latest

# ---- Install deps ----
FROM base AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --no-fund --no-audit

# ---- Build ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# ---- Runner ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nuxtjs

# Nuxt 3 output
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./

# Prisma schema + migrations
COPY --from=builder --chown=nuxtjs:nodejs /app/prisma ./prisma

# Prisma CLI for migrations
COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules/prisma ./node_modules/prisma

# Persistent data directory for SQLite
RUN mkdir -p /app/data && chown nuxtjs:nodejs /app/data

COPY --chown=nuxtjs:nodejs docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

USER nuxtjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["./docker-entrypoint.sh"]

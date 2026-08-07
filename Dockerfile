# Imagen base
FROM node:20-alpine AS base

WORKDIR /app

# Necesario para Prisma en Alpine
RUN apk add --no-cache openssl

# Instalación de dependencias
FROM base AS deps

COPY package.json package-lock.json ./

RUN npm ci

# Build de Next.js
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

# Genera Prisma Client
RUN npx prisma generate

# Construye Next
RUN npm run build


# Imagen final producción
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./

COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder /app/prisma ./prisma


EXPOSE 3000


CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
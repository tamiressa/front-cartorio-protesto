# =========================
# 1️⃣ Stage de build
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Dependências do sistema
RUN apk add --no-cache libc6-compat

# Copia apenas arquivos necessários para instalar deps
COPY package.json package-lock.json* ./

# Instala dependências
RUN npm ci

# Copia restante do projeto
COPY . .

# Build de produção
RUN npm run build


# =========================
# 2️⃣ Stage de runtime
# =========================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 nodejs \
 && adduser -S nextjs -u 1001

# Copia apenas artefatos necessários
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3001

CMD ["npm", "start"]

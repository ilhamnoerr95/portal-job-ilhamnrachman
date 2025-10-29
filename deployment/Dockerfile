# Stage 1: Install Dependencies
FROM node:20-alpine AS deps
WORKDIR /job-portal-ilhamnrachman

COPY package*.json ./
RUN npm install

# Stage 2: Build App
FROM node:20-alpine AS builder
WORKDIR /job-portal-ilhamnrachman

COPY --from=deps /job-portal-ilhamnrachman/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Run Standalone
FROM node:20-alpine AS runner
WORKDIR /job-portal-ilhamnrachman
ENV NODE_ENV=production

COPY --from=builder /job-portal-ilhamnrachman/.next/standalone ./
COPY --from=builder /job-portal-ilhamnrachman/.next/static ./.next/static
COPY --from=builder /job-portal-ilhamnrachman/public ./public

EXPOSE 3000
CMD ["node", "server.js"]

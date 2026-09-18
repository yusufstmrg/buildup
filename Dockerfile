FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build the application (compiles Vite React app and esbuilds server.ts)
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy only production dependencies and built files
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Expose port 3000 as configured in server.ts (Cloud Run injects PORT env, but server.ts currently hardcodes 3000. Let's make sure it reads process.env.PORT)
EXPOSE 8080
ENV PORT=8080

CMD ["node", "dist/server.cjs"]

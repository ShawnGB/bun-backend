# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.0.0
FROM oven/bun:${BUN_VERSION}

WORKDIR /app

# Install node modules
COPY --link package.json bun.lockb ./
RUN bun install

# Copy application code
COPY --link . .

# Generate Prisma Client <-- Fails here
RUN bun x prisma generate

EXPOSE 3000

CMD [ "bun", "index.ts" ]
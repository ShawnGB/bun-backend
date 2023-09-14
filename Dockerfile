# syntax = docker/dockerfile:1.2
FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

# Use the secret only during build, without copying it to the final image
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env bun install --production

COPY src src
COPY tsconfig.json .
COPY prisma prisma

RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cp /etc/secrets/.env .env

RUN bun env

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

# syntax = docker/dockerfile:1.2
FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .
# Copy the .env file from Render's secret file location to your working directory
COPY /etc/secrets/env .env

RUN bun install --production
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env

COPY src src
COPY tsconfig.json .
COPY prisma prisma
COPY /etc/secrets/.env ./

# COPY public public

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]


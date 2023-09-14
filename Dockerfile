FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .
# Copy the .env file from Render's secret file location to your working directory
COPY /etc/secrets/.env ./

RUN bun install --production

COPY src src
COPY tsconfig.json .
COPY prisma prisma
COPY .env .env

# COPY public public

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]


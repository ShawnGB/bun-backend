FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .
COPY prisma .

RUN bun install --production
ARG NODE_VERSION=18
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
    && bash n $NODE_VERSION \
    && rm n \
    && npm install -g n

COPY src src
COPY tsconfig.json .
# COPY public public

RUN bunx prisma generate

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 3000
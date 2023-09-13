FROM oven/bun

# Set the working directory to /app
WORKDIR /app

# Copy package.json and bun.lock to the working directory
COPY package.json .
COPY bun.lock .

# Install production dependencies using bun
RUN bun install --production
RUN bunx prisma generate


# Copy the source code from your local machine to the working directory
COPY src src
COPY tsconfig.json .
COPY prisma prisma
# COPY public public  # You can uncomment this line if you have a "public" directory

ENV NODE_ENV production

# Define the command to run your application
CMD ["bun", "src/index.ts"]

# Expose port 3000 (assuming your application listens on this port)
EXPOSE 3000

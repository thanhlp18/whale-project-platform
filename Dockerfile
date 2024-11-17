# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install Prisma CLI
RUN npm install prisma --save-dev

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

ARG ZIPKIN_COLLECTOR_ENDPOINT
ENV ZIPKIN_COLLECTOR_ENDPOINT=${ZIPKIN_COLLECTOR_ENDPOINT}

# Build the Next.js project
RUN npm run build

# Use an official Node.js runtime as a parent image for the runtime environment
FROM node:18-alpine

# Set the working directory
WORKDIR /app

ARG ZIPKIN_COLLECTOR_ENDPOINT
ENV ZIPKIN_COLLECTOR_ENDPOINT=${ZIPKIN_COLLECTOR_ENDPOINT}

# Copy the built application from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public

# Ensure the nextjs user exists and use it
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV PORT 3000

# Run Prisma migrations and start the Next.js application
CMD npx prisma migrate deploy && node server.js
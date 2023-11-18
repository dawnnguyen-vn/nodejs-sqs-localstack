FROM node:20-alpine

WORKDIR /app

RUN npm install -g @nestjs/cli

RUN npm install -g pnpm

RUN chown -R 1000:1000 /app

USER 1000

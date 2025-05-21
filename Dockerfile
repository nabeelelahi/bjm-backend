FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./


COPY . .
RUN yarn global add @nestjs/cli
RUN yarn install

CMD ["yarn", "start:dev"]

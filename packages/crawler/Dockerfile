FROM node:16-slim as base

WORKDIR /home/node/app

RUN  apt-get update -y && apt-get -y -qq install cron

COPY ["package.json", "./"]

RUN yarn install

COPY . .

RUN yarn build

CMD [ "node", "./build/index.js" ]
FROM node:16-slim as base

ENV TIMEZONE="Asia/Ho_Chi_Minh"

WORKDIR /home/node/app

COPY ["package.json", "./"]

RUN  yarn install

COPY . .

FROM base as production

RUN yarn build

CMD ["node", "build/index.js"]
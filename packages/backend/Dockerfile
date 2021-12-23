FROM node:16-slim as base

WORKDIR /home/node/app

COPY ["package.json", "./"]
RUN  \
    # apt-get -qy update && apt-get -qy install openssl && \
    yarn install

# COPY prisma/schema.prisma .

# RUN npx prisma generate

COPY . .

FROM base as production

RUN yarn build

CMD ["node", "build/index.js"]
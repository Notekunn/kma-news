FROM node:16-slim as base

ARG BUILD_CONTEXT=backend
ENV TIMEZONE=Asia/Ho_Chi_Minh
ENV NODE_ENV development

WORKDIR /home/node/app

RUN yarn global add typescript

COPY ["package.json", "./"]

COPY ./packages/shared-types ./packages/shared-types

COPY ./packages/shared-api ./packages/shared-api

# Link 2 shared repo
RUN yarn install && yarn shared-types build && yarn shared-types link && \
    yarn shared-api link shared-types && yarn shared-api link shared-types \
    && yarn shared-api link

# Copy repo muon build
COPY ./packages/${BUILD_CONTEXT} ./packages/${BUILD_CONTEXT}

# Link shared repo voi repo can build
RUN yarn install && yarn ${BUILD_CONTEXT} link shared-types\
    && yarn ${BUILD_CONTEXT} link shared-api

FROM base as product

RUN yarn ${BUILD_CONTEXT} build

ENV NODE_ENV production



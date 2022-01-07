FROM node:16-slim as base

ARG BUILD_CONTEXT=backend

ENV TZ Asia/Ho_Chi_Minh

ENV NODE_ENV development

WORKDIR /home/node/app

RUN yarn global add typescript

COPY ["package.json", "./"]

COPY ./packages/shared-types ./packages/shared-types

COPY ./packages/shared-api ./packages/shared-api

# Link 2 shared repo
RUN yarn install && yarn shared-types build && yarn shared-types link && \
    yarn shared-api link shared-types && yarn shared-api build  &&\
    yarn shared-api link

# Copy package repo muon build
COPY ./packages/${BUILD_CONTEXT}/package.json ./packages/${BUILD_CONTEXT}/package.json

# Link shared repo voi repo can build
RUN yarn ${BUILD_CONTEXT} link shared-types\
    && yarn ${BUILD_CONTEXT} link shared-api && yarn install --force

COPY ./packages/${BUILD_CONTEXT} ./packages/${BUILD_CONTEXT}

###########################################
FROM base as product

ENV NODE_ENV production

ARG BUILD_CONTEXT=backend

ARG API_URL=http//localhost:8888/

ARG ZALO_APP_ID=12346

ARG ZALO_CALLBACK_URL=http://localhost:3000/

ENV REACT_APP_API_URL=${API_URL}

ENV REACT_APP_ZALO_CALLBACK_URL=${ZALO_CALLBACK_URL}/auth/login/zalo

ENV REACT_APP_ZALO_APP_ID=${ZALO_APP_ID}

RUN echo "Api url ${API_URL}, Zalo app id ${ZALO_APP_ID}, Zalo callback ${ZALO_CALLBACK_URL}"

ENV GENERATE_SOURCEMAP false

RUN yarn ${BUILD_CONTEXT} build

###########################################

FROM nginx:latest as static_product

ARG BUILD_CONTEXT=backend

COPY --from=product "/home/node/app/packages/${BUILD_CONTEXT}/build/" "/usr/share/nginx/html"

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



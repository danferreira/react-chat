FROM node:9-alpine

WORKDIR /app

COPY package.json .

RUN apk --no-cache --virtual build-dependencies add \
    yarn \
    python \
    make \
    g++ \
    && yarn install \
    && apk del build-dependencies

COPY . .

EXPOSE 4000

USER node

CMD ["yarn", "start"]
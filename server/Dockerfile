FROM redis
COPY redis.conf /data/redis.conf
CMD [ "redis-server", "/data/redis.conf" ]


FROM node:latest

WORKDIR /server
COPY package.json /server/package.json
COPY yarn.lock /server/yarn.lock
RUN yarn install
RUN yarn start
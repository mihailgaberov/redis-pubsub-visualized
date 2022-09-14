FROM redis
COPY redis.conf /data/redis.conf
CMD [ "redis-server", "/data/redis.conf" ]


FROM node:latest
COPY package.json .
COPY yarn.lock .
COPY index.js .
RUN yarn install
RUN yarn start
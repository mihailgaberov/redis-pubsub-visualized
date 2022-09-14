FROM redis
COPY redis.conf /data/redis.conf
CMD [ "redis-server", "/data/redis.conf" ]


FROM node:latest
COPY package.json /data/package.json
COPY yarn.lock /data/yarn.lock
RUN yarn install
RUN cd .. && yarn start
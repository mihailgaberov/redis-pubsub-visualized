FROM node:latest
COPY . .
RUN apt-get update
RUN yarn install
# CMD [ "yarn", "start", "redis-server", "/data/redis.conf" ]
# CMD [ "yarn", "start" ]

FROM redis
COPY redis.conf /usr/local/etc/redis/redis.conf
CMD [ "yarn", "start", "redis-server", "/usr/local/etc/redis/redis.conf" ]
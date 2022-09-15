FROM redis
COPY redis.conf /data/redis.conf
CMD [ "redis-server", "/data/redis.conf" ]


FROM node:latest
RUN yarn install
COPY . .
CMD ["yarn", "start"]
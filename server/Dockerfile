FROM redis
COPY redis.conf /data/redis.conf
CMD [ "redis-server", "/data/redis.conf" ]


FROM node:latest
COPY . .
RUN yarn install && yarn start
# CMD ["yarn", "start"]
FROM redis
FROM node:latest
# COPY redis.conf /data/redis.conf
COPY . .
RUN yarn install && yarn start
CMD [ "redis-server", "/data/redis.conf" ]


# FROM node:latest
# COPY . .
# RUN yarn install && redis-server && yarn start
# CMD ["yarn", "start"]
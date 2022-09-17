FROM redis
FROM node:latest
COPY . .
RUN apt-get update
RUN apt-get install -y redis
RUN yarn install
CMD [ "yarn start", "redis-server", "/data/redis.conf" ]

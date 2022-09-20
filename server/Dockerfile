FROM redislabs/redismod
FROM node:latest
# COPY redis.conf /data/redis.conf
COPY . .
RUN apt-get update -y
RUN apt-get install -y redis-server
RUN redis-server
RUN yarn install
CMD ["./start.sh"]
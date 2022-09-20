FROM redislabs/redismod
FROM node:latest
# COPY redis.conf /data/redis.conf
COPY . .
RUN yarn install
RUN apt-get update -y
RUN apt-get install -y redis-server
RUN redis-server "/data/redis.conf"
# ENTRYPOINT [ "yarn" ]
# CMD ["start"]
# ENTRYPOINT [ "redis-server" ]
# CMD [ "/data/redis.conf" ]
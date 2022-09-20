FROM redislabs/redismod
COPY . .
RUN apt-get update -y
RUN apt-get install -y redis-server
# RUN redis-server

CMD ["redis-server", "/data/redis.conf"]
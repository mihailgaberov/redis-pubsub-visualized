FROM redislabs/redismod
RUN apt-get update -y
RUN apt-get install -y redis-server
COPY . .
RUN redis-server

# CMD ["redis-server", "/data/redis.conf"]
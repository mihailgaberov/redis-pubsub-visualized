FROM redislabs/redismod
# COPY redis.conf /data/redis.conf
RUN apt-get update -y
RUN apt-get install -y redis-server
# RUN redis-server

CMD ["redis-server"]
FROM redis
COPY redis.conf /usr/local/etc/redis/redis.conf
RUN apt-get update && apt-get install nvm
CMD [ "node", "index.js", "redis-server", "/usr/local/etc/redis/redis.conf" ]
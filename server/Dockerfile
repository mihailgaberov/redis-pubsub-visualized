FROM redislabs/redismod

RUN docker run -p 6379:6379 redislabs/redismod:preview

CMD [ "redis-server", "yarn", "start"]
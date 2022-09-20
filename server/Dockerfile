FROM redis
FROM node:latest
# COPY redis.conf /data/redis.conf
COPY . .
RUN yarn install && yarn start
# ENTRYPOINT [ "yarn" ]
# CMD ["start"]
ENTRYPOINT [ "redis-server" ]
CMD [ "/data/redis.conf" ]
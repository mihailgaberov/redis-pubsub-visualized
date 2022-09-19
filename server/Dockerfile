FROM redis
COPY redis.conf /data/redis.conf
ENTRYPOINT [ "redis-server" ]
CMD [ "/data/redis.conf" ]


FROM node:latest
COPY . .
RUN yarn install
ENTRYPOINT [ "yarn" ]
CMD ["start"]
FROM redislabs/redismod
FROM node:latest
COPY . .
RUN apt-get update -y
RUN apt-get install -y redis-server
RUN apt-get install -y yarn
# RUN redis-server
# RUN yarn install
CMD ["./start.sh"]
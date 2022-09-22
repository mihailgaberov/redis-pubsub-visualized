# FROM redislabs/redismod
# COPY . .
# RUN apt-get update -y
# RUN apt-get install -y redis-server
# # RUN redis-server

# CMD ["redis-server"]

# syntax=docker/dockerfile:1

FROM node:latest
COPY . .
WORKDIR /server
RUN apt-get update -y
RUN apt-get install -y redis-server
RUN chmod +x ./server/start.sh

CMD ./start.sh

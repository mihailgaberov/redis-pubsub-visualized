# FROM redislabs/redismod
# COPY . .
# RUN apt-get update -y
# RUN apt-get install -y redis-server
# # RUN redis-server

# CMD ["redis-server"]

# syntax=docker/dockerfile:1

FROM node:latest
WORKDIR /server
RUN apt-get update -y
RUN apt-get install -y redis-server
COPY . ./server
RUN chmod +x ./start.sh

CMD ./start.sh

# FROM redislabs/redismod
# COPY . .
# RUN apt-get update -y
# RUN apt-get install -y redis-server
# # RUN redis-server

# CMD ["redis-server"]

# syntax=docker/dockerfile:1

FROM redislabs/redismod
WORKDIR /server/
RUN apt-get update -y
RUN apt-get install -y redis-server
RUN redis-server

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /server/
RUN apt-get install -y yarn
CMD ["yarn", "start"]
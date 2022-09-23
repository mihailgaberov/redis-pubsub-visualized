# syntax=docker/dockerfile:1

# FROM node:latest
# WORKDIR /server
# RUN apt-get update -y
# RUN apt-get install -y redis-server
# COPY . .
# RUN chmod +x start.sh
# CMD ./start.sh

FROM ubuntu:latest
WORKDIR /server
RUN apt update
RUN apt-get install -y redis
RUN systemctl status redis-server.service
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

COPY . .
CMD [ "start.sh" ]
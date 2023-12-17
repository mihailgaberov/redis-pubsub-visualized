# syntax=docker/dockerfile:1
FROM ubuntu:latest

WORKDIR /server
RUN apt update
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g yarn
RUN apt-get install -y redis-server

COPY . .

RUN chmod +x start.sh

RUN redis-server --daemonize yes

CMD ./start.sh
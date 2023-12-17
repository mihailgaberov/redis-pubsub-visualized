# syntax=docker/dockerfile:1
FROM ubuntu:latest

WORKDIR /server
RUN  apt-get update && sudo apt-get install -y ca-certificates curl gnupg
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN NODE_MAJOR=20
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && sudo apt-get install nodejs -y
RUN npm install -g yarn
RUN apt-get install -y redis-server

COPY . .

RUN chmod +x start.sh

RUN redis-server --daemonize yes

CMD ./start.sh
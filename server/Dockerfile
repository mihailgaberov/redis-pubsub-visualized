# syntax=docker/dockerfile:1
FROM ubuntu:latest

WORKDIR /server
RUN apt-get update && apt-get install -y ca-certificates curl gnupg
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
ENV NODE_MAJOR=20
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get install -y nodejs
# RUN npm install -g yarn
RUN apt-get install -y redis-server

COPY . .

RUN chmod +x start.sh

RUN redis-server --daemonize yes

CMD ./start.sh
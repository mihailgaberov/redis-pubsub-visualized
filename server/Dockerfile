# syntax=docker/dockerfile:1

# FROM node:latest
# WORKDIR /server
# RUN apt-get update -y
# RUN apt-get install -y redis-server
# COPY . .
# RUN chmod +x start.sh
# CMD ./start.sh

FROM ubuntu:latest
RUN mkdir -p /etc/supervisord.d

# general config for supervisord

RUN echo  $'[supervisord] \n\
[unix_http_server] \n\
file = /tmp/supervisor.sock \n\
chmod = 0777 \n\
chown= nobody:nogroup \n\
[supervisord] \n\
logfile = /tmp/supervisord.log \n\
logfile_maxbytes = 50MB \n\
logfile_backups=10 \n\
loglevel = info \n\
pidfile = /tmp/supervisord.pid \n\
nodaemon = true \n\
umask = 022 \n\
identifier = supervisor \n\
[supervisorctl] \n\
serverurl = unix:///tmp/supervisor.sock \n\
[rpcinterface:supervisor] \n\
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface \n\
[include] \n\
files = /etc/supervisord.d/*.conf' >> /etc/supervisord.conf

# starting redis-server using supervisor d

RUN echo $'[supervisord] \n\
nodaemon=true \n\
[program:redis] \n\
command=redis-server /etc/redis.conf \n\
autostart=true \n\
autorestart=true \n\
stdout_logfile=/var/log/redis/stdout.log \n\
stdout_logfile_maxbytes=0MB \n\
stderr_logfile=/var/log/redis/stderr.log \n\
stderr_logfile_maxbytes=10MB \n\
exitcodes=0 ' >> /etc/supervisord.d/redis.conf

# WORKDIR /server
# RUN apt update
# RUN apt-get install -y redis
# RUN systemctl status redis-server.service
# RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
# RUN apt-get install -y nodejs
# Using Ubuntu
RUN apt update
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs


COPY . .
CMD [ "start.sh" ]
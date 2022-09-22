# FROM redislabs/redismod
# COPY . .
# RUN apt-get update -y
# RUN apt-get install -y redis-server
# # RUN redis-server

# CMD ["redis-server"]

# syntax=docker/dockerfile:1

FROM redislabs/redismod
WORKDIR /server
RUN apt-get update -y
RUN apt-get install -y redis-server
RUN redis-server

# RUN chmod +x start.sh.
# FROM node:16

ENTRYPOINT [ "./start.sh" ]
# CMD [ "./start.sh" ]

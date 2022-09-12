FROM debian:stretch

WORKDIR /server
RUN  apt-get update && apt-get -y install docker \
	&& docker run -p 6379:6379 redislabs/redismod:preview

ENV PATH=/server:$PATH

CMD ["yarn", "start"]
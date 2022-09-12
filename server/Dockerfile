FROM redislabs/redismod
COPY ["start.sh", "/root/start.sh"]
COPY ["redis.conf", "/root/redis.conf"]
WORKDIR /root
CMD ["./start.sh"]
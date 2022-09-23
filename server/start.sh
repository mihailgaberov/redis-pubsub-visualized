#!/bin/sh
service docker start &&
docker run -p 6379:6379 redislabs/redismod:preview &&
yarn &&
yarn start
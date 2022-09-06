import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const REDISCLOUD_URL = process.env.REDISCLOUD_URL || "redis://127.0.0.1:6379";

const options = {
  retryStrategy: (times: number) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
};

const pubsub = new RedisPubSub({
  publisher: new Redis(REDISCLOUD_URL, options),
  subscriber: new Redis(REDISCLOUD_URL, options),
});
// const pubsub = new RedisPubSub();

export default pubsub;

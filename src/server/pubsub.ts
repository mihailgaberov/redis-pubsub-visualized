import { RedisPubSub } from "graphql-redis-subscriptions";

const pubsub = new RedisPubSub();
module.exports = pubsub;

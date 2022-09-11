const { RedisPubSub } = require("graphql-redis-subscriptions");

const pubsub = new RedisPubSub();

export default pubsub;

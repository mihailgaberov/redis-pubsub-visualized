const { RedisPubSub } = require("graphql-redis-subscriptions");
const dotenv = require("dotenv");
dotenv.config();

module.exports = new RedisPubSub({
    connection: process.env.REDIS_CONNECTION
});

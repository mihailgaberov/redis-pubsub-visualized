// const { RedisPubSub } = require("graphql-redis-subscriptions");
import { RedisPubSub } from "graphql-redis-subscriptions";
// const dotenv = require("dotenv");
import dotenv from "dotenv";
dotenv.config();

const redisPubSub = new RedisPubSub({
    connection: process.env.REDIS_CONNECTION
});

export default redisPubSub;
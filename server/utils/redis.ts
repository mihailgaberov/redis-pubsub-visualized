import Redis, { RedisKey } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASS,
  db: 0,
});

export const get = async (key: RedisKey) => {
  try {
    const data: any = await redis.get(key);
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

export const set = async (key: RedisKey, data: any) => {
  try {
    await redis.set(key, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
};

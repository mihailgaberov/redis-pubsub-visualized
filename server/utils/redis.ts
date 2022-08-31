import Redis from "ioredis";

const redis = new Redis();

export const get = async (key: Redis.KeyType) => {
  try {
    const data: any = await redis.get(key);
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

export const set = async (key: Redis.KeyType, data: any) => {
  try {
    await redis.set(key, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
};

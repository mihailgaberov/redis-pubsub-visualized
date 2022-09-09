import dotenv from "dotenv";
import Redis from "ioredis";
dotenv.config();

// const username: string = process.env.REDIS_USER ?? "";
// const password: string = process.env.REDIS_PASSWORD ?? "";
// const host: string = process.env.REDIS_HOST ?? "";
// const port: number = Number(process.env.REDIS_PORT) ?? 6376;

// const client = new Redis({
//   port: port,
//   host: host,
//   username: username,
//   password: password,
//   connectionName: "Migelito",
// });
const {
  REDIS_URL = "redis://redis-14177.c15.us-east-1-4.ec2.cloud.redislabs.com:14177",
} = process.env;

const client = new Redis(REDIS_URL);

export const get = async (key: any) => {
  try {
    const data: any = await client.get(key);
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

export const set = async (key: any, data: any) => {
  try {
    await client.set(key, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
};

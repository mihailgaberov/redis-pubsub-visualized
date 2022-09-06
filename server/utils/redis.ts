import Redis from "ioredis";
// import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const username: string = process.env.REDIS_USER ?? "";
const password: string = process.env.REDIS_PASSWORD ?? "";
const host: string = process.env.REDIS_HOST ?? "";
const port: string = process.env.REDIS_PORT ?? "";

const client = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

console.log(">>> host: ", host);
console.log(">>> port: ", port);
console.log(">>> username: ", username);
console.log(">>> password: ", password);

// const client = createClient({
//   url: `redis://${username}:${password}@${host}:${port}`,
// });

// client.on("error", (err) => console.log("Redis Client Error", err));

// (async () => {
//   await client.connect();
// })();
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

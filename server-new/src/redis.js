import Redis from "ioredis";
import { config } from "dotenv";
config();

let client = new Redis(process.env.REDIS_CONNECTION);

if (client) {
  console.log("Connected to Redis! 🚀");

  client.set("success", "TRUE");

  client.get("success").then((result) => {
    console.log(`🎉🎉🎉 Result for key 'success': ${result}`);
  });

  client.del("success");
} else {
  console.log("Connection to Redis failed: ", client);
}

export async function get(key) {
  try {
    const data = await client.get(key);
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}
export async function set(key, data) {
  console.log('🚀 [server]: set', key, data);
  try {
    await client.set(key, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
}

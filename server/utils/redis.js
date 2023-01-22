const Redis = require("ioredis");
const dotenv = require("dotenv");
dotenv.config();

// let client = new Redis(process.env.REDIS_URL, {family: 6});
let client = new Redis({
  port: 6379,
  family: 6,
  host: 'mad.visualizer-server-redis.internal',
  password: process.env.REDIS_PASSWORD,
});

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

module.exports = {
  get: async (key) => {
    try {
      const data = await client.get(key);
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  },

  set: async (key, data) => {
    try {
      await client.set(key, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  },
};

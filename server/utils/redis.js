const Redis = require("ioredis");
const dotenv = require("dotenv");
dotenv.config();

// const username = process.env.REDIS_USER ?? "";
// const password = process.env.REDIS_PASSWORD ?? "";
// const host = process.env.REDIS_HOST ?? "";
// const port = Number(process.env.REDIS_PORT) ?? 6376;

// const client = new Redis({
//   port: port,
//   host: host,
//   username: username,
//   password: password,
//   connectionName: "Migelito",
// });
const { REDIS_URL } = process.env;

const client = new Redis(REDIS_URL);

console.log("Connected to Render Redis! 🚀");

client.set("animal", "cat");

client.get("animal").then((result) => {
  console.log(`Result for key animal: ${result}`);
});

client.del("animal");

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

import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import express from "express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import resolvers from "./resolvers";
import typeDefs from "./schema";

(async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const app = express();
  const httpServer = createServer(app);
  const PORT = 4000;

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on :${PORT}${server.graphqlPath}`);
  });
})();

/* require("dotenv").config();
const Redis = require("ioredis");

const { REDIS_URL } = process.env;

// Recommended to use this method for connecting to Render Redis,
// as this value can be set automatically by Render Blueprints

const renderRedis = new Redis(REDIS_URL);
console.log("Connected to Render Redis! 🚀");

renderRedis.set("animal", "cat");

renderRedis.get("animal").then((result) => {
  console.log(`Result for key animal: ${result}`); // Prints "cat"
});

renderRedis.del("animal");
 */

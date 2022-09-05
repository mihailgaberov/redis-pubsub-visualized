/* import { ApolloServer } from "apollo-server";

import typeDefs from "./schema";
import resolvers from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

server.applyMiddleware();

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
 */
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import http from "http";
import typeDefs from "./schema";
import resolvers from "./resolvers";

(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();

  const corsOptions = {
    origin: ["https://redis-pub-sub-visualized.vercel.app/"],
  };

  server.applyMiddleware({
    app,
    path: "https://redis-pubsub-viz-server.herokuapp.com:4000/graphql",
    cors: corsOptions,
  });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at ${server.graphqlPath}`);
})();

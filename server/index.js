const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const express = require("express");
const cors = require("cors");

const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { resolvers } = require("./resolvers.js");
const typeDefs = require("./schema.js");

(async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const app = express();
  app.use(cors());
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
    console.log(`🚀 Server is now running on :${PORT}${server.graphqlPath}`);
  });
})();

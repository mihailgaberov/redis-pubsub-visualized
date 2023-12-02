const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const { Server: WebSocketServer } = require('ws');
const { resolvers } = require("./resolvers.js");
const typeDefs = require("./schema.js");

const PORT = process.env.PORT || 4000;

const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const server = http.createServer(app);

const wsServer = new WebSocketServer({ server });

wsServer.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('message', (message) => {
    console.log('Received WebSocket message:', message.toString());

    // Handle incoming message and send updates to other clients
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

server.listen({ port: PORT }, async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  console.log(`🍦Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
});


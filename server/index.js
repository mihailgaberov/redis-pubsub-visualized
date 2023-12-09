/*
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
  console.log('🔗 New WebSocket connection');

  socket.on('message', (message) => {
    console.log('Received WebSocket message:', message.toString());
  });

  socket.on('error', (error) => {
    console.log('WebSocket error:', error);
  });



  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

server.listen({ port: PORT }, async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
  });

  console.log(`🍦Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
});

*/

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const { Server: WebSocketServer } = require('ws');
const { resolvers } = require('./resolvers.js');
const typeDefs = require('./schema.js');
const cors = require("cors");


const PORT = Number(process.env.PORT) || 4000;

const app = express();
app.use(cors());


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const wsServer = new WebSocketServer({ noServer: true }); // WebSocket server without HTTP server



wsServer.on('connection', (socket) => {
  console.log('🔗 New WebSocket connection');

  socket.on('message', (message) => {
    console.log('Received WebSocket message:', message.toString());
  });

  socket.on('error', (error) => {
    console.log('WebSocket error:', error);
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({
    app,
  });

  const server = http.createServer(app);

  server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit('connection', socket, request);
    });
  });

  server.listen(PORT, () => {
    console.log(`🍦 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
});

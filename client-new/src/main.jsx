import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

import App from './App';

const SERVER_HTTP_LINK = import.meta.env.VITE_SERVER_HTTP_LINK;
const SERVER_WS_LINK = import.meta.env.VITE_SERVER_WS_LINK;

// const client = new ApolloClient({
//   uri: SERVER_HTTP_LINK,
//   cache: new InMemoryCache(),
// });



const httpLink = new HttpLink({
  uri: SERVER_HTTP_LINK,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: SERVER_WS_LINK,
  })
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
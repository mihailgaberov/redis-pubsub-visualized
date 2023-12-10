import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

const SERVER_HTTP_LINK = import.meta.env.VITE_SERVER_HTTP_LINK;
// // @ts-ignore
// const SERVER_WS_LINK = import.meta.env.VITE_SERVER_WS_LINK;

const client = new ApolloClient({
  uri: SERVER_HTTP_LINK,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import { Subscriber } from "./components/Subscriber";
import { Publisher } from "./components/Publisher";

import "./App.scss";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
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
  link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <section className="publishers">
          {[
            { name: "weather", icon: "⛅" },
            { name: "sport", icon: "🤾‍♀️" },
            { name: "music", icon: "🎶" },
          ].map((channel, idx) => (
            <Publisher key={idx} icon={channel.icon} name={channel.name} />
          ))}
        </section>
        <section className="subscribers">
          {[1, 2, 3].map((n) => (
            <Subscriber key={n} subscriberNo={n} />
          ))}
        </section>
      </div>
    </ApolloProvider>
  );
}

export default App;

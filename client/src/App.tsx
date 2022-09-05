import React from "react";
import { Subscriber } from "./components/Subscriber";
import { Publisher } from "./components/Publisher";
import { ApolloClient } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider, split, InMemoryCache } from "@apollo/client";

import "./App.scss";

const httpLink = new HttpLink({
  uri: "https://redis-pubsub-viz-server.herokuapp.com:4000",
});

const wsLink = new WebSocketLink({
  uri: `ws://redis-pubsub-viz-server.herokuapp.com:4000/graphql`,
  options: {
    reconnect: true,
  },
});

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

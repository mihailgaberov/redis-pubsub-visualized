import React from "react";
import { Subscriber } from "./components/Subscriber";
import { Publisher } from "./components/Publisher";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import "./App.scss";

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
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
          {["⛅", "🤾‍♀️", "🎶"].map((channel) => (
            <Publisher
              icon={channel}
              publishCallback={() => console.log(">>> publish")}
            />
          ))}
        </section>
        <section className="subscribers">
          {[1, 2, 3].map((n) => (
            <Subscriber subscriberNo={n} />
          ))}
        </section>
      </div>
    </ApolloProvider>
  );
}

export default App;

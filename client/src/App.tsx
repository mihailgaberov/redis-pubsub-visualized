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

// @ts-ignore
const SERVER_HTTP_LINK = import.meta.env.VITE_SERVER_HTTP_LINK;
// @ts-ignore
const SERVER_WS_LINK = import.meta.env.VITE_SERVER_WS_LINK;

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

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <section className="publishers">
          {[
            { name: "weather", icon: "⛅" },
            { name: "sport", icon: "🤾‍" },
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

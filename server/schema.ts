import { gql } from "apollo-server";

const schema = gql`
  type Weather {
    value: String!
  }

  type Sport {
    value: String!
  }

  type Music {
    value: String!
  }

  type Query {
    weather: Weather
    sport: Sport
    music: Music
  }

  type Subscription {
    weather: Weather
    sport: Sport
    music: Music
  }
`;
export default schema;

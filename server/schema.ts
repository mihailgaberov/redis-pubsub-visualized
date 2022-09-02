import { gql } from "apollo-server";

const schema = gql`
  type Weather {
    icon: String
    text: String!
  }

  type Sport {
    icon: String
    text: String!
  }

  type Music {
    icon: String
    text: String!
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

  type Mutation {
    weather: Weather
    sport: Sport
    music: Music
  }
`;
export default schema;

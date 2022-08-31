import pubsub from "./pubsub";

import { get } from "./utils/redis";

const CHANNELS = {
  WEATHER: "weather",
  SPORT: "sport",
  MUSIC: "music",
};

module.exports = {
  Query: {
    weather: () => get(CHANNELS.WEATHER),
    sport: () => get(CHANNELS.SPORT),
    music: () => get(CHANNELS.MUSIC),
  },
  Subscription: {
    weather: {
      subscribe: () => pubsub.asyncIterator(CHANNELS.WEATHER),
    },
    sport: {
      subscribe: () => pubsub.asyncIterator(CHANNELS.SPORT),
    },
    music: {
      subscribe: () => pubsub.asyncIterator(CHANNELS.MUSIC),
    },
  },
};

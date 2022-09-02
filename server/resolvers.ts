import pubsub from "./pubsub";

import { get, set } from "./utils/redis";

const CHANNELS = {
  WEATHER: "weather",
  SPORT: "sport",
  MUSIC: "music",
};

const publishData = async (data: Object, channel: string) => {
  pubsub.publish(channel, { [channel]: data });
  await set(channel, data);
  return data;
};

export default {
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
  Mutation: {
    weather: () =>
      publishData({ icon: "🌧", text: "Raining men" }, CHANNELS.WEATHER),
    sport: () =>
      publishData(
        { icon: "⚽️", text: "Barcelona vs Munich: 3 : 1" },
        CHANNELS.SPORT
      ),
    music: () =>
      publishData(
        { icon: "🎤", text: "Jovi having new concert" },
        CHANNELS.MUSIC
      ),
  },
};

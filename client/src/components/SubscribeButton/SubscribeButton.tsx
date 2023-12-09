import {FunctionComponent, useState} from "react";
import {gql} from "@apollo/client";

import "./SubscribeButton.scss";

interface SubscribeButtonProps {
  channelName: string;
  subscribeToMore: Function;
  displayNewsCallback: Function;
}

const WEATHER_SUBSCRIBE = gql`
  subscription Weather {
    weather {
      icon
      text
    }
  }
`;

const SPORT_SUBSCRIBE = gql`
  subscription Sport {
    sport {
      icon
      text
    }
  }
`;

const MUSIC_SUBSCRIBE = gql`
  subscription Music {
    music {
      icon
      text
    }
  }
`;

const mapTitleToSubscription = {
  Weather: WEATHER_SUBSCRIBE,
  Sport: SPORT_SUBSCRIBE,
  Music: MUSIC_SUBSCRIBE,
};

function subscribeTo(
  channelTitle: string,
  subscribeToMore: Function,
  processDataCallback: Function
) {
  const unsubscribe = subscribeToMore({
    document: mapTitleToSubscription[channelTitle],
    updateQuery: (prev: any, {subscriptionData}) => {
      if (!subscriptionData.data) return prev;

      processDataCallback(subscriptionData.data);
      return subscriptionData.data;
    },
  });

  return unsubscribe;
}

export const SubscribeButton: FunctionComponent<SubscribeButtonProps> = ({
  channelName,
  subscribeToMore,
  displayNewsCallback,
}) => {
  const [unSubscribeHandlers, setUnSubscribeHandlers] = useState(new Map());

  function subscribe() {
    console.log(">>> subscribe: ", channelName)

    const unsubscribe = subscribeTo(
      channelName,
      subscribeToMore,
      displayNewsCallback
    );

    setUnSubscribeHandlers((prev) =>
      new Map(prev).set(channelName, unsubscribe)
    );
  }

  function unSubscribe() {
    unSubscribeHandlers.get(channelName)();
    setUnSubscribeHandlers((prev) => {
      const newState = new Map(prev);
      newState.delete(channelName);
      return newState;
    });
  }

  return (
    <>
      {!unSubscribeHandlers.get(channelName) && (
        <button className="subscribe-btn" onClick={() => subscribe()}>
          <sup>Subscribe for</sup>
          <br />
          {channelName}
        </button>
      )}
      {unSubscribeHandlers.get(channelName) && (
        <button className="subscribe-btn" onClick={() => unSubscribe()}>
          <sup>Unsubscribe for</sup>
          <br />
          {channelName}
        </button>
      )}
    </>
  );
};

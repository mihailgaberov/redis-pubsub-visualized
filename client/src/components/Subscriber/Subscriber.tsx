import React, { FunctionComponent, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./Subscriber.scss";

interface SubscriberProps {
  subscriberNo: number;
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

const WEATHER_QUERY = gql`
  query Weather {
    weather {
      icon
      text
    }
  }
`;

function subscribeTo(subscription, subscribeToMore) {
  subscribeToMore({
    document: subscription,
    updateQuery: (prev, { subscriptionData }) => {
      console.log(">>> subscriptionData: ", subscriptionData.data);
      if (!subscriptionData.data) return prev;

      return subscriptionData.data;
    },
  });
}

export const Subscriber: FunctionComponent<SubscriberProps> = ({
  subscriberNo,
}) => {
  const { data, loading, error, subscribeToMore } = useQuery(WEATHER_QUERY);

  console.log(">>> data: ", data);
  console.log(">>> loading", loading);
  console.log(">>> error: ", error);

  if (error) return <div>Error!</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="subscriber">
      <div className="side front">
        <h3>Subscriber #{subscriberNo}</h3>
      </div>
      <div className="side back">
        <button
          onClick={() => {
            console.log(">>> Subscribe for weather");
            subscribeTo(WEATHER_SUBSCRIBE, subscribeToMore);
          }}
        >
          <sup>Subscribe for</sup>
          <br />
          Weather
        </button>
        <button
          onClick={() => {
            console.log(">>> Subscribe for sport");
            subscribeTo(SPORT_SUBSCRIBE, subscribeToMore);
          }}
        >
          <sup>Subscribe for</sup>
          <br />
          Sport
        </button>
        <button
          onClick={() => {
            console.log(">>> Subscribe for music");
            subscribeTo(MUSIC_SUBSCRIBE, subscribeToMore);
          }}
        >
          <sup>Subscribe for</sup>
          <br />
          Music
        </button>
      </div>
    </div>
  );
};

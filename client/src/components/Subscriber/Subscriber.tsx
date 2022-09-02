import React, { FunctionComponent } from "react";
import gql from "graphql-tag";

import "./Subscriber.scss";
import { useQuery, useSubscription } from "react-apollo";

interface SubscriberProps {
  subscriberNo: number;
}

const SUBSCRIBE_WEATHER = gql`
  subscription Weather {
    weather {
      icon
      text
    }
  }
`;

export const Subscriber: FunctionComponent<SubscriberProps> = ({
  subscriberNo,
}) => {
  const { loading, error, data } = useSubscription(SUBSCRIBE_WEATHER, {
    onSubscriptionData: (data) => console.log(">>> new data", data),
  });

  console.log(">>> data: ", data);
  console.log(">>> loading: ", loading);
  console.log(">>> error: ", error);

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div className="subscriber">
      <div className="side front">
        <h3>Subscriber #{subscriberNo}</h3>
      </div>
      <div className="side back">
        <button
          onClick={() => {
            console.log(">>> Subscribe for weather");
          }}
        >
          <sup>Subscribe for</sup>
          <br />
          Weather
        </button>
        <button onClick={() => console.log(">>> Subscribe for sport")}>
          <sup>Subscribe for</sup>
          <br />
          Sport
        </button>
        <button disabled onClick={() => console.log(">>> Subscribe for music")}>
          <sup>Subscribe for</sup>
          <br />
          Music
        </button>
      </div>
    </div>
  );
};

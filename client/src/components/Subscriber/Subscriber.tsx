import React, { FunctionComponent, useEffect, useState } from "react";
import { useQuery, gql, DocumentNode } from "@apollo/client";
import "./Subscriber.scss";
import { SubscribeButton } from "../SubscribeButton";

interface SubscriberProps {
  subscriberNo: number;
}

const WEATHER_QUERY = gql`
  query Weather {
    weather {
      icon
      text
    }
    sport {
      icon
      text
    }
    music {
      icon
      text
    }
  }
`;

export const Subscriber: FunctionComponent<SubscriberProps> = ({
  subscriberNo,
}) => {
  const { loading, error, subscribeToMore } = useQuery(WEATHER_QUERY);

  const [currentNews, setCurrentNews] = useState({ data: {} });

  /* {
    "music": {
        "icon": "🎤",
        "text": "Jovi having new concert",
        "__typename": "Music"
    }
} */
  console.log(">>> currentNews: ", currentNews);

  if (error) return <div>Error!</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="subscriber">
      <div className="side front">
        <h3>Subscriber #{subscriberNo}</h3>
        <section className="content">
          <header>Music</header>
          <main>
            <div>🎙️</div>
            <div>Jovi having new concert</div>
          </main>
        </section>
      </div>
      <div className="side back">
        <SubscribeButton
          channelName="Weather"
          subscribeToMore={subscribeToMore}
          displayNewsCallback={setCurrentNews}
        />
        <SubscribeButton
          channelName="Sport"
          subscribeToMore={subscribeToMore}
          displayNewsCallback={setCurrentNews}
        />
        <SubscribeButton
          channelName="Music"
          subscribeToMore={subscribeToMore}
          displayNewsCallback={setCurrentNews}
        />
      </div>
    </div>
  );
};

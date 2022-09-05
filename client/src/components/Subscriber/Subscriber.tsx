import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useQuery, gql } from "@apollo/client";
import { SubscribeButton } from "../SubscribeButton";

import "./Subscriber.scss";
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
interface InitialState {
  channelName: string;
  icon: string;
  text: string;
}

const initialState: InitialState = {
  channelName: "",
  icon: "",
  text: "",
};

function PrepareNewsDataReducer(
  state: InitialState,
  action: { data: {}; type: string }
) {
  const data = action.data;

  switch (action.type) {
    case "UPDATE":
      const channelName = Object.getOwnPropertyNames(data)[0];

      return {
        channelName,
        icon: data[channelName].icon,
        text: data[channelName].text,
      };
    default:
      return state;
  }
}

export const Subscriber: FunctionComponent<SubscriberProps> = ({
  subscriberNo,
}) => {
  const { loading, error, subscribeToMore } = useQuery(WEATHER_QUERY);

  const [currentNews, setCurrentNews] = useState();
  const [currentShow, dispatch] = useReducer(
    PrepareNewsDataReducer,
    initialState
  );

  useEffect(() => {
    if (currentNews) {
      dispatch({ type: "UPDATE", data: currentNews });
    }
  }, [currentNews]);

  if (error) return <div>Error!</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="subscriber">
      <div className="side front">
        <h3>Subscriber #{subscriberNo}</h3>
        <section className="content">
          <header>{currentShow.channelName.toUpperCase()}</header>
          <main>
            <div>{currentShow.icon}</div>
            <div>{currentShow.text}</div>
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

import  {
  useEffect,
  useReducer,
  useState,
} from "react";
import { useQuery, gql } from "@apollo/client";
import { SubscribeButton } from "../SubscribeButton";

import "./Subscriber.scss";

const ALL_CHANNELS_QUERY = gql`
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

function PrepareNewsDataReducer(
  state,
  action
) {
  console.log(">>> reducer action: ", action)
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

const initialState = {
  channelName: "",
  icon: "",
  text: "",
};

export const Subscriber = ({
  subscriberNo,
}) => {
  const { loading, error, subscribeToMore } = useQuery(ALL_CHANNELS_QUERY);

  const [currentNews, setCurrentNews] = useState();
  const [currentShow, dispatch] = useReducer(
    PrepareNewsDataReducer,
    initialState
  );

  useEffect(() => {
    console.log(">>> currentNews: ", currentNews)
    if (currentNews) {
      dispatch({ type: "UPDATE", data: currentNews });
    }
  }, [currentNews]);

  if (error) return <div>An error occurred while querying channel {currentShow.channelName}.</div>;
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

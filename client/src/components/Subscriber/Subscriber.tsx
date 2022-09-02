import React, { FunctionComponent } from "react";
import "./Subscriber.scss";

interface SubscriberProps {
  subscriberNo: number;
}

export const Subscriber: FunctionComponent<SubscriberProps> = ({
  subscriberNo,
}) => {
  return (
    <div className="subscriber">
      <div className="side front">
        <h3>Subscriber #{subscriberNo}</h3>
      </div>
      <div className="side back">
        <button onClick={() => console.log(">>> Subscribe for weather")}>
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

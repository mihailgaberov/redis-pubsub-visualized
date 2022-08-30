import React, { FunctionComponent } from "react";
import "./Subscriber.scss";

interface SubscriberProps {
  data: number;
}

export const Subscriber: FunctionComponent<SubscriberProps> = ({ data }) => {
  return (
    <div className="subscriber">
      <div className="side front">
        <h1>{data}</h1>
      </div>

      <div className="side back"></div>
    </div>
  );
};

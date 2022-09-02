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

      <div className="side back"></div>
    </div>
  );
};

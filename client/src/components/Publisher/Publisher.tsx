import { FunctionComponent, MouseEventHandler } from "react";

import "./Publisher.scss";

interface PublisherProps {
  icon: string;
  publishCallback: MouseEventHandler<HTMLButtonElement>;
}

export const Publisher: FunctionComponent<PublisherProps> = ({
  icon,
  publishCallback,
}) => (
  <div className="publisher">
    <i className="icon">{icon}</i>
    <button onClick={publishCallback}>PUBLISH</button>
  </div>
);

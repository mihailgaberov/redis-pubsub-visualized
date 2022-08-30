import { FunctionComponent, MouseEventHandler } from "react";

import "./Publisher.scss";

interface PublisherProps {
  iconClassName: string;
  publishCallback: MouseEventHandler<HTMLButtonElement>;
}

export const Publisher: FunctionComponent<PublisherProps> = ({
  iconClassName,
  publishCallback,
}) => (
  <div className="publisher">
    <i className={`icon ${iconClassName}`} />
    <button onClick={publishCallback}>PUBLISH</button>
  </div>
);

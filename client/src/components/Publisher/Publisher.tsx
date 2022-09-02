import React, { FunctionComponent, MouseEventHandler } from "react";
import gql from "graphql-tag";

import "./Publisher.scss";
import { useMutation } from "react-apollo";

interface PublisherProps {
  icon: string;
  name: string;
  publishCallback: MouseEventHandler<HTMLButtonElement>;
}

const CREATE_PUBLICATION = gql`
  mutation CreateWeatherPublication {
    weather {
      icon
      text
    }
  }
`;

export const Publisher: FunctionComponent<PublisherProps> = ({
  icon,
  publishCallback,
}) => {
  const [publish, { loading, error }] = useMutation(CREATE_PUBLICATION);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div className="publisher">
      <i className="icon">{icon}</i>
      <button onClick={() => publish()}>PUBLISH</button>
    </div>
  );
};

import {FunctionComponent} from "react";
import {gql, useMutation} from "@apollo/client";

import "./Publisher.scss";

const WEATHER_PUBLISH = gql`
  mutation Weather {
    weather {
      icon
      text
    }
  }
`;

const SPORT_PUBLISH = gql`
  mutation Sport {
    sport {
      icon
      text
    }
  }
`;

const MUSIC_PUBLISH = gql`
  mutation Music {
    music {
      icon
      text
    }
  }
`;

export const Publisher = ({
                                                                 icon,
                                                                 name,
                                                             }) => {
    const [publishWeather] = useMutation(WEATHER_PUBLISH);
    const [publishSport] = useMutation(SPORT_PUBLISH);
    const [publishMusic] = useMutation(MUSIC_PUBLISH);

    const mapNameToPublishMethod = {
        weather: publishWeather,
        sport: publishSport,
        music: publishMusic,
    };

    const publishTo = (channel) => {
        mapNameToPublishMethod[channel]();
    }

    return (
        <div className="publisher">
            <i className="icon" onClick={() => publishTo(name)}>
                {icon}
            </i>
            <button onClick={() => publishTo(name)}>PUBLISH</button>
        </div>
    );
};

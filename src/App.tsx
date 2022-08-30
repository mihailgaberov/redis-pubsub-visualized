import { useState } from "react";
import { Subscriber } from "./components/Subscriber";
import "./App.scss";
import { Publisher } from "./components/Publisher";

function App() {
  return (
    <div className="app">
      {["weather", "sport", "music"].map((channel) => (
        <Publisher
          iconClassName={channel}
          publishCallback={() => console.log(">>> publish")}
        />
      ))}

      {[1, 3, 4].map((n) => (
        <Subscriber data={n} />
      ))}
    </div>
  );
}

export default App;

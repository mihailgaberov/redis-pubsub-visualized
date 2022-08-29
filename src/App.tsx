import { useState } from "react";
import { Subscriber } from "./components/Day/Subscriber";
import "./App.scss";

function App() {
  return (
    <div className="app">
      {[1, 3, 4].map((n) => (
        <Subscriber data={n} />
      ))}
    </div>
  );
}

export default App;

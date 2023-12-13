import "./App.scss";
import { Publisher } from "./components/Publisher";
import { Subscriber } from "./components/Subscriber";

function App() {
  return (
  
      <div className="app">
        <section className="publishers">
          {[
            { name: "weather", icon: "⛅" },
            { name: "sport", icon: "🤾‍" },
            { name: "music", icon: "🎶" },
          ].map((channel, idx) => (
            <Publisher key={idx} icon={channel.icon} name={channel.name} />
          ))}
        </section>
        <section className="subscribers">
          {[1, 2, 3].map((n) => (
            <Subscriber key={n} subscriberNo={n} />
          ))}
        </section>
      </div>
  );
}

export default App;

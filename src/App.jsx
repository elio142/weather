import { useState } from "react";
import Header from "./components/header.jsx";
import WeatherBody from "./components/weatherBody";

function App() {
  const API_KEY=import.meta.env.VITE_WEATHER_API_KEY;
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-green-100 text-black p-10"> 
      <Header />
      <WeatherBody />
    </div>
  );
}

export default App;

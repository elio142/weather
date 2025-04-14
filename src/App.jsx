import { useState } from "react";
import Header from "./components/header.jsx";
import WeatherBody from "./components/weatherBody";

function App() {
  const [city, setCity] = useState("");

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <div className="bg-[#9CCEF4] text-black"> 
      <Header onSearch={handleSearch} />
      <WeatherBody city={city} />
    </div>
  );
}

export default App;

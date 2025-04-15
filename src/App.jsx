import { useState, useEffect } from 'react';
import './App.css';
import CurrentWeather from './components/currentWeather';
import FakeWeather from './data/FakeWeather.json';

function App() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState(FakeWeather);
  const [city, setCity] = useState("London"); // Default city
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    if (!cityName?.trim()) return; // Skip if empty city
    
    setLoading(true);
    
    try {
      const response = await fetch(

        ` https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}`,
        {
          method:"GET" , headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }
        }
        
      );
      
      if (!response.ok) throw new Error("API request failed");
      setWeatherData(await response.json());
    } catch (err) {
      // Silently fall back to fake data
      console.log(err);
      setWeatherData({
        ...FakeWeather,
        city: {
          ...FakeWeather.city,
          name: cityName || FakeWeather.city.name
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather on initial load
  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className=' bg-[#759EDA]  font-raleway'>
      <div className='w-full mx-auto  shadow-sm pt-6'>
        <form onSubmit={handleSubmit} className="flex mb-4 ">
          <input 
            type="text"
            value={city}
            placeholder="Type in a city name"
            onChange={(e) => setCity(e.target.value)}
            className='text-white text-base  w-60 h-10  px-4 rounded-l-lg focus:outline-none focus:ring-0'
          />
          <button
            type="submit"
            className='bg-[#5879C7] text-black px-5 py-2 h-10 mt-1  flex m-0 hover:bg-blue-600'
          >
            FIND WEATHER
          </button>
        </form>

        {loading ? (
          <p className="text-center">Loading weather data...</p>
        ) : (
          <div className='bg-[#9CCEF4]'>
            <CurrentWeather data={weatherData} />
           
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
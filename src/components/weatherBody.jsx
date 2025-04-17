import React, { useState, useEffect } from "react";
import mostlycloudy from "/images/weather-icons/mostlycloudy.svg";
import clear from "/images/weather-icons/clear.svg";
import rain from "/images/weather-icons/rain.svg";
import snow from "/images/weather-icons/snow.svg";
import storm from "/images/weather-icons/storm.svg";
import drizzle from "/images/weather-icons/drizzle.svg";
import fog from "/images/weather-icons/fog.svg";
import partlycloudy from "/images/weather-icons/partlycloudy.svg";
import cloudy from "/images/weather-icons/cloudy.svg";
import unknown from "/images/weather-icons/unknown.svg";

const WeatherBody = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultCity = city || "Beirut,LB";  // Default to Beirut if no city is provided

  useEffect(() => {
    fetchWeatherData(defaultCity);
  }, [defaultCity]);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = "f00c38e0279b7bc85480c3fe775d518c";
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`)
      ]);
      if (!weatherRes.ok || !forecastRes.ok) throw new Error("City not found. Please try again.");
      const weather = await weatherRes.json();
      const forecast = await forecastRes.json();
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Simplified background color based on weather ID
  const getBackgroundColor = (weatherId) => {
    if (weatherId < 300) return 'bg-gray-400'; // Thunderstorm
    if (weatherId >= 500 && weatherId < 600) return 'bg-gray-400'; // Rainy
    if (weatherId < 700) return 'bg-[#9CCEF4]'; // Snow
    if (weatherId === 800) return 'bg-blue-500'; // Clear
    return 'bg-[#9CCEF4]'; // Clouds
  };

  // Get the icon based on the weather condition
  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return clear;
      case 'Clouds':
        return mostlycloudy;
      case 'Rain':
      case 'Drizzle':
        return rain;
      case 'Snow':
        return snow;
      case 'Thunderstorm':
        return storm;
      case 'Fog':
        return fog;
      default:
        return unknown;
    }
  };

  if (loading) {
    return (
      <div className="bg-blue-400 text-center p-8 font-raleway text-blue-900 h-screen flex items-center justify-center">
        <p className="text-2xl text-white">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-blue-400 text-center p-8 font-raleway text-blue-900 h-screen flex items-center justify-center">
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!weatherData || !forecastData) {
    return (
      <div className="bg-blue-400 text-center p-8 font-raleway text-blue-900 h-screen flex items-center justify-center">
        <p className="text-2xl text-white">Search for a city to see weather data</p>
      </div>
    );
  }

  const weatherId = weatherData.weather[0].id;  // Weather ID from API
  const backgroundColor = getBackgroundColor(weatherId);
  const weatherIcon = getWeatherIcon(weatherData.weather[0].main);

  const hourlyForecast = forecastData.list.slice(0, 7).map((forecast) => ({
    time: new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: `${Math.round(forecast.main.temp)}°C`,
    icon: getWeatherIcon(forecast.weather[0].main)
  }));

  return (
    <div className={`${backgroundColor} transition-colors duration-700 text-center p-8 font-raleway text-blue-900 h-screen`}>
      <div className="flex flex-col items-center mb-6">
        <img src={weatherIcon} alt="current weather" className="w-48 h-48" />
        <p className="text-2xl mb-2 text-white">{weatherData.weather[0].description}</p>
        <p className="text-lg mb-2 text-white">Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
        <p className="font-semibold text-xl mb-2">
          Temperature <span className="font-normal ml-2">{Math.round(weatherData.main.temp)}°C</span>
        </p>
        <div className="flex gap-4 mb-4 text-sm">
          <p><span className="font-semibold">Humidity</span> {weatherData.main.humidity}%</p>
          <p><span className="font-semibold">Wind</span> {Math.round(weatherData.wind.speed * 3.6)} km/h</p>
        </div>
      </div>

      <div className="grid grid-cols-7">
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="mb-1 text-sm">{hour.time}</p>
            <img src={hour.icon} alt={`icon for ${hour.time}`} className="w-12 h-12" />
            <p className="mt-1 text-sm">{hour.temp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherBody;

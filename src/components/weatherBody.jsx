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

  useEffect(() => {
    const cityToFetch = city || "Beirut,LB";
    fetchWeatherData(cityToFetch);
  }, [city]);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = "f00c38e0279b7bc85480c3fe775d518c";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }
      
      const data = await response.json();
      setWeatherData(data);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundColor = (weatherCondition) => {
    const condition = weatherCondition.toLowerCase();
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'bg-gray-400';
    } else if (condition.includes('clear') && !condition.includes('cloud')) {
      return 'bg-blue-400';
    } else if (condition.includes('cloud') && !condition.includes('rain')) {
      return 'bg-[#9CCEF4]';
    } else {
      return 'bg-[#9CCEF4]';
    }
  };

  const getWeatherIcon = (weatherCondition) => {
    const condition = weatherCondition.toLowerCase();
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return rain;
    }
    switch (condition) {
      case 'clear':
        return clear;
      case 'clouds':
        return mostlycloudy;
      case 'partly cloudy':
        return partlycloudy;
      case 'snow':
        return snow;
      case 'thunderstorm':
        return storm;
      case 'mist':
      case 'fog':
      case 'haze':
        return fog;
      default:
        return unknown;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMostFrequentWeather = (forecasts) => {
    const weatherCounts = {};
    forecasts.forEach(forecast => {
      const condition = forecast.weather[0].main;
      weatherCounts[condition] = (weatherCounts[condition] || 0) + 1;
    });
    return Object.entries(weatherCounts).sort((a, b) => b[1] - a[1])[0][0];
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

  // Get the most frequent weather condition from hourly forecast
  const mostFrequentWeather = getMostFrequentWeather(forecastData.list);
  const backgroundColor = getBackgroundColor(mostFrequentWeather);
  const weatherIcon = getWeatherIcon(mostFrequentWeather);

  const hourlyForecast = forecastData.list.slice(0, 7).map(forecast => ({
    time: formatTime(forecast.dt),
    temp: `${Math.round(forecast.main.temp)}°C`,
    icon: getWeatherIcon(forecast.weather[0].main)
  }));

  return (
    <div className={`${backgroundColor} text-center p-8 font-raleway text-blue-900 h-screen`}>
      <div className="flex flex-col items-center mb-6">
        <img 
          src={weatherIcon} 
          alt="current weather" 
          className="w-48 h-48" 
        />
        <p className="text-2xl mb-2 text-white">{weatherData.weather[0].description}</p>
        <p className="text-lg mb-2 text-white">
          Feels like: {Math.round(weatherData.main.feels_like)}°C
        </p>
        <p className="font-semibold text-xl mb-2">
          Temperature <span className="font-normal ml-2">{Math.round(weatherData.main.temp)}°C</span>
        </p>
        <div className="flex gap-4 mb-4 text-sm">
          <p><span className="font-semibold">Humidity</span> {weatherData.main.humidity}%</p>
          <p><span className="font-semibold">Wind</span> {Math.round(weatherData.wind.speed * 3.6)} km/h</p>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
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

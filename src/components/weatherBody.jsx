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
    const cityToFetch = city || "Beirut,LB"; // More specific location for Lebanon
    fetchWeatherData(cityToFetch);
  }, [city]);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = "f00c38e0279b7bc85480c3fe775d518c";
      
      // First, get the exact coordinates for the city
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      
      if (!geoResponse.ok) {
        throw new Error('Could not find location coordinates.');
      }
      
      const geoData = await geoResponse.json();
      if (!geoData || geoData.length === 0) {
        throw new Error('Location not found. Please try a different city.');
      }
      
      const { lat, lon } = geoData[0];
      
      // Fetch current weather using exact coordinates
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!currentResponse.ok) {
        throw new Error('Could not fetch current weather data.');
      }
      
      const currentData = await currentResponse.json();
      
      // Verify the data is reasonable
      if (currentData.main.temp > 50 || currentData.main.temp < -20) {
        throw new Error('Invalid temperature data received.');
      }
      
      setWeatherData(currentData);

      // Fetch 5-day/3-hour forecast using coordinates
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      if (!forecastResponse.ok) {
        throw new Error('Could not fetch forecast data.');
      }

      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get background color based on weather condition
  const getBackgroundColor = (weatherCondition) => {
    const condition = weatherCondition.toLowerCase();
    switch (condition) {
      case 'clear':
        return 'bg-[#87CEEB]';
      case 'clouds':
      case 'partly cloudy':
        return 'bg-[#9CCEF4]';
      case 'rain':
      case 'drizzle':
        return 'bg-[#6B7B8C]';
      case 'thunderstorm':
        return 'bg-[#4B4B4B]';
      case 'snow':
        return 'bg-[#E8F4F8]';
      case 'mist':
      case 'fog':
      case 'haze':
        return 'bg-[#B0C4DE]';
      default:
        return 'bg-[#9CCEF4]';
    }
  };

  // Get weather icon based on weather condition
  const getWeatherIcon = (weatherCondition) => {
    const condition = weatherCondition.toLowerCase();
    switch (condition) {
      case 'clear':
        return clear;
      case 'clouds':
        return mostlycloudy;
      case 'partly cloudy':
        return partlycloudy;
      case 'rain':
        return rain;
      case 'snow':
        return snow;
      case 'thunderstorm':
        return storm;
      case 'drizzle':
        return drizzle;
      case 'mist':
      case 'fog':
      case 'haze':
        return fog;
      default:
        return unknown;
    }
  };

  // Format time from API timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get the most frequent weather condition from forecast
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
      <div className={`${getBackgroundColor('clouds')} text-center p-8 font-raleway text-blue-900 h-screen flex items-center justify-center`}>
        <p className="text-2xl text-white">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${getBackgroundColor('clouds')} text-center p-8 font-raleway text-blue-900 h-screen flex items-center justify-center`}>
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!weatherData || !forecastData) {
    return (
      <div className={`${getBackgroundColor('clouds')} text-center p-8 font-raleway text-blue-900 h-screen flex items-center justify-center`}>
        <p className="text-2xl text-white">Search for a city to see weather data</p>
      </div>
    );
  }

  // Get the most frequent weather condition for the main icon
  const mostFrequentWeather = getMostFrequentWeather(forecastData.list);
  const backgroundColor = getBackgroundColor(mostFrequentWeather);
  const weatherIcon = getWeatherIcon(mostFrequentWeather);

  // Get the next 7 forecast entries (3-hour intervals)
  const hourlyForecast = forecastData.list.slice(0, 7).map(forecast => ({
    time: formatTime(forecast.dt),
    temp: `${Math.round(forecast.main.temp)}°C`,
    icon: getWeatherIcon(forecast.weather[0].main),
    description: forecast.weather[0].description,
    feels_like: Math.round(forecast.main.feels_like),
    humidity: forecast.main.humidity,
    wind_speed: Math.round(forecast.wind.speed * 3.6) // Convert m/s to km/h
  }));

  return (
    <div className={`${backgroundColor} text-center p-8 font-raleway text-blue-900 h-screen`}>
      {/* Current Weather */}
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
          <p><span className="font-semibold">Pressure</span> {weatherData.main.pressure} hPa</p>
          <p><span className="font-semibold">Wind</span> {Math.round(weatherData.wind.speed * 3.6)} km/h</p>
        </div>
        <p className="text-sm text-gray-200">
          Last updated: {new Date(weatherData.dt * 1000).toLocaleTimeString()}
        </p>
      </div>

      {/* Hourly Forecast */}
      <div className="grid grid-cols-7">
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="mb-1">{hour.time}</p>
            <img src={hour.icon} alt={`icon for ${hour.time}`} className="w-18 h-18" />
            <p className="mt-1">{hour.temp}</p>
            <p className="text-xs text-gray-200">Feels: {hour.feels_like}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherBody;

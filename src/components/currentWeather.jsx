/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';
import WeatherDetails from './WeatherDetails';
import HourlyForecast from'./Forecast';
export default function CurrentWeather({ data }) {
  const { city, list } = data;
  const [current , setCurrent] =useState( list[Math.floor(Math.random()*list.length)]);
  const [weather, setWeather] = useState(current.weather[Math.floor(Math.random()*current.weather.length)]);
 

  return (
   
    <>
     <div className="mb-8 w-full">
      <div className="flex justify-between items-center mb-4">
        {/* <h1 className="text-3xl font-bold">{city.name}</h1> */}
      </div>
      <img 
        src={getWeatherIcon(weather.id)} 
        alt={weather.main}
        className="w-35 h-35 mx-auto"
      />
      <p className="text-white mb-4 text-2xl capitalize font-bold">{weather.description}</p>
      <div className="flex flex-col items-center justify-center text-center h-full text-lg  font-bold">
  <WeatherDetails label="Temperature" value={`${(current.main.temp_min)}°C To ${(current.main.temp_max)}`} />

  <div className=" text-sm flex gap-6 mt-2 font-bold">
    <WeatherDetails  label="Humidity" value={`${current.main.humidity}%`} />
    <WeatherDetails label="Pressure" value={current.main.pressure} />
  </div>
</div>

    
    </div>
     <HourlyForecast forecast={list} /></>
    
  );
}
/* eslint-disable react/prop-types */
import { getWeatherIcon } from '../utils/weatherIcons';

export default function HourlyForecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className=" p-6 ">
     
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {forecast.sort(() => Math.random() - 0.5).slice(0, 7).map((item, index) => (
          <div key={index} className="text-center p-3  rounded-lg">
          <p className="font-medium">
  {new Date(item.dt * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })}
</p>
            <img 
              src={getWeatherIcon(item.weather[0].id)} 
              alt=""
              className="w-20 h-20 mx-auto my-1"
            />
            <p className="font-bold text-lg">
              {Math.round(item.main.temp)}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
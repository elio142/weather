import React from "react";
import partlycloudy from "/images/weather-icons/partlycloudy.svg";
import clear from "/images/weather-icons/clear.svg";

const WeatherBody = () => {
  const hourlyForecast = [
    { time: "03:00", temp: "8°C", icon: partlycloudy },
    { time: "06:00", temp: "9°C", icon: partlycloudy },
    { time: "09:00", temp: "14°C", icon: clear },
    { time: "12:00", temp: "17°C", icon: clear },
    { time: "15:00", temp: "18°C", icon: clear },
    { time: "18:00", temp: "16°C", icon: clear },
    { time: "21:00", temp: "13°C", icon: partlycloudy },
  ];

  return (
    <div className="bg-blue-300 text-center p-8 font-raleway text-blue-900">
      {/* Current Weather */}
      <div className="flex flex-col items-center mb-8">
        <img src={partlycloudy} alt="current weather" className="w-28 mb-4" />
        <p className="text-lg mb-1">overcast clouds</p>
        <p className="font-bold text-xl">
          Temperature <span className="font-normal ml-2">10° to 11°C</span>
        </p>
        <div className="flex gap-4 mt-2 text-sm">
          <p><span className="font-bold">Humidity</span> 78%</p>
          <p><span className="font-bold">Pressure</span> 1008.48</p>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="grid grid-cols-7 gap-4">
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="mb-1">{hour.time}</p>
            <img src={hour.icon} alt={`icon for ${hour.time}`} className="w-10 h-10" />
            <p className="mt-1">{hour.temp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherBody;

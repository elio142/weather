export const getWeatherIcon = (id) => {
    if (id < 300) return '/images/weather-icons/storm.svg';
    if (id >= 300 && id <= 499) return '/images/weather-icons/drizzle.svg';
    if (id >= 500 && id <= 599) return '/images/weather-icons/rain.svg';
    if (id >= 600 && id <= 699) return '/images/weather-icons/snow.svg';
    if (id >= 700 && id <= 799) return '/images/weather-icons/fog.svg';
    if (id === 800) return '/images/weather-icons/clear.svg';
    if (id === 801) return '/images/weather-icons/partlycloudy.svg';
    if (id > 801 && id <= 805) return '/images/weather-icons/mostlycloudy.svg';
    return '/images/weather-icons/default.svg'; // fallback
  };
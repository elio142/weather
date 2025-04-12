import React from 'react';

function Header() {
  return (
    <header className="w-full h-[120px] bg-[#0D47A1] flex justify-center items-center">
      {/* Centered container with fixed width matching the screenshot */}
      <div className="w-[800px] flex justify-between items-center">
        {/* Optional title or logo section */}
        <div className="text-white text-2xl font-bold">Weather App</div>
        
        {/* Search input and button container */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type in a city name"
            className="bg-transparent border-b-2 border-white text-white placeholder-white px-3 py-1 mr-4 focus:outline-none"
          />
          <button className="bg-[#1565C0] text-white font-semibold px-4 py-2 hover:bg-[#0D47A1] transition-colors duration-300">
            FIND WEATHER
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

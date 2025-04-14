import React, { useState } from "react";

const Header = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <div className='bg-[#9CCEF4] font-raleway fixed top-0 right-0 left-0'>
      <div className='w-full mx-auto bg-[#759EDA] shadow-sm p-6'>
        <div className='flex mb-0'>
          <input
            type="text"
            placeholder="Type in a city name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className='text-white w-60 h-10 px-4 rounded-l-lg focus:outline-none focus:ring-0'
          />
          <button 
            onClick={handleSubmit}
            className='bg-[#5879C7] text-black px-5 py-2 h-10 mt-1 flex m-0 hover:bg-blue-600'
          >
            FIND WEATHER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

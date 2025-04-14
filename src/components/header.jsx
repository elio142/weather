import React from 'react';

function Header() {
  return (
    <div className='min-h-screen bg-[#9CCEF4] font-raleway'>
      <div className='w-full mx-auto bg-[#759EDA] shadow-sm p-6'>
        <div className='flex mb-0'>
          <input
            type="text"
            placeholder="Type in a city name"
            className='text-white w-60 h-10 px-4 rounded-l-lg focus:outline-none focus:ring-0'
          />
          <button className='bg-[#5879C7] text-black px-5 py-2 h-10 mt-1 flex m-0 hover:bg-blue-600'>
            FIND WEATHER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

/* eslint-disable react/prop-types */
export default function WeatherDetails({ label, value }) {
    return (
      <div className=" flex gap-6 p-3 rounded-lg">
        <p className="  text-[#030348]  ">{label}</p>
        <p className="font-normal font-bold italic">{value}</p>
      </div>
    );
  }
import React from "react";

export default function OtherCities() {
  const cities = [
    { name: "USA", temp: 14, high: 23, low: 10 },
    { name: "Dubai - UAE", temp: 27, high: 23, low: 10 },
    { name: "China Nuevo", temp: 16, high: 23, low: 10 },
    { name: "Canada", temp: 26, high: 23, low: 10 },
  ];

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-white">Other Cities</h2>
        <button className="text-slate-400 text-xs hover:text-slate-300">
          Show All
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {cities.map((city, index) => (
          <div
            key={index}
            className="bg-slate-900 bg-opacity-70 rounded-xl p-2 backdrop-blur-sm border border-slate-700/50 relative grid grid-cols-3 gap-2"
            style={{ background: "#0E1421" }}
          >
            {/* Left column - Main temperature and city name */}
            <div className="col-span-1 py-2">
              <div className="text-4xl font-light text-white mb-4">
                {city.temp}°
              </div>
              <div className="text-white text-xs font-medium">{city.name}</div>
            </div>

            <div className="col-span-1 flex  justify-center items-center gap-2 py-2">
              <div className="text-slate-400 text-xs">H{city.high}°</div>
              <div className="text-slate-400 text-xs">L{city.low}°</div>
            </div>

            <div className="col-span-1 relative py-2">
              <img
                src="/images/sun.png"
                alt="Weather icon"
                className="w-12 h-12 rounded-full object-cover absolute bottom-2 right-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

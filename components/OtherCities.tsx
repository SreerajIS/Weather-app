import React from 'react';

export default function OtherCities() {
  const cities = [
    { name: 'USA', temp: 14, high: 23, low: 10 },
    { name: 'Dubai - UAE', temp: 27, high: 23, low: 10 },
    { name: 'China Nuevo', temp: 16, high: 23, low: 10 },
    { name: 'Canada', temp: 26, high: 23, low: 10 }
  ];

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-white">Other Cities</h2>
        <button className="text-slate-400 text-xs hover:text-slate-300">Show All</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {cities.map((city, index) => (
          <div key={index} className="bg-slate-900 bg-opacity-70 rounded-xl p-3 backdrop-blur-sm border border-slate-700/50 relative" style={{background: "#0E1421"}}>
            <div className="mb-2">
              <div className="text-2xl font-light text-white mb-1">{city.temp}°</div>
              <div className="text-slate-400 text-xs">H{city.high}° L{city.low}°</div>
            </div>
            <div className="text-white text-xs font-medium mb-2">{city.name}</div>
            
            <div className="absolute bottom-2 right-2">
              <img 
                src="/images/sun.png" 
                alt="Weather icon" 
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
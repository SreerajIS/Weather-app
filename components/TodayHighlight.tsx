import React from "react";
import { Wind, Sun } from "lucide-react";

interface WeatherData {
  windSpeed: number;
  rainfall: number;
  humidity: number;
}

interface TodayHighlightProps {
  data: WeatherData;
}

export default function TodayHighlight({ data }: TodayHighlightProps) {
  return (
    <div className="h-auto py-3 w-full max-w-2xl mx-auto">
      <div 
        className="rounded-2xl p-4 backdrop-blur-sm border border-slate-700/30 w-full"
        style={{
          background: 'radial-gradient(circle at center, #162850  0%, #121A2D 100%)'
        }}
      >
        <h2 className="text-lg font-medium text-white mb-3">Today Highlight</h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900 bg-opacity-70 rounded-xl p-3 backdrop-blur-sm border border-slate-700/50" style={{background: "#0E1421"}}>
            <h3 className="text-white text-sm font-medium mb-3">Wind Status</h3>

            <div className="flex items-center justify-center mb-2">
              <img
                src="/images/wind-status.png"
                alt="Wind Status Chart"
                className="w-24 h-24 object-contain"
              />
            </div>

            <div className="text-center">
              <div className="text-xl font-bold text-white mb-1">
                {data.windSpeed} km/h
              </div>
            </div>
          </div>
          <div className="bg-slate-900 bg-opacity-70 rounded-xl p-3 backdrop-blur-sm border border-slate-700/50" style={{background: "#0E1421"}}>
            <h3 className="text-white text-sm font-medium mb-3">UV Index</h3>

            <div className="flex items-center justify-center mb-2">
              <img
                src="/images/uv-index.png"
                alt="UV Index Indicator"
                className="w-24 h-24 object-contain"
              />
            </div>

            <div className="text-center">
              <div className="text-xl font-bold text-white mb-1">6</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const sampleData = {
  windSpeed: 15,
  rainfall: 2.5,
  humidity: 68
};

function App() {
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <TodayHighlight data={sampleData} />
    </div>
  );
}
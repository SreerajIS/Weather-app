import React from "react";
import { Cloud, MapPin, Droplets, CloudRain } from "lucide-react";

interface WeatherData {
  temperature: number;
  location: string;
}

interface WeatherCardProps {
  data: WeatherData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const currentDate = new Date();
  const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const dateString = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="text-white px-4 py-1 rounded-2xl w-full h-full flex flex-col justify-between"
      style={{
        backgroundColor: "#0E1421",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className="px-4 py-2 rounded-full flex items-center space-x-2 "
            style={{ backgroundColor: "#742BEC" }}
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">{data.location}</span>
          </div>
          <Cloud className="h-6 w-6 text-slate-400" />
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 text-slate-300">
            <CloudRain className="h-4 w-4" />
            <span className="text-sm">Rain Chances</span>
          </div>
          <div className="text-6xl font-medium">26%</div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{dayName}</h1>
        <p className="text-slate-400 text-sm">{dateString}</p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-6xl font-medium mb-0">
            {data.temperature}°<span className="text-4xl">C</span>
          </div>
          <p className="text-slate-400 text-xs">
            High: {data.temperature + 1} Low: {data.temperature - 16}
          </p>
        </div>

        <div className="text-right">
          <div className="relative mb-0">
            <img
              src="/images/Cloud.png"
              alt="Weather icon"
              className="w-24 h-24"
            />
          </div>

          <div>
            <h3 className="text-2xl font-medium mb-0">Cloudy</h3>
            <p className="text-slate-400 text-xs">
              Feels Like {data.temperature}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
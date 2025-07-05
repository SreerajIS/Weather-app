import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Cloud, ChevronDown, Calendar, Droplets, Thermometer, Sprout } from 'lucide-react';

interface WeatherData {
  location: string;
  date: string;
  temperature: number;
  rainfall: number;
  humidity: number;
  windSpeed: number;
  temperatureHistory: Array<{ name: string; value: number }>;
  rainfallHistory: Array<{ name: string; value: number }>;
  soilTemperatureHistory: Array<{ name: string; value: number }>;
  soilMoistureHistory: Array<{ name: string; value: number }>;
}

interface WeatherChartProps {
  data: WeatherData;
}

type ChartType = 'temperature' | 'rainfall' | 'soilTemperature' | 'soilMoisture';

const chartConfigs = {
  temperature: {
    label: 'Temperature',
    icon: Thermometer,
    unit: '°C',
    color: '#eab308',
    dataKey: 'temperatureHistory' as keyof WeatherData,
    gradientId: 'temperatureGradient'
  },
  rainfall: {
    label: 'Rainfall',
    icon: Droplets,
    unit: 'mm',
    color: '#3b82f6',
    dataKey: 'rainfallHistory' as keyof WeatherData,
    gradientId: 'rainfallGradient'
  },
  soilTemperature: {
    label: 'Soil Temperature',
    icon: Thermometer,
    unit: '°C',
    color: '#f59e0b',
    dataKey: 'soilTemperatureHistory' as keyof WeatherData,
    gradientId: 'soilTempGradient'
  },
  soilMoisture: {
    label: 'Soil Moisture',
    icon: Sprout,
    unit: '%',
    color: '#10b981',
    dataKey: 'soilMoistureHistory' as keyof WeatherData,
    gradientId: 'soilMoistureGradient'
  }
};

export default function WeatherChart({ data }: WeatherChartProps) {
  const [selectedChart, setSelectedChart] = useState<ChartType>('temperature');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentConfig = chartConfigs[selectedChart];
  const currentData = data[currentConfig.dataKey] as Array<{ name: string; value: number }>;
  
  const currentValue = currentData && currentData.length > 0 ? currentData[currentData.length - 1].value : 0;
  const previousValue = currentData && currentData.length > 1 ? currentData[currentData.length - 2].value : currentValue;
  const percentageChange = previousValue !== 0 ? ((currentValue - previousValue) / previousValue * 100) : 0;
  const isPositive = percentageChange >= 0;
  
  const values = currentData?.map(item => item.value) || [];
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = (maxValue - minValue) * 0.2; 
  const yMin = Math.max(0, minValue - padding);
  const yMax = maxValue + padding;

  const IconComponent = currentConfig.icon;

  return (
    <div className="bg-slate-800 bg-opacity-60 rounded-2xl p-4 backdrop-blur-sm border border-slate-700/30 w-full h-full flex flex-col" style={{background: "#0E1421"}}>
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 bg-slate-700 bg-opacity-50 px-3 py-1.5 rounded-lg hover:bg-opacity-70 transition-colors"
          >
            <IconComponent className="h-4 w-4 text-slate-400" />
            <span className="text-white font-medium text-sm">{currentConfig.label}</span>
            <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-slate-800 bg-opacity-95 backdrop-blur-sm border border-slate-700/30 rounded-lg shadow-lg z-10 min-w-[180px]">
              {Object.entries(chartConfigs).map(([key, config]) => {
                const DropdownIcon = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedChart(key as ChartType);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-slate-700 hover:bg-opacity-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedChart === key ? 'bg-slate-700 bg-opacity-30' : ''
                    }`}
                  >
                    <DropdownIcon className="h-4 w-4 text-slate-400" />
                    <span className="text-white text-sm">{config.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2 bg-slate-700 bg-opacity-50 px-2 py-1 rounded-lg">
          <Calendar className="h-3 w-3 text-slate-400" />
          <span className="text-slate-300 text-xs">7 Days</span>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-end space-x-2">
          <span className="text-3xl font-light text-white">
            {Math.round(currentValue * 10) / 10}{currentConfig.unit}
          </span>
          <div className={`${isPositive ? 'bg-green-500' : 'bg-red-500'} bg-opacity-20 px-2 py-0.5 rounded ${isPositive ? 'text-green-400' : 'text-red-400'} text-xs font-medium mb-1`}>
            {Math.abs(percentageChange).toFixed(1)}% {isPositive ? '↗' : '↘'}
          </div>
        </div>
      </div>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={currentData} 
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={currentConfig.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={currentConfig.color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={currentConfig.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              tickMargin={5}
            />
            <YAxis 
              domain={[yMin, yMax]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              width={30}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={currentConfig.color}
              strokeWidth={2}
              fill={`url(#${currentConfig.gradientId})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export interface WeatherData {
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

function generateMockData(): WeatherData {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const generateRandomValues = (base: number, variance: number) => {
    return days.map(day => ({
      name: day,
      value: Math.round((base + (Math.random() - 0.5) * variance) * 10) / 10
    }));
  };

  return {
    location: "New York, USA",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    temperature: Math.round((20 + Math.random() * 15)),
    rainfall: Math.round(Math.random() * 10 * 10) / 10,
    humidity: Math.round((50 + Math.random() * 30)),
    windSpeed: Math.round((8 + Math.random() * 12) * 10) / 10,
    temperatureHistory: generateRandomValues(22, 8),
    rainfallHistory: generateRandomValues(3, 8),
    soilTemperatureHistory: generateRandomValues(18, 6),
    soilMoistureHistory: generateRandomValues(40, 20)
  };
}

export async function fetchWeatherData(): Promise<WeatherData> {
  try {
    return generateMockData();
  } catch (error) {
    console.warn('Weather API failed, using mock data:', error);
    return generateMockData();
  }
}
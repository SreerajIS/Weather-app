'use client';

import { useState, useEffect } from 'react';
import { fetchWeatherData, WeatherData } from '@/lib/weatherApi';

export function useWeatherData() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await fetchWeatherData();
      setData(weatherData);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather data error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Auto-refresh every hour (3600000ms)
    const interval = setInterval(loadData, 3600000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: loadData };
}
'use client';

import { useWeatherData } from '@/hooks/useWeatherData';
import WeatherHeader from '@/components/WeatherHeader';
import MainWeatherCard from '@/components/MainWeatherCard';
import TodayHighlight from '@/components/TodayHighlight';
import OtherCities from '@/components/OtherCities';
import WeatherChart from '@/components/TemperatureChart'; 
import LoadingSpinner from '@/components/LoadingSpinner';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { data, loading, error, refetch } = useWeatherData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-[#0C1834] to-[#060C1A]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-[#0C1834] to-[#060C1A]">
        <div className="text-center p-6 glass-card rounded-2xl">
          <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-white mb-2">
            Unable to load weather data
          </h2>
          <p className="text-slate-400 mb-3 text-sm">
            {error || 'An unexpected error occurred'}
          </p>
          <Button onClick={refetch} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-radial from-[#0C1834] to-[#060C1A]">
      <div className="w-full px-3 lg:px-4 pt-3 lg:pt-4">
        <WeatherHeader onRefresh={refetch} />
      </div>
      
      <div className="flex-1 flex flex-col px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 pb-3 lg:pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4 flex-1 h-full">
          <div className="lg:col-span-7 flex flex-col space-y-4 h-full">
            <div className="flex-1">
              <MainWeatherCard data={data} />
            </div>
            <div className="flex-1">
              <WeatherChart data={data} />
            </div>
          </div>
          
          <div className="lg:col-span-5 flex flex-col space-y-4 h-full">
            <div className="flex-1">
              <TodayHighlight data={data} />
            </div>
            <div className="flex-1">
              <OtherCities />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
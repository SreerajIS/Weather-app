'use client';

import { Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeatherHeaderProps {
  onRefresh: () => void;
}

export default function WeatherHeader({ onRefresh }: WeatherHeaderProps) {
  // Get current date
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="flex items-center justify-between py-3 px-2 sm:px-4 md:px-6 lg:px-8 w-full max-w-full overflow-hidden"> {/* Reduced mobile padding and added overflow control */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-6 flex-1 min-w-0"> {/* Reduced mobile spacing and added flex-1 */}
    
        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
          <img 
            src="/images/icon.png" 
            alt="Weather App" 
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-slate-700/50 flex-1 min-w-0 max-w-xs sm:max-w-sm"> {/* Added responsive max-width and flex-1 */}
          <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search City...." 
            className="bg-transparent text-white placeholder-slate-400 outline-none text-sm w-full min-w-0" /* Changed to w-full */
          />
        </div>
      </div>
         <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-sm rounded-full px-4 py-2 flex-shrink-0">
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
          <Calendar className="h-4 w-4 text-white" />
        </div>
        <span className="text-white text-sm font-medium">{currentDate}</span>
      </div>

    </div>
  );
}
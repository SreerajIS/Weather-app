'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center glass-card rounded-2xl p-8">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-400" />
        <p className="text-slate-300 text-lg">Loading weather data...</p>
      </div>
    </div>
  );
}
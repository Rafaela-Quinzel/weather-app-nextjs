'use client';

import { useState } from 'react';
import { SearchCity } from '@/components/SearchCity';
import { WeatherCard } from '@/components/WeatherCard';
import { getCurrentWeather } from '@/services/weather';
import { WeatherResponse } from '@/types/weather';

export default function Home() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState('');

  async function handleSearch(city: string) {
    try {
      setError('');
      const data = await getCurrentWeather(city);
      setWeather(data);
    } catch {
      setWeather(null);
      setError('Cidade não encontrada');
    }
  }

  return (
    <main className="
      min-h-screen
      bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600
      flex flex-col items-center
      px-4 py-10
      text-white
    ">
      {/* Header */}
      <header className="mb-10 text-center space-y-1">
        <h1 className="text-3xl font-semibold">Clima</h1>
        <p className="text-sm opacity-80">
          quarta-feira, 7 de janeiro · 12:27
        </p>
      </header>

      {/* Search */}
      <SearchCity onSearch={handleSearch} />

      {/* Error */}
      {error && (
        <p className="mt-4 text-sm text-red-200">
          {error}
        </p>
      )}

      {/* Weather */}
      {weather && (
        <div className="mt-10">
          <WeatherCard weather={weather} />
        </div>
      )}
    </main>
  );
}
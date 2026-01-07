'use client';

import { useState } from 'react';
import { SearchCity } from '@/components/SearchCity';
import { getCurrentWeather } from '@/services/weather';
import { WeatherResponse } from '@/types/weather';
import { WeatherCard } from '@/components/WeatherCard';

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
    <main className="min-h-screen bg-gray-100 flex flex-col items-center gap-8 p-10">
      <h1 className="text-3xl font-bold">🌤️ Weather App</h1>

      <SearchCity onSearch={handleSearch} />

      {error && <p className="text-red-500">{error}</p>}

      {weather && <WeatherCard weather={weather} />}
    </main>
  );
}
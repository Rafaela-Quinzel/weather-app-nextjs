'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CloudOff } from 'lucide-react';

import { SearchCity } from '@/components/SearchCity';
import { WeatherCard } from '@/components/WeatherCard';
import { WeatherDetails } from '@/components/WeatherDetails';
import { Forecast } from '@/components/Forecast';

import { getCurrentWeather, getCurrentWeatherByCoords, getForecast, getForecastByCoords } from '@/services/weather';
import { ForecastResponse, WeatherResponse } from '@/types/weather';
import { getUserLocation } from '@/utils/geolocation';
import { isDaytime } from '@/utils/isDaytime';

export default function Home() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualiza hora
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function loadDefaultWeather() {
      setIsLoading(true);
      setError('');

      try {
        // 1️⃣ Tenta localização do usuário
        const position = await getUserLocation();
        const { latitude, longitude } = position.coords;

        const weatherData = await getCurrentWeatherByCoords(latitude, longitude);
        const forecastData = await getForecastByCoords(latitude, longitude);

        setWeather(weatherData);
        setForecast(forecastData);
      } catch {
        // 2️⃣ Fallback se negar permissão ou falhar
        try {
          const weatherData = await getCurrentWeather('São Paulo');
          const forecastData = await getForecast('São Paulo');

          setWeather(weatherData);
          setForecast(forecastData);
        } catch {
          setError('Não foi possível carregar o clima inicial.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadDefaultWeather();
}, []);

  async function handleSearch(city: string) {
    setIsLoading(true);
    setError('');

    try {
      const weatherData = await getCurrentWeather(city);
      const forecastData = await getForecast(city);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch {
      setWeather(null);
      setForecast(null);
      setError('Não foi possível encontrar dados para esta cidade.');
    } finally {
      setIsLoading(false);
    }
  }

  function getBackgroundGradient() {
    if (!weather) return 'from-blue-400 via-blue-500 to-indigo-600';

    const now = Date.now() / 1000 + weather.timezone;
    const { sunrise, sunset } = weather.sys;

    if (now >= sunrise - 1800 && now < sunrise + 1800) {
      return 'from-orange-400 via-rose-500 to-purple-600'; // amanhecer
    }

    if (now >= sunset - 1800 && now < sunset + 1800) {
      return 'from-orange-500 via-pink-500 to-purple-700'; // pôr do sol
    }

    return now >= sunrise && now < sunset
      ? 'from-sky-400 via-blue-500 to-indigo-600'
      : 'from-slate-900 via-indigo-900 to-black';
  }

  return (
    <main
    className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 text-white`}
    >
      <div className="relative z-10 flex flex-col items-center px-4 py-10">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center space-y-2"
        >
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">
            Clima
          </h1>

          <p className="text-white/60 font-light text-sm">
            {currentTime.toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
            <span className="mx-2">•</span>
            {currentTime.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </motion.header>

        {/* Search */}
        <SearchCity onSearch={handleSearch} isLoading={isLoading} />

        {/* Content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Loader2 className="w-12 h-12 animate-spin text-white/50 mb-4" />
              <p className="text-white/50 font-light">
                Buscando dados do clima...
              </p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <CloudOff className="w-16 h-16 text-white/30 mb-4" />
              <p className="text-white/60 text-center max-w-md font-light">
                {error}
              </p>
            </motion.div>
          ) : weather ? (
            <motion.div
              key="weather"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center"
            >
              <div className="mt-10 w-full max-w-md rounded-3xl bg-white/15 backdrop-blur p-8">
                <WeatherCard weather={weather} />

                <WeatherDetails
                  weather={{
                    feelsLike: Math.round(weather.main.feels_like),
                    humidity: weather.main.humidity,
                    windSpeed: weather.wind.speed,
                    visibility: weather.visibility / 1000,
                    pressure: weather.main.pressure,
                    sunrise: weather.sys.sunrise,
                    sunset: weather.sys.sunset,
                  }}
                />
              </div>

              {forecast && <Forecast forecast={forecast} />}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-16 pb-8"
      >
        <p className="text-white/30 text-sm font-light">
          Dados em tempo real • Atualizado automaticamente
        </p>
      </motion.footer>
    </main>
  );
}
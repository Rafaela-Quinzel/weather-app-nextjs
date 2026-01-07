import { WeatherResponse } from '@/types/weather';
import { Wind, Droplets, Thermometer } from 'lucide-react';
import { getWeatherIcon } from '@/utils/weatherIcons';
import { isDaytime } from '@/utils/isDaytime';

interface WeatherCardProps {
  weather: WeatherResponse;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const isDay = isDaytime(
    weather.dt,
    weather.sys.sunrise,
    weather.sys.sunset,
    weather.timezone
  );

  const WeatherIcon = getWeatherIcon(
    weather.weather[0].main,
    isDay
  );

  return (
    <section className="flex flex-col items-center text-white space-y-4">
      {/* Icon */}
      <WeatherIcon
        className={`
          h-16 w-16
          ${isDay ? 'text-yellow-300' : 'text-indigo-200'}
        `}
        strokeWidth={1.5}
      />

      {/* City */}
      <p className="text-sm opacity-80">
        {weather.name}
      </p>

      {/* Temperature */}
      <p className="text-7xl font-light">
        {Math.round(weather.main.temp)}°
      </p>

      {/* Description */}
      <p className="capitalize opacity-80">
        {weather.weather[0].description}
      </p>

      {/* Extra info */}
      <div className="mt-2 flex gap-6 text-xs opacity-80">
        <div className="flex items-center gap-1">
          <Thermometer size={14} />
          <span>Sensação {Math.round(weather.main.feels_like)}°</span>
        </div>

        <div className="flex items-center gap-1">
          <Droplets size={14} />
          <span>{weather.main.humidity}%</span>
        </div>

        <div className="flex items-center gap-1">
          <Wind size={14} />
          <span>{weather.wind.speed} km/h</span>
        </div>
      </div>
    </section>
  );
}
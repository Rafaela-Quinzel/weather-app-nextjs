import { WeatherResponse } from '@/types/weather';

interface WeatherCardProps {
  weather: WeatherResponse;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="
  w-full max-w-md
  rounded-2xl
  bg-white/15
  backdrop-blur
  p-6
  text-center
">
      <h2 className="text-xl font-semibold">{weather.name}</h2>

      <p className="mt-1 capitalize opacity-80">
        {Math.round(weather.main.temp)}°C
      </p>

      <p className="mt-1 text-gray-500 capitalize">
        {weather.weather[0].description}
      </p>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>
          Min: {Math.round(weather.main.temp_min)}°C
        </span>
        <span>
          Max: {Math.round(weather.main.temp_max)}°C
        </span>
      </div>
    </div>
  );
}
import { WeatherResponse } from '@/types/weather';
import { Wind, Droplets, Thermometer } from 'lucide-react';
//import { getWeatherIcon } from '@/utils/weatherIcons';
import type { WeatherCondition } from '@/utils/weatherIcons';
import { Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from 'lucide-react';
import { isDaytime } from '@/utils/isDaytime';

interface WeatherCardProps {
  weather: WeatherResponse;
}

const weatherIconMap: Record<WeatherCondition, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Drizzle: CloudRain,
  Thunderstorm: CloudLightning,
  Snow: CloudSnow,
  Mist: CloudFog,
  Fog: CloudFog,
  Haze: CloudFog,
};

export function WeatherCard({ weather }: WeatherCardProps) {
  const isDay = isDaytime(
    weather.sys.sunrise,
    weather.sys.sunset,
    weather.timezone
  );
  const condition = weather.weather[0].main as WeatherCondition;
  const IconComponent = weatherIconMap[condition] || (isDay ? Sun : Moon);
  return (
    <section className="w-full max-w-6xl flex flex-col items-center text-white space-y-4 mt-10">
      {/* Icon */}
      <IconComponent
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
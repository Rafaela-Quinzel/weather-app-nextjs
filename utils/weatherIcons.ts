import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
} from 'lucide-react';

export type WeatherCondition =
  | 'Clear'
  | 'Clouds'
  | 'Rain'
  | 'Drizzle'
  | 'Thunderstorm'
  | 'Snow'
  | 'Mist'
  | 'Fog'
  | 'Haze';

export function getWeatherIcon(
  condition: WeatherCondition,
  isDay: boolean
) {
  switch (condition) {
    case 'Clear':
      return isDay ? Sun : Moon;

    case 'Clouds':
      return Cloud;

    case 'Rain':
    case 'Drizzle':
      return CloudRain;

    case 'Thunderstorm':
      return CloudLightning;

    case 'Snow':
      return CloudSnow;

    case 'Mist':
    case 'Fog':
    case 'Haze':
      return CloudFog;

    default:
      return isDay ? Sun : Moon;
  }
}
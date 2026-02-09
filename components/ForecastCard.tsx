'use client';

import { ForecastItem } from '@/types/weather';
import { motion } from 'framer-motion';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
} from 'lucide-react';

interface ForecastCardProps {
  day: ForecastItem;
  index: number;
}

const weatherIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Drizzle: CloudRain,
  Snow: CloudSnow,
  Thunderstorm: CloudLightning,
  Mist: CloudFog,
  Fog: CloudFog,
  Haze: CloudFog,
};

function getDayName(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString('pt-BR', {
    weekday: 'short',
  });
}

export function ForecastCard({ day, index }: ForecastCardProps) {
  const condition = day.weather[0].main;
  const description = day.weather[0].description;
  const WeatherIcon = weatherIcons[condition] || Sun;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ scale: 1.05, y: -6 }}
      className="
        bg-white/10 backdrop-blur-xl
        rounded-3xl p-6
        border border-white/10
        hover:bg-white/20
        transition-all duration-300
        cursor-pointer group
        text-center
      "
    >
      <p className="text-white/50 text-sm font-medium mb-4 uppercase tracking-wider">
        {getDayName(day.dt)}
      </p>

      <motion.div
        className="flex justify-center mb-4"
        whileHover={{ rotate: 10 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <WeatherIcon
          className="w-12 h-12 text-white/80 group-hover:text-white transition-colors"
          strokeWidth={1.5}
        />
      </motion.div>

      <div className="text-center">
        <span className="text-2xl font-light text-white">
          {Math.round(day.main.temp_max)}°
        </span>
        <span className="text-white/40 mx-2">/</span>
        <span className="text-lg text-white/50">
          {Math.round(day.main.temp_min)}°
        </span>
      </div>

      <p className="text-white/40 text-xs text-center mt-3 capitalize">
        {description}
      </p>
    </motion.div>
  );
}
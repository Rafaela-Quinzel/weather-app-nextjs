'use client';

import { motion } from 'framer-motion';
import {
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Thermometer,
} from 'lucide-react';

interface WeatherDetailsProps {
  weather: {
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
    pressure: number;
    sunrise: string;
    sunset: string;
  };
}

const DetailCard = ({
  icon: Icon,
  label,
  value,
  delay,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="
      bg-white/20
      backdrop-blur-xl
      rounded-2xl
      p-4
      text-center
      border border-white/10
    "
  >
    <Icon className="mx-auto mb-2 w-5 h-5 text-white/70" />
    <p className="text-sm text-white/50">{label}</p>
    <p className="text-lg font-medium text-white mt-1">{value}</p>
  </motion.div>
);

export function WeatherDetails({ weather }: WeatherDetailsProps) {
  if (!weather) return null;

    function formatTime(timestamp: number) {
        return new Date(timestamp * 1000).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

  const details = [
    { icon: Thermometer, label: 'Sensação', value: `${weather.feelsLike}°C`, delay: 0.1 },
    { icon: Droplets, label: 'Umidade', value: `${weather.humidity}%`, delay: 0.15 },
    { icon: Wind, label: 'Vento', value: `${weather.windSpeed} km/h`, delay: 0.2 },
    { icon: Eye, label: 'Visibilidade', value: `${weather.visibility} km`, delay: 0.25 },
    { icon: Gauge, label: 'Pressão', value: `${weather.pressure} hPa`, delay: 0.3 },
    { icon: Sunrise, label: 'Nascer do Sol', value: formatTime(Number(weather.sunrise)), delay: 0.35 },
    { icon: Sunset, label: 'Pôr do Sol', value: formatTime(Number(weather.sunset)), delay: 0.4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mt-8"
    >
      <h3 className="mb-4 text-xs uppercase tracking-wider text-white/50">
        Detalhes do clima
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {details.map((detail, index) => (
          <DetailCard
            key={detail.label}
            {...detail}
            delay={0.05 * index}
          />
        ))}
      </div>
    </motion.div>
  );
}
'use client';

import { ForecastResponse } from '@/types/weather';
import { motion } from 'framer-motion';
import { ForecastCard } from './ForecastCard';


interface ForecastProps {
  forecast: ForecastResponse;
}

function getDailyForecast(list: ForecastResponse['list']) {
  // pega 1 item por dia (a cada 24h ≈ 8 registros)
  return list.filter((_, index) => index % 8 === 0).slice(0, 7);
}

export function Forecast({ forecast }: ForecastProps) {
  if (!forecast || forecast.list.length === 0) return null;

  const days = getDailyForecast(forecast.list);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-14 w-full max-w-6xl"
    >
      <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider mb-5 px-1">
        Previsão para os próximos dias
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {days.map((day, index) => (
          <ForecastCard key={day.dt} day={day} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
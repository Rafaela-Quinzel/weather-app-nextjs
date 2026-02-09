'use client';

import { ForecastResponse } from '@/types/weather';
import { motion } from 'framer-motion';
import { ForecastCard } from './ForecastCard';


interface ForecastProps {
  forecast: ForecastResponse;
}

// Agrupa por data e pega o registro mais próximo do meio-dia para cada dia
function getDailyForecast(list: ForecastResponse['list']) {
  if (!list || list.length === 0) return [];

  // Agrupa por data (ano-mês-dia)
  const grouped: { [date: string]: typeof list } = {};
  list.forEach(item => {
    const date = new Date(item.dt * 1000);
    date.setHours(0, 0, 0, 0);
    const key = date.toISOString().slice(0, 10); // yyyy-mm-dd
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  // Seleciona o registro mais próximo do meio-dia para cada dia
  const daily = Object.entries(grouped).map(([_, items]) => {
    return items.reduce((prev, curr) => {
      const prevHour = Math.abs(new Date(prev.dt * 1000).getHours() - 12);
      const currHour = Math.abs(new Date(curr.dt * 1000).getHours() - 12);
      return currHour < prevHour ? curr : prev;
    });
  });

  // Ordena por data
  daily.sort((a, b) => a.dt - b.dt);

  // Limita a 6 dias (segunda a sábado, por exemplo)
  return daily.slice(0, 6);
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
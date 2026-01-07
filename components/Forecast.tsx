import { ForecastResponse } from '@/types/weather';
import { Sun } from 'lucide-react';

interface ForecastProps {
  forecast: ForecastResponse;
}

function getDayLabel(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString('pt-BR', {
    weekday: 'long',
  });
}

export function Forecast({ forecast }: ForecastProps) {
  const dailyForecast = forecast.list.filter((_, index) => index % 8 === 0);

  return (
    <section className="mt-12 w-full max-w-5xl">
      <h3 className="mb-4 text-xs uppercase tracking-widest opacity-70 text-white">
        Previsão para os próximos dias
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {dailyForecast.map((day) => (
          <div
            key={day.dt}
            className="min-w-[140px] rounded-2xl bg-white/15 backdrop-blur p-4 text-center text-white"
          >
            <p className="text-xs opacity-70 capitalize">
              {getDayLabel(day.dt)}
            </p>

            <Sun className="mx-auto my-3 h-6 w-6 opacity-90" />

            <p className="text-sm font-semibold">
              {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
            </p>

            <p className="mt-1 text-xs capitalize opacity-70">
              {day.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
import {
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Thermometer
} from 'lucide-react';
import { WeatherResponse } from '@/types/weather';

interface WeatherDetailsProps {
  weather: WeatherResponse;
}

function formatTime(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function WeatherDetails({ weather }: WeatherDetailsProps) {
  return (
    <section className="mt-10 w-full max-w-4xl">
      <h3 className="mb-4 text-xs uppercase tracking-widest opacity-70 text-white">
        Detalhes do clima
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DetailCard icon={<Thermometer />} label="Sensação" value={`${Math.round(weather.main.feels_like)}°C`} />
        <DetailCard icon={<Droplets />} label="Umidade" value={`${weather.main.humidity}%`} />
        <DetailCard icon={<Wind />} label="Vento" value={`${weather.wind.speed} km/h`} />
        <DetailCard icon={<Eye />} label="Visibilidade" value={`${weather.visibility / 1000} km`} />
        <DetailCard icon={<Gauge />} label="Pressão" value={`${weather.main.pressure} hPa`} />
        <DetailCard icon={<Sunrise />} label="Nascer do sol" value={formatTime(weather.sys.sunrise)} />
        <DetailCard icon={<Sunset />} label="Pôr do sol" value={formatTime(weather.sys.sunset)} />
      </div>
    </section>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/15 backdrop-blur p-4 text-white">
      <div className="flex items-center gap-2 opacity-80">
        {icon}
        <span className="text-xs uppercase">{label}</span>
      </div>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  );
}
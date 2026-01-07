import { WeatherResponse } from '@/types/weather';

const API_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(
  city: string
): Promise<WeatherResponse> {
  const response = await fetch(
    `${API_URL}/weather?q=${city}&units=metric&lang=pt_br&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Cidade não encontrada');
  }

  return response.json();
}
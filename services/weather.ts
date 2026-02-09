const API_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(city: string) {
  const response = await fetch(
    `${API_URL}/weather?q=${city}&units=metric&lang=pt_br&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  );

  const data = await response.json();

  console.log('CURRENT WEATHER RESPONSE:', data);

  if (!response.ok) {
    throw new Error('Erro ao buscar clima');
  }

  return data;
}

export async function getCurrentWeatherByCoords(
  lat: number,
  lon: number
) {
  const response = await fetch(
    `${API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  );

  const data = await response.json();

  console.log('CURRENT WEATHER BY COORDS:', data);

  if (!response.ok) {
    throw new Error('Erro ao buscar clima por localização');
  }

  return data;
}

export async function getForecastByCoords(
  lat: number,
  lon: number
) {
  const response = await fetch(
    `${API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  );

  const data = await response.json();

  console.log('FORECAST BY COORDS:', data);

  if (!response.ok) {
    throw new Error('Erro ao buscar previsão por localização');
  }

  return data;
}

export async function getForecast(city: string) {
  const response = await fetch(
    `${API_URL}/forecast?q=${city}&units=metric&lang=pt_br&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  );

  const data = await response.json();

  console.log('FORECAST RESPONSE:', data);

  if (!response.ok) {
    throw new Error('Erro ao buscar previsão');
  }

  return data;
}
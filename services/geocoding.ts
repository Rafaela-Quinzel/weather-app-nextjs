const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';

export async function searchCities(query: string) {
  if (query.length < 3) return [];

  const response = await fetch(
    `${GEO_URL}?q=${query}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar cidades');
  }

  return response.json();
}
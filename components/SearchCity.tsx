'use client';

import { useState } from 'react';

interface SearchCityProps {
  onSearch: (city: string) => void;
}

export function SearchCity({ onSearch }: SearchCityProps) {
  const [city, setCity] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!city.trim()) return;

    onSearch(city);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md gap-2"
    >
      <input
        type="text"
        placeholder="Digite a cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white
                   hover:bg-blue-700 transition"
      >
        Buscar
      </button>
    </form>
  );
}
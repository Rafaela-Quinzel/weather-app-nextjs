'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchCityProps {
  onSearch: (city: string) => void;
}

export function SearchCity({ onSearch }: SearchCityProps) {
  const [city, setCity] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!city.trim()) return;

    onSearch(city.trim());
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative flex items-center">
        {/* Ícone esquerda */}
        <div className="absolute left-4 text-white/60">
          <MapPin className="w-5 h-5" />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Buscar cidade..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="
            w-full
            pl-12 pr-14 py-5
            bg-white/10 backdrop-blur-xl
            border border-white/20
            text-white placeholder:text-white/50
            rounded-2xl text-base
            focus:outline-none focus:ring-2 focus:ring-white/30
            transition-all duration-300
          "
        />

        {/* Botão */}
        <button
          type="submit"
          className="
            absolute right-2
            bg-white/20 hover:bg-white/30
            backdrop-blur-sm
            text-white
            rounded-xl
            p-2.5
            transition-all duration-300
          "
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </motion.form>
  );
}
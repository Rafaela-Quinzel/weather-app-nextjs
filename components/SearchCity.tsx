'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { searchCities } from '@/services/geocoding';
import { CitySuggestion } from '@/types/geocoding';

interface SearchCityProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export function SearchCity({ onSearch, isLoading }: SearchCityProps) {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);

  const containerRef = useRef<HTMLFormElement>(null);

  // Debounce da busca
  useEffect(() => {
    if (city.length < 3) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const results = await searchCities(city);
        setSuggestions(results);
      } catch {
        setSuggestions([]);
      } finally {
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [city]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
            ) {
            setSuggestions([]);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!city.trim()) return;

    setSuggestions([]);
    onSearch(city.trim());
  }

  function handleSelectCity(citySelected: CitySuggestion) {
    const label = citySelected.state
      ? `${citySelected.name}, ${citySelected.state}`
      : `${citySelected.name}, ${citySelected.country}`;

    setCity(label);
    setSuggestions([]);
    onSearch(citySelected.name);
  }

  return (
    <motion.form
        ref={containerRef}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto relative"
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
          disabled={isLoading}
          className="
            absolute right-2
            bg-white/20 hover:bg-white/30
            backdrop-blur-sm
            text-white
            rounded-xl
            p-2.5
            transition-all duration-300
            disabled:opacity-50
          "
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="
              absolute z-20 mt-2 w-full
              rounded-2xl
              bg-white/90 text-black
              backdrop-blur
              shadow-xl
              overflow-hidden
            "
          >
            {suggestions.map((item, index) => (
              <li
                key={`${item.lat}-${item.lon}-${index}`}
                onClick={() => handleSelectCity(item)}
                className="
                  px-4 py-3
                  cursor-pointer
                  text-sm
                  hover:bg-black/5
                  transition-colors
                "
              >
                <span className="font-medium">{item.name}</span>
                {item.state && `, ${item.state}`} — {item.country}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
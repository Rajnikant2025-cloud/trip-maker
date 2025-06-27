// src/components/SidebarFilters.tsx
import { useState } from 'react';
import Slider from '@mui/material/Slider';

interface ThemeFilters {
  Beach: boolean;
  Adventure: boolean;
  Luxury: boolean;
  Romance: boolean;
}

export interface Filters {
  search: string;
  priceRange: [number, number];
  duration: string;
  themes: ThemeFilters;
}

interface SidebarFiltersProps {
  onFiltersChange: (filters: Filters) => void;
  minPrice?: number;
  maxPrice?: number;
}

const SidebarFilters = ({ 
  onFiltersChange, 
  minPrice = 500, 
  maxPrice = 5000 
}: SidebarFiltersProps) => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    priceRange: [minPrice, maxPrice],
    duration: '',
    themes: {
      Beach: false,
      Adventure: false,
      Luxury: false,
      Romance: false
    }
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {...filters, search: e.target.value};
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const newFilters = {...filters, priceRange: newValue as [number, number]};
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {...filters, duration: e.target.value};
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleThemeChange = (theme: keyof ThemeFilters) => {
    const newThemes = {
      ...filters.themes,
      [theme]: !filters.themes[theme]
    };
    const newFilters = {...filters, themes: newThemes};
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters: Filters = {
      search: '',
      priceRange: [minPrice, maxPrice],
      duration: '',
      themes: {
        Beach: false,
        Adventure: false,
        Luxury: false,
        Romance: false
      }
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <aside className="w-full p-4 bg-white rounded shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Search</label>
        <input 
          type="text" 
          placeholder="Search destinations..." 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Price Range (₹)</label>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          min={minPrice}
          max={maxPrice}
          step={1000}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹{filters.priceRange[0].toLocaleString()}</span>
          <span>₹{filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Duration</label>
        <select 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={filters.duration}
          onChange={handleDurationChange}
        >
          <option value="">Select duration</option>
          <option value="1-3">1-3 Days</option>
          <option value="4-7">4-7 Days</option>
          <option value="7+">7+ Days</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Themes</label>
        {(Object.keys(filters.themes) as Array<keyof ThemeFilters>).map((theme) => (
          <div key={theme} className="flex items-center space-x-2 mb-2">
            <input 
              type="checkbox" 
              id={theme}
              checked={filters.themes[theme]}
              onChange={() => handleThemeChange(theme)}
              className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <label htmlFor={theme} className="text-sm text-gray-700 select-none">
              {theme}
            </label>
          </div>
        ))}
      </div>

      <button 
        className="w-full bg-gray-700 text-white py-2 rounded mt-4 hover:bg-gray-800 transition-colors"
        onClick={clearFilters}
      >
        Clear All Filters
      </button>
    </aside>
  );
};

export default SidebarFilters;
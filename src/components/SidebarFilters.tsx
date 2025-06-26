// components/SidebarFilters.tsx
import { useState } from 'react';
import Slider from '@mui/material/Slider';

const SidebarFilters = () => {
  // State for all filter values
  const [filters, setFilters] = useState({
    search: '',
    priceRange: [500, 5000],
    duration: '',
    themes: {
      Beach: false,
      Adventure: false,
      Luxury: false,
      Romance: false
    }
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({...filters, search: e.target.value});
  };

  // Handle price range change
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setFilters({...filters, priceRange: newValue as number[]});
  };

  // Handle duration change
  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({...filters, duration: e.target.value});
  };

  // Handle theme checkbox change
  const handleThemeChange = (theme: string) => {
    setFilters({
      ...filters,
      themes: {
        ...filters.themes,
        [theme]: !filters.themes[theme as keyof typeof filters.themes]
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      priceRange: [500, 5000],
      duration: '',
      themes: {
        Beach: false,
        Adventure: false,
        Luxury: false,
        Romance: false
      }
    });
  };

  return (
    <aside className="w-full sm:w-64 p-4 bg-white rounded shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Search Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Search</label>
        <input 
          type="text" 
          placeholder="Search destinations..." 
          className="w-full p-2 border rounded"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Price Range</label>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          min={0}
          max={10000}
          step={100}
          valueLabelDisplay="auto"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Duration</label>
        <select 
          className="w-full p-2 border rounded"
          value={filters.duration}
          onChange={handleDurationChange}
        >
          <option value="">Select duration</option>
          <option value="1-3">1-3 Days</option>
          <option value="4-7">4-7 Days</option>
          <option value="7+">7+ Days</option>
        </select>
      </div>

      {/* Themes (checkboxes) */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Themes</label>
        {Object.keys(filters.themes).map((theme) => (
          <div key={theme} className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id={theme}
              checked={filters.themes[theme as keyof typeof filters.themes]}
              onChange={() => handleThemeChange(theme)}
            />
            <label htmlFor={theme}>{theme}</label>
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
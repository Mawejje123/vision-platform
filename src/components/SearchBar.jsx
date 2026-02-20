import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Call parent function to handle search
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Search className="text-gray-400" size={20} />
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search projects, creators, or tags..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
        />

        {/* Clear Button (shows when there's text) */}
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              if (onSearch) onSearch('');
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
import React, { useState } from 'react';
import { ArrowUpDown, TrendingUp, Clock, Eye, Heart } from 'lucide-react';

const SortOptions = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState('recent');

  const sortOptions = [
    {
      id: 'recent',
      label: 'Most Recent',
      icon: Clock,
      description: 'Newest first'
    },
    {
      id: 'popular',
      label: 'Most Popular',
      icon: Heart,
      description: 'Most liked'
    },
    {
      id: 'trending',
      label: 'Trending',
      icon: TrendingUp,
      description: 'Hot right now'
    },
    {
      id: 'viewed',
      label: 'Most Viewed',
      icon: Eye,
      description: 'Highest views'
    }
  ];

  const handleSortChange = (sortId) => {
    setSelectedSort(sortId);
    if (onSortChange) {
      onSortChange(sortId);
    }
  };

  const currentSort = sortOptions.find(option => option.id === selectedSort);
  const Icon = currentSort?.icon || ArrowUpDown;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {/* Sort Label */}
        <div className="flex items-center space-x-2 text-gray-400">
          <ArrowUpDown size={18} />
          <span className="text-sm font-medium">Sort by:</span>
        </div>

        {/* Sort Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          {sortOptions.map((option) => {
            const OptionIcon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => handleSortChange(option.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedSort === option.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-900 text-gray-300 border border-gray-800 hover:border-orange-500'
                }`}
              >
                <OptionIcon size={16} />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown - Mobile */}
        <div className="md:hidden">
          <select
            value={selectedSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-gray-900 border border-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 transition-colors"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Sort Description */}
      {currentSort && (
        <div className="mt-2 flex items-center space-x-2">
          <Icon size={14} className="text-orange-500" />
          <span className="text-xs text-gray-500">{currentSort.description}</span>
        </div>
      )}
    </div>
  );
};

export default SortOptions;
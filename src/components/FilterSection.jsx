import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

const FilterSection = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUniversity, setSelectedUniversity] = useState('All');
  const [selectedTags, setSelectedTags] = useState([]);

  // Categories list
  const categories = [
    'All',
    'Engineering',
    'Design',
    'Art',
    'Business',
    'FinTech',
    'Agriculture',
    'Health',
    'Education',
    'Music',
    'Other'
  ];

  // Universities list (shortened for now, you can add all 42)
  const universities = [
    'All',
    'Makerere University',
    'Kyambogo University',
    'Mbarara University',
    'Gulu University',
    'Busitema University',
    'Muni University',
    'Uganda Christian University',
    'Kampala International University',
    'Islamic University in Uganda',
    'Nkumba University'
  ];

  // Popular tags
  const availableTags = [
    'AI/ML',
    'IoT',
    'Mobile App',
    'Web Development',
    'Sustainability',
    'Innovation',
    'Blockchain',
    'Data Science',
    'Robotics',
    'VR/AR'
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    notifyParent({ category, university: selectedUniversity, tags: selectedTags });
  };

  const handleUniversityChange = (university) => {
    setSelectedUniversity(university);
    notifyParent({ category: selectedCategory, university, tags: selectedTags });
  };

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    notifyParent({ category: selectedCategory, university: selectedUniversity, tags: newTags });
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedUniversity('All');
    setSelectedTags([]);
    notifyParent({ category: 'All', university: 'All', tags: [] });
  };

  const notifyParent = (filters) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  // Count active filters
  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedUniversity !== 'All' ? 1 : 0) +
    selectedTags.length;

  return (
    <div className="mb-8">
      {/* Filter Toggle Button - Mobile/Desktop */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-gray-900 border border-gray-800 px-4 py-3 rounded-lg hover:border-orange-500 transition-colors"
        >
          <Filter size={20} className="text-orange-500" />
          <span className="text-white font-semibold">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Clear All Filters */}
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-white font-semibold mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* University Filter */}
          <div>
            <h3 className="text-white font-semibold mb-3">University</h3>
            <select
              value={selectedUniversity}
              onChange={(e) => handleUniversityChange(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
            >
              {universities.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Filter */}
          <div>
            <h3 className="text-white font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <X size={14} className="inline ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
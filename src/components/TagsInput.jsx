import React, { useState } from 'react';
import { Tag, X, Plus } from 'lucide-react';

const TagsInput = ({ formData, onChange, errors }) => {
  const [inputValue, setInputValue] = useState('');
  const selectedTags = formData.tags || [];

  // Suggested/Popular tags
  const suggestedTags = [
    'AI/ML',
    'IoT',
    'Mobile App',
    'Web Development',
    'Sustainability',
    'Innovation',
    'Blockchain',
    'Data Science',
    'Robotics',
    'VR/AR',
    'Cloud Computing',
    'Cybersecurity',
    'Big Data',
    'DevOps',
    'UI/UX',
    'Game Development',
    'E-commerce',
    'Social Impact',
    'Open Source',
    'API Development'
  ];

  const handleChange = (newTags) => {
    onChange({ ...formData, tags: newTags });
  };

  // Add tag from input
  const addTag = () => {
    const tag = inputValue.trim();
    
    // Validation
    if (!tag) return;
    
    if (selectedTags.length >= 10) {
      alert('Maximum 10 tags allowed');
      return;
    }
    
    if (selectedTags.includes(tag)) {
      alert('This tag is already added');
      setInputValue('');
      return;
    }
    
    if (tag.length > 20) {
      alert('Tag must be 20 characters or less');
      return;
    }

    // Add tag
    handleChange([...selectedTags, tag]);
    setInputValue('');
  };

  // Add tag on Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    handleChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  // Add suggested tag
  const addSuggestedTag = (tag) => {
    if (selectedTags.length >= 10) {
      alert('Maximum 10 tags allowed');
      return;
    }
    
    if (!selectedTags.includes(tag)) {
      handleChange([...selectedTags, tag]);
    }
  };

  // Filter suggested tags to only show unselected ones
  const availableSuggestions = suggestedTags.filter(
    tag => !selectedTags.includes(tag)
  );

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Tags</h2>
        <p className="text-gray-400">Help others discover your project</p>
      </div>

      {/* Tag Input */}
      <div>
        <label className="flex items-center space-x-2 text-white font-semibold mb-2">
          <Tag size={18} className="text-orange-500" />
          <span>Add Tags</span>
          <span className="text-gray-400 text-sm font-normal ml-2">
            ({selectedTags.length}/10)
          </span>
        </label>
        <p className="text-gray-500 text-sm mb-3">
          Add relevant keywords to help people find your project
        </p>

        {/* Input with Add Button */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a tag and press Enter"
            className={`flex-1 bg-gray-900 border ${
              errors.tags ? 'border-red-500' : 'border-gray-800'
            } text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500`}
            maxLength={20}
            disabled={selectedTags.length >= 10}
          />
          <button
            onClick={addTag}
            disabled={!inputValue.trim() || selectedTags.length >= 10}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
        {errors.tags && (
          <p className="text-red-500 text-sm mt-2">{errors.tags}</p>
        )}
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div>
          <p className="text-white font-semibold mb-3">Selected Tags</p>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag, index) => (
              <div
                key={index}
                className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 group"
              >
                <span className="font-medium">{tag}</span>
                <button
                  onClick={() => removeTag(tag)}
                  className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Tags */}
      {availableSuggestions.length > 0 && selectedTags.length < 10 && (
        <div>
          <p className="text-white font-semibold mb-3">Suggested Tags</p>
          <p className="text-gray-500 text-sm mb-3">
            Click to add popular tags
          </p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 15).map((tag, index) => (
              <button
                key={index}
                onClick={() => addSuggestedTag(tag)}
                className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full hover:bg-gray-700 transition-colors border border-gray-700 hover:border-orange-500"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Tag size={14} className="text-orange-500" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-1">Tips for good tags:</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Use specific technologies (e.g., "React", "Python", "TensorFlow")</li>
              <li>• Include your project's domain (e.g., "Agriculture", "FinTech")</li>
              <li>• Add implementation details (e.g., "IoT", "Mobile App", "API")</li>
              <li>• Keep tags concise and relevant (max 20 characters)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsInput;
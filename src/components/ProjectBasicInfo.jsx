import React from 'react';
import { Type, AlignLeft, Tag } from 'lucide-react';

const ProjectBasicInfo = ({ formData, onChange, errors }) => {
  const categories = [
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

  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  const descriptionLength = formData.description?.length || 0;
  const maxDescriptionLength = 500;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Project Information</h2>
        <p className="text-gray-400">Tell us about your project</p>
      </div>

      {/* Project Title */}
      <div>
        <label className="flex items-center space-x-2 text-white font-semibold mb-2">
          <Type size={18} className="text-orange-500" />
          <span>Project Title</span>
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g., AI-Powered Agricultural Monitoring System"
          className={`w-full bg-gray-900 border ${
            errors.title ? 'border-red-500' : 'border-gray-800'
          } text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500`}
          maxLength={100}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          {formData.title?.length || 0}/100 characters
        </p>
      </div>

      {/* Project Description */}
      <div>
        <label className="flex items-center space-x-2 text-white font-semibold mb-2">
          <AlignLeft size={18} className="text-orange-500" />
          <span>Description</span>
          <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe your project, what problem it solves, and how it works..."
          rows={6}
          className={`w-full bg-gray-900 border ${
            errors.description ? 'border-red-500' : 'border-gray-800'
          } text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500 resize-none`}
          maxLength={maxDescriptionLength}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
        <div className="flex justify-between items-center mt-1">
          <p className="text-gray-500 text-xs">
            Be specific about what makes your project unique
          </p>
          <p className={`text-xs ${
            descriptionLength > maxDescriptionLength * 0.9 
              ? 'text-orange-500' 
              : 'text-gray-500'
          }`}>
            {descriptionLength}/{maxDescriptionLength}
          </p>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="flex items-center space-x-2 text-white font-semibold mb-2">
          <Tag size={18} className="text-orange-500" />
          <span>Category</span>
          <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
          className={`w-full bg-gray-900 border ${
            errors.category ? 'border-red-500' : 'border-gray-800'
          } text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors`}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectBasicInfo;
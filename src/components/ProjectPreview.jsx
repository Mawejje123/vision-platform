import React from 'react';
import ProjectCard from './ProjectCard';
import { Eye } from 'lucide-react';

const ProjectPreview = ({ formData, currentUser }) => {
  // Create a preview project object from form data
  const previewProject = {
    id: 'preview',
    title: formData.title || 'Your Project Title',
    description: formData.description || 'Your project description will appear here. Add details about what your project does and how it works.',
    category: formData.category || 'Category',
    image: formData.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', // Default placeholder
    creator: {
      name: currentUser?.name || 'Your Name',
      avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      university: currentUser?.university || 'Your University'
    },
    stats: {
      likes: 0,
      views: 0
    },
    tags: formData.tags && formData.tags.length > 0 
      ? formData.tags 
      : ['Tag1', 'Tag2', 'Tag3'],
    date: new Date()
  };

  // Check if form has any data
  const hasData = formData.title || formData.description || formData.category || formData.image || (formData.tags && formData.tags.length > 0);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="sticky top-24 bg-black/95 backdrop-blur-sm py-4 z-10 border-b border-gray-800">
        <div className="flex items-center space-x-2 mb-2">
          <Eye size={20} className="text-orange-500" />
          <h2 className="text-2xl font-bold text-white">Live Preview</h2>
        </div>
        <p className="text-gray-400">See how your project will appear to others</p>
      </div>

      {/* Preview Card */}
      <div className="relative">
        {/* Preview Label */}
        {!hasData && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-xs font-semibold border border-gray-700">
              Preview Mode
            </span>
          </div>
        )}

        {/* Project Card Preview */}
        <ProjectCard project={previewProject} />

        {/* Empty State Overlay */}
        {!hasData && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-center px-6">
              <Eye size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-white font-semibold text-lg mb-2">
                Start filling in your project details
              </p>
              <p className="text-gray-400 text-sm">
                Your preview will appear here as you type
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preview Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Completeness Indicator */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
            <span>Completion Status</span>
          </h3>
          <div className="space-y-2">
            <CompletionItem 
              label="Title" 
              completed={!!formData.title} 
            />
            <CompletionItem 
              label="Description" 
              completed={!!formData.description} 
            />
            <CompletionItem 
              label="Category" 
              completed={!!formData.category} 
            />
            <CompletionItem 
              label="Cover Image" 
              completed={!!formData.image} 
            />
            <CompletionItem 
              label="Tags (optional)" 
              completed={formData.tags && formData.tags.length > 0}
              optional 
            />
          </div>
        </div>

        {/* Tips Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3">Make it stand out</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Use a high-quality cover image</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Write a clear, compelling description</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Add relevant tags to improve discovery</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Include demo links if available</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Additional Preview Details */}
      {(formData.demoLink || formData.videoLink || (formData.gallery && formData.gallery.length > 0)) && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3">Additional Media</h3>
          <div className="space-y-2 text-sm">
            {formData.demoLink && (
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-orange-500">✓</span>
                <span>Demo link added</span>
              </div>
            )}
            {formData.videoLink && (
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-orange-500">✓</span>
                <span>Video link added</span>
              </div>
            )}
            {formData.gallery && formData.gallery.length > 0 && (
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-orange-500">✓</span>
                <span>{formData.gallery.length} additional image(s)</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for completion checklist
const CompletionItem = ({ label, completed, optional }) => {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${completed ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </span>
      <div className="flex items-center space-x-2">
        {optional && !completed && (
          <span className="text-xs text-gray-600">Optional</span>
        )}
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
          completed 
            ? 'bg-orange-500 text-white' 
            : 'bg-gray-800 border border-gray-700'
        }`}>
          {completed && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
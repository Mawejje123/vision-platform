import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Grid, List, SortAsc, Plus } from 'lucide-react';

const UserProjectsGrid = ({ projects, isOwnProfile }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('recent');

  // Sort projects
  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'popular':
        return b.stats.likes - a.stats.likes;
      case 'views':
        return b.stats.views - a.stats.views;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Empty state - No projects
  if (!projects || projects.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Grid className="text-gray-600" size={32} />
            </div>
            <h3 className="text-white text-2xl font-bold mb-2">
              {isOwnProfile ? 'No projects yet' : 'No projects to display'}
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              {isOwnProfile 
                ? 'Start showcasing your work! Upload your first project and let the world see what you can do.'
                : 'This user hasn\'t uploaded any projects yet. Check back later!'
              }
            </p>
            {isOwnProfile && (
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all inline-flex items-center space-x-2">
                <Plus size={20} />
                <span>Upload Your First Project</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {isOwnProfile ? 'My Projects' : 'Projects'}
            </h2>
            <p className="text-gray-400 text-sm">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <SortAsc size={18} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-900 border border-gray-800 text-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="views">Most Viewed</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Upload Button (if own profile) */}
            {isOwnProfile && (
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all inline-flex items-center space-x-2">
                <Plus size={18} />
                <span className="hidden sm:inline">New Project</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-6'
      }>
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Add More Projects Button (if own profile and has projects) */}
      {isOwnProfile && projects.length > 0 && (
        <div className="mt-8 text-center">
          <button className="bg-gray-900 border border-gray-800 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:border-orange-500 hover:text-orange-500 transition-all inline-flex items-center space-x-2">
            <Plus size={18} />
            <span>Add Another Project</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProjectsGrid;
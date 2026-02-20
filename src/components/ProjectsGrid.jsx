import React from 'react';
import ProjectCard from './ProjectCard';
import { Loader, Search } from 'lucide-react';

const ProjectsGrid = ({ projects, isLoading }) => {
  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader className="text-orange-500 animate-spin mb-4" size={48} />
        <p className="text-gray-400 text-lg">Loading projects...</p>
      </div>
    );
  }

  // Empty State - No projects found
  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6">
          <Search className="text-gray-600" size={32} />
        </div>
        <h3 className="text-white text-2xl font-bold mb-2">No projects found</h3>
        <p className="text-gray-400 text-center max-w-md mb-6">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
        <button className="text-orange-500 hover:text-orange-400 font-semibold transition-colors">
          Clear all filters
        </button>
      </div>
    );
  }

  // Projects Grid
  return (
    <div>
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm">
          Showing <span className="text-white font-semibold">{projects.length}</span> projects
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
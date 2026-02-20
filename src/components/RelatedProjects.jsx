import React from 'react';
import ProjectCard from './ProjectCard';
import { ArrowRight } from 'lucide-react';

const RelatedProjects = ({ currentProject, allProjects = [] }) => {
  // Filter and find related projects
  const getRelatedProjects = () => {
    if (!currentProject || allProjects.length === 0) return [];

    // Filter out current project
    const otherProjects = allProjects.filter(p => p.id !== currentProject.id);

    // Score each project based on similarity
    const scoredProjects = otherProjects.map(project => {
      let score = 0;

      // Same category = +3 points
      if (project.category === currentProject.category) {
        score += 3;
      }

      // Same university = +2 points
      if (project.creator.university === currentProject.creator.university) {
        score += 2;
      }

      // Matching tags = +1 point per tag
      if (currentProject.tags && project.tags) {
        const matchingTags = currentProject.tags.filter(tag => 
          project.tags.includes(tag)
        );
        score += matchingTags.length;
      }

      return { ...project, score };
    });

    // Sort by score and return top 6
    return scoredProjects
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  };

  const relatedProjects = getRelatedProjects();

  // Don't render if no related projects
  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Related Projects</h2>
            <p className="text-gray-400">
              Explore similar innovations from other students
            </p>
          </div>
          
          {/* View All Link */}
          <a
            href="/discover"
            className="hidden sm:flex items-center space-x-2 text-orange-500 hover:text-orange-400 font-semibold transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={20} />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="sm:hidden mt-8 text-center">
          <a
            href="/discover"
            className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-400 font-semibold transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight size={20} />
          </a>
        </div>

        {/* Why These Projects Info */}
        {currentProject.category && (
          <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm text-center">
              Based on{' '}
              <span className="text-orange-500 font-semibold">{currentProject.category}</span>
              {currentProject.tags && currentProject.tags.length > 0 && (
                <>
                  {' '}and tags like{' '}
                  <span className="text-orange-500 font-semibold">
                    {currentProject.tags.slice(0, 2).join(', ')}
                  </span>
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProjects;
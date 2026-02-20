import React from 'react';
import { Calendar, Eye, Tag as TagIcon } from 'lucide-react';

const ProjectInfo = ({ project }) => {
  // Format date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content - Left Side (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Description Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">About This Project</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>
          </div>

          {/* Tags Section */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <TagIcon size={20} className="text-orange-500" />
                <span>Tags</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Problem & Solution (if available) */}
          {project.problem && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Problem Statement</h3>
              <p className="text-gray-300 leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Our Solution</h3>
              <p className="text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}

          {/* Technical Details (if available) */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-orange-500/10 text-orange-500 px-4 py-2 rounded-lg text-sm font-semibold border border-orange-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Right Side (1/3) */}
        <div className="space-y-6">
          
          {/* Project Info Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-24">
            <h3 className="text-lg font-bold text-white mb-4">Project Info</h3>
            
            <div className="space-y-4">
              {/* Category */}
              <div>
                <p className="text-gray-500 text-sm mb-1">Category</p>
                <p className="text-white font-semibold">{project.category}</p>
              </div>

              {/* Date Published */}
              <div>
                <p className="text-gray-500 text-sm mb-1 flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>Published</span>
                </p>
                <p className="text-white font-semibold">{formatDate(project.date || project.created_at)}</p>
              </div>

              {/* Views */}
              <div>
                <p className="text-gray-500 text-sm mb-1 flex items-center space-x-1">
                  <Eye size={14} />
                  <span>Views</span>
                </p>
                <p className="text-white font-semibold">{project.stats.views.toLocaleString()}</p>
              </div>

              {/* University */}
              <div>
                <p className="text-gray-500 text-sm mb-1">University</p>
                <p className="text-white font-semibold">{project.creator.university}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 my-6"></div>

            {/* Share Section */}
            <div>
              <p className="text-gray-500 text-sm mb-3">Share this project</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  Twitter
                </button>
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  LinkedIn
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Impact</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Likes</span>
                <span className="text-2xl font-bold">{project.stats.likes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Views</span>
                <span className="text-2xl font-bold">{project.stats.views}</span>
              </div>
              {project.stats.shares && (
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Shares</span>
                  <span className="text-2xl font-bold">{project.stats.shares}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
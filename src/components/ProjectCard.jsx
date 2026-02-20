import React, { useState } from 'react';
import { Heart, Eye, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
      {/* Project Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {project.category}
          </span>
        </div>

        {/* Like Button */}
        <button 
          onClick={handleLike}
          className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all"
        >
          <Heart 
            className={`${isLiked ? 'fill-orange-500 text-orange-500' : 'text-white'} transition-colors`}
            size={20}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Creator Info */}
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src={project.creator.avatar} 
            alt={project.creator.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
          />
          <div>
            <h4 className="text-white font-semibold text-sm">{project.creator.name}</h4>
            <p className="text-gray-400 text-xs">{project.creator.university}</p>
          </div>
        </div>

        {/* Project Title */}
        <h3 className="text-white text-xl font-bold mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          {/* Stats */}
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <div className="flex items-center space-x-1">
              <Heart size={16} />
              <span>{project.stats.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={16} />
              <span>{project.stats.views}</span>
            </div>
          </div>

          <a 
          href={`/project/${project.id}`}
          className="flex items-center space-x-2 text-orange-500 hover:text-orange-400 font-semibold text-sm transition-colors"
          >
            <span>View Project</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
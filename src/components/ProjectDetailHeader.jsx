import React, { useState } from 'react';
import { Heart, Share2, Bookmark, Eye } from 'lucide-react';

const ProjectDetailHeader = ({ project, onLike, onShare, onSave }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(project.stats.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    if (onLike) onLike(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (onSave) onSave(!isSaved);
  };

  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-96 sm:h-[500px] bg-gray-900 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            {project.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex space-x-3">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all"
          >
            <Heart
              className={`${
                isLiked ? 'fill-orange-500 text-orange-500' : 'text-white'
              } transition-colors`}
              size={22}
            />
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all"
          >
            <Bookmark
              className={`${
                isSaved ? 'fill-orange-500 text-orange-500' : 'text-white'
              } transition-colors`}
              size={22}
            />
          </button>

          {/* Share Button */}
          <button
            onClick={onShare}
            className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all"
          >
            <Share2 className="text-white" size={22} />
          </button>
        </div>

        {/* Project Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>

            {/* Creator Info & Stats */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Creator */}
              <a
                href={`/profile/${project.creator.id}`}
                className="flex items-center space-x-3 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/60 transition-all group"
              >
                <img
                  src={project.creator.avatar}
                  alt={project.creator.name}
                  className="w-10 h-10 rounded-full border-2 border-white/20"
                />
                <div>
                  <p className="text-white font-semibold group-hover:text-orange-500 transition-colors">
                    {project.creator.name}
                  </p>
                  <p className="text-gray-300 text-sm">{project.creator.university}</p>
                </div>
              </a>

              {/* Stats */}
              <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="flex items-center space-x-2 text-white">
                  <Heart size={18} />
                  <span className="font-semibold">{likeCount}</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center space-x-2 text-white">
                  <Eye size={18} />
                  <span className="font-semibold">{project.stats.views}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailHeader;
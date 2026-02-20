import React, { useState } from 'react';
import { X, ExternalLink, Play, Image as ImageIcon, Video } from 'lucide-react';

const MediaGallery = ({ project }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Combine main image with gallery images
  const allImages = project.gallery 
    ? [project.image, ...project.gallery]
    : [project.image];

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  // Extract YouTube video ID
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const hasMedia = project.gallery?.length > 0 || project.videoLink || project.demoLink;

  if (!hasMedia) {
    return null; // Don't render if no additional media
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-white mb-6">Media & Resources</h2>

      <div className="space-y-8">
        
        {/* Demo Link Button */}
        {project.demoLink && (
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Live Demo Available</h3>
                <p className="text-white/80 text-sm">Try the project yourself</p>
              </div>
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <ExternalLink size={20} />
                <span>Open Demo</span>
              </a>
            </div>
          </div>
        )}

        {/* Video Section */}
        {project.videoLink && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Video size={20} className="text-orange-500" />
              <span>Project Video</span>
            </h3>
            
            {getYouTubeId(project.videoLink) ? (
              // YouTube Embed
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${getYouTubeId(project.videoLink)}`}
                  title="Project Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              // Generic Video Link
              <a
                href={project.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-orange-500 transition-colors group"
              >
                <div className="w-16 h-16 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  <Play size={32} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Watch Project Video</p>
                  <p className="text-gray-400 text-sm">Opens in new tab</p>
                </div>
                <ExternalLink className="text-gray-400 ml-auto" size={20} />
              </a>
            )}
          </div>
        )}

        {/* Image Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <ImageIcon size={20} className="text-orange-500" />
              <span>Gallery ({allImages.length} images)</span>
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(image)}
                  className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden group cursor-pointer"
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <ImageIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                  </div>
                  
                  {/* Main image badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Main
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold">
            {allImages.indexOf(selectedImage) + 1} / {allImages.length}
          </div>

          {/* Image */}
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = allImages.indexOf(selectedImage);
                  const prevIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
                  setSelectedImage(allImages[prevIndex]);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="text-white text-2xl">‹</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = allImages.indexOf(selectedImage);
                  const nextIndex = currentIndex === allImages.length - 1 ? 0 : currentIndex + 1;
                  setSelectedImage(allImages[nextIndex]);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="text-white text-2xl">›</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
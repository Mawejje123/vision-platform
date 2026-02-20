import React, { useState } from 'react';
import { Image, Video, Link, Upload, X, ExternalLink } from 'lucide-react';

const MediaUpload = ({ formData, onChange, errors }) => {
  const [imagePreview, setImagePreview] = useState(formData.image || null);
  const [galleryPreviews, setGalleryPreviews] = useState(formData.gallery || []);

  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  // Handle main image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        handleChange('image', reader.result);
        handleChange('imageFile', file);
        
        // Clear the image error if it exists
        if (errors.image) {
          const newErrors = { ...errors };
          delete newErrors.image;
          // You might need to pass errors as a prop and have an onErrorChange callback
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery images upload
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Limit to 5 images total
    if (galleryPreviews.length + files.length > 5) {
      alert('Maximum 5 gallery images allowed');
      return;
    }

    files.forEach((file) => {
      // Check file size
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Max size is 5MB`);
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image`);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const newGallery = [...galleryPreviews, reader.result];
        setGalleryPreviews(newGallery);
        handleChange('gallery', newGallery);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove gallery image
  const removeGalleryImage = (index) => {
    const newGallery = galleryPreviews.filter((_, i) => i !== index);
    setGalleryPreviews(newGallery);
    handleChange('gallery', newGallery);
  };

  // Remove main image
  const removeMainImage = () => {
    setImagePreview(null);
    handleChange('image', null);
    handleChange('imageFile', null);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Media & Links</h2>
        <p className="text-gray-400">Add images, videos, and demo links</p>
      </div>

      {/* Main Project Image */}
      <div>
        <label className="flex items-center space-x-2 text-white font-semibold mb-2">
          <Image size={18} className="text-orange-500" />
          <span>Project Cover Image</span>
          <span className="text-red-500">*</span>
        </label>
        <p className="text-gray-500 text-sm mb-3">
          This will be the main image shown on your project card
        </p>

        {imagePreview ? (
          // Image Preview
          <div className="relative w-full h-64 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group">
            <img
              src={imagePreview}
              alt="Project preview"
              className="w-full h-full object-cover"
            />
            {/* Remove Button */}
            <button
              onClick={removeMainImage}
              className="absolute top-4 right-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        ) : (
          // Upload Area
          <label className={`block w-full h-64 border-2 border-dashed ${
            errors.image ? 'border-red-500' : 'border-gray-800'
          } rounded-xl cursor-pointer hover:border-orange-500 transition-colors bg-gray-900`}>
            <div className="flex flex-col items-center justify-center h-full">
              <Upload size={48} className="text-gray-600 mb-4" />
              <p className="text-white font-semibold mb-1">Click to upload image</p>
              <p className="text-gray-500 text-sm">PNG, JPG, WEBP (Max 5MB)</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
        {errors.image && (
          <p className="text-red-500 text-sm mt-2">{errors.image}</p>
        )}
      </div>

      {/* Gallery Images */}
      <div>
        <label className="flex items-center space-x-2 text-white font-semibold mb-2">
          <Image size={18} className="text-orange-500" />
          <span>Additional Images</span>
          <span className="text-gray-400 text-sm font-normal ml-2">(Optional)</span>
        </label>
        <p className="text-gray-500 text-sm mb-3">
          Add up to 5 more images to showcase your project (Max 5MB each)
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {/* Existing Gallery Images */}
          {galleryPreviews.map((preview, index) => (
            <div key={index} className="relative aspect-square bg-gray-900 border border-gray-800 rounded-lg overflow-hidden group">
              <img
                src={preview}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeGalleryImage(index)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          ))}

          {/* Upload Button */}
          {galleryPreviews.length < 5 && (
            <label className="aspect-square border-2 border-dashed border-gray-800 rounded-lg cursor-pointer hover:border-orange-500 transition-colors bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <Upload size={24} className="text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 text-xs">Add Image</p>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Demo Link */}
      <div>
        <label className="flex items-center space-x-2 text-white font-semibold mb-2">
          <ExternalLink size={18} className="text-orange-500" />
          <span>Live Demo Link</span>
          <span className="text-gray-400 text-sm font-normal ml-2">(Optional)</span>
        </label>
        <p className="text-gray-500 text-sm mb-3">
          Link to your live project, prototype, or demo
        </p>
        <input
          type="url"
          value={formData.demoLink || ''}
          onChange={(e) => handleChange('demoLink', e.target.value)}
          placeholder="https://your-project-demo.com"
          className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
        />
      </div>

      {/* Video Link */}
      <div>
        <label className="flex items-center space-x-2 text-white font-semibold mb-2">
          <Video size={18} className="text-orange-500" />
          <span>Video Link</span>
          <span className="text-gray-400 text-sm font-normal ml-2">(Optional)</span>
        </label>
        <p className="text-gray-500 text-sm mb-3">
          YouTube, Vimeo, or other video platform link
        </p>
        <input
          type="url"
          value={formData.videoLink || ''}
          onChange={(e) => handleChange('videoLink', e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
        />
      </div>
    </div>
  );
};

export default MediaUpload;
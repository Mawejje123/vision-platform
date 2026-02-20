import React, { useState } from 'react';
import { Edit, Share2, UserPlus, UserCheck, MessageCircle } from 'lucide-react';

const ProfileActions = ({ isOwnProfile, isFollowing: initialFollowing, onFollow, onMessage, onEdit, onShare }) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing || false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (onFollow) {
      onFollow(!isFollowing);
    }
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const copyProfileLink = () => {
    const profileUrl = window.location.href;
    navigator.clipboard.writeText(profileUrl);
    alert('Profile link copied to clipboard!');
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    const profileUrl = window.location.href;
    const text = "Check out this amazing profile on VISION!";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`, '_blank');
    setShowShareMenu(false);
  };

  const shareToLinkedIn = () => {
    const profileUrl = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`, '_blank');
    setShowShareMenu(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left Side - Main Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {isOwnProfile ? (
              // Own Profile Actions
              <>
                <button
                  onClick={onEdit}
                  className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all"
                >
                  <Edit size={18} />
                  <span>Edit Profile</span>
                </button>
                <div className="relative flex-1 sm:flex-none">
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center space-x-2 bg-gray-800 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all border border-gray-700"
                  >
                    <Share2 size={18} />
                    <span>Share Profile</span>
                  </button>

                  {/* Share Menu Dropdown */}
                  {showShareMenu && (
                    <div className="absolute top-full mt-2 right-0 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                      <div className="py-2">
                        <button
                          onClick={copyProfileLink}
                          className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          Copy profile link
                        </button>
                        <button
                          onClick={shareToTwitter}
                          className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          Share to Twitter
                        </button>
                        <button
                          onClick={shareToLinkedIn}
                          className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          Share to LinkedIn
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Other User's Profile Actions
              <>
                <button
                  onClick={handleFollow}
                  className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    isFollowing
                      ? 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck size={18} />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      <span>Follow</span>
                    </>
                  )}
                </button>
                <button
                  onClick={onMessage}
                  className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-gray-800 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all border border-gray-700"
                >
                  <MessageCircle size={18} />
                  <span>Message</span>
                </button>
                <div className="relative">
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center w-12 h-12 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all border border-gray-700"
                  >
                    <Share2 size={18} />
                  </button>

                  {/* Share Menu Dropdown */}
                  {showShareMenu && (
                    <div className="absolute top-full mt-2 right-0 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                      <div className="py-2">
                        <button
                          onClick={copyProfileLink}
                          className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          Copy profile link
                        </button>
                        <button
                          onClick={shareToTwitter}
                          className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          Share to Twitter
                        </button>
                        <button
                          onClick={shareToLinkedIn}
                          className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          Share to LinkedIn
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right Side - Additional Info (optional) */}
          {!isOwnProfile && isFollowing && (
            <div className="hidden sm:block">
              <span className="text-sm text-gray-400">
                You follow this user
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileActions;
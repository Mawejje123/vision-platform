import React from 'react';
import { MapPin, Calendar, Users, Heart, Eye } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  // Default user data if none provided
  const defaultUser = {
    id: 1,
    name: "Sarah Nakato",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    university: "Makerere University",
    bio: "Engineering student passionate about using AI and IoT to solve agricultural challenges in Uganda. Always looking to collaborate on impactful projects!",
    location: "Kampala, Uganda",
    joinedDate: "January 2024",
    stats: {
      projects: 5,
      followers: 234,
      following: 89,
      totalLikes: 1247,
      totalViews: 8934
    },
    socialLinks: {
      twitter: "https://twitter.com/sarahnakato",
      linkedin: "https://linkedin.com/in/sarahnakato",
      github: "https://github.com/sarahnakato"
    }
  };

  const userData = user || defaultUser;

  return (
    <div className="relative">
      {/* Cover Image / Background */}
      <div className="h-48 sm:h-64 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Optional: Add pattern or image here */}
      </div>

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 sm:-mt-24">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-gray-800 bg-gray-800">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                {/* Name and University */}
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {userData.name}
                </h1>
                <p className="text-lg text-gray-400 mb-4">
                  {userData.university}
                </p>

                {/* Bio */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {userData.bio}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  {userData.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-orange-500" />
                      <span>{userData.location}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-orange-500" />
                    <span>Joined {userData.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {userData.stats.projects}
                  </div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {userData.stats.followers}
                  </div>
                  <div className="text-sm text-gray-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {userData.stats.following}
                  </div>
                  <div className="text-sm text-gray-400">Following</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-white mb-1">
                    <Heart size={20} className="text-orange-500" />
                    <span>{userData.stats.totalLikes}</span>
                  </div>
                  <div className="text-sm text-gray-400">Total Likes</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-white mb-1">
                    <Eye size={20} className="text-orange-500" />
                    <span>{userData.stats.totalViews}</span>
                  </div>
                  <div className="text-sm text-gray-400">Total Views</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfileHeader from '../components/ProfileHeader';
import ProfileActions from '../components/ProfileActions';
import UserProjectsGrid from '../components/UserProjectsGrid';
import { useParams } from 'react-router-dom'; // We'll add routing later if needed

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Get user ID from URL params (for now, we'll use a default)
  // const { userId } = useParams();
  const userId = 1; // Hardcoded for now

  // Simulate checking if this is the logged-in user's profile
  const currentUserId = 1; // This would come from auth context later

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    setIsLoading(true);

    // Simulate API call - Replace with real API later
    setTimeout(() => {
      // Mock user data
      const mockUser = {
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

      // Mock user projects
      const mockProjects = [
        {
          id: 1,
          title: "AI-Powered Agricultural Monitoring System",
          description: "Using machine learning to help farmers monitor crop health and predict yields through satellite imagery and IoT sensors.",
          category: "Engineering",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
          creator: {
            name: "Sarah Nakato",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
            university: "Makerere University"
          },
          stats: { likes: 142, views: 1204 },
          tags: ["AI/ML", "Agriculture", "IoT"],
          date: new Date('2024-01-15')
        },
        {
          id: 2,
          title: "Smart Water Quality Monitoring",
          description: "IoT device that monitors water quality in real-time and alerts communities about contamination.",
          category: "Engineering",
          image: "https://images.unsplash.com/photo-1581093458791-9d42e3c4b1e3?w=800&q=80",
          creator: {
            name: "Sarah Nakato",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
            university: "Makerere University"
          },
          stats: { likes: 167, views: 982 },
          tags: ["IoT", "Health", "Innovation"],
          date: new Date('2024-01-18')
        },
        {
          id: 3,
          title: "Solar-Powered Irrigation System",
          description: "Automated irrigation system powered by solar energy, designed for small-scale farmers.",
          category: "Engineering",
          image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
          creator: {
            name: "Sarah Nakato",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
            university: "Makerere University"
          },
          stats: { likes: 198, views: 1432 },
          tags: ["Sustainability", "Agriculture", "IoT"],
          date: new Date('2024-01-14')
        },
        {
          id: 4,
          title: "Crop Disease Detection App",
          description: "Mobile app that uses computer vision to identify crop diseases from photos and suggests treatments.",
          category: "Engineering",
          image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
          creator: {
            name: "Sarah Nakato",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
            university: "Makerere University"
          },
          stats: { likes: 289, views: 2104 },
          tags: ["AI/ML", "Mobile App", "Agriculture"],
          date: new Date('2024-01-22')
        },
        {
          id: 5,
          title: "Weather Prediction System",
          description: "Local weather prediction system using machine learning and local sensor data.",
          category: "Engineering",
          image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
          creator: {
            name: "Sarah Nakato",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
            university: "Makerere University"
          },
          stats: { likes: 421, views: 3212 },
          tags: ["AI/ML", "Data Science", "Agriculture"],
          date: new Date('2024-01-25')
        }
      ];

      setUser(mockUser);
      setUserProjects(mockProjects);
      setIsOwnProfile(userId === currentUserId);
      setIsFollowing(false); // This would come from API
      setIsLoading(false);
    }, 1000);
  };

  const handleFollow = (followStatus) => {
    console.log('Follow status changed:', followStatus);
    // API call to follow/unfollow user
    // Update follower count in user state
  };

  const handleMessage = () => {
    console.log('Message user');
    // Navigate to messages or open message modal
  };

  const handleEditProfile = () => {
    console.log('Edit profile');
    // Navigate to edit profile page or open modal
  };

  const handleShare = () => {
    console.log('Share profile');
    // Share functionality handled in ProfileActions component
  };

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-2">User not found</h2>
            <p className="text-gray-400 mb-6">This profile doesn't exist or has been removed.</p>
            <a href="/discover" className="text-orange-500 hover:text-orange-400 font-semibold">
              Back to Discover
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="pt-16 pb-16">
        {/* Profile Header */}
        <ProfileHeader user={user} />

        {/* Profile Actions */}
        <ProfileActions
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onMessage={handleMessage}
          onEdit={handleEditProfile}
          onShare={handleShare}
        />

        {/* User Projects Grid */}
        <UserProjectsGrid
          projects={userProjects}
          isOwnProfile={isOwnProfile}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectDetailHeader from '../components/ProjectDetailHeader';
import ProjectInfo from '../components/ProjectInfo';
import MediaGallery from '../components/MediaGallery';
import CommentsSection from '../components/CommentsSection';
import RelatedProjects from '../components/RelatedProjects';
import { supabase } from '../lib/supabase';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjectData();
    fetchAllProjects();
  }, [projectId]);

  const fetchProjectData = async () => {
    setIsLoading(true);

    // Simulate API call - Replace with real Supabase later
    setTimeout(() => {
      // Mock project data
      const mockProject = {
        id: projectId || 1,
        title: "AI-Powered Agricultural Monitoring System",
        description: `This innovative project leverages cutting-edge artificial intelligence and IoT technology to revolutionize agricultural practices in Uganda and across Africa.

The system uses satellite imagery combined with ground-level sensors to monitor crop health in real-time. Machine learning algorithms analyze this data to predict yields, detect diseases early, and optimize irrigation schedules.

Our solution addresses the critical challenge faced by smallholder farmers who lack access to modern agricultural technology. By providing actionable insights through a simple mobile interface, we're helping farmers increase yields by up to 30% while reducing water usage by 25%.

The system has been tested on over 50 farms across Uganda with remarkable results. Farmers report not only increased productivity but also significant cost savings from early disease detection and optimized resource usage.`,
        category: "Engineering",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
          "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80",
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
          "https://images.unsplash.com/photo-1581093458791-9d42e3c4b1e3?w=800&q=80"
        ],
        demoLink: "https://demo-agri-monitor.vercel.app",
        videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        creator: {
          id: 1,
          name: "Sarah Nakato",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
          university: "Makerere University"
        },
        stats: {
          likes: 142,
          views: 1204,
          shares: 34
        },
        tags: ["AI/ML", "Agriculture", "IoT", "Mobile App", "Sustainability"],
        problem: "Smallholder farmers in Uganda lack access to modern agricultural technology and real-time crop monitoring tools, leading to reduced yields and inefficient resource usage.",
        solution: "Our AI-powered system combines satellite imagery with IoT sensors to provide farmers with real-time insights on crop health, irrigation needs, and disease detection through a simple mobile interface.",
        technologies: ["Python", "TensorFlow", "React Native", "IoT Sensors", "Google Earth Engine"],
        created_at: "2024-01-15",
        date: new Date('2024-01-15')
      };

      // Mock comments
      const mockComments = [
        {
          id: 1,
          user: {
            name: "John Mugisha",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
          },
          text: "This is incredible! I'm a farmer in Mbarara and would love to try this system on my farm. How can I get involved?",
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          likes: 8,
          isLiked: false,
          replies: [
            {
              id: 2,
              user: {
                name: "Sarah Nakato",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
              },
              text: "Thank you! Please reach out to me directly and we can discuss piloting the system on your farm!",
              timestamp: new Date(Date.now() - 1800000), // 30 min ago
              likes: 3,
              isLiked: false
            }
          ]
        },
        {
          id: 3,
          user: {
            name: "Grace Apio",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
          },
          text: "Brilliant work! The intersection of AI and agriculture is so important for Africa's future. Have you considered expanding to other crops beyond the ones you've tested?",
          timestamp: new Date(Date.now() - 7200000), // 2 hours ago
          likes: 5,
          isLiked: false,
          replies: []
        }
      ];

      setProject(mockProject);
      setComments(mockComments);
      setIsLoading(false);

      // Increment view count (would be API call)
      console.log('View count incremented');
    }, 1000);
  };

  const fetchAllProjects = async () => {
    // Fetch all projects for "Related Projects" section
    // This would be a real Supabase call later
    const mockProjects = [
      {
        id: 2,
        title: "Smart Water Quality Monitoring",
        description: "IoT device that monitors water quality in real-time.",
        category: "Engineering",
        image: "https://images.unsplash.com/photo-1581093458791-9d42e3c4b1e3?w=800&q=80",
        creator: {
          name: "David Okello",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
          university: "Gulu University"
        },
        stats: { likes: 167, views: 982 },
        tags: ["IoT", "Health", "Innovation"],
        date: new Date('2024-01-18')
      },
      {
        id: 3,
        title: "Crop Disease Detection App",
        description: "Mobile app using computer vision to identify crop diseases.",
        category: "Engineering",
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
        creator: {
          name: "Emmanuel Wasswa",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
          university: "Makerere University"
        },
        stats: { likes: 289, views: 2104 },
        tags: ["AI/ML", "Mobile App", "Agriculture"],
        date: new Date('2024-01-22')
      },
      {
        id: 4,
        title: "Solar-Powered Irrigation System",
        description: "Automated irrigation system powered by solar energy.",
        category: "Engineering",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
        creator: {
          name: "Patrick Mugisha",
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
          university: "Busitema University"
        },
        stats: { likes: 198, views: 1432 },
        tags: ["Sustainability", "Agriculture", "IoT"],
        date: new Date('2024-01-14')
      }
    ];

    setAllProjects(mockProjects);
  };

  const handleLike = (liked) => {
    console.log('Project liked:', liked);
    // API call to update like status
  };

  const handleShare = () => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: `Check out this amazing project: ${project.title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = (saved) => {
    console.log('Project saved:', saved);
    // API call to save/unsave project
  };

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading project...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-2">Project not found</h2>
            <p className="text-gray-400 mb-6">This project doesn't exist or has been removed.</p>
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
      <div className="pt-16">
        {/* Project Header */}
        <ProjectDetailHeader 
          project={project}
          onLike={handleLike}
          onShare={handleShare}
          onSave={handleSave}
        />

        {/* Project Information */}
        <ProjectInfo project={project} />

        {/* Media Gallery */}
        <MediaGallery project={project} />

        {/* Comments Section */}
        <CommentsSection 
          projectId={project.id}
          initialComments={comments}
        />

        {/* Related Projects */}
        <RelatedProjects 
          currentProject={project}
          allProjects={allProjects}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
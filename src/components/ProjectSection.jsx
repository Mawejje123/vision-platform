import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  const projects = [
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
      tags: ["AI/ML", "Agriculture", "IoT"]
    },
    {
      id: 2,
      title: "Mobile Banking Solution for Rural Communities",
      description: "A USSD-based banking app designed for feature phones, enabling rural communities to access financial services without internet.",
      category: "FinTech",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      creator: {
        name: "John Mukasa",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        university: "Kyambogo University"
      },
      stats: { likes: 98, views: 876 },
      tags: ["Mobile", "FinTech", "USSD"]
    },
    {
      id: 3,
      title: "Eco-Friendly Packaging from Banana Fibers",
      description: "Sustainable packaging material made from agricultural waste, providing an alternative to plastic for local businesses.",
      category: "Design",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
      creator: {
        name: "Grace Apio",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        university: "Mbarara University"
      },
      stats: { likes: 203, views: 1543 },
      tags: ["Sustainability", "Design", "Innovation"]
    }
  ];

  return (
    <section id="discover" className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover groundbreaking innovations from students across Africa
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center">
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all">
            Explore All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
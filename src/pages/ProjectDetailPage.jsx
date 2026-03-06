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
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
        setIsLoading(false);
        return;
      }

      setProject({
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        image: data.image,
        gallery: data.gallery || [],
        demoLink: data.demo_link,
        videoLink: data.video_link,
        creator: {
          id: data.creator_id,
          name: data.creator_name,
          avatar: data.creator_avatar,
          university: data.creator_university
        },
        stats: {
          likes: data.likes,
          views: data.views,
          shares: data.shares || 0
        },
        tags: data.tags || [],
        problem: data.problem || '',
        solution: data.solution || '',
        technologies: data.technologies || [],
        date: new Date(data.created_at)
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Unexpected error:', error);
      setIsLoading(false);
    }
  };

  const fetchAllProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .neq('id', projectId)
        .limit(3);

      if (error) return;

      setAllProjects(data.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        image: p.image,
        creator: {
          name: p.creator_name,
          avatar: p.creator_avatar,
          university: p.creator_university
        },
        stats: { likes: p.likes, views: p.views },
        tags: p.tags || [],
        date: new Date(p.created_at)
      })));
    } catch (error) {
      console.error('Error fetching related projects:', error);
    }
  };

  const handleLike = (liked) => {
    console.log('Project liked:', liked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: `Check out this amazing project: ${project.title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = (saved) => {
    console.log('Project saved:', saved);
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
      <div className="pt-16">
        <ProjectDetailHeader
          project={project}
          onLike={handleLike}
          onShare={handleShare}
          onSave={handleSave}
        />
        <ProjectInfo project={project} />
        <MediaGallery project={project} />
        <CommentsSection
          projectId={project.id}
          initialComments={comments}
        />
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
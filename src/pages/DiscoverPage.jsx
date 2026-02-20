import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import SortOptions from '../components/SortOptions';
import ProjectsGrid from '../components/ProjectsGrid';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase'; 

const DiscoverPage = () => {
  // State Management
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    university: 'All',
    tags: []
  });
  const [sortBy, setSortBy] = useState('recent');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;


// Real API call using Supabase
useEffect(() => {
  fetchProjects();
}, []);

const fetchProjects = async () => {
  setIsLoading(true);
  
  try {
    // Fetch projects from Supabase
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      setIsLoading(false);
      return;
    }

    // Transform data to match our component structure
    const formattedProjects = data.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image,
      creator: {
        name: project.creator_name,
        avatar: project.creator_avatar,
        university: project.creator_university
      },
      stats: {
        likes: project.likes,
        views: project.views
      },
      tags: project.tags,
      date: new Date(project.created_at)
    }));

    setAllProjects(formattedProjects);
    setFilteredProjects(formattedProjects);
    setIsLoading(false);
  } catch (error) {
    console.error('Unexpected error:', error);
    setIsLoading(false);
  }
};

  // Apply filters and search
  useEffect(() => {
    let result = [...allProjects];

    // Search filter
    if (searchQuery) {
      result = result.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      result = result.filter(project => project.category === filters.category);
    }

    // University filter
    if (filters.university !== 'All') {
      result = result.filter(project => project.creator.university === filters.university);
    }

    // Tags filter
    if (filters.tags.length > 0) {
      result = result.filter(project =>
        filters.tags.some(tag => project.tags.includes(tag))
      );
    }

    // Sort
    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => b.date - a.date);
        break;
      case 'popular':
        result.sort((a, b) => b.stats.likes - a.stats.likes);
        break;
      case 'trending':
        // Simple trending algorithm: likes + views in recent timeframe
        result.sort((a, b) => {
          const scoreA = a.stats.likes * 2 + a.stats.views;
          const scoreB = b.stats.likes * 2 + b.stats.views;
          return scoreB - scoreA;
        });
        break;
      case 'viewed':
        result.sort((a, b) => b.stats.views - a.stats.views);
        break;
      default:
        break;
    }

    setFilteredProjects(result);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [searchQuery, filters, sortBy, allProjects]);

  // Paginate projects
  useEffect(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    setDisplayedProjects(filteredProjects.slice(startIndex, endIndex));
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Discover <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">Innovation</span>
            </h1>
            <p className="text-xl text-gray-400">
              Explore groundbreaking projects from talented students across Africa
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={setSearchQuery} />

          {/* Filters and Sort */}
          <div className="space-y-6 mb-8">
            <FilterSection onFilterChange={setFilters} />
            <SortOptions onSortChange={setSortBy} />
          </div>

          {/* Projects Grid */}
          <ProjectsGrid 
            projects={displayedProjects} 
            isLoading={isLoading} 
          />

          {/* Pagination */}
          {!isLoading && filteredProjects.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalProjects={filteredProjects.length}
              projectsPerPage={projectsPerPage}
              onPageChange={setCurrentPage}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DiscoverPage;

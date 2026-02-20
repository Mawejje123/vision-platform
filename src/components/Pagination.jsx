import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalProjects,
  projectsPerPage,
  onPageChange,
  isLoading 
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    if (onPageChange) {
      await onPageChange(currentPage + 1);
    }
    setIsLoadingMore(false);
  };

  const handlePageChange = async (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    if (onPageChange) {
      await onPageChange(page);
    }
    
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startProject = (currentPage - 1) * projectsPerPage + 1;
  const endProject = Math.min(currentPage * projectsPerPage, totalProjects);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if only 1 page
  }

  return (
    <div className="mt-12 space-y-6">
      {/* Load More Button (Alternative style) */}
      <div className="flex flex-col items-center space-y-4">
        {/* Progress Info */}
        <p className="text-gray-400 text-sm">
          Showing {startProject} - {endProject} of {totalProjects} projects
        </p>

        {/* Load More Button */}
        {currentPage < totalPages && (
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore || isLoading}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoadingMore ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Loading...</span>
              </>
            ) : (
              <span>Load More Projects</span>
            )}
          </button>
        )}
      </div>

      {/* Traditional Pagination */}
      <div className="flex items-center justify-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>

        {/* First Page */}
        {getPageNumbers()[0] > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all"
            >
              1
            </button>
            {getPageNumbers()[0] > 2 && (
              <span className="text-gray-600">...</span>
            )}
          </>
        )}

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-all ${
              currentPage === page
                ? 'bg-orange-500 text-white'
                : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-orange-500 hover:border-orange-500'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last Page */}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
              <span className="text-gray-600">...</span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
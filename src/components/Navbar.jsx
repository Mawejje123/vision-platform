import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check current user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <a href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                VISION
              </a>
              <div className="hidden md:flex items-center space-x-6">
                <a href="/discover" className="text-gray-300 hover:text-orange-500 transition-colors">Discover</a>
                <a href="/#about" className="text-gray-300 hover:text-orange-500 transition-colors">About</a>
                <a href="/#universities" className="text-gray-300 hover:text-orange-500 transition-colors">Universities</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                // Logged in state
                <div className="hidden md:flex items-center space-x-4">
                  <a href="/upload" className="text-gray-300 hover:text-orange-500 transition-colors px-4 py-2">
                    Upload Project
                  </a>
                  <a href="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-orange-500 transition-colors">
                    <img 
                      src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.user_metadata?.name || 'Profile'}</span>
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-orange-500 transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                // Logged out state
                <div className="hidden md:flex items-center space-x-4">
                  <button 
                    onClick={() => openAuthModal('signin')}
                    className="text-gray-300 hover:text-orange-500 transition-colors px-4 py-2"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => openAuthModal('signup')}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    Get Started
                  </button>
                </div>
              )}
              <div className="ml-2.5">
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-orange-500 transition-colors">
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu - keeping existing code */}
        {isOpen && (
          <div className="md:hidden bg-black/98 border-t border-gray-800">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <a href="/discover" className="block text-gray-300 hover:text-orange-500 transition-colors py-2">Discover</a>
              <a href="/#about" className="block text-gray-300 hover:text-orange-500 transition-colors py-2">About</a>
              <a href="/#universities" className="block text-gray-300 hover:text-orange-500 transition-colors py-2">Universities</a>
              <div className="pt-4 space-y-2">
                {user ? (
                  <>
                    <a href="/upload" className="w-full block text-center bg-orange-500 text-white px-6 py-2 rounded-lg">
                      Upload Project
                    </a>
                    <button onClick={handleSignOut} className="w-full text-gray-300 hover:text-orange-500 transition-colors px-4 py-2 border border-gray-700 rounded-lg">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => openAuthModal('signin')}
                      className="w-full text-gray-300 hover:text-orange-500 transition-colors px-4 py-2 border border-gray-700 rounded-lg"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => openAuthModal('signup')}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSuccess={(user) => {
          console.log('User signed in:', user);
          // Optionally redirect or update UI
        }}
      />
    </>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { X, Mail, Lock, User, Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AuthModal = ({ isOpen, onClose, mode = 'signin', onSuccess }) => {
  const [authMode, setAuthMode] = useState(mode); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const universities = [
    'Makerere University',
    'Kyambogo University',
    'Mbarara University',
    'Gulu University',
    'Busitema University',
    'Uganda Christian University',
    'Kampala International University',
    'Islamic University in Uganda',
    'Nkumba University',
    'Other'
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            university,
            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f97316&color=fff`
          }
        }
      });

      if (error) throw error;

      alert('Account created successfully! You can now sign in.');
      setAuthMode('signin');
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      alert('Signed in successfully!');
      if (onSuccess) onSuccess(data.user);
      onClose();
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {authMode === 'signin' ? 'Welcome Back' : 'Join VISION'}
          </h2>
          <p className="text-gray-400">
            {authMode === 'signin' 
              ? 'Sign in to upload projects and connect with innovators'
              : 'Create an account to showcase your projects'
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={authMode === 'signin' ? handleSignIn : handleSignUp}>
          
          {/* Name (Sign Up Only) */}
          {authMode === 'signup' && (
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* University (Sign Up Only) */}
          {authMode === 'signup' && (
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">
                University
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  required
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                >
                  <option value="">Select your university</option>
                  {universities.map((uni) => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            {authMode === 'signup' && (
              <p className="text-gray-500 text-xs mt-1">At least 6 characters</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : authMode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
              setError('');
            }}
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            {authMode === 'signin' ? (
              <>Don't have an account? <span className="text-orange-500 font-semibold">Sign Up</span></>
            ) : (
              <>Already have an account? <span className="text-orange-500 font-semibold">Sign In</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
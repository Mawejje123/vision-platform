import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-black pt-16">
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-4xl">
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Empowering Africa as the{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              Next Frontier for Growth
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-400 mb-4 max-w-2xl">
            Be the Vehicle of Change in your Community
          </p>

          {/* Description with Arrow */}
          <div className="flex items-start space-x-3 mb-12">
            <ArrowRight className="text-orange-500 mt-1 flex-shrink-0" size={20} />
            <p className="text-gray-300 text-lg max-w-2xl">
              Showcase your innovation. From groundbreaking student projects to creative masterpieces - 
              let the world see what African talent can achieve.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25">
              Get Started Free
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all border border-gray-700">
              See How It Works
            </button>
          </div>

          {/* Stats or Social Proof */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-white">42+</div>
              <div className="text-gray-400">Universities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-gray-400">Student Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-gray-400">Success Stories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
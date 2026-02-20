import React from 'react';
import { Upload, Eye, Users, TrendingUp } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Upload,
      title: "Showcase Your Work",
      description: "Upload your projects, innovations, and creative work. Add demos, videos, and detailed descriptions to bring your ideas to life.",
      step: "01",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
    },
    {
      icon: Eye,
      title: "Get Discovered",
      description: "Your work reaches universities, companies, investors, and mentors across Africa and beyond. No connections needed - just talent.",
      step: "02",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80"
    },
    {
      icon: Users,
      title: "Connect & Collaborate",
      description: "Meet fellow innovators, find collaborators, get mentorship, and build your network with people who share your vision.",
      step: "03",
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80"
    },
    {
      icon: TrendingUp,
      title: "Unlock Opportunities",
      description: "From job offers to funding, competitions to partnerships - turn your projects into real-world opportunities and success stories.",
      step: "04",
      image: "https://images.unsplash.com/photo-1507537362848-9c7e70b7b5c1?w=800&q=80"
    }
  ];

  return (
    <section id="about" className="bg-black py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            How It <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Four simple steps to showcase your talent and unlock opportunities
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="relative group"
              >
                {/* Card */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 h-full hover:border-orange-500/50 transition-all duration-300 overflow-hidden">
                  {/* Background Image with Overlay */}
                  <div 
                    className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-300"
                    style={{
                      backgroundImage: `url(${feature.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  {/* Content - now positioned relative to appear above background */}
                  <div className="relative z-10">
                    {/* Step Number */}
                    <div className="text-6xl font-bold text-gray-800 mb-4">
                      {feature.step}
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="text-white" size={28} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Line (except for last item) */}
                {index < features.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
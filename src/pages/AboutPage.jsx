import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Upload, Eye, Users, TrendingUp, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: '01',
      icon: <Upload size={28} />,
      title: 'Showcase Your Work',
      description: 'Upload your projects, innovations, and creative work. Add demos, videos, and detailed descriptions to bring your ideas to life.'
    },
    {
      number: '02',
      icon: <Eye size={28} />,
      title: 'Get Discovered',
      description: 'Your work reaches universities, companies, investors, and mentors across Africa and beyond. No connections needed - just talent.'
    },
    {
      number: '03',
      icon: <Users size={28} />,
      title: 'Connect & Collaborate',
      description: 'Meet fellow innovators, find collaborators, get mentorship, and build your network with people who share your vision.'
    },
    {
      number: '04',
      icon: <TrendingUp size={28} />,
      title: 'Unlock Opportunities',
      description: 'From job offers to funding, competitions to partnerships - turn your projects into real-world opportunities and success stories.'
    }
  ];

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              How It{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                Works
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Four simple steps to showcase your talent and unlock opportunities
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {steps.map((step) => (
              <div key={step.number} className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
                <div className="text-6xl font-bold text-gray-800 mb-4">{step.number}</div>
                <div className="bg-orange-500 w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5">
                  {step.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                <div className="w-8 h-0.5 bg-orange-500 mb-3"></div>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Mission Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 mb-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Africa is home to some of the world's most creative and driven young minds. 
              VISION exists to make sure their work is seen, celebrated, and rewarded — 
              giving every student a professional platform to showcase what they're building.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to share your work?</h2>
            <p className="text-gray-400 mb-8">Join thousands of students already on VISION.</p>
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
            >
              Get Started Free <ArrowRight size={20} />
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
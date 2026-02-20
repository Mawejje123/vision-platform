import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProjectsSection from '../components/ProjectSection';
import UniversitiesSection from '../components/UniversitiesSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <Hero />
      <Features />
      <ProjectsSection />
      <UniversitiesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
import React from 'react';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              VISION
            </span>
            <p className="text-gray-400 mt-4 max-w-md">
              Empowering African students to showcase their innovation and connect with opportunities that matter.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Instagram</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">How It Works</a></li>
              <li><a href="#universities" className="text-gray-400 hover:text-orange-500 transition-colors">Universities</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Success Stories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>hello@vision.ug</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Kampala, Uganda</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 VISION. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
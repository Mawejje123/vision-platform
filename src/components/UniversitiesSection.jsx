import React, { useState } from 'react';
import { GraduationCap, MapPin, Users } from 'lucide-react';

const UniversitiesSection = () => {
  const [filter, setFilter] = useState('all'); // all, public, private

  const publicUniversities = [
    { name: "Makerere University", location: "Kampala", students: "40,000+" },
    { name: "Kyambogo University", location: "Kampala", students: "35,000+" },
    { name: "Mbarara University of Science and Technology", location: "Mbarara", students: "8,000+" },
    { name: "Gulu University", location: "Gulu", students: "6,000+" },
    { name: "Busitema University", location: "Tororo", students: "12,000+" },
    { name: "Muni University", location: "Arua", students: "3,000+" },
    { name: "Kabale University", location: "Kabale", students: "2,500+" },
    { name: "Lira University", location: "Lira", students: "2,000+" },
    { name: "Soroti University", location: "Soroti", students: "1,800+" },
  ];

  const privateUniversities = [
    { name: "Uganda Christian University", location: "Mukono", students: "8,000+" },
    { name: "Kampala International University", location: "Kampala", students: "25,000+" },
    { name: "Islamic University in Uganda", location: "Mbale", students: "5,000+" },
    { name: "Nkumba University", location: "Entebbe", students: "7,000+" },
    { name: "Uganda Martyrs University", location: "Nkozi", students: "6,000+" },
    { name: "Bugema University", location: "Bugema", students: "4,000+" },
    { name: "Victoria University", location: "Kampala", students: "5,000+" },
    { name: "Kampala University", location: "Kampala", students: "12,000+" },
  ];

  const getFilteredUniversities = () => {
    if (filter === 'public') return publicUniversities;
    if (filter === 'private') return privateUniversities;
    return [...publicUniversities, ...privateUniversities];
  };

  const filteredUniversities = getFilteredUniversities();

  return (
    <section id="universities" className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Partner <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">Universities</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcasing innovation from {publicUniversities.length + privateUniversities.length}+ universities across Uganda
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-900 text-gray-300 border border-gray-800 hover:border-orange-500'
            }`}
          >
            All Universities ({publicUniversities.length + privateUniversities.length})
          </button>
          <button
            onClick={() => setFilter('public')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === 'public'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-900 text-gray-300 border border-gray-800 hover:border-orange-500'
            }`}
          >
            Public ({publicUniversities.length})
          </button>
          <button
            onClick={() => setFilter('private')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === 'private'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-900 text-gray-300 border border-gray-800 hover:border-orange-500'
            }`}
          >
            Private ({privateUniversities.length})
          </button>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((university, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-orange-500 transition-all group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <GraduationCap size={24} className="text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold mb-2 group-hover:text-orange-500 transition-colors">
                    {university.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <MapPin size={14} />
                      <span>{university.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Users size={14} />
                      <span>{university.students} students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">{publicUniversities.length + privateUniversities.length}+</div>
              <div className="text-white/80">Partner Universities</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100,000+</div>
              <div className="text-white/80">Students Reached</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-white/80">Projects Showcased</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversitiesSection;
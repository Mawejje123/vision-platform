import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DiscoverPage from './pages/DiscoverPage';
import ProfilePage from './pages/ProfilePage';
import UploadProjectPage from './pages/UploadProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/profile/:userId?" element={<ProfilePage />} />
        <Route path="/upload" element={<UploadProjectPage />} />
        <Route path="/project/:projectId" element={<ProjectDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
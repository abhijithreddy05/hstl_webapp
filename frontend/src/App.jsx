import React, { useState } from 'react';
import Home from './components/Home';
import StudentLogin from './components/StudentLogin';
import StudentSignup from './components/StudentSignup';
import WardenLogin from './components/WardenLogin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'student-login':
        return <StudentLogin onNavigate={setCurrentPage} />;
      case 'student-signup':
        return <StudentSignup onNavigate={setCurrentPage} />;
      case 'warden-login':
        return <WardenLogin onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {renderPage()}
    </div>
  );
}

export default App;
import React from 'react';

function Home({ onNavigate }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-4xl w-full mx-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Campus Management System
          </h1>
          <p className="text-xl text-white opacity-90">
            Welcome to our student and warden portal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">For Students</h2>
            <p className="text-gray-600 mb-6">
              Access your student portal to manage your campus life
            </p>
            <div className="space-y-4">
              <button
                onClick={() => onNavigate('student-login')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate('student-signup')}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">For Wardens</h2>
            <p className="text-gray-600 mb-6">
              Access the warden portal to manage student affairs
            </p>
            <button
              onClick={() => onNavigate('warden-login')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Warden Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
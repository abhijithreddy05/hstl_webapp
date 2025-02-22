import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

function WardenLogin({ onNavigate }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Warden login:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Warden Login</h2>
          <p className="text-gray-300 mt-2">Access your dashboard securely</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white pl-10 py-2 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white pl-10 py-2 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Back to Home Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-blue-400 hover:text-blue-500 font-medium transition duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default WardenLogin;

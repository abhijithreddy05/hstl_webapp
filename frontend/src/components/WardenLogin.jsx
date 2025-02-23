import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';

function WardenLogin({ onNavigate }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await axios.post("http://localhost:2000/api/wardens/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage({ text: res.data.message, type: "success" });

      // ✅ Save token & redirect after login
      localStorage.setItem("wardenToken", res.data.token);
      setTimeout(() => onNavigate("warden-dashboard"), 1000);
    } catch (error) {
      setMessage({ text: error.response?.data.message || "Login failed", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Warden Login</h2>
          <p className="text-gray-300 mt-2">Access your dashboard securely</p>
        </div>

        {message && (
          <div className={`p-2 mb-4 text-center rounded-md ${message.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FaUser />
              </span>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
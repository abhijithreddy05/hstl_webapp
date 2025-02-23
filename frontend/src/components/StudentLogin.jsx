import React, { useState } from 'react';
import axios from 'axios';

function StudentLogin({ onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' }); // Clear previous messages

    try {
      const res = await axios.post('http://localhost:2000/api/students/login', formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login successful:", res.data);

      // ✅ Show success message on screen
      setMessage({ text: "Login Successful!", type: "success" });

      // ✅ Save token to local storage
      localStorage.setItem("token", res.data.student.token);

      // ✅ Navigate to student dashboard after 2 seconds
      // setTimeout(() => onNavigate('student-dashboard'), 2000);

    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);

      // ❌ Show error message on screen
      setMessage({ text: error.response?.data?.message || "Login failed. Try again.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Student Login</h2>
            <p className="text-gray-600 mt-2">Welcome back, please login to your account</p>
          </div>

          {/* ✅ Success or Error Message */}
          {message.text && (
            <p
              className={`text-center mb-4 p-2 rounded-lg ${
                message.type === "success" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
              }`}
            >
              {message.text}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
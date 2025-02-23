import React, { useState } from 'react';
import axios from "axios";

function StudentSignup({ onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    rollNumber: '',
    StudentName: '',
    password: '',
    phoneNumber: '',
  });

  const [error, setError] = useState(""); // Store error message
  const [success, setSuccess] = useState(""); // Store success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setSuccess(""); // Reset success state

    try {
      const res = await axios.post('http://localhost:2000/api/students/signup', formData, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess("Student registered successfully!");
      setError(""); // Clear error if success
      setTimeout(() => {
        onNavigate('student-login');  // Redirect to login page
      }, 1000);

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Display the backend error message
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Student Registration</h2>
            <p className="text-gray-600 mt-2">Create your student account</p>
          </div>

          {/* Show error or success messages */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

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
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
                Roll Number
              </label>
              <input
                type="text"
                id="rollNumber"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                value={formData.StudentName}
                onChange={(e) => setFormData({ ...formData, StudentName: e.target.value })}
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

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Sign Up
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

export default StudentSignup;
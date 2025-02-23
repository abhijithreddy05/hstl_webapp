import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function OutingForm({ onOtpSent }) {
  const { studentToken } = useAuth();
  const [formData, setFormData] = useState({
    hostelName: "",
    roomNumber: "",
    purpose: "",
    date: "",
    parentPhoneNumber: "",
  });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/students/outing/request`,
//         formData,
//         { headers: { Authorization: `Bearer ${studentToken}` } }
//       );
//       console.log("Response:", response.data);
//       onOtpSent();
//     } catch (error) {
//       alert(error.response?.data?.message || "Error requesting outing");
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Student Token:", studentToken); // Debugging
    console.log("API URL:", import.meta.env.VITE_API_URL); // Debugging
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/students/outing/request`,
        formData,
        { headers: { Authorization: `Bearer ${studentToken}` } }
      );
      console.log("Response:", response.data); // Debugging
      onOtpSent();
    } catch (error) {
      console.error("Error:", error.response); // Debugging
      alert(error.response?.data?.message || "Error requesting outing");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Hostel Name"
        value={formData.hostelName}
        onChange={(e) => setFormData({ ...formData, hostelName: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Room Number"
        value={formData.roomNumber}
        onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Purpose"
        value={formData.purpose}
        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Parent Phone Number"
        value={formData.parentPhoneNumber}
        onChange={(e) => setFormData({ ...formData, parentPhoneNumber: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Request Outing</button>
    </form>
  );
}

export default OutingForm;
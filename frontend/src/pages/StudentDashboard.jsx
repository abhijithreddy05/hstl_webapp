import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import OutingForm from "../components/OutingForm";

function StudentDashboard() {
  const { studentToken } = useAuth();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/students/history/me`,
        { headers: { Authorization: `Bearer ${studentToken}` } }
      );
      setHistory(res.data.history);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/students/outing/verify`,
        { enteredOtp: otp },
        { headers: { Authorization: `Bearer ${studentToken}` } }
      );
      setOtpSent(false);
      fetchHistory();
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
      {!otpSent ? (
        <OutingForm onOtpSent={() => setOtpSent(true)} />
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button onClick={handleVerifyOtp} className="bg-green-500 text-white p-2 rounded">
            Verify OTP
          </button>
        </div>
      )}
      <h3 className="text-xl font-semibold mt-6">Outing History</h3>
      <ul className="space-y-2">
        {history.map((entry, idx) => (
          <li key={idx} className="p-2 bg-white rounded shadow">
            {entry.purpose} - {new Date(entry.date).toLocaleDateString()} - {entry.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDashboard;
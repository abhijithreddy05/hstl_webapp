import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function WardenDashboard() {
  const { wardenToken } = useAuth();
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/wardens/outing-requests`,
        { headers: { Authorization: `Bearer ${wardenToken}` } }
      );
      setRequests(res.data.outingRequests);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (outingId, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/wardens/update-status`,
        { outingId, status },
        { headers: { Authorization: `Bearer ${wardenToken}` } }
      );
      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || "Status update failed");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Warden Dashboard</h2>
      <h3 className="text-xl font-semibold mb-2">Outing Requests</h3>
      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req._id} className="p-4 bg-white rounded shadow">
            <p><strong>Student:</strong> {req.studentName} ({req.rollNumber})</p>
            <p><strong>Purpose:</strong> {req.purpose}</p>
            <p><strong>Date:</strong> {new Date(req.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {req.status}</p>
            {req.status === "pending" && (
              <div className="mt-2">
                <button
                  onClick={() => updateStatus(req._id, "accepted")}
                  className="bg-green-500 text-white p-2 rounded mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(req._id, "declined")}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Decline
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WardenDashboard;
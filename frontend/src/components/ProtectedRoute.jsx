import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children, role }) {
  const { studentToken, wardenToken } = useAuth();

  if (role === "student" && !studentToken) return <Navigate to="/student/login" />;
  if (role === "warden" && !wardenToken) return <Navigate to="/warden/login" />;
  return children;
}

export default ProtectedRoute;
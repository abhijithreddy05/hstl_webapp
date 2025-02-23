import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { studentToken, wardenToken, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (role) => {
    logout(role);
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-lg font-bold">Outing App</Link>
        <div>
          {!studentToken && !wardenToken && (
            <>
              <Link to="/student/login" className="mr-4">Student Login</Link>
              <Link to="/student/signup" className="mr-4">Student Signup</Link>
              <Link to="/warden/login" className="mr-4">Warden Login</Link>
              <Link to="/warden/signup">Warden Signup</Link>
            </>
          )}
          {studentToken && (
            <>
              <Link to="/student/dashboard" className="mr-4">Dashboard</Link>
              <button onClick={() => handleLogout("student")} className="bg-red-500 px-2 py-1 rounded">Logout</button>
            </>
          )}
          {wardenToken && (
            <>
              <Link to="/warden/dashboard" className="mr-4">Dashboard</Link>
              <button onClick={() => handleLogout("warden")} className="bg-red-500 px-2 py-1 rounded">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
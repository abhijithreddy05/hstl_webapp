import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [studentToken, setStudentToken] = useState(localStorage.getItem("studentToken") || null);
  const [wardenToken, setWardenToken] = useState(localStorage.getItem("wardenToken") || null);

  const loginStudent = async (email, password) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/students/login`, { email, password });
    const { token } = res.data.student;
    setStudentToken(token);
    localStorage.setItem("studentToken", token);
  };

  const loginWarden = async (email, password) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/wardens/login`, { email, password });
    const { token } = res.data.warden;
    setWardenToken(token);
    localStorage.setItem("wardenToken", token);
  };

  const logout = (role) => {
    if (role === "student") {
      setStudentToken(null);
      localStorage.removeItem("studentToken");
    } else if (role === "warden") {
      setWardenToken(null);
      localStorage.removeItem("wardenToken");
    }
  };

  return (
    <AuthContext.Provider value={{ studentToken, wardenToken, loginStudent, loginWarden, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
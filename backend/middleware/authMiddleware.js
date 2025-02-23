import { verify } from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = verify(token, process.env.JWT_SECRET);
    req.user = verified; // Stores decoded user data
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};


const studentAuth = (req, res, next) => {
  if (!req.user || req.user.role !== "student") {
    return res.status(403).json({ message: "Forbidden: Student access only" });
  }
  next();
};


const wardenAuth = (req, res, next) => {
  if (!req.user || req.user.role !== "warden") {
    return res.status(403).json({ message: "Forbidden: Warden access only" });
  }
  next();
};

export default { verifyToken, studentAuth, wardenAuth };


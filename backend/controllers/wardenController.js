import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Warden from "../models/Warden.js";

// ✅ Register Warden
export const registerWarden = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if warden already exists
    const existingWarden = await Warden.findOne({ email });
    if (existingWarden) {
      return res.status(400).json({ message: "Warden already registered" });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new warden
    const newWarden = new Warden({
      email,
      password: hashedPassword,
    });

    // ✅ Save to DB
    await newWarden.save();

    res.status(201).json({ message: "Warden registered successfully" });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Login Warden
export const loginWarden = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // ✅ Check if warden exists
      const warden = await Warden.findOne({ email });
      if (!warden) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // ✅ Compare passwords
      const isMatch = await bcrypt.compare(password, warden.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // ✅ Generate JWT Token
      const token = jwt.sign({ id: warden._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
      res.status(200).json({
        message: "Login successful",
        warden: {
          id: warden._id,
          email: warden.email,
          token,
        },
      });
  
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
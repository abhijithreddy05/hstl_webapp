import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Warden from "../models/Warden.js";
import Student from "../models/Student.js";

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

  export const getOutingRequests = async (req, res) => {
    // console.log("derftghnj");
    try {
      const warden = await Warden.findOne(); // Since you have only one warden
      if (!warden) {
        return res.status(404).json({ message: "Warden not found" });
      }
  
      res.status(200).json(warden.outingRecords);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateOutingStatus = async (req, res) => {
    try {
      const { outingId, status } = req.body; // Get outing request ID & new status
  
      if (!["accepted", "declined"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
  
      let warden = await Warden.findOne();
      if (!warden) {
        return res.status(404).json({ message: "Warden not found" });
      }
  
      // Find outing record
      let outingRecord = warden.outingRecords.id(outingId);
      if (!outingRecord) {
        return res.status(404).json({ message: "Outing request not found" });
      }
  
      // Update status
      outingRecord.status = status;
      await warden.save();
  
      // Update student history & clear active outing request if accepted
      const student = await Student.findById(outingRecord.studentId);
      if (student) {
        if (status === "accepted") {
          student.outingHistory.push(student.outingRequest);
          student.outingRequest = null;
        }
        await student.save();
      }
  
      res.status(200).json({ message: `Outing request ${status} successfully.` });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
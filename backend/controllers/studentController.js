import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import dotenv from "dotenv";
import Student from "../models/Student.js";
import Warden from "../models/Warden.js";

dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Function to generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
export const registerStudent = async (req, res) => {
  try {
    const { StudentName:name, rollNumber, email, password, phoneNumber } = req.body;
    console.log(name)
    // ✅ Check if all fields are provided
    if (!name || !rollNumber || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already registered" });
    }

    // ✅ Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new student
    const newStudent = new Student({
      name,
      rollNumber,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // ✅ Save student to DB
    await newStudent.save();

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Student registered successfully",
      student: {
        id: newStudent._id,
        StudentName: newStudent.name,
        rollNumber: newStudent.rollNumber,
        email: newStudent.email,
        phoneNumber: newStudent.phoneNumber,
        token,
      },
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // ✅ Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Check password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful",
      student: {
        id: student._id,
        StudentName: student.name,
        rollNumber: student.rollNumber,
        email: student.email,
        phoneNumber: student.phoneNumber,
        token,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const requestOuting = async (req, res) => {
  try {
    // ✅ Get studentId from the token (added by `protect` middleware)
    const studentId = req.user.id;

    const { hostelName, roomNumber, purpose, date, parentPhoneNumber } = req.body;
    
    // ✅ Find the student using the validated token ID
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ✅ Generate OTP
    const otp = generateOTP();

    // ✅ Update student's outing request
    student.outingRequest = {
      hostelName,
      roomNumber,
      purpose,
      date,
      parentPhoneNumber,
      otp,
      isVerified: false,
      status: "pending", // Default status
    };

    await student.save();

    // ✅ Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP for outing verification is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: parentPhoneNumber,
    });

    res.status(200).json({ message: "OTP sent to parent's phone number." });

  } catch (error) {
    console.error("Error in requestOuting:", error);
    res.status(500).json({ error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    // ✅ Get studentId from the token (validated by `protect` middleware)
    const studentId = req.user.id;

    const { enteredOtp } = req.body;

    // ✅ Find the student using the authenticated token ID
    const student = await Student.findById(studentId);
    
    if (!student || !student.outingRequest) {
      return res.status(404).json({ message: "Outing request not found" });
    }

    // ✅ Check if OTP is correct
    if (student.outingRequest.otp !== enteredOtp) {
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    // ✅ Mark outing request as verified
    student.outingRequest.isVerified = true;
    student.outingRequest.otp = null; // Remove OTP after verification
    await student.save();

    // ✅ Find the warden (assuming only one exists)
    let warden = await Warden.findOne();
    
    if (!warden) {
      return res.status(404).json({ message: "Warden not found" });
    }

    // ✅ Add outing request to warden's records
    warden.outingRecords.push({
      studentId: student._id,
      studentName: student.name,
      rollNumber: student.rollNumber,
      hostelName: student.outingRequest.hostelName,
      roomNumber: student.outingRequest.roomNumber,
      purpose: student.outingRequest.purpose,
      date: student.outingRequest.date,
      status: "pending"
    });

    await warden.save();

    res.status(200).json({ message: "OTP verified. Outing request sent to warden." });

  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getStudentHistory = async (req, res) => {
  try {
    // ✅ Get studentId from the token (validated by `protect` middleware)
    const studentId = req.user.id;

    // ✅ Find the student using authenticated token ID
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ history: student.outingHistory });

  } catch (error) {
    console.error("Error in getStudentHistory:", error);
    res.status(500).json({ error: error.message });
  }
};
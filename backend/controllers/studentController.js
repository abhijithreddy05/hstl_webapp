import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import dotenv from "dotenv";
import Student from "../models/Student.js";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Generate a random 6-digit OTP
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
    const { studentId, hostelName, roomNumber, purpose, date, parentPhoneNumber } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const otp = generateOTP();

    // Update student's outing request
    student.outingRequest = {
      hostelName,
      roomNumber,
      purpose,
      date,
      parentPhoneNumber,
      otp,
      isVerified: false
    };

    await student.save();

    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP for outing verification is: ${otp}`,
      from: twilioPhoneNumber,
      to: parentPhoneNumber
    });

    res.status(200).json({ message: "OTP sent to parent's phone number." });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { studentId, enteredOtp } = req.body;

    const student = await Student.findById(studentId);

    if (!student || !student.outingRequest) {
      return res.status(404).json({ message: "Outing request not found" });
    }

    if (student.outingRequest.otp !== enteredOtp) {
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    // Mark as verified and clear OTP
    student.outingRequest.isVerified = true;
    student.outingRequest.otp = null;
    await student.save();

    res.status(200).json({ message: "OTP verified successfully. Outing request approved." });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
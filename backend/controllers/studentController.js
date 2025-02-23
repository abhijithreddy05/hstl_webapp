import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

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
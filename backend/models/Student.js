import mongoose from "mongoose";

const outingRequestSchema = new mongoose.Schema({
  hostelName: { type: String, required: true },
  roomNumber: { type: String, required: true },
  purpose: { type: String, required: true },
  date: { type: Date, required: true },
  parentPhoneNumber: { type: String, required: true },
  otp: { type: String }, // Store OTP temporarily
  isVerified: { type: Boolean, default: false } // Track OTP verification
}, { timestamps: true });

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  outingRequest: outingRequestSchema // Nested outing request inside student model
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;
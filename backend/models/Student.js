import mongoose from "mongoose";

const outingRequestSchema = new mongoose.Schema({
  hostelName: { type: String, required: true },
  roomNumber: { type: String, required: true },
  purpose: { type: String, required: true },
  date: { type: Date, required: true },
  parentPhoneNumber: { type: String, required: true },
  otp: { type: String }, // Store OTP temporarily
  isVerified: { type: Boolean, default: false }, // Track OTP verification
  status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" } // Status tracking
}, { timestamps: true });

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  outingRequest: outingRequestSchema, // Active outing request
  outingHistory: [outingRequestSchema] // Store past requests (Approved/Declined)
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;
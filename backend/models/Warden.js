import mongoose from "mongoose";

const outingRecordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  studentName: String,
  rollNumber: String,
  hostelName: String,
  roomNumber: String,
  purpose: String,
  date: Date,
  status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" }
}, { timestamps: true });

const wardenSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  outingRecords: [outingRecordSchema] // Store all outing requests
}, { timestamps: true });

const Warden = mongoose.model("Warden", wardenSchema);

export default Warden;
import mongoose from "mongoose";

const wardenSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },  // ✅ Unique Email
  password: { type: String, required: true },
}, { timestamps: true });

const Warden = mongoose.model("Warden", wardenSchema);

export default Warden;
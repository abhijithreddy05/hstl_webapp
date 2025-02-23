import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 2000;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ✅ Routes
app.use("/api/students", studentRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
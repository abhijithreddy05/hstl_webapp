import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit the process if DB connection fails
  });

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
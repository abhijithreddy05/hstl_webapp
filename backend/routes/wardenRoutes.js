import express from "express";
import { registerWarden, loginWarden,getOutingRequests,updateOutingStatus } from "../controllers/wardenController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", registerWarden); // ✅ Warden Registration
router.post("/login", loginWarden);     // ✅ Warden Login
router.get("/outing-requests",protect, getOutingRequests);
router.patch("/update-status",protect, updateOutingStatus);

export default router;
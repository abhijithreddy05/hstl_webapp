import express from "express";
import { registerWarden, loginWarden,getOutingRequests,updateOutingStatus } from "../controllers/wardenController.js";

const router = express.Router();

router.post("/signup", registerWarden); // ✅ Warden Registration
router.post("/login", loginWarden);     // ✅ Warden Login
router.get("/outing-requests", getOutingRequests);
router.patch("/update-status", updateOutingStatus);

export default router;
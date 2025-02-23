import express from "express";
import { registerWarden, loginWarden } from "../controllers/wardenController.js";

const router = express.Router();

router.post("/signup", registerWarden); // ✅ Warden Registration
router.post("/login", loginWarden);     // ✅ Warden Login

export default router;
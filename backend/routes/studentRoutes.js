import { Router } from "express";
import { registerStudent,loginStudent,requestOuting, verifyOTP } from "../controllers/studentController.js";

const router = Router();

router.post("/signup", registerStudent);
router.post("/login", loginStudent);
router.post("/outing/request", requestOuting);
router.post("/outing/verify", verifyOTP);

export default router;
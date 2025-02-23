import { Router } from "express";
import { registerStudent,loginStudent,requestOuting, verifyOTP,getStudentHistory } from "../controllers/studentController.js";

const router = Router();

router.post("/signup", registerStudent);
router.post("/login", loginStudent);
router.post("/-outing/request", requestOuting);
router.post("/-outing/verify", verifyOTP);
router.get("/history/:studentId", getStudentHistory);
export default router;
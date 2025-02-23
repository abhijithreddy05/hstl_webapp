import { Router } from "express";
import { registerStudent,loginStudent,requestOuting, verifyOTP,getStudentHistory } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/signup", registerStudent);
router.post("/login", loginStudent);
router.post("/outing/request",protect,requestOuting);
router.post("/outing/verify",protect, verifyOTP);
router.get("/history/:studentId", protect,getStudentHistory);
export default router;
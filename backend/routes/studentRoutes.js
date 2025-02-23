import { Router } from "express";
import { registerStudent } from "../controllers/studentController.js";

const router = Router();

router.post("/signup", registerStudent);

export default router;
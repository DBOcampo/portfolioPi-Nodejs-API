import { Router } from "express";
import { signUp } from "../controllers/SignUpController.js";
const router = Router();

router.post("/api/auth/signup", signUp);


export default router;

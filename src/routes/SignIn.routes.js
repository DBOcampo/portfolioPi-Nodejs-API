import { Router } from "express";
import { signIn } from "../controllers/SignInController.js";
const router = Router();

router.post("/api/auth/signin", signIn);

export default router;

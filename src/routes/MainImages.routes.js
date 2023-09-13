import { Router } from "express";
import {
  getMainImages,
  createMainImages,
  editMainImages,
} from "../controllers/MainImagesController.js";
const router = Router();

router.get("/api/mainImages/traer", getMainImages);
router.post("/api/mainImages/crear", createMainImages);
router.patch("/api/mainImages/editar/:id", editMainImages);

export default router;

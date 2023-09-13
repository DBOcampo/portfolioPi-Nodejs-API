import { Router } from "express";
import {
  getInfo,
  createInfo,
  editInfo,
} from "../controllers/InfoCardController.js";
const router = Router();

router.get("/api/infoCard/traer", getInfo);
router.post("/api/infoCard/crear", createInfo);
router.patch("/api/infoCard/editar/:id", editInfo);

export default router;

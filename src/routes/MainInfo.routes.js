import { Router } from "express";
import {
  getMainInfo,
  createMainInfo,
  editMainInfo,
} from "../controllers/MainInfoController.js";
const router = Router();

router.get("/api/mainInfo/traer", getMainInfo);
router.post("/api/mainInfo/crear", createMainInfo);
router.patch("/api/mainInfo/editar/:id", editMainInfo);

export default router;

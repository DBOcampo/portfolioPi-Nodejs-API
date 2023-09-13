import { Router } from "express";
import {
  getProyect,
  createProyect,
  deleteProyect,
  editProyect,
} from "../controllers/ProyectsController.js";
const router = Router();

router.get("/api/Proyects/traer", getProyect);
router.post("/api/Proyects/crear", createProyect);
router.delete("/api/Proyects/borrar/:id", deleteProyect);
router.patch("/api/Proyects/editar/:id", editProyect);

export default router;

import { Router } from "express";
import {
  getSkillHs,
  createSkillHs,
  deleteSkillHs,
  editSkillHs,
} from "../controllers/skillHsController.js";
const router = Router();

router.get("/api/skillHs/traer", getSkillHs);
router.post("/api/skillHs/crear", createSkillHs);
router.delete("/api/skillHs/borrar/:id", deleteSkillHs);
router.patch("/api/skillHs/editar/:id", editSkillHs);

export default router;

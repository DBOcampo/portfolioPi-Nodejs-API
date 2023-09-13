import { Router } from "express";
import {
  getSkillDi,
  createSkillDi,
  deleteSkillDi,
  editSkillDi,
} from "../controllers/skillDiController.js";
const router = Router();

router.get("/api/skillDi/traer", getSkillDi);
router.post("/api/skillDi/crear", createSkillDi);
router.delete("/api/skillDi/borrar/:id", deleteSkillDi);
router.patch("/api/skillDi/editar/:id", editSkillDi);

export default router;

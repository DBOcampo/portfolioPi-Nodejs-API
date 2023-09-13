import { Router } from "express";
import {
  getList,
  createList,
  deleteList,
  editList,
} from "../controllers/ExpListController.js";
const router = Router();

router.get("/api/ExpList/traer", getList);
router.post("/api/ExpList/crear", createList);
router.delete("/api/ExpList/borrar/:id", deleteList);
router.patch("/api/ExpList/editar/:id", editList);

export default router;

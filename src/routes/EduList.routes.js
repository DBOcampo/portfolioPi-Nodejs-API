import { Router } from "express";
import {
  getList,
  createList,
  deleteList,
  editList,
} from "../controllers/EduListController.js";
const router = Router();

router.get("/api/EduList/traer", getList);
router.post("/api/EduList/crear", createList);
router.delete("/api/EduList/borrar/:id", deleteList);
router.patch("/api/EduList/editar/:id", editList);

export default router;

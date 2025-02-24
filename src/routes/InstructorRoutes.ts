import { Router } from "express";
import InstructorController from "../controllers/InstructorController";

const router = Router();

router.post("/instructor", InstructorController.create);
router.get("/instructor/:id", InstructorController.getById);
router.get("/instructor", InstructorController.getAll);
router.put("/instructor/:id", InstructorController.update);
router.delete("/instructor/:id", InstructorController.delete);

export default router;
import { Router } from "express";
import ClassController from "../controllers/ClassController";

const router = Router();

router.post("/class", ClassController.create);
router.get("/class/:id", ClassController.getById);
router.get("/class", ClassController.getAll);

export default router;

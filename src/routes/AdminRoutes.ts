import { Router } from "express";
import AdminController from '../controllers/AdminController';

const router = Router();

router.post("/admin", AdminController.create);
router.get("/admin", AdminController.getByEmail);

export default router;

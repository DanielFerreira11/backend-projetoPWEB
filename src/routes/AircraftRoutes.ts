import { Router } from "express";
import AircraftController from "../controllers/AircraftController";

const router = Router();

router.post("/aircraft", AircraftController.create);
router.get("/aircraft/:id", AircraftController.getById);

export default router;

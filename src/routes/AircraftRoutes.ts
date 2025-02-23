import { Router } from "express";
import AircraftController from "../controllers/AircraftController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Aircraft
 *   description: Aircraft routes
 */

/**
 * @swagger
 * /aircraft:
 *   post:
 *     summary: Create a new aircraft
 *     description: Adds a new aircraft to the system.
 *     tags: [Aircraft]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - model
 *               - register
 *               - status
 *             properties:
 *               model:
 *                 type: string
 *                 example: "Boeing 737"
 *               register:
 *                 type: string
 *                 example: "ABC-123"
 *               status:
 *                 type: string
 *                 enum: ["Available", "Under maintenance"]
 *                 example: "Available"
 *     responses:
 *       201:
 *         description: Aircraft successfully created
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Any other error
 */
router.post("/aircraft", AircraftController.create);

/**
 * @swagger
 * /aircraft/{id}:
 *   get:
 *     summary: Get an aircraft by ID
 *     description: Retrieves aircraft details based on the provided ID.
 *     tags: [Aircraft]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the aircraft to be retrieved
 *     responses:
 *       200:
 *         description: Aircraft details successfully retrieved
 *       404:
 *         description: Aircraft not found
 */
router.get("/aircraft/:id", AircraftController.getById);

router.put("/aircraft/:id", AircraftController.update);

router.delete("/aircraft/:id", AircraftController.delete);

export default router;
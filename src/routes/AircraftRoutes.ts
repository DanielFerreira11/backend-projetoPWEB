import { Router } from "express";
import AircraftController from "../controllers/AircraftController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Aircraft
 *   description: Aircraft management routes
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
 *         description: Internal server error
 */
router.post("/aircraft", authenticate, AircraftController.create);

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

/**
 * @swagger
 * /aircraft/{id}:
 *   put:
 *     summary: Update an aircraft by ID
 *     description: Updates the details of an existing aircraft.
 *     tags: [Aircraft]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the aircraft to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 example: "Airbus A320"
 *                 nullable: true
 *               register:
 *                 type: string
 *                 example: "XYZ-789"
 *                 nullable: true
 *               status:
 *                 type: string
 *                 enum: ["Available", "Under maintenance"]
 *                 example: "Under maintenance"
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Aircraft successfully updated
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Aircraft not found
 *       500:
 *         description: Internal server error
 */
router.put("/aircraft/:id", authenticate, AircraftController.update);

/**
 * @swagger
 * /aircraft/{id}:
 *   delete:
 *     summary: Delete an aircraft by ID
 *     description: Removes an aircraft from the system.
 *     tags: [Aircraft]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the aircraft to be deleted
 *     responses:
 *       200:
 *         description: Aircraft successfully deleted
 *       404:
 *         description: Aircraft not found
 *       500:
 *         description: Internal server error
 */
router.delete("/aircraft/:id", authenticate, AircraftController.delete);

export default router;

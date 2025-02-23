import { Router } from "express";
import ClassController from "../controllers/ClassController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Class
 *   description: Class management routes
 */

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Create a new class
 *     description: Adds a new class to the system.
 *     tags: [Class]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - schedule
 *               - instructorId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Class 1"
 *               schedule:
 *                 type: string
 *                 example: "Monday and Wednesday at 6 PM"
 *               instructorId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       201:
 *         description: Class successfully created
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post("/class", ClassController.create);

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get a class by ID
 *     description: Retrieves class details based on the provided ID.
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the class to be retrieved
 *     responses:
 *       200:
 *         description: Class details successfully retrieved
 *       404:
 *         description: Class not found
 */
router.get("/class/:id", ClassController.getById);

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all classes
 *     description: Retrieves a list of all available classes.
 *     tags: [Class]
 *     responses:
 *       200:
 *         description: List of classes successfully retrieved
 */
router.get("/class", ClassController.getAll);

/**
 * @swagger
 * /class/{id}:
 *   put:
 *     summary: Update a class by ID
 *     description: Updates the details of an existing class.
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the class to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Advanced Mathematics"
 *               schedule:
 *                 type: string
 *                 example: "Tuesday and Thursday at 4 PM"
 *               instructorId:
 *                 type: string
 *                 example: "987e6543-e21b-45d3-b654-567894321000"
 *               aircraftId:
 *                 type: string
 *                 example: "ba3b008a-b483-4eaa-9569-f5830d7477c2"
 *     responses:
 *       200:
 *         description: Class successfully updated
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Class not found
 *       500:
 *         description: Internal server error
 */
router.put("/class/:id", ClassController.update);

/**
 * @swagger
 * /class/{id}:
 *   delete:
 *     summary: Delete a class by ID
 *     description: Removes a class from the system.
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the class to be deleted
 *     responses:
 *       200:
 *         description: Class successfully deleted
 *       404:
 *         description: Class not found
 *       500:
 *         description: Internal server error
 */
router.delete("/class/:id", ClassController.delete);

export default router;

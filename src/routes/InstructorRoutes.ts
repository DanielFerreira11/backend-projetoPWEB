import { Router } from "express";
import InstructorController from "../controllers/InstructorController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Instructor
 *   description: Instructor management routes
 */

/**
 * @swagger
 * /instructor:
 *   post:
 *     summary: Create a new instructor
 *     description: Adds a new instructor to the system.
 *     tags: [Instructor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Smith"
 *               email:
 *                 type: string
 *                 example: "jane.smith@example.com"
 *              password:
 *                 type: string
 *                 example: "securepassword"
 *               phone:
 *                 type: string
 *                 example: "+1-555-1234"
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Instructor successfully created
 *       400:
 *         description: Invalid request data
 *       409:
 *         description: Instructor already exists
 *       500:
 *         description: Internal server error
 */
router.post("/instructor", InstructorController.create);

/**
 * @swagger
 * /instructor/{id}:
 *   get:
 *     summary: Get an instructor by ID
 *     description: Retrieves instructor details based on the provided ID.
 *     tags: [Instructor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the instructor to be retrieved
 *     responses:
 *       200:
 *         description: Instructor details successfully retrieved
 *       404:
 *         description: Instructor not found
 */
router.get("/instructor/:id", InstructorController.getById);

/**
 * @swagger
 * /instructor:
 *   get:
 *     summary: Get all instructors
 *     description: Retrieves a list of all available instructors.
 *     tags: [Instructor]
 *     responses:
 *       200:
 *         description: List of instructors successfully retrieved
 *       404:
 *         description: Instructor not found
 */
router.get("/instructor", InstructorController.getAll);

/**
 * @swagger
 * /instructor/{id}:
 *   put:
 *     summary: Update an instructor by ID
 *     description: Updates the details of an existing instructor. All fields are optional.
 *     tags: [Instructor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the instructor to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *                 nullable: true
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *                 nullable: true
 *              password:
 *                 type: string
 *                 example: "securepassword"
 *                 nullable: true
 *               phone:
 *                 type: string
 *                 example: "+1-555-5678"
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Instructor successfully updated
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Internal server error
 */
router.put("/instructor/:id", InstructorController.update);

/**
 * @swagger
 * /instructor/{id}:
 *   delete:
 *     summary: Delete an instructor by ID
 *     description: Removes an instructor from the system.
 *     tags: [Instructor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the instructor to be deleted
 *     responses:
 *       200:
 *         description: Instructor successfully deleted
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Internal server error
 */
router.delete("/instructor/:id", InstructorController.delete);

export default router;

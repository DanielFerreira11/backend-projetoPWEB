import { Router } from "express";
import StudentController from "../controllers/StudentController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student management routes
 */

/**
 * @swagger
 * /student:
 *   post:
 *     summary: Create a new student
 *     description: Adds a new student to the system.
 *     tags: [Student]
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
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Alice Johnson"
 *               email:
 *                 type: string
 *                 example: "alice.johnson@example.com"
 *              password:
 *                 type: string
 *                 example: "securepassword"
 *               phone:
 *                 type: string
 *                 example: "+1-555-9876"
 *                 nullable: true
 *               status:
 *                 type: string
 *                 enum: ["Active", "Inactive"]
 *                 example: "Active"
 *               classId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Student successfully created
 *       400:
 *         description: Invalid request data
 *       409:
 *         description: Student already exists
 *       500:
 *         description: Internal server error
 */
router.post("/student", StudentController.create);

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: Get a student by ID
 *     description: Retrieves student details based on the provided ID.
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student to be retrieved
 *     responses:
 *       200:
 *         description: Student details successfully retrieved
 *       404:
 *         description: Student not found
 */
router.get("/student/:id", StudentController.getById);

/**
 * @swagger
 * /student/{id}:
 *   put:
 *     summary: Update a student by ID
 *     description: Updates the details of an existing student. All fields are optional.
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Alice Johnson"
 *                 nullable: true
 *               email:
 *                 type: string
 *                 example: "alice.johnson@example.com"
 *                 nullable: true
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *                 nullable: true
 *               phone:
 *                 type: string
 *                 example: "+1-555-9876"
 *                 nullable: true
 *               status:
 *                 type: string
 *                 enum: ["Active", "Inactive"]
 *                 example: "Inactive"
 *                 nullable: true
 *               classId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Student successfully updated
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.put("/student/:id", authenticate, StudentController.update);

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     description: Removes a student from the system.
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student to be deleted
 *     responses:
 *       200:
 *         description: Student successfully deleted
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.delete("/student/:id", authenticate, StudentController.delete);

export default router;

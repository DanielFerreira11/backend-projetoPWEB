import { Router } from "express";
import AdminController from "../controllers/AdminController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

/**
 * @swagger
 * /admin:
 *   post:
 *     summary: Create a new admin
 *     description: Adds a new admin to the system.
 *     tags: [Admin]
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
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *               role:
 *                 type: string
 *                 example: "master"
 *     responses:
 *       201:
 *         description: Admin successfully created
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Any other error
 */
router.post("/admin", AdminController.create);

/**
 * @swagger
 * /admin/{email}:
 *   get:
 *     summary: Get an admin by email
 *     description: Retrieves admin information based on the provided email.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the admin to be retrieved
 *     responses:
 *       200:
 *         description: Admin details successfully retrieved
 *       404:
 *         description: Admin not found
 */
router.get("/admin/:email", AdminController.getByEmail);

export default router;
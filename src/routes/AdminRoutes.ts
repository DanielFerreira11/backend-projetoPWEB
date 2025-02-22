import { Router } from "express";
import AdminController from "../controllers/AdminController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin routes
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

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     summary: Update an admin by ID
 *     description: Updates the details of an existing admin.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the admin to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               instructorId:
 *                 type: string
 *                 example: "386a3b61-ee6a-410d-95b1-db4818b6bfe4"
 *               password:
 *                 type: string
 *                 example: "newsecurepassword"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Admin successfully updated
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
router.put("/admin/:id", AdminController.update);

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Delete an admin by ID
 *     description: Removes an admin from the system.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the admin to be deleted
 *     responses:
 *       200:
 *         description: Admin successfully deleted
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */

router.delete("/admin/:id", AdminController.delete);

export default router;
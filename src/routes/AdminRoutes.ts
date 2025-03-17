import { Router } from "express";
import AdminController from "../controllers/AdminController";
import { authenticate } from "../middlewares/authMiddleware";

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
 *                 enum: ["President", "Vice president", "Secretary", "Treasurer"]
 *                 example: "Secretary"
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
 * /admin/{id}:
 *   get:
 *     summary: Get an admin by id
 *     description: Retrieves admin information based on the provided id.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the admin to be retrieved
 *     responses:
 *       200:
 *         description: Admin details successfully retrieved
 *       404:
 *         description: Admin not found
 */
router.get("/admin/:id", AdminController.getById);

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
 *                 nullable: true
 *               password:
 *                 type: string
 *                 example: "newsecurepassword"
 *                 nullable: true
 *               role:
 *                 type: string
 *                 enum: ["President", "Vice president", "Secretary", "Treasurer"]
 *                 example: "Vice president"
 *                 nullable: true
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
router.put("/admin/:id", authenticate, AdminController.update);

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

router.delete("/admin/:id", authenticate, AdminController.delete);

export default router;
import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticação
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza a autenticação do usuário
 *     description: Verifica as credenciais e retorna um token JWT.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@exemplo.com"
 *               password:
 *                 type: string
 *                 example: "senhaSecreta"
 *     responses:
 *       200:
 *         description: Autenticação bem sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt-token-aqui"
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/auth/login", AuthController.login);

export default router;

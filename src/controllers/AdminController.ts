import { Request, Response } from "express";
import AdminService from '../services/AdminService';
import { z } from "zod";

const CreateAdminSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
});

class AdminController {
  async create(req: Request, res: Response): Promise<void> {
    const validationPayload = CreateAdminSchema.safeParse(req.body);

    if (!validationPayload.success) {
      res.status(400).json({ error: validationPayload.error.errors });
      return;
    }

    try {
      const admin = await AdminService.create(validationPayload.data);
      res.status(201).json(admin);
      return;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      return;
    }
  }

  async getByEmail(req: Request, res: Response): Promise<void> {
    try {
      const email = req.query.email as string;
      const admin = await AdminService.getByEmail(email);
      res.json(admin);
      return;
    } catch (error: any) {
      res.status(404).json({ message: "Admin not founded", error: error.message });
      return;
    }
  }
}

export default new AdminController();

import { Request, Response } from "express";
import AdminService from '../services/AdminService';
import { z } from "zod";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";

const CreateAdminSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  instructorId: z.string().uuid().optional(),
  password: z.string(),
  role: z.string(),
});

const UpdateAdminSchema = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
  instructorId: z.string().optional(),
  role: z.string().optional(),
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
      const email = req.params.email as string;
      const admin = await AdminService.getByEmail(email);
      res.json(admin);
      return;
    } catch (error: any) {
      res.status(404).json({ message: "Admin not found", error: error.message });
      return;
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const validationPayload = UpdateAdminSchema.safeParse(req.body);

    if (!validationPayload.success) {
      res.status(400).json({ error: validationPayload.error.errors });
      return;
    }

    try {
      const id = req.params.id as string;
      const updatedAdmin = await AdminService.update(id, validationPayload.data);
      res.status(200).json(updatedAdmin);
      return;
    } catch (error: any) {
      if (error instanceof UserNotFoundException) {
        res.status(404).json({ error: error.message });
        return;
      } else {
        res.status(500).json({ error: error.message });
        return;
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await AdminService.delete(id);
      res.status(200).json();
      return;
    } catch (error: any) {
      if (error instanceof UserNotFoundException) {
        res.status(404).json({ error: error.message });
        return;
      } else {
        res.status(500).json({ error: error.message });
        return;
      }
    }
  }
}

export default new AdminController();

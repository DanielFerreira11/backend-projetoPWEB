import { Request, Response } from "express";
import ClassService from "../services/ClassService";
import { z } from "zod";

const CreateClassSchema = z.object({
  name: z.string(),
  schedule: z.string(),
  instructorId: z.string().uuid(),
});

class ClassController {
  async create(req: Request, res: Response): Promise<void> {
    const validationPayload = CreateClassSchema.safeParse(req.body);

    if (!validationPayload.success) {
      res.status(400).json({ error: validationPayload.error.errors });
      return;
    }

    try {
      const newClass = await ClassService.create(validationPayload.data);
      res.status(201).json(newClass);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const classData = await ClassService.getById(id);

      if (!classData) {
        res.status(404).json({ message: "Class not found" });
        return;
      }

      res.json(classData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const classes = await ClassService.getAll();
      res.json(classes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ClassController();

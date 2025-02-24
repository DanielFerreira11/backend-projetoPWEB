import { Request, Response } from "express";
import { Exception } from "../exceptions/Exception";
import InstructorService from "../services/InstructorService";

class InstructorController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const createdInstructor = await InstructorService.create(req.body);
      res.status(201).json(createdInstructor);
      return;
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      } else {
        res.status(500).json({ error: 'Internal server error.' })
        return;
      }
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const instructor = await InstructorService.getById(id);
      res.status(200).json(instructor);
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      } else {
        res.status(500).json({ error: 'Internal server error.' })
        return;
      }
    }
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const instructors = await InstructorService.getAll();
      res.status(200).json(instructors);
      return;
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      } else {
        res.status(500).json({ error: 'Internal server error.' })
        return;
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const updatedInstructor = await InstructorService.update(id, req.body);
      res.status(200).json(updatedInstructor);
      return;
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      } else {
        res.status(500).json({ error: 'Internal server error.' })
        return;
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await InstructorService.delete(id);
      res.status(200).json();
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      } else {
        res.status(500).json({ error: 'Internal server error.' })
        return;
      }
    }
  }
}

export default new InstructorController();

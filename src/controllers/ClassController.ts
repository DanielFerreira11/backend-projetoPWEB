import { Request, Response } from "express";
import ClassService from "../services/ClassService";
import { Exception } from "../exceptions/Exception";

class ClassController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const createdClass = await ClassService.create(req.body);
      res.status(201).json(createdClass);
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal server error." });
      }
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const classData = await ClassService.getById(id);
      res.status(200).json(classData);
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal server error." });
      }
    }
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const classes = await ClassService.getAll();
      res.status(200).json(classes);
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal server error." });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const updatedClass = await ClassService.update(id, req.body);
      res.status(200).json(updatedClass);
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal server error." });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await ClassService.delete(id);
      res.status(200).json();
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal server error." });
      }
    }
  }
}

export default new ClassController();

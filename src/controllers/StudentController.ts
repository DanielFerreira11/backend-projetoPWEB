import { Request, Response } from "express";
import { Exception } from "../exceptions/Exception";
import StudentService from "../services/StudentService";

class StudentController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const createdStudent = await StudentService.create(req.body);
      res.status(201).json(createdStudent);
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
      const student = await StudentService.getById(id);
      res.status(200).json(student);
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
      const updatedStudent = await StudentService.update(id, req.body);
      res.status(200).json(updatedStudent);
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
      await StudentService.delete(id);
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

export default new StudentController();

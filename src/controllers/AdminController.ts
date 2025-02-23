import { Request, Response } from "express";
import AdminService from "../services/AdminService";
import { Exception } from "../exceptions/Exception";

class AdminController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const admin = await AdminService.create(req.body);
      res.status(201).json(admin);
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
      const admin = await AdminService.getById(id);
      res.json(admin);
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
      const updatedAdmin = await AdminService.update(id, req.body);
      res.status(200).json(updatedAdmin);
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
      await AdminService.delete(id);
      res.status(200).json();
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
}

export default new AdminController();

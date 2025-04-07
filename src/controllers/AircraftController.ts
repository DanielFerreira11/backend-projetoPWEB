import { Request, Response } from "express";
import AircraftService from "../services/AircraftService";
import { Exception } from "../exceptions/Exception";

class AircraftController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const aircraft = await AircraftService.create(req.body);
      res.status(201).json(aircraft);
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Internal server error.' });
      }
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const aircraft = await AircraftService.getById(id);
      res.status(200).json(aircraft);
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Internal server error.' });
      }
    }
  }

  // Novo: listagem de todas as aeronaves
  async list(req: Request, res: Response): Promise<void> {
    try {
      const aircrafts = await AircraftService.getAll();
      res.status(200).json(aircrafts);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const updatedAircraft = await AircraftService.update(id, req.body);
      res.status(200).json(updatedAircraft);
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Internal server error.' });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await AircraftService.delete(id);
      res.status(200).json();
    } catch (err) {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Internal server error.' });
      }
    }
  }
}

export default new AircraftController();

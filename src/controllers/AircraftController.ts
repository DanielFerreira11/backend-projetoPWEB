import { Request, Response } from "express";
import AircraftService from "../services/AircraftService";
import { AircraftNotFoundException } from "../exceptions/AircraftNotFoundException";
import { Exception } from "../exceptions/Exception";

class AircraftController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const aircraft = await AircraftService.create(req.body);
      res.status(201).json(aircraft);
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
      const aircraft = await AircraftService.getById(id);
      res.status(200).json(aircraft);
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
      const updatedAircraft = await AircraftService.update(id, req.body);
      res.status(200).json(updatedAircraft);
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
      await AircraftService.delete(id);
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

export default new AircraftController();

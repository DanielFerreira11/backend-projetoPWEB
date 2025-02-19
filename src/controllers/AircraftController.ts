import { Request, Response } from "express";
import AircraftService from "../services/AircraftService";
import { z } from "zod";

const CreateAircraftSchema = z.object({
    model: z.string(),
    register: z.string(), 
    status: z.enum(["Available", "Under maintenance"]),
  });
  

class AircraftController {
  async create(req: Request, res: Response): Promise<void> {
    const validationPayload = CreateAircraftSchema.safeParse(req.body);

    if (!validationPayload.success) {
      res.status(400).json({ error: validationPayload.error.errors });
      return;
    }

    try {
      const aircraft = await AircraftService.create(validationPayload.data);
      res.status(201).json(aircraft);
      return;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      return;
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const aircraft = await AircraftService.getById(id);
      res.json(aircraft);
      return;
    } catch (error: any) {
      res.status(404).json({ message: "Aircraft not found", error: error.message });
      return;
    }
  }
}

export default new AircraftController();

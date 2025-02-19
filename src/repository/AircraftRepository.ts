import { Aircraft } from "@prisma/client";
import prisma from "../database/prisma";

interface CreateAircraftPayload {
    model: string;
    register: string; 
    status: string;
  }
  

  class AircraftRepository {
    static async create(payload: CreateAircraftPayload): Promise<Aircraft> {
      const aircraft = await prisma.aircraft.create({
        data: {
          model: payload.model,
          register: payload.register,
          status: payload.status,
        },
      });
      return aircraft;
    }
  
    static async findById(id: string): Promise<Aircraft | null> {
      return await prisma.aircraft.findUnique({
        where: { id },
      });
    }
  }
  

export default AircraftRepository;

import { Aircraft } from "@prisma/client";
import prisma from "../database/prisma";

interface CreateAircraftPayload {
  model: string;
  register: string;
  status: string;
}

interface UpdateAircraftPayload {
  model?: string;
  register?: string;
  status?: string;
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

  static async findById(id: Aircraft['id']): Promise<Aircraft | null> {
    const aircraft = await prisma.aircraft.findUnique({
      where: { id },
      include: { classes: true },
    });

    return aircraft;
  }

  static async findByRegister(register: Aircraft['register']): Promise<Aircraft | null> {
    const aircraft = await prisma.aircraft.findUnique({
      where: { register },
    });

    return aircraft;
  }

  static async update(id: Aircraft['id'], payload: UpdateAircraftPayload): Promise<Aircraft> {
    const updatedAircraft = await prisma.aircraft.update({
      where: { id },
      data: {
        model: payload.model,
        register: payload.register,
        status: payload.status,
      },
      include: { classes: true },
    });

    return updatedAircraft;
  }

  static async deleteById(id: Aircraft['id']) {
    return await prisma.aircraft.delete({
      where: { id },
    });
  }
}

export default AircraftRepository;

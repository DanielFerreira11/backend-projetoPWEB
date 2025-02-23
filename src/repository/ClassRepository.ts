import { Class } from "@prisma/client";
import prisma from "../database/prisma";

interface CreateClassPayload {
  name: string;
  schedule: string;
  instructorId?: string;
  aircraftId?: string;
}

interface UpdateClassPayload {
  name?: string;
  schedule?: string;
  instructorId?: string;
  aircraftId?: string;
}

class ClassRepository {
  static async create(payload: CreateClassPayload): Promise<Class> {
    const classGroup = await prisma.class.create({
      data: {
        name: payload.name,
        schedule: payload.schedule,
        instructorId: payload.instructorId,
        aircraftId: payload.aircraftId,
      },
      include: { instructor: true, aircraft: true },
    });

    return classGroup;
  }

  static async findById(id: Class['id']): Promise<Class | null> {
    const classGroup = await prisma.class.findUnique({
      where: { id },
      include: { instructor: true, aircraft: true, students: true },
    });

    return classGroup;
  }

  static async findAll(): Promise<Class[] | null> {
    return await prisma.class.findMany({
      include: { instructor: true, aircraft: true },
    });
  }

  static async update(id: Class['id'], payload: UpdateClassPayload): Promise<Class> {
    const classGroup = await prisma.class.update({
      where: { id },
      data: {
        name: payload.name,
        schedule: payload.schedule,
        instructorId: payload.instructorId,
        aircraftId: payload.aircraftId,
      },
      include: { instructor: true, aircraft: true, students: true },
    });

    return classGroup;
  }

  static async delete(id: Class['id']) {
    await prisma.class.delete({
      where: { id },
    });
  }
}

export default ClassRepository;

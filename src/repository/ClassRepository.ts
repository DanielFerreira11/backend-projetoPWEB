import { Class } from "@prisma/client";
import prisma from "../database/prisma";

interface CreateClassPayload {
  name: string;
  schedule: string;
  instructorId: string;
}

interface UpdateClassPayload {
  name?: string;
  schedule?: string;
  instructorId?: string;
}

class ClassRepository {
  static async create(payload: CreateClassPayload): Promise<Class> {
    const cls = await prisma.class.create({
      data: {
        name: payload.name,
        schedule: payload.schedule,
        instructorId: payload.instructorId,
      },
      include: { instructor: true },
    });
    return cls;
  }

  static async findById(id: Class["id"]): Promise<Class | null> {
    return await prisma.class.findUnique({
      where: { id },
      include: { instructor: true },
    });
  }

  static async findAll(): Promise<Class[] | null> {
    return await prisma.class.findMany({
      include: { instructor: true },
    });
  }

  static async update(id: Class["id"], payload: UpdateClassPayload): Promise<Class> {
    const cls = await prisma.class.update({
      where: { id },
      data: {
        name: payload.name,
        schedule: payload.schedule,
        instructorId: payload.instructorId,
      },
      include: { instructor: true },
    });
    return cls;
  }

  static async delete(id: Class["id"]) {
    await prisma.class.delete({
      where: { id },
    });
  }
}

export default ClassRepository;

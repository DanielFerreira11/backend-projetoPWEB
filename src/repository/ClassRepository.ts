import { Class } from "@prisma/client";
import prisma from "../database/prisma";

interface CreateClassPayload {
  name: string;
  schedule: string;
  instructorId: string;
}

class ClassRepository {
  static async create(payload: CreateClassPayload): Promise<Class> {
    return await prisma.class.create({ data: payload });
  }

  static async findById(id: string): Promise<Class | null> {
    return await prisma.class.findUnique({
      where: { id },
      include: { instructor: true, students: true },
    });
  }

  static async findAll(): Promise<Class[]> {
    return await prisma.class.findMany({
      include: { instructor: true, students: true },
    });
  }
}

export default ClassRepository;

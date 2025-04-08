import { Instructor } from "@prisma/client";
import prisma from "../database/prisma";

interface CreateInstructorPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface UpdateInstructorPayload {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

class InstructorRepository {
  static async create(payload: CreateInstructorPayload): Promise<Instructor> {
    const instructor = await prisma.instructor.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
      },
    });
    return instructor;
  }

  static async findById(id: Instructor["id"]): Promise<Instructor | null> {
    return await prisma.instructor.findUnique({
      where: { id },
      include: { classes: true },
    });
  }

  static async findByEmail(email: Instructor["email"]): Promise<Instructor | null> {
    return await prisma.instructor.findUnique({
      where: { email },
    });
  }

  static async findAll(): Promise<Instructor[] | null> {
    return await prisma.instructor.findMany({
      include: { classes: true },
    });
  }

  static async update(id: Instructor["id"], payload: UpdateInstructorPayload): Promise<Instructor> {
    const instructor = await prisma.instructor.update({
      where: { id },
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
      },
      include: { classes: true },
    });
    return instructor;
  }

  static async delete(id: Instructor["id"]) {
    await prisma.instructor.delete({
      where: { id },
    });
  }
}

export default InstructorRepository;

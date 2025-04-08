import { Student } from "@prisma/client";
import prisma from "../database/prisma";

interface CreateStudentPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  status: string;
  classId?: string;
}

interface UpdateStudentPayload {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  status?: string;
  classId?: string;
}

class StudentRepository {
  static async create(payload: CreateStudentPayload): Promise<Student> {
    const student = await prisma.student.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        status: payload.status,
        classId: payload.classId,
      },
    });
    return student;
  }

  static async findById(id: Student["id"]): Promise<Student | null> {
    return await prisma.student.findUnique({
      where: { id },
    });
  }

  static async findByEmail(email: Student["email"]): Promise<Student | null> {
    return await prisma.student.findUnique({
      where: { email },
    });
  }

  static async update(id: Student["id"], payload: UpdateStudentPayload): Promise<Student> {
    const student = await prisma.student.update({
      where: { id },
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        status: payload.status,
        classId: payload.classId,
      },
    });
    return student;
  }

  static async delete(id: Student["id"]) {
    await prisma.student.delete({
      where: { id },
    });
  }
}

export default StudentRepository;

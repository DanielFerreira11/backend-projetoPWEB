import { z } from "zod";
import { InvalidPayloadDataException } from "../exceptions/InvalidPayloadDataException";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { AlreadyExistsException } from "../exceptions/AlreadyExistsException";
import ClassRepository from "../repository/ClassRepository";
import { ClassNotFoundException } from "../exceptions/ClassNotFoundException";
import StudentRepository from "../repository/StudentRepository";
import { hashPassword } from "../utils/auth";

const createStudentSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string().optional(),
  status: z.enum(["Active", "Inactive"]),
  classId: z.string().uuid().optional(),
});

export type CreateStudentPayload = z.infer<typeof createStudentSchema>;

const updateStudentSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).optional(),
  classId: z.string().uuid().optional(),
});

export type UpdateStudentPayload = z.infer<typeof updateStudentSchema>;

class StudentService {
  async create(data: CreateStudentPayload) {
    const validationPayload = createStudentSchema.safeParse(data);
    if (!validationPayload.success)
      throw new InvalidPayloadDataException("Invalid payload data to create a student.");

    const payload = validationPayload.data;

    if (payload.classId != undefined) {
      const classGroup = await ClassRepository.findById(payload.classId);
      if (classGroup == null) throw new ClassNotFoundException();
    }

    const student = await StudentRepository.findByEmail(payload.email);
    if (student != null) throw new AlreadyExistsException("A student with this email already exists");

    const encryptedPassword = await hashPassword(payload.password);
    const payloadWithEncryptedPassword = { ...payload, password: encryptedPassword };

    const createdStudent = await StudentRepository.create(payloadWithEncryptedPassword);
    return createdStudent;
  }

  async getById(id: string) {
    const student = await StudentRepository.findById(id);
    if (student == null) throw new UserNotFoundException("Student not found.");
    return student;
  }

  async update(id: string, data: UpdateStudentPayload) {
    const validationPayload = updateStudentSchema.safeParse(data);
    if (!validationPayload.success)
      throw new InvalidPayloadDataException("Invalid payload data to update a student.");

    const student = await StudentRepository.findById(id);
    if (student == null) throw new UserNotFoundException("Student not found.");

    const payload = validationPayload.data;
    if (payload.classId != undefined) {
      const classGroup = await ClassRepository.findById(payload.classId);
      if (classGroup == null) throw new ClassNotFoundException();
    }

    const updatedStudent = await StudentRepository.update(id, payload);
    return updatedStudent;
  }

  async delete(id: string) {
    const student = await StudentRepository.findById(id);
    if (student == null) throw new UserNotFoundException("Student not found.");
    return await StudentRepository.delete(id);
  }
}

export default new StudentService();

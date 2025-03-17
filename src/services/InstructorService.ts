import { z } from "zod";
import { InvalidPayloadDataException } from "../exceptions/InvalidPayloadDataException";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import InstructorRepository from "../repository/InstructorRepository";
import { AlreadyExistsException } from "../exceptions/AlreadyExistsException";
import { hashPassword } from "../utils/auth";

const createInstructorSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string().optional(),
});

type CreateInstructorPayload = z.infer<typeof createInstructorSchema>;

const updateInstructorSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
});

type UpdateInstructorPayload = z.infer<typeof updateInstructorSchema>;

class InstructorService {
  async create(data: CreateInstructorPayload) {
    const validationPayload = createInstructorSchema.safeParse(data);

    if (!validationPayload.success) throw new InvalidPayloadDataException('Invalid payload data to create a instructor.')

    const payload = validationPayload.data;

    const instructor = await InstructorRepository.findByEmail(payload.email);

    if (instructor != null) throw new AlreadyExistsException('An instructor with this email already exists');

    const encryptedPassword = await hashPassword(payload.password);

    const payloadWithEncryptedPassword = { ...payload, password: encryptedPassword }

    const createdInstructor = await InstructorRepository.create(payloadWithEncryptedPassword);

    return createdInstructor;
  }

  async getById(id: string) {
    const instructor = await InstructorRepository.findById(id);

    if (instructor == null) throw new UserNotFoundException('Instructor not found.');

    return instructor;
  }

  async getAll() {
    const instructors = await InstructorRepository.findAll();

    if (instructors == null) throw new UserNotFoundException('Instructor not found.');

    return instructors;
  }

  async update(id: string, data: UpdateInstructorPayload) {
    const validationPayload = updateInstructorSchema.safeParse(data);
    if (!validationPayload.success) throw new InvalidPayloadDataException('Invalid payload data to update an class.')

    const instructor = await InstructorRepository.findById(id);

    if (instructor == null) throw new UserNotFoundException('Instructor not found.');

    const payload = validationPayload.data;

    const updatedInstructor = await InstructorRepository.update(id, payload);

    return updatedInstructor;
  }

  async delete(id: string) {
    const instructor = await InstructorRepository.findById(id);

    if (instructor == null) throw new UserNotFoundException('Instructor not found.');

    return await InstructorRepository.delete(id);
  }
}

export default new InstructorService();

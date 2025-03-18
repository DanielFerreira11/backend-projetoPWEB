import { z } from "zod";
import ClassRepository from "../repository/ClassRepository";
import { InvalidPayloadDataException } from "../exceptions/InvalidPayloadDataException";
import { ClassNotFoundException } from "../exceptions/ClassNotFoundException";
import InstructorRepository from "../repository/InstructorRepository";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import AircraftRepository from "../repository/AircraftRepository";
import { AircraftNotFoundException } from "../exceptions/AircraftNotFoundException";

const createClassSchema = z.object({
  name: z.string(),
  schedule: z.string(),
  instructorId: z.string().uuid().optional(),
  aircraftId: z.string().uuid().optional(),
});

export type CreateClassPayload = z.infer<typeof createClassSchema>;

const updateClassSchema = z.object({
  name: z.string().optional(),
  schedule: z.string().optional(),
  instructorId: z.string().uuid().optional(),
  aircraftId: z.string().uuid().optional(),
});

export type UpdateClassPayload = z.infer<typeof updateClassSchema>;

class ClassService {
  async create(data: CreateClassPayload) {
    const validationPayload = createClassSchema.safeParse(data);
    if (!validationPayload.success)
      throw new InvalidPayloadDataException('Invalid payload data to create a class.');

    const payload = validationPayload.data;

    if (payload.instructorId !== undefined) {
      const instructor = await InstructorRepository.findById(payload.instructorId);
      if (instructor === null)
        throw new UserNotFoundException('Instructor not found.');
    }

    if (payload.aircraftId !== undefined) {
      const aircraft = await AircraftRepository.findById(payload.aircraftId);
      if (aircraft === null)
        throw new AircraftNotFoundException();
    }

    const createdClass = await ClassRepository.create(payload);
    return createdClass;
  }

  async getById(id: string) {
    const classData = await ClassRepository.findById(id);
    if (classData === null) throw new ClassNotFoundException();
    return classData;
  }

  async getAll() {
    const classes = await ClassRepository.findAll();
    if (classes === null) throw new ClassNotFoundException();
    return classes;
  }

  async update(id: string, data: UpdateClassPayload) {
    const validationPayload = updateClassSchema.safeParse(data);
    if (!validationPayload.success)
      throw new InvalidPayloadDataException('Invalid payload data to update a class.');

    const existingClass = await ClassRepository.findById(id);
    if (existingClass === null) throw new ClassNotFoundException();

    const payload = validationPayload.data;

    if (payload.instructorId !== undefined) {
      const instructor = await InstructorRepository.findById(payload.instructorId);
      if (instructor === null)
        throw new UserNotFoundException('Instructor not found.');
    }

    if (payload.aircraftId !== undefined) {
      const aircraft = await AircraftRepository.findById(payload.aircraftId);
      if (aircraft === null)
        throw new AircraftNotFoundException();
    }

    const updatedClass = await ClassRepository.update(id, payload);
    return updatedClass;
  }

  async delete(id: string) {
    const existingClass = await ClassRepository.findById(id);
    if (existingClass === null) throw new ClassNotFoundException();
    return await ClassRepository.delete(id);
  }
}

export default new ClassService();

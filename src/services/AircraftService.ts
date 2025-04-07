import { z } from "zod";
import { AircraftNotFoundException } from "../exceptions/AircraftNotFoundException";
import AircraftRepository from "../repository/AircraftRepository";  
import { InvalidPayloadDataException } from "../exceptions/InvalidPayloadDataException";
import { AlreadyExistsException } from "../exceptions/AlreadyExistsException";

const createAircraftSchema = z.object({
  model: z.string(),
  register: z.string(),
  status: z.enum(["Available", "Under maintenance"]),
});

export type CreateAircraftPayload = z.infer<typeof createAircraftSchema>;

const updateAircraftSchema = z.object({
  model: z.string().optional(),
  register: z.string().optional(),
  status: z.enum(["Available", "Under maintenance"]).optional(),
});
export type UpdateAircraftPayload = z.infer<typeof updateAircraftSchema>;

class AircraftService {
  async create(data: CreateAircraftPayload) {
    const validationPayload = createAircraftSchema.safeParse(data);
    if (!validationPayload.success)
      throw new InvalidPayloadDataException('Invalid payload data to create an aircraft.');
    
    const payload = validationPayload.data;
    const aircraft = await AircraftRepository.findByRegister(payload.register);
    
    if (aircraft != null)
      throw new AlreadyExistsException('Already exists an aircraft with this register.');
    
    const createdAircraft = await AircraftRepository.create(payload);
    return createdAircraft;
  }

  async getById(id: string) {
    const aircraft = await AircraftRepository.findById(id);
    if (aircraft == null) throw new AircraftNotFoundException;
    return aircraft;
  }

  // Novo: método para obter todas as aeronaves
  async getAll() {
    const aircrafts = await AircraftRepository.findAll();
    return aircrafts;
  }

  async update(id: string, data: UpdateAircraftPayload) {
    const validationPayload = updateAircraftSchema.safeParse(data);
    if (!validationPayload.success)
      throw new InvalidPayloadDataException('Invalid payload data to update an aircraft.');

    const aircraft = await AircraftRepository.findById(id);
    if (aircraft == null) throw new AircraftNotFoundException;

    const payload = validationPayload.data;
    const updatedAircraft = await AircraftRepository.update(id, payload);
    return updatedAircraft;
  }

  async delete(id: string) {
    const aircraft = await AircraftRepository.findById(id);
    if (aircraft == null) throw new AircraftNotFoundException;
    return await AircraftRepository.deleteById(id);
  }
}

export default new AircraftService();

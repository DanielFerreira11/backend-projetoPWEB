import { z } from "zod";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { InvalidPayloadDataException } from "../exceptions/InvalidPayloadDataException";
import { AlreadyExistsException } from "../exceptions/AlreadyExistsException";
import AdminRepository from "../repository/AdminRepository";
import { hashPassword } from "../utils/auth";

const createAdminSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['President', 'Vice president', 'Secretary', 'Treasurer']),
});

type CreateAdminPayload = z.infer<typeof createAdminSchema>;

const updateAdminSchema = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
  role: z.enum(['President', 'Vice president', 'Secretary', 'Treasurer']),
});

type UpdateAdminPayload = z.infer<typeof updateAdminSchema>;

class AdminService {

  async create(data: CreateAdminPayload) {
    const validationPayload = createAdminSchema.safeParse(data);
    if (!validationPayload.success) throw new InvalidPayloadDataException('Invalid payload data to create an admin.');

    const payload = validationPayload.data;

    const admin = await AdminRepository.findByEmail(payload.email);

    if (admin != null) throw new AlreadyExistsException('Already exists an admin with this email.')

    const encryptedPassword = await hashPassword(payload.password);

    const payloadWithEncryptedPassword = { ...payload, password: encryptedPassword }

    const createdAdmin = await AdminRepository.create(payloadWithEncryptedPassword);

    return createdAdmin;
  }

  async getById(id: string) {
    const admin = await AdminRepository.findById(id);
    if (admin == null) throw new UserNotFoundException('Admin not found.');

    return admin;
  }

  async update(id: string, data: UpdateAdminPayload) {
    const validationPayload = updateAdminSchema.safeParse(data);
    if (!validationPayload.success) throw new InvalidPayloadDataException('Invalid payload data to update an admin.');

    const admin = await AdminRepository.findById(id);

    if (admin == null) throw new UserNotFoundException('Admin not found.');

    const payload = validationPayload.data;

    const updatedAdmin = await AdminRepository.update(id, payload);

    return updatedAdmin;
  }

  async delete(id: string) {
    const admin = await AdminRepository.findById(id);
    if (admin == null) throw new UserNotFoundException('Admin not found.');

    return await AdminRepository.delete(id);
  }
}

export default new AdminService();

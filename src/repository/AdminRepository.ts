import { Admin } from '@prisma/client';
import prisma from '../database/prisma';

interface CreateAdminPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

class AdminRepository {
  static async create(payload: CreateAdminPayload): Promise<Admin> {
    const admin = await prisma.admin.create({ data: payload });
    return admin;
  }

  static async findById(id: Admin['id']): Promise<Admin | null> {
    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    return admin;
  }

  static async findByEmail(email: string): Promise <Admin> {
    const admin = await prisma.admin.findUniqueOrThrow({
      where: { email },
    });

    return admin;
  }
}

export default AdminRepository;
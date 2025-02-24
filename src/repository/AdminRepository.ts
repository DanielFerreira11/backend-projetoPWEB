import { Admin } from '@prisma/client';
import prisma from '../database/prisma';

interface CreateAdminPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UpdateAdminPayload {
  name?: string;
  password?: string;
  role?: string;
}

class AdminRepository {
  static async create(payload: CreateAdminPayload): Promise<Admin> {
    const admin = await prisma.admin.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role,
      },
    });

    return admin;
  }

  static async findById(id: Admin['id']): Promise<Admin | null> {
    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    return admin;
  }

  static async findByEmail(email: Admin['email']): Promise<Admin | null> {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    return admin;
  }

  static async update(id: Admin['id'], payload: UpdateAdminPayload): Promise<Admin> {
    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: {
        name: payload.name,
        password: payload.password,
        role: payload.role,
      },
    });

    return updatedAdmin;
  }

  static async delete(id: Admin['id']) {
    await prisma.admin.delete({
      where: { id },
    });
  }
}

export default AdminRepository;
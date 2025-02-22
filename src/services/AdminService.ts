import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import AdminRepository from "../repository/AdminRepository";

class AdminService {
  async create(data: any) {
    return await AdminRepository.create(data);
  }

  async getByEmail(email: string) {
    return await AdminRepository.findByEmail(email);
  }

  async update(id: string, data: any) {
    const admin = await AdminRepository.findById(id);
    if (admin == null) throw new UserNotFoundException;

    return await AdminRepository.update(admin.id, {
      name: data.name,
      password: data.password,
      instructorId: data.instructorId,
      role: data.role,
    });
  }

  async delete(id: string) {
    const admin = await AdminRepository.findById(id);
    if (admin == null) throw new UserNotFoundException;

    return await AdminRepository.delete(id);
  }
}

export default new AdminService();

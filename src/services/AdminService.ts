import AdminRepository from "../repository/AdminRepository";

class AdminService {
  async create(data: any) {
    return await AdminRepository.create(data);
  }

  async getByEmail(email: string) {
    return await AdminRepository.findByEmail(email);
  }
}

export default new AdminService();

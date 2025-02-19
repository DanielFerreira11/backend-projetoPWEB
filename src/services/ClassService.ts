import ClassRepository from "../repository/ClassRepository";

interface CreateClassPayload {
  name: string;
  schedule: string;
  instructorId: string;
}

class ClassService {
  static async create(payload: CreateClassPayload) {
    return await ClassRepository.create(payload);
  }

  static async getById(id: string) {
    return await ClassRepository.findById(id);
  }

  static async getAll() {
    return await ClassRepository.findAll();
  }
}

export default ClassService;

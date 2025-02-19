import AircraftRepository from "../repository/AircraftRepository";

interface CreateAircraftPayload {
    model: string;
    register: string;
    status: string;
  }
  

class AircraftService {
  static async create(payload: CreateAircraftPayload) {
    return await AircraftRepository.create(payload);
  }

  static async getById(id: string) {
    return await AircraftRepository.findById(id);
  }
}

export default AircraftService;

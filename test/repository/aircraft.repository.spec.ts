import { expect } from "chai";
import prisma from "../../src/database/prisma";
import AircraftRepository from "../../src/repository/AircraftRepository";

describe("AircraftRepository", function() {
  before(async function() {
    await prisma.aircraft.deleteMany({});
  });

  after(async function() {
    await prisma.$disconnect();
  });

  it("should create a new aircraft", async function() {
    const payload = {
      model: "Boeing 737",
      register: "ABC-123",
      status: "Available"
    };

    const aircraft = await AircraftRepository.create(payload);
    expect(aircraft).to.have.property("id");
    expect(aircraft.model).to.equal("Boeing 737");
    expect(aircraft.register).to.equal("ABC-123");
    expect(aircraft.status).to.equal("Available");
  });

  it("should find an aircraft by register", async function() {
    const register = "ABC-123";
    const aircraft = await AircraftRepository.findByRegister(register);
    expect(aircraft).to.not.be.null;
    if (aircraft) {
      expect(aircraft.register).to.equal(register);
    }
  });
});

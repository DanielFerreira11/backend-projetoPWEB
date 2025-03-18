import { expect } from "chai";
import AircraftService from "../../src/services/AircraftService";
import prisma from "../../src/database/prisma";
import type { CreateAircraftPayload } from "../../src/services/AircraftService"; 

describe("AircraftService", function() {
  before(async function() {
    await prisma.aircraft.deleteMany({});
  });

  after(async function() {
    await prisma.$disconnect();
  });

  let createdAircraft: any;

  it("should create a new aircraft", async function() {
    const payload: CreateAircraftPayload = {
      model: "Airbus A320",
      register: "XYZ-789",
      status: "Available"
    };

    createdAircraft = await AircraftService.create(payload);
    expect(createdAircraft).to.have.property("id");
    expect(createdAircraft.model).to.equal("Airbus A320");
    expect(createdAircraft.register).to.equal("XYZ-789");
    expect(createdAircraft.status).to.equal("Available");
  });

  it("should throw an error when creating an aircraft with duplicate register", async function() {
    const payload: CreateAircraftPayload = {
      model: "Airbus A320",
      register: "XYZ-789",
      status: "Available"
    };

    try {
      await AircraftService.create(payload);
      throw new Error("Test failed: Expected error not thrown");
    } catch (error: any) {
      expect(error.message).to.include("Already exists");
    }
  });
});

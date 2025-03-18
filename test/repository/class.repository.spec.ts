import { expect } from "chai";
import prisma from "../../src/database/prisma";
import ClassRepository from "../../src/repository/ClassRepository";

describe("ClassRepository", function() {
  before(async function() {
    await prisma.class.deleteMany({});
  });

  after(async function() {
    await prisma.$disconnect();
  });

  let createdClass: any;

  it("should create a new class", async function() {
    const payload = {
      name: "Class 1",
      schedule: "Monday at 10 AM"
    };

    createdClass = await ClassRepository.create(payload);
    expect(createdClass).to.have.property("id");
    expect(createdClass.name).to.equal("Class 1");
    expect(createdClass.schedule).to.equal("Monday at 10 AM");
  });

  it("should find a class by id", async function() {
    const foundClass = await ClassRepository.findById(createdClass.id);
    expect(foundClass).to.not.be.null;
    if (foundClass) {
      expect(foundClass.id).to.equal(createdClass.id);
    }
  });
});

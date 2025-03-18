import { expect } from "chai";
import ClassService from "../../src/services/ClassService";
import prisma from "../../src/database/prisma";
import type { CreateClassPayload } from "../../src/services/ClassService";

describe("ClassService", function() {
  before(async function() {
    await prisma.class.deleteMany({});
  });

  after(async function() {
    await prisma.$disconnect();
  });

  let createdClass: any;

  it("should create a new class", async function() {
    const payload: CreateClassPayload = {
      name: "Class 1",
      schedule: "Monday at 10 AM"
    };

    createdClass = await ClassService.create(payload);
    expect(createdClass).to.have.property("id");
    expect(createdClass.name).to.equal("Class 1");
    expect(createdClass.schedule).to.equal("Monday at 10 AM");
  });

});

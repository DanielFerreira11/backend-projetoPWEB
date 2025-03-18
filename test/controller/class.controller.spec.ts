import { expect } from "chai";
import request from "supertest";
import sinon from "sinon";
import app from "../../src/app";
import ClassService from "../../src/services/ClassService";
import { InvalidPayloadDataException } from "../../src/exceptions/InvalidPayloadDataException";
import { ClassNotFoundException } from "../../src/exceptions/ClassNotFoundException";
import { UserNotFoundException } from "../../src/exceptions/UserNotFoundException";
import { generateToken } from "../../src/utils/auth";

const validToken = generateToken("test-id", "test@example.com");

describe("ClassController", function () {
  afterEach(function () {
    sinon.restore();
  });

  const fakeClass = {
    id: "class-id-1",
    name: "Class 1",
    schedule: "Monday at 10 AM",
    instructorId: null,
    aircraftId: null,
  };

  const fakeClasses = [
    {
      id: "class-id-1",
      name: "Class 1",
      schedule: "Monday at 10 AM",
      instructorId: null,
      aircraftId: null,
    },
    {
      id: "class-id-2",
      name: "Class 2",
      schedule: "Tuesday at 2 PM",
      instructorId: null,
      aircraftId: null,
    },
  ];

  const fakeUpdated = {
    id: "class-id-1",
    name: "Updated Class",
    schedule: "Friday at 3 PM",
    instructorId: null,
    aircraftId: null,
  };

  it("should create a new class successfully", async function () {
    sinon.stub(ClassService, "create").resolves(fakeClass);

    const res = await request(app)
      .post("/class")
      .set("Authorization", "Bearer " + validToken)
      .send({ name: "Class 1", schedule: "Monday at 10 AM" });
    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal(fakeClass);
  });

  it("should return 400 for create with invalid payload", async function () {
    const error = new InvalidPayloadDataException("Invalid payload data to create a class.");
    sinon.stub(ClassService, "create").rejects(error);

    const res = await request(app)
      .post("/class")
      .set("Authorization", "Bearer " + validToken)
      .send({ invalidField: "nope" });
    expect(res.status).to.equal(error.statusCode);
    expect(res.body).to.have.property("error", error.message);
  });

  it("should return 404 for create when instructor not found", async function () {
    const error = new UserNotFoundException("Instructor not found.");
    sinon.stub(ClassService, "create").rejects(error);

    const res = await request(app)
      .post("/class")
      .set("Authorization", "Bearer " + validToken)
      .send({ name: "Class 1", schedule: "Monday at 10 AM", instructorId: "non-existent" });
    expect(res.status).to.equal(error.statusCode);
    expect(res.body).to.have.property("error", error.message);
  });

  it("should retrieve a class successfully via GET /class/:id", async function () {
    sinon.stub(ClassService, "getById").resolves(fakeClass);

    const res = await request(app)
      .get(`/class/${fakeClass.id}`)
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(fakeClass);
  });

  it("should return 404 when GET /class/:id is not found", async function () {
    const error = new ClassNotFoundException();
    sinon.stub(ClassService, "getById").rejects(error);

    const res = await request(app)
      .get("/class/non-existent")
    expect(res.status).to.equal(error.statusCode);
    expect(res.body).to.have.property("error", error.message);
  });

  it("should retrieve all classes successfully via GET /class", async function () {
    sinon.stub(ClassService, "getAll").resolves(fakeClasses);

    const res = await request(app)
      .get("/class")
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(fakeClasses);
  });

  it("should update a class successfully via PUT /class/:id", async function () {
    sinon.stub(ClassService, "update").resolves(fakeUpdated);

    const res = await request(app)
      .put(`/class/${fakeClass.id}`)
      .set("Authorization", "Bearer " + validToken)
      .send({ name: "Updated Class", schedule: "Friday at 3 PM" });
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(fakeUpdated);
  });

  it("should return 400 when updating a class with invalid payload", async function () {
    const error = new InvalidPayloadDataException("Invalid payload data to update a class.");
    sinon.stub(ClassService, "update").rejects(error);

    const res = await request(app)
      .put(`/class/${fakeClass.id}`)
      .set("Authorization", "Bearer " + validToken)
      .send({ invalidField: "oops" });
    expect(res.status).to.equal(error.statusCode);
    expect(res.body).to.have.property("error", error.message);
  });

  it("should delete a class successfully via DELETE /class/:id", async function () {
    sinon.stub(ClassService, "delete").resolves();

    const res = await request(app)
      .delete(`/class/${fakeClass.id}`)
      .set("Authorization", "Bearer " + validToken);
    expect(res.status).to.equal(200);
  });

  it("should return 404 when deleting a class that does not exist", async function () {
    const error = new ClassNotFoundException();
    sinon.stub(ClassService, "delete").rejects(error);

    const res = await request(app)
      .delete("/class/non-existent")
      .set("Authorization", "Bearer " + validToken);
    expect(res.status).to.equal(error.statusCode);
    expect(res.body).to.have.property("error", error.message);
  });
});

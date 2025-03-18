import { expect } from "chai";
import request from "supertest";
import sinon from "sinon";
import app from "../../src/app";
import AircraftService from "../../src/services/AircraftService";
import { InvalidPayloadDataException } from "../../src/exceptions/InvalidPayloadDataException";
import { AircraftNotFoundException } from "../../src/exceptions/AircraftNotFoundException";
import { DuplicateAircraftException } from "../../src/exceptions/DuplicateAircraft.Exception";
import { generateToken } from "../../src/utils/auth";

const validToken = generateToken("test-id", "test@example.com");

describe("AircraftController", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should create a new aircraft successfully", async function () {
    const fakeAircraft = {
      id: "aircraft-id-1",
      model: "Boeing 737",
      register: "ABC-123",
      status: "Available"
    };
    sinon.stub(AircraftService, "create").resolves(fakeAircraft);

    const res = await request(app)
      .post("/aircraft")
      .set("Authorization", "Bearer " + validToken)
      .send({ model: "Boeing 737", register: "ABC-123", status: "Available" });

    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal(fakeAircraft);
  });

  it("should return 400 for create with invalid payload", async function () {
    const error = new InvalidPayloadDataException("Invalid payload data to create an aircraft.");
    sinon.stub(AircraftService, "create").rejects(error);

    const res = await request(app)
      .post("/aircraft")
      .set("Authorization", "Bearer " + validToken)
      .send({ invalidField: "nope" });
    expect(res.status).to.equal(error.statusCode);
    expect(res.body).to.have.property("error", error.message);
  });

  it("should return 409 for create when duplicate register", async function () {
    const error = new DuplicateAircraftException("Aircraft already exists");
    sinon.stub(AircraftService, "create").rejects(error);

    const res = await request(app)
      .post("/aircraft")
      .set("Authorization", "Bearer " + validToken)
      .send({ model: "Boeing 737", register: "DUPLICATE", status: "Available" });
    expect(res.status).to.equal(error.statusCode);
    expect(res.body).to.have.property("error", error.message);
  });

  it("should retrieve an aircraft successfully via GET /aircraft/:id", async function () {
    const fakeAircraft = {
      id: "aircraft-id-1",
      model: "Boeing 737",
      register: "ABC-123",
      status: "Available"
    };
    sinon.stub(AircraftService, "getById").resolves(fakeAircraft);

    const res = await request(app)
      .get(`/aircraft/${fakeAircraft.id}`)
      .set("Authorization", "Bearer " + validToken);
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(fakeAircraft);
  });

  it("should return 404 when GET /aircraft/:id is not found", async function () {
    const error = new AircraftNotFoundException();
    sinon.stub(AircraftService, "getById").rejects(error);

    const res = await request(app)
      .get("/aircraft/non-existent")
      .set("Authorization", "Bearer " + validToken);
    expect(res.status).to.equal(error.statusCode);
    expect(res.body).to.have.property("error", error.message);
  });

  it("should update an aircraft successfully via PUT /aircraft/:id", async function () {
    const fakeUpdated = {
      id: "aircraft-id-1",
      model: "Airbus A320",
      register: "XYZ-789",
      status: "Under maintenance"
    };
    sinon.stub(AircraftService, "update").resolves(fakeUpdated);

    const res = await request(app)
      .put("/aircraft/aircraft-id-1")
      .set("Authorization", "Bearer " + validToken)
      .send({ model: "Airbus A320", register: "XYZ-789", status: "Under maintenance" });
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(fakeUpdated);
  });

  it("should return 400 when updating an aircraft with invalid payload", async function () {
    const error = new InvalidPayloadDataException("Invalid payload data to update an aircraft.");
    sinon.stub(AircraftService, "update").rejects(error);

    const res = await request(app)
      .put("/aircraft/aircraft-id-1")
      .set("Authorization", "Bearer " + validToken)
      .send({ invalidField: "oops" });
    expect(res.status).to.equal(error.statusCode);
    expect(res.body).to.have.property("error", error.message);
  });

  it("should return 404 when updating an aircraft that is not found", async function () {
    const error = new AircraftNotFoundException();
    sinon.stub(AircraftService, "update").rejects(error);

    const res = await request(app)
      .put("/aircraft/non-existent")
      .set("Authorization", "Bearer " + validToken)
      .send({ model: "Airbus A320", register: "XYZ-789", status: "Under maintenance" });
    expect(res.status).to.equal(error.statusCode);
    expect(res.body).to.have.property("error", error.message);
  });

  it("should delete an aircraft successfully via DELETE /aircraft/:id", async function () {
    sinon.stub(AircraftService, "delete").resolves();

    const res = await request(app)
      .delete("/aircraft/aircraft-id-1")
      .set("Authorization", "Bearer " + validToken);
    expect(res.status).to.equal(200);
  });

  it("should return 404 when deleting an aircraft that is not found", async function () {
    const error = new AircraftNotFoundException();
    sinon.stub(AircraftService, "delete").rejects(error);

    const res = await request(app)
      .delete("/aircraft/non-existent")
      .set("Authorization", "Bearer " + validToken);
    expect(res.status).to.equal(error.statusCode);
    expect(res.body).to.have.property("error", error.message);
  });
});

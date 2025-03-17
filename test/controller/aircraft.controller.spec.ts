import { expect } from "chai";
import request from "supertest";
import app from "../../src/app";

describe("AircraftController", function() {
  let createdAircraftId: string;

  it("should create a new aircraft via POST /aircraft", async function() {
    const payload = {
      model: "Boeing 777",
      register: "DEF-456",
      status: "Available"
    };

    const res = await request(app)
      .post("/aircraft")
      .send(payload)
      .expect(201);

    expect(res.body).to.have.property("id");
    expect(res.body.model).to.equal("Boeing 777");
    expect(res.body.register).to.equal("DEF-456");
    expect(res.body.status).to.equal("Available");
    createdAircraftId = res.body.id;
  });

  it("should retrieve an aircraft via GET /aircraft/:id", async function() {
    const res = await request(app)
      .get(`/aircraft/${createdAircraftId}`)
      .expect(200);

    expect(res.body).to.have.property("id", createdAircraftId);
    expect(res.body.model).to.equal("Boeing 777");
  });
});

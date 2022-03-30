import { prisma } from "@shared/database/client";
import request from "supertest";
import app from "@shared/http/app";

afterAll(async () => {
  await prisma.student.deleteMany({});
  await prisma.$disconnect();
});
beforeEach(async () => {
  await prisma.student.deleteMany({});
  await prisma.$executeRawUnsafe("ALTER TABLE student AUTO_INCREMENT = 1");
});

const student = {
  name: "student",
  email: "student@dominiofake.com.br",
  cpf: "755.070.890-86",
};

describe("# Suit test to studant", () => {
  it("Should CREATE two students ", async () => {
    const response = await request(app)
      .post("/student/enrollment")
      .send(student)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
    expect(response.body.ra).toBeDefined();
  });

  it("Should LIST two students", async () => {
    const response = await request(app)
      .get("/student/enrollment")
      .expect("Content-type", /json/)
      .expect(200);
    expect(response.body).toBeDefined();
    expect(response.status).toBe(200);
  });

  it("Should SHOW a student's data from their RA", async () => {
    const responseCreateStudent = await request(app)
      .post("/student/enrollment")
      .send(student)
      .expect(201);

    const response = await request(app)
      .get(`/student/enrollment/1`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual({
      name: "student",
      email: "student@dominiofake.com.br",
      cpf: "755.070.890-86",
      ra: 1,
    });
  });

  it("Should DELETE a student's data from their RA", async () => {
    const responseCreateStudent = await request(app)
      .post("/student/enrollment")
      .send(student)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);

    const response = await request(app)
      .delete(`/student/enrollment/1`)
      .expect(201);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual(1);
  });

  it("Should UPDATE a student's data from their RA", async () => {
    const responseCreateStudent = await request(app)
      .post("/student/enrollment")
      .send(student)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);

    const response = await request(app)
      .put(`/student/enrollment/1`)
      .send(student)
      .expect("Content-type", /json/)
      .expect(201);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual({ ra: 1 });
  });
});

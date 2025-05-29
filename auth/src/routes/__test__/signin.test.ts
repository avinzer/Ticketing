import request from "supertest";
import { app } from "../../app";

it("return make sure your email is valid", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@tst.com",
      password: "password",
    })
    .expect(400);
});

it("return email does not exist", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("return password does not much", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "pass",
    })
    .expect(400);
});

it("return cookeis error", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);
  
});

import request from "supertest";
import { Ticket } from "../../models/tickets";
import { app } from "../../app";
import mongoose from "mongoose";

it("return 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "test",
      price: 10,
    })
    .expect(404);
});

it("return 401 if the provided id is not authorized", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "test",
      price: 10,
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "test",
      price: 10,
    })
    .expect(200);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "test1",
      price: 200,
    })
    .expect(401);
});

it("returns a 400 if the user provide invalid inputs", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "test",
      price: 10,
    })
    .expect(200);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 200,
    })
    .expect(400);
});


it("return 200 and update the ticket", async () => {
    const cookie = global.signin()

    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({
            title: "test",
            price: 10
        }).expect(200)

    const putresponse = await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "test1",
            price: 200
        }).expect(200)

    console.log(response.body)
    console.log(putresponse.body) 
})

import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";
import mongoose from "mongoose";

it("return 404 if the provided url is not valid", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(404);
});

it("return the ticket if it was found", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "concert",
      price: 10,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(200);

    expect(ticketResponse.body.title).toEqual("concert")
});

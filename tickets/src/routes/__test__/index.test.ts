import request from "supertest"
import { Ticket } from "../../models/tickets"
import { app } from "../../app"


it("return all the fetched tickets", async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "concert",
            price: 10
        }).expect(200)
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "concert",
            price: 10
        }).expect(200)
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "concert",
            price: 10
        }).expect(200)
    
    const response = await request(app)
        .get("/api/tickets")
        .set("Cookie", global.signin())
        .send()
        .expect(200)

    expect(response.body.length).toEqual(3)
})
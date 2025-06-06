import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";


it("has a route handler to /api/tickets for post request", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send()
    
    expect(response.status).not.toEqual(404)
}
);


it("can only be accessed if the user is signed in", async () => {
    await request(app)
    .post("/api/tickets")
    .send()
    .expect(401)
})

it("return other than 401 if the user is signed in", async () =>{
    const cookie = global.signin()
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({})

    expect(response.status).not.toEqual(401)
})


it("returns an error if an invalid title is provided", async () => {
    const title = ""
    const price = 10

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title, price
        })
        .expect(400)
})


it("returns an error if an invalid price is provided", async () => {
    const title = "concert"
    const price = -10

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title, price
        })
        .expect(400)
})


it("create a ticket with a valid inputs", async () => {
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "concert",
            price: 10
        })
        .expect(200)
    
    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
    expect(tickets[0].title).toEqual("concert")
})



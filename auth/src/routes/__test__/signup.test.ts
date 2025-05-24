import request from "supertest";
import { app } from "../../app";
import { Password } from "../../services/password";


it("send 201 if successfully connected", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        }).expect(200)
        
})


it("send 400 if wrong email", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "testtest.com",
            password: "password"
        }).expect(400)
        
})



it("send 400 if wrong password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "4"
        }).expect(400)
        
})



it("send 400 if there is no email and password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
        }).expect(400)
        
})

it("disallow duplicated emails", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200)


    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(400)
})
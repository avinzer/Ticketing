import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import { app } from "../app"
import request from "supertest"

declare global {
    // Add signup to the NodeJS.Global interface for Node.js
    namespace NodeJS {
        interface Global {
            signup(): Promise<string[]>
        }
    }
    // Add signup to the globalThis type for TypeScript
    var signup: () => Promise<string[]>
}

let mongo: any

beforeAll(async () => {
    process.env.JWT_KEY = "asdf"
    mongo = await MongoMemoryServer.create()
    const mongoUri = await mongo.getUri()

    await mongoose.connect(mongoUri)
})

beforeEach(async () => {
    const collections = await mongoose.connection.db?.collections()

    if (collections) {
        for (let collection of collections) {
            await collection.deleteMany({})
        }
    }
})

afterAll(async () => {
    await mongo.stop() 
    await mongoose.connection.close()
})


global.signup = async () => {
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200)
    
    const cookie = response.get("Set-Cookie") || [];
    return cookie;
}
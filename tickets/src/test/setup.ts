import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"

declare global {
    // Add signup to the NodeJS.Global interface for Node.js
    namespace NodeJS {
        interface Global {
            signin(): string[]
        }
    }
    // Add signup to the globalThis type for TypeScript
    var signin: () => string[]
}

jest.mock("../")

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


global.signin = () => {
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: "test@test.com"
    }

    const token = jwt.sign(payload, process.env.JWT_KEY!)

    const session = { jwt: token }

    const sessionJson = JSON.stringify(session)

    const base64 = Buffer.from(sessionJson).toString("base64")

    return [`session=${base64}`]
}
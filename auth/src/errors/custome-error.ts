export abstract class CustomeError extends Error {
    abstract statusCode: number

    constructor() {
        super()
        Object.setPrototypeOf(this, CustomeError.prototype)
    }

    abstract serializeErrors(): { message: string, field?: string}[]
}
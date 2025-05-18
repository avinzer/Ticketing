import { CustomeError } from "./custome-error"


export class DatabaseConnectionError extends CustomeError {
    statusCode = 500
    response = "Database connection failed"

    constructor() {
        super()
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [
            {
                message: this.response
            }
        ]
    }
}
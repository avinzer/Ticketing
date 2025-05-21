
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { BadRequestError } from "../errors/bad-request-error";

export const errorHandler = (err: Error, req: any, res: any, next: any) => {

    if (err instanceof RequestValidationError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }

    if (err instanceof DatabaseConnectionError) {
        res.status(err.statusCode).send({errors: err.serializeErrors()})
    }

    if (err instanceof BadRequestError) {
        res.status(err.statusCode).send({errors: err.serializeErrors()})
    }
 
    // res.status(400).send({
    //     message: "something went wrong"
    // })
};

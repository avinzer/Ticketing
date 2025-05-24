import { CustomeError } from "../errors/custome-error";

export const errorHandler = (err: Error, req: any, res: any, next: any) => {

    if (err instanceof CustomeError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }
 
    // res.status(400).send({
    //     message: "something went wrong"
    // })
};

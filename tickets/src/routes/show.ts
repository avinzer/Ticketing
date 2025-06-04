import express, {Request, Response, NextFunction} from "express"

import { Ticket } from "../models/tickets"
import { NotFoundError, requireAuth } from "@avinzer21/common"


const router = express.Router()


router.get("/api/tickets/:id",requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const ticket = await Ticket.findById(id)

    if (!ticket) {
        throw new NotFoundError()
    }
    res.send(ticket)
})




export { router as showTicketRouter}
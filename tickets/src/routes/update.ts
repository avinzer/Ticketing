import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

import { Ticket } from "../models/tickets";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from "@avinzer21/common";
import { TicketUpdatedPublisher } from "../events/publilsher/ticket-updated-publisher";
import { amqpWrapper } from "../amqp-wrapper";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;
    const id = req.params.id;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket?.set({
      title,
      price,
    });

    
    await ticket?.save();
    new TicketUpdatedPublisher(amqpWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId
    })

    res.send(ticket);
  }
);

export { router as updateTicketsRouter };

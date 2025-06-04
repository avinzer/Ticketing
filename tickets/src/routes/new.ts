import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";


import { requireAuth, validateRequest } from "@avinzer21/common";
import { Ticket } from "../models/tickets";
import { TicketCreatedPublisher } from "../events/publilsher/ticket-created-publisher";
import { amqpWrapper } from "../amqp-wrapper";

const router = express.Router();

router.post(
  "/api/tickets",
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

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save()

    new TicketCreatedPublisher(amqpWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId
    })

    res.send(ticket)
  }
);

export { router as newTicketRouter };

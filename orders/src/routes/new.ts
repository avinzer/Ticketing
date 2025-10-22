import { BadRequestError, NotFoundError, requireAuth, validateRequest } from "@avinzer21/common";
import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";

import { Ticket } from "../models/tickets";
import { Order } from "../models/orders";
import { OrderStatus } from "@avinzer21/common";

const router = express.Router();

const EXPIRTAION_WINDOW_TIME = 15 * 60

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("ticketId is not defined"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {

    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    const isReserved = await ticket.isReserved()

    if(isReserved) {
      throw new BadRequestError("Ticket is already reserved")
    }

    const expirationOrder = new Date() 
    expirationOrder.setSeconds(expirationOrder.getSeconds() + EXPIRTAION_WINDOW_TIME)

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expireAt: expirationOrder,
      ticket
    })

    await order.save()

    res.send(order);

  }
);

export { router as newOrderRouter };

import { BadRequestError, NotFoundError, requireAuth, validateRequest } from "@avinzer21/common";
import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";

import { Ticket } from "../models/tickets";
import { Order } from "../models/orders";
import { OrderStatus } from "../events/types/order-status";

const router = express.Router();

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

    const existingOrder = await Order.findOne({
      ticket: ticket,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPayment,
          OrderStatus.Complete
        ],
      },
    });

    if(existingOrder) {
      throw new BadRequestError("Order already existed")
    }

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expireAt: new Date(),
      ticket
    })

    await order.save()

    res.send(order);

  }
);

export { router as newOrderRouter };

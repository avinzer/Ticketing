import mongoose from "mongoose";

import { TicketDoc } from "./tickets";
import { OrderStatus } from "../events/types/order-status";

interface OrdersAttrs {
  userId: string;
  status: OrderStatus;
  expireAt: Date;
  ticket: TicketDoc;
}

interface OrdersDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expireAt: Date;
  ticket: TicketDoc;
}

interface OrdersModel extends mongoose.Model<OrdersDoc> {
  build(attrs: OrdersAttrs): OrdersDoc;
}

const ordersSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created
    },
    expireAt: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Ticket",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ordersSchema.statics.build = (attrs: OrdersAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrdersDoc, OrdersModel>("order", ordersSchema);

export { Order };

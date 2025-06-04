import mongoose from "mongoose";

import { app } from "./app";
import { amqpWrapper } from "./amqp-wrapper";

const connectWithRetry = () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => amqpWrapper.connect("amqp://rabbitmq-srv:5672"))
    .then((res) => {
      app.listen(3000, () => {
        console.log("ticketing server running");
      });
    })
    .catch((err) => {
      console.error("MongoDB connection failed, retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
};

setTimeout(connectWithRetry, 2000);

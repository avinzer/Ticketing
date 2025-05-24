import mongoose from "mongoose";

import { app } from "./app";


const connectWithRetry = () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  mongoose
    .connect("mongodb://auth-mongo-srv:27017/auth")
    .then(() => console.log("Connected to MongoDB"))
    .then((res) => {
      app.listen(3000, () => {
        console.log("Auth server running 1");
      });
    })
    .catch((err) => {
      console.error("MongoDB connection failed, retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
};

setTimeout(connectWithRetry, 2000)

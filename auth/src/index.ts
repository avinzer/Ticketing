import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(bodyParser.json());

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.use("/*not", (req, res, next) => {
  throw new NotFoundError()
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
    console.log("Connected to MongoDB");
  } catch(err) {
    console.error(err)
  }
  app.listen(3000, () => {
    console.log("Auth server running 1");
  });
}

start()

import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@avinzer21/common";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

const app = express();
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !=='test',
  })
);

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.use("/*not", (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app }
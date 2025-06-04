import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@avinzer21/common";

import { newTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketsRouter } from "./routes/update";


const app = express();
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !=='test',
  })
);

app.use(currentUser)

app.use(newTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketsRouter)


app.use("/*not", (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app }
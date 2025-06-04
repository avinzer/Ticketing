import express from "express"
import bodyparser from "body-parser"
import cookieSession from "cookie-session"

import { currentUser } from "@avinzer21/common"



const app = express()

app.set("trust proxy", true)
app.use(bodyparser.json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !=='test',
  })
);


app.use(currentUser)



export { app }
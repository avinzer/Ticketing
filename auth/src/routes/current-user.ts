import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { currentUser } from "../middleware/currentUser";
import { requireAuth } from "../middleware/require-auth";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req: any, res: any) => {
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };

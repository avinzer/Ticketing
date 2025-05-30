import express from "express";
import { currentUser } from "@avinzer21/common";


const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req: any, res: any) => {
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };

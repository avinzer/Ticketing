import { requireAuth } from "@avinzer21/common";
import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get(
  "/api/orders",
  requireAuth,
  (req: Request, res: Response, next: NextFunction) => {
    res.send({});
  }
);

export { router as indexOrderRouter };

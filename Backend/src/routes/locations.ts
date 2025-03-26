// src/routes/locations.ts
import express from "express";
import type { Request, Response } from "express";
import {
  getLocations,
  getLocationById,
} from "../controllers/locationsController";

const router = express.Router();

// Use inline function definitions
router.get("/", async (req: Request, res: Response) => {
  await getLocations(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getLocationById(req, res);
});

export default router;

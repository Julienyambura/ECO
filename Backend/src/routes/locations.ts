import express from "express";
import {
  getLocationById,
  getLocations,
} from "../controllers/locationsController"; // named imports

const router = express.Router();

// GET all locations
router.get("/", getLocations);

// GET location by ID
router.get("/:id");

export default router;

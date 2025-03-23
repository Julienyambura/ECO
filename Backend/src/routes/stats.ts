import express from "express";
import { getStats } from "../controllers/statsController";

const router = express.Router();

// GET recycling statistics
router.get("/");

export default router;

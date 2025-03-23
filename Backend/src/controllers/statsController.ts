import type { Request, Response } from "express";
import Stats from "../models/Stats";

export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await Stats.findOne().select("-__v -createdAt -updatedAt");

    if (!stats) {
      return res.status(404).json({ message: "Stats not found" });
    }

    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

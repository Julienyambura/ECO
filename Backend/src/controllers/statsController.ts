import type { Request, Response } from "express";
import Stats from "../models/Stats";
import { mockStats } from "../data/stats";

export const getStats = async (_req: Request, res: Response) => {
  try {
    // Log the request for debugging
    console.log("Stats endpoint called");

    const stats = await Stats.findOne().select("-__v -createdAt -updatedAt");

    if (!stats) {
      console.log("No stats found in database, returning mock data");
      // If no stats are found, return the mock data instead of a 404
      return res.json(mockStats);
    }

    return res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    // Return mock data instead of an error
    console.log("Error occurred, returning mock data");
    return res.json(mockStats);
  }
};

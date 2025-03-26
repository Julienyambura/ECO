import type { Request, Response } from "express";
import Location from "../models/Location";
import { mockLocations } from "../data/locations";

export const getLocations = async (_req: Request, res: Response) => {
  try {
    const locations = await Location.find().select(
      "-__v -createdAt -updatedAt"
    );

    // If no locations found, return mock data
    if (!locations || locations.length === 0) {
      console.log("No locations found in database, returning mock data");
      return res.json(mockLocations);
    }

    return res.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    // Return mock data instead of an error
    return res.json(mockLocations);
  }
};

export const getLocationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const location = await Location.findOne({ id }).select(
      "-__v -createdAt -updatedAt"
    );

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    return res.json(location);
  } catch (error) {
    console.error("Error fetching location:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

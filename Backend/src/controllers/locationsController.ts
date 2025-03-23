import { Request, Response } from "express";
import Location from "../models/Location";

// Controller to get all locations
export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find().select("-__v -createdAt -updatedAt");
    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to get a location by ID
export const getLocationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id).select("-__v -createdAt -updatedAt");

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.json(location); 
  } catch (error) {
    console.error("Error fetching location:", error);
    res.status(500).json({ message: "Server error" });
  }
};

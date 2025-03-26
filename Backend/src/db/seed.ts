import mongoose from "mongoose";
import dotenv from "dotenv";
import Location from "../models/Location";
import Stats from "../models/Stats";
import { mockLocations } from "../data/locations";

// Load environment variables
dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/eco_glass";

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected!");

    // Clear existing locations and insert new ones
    await Location.deleteMany({});
    console.log("Cleared existing locations");

    await Location.insertMany(mockLocations);
    console.log(`${mockLocations.length} locations inserted`);

    // Clear existing stats and insert new ones
    await Stats.deleteMany({});
    console.log("Cleared existing stats");

    // Create sample Stats data
    const sampleStats = {
      totalLocations: mockLocations.length,
      totalGlassRecycled: 1250000, // in pounds
      co2Saved: 875000, // in pounds
      energySaved: 437500, // in kWh
      monthlyStats: [
        { month: "Jan", amount: 95000 },
        { month: "Feb", amount: 85000 },
        { month: "Mar", amount: 100000 },
        { month: "Apr", amount: 110000 },
        { month: "May", amount: 120000 },
        { month: "Jun", amount: 115000 },
        { month: "Jul", amount: 105000 },
        { month: "Aug", amount: 95000 },
        { month: "Sep", amount: 100000 },
        { month: "Oct", amount: 110000 },
        { month: "Nov", amount: 105000 },
        { month: "Dec", amount: 110000 },
      ],
    };

    await Stats.create(sampleStats);
    console.log("Stats data seeded successfully!");

    // Close the connection
    await mongoose.disconnect();
    console.log("Database connection closed");
    process.exit(0); // Exit the script
  } catch (error) {
    console.error("Error seeding database:", error);
    await mongoose.disconnect();
    process.exit(1); // Exit with error code
  }
}

// Run the seeding function
seedDatabase();

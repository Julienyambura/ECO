import mongoose from "mongoose";
import Stats from "../models/Stats"; // Adjust to your correct import path
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// MongoDB URL from environment variable or default local URL
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/eco_glass";

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URL);
    console.log("Database connected!");

    // Clear existing data in the Stats collection
    await Stats.deleteMany({});

    // Create sample Stats data
    const sampleStats = [
      {
        totalLocations: 150,
        totalGlassRecycled: 10000,
        co2Saved: 5000,
        energySaved: 8000,
        monthlyStats: [
          { month: "January", amount: 1000 },
          { month: "February", amount: 1200 },
          { month: "March", amount: 1500 },
        ],
      },
      {
        totalLocations: 200,
        totalGlassRecycled: 20000,
        co2Saved: 10000,
        energySaved: 16000,
        monthlyStats: [
          { month: "January", amount: 2000 },
          { month: "February", amount: 2400 },
          { month: "March", amount: 3000 },
        ],
      },
    ];

    // Insert sample data into the Stats collection
    await Stats.insertMany(sampleStats);
    console.log("Database seeded successfully!");

    // Close the connection
    await mongoose.disconnect();
    process.exit(0); // Exit the script
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // Exit with error code
  }
}

// Run the seeding function
seedDatabase();

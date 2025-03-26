import mongoose from "mongoose";
import { mockLocations } from "../data/locations";
import { mockStats } from "../data/stats";

// Define your MongoDB URI (use environment variable or default)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/eco_glass";

// Connect to MongoDB (Mongoose handles the connection pooling automatically)
async function setupDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    // Your setup logic here (creating collections, inserting mock data)

    // Assuming you want to simulate "creating tables" in MongoDB
    // MongoDB doesn't have tables, but you can simulate collections with schemas

    // Create mock data for "locations"
    const Location = mongoose.model("Location", new mongoose.Schema({
      id: String,
      name: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      
      hours: String,
      phone: String,
      website: String,
      acceptedItems: mongoose.Schema.Types.Mixed,
    }));

    // Create mock data for "stats"
    const Stats = mongoose.model("Stat", new mongoose.Schema({
      totalLocations: Number,
      totalGlassRecycled: Number,
      co2Saved: Number,
      energySaved: Number,
    }));

    // Create mock data for "monthly_stats"
    const MonthlyStat = mongoose.model("MonthlyStat", new mongoose.Schema({
      month: String,
      amount: Number,
    }));

    // Insert mock locations data if no data exists
    const locationsCount = await Location.countDocuments();
    if (locationsCount === 0) {
      console.log("Inserting mock locations data...");
      for (const location of mockLocations) {
        await Location.create(location);
      }
    }

    // Insert mock stats data if no data exists
    const statsCount = await Stats.countDocuments();
    if (statsCount === 0) {
      console.log("Inserting mock stats data...");
      await Stats.create(mockStats);
      
      // Insert mock monthly stats data
      for (const monthlyStat of mockStats.monthlyStats) {
        await MonthlyStat.create(monthlyStat);
      }
    }

    console.log("Database setup completed successfully");

    // Close the MongoDB connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");

    process.exit(0);
  } catch (error) {
    console.error("Error setting up database:", error);
    process.exit(1);
  }
}

setupDatabase();

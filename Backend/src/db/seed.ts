import { connectToDatabase, disconnectFromDatabase } from "./connection";
import Location from "../models/Location";
import Stats from "../models/Stats";
import { mockLocations } from "../data/locations";
import { mockStats } from "../data/stats";

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    console.log("Seeding database...");

    // Check if locations collection is empty
    const locationsCount = await Location.countDocuments();

    if (locationsCount === 0) {
      console.log("Inserting mock locations data...");

      // Insert mock locations data
      await Location.insertMany(mockLocations);
      console.log(`${mockLocations.length} locations inserted`);
    } else {
      console.log("Locations collection already has data, skipping seed");
    }

    // Check if stats collection is empty
    const statsCount = await Stats.countDocuments();

    if (statsCount === 0) {
      console.log("Inserting mock stats data...");

      // Insert mock stats data
      await Stats.create(mockStats);
      console.log("Stats data inserted");
    } else {
      console.log("Stats collection already has data, skipping seed");
    }

    console.log("Database seeding completed successfully");

    // Disconnect from MongoDB
    await disconnectFromDatabase();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    await disconnectFromDatabase();
    process.exit(1);
  }
}

seedDatabase();

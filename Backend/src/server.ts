import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./db/connection";
import locationsRoutes from "./routes/locations";
import statsRoutes from "./routes/stats";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/locations", locationsRoutes);
app.use("/api/stats", statsRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "ECO GLASS API is running" });
});

// Start server
const startServer = async () => {
  // Connect to MongoDB
  const isConnected = await connectToDatabase();

  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } else {
    console.error("Failed to connect to MongoDB. Server not started.");
  }
};

startServer();

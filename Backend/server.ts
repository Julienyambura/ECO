import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectToDatabase } from "./src/db/connection"
import locationsRoutes from "./src/routes/locations"
import statsRoutes from "./src/routes/stats"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Routes
app.use("/api/locations", locationsRoutes)
app.use("/api/stats", statsRoutes)

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "ECO GLASS API is running" })
})

// Add a test route for debugging
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" })
})

// Add a fallback route for debugging
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    requestedPath: req.path,
    availableRoutes: ["/", "/api/locations", "/api/stats", "/api/test"],
  })
})

// Start server
const startServer = async () => {
  // Connect to MongoDB
  const isConnected = await connectToDatabase()

  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`API available at http://localhost:${PORT}/api`)
      console.log(`CORS enabled for: ${corsOptions.origin}`)
      console.log(`Available routes: /, /api/locations, /api/stats, /api/test`)
    })
  } else {
    console.error("Failed to connect to MongoDB. Server not started.")
    // Start server anyway, using mock data
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without MongoDB connection)`)
      console.log(`API available at http://localhost:${PORT}/api`)
      console.log(`CORS enabled for: ${corsOptions.origin}`)
      console.log(`Available routes: /, /api/locations, /api/stats, /api/test`)
    })
  }
}

startServer()


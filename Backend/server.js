const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Mock data for locations
const mockLocations = [
  {
    id: "1",
    name: "Coco's Sports Bar",
    address: "Kilimani Road",
    city: "Nairobi",
    state: "Kilimani",
    zipCode: "00100",
    hours: "Mon-Sat: 10am-11pm, Sun: 12pm-10pm",
    phone: "(+254) 700-123-456",

    acceptedItems: ["Glass bottles", "Glass jars", "Window glass"],
    imagePath: "/location-images/location-1.jpeg",
  },
  {
    id: "2",
    name: "Gemini Sports Bar",
    address: "Embakasi Road",
    city: "Nairobi",
    state: "Embakasi",
    zipCode: "00521",
    hours: "Mon-Sun: 11am-12am",
    phone: "(+254) 711-234-567",
    acceptedItems: ["Glass bottles", "Glass jars"],
    imagePath: "/location-images/location-2.jpeg",
  },
  {
    id: "3",
    name: "Milele Salon",
    address: "South B Shopping Center",
    city: "Nairobi",
    state: "South B",
    zipCode: "00200",
    hours: "Mon-Sat: 8am-8pm, Sun: 10am-6pm",

    acceptedItems: ["Glass bottles", "Glass jars"],
    imagePath: "/location-images/location-3.jpeg",
  },
  {
    id: "4",
    name: "Classic Joint",
    address: "Parklands Avenue",
    city: "Nairobi",
    state: "Parklands",
    zipCode: "00620",
    hours: "Tue-Sun: 12pm-11pm",
    phone: "(+254) 722-345-678",

    acceptedItems: ["Glass bottles", "Glass jars", "Window glass", "Mirrors"],
    imagePath: "/location-images/location-4.jpeg",
  },
  {
    id: "5",
    name: "Laikipia Cottages",
    address: "Laikipia Road",
    city: "Nanyuki",
    state: "Laikipia",
    zipCode: "10400",
    hours: "Mon-Sun: 24 hours (Drop-off only)",
    phone: "(+254) 733-456-789",

    acceptedItems: ["Glass bottles", "Glass jars"],
    imagePath: "/location-images/location-5.jpeg",
  },
  {
    id: "6",
    name: "Kijani Willows",
    address: "Willow Lane",
    city: "Nairobi",
    state: "Karen",
    zipCode: "00502",
    hours: "Mon-Fri: 9am-5pm, Sat: 10am-4pm",
    phone: "(+254) 744-567-890",

    acceptedItems: ["Glass bottles", "Glass jars", "Decorative glass"],
    imagePath: "/location-images/location-1.jpeg",
  },
];

// Mock data for stats
const mockStats = {
  totalLocations: 127,
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

// Routes
app.get("/api/locations", (req, res) => {
  console.log("Locations endpoint called");
  res.json(mockLocations);
});

app.get("/api/locations/:id", (req, res) => {
  const { id } = req.params;
  const location = mockLocations.find((loc) => loc.id === id);

  if (!location) {
    return res.status(404).json({ message: "Location not found" });
  }

  res.json(location);
});

app.get("/api/stats", (req, res) => {
  console.log("Stats endpoint called");
  res.json(mockStats);
});

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "ECO GLASS API is running" });
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Catch-all route
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    requestedPath: req.path,
    availableRoutes: ["/", "/api/locations", "/api/stats", "/api/test"],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`CORS enabled for: ${corsOptions.origin}`);
  console.log(`Available routes: /, /api/locations, /api/stats, /api/test`);
});

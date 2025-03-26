import { NextResponse } from "next/server";
import type { RecyclingLocation } from "@/types/location";

// Default image path
const defaultImagePath = "/location-images/location-default.svg"; // Updated to location-default.svg

// This would typically come from a database
const mockLocations: RecyclingLocation[] = [
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
    imagePath: defaultImagePath, // Using default image
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
    imagePath: defaultImagePath, // Using default image
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
    imagePath: defaultImagePath, // Using default image
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
    imagePath: defaultImagePath, // Using default image
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
    imagePath: defaultImagePath, // Using default image
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
    imagePath: defaultImagePath, // Using default image
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(mockLocations);
}

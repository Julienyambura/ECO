"use client";

import type React from "react";

import { useState, useEffect } from "react";
import styles from "./locations.module.css";
import LocationList from "@/components/location-list";
import type { RecyclingLocation } from "@/types/location";
import Image from "next/image";

// Get API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Hardcoded fallback locations to ensure we always have data
const fallbackLocations: RecyclingLocation[] = [
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
    imagePath: "/recycle-icon.svg",
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
    imagePath: "/recycle-icon.svg",
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
    imagePath: "/recycle-icon.svg",
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
    imagePath: "/recycle-icon.svg",
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
    imagePath: "/recycle-icon.svg",
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
    imagePath: "/recycle-icon.svg",
  },
];

export default function LocationsPage() {
  // Initialize with fallback data to ensure we always have something to display
  const [locations, setLocations] =
    useState<RecyclingLocation[]>(fallbackLocations);
  const [filteredLocations, setFilteredLocations] =
    useState<RecyclingLocation[]>(fallbackLocations);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<RecyclingLocation | null>(fallbackLocations[0]);

  useEffect(() => {
    console.log("LocationsPage mounted, initializing with fallback data");
    console.log("Fallback locations:", fallbackLocations);

    // Fetch locations from our backend
    const fetchLocations = async () => {
      try {
        console.log(`Fetching locations from: ${API_URL}/locations`);
        const response = await fetch(`${API_URL}/locations`, {
          cache: "no-store",
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });

        if (!response.ok) {
          console.log(`API error: ${response.status} - ${response.statusText}`);
          // We're already using fallback locations from initialization
          setError(
            `Note: Using local data. API returned ${response.status} ${response.statusText}`
          );
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Locations data received from API:", data);

        if (!data || data.length === 0) {
          console.log("API returned empty data, using fallback locations");
          setError("Note: Using local data. API returned empty data.");
          setLoading(false);
          return;
        }

        // Add image paths to each location if they don't already have one
        const locationsWithImages = data.map((location: RecyclingLocation) => ({
          ...location,
          imagePath: location.imagePath || `/recycle-icon.svg`,
        }));

        setLocations(locationsWithImages);
        setFilteredLocations(locationsWithImages);

        // Set the first location as selected by default
        if (locationsWithImages.length > 0) {
          setSelectedLocation(locationsWithImages[0]);
        }

        setLoading(false);
      } catch (error: unknown) {
        console.log("Failed to fetch locations:", error);
        // We're already using fallback locations from initialization
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        setError(`Note: Using local data. ${errorMessage}`);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Filter locations based on search query
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setFilteredLocations(locations);
      return;
    }

    const filtered = locations.filter(
      (location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredLocations(filtered);

    // Update selected location if the current one is filtered out
    if (filtered.length > 0) {
      if (
        selectedLocation &&
        !filtered.some((loc) => loc.id === selectedLocation.id)
      ) {
        setSelectedLocation(filtered[0]);
      }
    } else {
      setSelectedLocation(null);
    }
  };

  // Handle location selection
  const handleLocationSelect = (location: RecyclingLocation) => {
    console.log("Location selected:", location);
    setSelectedLocation(location);

    // Scroll to the top on mobile
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  console.log("Rendering LocationsPage with:", {
    locationsCount: locations.length,
    filteredLocationsCount: filteredLocations.length,
    selectedLocation: selectedLocation?.name,
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Find Glass Recycling Locations</h1>

      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search by location name or address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <span className={styles.searchIcon}>🔍</span>
            Search
          </button>
        </form>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.contentGrid}>
        <div className={styles.imageCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Location View</h2>
            <p className={styles.cardDescription}>
              {selectedLocation
                ? selectedLocation.name
                : "Select a location to view details"}
            </p>
          </div>
          <div className={styles.imageContainer}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
              </div>
            ) : selectedLocation ? (
              <div className={styles.locationDetail}>
                <div className={styles.locationImage}>
                  <Image
                    src={selectedLocation.imagePath || "/recycle-icon.svg"}
                    alt={selectedLocation.name}
                    width={600}
                    height={400}
                    className={styles.image}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/recycle-icon.svg";
                    }}
                  />
                </div>
                <div className={styles.locationInfo}>
                  <h3 className={styles.locationName}>
                    {selectedLocation.name}
                  </h3>
                  <p className={styles.locationAddress}>
                    {selectedLocation.address}, {selectedLocation.city},{" "}
                    {selectedLocation.state} {selectedLocation.zipCode}
                  </p>

                  {selectedLocation.hours && (
                    <div className={styles.infoItem}>
                      <strong>Hours:</strong> {selectedLocation.hours}
                    </div>
                  )}

                  {selectedLocation.phone && (
                    <div className={styles.infoItem}>
                      <strong>Phone:</strong> {selectedLocation.phone}
                    </div>
                  )}

                  {selectedLocation.acceptedItems &&
                    selectedLocation.acceptedItems.length > 0 && (
                      <div className={styles.infoItem}>
                        <strong>Accepted Items:</strong>
                        <ul className={styles.itemsList}>
                          {selectedLocation.acceptedItems.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* <div className={styles.actions}>
                    {selectedLocation.website && (
                      <a
                        href={selectedLocation.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.websiteButton}
                      >
                        Visit Website
                      </a>
                    )}
                  </div> */}
                </div>
              </div>
            ) : (
              <div className={styles.noSelection}>
                <p>Please select a recycling location from the list</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.listCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Nearby Locations</h2>
            <p className={styles.cardDescription}>
              {filteredLocations.length} locations found
            </p>
          </div>
          <div className={styles.listContainer}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
              </div>
            ) : (
              <LocationList
                locations={filteredLocations}
                selectedLocationId={selectedLocation?.id}
                onSelectLocation={handleLocationSelect}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

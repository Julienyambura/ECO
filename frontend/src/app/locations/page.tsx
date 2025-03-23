"use client"

import type React from "react"

import { useState, useEffect } from "react"
import styles from "./locations.module.css"
// import LocationList from "@/components/locations-loading"
import type { RecyclingLocation } from "@/types/index"
// import Image from "next/image"

// Get API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export default function LocationsPage() {
  const [locations, setLocations] = useState<RecyclingLocation[]>([])
  const [filteredLocations, setFilteredLocations] = useState<RecyclingLocation[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<RecyclingLocation | null>(null)

  useEffect(() => {
    // Fetch locations from our MongoDB backend
    const fetchLocations = async () => {
      try {
        console.log(`Fetching locations from: ${API_URL}/locations`)
        const response = await fetch(`${API_URL}/locations`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        console.log("Locations data received:", data)

        // Add image paths to each location
        const locationsWithImages = data.map((location: RecyclingLocation, index: number) => ({
          ...location,
          imagePath: `/location-images/location-${(index % 5) + 1}.jpg`,
        }))

        setLocations(locationsWithImages)
        setFilteredLocations(locationsWithImages)

        // Set the first location as selected by default
        if (locationsWithImages.length > 0) {
          setSelectedLocation(locationsWithImages[0])
        }

        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch locations:", error)
        setError("Failed to load recycling locations. Please try again later.")
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

  // Filter locations based on search query
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setFilteredLocations(locations)
      return
    }

    const filtered = locations.filter(
      (location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.city.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setFilteredLocations(filtered)

    // Update selected location if the current one is filtered out
    if (filtered.length > 0) {
      if (selectedLocation && !filtered.some((loc) => loc.id === selectedLocation.id)) {
        setSelectedLocation(filtered[0])
      }
    } else {
      setSelectedLocation(null)
    }
  }

  // Handle location selection

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
              {selectedLocation ? selectedLocation.name : "Select a location to view details"}
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
                  {/* <Image
                    src={selectedLocation.imagePath || "/location-images/location-default.jpg"}
                    alt={selectedLocation.name}
                    width={600}
                    height={400}
                    className={styles.image}
                  /> */}
                </div>
                <div className={styles.locationInfo}>
                  <h3 className={styles.locationName}>{selectedLocation.name}</h3>
                  <p className={styles.locationAddress}>
                    {selectedLocation.address}, {selectedLocation.city}, {selectedLocation.state}{" "}
                    {/* {selectedLocation.zipCode} */}
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

                  {selectedLocation.acceptedItems && selectedLocation.acceptedItems.length > 0 && (
                    <div className={styles.infoItem}>
                      <strong>Accepted Items:</strong>
                      <ul className={styles.itemsList}>
                        {selectedLocation.acceptedItems.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className={styles.actions}>
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
                  </div>
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
            <p className={styles.cardDescription}>{filteredLocations.length} locations found</p>
          </div>
          <div className={styles.listContainer}>
            {/* {loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
              </div>
            ) :
             (
              <LocationList 
                locations={filteredLocations}
                selectedLocationId={selectedLocation?.id}
                onSelectLocation={handleLocationSelect}
              />
            )
            } */}
          </div>
        </div>
      </div>
    </div>
  )
}


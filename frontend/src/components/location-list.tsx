"use client";

import type React from "react";
import type { RecyclingLocation } from "@/types/location";
import styles from "./location-list.module.css";
import Image from "next/image";

interface LocationListProps {
  locations: RecyclingLocation[];
  selectedLocationId?: string;
  onSelectLocation?: (location: RecyclingLocation) => void;
}

export default function LocationList({
  locations,
  selectedLocationId,
  onSelectLocation,
}: LocationListProps) {
  console.log("LocationList rendering with", locations.length, "locations");

  if (!locations || locations.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No locations found. Try adjusting your search.</p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {locations.map((location) => (
        <div
          key={location.id}
          className={`${styles.locationCard} ${
            selectedLocationId === location.id ? styles.selectedCard : ""
          }`}
          onClick={() => onSelectLocation && onSelectLocation(location)}
        >
          <div className={styles.locationThumbnail}>
            <Image
              // Using default image for all locations
              src="/location-images/location-default.svg" // This is the default image
              alt="Default Location Thumbnail"
              width={80}
              height={80}
              className={styles.thumbnailImage}
            />
          </div>
          <div className={styles.locationInfo}>
            <h3 className={styles.locationName}>{location.name}</h3>

            <div className={styles.locationDetail}>
              <span className={styles.detailIcon}>📍</span>
              <div>
                <p>{location.address}</p>
                <p>
                  {location.city}, {location.state} {location.zipCode}
                </p>
              </div>
            </div>

            {location.hours && (
              <div className={styles.locationDetail}>
                <span className={styles.detailIcon}>🕒</span>
                <p>{location.hours}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

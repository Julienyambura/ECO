"use client";

import { useState, useEffect } from "react";
import styles from "./stats.module.css";

// Get API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface Stats {
  totalLocations: number;
  totalGlassRecycled: number;
  co2Saved: number;
  energySaved: number;
  monthlyStats: { month: string; amount: number }[];
}

// Fallback stats in case API fails
const fallbackStats: Stats = {
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

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log(`Fetching stats from: ${API_URL}/stats`);
        const response = await fetch(`${API_URL}/stats`);

        if (!response.ok) {
          console.error(
            `API error: ${response.status} - ${response.statusText}`
          );
          // Use fallback stats instead of throwing an error
          console.log("Using fallback stats data");
          setStats(fallbackStats);
          setError("Note: Using local data. API connection failed.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Stats data received:", data);
        setStats(data);
        setLoading(false);
      } catch (error: unknown) {
        console.error("Failed to fetch stats:", error);
        // Use fallback stats
        setStats(fallbackStats);
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        setError(`Note: Using local data. API error: ${errorMessage}`);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Recycling Impact</h1>
        <p>No statistics available at this time.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recycling Impact</h1>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h2 className={styles.statTitle}>Glass Recycled</h2>
            <span className={styles.statIcon}>♻️</span>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {(stats.totalGlassRecycled / 2000).toLocaleString()} tons
            </div>
            <p className={styles.statDescription}>
              {stats.totalGlassRecycled.toLocaleString()} pounds of glass
            </p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h2 className={styles.statTitle}>CO₂ Emissions Saved</h2>
            <span className={styles.statIcon}>🌲</span>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {(stats.co2Saved / 2000).toLocaleString()} tons
            </div>
            <p className={styles.statDescription}>
              Equivalent to planting{" "}
              {Math.round(stats.co2Saved / 48).toLocaleString()} trees
            </p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h2 className={styles.statTitle}>Energy Saved</h2>
            <span className={styles.statIcon}>⚡</span>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {stats.energySaved.toLocaleString()} kWh
            </div>
            <p className={styles.statDescription}>
              Powers {Math.round(stats.energySaved / 10950).toLocaleString()}{" "}
              homes for a year
            </p>
          </div>
        </div>
      </div>

      <div className={styles.chartCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Monthly Glass Recycling</h2>
          <p className={styles.cardDescription}>
            Pounds of glass recycled per month
          </p>
        </div>
        <div className={styles.chartContent}>
          <div className={styles.barChart}>
            {stats.monthlyStats.map((month) => {
              const percentage =
                (month.amount /
                  Math.max(...stats.monthlyStats.map((m) => m.amount))) *
                100;

              return (
                <div key={month.month} className={styles.barColumn}>
                  <div
                    className={styles.bar}
                    style={{ height: `${percentage}%` }}
                    title={`${month.amount.toLocaleString()} pounds`}
                  >
                    <div className={styles.barFill}></div>
                  </div>
                  <div className={styles.barLabel}>{month.month}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.impactCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Environmental Impact</h2>
          <p className={styles.cardDescription}>
            The positive effects of glass recycling
          </p>
        </div>
        <div className={styles.impactContent}>
          <p className={styles.impactText}>
            Glass recycling has a significant positive impact on our
            environment. When we recycle glass, we reduce the need for raw
            materials, decrease energy consumption, and lower greenhouse gas
            emissions.
          </p>
          <div className={styles.impactGrid}>
            <div className={styles.impactItem}>
              <h3 className={styles.impactItemTitle}>Resource Conservation</h3>
              <p className={styles.impactItemText}>
                For every ton of glass recycled, we save over a ton of natural
                resources, including sand, limestone, and soda ash.
              </p>
            </div>
            <div className={styles.impactItem}>
              <h3 className={styles.impactItemTitle}>Energy Efficiency</h3>
              <p className={styles.impactItemText}>
                Recycling glass uses 30% less energy than making new glass from
                raw materials.
              </p>
            </div>
            <div className={styles.impactItem}>
              <h3 className={styles.impactItemTitle}>Waste Reduction</h3>
              <p className={styles.impactItemText}>
                Glass takes over 4,000 years to decompose in a landfill.
                Recycling keeps it out of landfills indefinitely.
              </p>
            </div>
            <div className={styles.impactItem}>
              <h3 className={styles.impactItemTitle}>Infinite Recyclability</h3>
              <p className={styles.impactItemText}>
                Glass can be recycled endlessly without loss in quality or
                purity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

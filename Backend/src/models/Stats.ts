import mongoose, { Schema, type Document } from "mongoose";
import type { RecyclingStats, MonthlyStats } from "../types/stats";

// Interface for the MonthlyStats subdocument
interface MonthlyStatsDocument extends MonthlyStats, Document {}

// Interface for the Stats document
export interface StatsDocument
  extends Omit<RecyclingStats, "monthlyStats">,
    Document {
  monthlyStats: MonthlyStatsDocument[];
}

// Schema for the MonthlyStats subdocument
const MonthlyStatsSchema: Schema = new Schema({
  month: { type: String, required: true },
  amount: { type: Number, required: true },
});

// Schema for the Stats model
const StatsSchema: Schema = new Schema(
  {
    totalLocations: { type: Number, required: true },
    totalGlassRecycled: { type: Number, required: true },
    co2Saved: { type: Number, required: true },
    energySaved: { type: Number, required: true },
    monthlyStats: [MonthlyStatsSchema],
  },
  {
    timestamps: true,
  }
);

// Create and export the Stats model
export default mongoose.model<StatsDocument>("Stats", StatsSchema);

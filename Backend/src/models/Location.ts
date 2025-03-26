import mongoose, { Schema, type Document } from "mongoose"

// Interface for the Location document
export interface LocationDocument extends Document {
    id?: string;
}

// Schema for the Location model
const LocationSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    hours: { type: String },
    phone: { type: String },
   
    acceptedItems: { type: [String] },
  },
  {
    timestamps: true,
  },
)

// Create and export the Location model
export default mongoose.model<LocationDocument>("Location", LocationSchema)


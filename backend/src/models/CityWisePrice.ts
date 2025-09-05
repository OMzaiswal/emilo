import mongoose, { Schema, Document } from "mongoose";

export interface ICityPricing extends Document {
  city: string;
  pricePerView: number;
  pricePerLike: number;
}

const cityPricingSchema = new Schema<ICityPricing>({
  city: { type: String, required: true },
  pricePerView: { type: Number, required: true },
  pricePerLike: { type: Number, required: true },
}, { timestamps: true });

export const CityPricing = mongoose.model<ICityPricing>("CityPricing", cityPricingSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  post: string;
  priceForViews: number;
  priceForLikes: number;
  totalPrice: number;
  status: "pending" | "paid";
  approvedBy: string;
}

const paymentSchema = new Schema<IPayment>({
  post: { type: String, required: true },
  priceForViews: { type: Number, required: true },
  priceForLikes: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["pending","paid"], default: "pending" },
  approvedBy: { type: String, default: "" },
}, { timestamps: true });

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

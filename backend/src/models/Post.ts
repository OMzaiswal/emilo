import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  author: string;
  textContent: string;
  images: string[];
  videos: string[];
  videoThumbnail: string;
  location: string;
  visibility: "public" | "private";
  views: number;
  likes: string[];
  comments: string[];
}

const postSchema = new Schema<IPost>({
  author: { type: String, required: true },
  textContent: { type: String, required: true, maxlength: 280 },
  images: { type: [String], default: [] },
  videos: { type: [String], default: [] },
  videoThumbnail: { type: String, default: "" },
  location: { type: String, required: true },
  visibility: { type: String, enum: ["public","private"], default: "public" },
  views: { type: Number, default: 0 },
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
}, { timestamps: true });

export const Post = mongoose.model<IPost>("Post", postSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  username: string;
  password: string;
  bio: string;
  profilePicture: string;
  followers: string[];
  following: string[];
  posts: string[];
  isPrivate: boolean;
  role: string;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  followers: { type: [String], default: [] },
  following: { type: [String], required: true },
  posts: { type: [String], default: [] },
  isPrivate: { type: Boolean, default: false },
  role: { type: String, default: "user" },
}, { timestamps: true });
export const User = mongoose.model<IUser>("User", userSchema);

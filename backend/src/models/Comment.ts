import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  post: string;
  author: string;
  text: string;
  parentComment?: string;
  replies: string[];
}

const commentSchema = new Schema<IComment>({
  post: { type: String, required: true },
  author: { type: String, required: true },
  text: { type: String, required: true },
  parentComment: { type: String, default: null },
  replies: { type: [String], default: [] },
}, { timestamps: true });

export const Comment = mongoose.model<IComment>("Comment", commentSchema);

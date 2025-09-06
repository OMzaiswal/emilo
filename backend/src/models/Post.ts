import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  images?: string[];
  location: string;
  likes: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  views: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
  content: { type: String, required: true, maxlength: 280 },
  images: { type: [String], default: [] },
  location: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
  comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }],
      isPublic: {
            type: Boolean,
            default: true
          }
}, { timestamps: true });

export const Post = mongoose.model<IPost>("Post", postSchema);


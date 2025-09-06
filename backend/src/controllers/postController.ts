import { Request, Response } from "express";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { User } from "../models/User";
import { uploadFileToFirebase } from "../utils/firebaseUpload";
import { Types } from "mongoose";

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Raipur",  "Pune", "Ahmedabad", 
  "Jaipur", "Surat", "Lucknow", "Indore", "Bhopal",
  "Patna", "Ludhiana", "Agra", "Nashik"
];

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, isPublic } = req.body;
    const userId = (req as any).user?.userId;
    const files = req.files as Express.Multer.File[];

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Random city selection
    const randomCity = cities[Math.floor(Math.random() * cities.length)];

    let imageUrls: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const imageUrl = await uploadFileToFirebase(file, "posts");
        imageUrls.push(imageUrl);
      }
    }

    const newPost = new Post({
      author: userId,
      content,
      images: imageUrls,
      location: randomCity,
      isPublic: isPublic !== 'false'
    });

    await newPost.save();
    await newPost.populate('author', 'fullName username profilePicture');

    res.status(201).json({
      message: "Post created successfully",
      post: newPost
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ isPublic: true })
      .populate('author', 'fullName username profilePicture')
      .populate('comments')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      posts,
      currentPage: page,
      hasMore: posts.length === limit
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = (req as any).user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(userId);
    
    if (isLiked) {
      post.likes = post.likes.filter(id => !id.equals(userId));
    } else {
      post.likes.push(userId);
    }

    await post.save();
    await post.populate('author', 'fullName username profilePicture');

    res.status(200).json({
      message: isLiked ? "Post unliked" : "Post liked",
      post
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = (req as any).user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = new Comment({
      author: userId,
      post: postId,
      content
    });

    await newComment.save();
    post.comments.push(newComment._id as Types.ObjectId);
    await post.save();

    await newComment.populate('author', 'fullName username profilePicture');

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate('author', 'fullName username profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

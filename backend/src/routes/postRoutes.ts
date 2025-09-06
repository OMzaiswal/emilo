import { Router } from "express";
import { createPost, getPosts, likePost, addComment, getComments } from "../controllers/postController";
import { upload } from "../middleware/upload";
import { authMiddleware } from "../middleware/auth";

export const postRoutes = Router();

postRoutes.post('/create', authMiddleware, upload.array('images', 5), createPost);
postRoutes.get('/feed', getPosts);
postRoutes.post('/:postId/like', authMiddleware, likePost);
postRoutes.post('/:postId/comment', authMiddleware, addComment);
postRoutes.get('/:postId/comments', getComments);

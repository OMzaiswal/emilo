import { Router } from "express";
import { validate } from "../middleware/validate";
import { userRegisterSchema } from "../validation/user";
import { registerUser } from "../controllers/authController";
import { upload } from "../middleware/upload";


export const userRoutes = Router();

userRoutes.post('/register', upload.single("profilePicture"), validate(userRegisterSchema), registerUser);


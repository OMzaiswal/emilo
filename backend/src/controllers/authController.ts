import { User } from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadFileToFirebase } from "../utils/firebaseUpload";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const profilePicFile = req.file;
        const { fullName, email, username, password, bio } = req.body;

        const existingUser = await User.findOne({$or: [{email}, {username}]});

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePicUrl = "";
        if (profilePicFile) {
            profilePicUrl = await uploadFileToFirebase(profilePicFile, "profile-pic");
        }

        const newUser = new User ({
            fullName,
            password: hashedPassword,
            email,
            username,
            bio,
            profilePicture: profilePicUrl,
        });

        await newUser.save();
        
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        res.status(201).json({ 
            message: "User registered successfully", 
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                username: newUser.username,
                bio: newUser.bio,
                profilePicture: newUser.profilePicture
            },
            token 
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { emailOrUsername, password } = req.body;

        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                username: user.username,
                bio: user.bio,
                profilePicture: user.profilePicture
            },
            token
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
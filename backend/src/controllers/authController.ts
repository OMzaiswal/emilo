import { User } from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
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
        res.status(201).json({ message: "User registered successfully", user: newUser });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
}
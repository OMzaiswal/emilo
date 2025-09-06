import { z } from "zod";

export const userRegisterSchema = z.object({
  fullName: z
    .string("Full name is required")
    .min(2, "Full name must be at least 2 characters long")
    .max(20, "Full name can not exceed 20 characters"),

  email: z
    .string("Email is required")
    .email("Invalid email format")
    .min(1, "Email is required"),

  username: z
    .string("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 10 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/, "Password must include 1 letter, 1 number, and 1 special character"),

  bio: z
    .string()
    .max(200, "Bio must be less than 200 characters")
    .optional(),

  profilePicture: z
    .string()
    .optional(),
});

export const userLoginSchema = z.object({
  emailOrUsername: z
    .string("Email or username is required")
    .min(1, "Email or username is required"),

  password: z
    .string("Password is required")
    .min(1, "Password is required"),
});

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;

import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = (err as ZodError<any>).issues.map((issue) => ({
          field: issue.path.join("."), // e.g. "email"
          message: issue.message,      // e.g. "Invalid email format"
        }));

        return res.status(400).json({
          message: "Validation failed",
          errors: formattedErrors,
        });
      }
      return res.status(500).json({ message: "Internal validation error" });
    }
  };

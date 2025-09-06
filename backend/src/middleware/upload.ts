import multer from "multer";

// using memory storage because image upload to Firebase directly
const storage = multer.memoryStorage();

export const upload = multer({ storage });

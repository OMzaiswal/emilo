import { bucket } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

export const uploadFileToFirebase = async (file: Express.Multer.File, folder: string) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const fileName = `${folder}/${uuidv4()}-${file.originalname}`;
  const fileRef = bucket.file(fileName);

  await fileRef.save(file.buffer, {
    contentType: file.mimetype,
    public: true, // file will be publicly accessible
    metadata: {
      firebaseStorageDownloadTokens: uuidv4(), // unique token for download URL
    },
  });

  // Generate public URL
  const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;

  return publicUrl;
};

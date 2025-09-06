import admin from "firebase-admin";
import "dotenv/config";

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

console.log(process.env.port);

  if (!serviceAccountString) {
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT env variable");
  }
  
  const serviceAccount = JSON.parse(
    Buffer.from(serviceAccountString, "base64").toString("utf-8")
  );
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "food-delivery-app-39717.firebasestorage.app",
  });

  export const bucket = admin.storage().bucket();
import mongoose from "mongoose";
import { env } from "../global/constants.js";
import { isDevMode } from "../utils/checkNodeMode.js";

async function connectDB() {
  const uri = env.DB_URI;

  if (!uri) {
    throw new Error("DB_URI not found in environment variables");
  }

  console.log(
    isDevMode()
      ? `Attempting to connect to MongoDB at ${uri}`
      : `Attempting to connect to MongoDB`
  );
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default connectDB;

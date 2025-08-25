import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    orientation: {
      type: String,
      required: true,
    },
    conversation_id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

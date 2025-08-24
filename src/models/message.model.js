import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    conversation_id: {
      type: String,
      required: true,
      description: "Identifier for the conversation thread.",
    },
    sender: {
      type: String,
      required: true,
      enum: ["user", "assistant"],
      description: "Sender of the message ('user' or 'assistant').",
    },
    content: {
      type: String,
      required: true,
      description: "Content of the message.",
    },
    attachment: {
      type: String,
      required: false,
      description: "Optional attachment URL or path.",
    },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

export default Message;

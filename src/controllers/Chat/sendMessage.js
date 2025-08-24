import Message from "../../models/message.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { getAIResponse } from "../../services/llm.js";

const MESSAGE_HISTORY_LIMIT = 10;

const sendMessage = async (req, res) => {
  try {
    const { conversation_id } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Message content cannot be empty."));
    }

    await Message.create({
      conversation_id,
      sender: "user",
      content,
      timestamp: new Date(),
    });

    const historyDocs = await Message.find({ conversation_id })
      .sort({ timestamp: 1 })
      .limit(MESSAGE_HISTORY_LIMIT)
      .lean();

    const formattedHistory = historyDocs.map((msg) => ({
      role: msg.sender,
      content: msg.content,
    }));

    let aiContent;
    try {
      aiContent = await getAIResponse(formattedHistory);
    } catch (e) {
      console.error(`Error calling Groq API: ${e}`);
      return res
        .status(503)
        .json(new ApiResponse(503, null, "AI service error: " + e.message));
    }

    const aiMessage = await Message.create({
      conversation_id,
      sender: "assistant",
      content: aiContent,
      timestamp: new Date(),
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, aiMessage.toJSON(), "AI response sent and saved.")
      );
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal server error."));
  }
};

export default sendMessage;

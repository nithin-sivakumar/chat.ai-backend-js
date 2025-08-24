import Message from "../../models/message.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { getAiSearchParams, getAIResponse } from "../../services/llm.js";
import axios from "axios";

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

    let aiContent,
      aiSearchText,
      attachment = null;
    try {
      aiContent = await getAIResponse(formattedHistory);

      // console.log(`AI Content starts`);
      // console.log(aiContent);
      // console.log(`AI Content ends`);

      const task = `\n\nBased on the history, check if the user wants to see an image or visual representation. You must never return more than 2 words as a search parameter. If the user seems to want to see an image or visual representation, generate and return ONLY a search parameter (single string with a maximum of 1-2 words) for that can be used to search for relevant steamy gifs or images. If not, return 'none'\n\nNever return any explanation, just return ONLY the search parameter (max 2 words) or 'none' if no image is needed.`;

      const lastMessages = formattedHistory.slice(-2);

      aiSearchText = await getAiSearchParams(lastMessages, task);

      // console.log(`AI Search Text starts`);
      // console.log(aiSearchText);
      // console.log(`AI Search Text ends`);

      if (aiSearchText.toLowerCase().includes("none")) {
        aiSearchText = null;
      } else {
        const response = await axios.get(
          `https://api.adultdatalink.com/redgifs/search?media_type=gif&search_text=${aiSearchText}&count=10`
        );
        const index = Math.floor(Math.random() * 10);
        attachment = response.data?.items?.[index]?.urls?.hd || null;
      }
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
      attachment: attachment,
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

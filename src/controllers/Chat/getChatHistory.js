import Message from "../../models/message.model.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getChatHistory = async (req, res) => {
  const { conversation_id } = req.params;
  const skip = parseInt(req.query.skip) || 0;
  const limit = Math.min(parseInt(req.query.limit) || 100, 200);

  const history = await Message.find({ conversation_id })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .lean();

  history.map((msg) => {
    msg.id = msg._id;
    delete msg._id;
    delete msg.updatedAt;
    delete msg.__v;
    return msg;
  });

  if (!history.length && skip === 0) {
    const count = await Message.countDocuments({ conversation_id });
    if (count === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Conversation not found."));
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, history, "Message history retrieved."));
};

export default getChatHistory;

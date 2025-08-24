import { v4 as uuidv4 } from "uuid";
import ApiResponse from "../../utils/ApiResponse.js";

const newChat = (req, res) => {
  const conversation_id = uuidv4();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { conversation_id },
        "New conversation started. Use this ID for future messages."
      )
    );
};

export default newChat;

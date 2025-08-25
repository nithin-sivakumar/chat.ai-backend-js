import { v4 as uuidv4 } from "uuid";
import ApiResponse from "../../utils/ApiResponse.js";
import { User } from "../../models/user.model.js";

const newChat = async (req, res) => {
  try {
    const { name, age, gender, orientation } = req.body;

    if (!name || !age || !gender || !orientation) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Missing required information."));
    }

    const conversation_id = uuidv4();

    await User.create({
      name,
      age,
      gender,
      orientation,
      conversation_id,
    });

    return res
      .status(201)
      .send(
        new ApiResponse(
          201,
          { conversation_id },
          "New conversation started. Use this ID for future messages."
        )
      );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(new ApiResponse(500, null, "Server error starting new chat."));
  }
};

export default newChat;

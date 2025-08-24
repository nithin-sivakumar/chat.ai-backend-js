import getChatHistory from "./Chat/getChatHistory.js";
import newChat from "./Chat/newChat.js";
import sendMessage from "./Chat/sendMessage.js";

const chatController = {
  new: newChat,
  send: sendMessage,
  history: getChatHistory,
};

export default chatController;

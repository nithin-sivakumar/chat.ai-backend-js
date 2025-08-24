import Groq from "groq-sdk";
import { env } from "../global/constants.js";

const groqClient = new Groq({ apiKey: env.GROQ_API_KEY });
const SYSTEM_PROMPT = env.SYSTEM_PROMPT || "You are a helpful assistant.";
const GROQ_MODEL_NAME = env.GROQ_MODEL_NAME || "mixtral-8x7b-32768";

export const getAIResponse = async (history) => {
  const messagesForGroq = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
  ];

  const chatCompletion = await groqClient.chat.completions.create({
    messages: messagesForGroq,
    model: GROQ_MODEL_NAME,
  });

  return chatCompletion.choices[0]?.message?.content || "";
};

export const getAiSearchParams = async (history, question) => {
  const messagesForGroq = [...history, { role: "system", content: question }];

  const chatCompletion = await groqClient.chat.completions.create({
    messages: messagesForGroq,
    model: GROQ_MODEL_NAME,
  });

  return chatCompletion.choices[0]?.message?.content || "";
};

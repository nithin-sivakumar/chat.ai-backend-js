import "dotenv/config";

const env = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  SYSTEM_PROMPT: process.env.SYSTEM_PROMPT,
  GROQ_MODEL_NAME: process.env.GROQ_MODEL_NAME,
  SERVER_URL: process.env.SERVER_URL,
};

for (const [key, value] of Object.entries(env)) {
  if (!value) {
    console.error(`Error: Environment variable ${key} is not set.`);
  }
}

export { env };

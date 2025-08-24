import "dotenv/config";

const env = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
};

for (const [key, value] of Object.entries(env)) {
  if (!value) {
    console.error(`Error: Environment variable ${key} is not set.`);
  }
}

export { env };

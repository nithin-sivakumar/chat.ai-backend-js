import { env } from "./global/constants.js";
import http from "http";
import app from "./app.js";
import connectDB from "./db/connect.js";

const PORT = env.PORT || 3000;

const server = http.createServer(app);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "Failed to connect to the database. Server not started.",
      error
    );
    process.exit(1);
  });

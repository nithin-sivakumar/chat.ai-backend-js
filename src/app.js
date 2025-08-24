import express from "express";
import ApiResponse from "./utils/ApiResponse.js";
import indexRouter from "./routes/index.route.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://chat-ai-one-chi.vercel.app",
    ],
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/ping", (req, res) => {
  res.send(new ApiResponse(200, null, "Pong! Server is alive."));
});

app.use("/", indexRouter);

export default app;

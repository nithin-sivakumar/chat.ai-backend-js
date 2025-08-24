import express from "express";
import chatRouter from "./chat.route.js";
import axios from "axios";

const indexRouter = express.Router();

indexRouter.use("/chat", chatRouter);

indexRouter.route("/api/proxy").get(async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: "Missing video URL" });
  }

  if (!videoUrl.includes("redgifs")) {
    return res.status(400).json({ error: "Invalid video URL" });
  }

  try {
    const response = await axios.get(videoUrl, {
      responseType: "stream",
      headers: {
        Referer: "https://www.redgifs.com/",
        Origin: "https://www.redgifs.com",
      },
    });

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Cache-Control", "public, max-age=3600");

    response.data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Proxy error" });
  }
});

export default indexRouter;

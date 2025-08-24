import express from "express";
import chatRouter from "./chat.route.js";
import https from "https";
import http from "http";
import { URL } from "url";

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

  const parsedUrl = new URL(videoUrl);
  const client = parsedUrl.protocol === "https:" ? https : http;

  const options = {
    headers: {
      Referer: "https://www.redgifs.com/",
      Origin: "https://www.redgifs.com",
      Range: req.headers.range || "",
    },
  };

  client
    .get(videoUrl, options, (videoRes) => {
      res.writeHead(videoRes.statusCode || 200, {
        "Content-Type": videoRes.headers["content-type"] || "video/mp4",
        "Content-Length": videoRes.headers["content-length"] || undefined,
        "Accept-Ranges": videoRes.headers["accept-ranges"] || "bytes",
        "Content-Range": videoRes.headers["content-range"] || undefined,
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers": "Content-Length, Content-Range",
      });

      videoRes.pipe(res);
    })
    .on("error", (err) => {
      console.error("Stream error:", err);
      res.status(500).json({ error: "Proxy stream error" });
    });
});

export default indexRouter;

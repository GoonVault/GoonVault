import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

// Import routes
import scenesRouter from "./routes/scenes";
import starsRouter from "./routes/stars";
import categoriesRouter from "./routes/categories";
import genresRouter from "./routes/genres";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Interface definitions
interface Video {
  id: string;
  name: string;
  path: string;
}

interface StatusResponse {
  status: string;
  version: string;
}

// Sample video directory - adjust to your actual path
const VIDEO_DIR = "C:/Videos";

// API Routes
app.use("/api/scenes", scenesRouter);
app.use("/api/stars", starsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/genres", genresRouter);

// Stream video from arbitrary path
app.get("/stream-path", (req: Request, res: Response): void => {
  const filePath = req.query.path as string;

  if (!filePath) {
    res.status(400).send("No file path provided");
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err: NodeJS.ErrnoException | null, stats: fs.Stats) => {
    if (err) {
      console.error("File not found:", err);
      res.status(404).send("Video not found");
      return;
    }

    // Handle range requests for video streaming
    const fileSize: number = stats.size;
    const range: string | undefined = req.headers.range;

    if (range) {
      // Parse range header
      const parts: string[] = range.replace(/bytes=/, "").split("-");
      const start: number = parseInt(parts[0], 10);
      const end: number = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize: number = end - start + 1;

      // Create response headers
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4", // You might need to adjust based on file type
      });

      // Create and pipe the read stream
      const stream: fs.ReadStream = fs.createReadStream(filePath, {
        start,
        end,
      });
      stream.pipe(res);
    } else {
      // If no range header, send the entire file
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4", // Adjust as needed
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

// Simple health check endpoint
app.get("/api/status", (req: Request, res: Response): void => {
  const response: StatusResponse = {
    status: "running",
    version: "1.0.0",
  };
  res.json(response);
});

// Start the server
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
app.listen(PORT, () => {
  console.log(`Media server running on http://localhost:${PORT}`);
  console.log(`Serving videos from: ${VIDEO_DIR}`);
});

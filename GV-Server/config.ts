// Configuration file for the media server
module.exports = {
  // Server port
  port: process.env.PORT || 3001,

  // Video directory path
  videoDir: process.env.VIDEO_DIR || "C:/Videos",

  // Allowed video extensions
  videoExtensions: [".mp4", ".webm", ".mkv", ".mov", ".avi"],
};

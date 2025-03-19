const API_URL = "http://localhost:3001"; // Your server address

export const videoService = {
  /**
   * Get the streaming URL for a video using a full path
   */
  getStreamUrl: (filePath: string): string => {
    const encodedPath = encodeURIComponent(filePath.replace(/\\/g, "/"));
    return `${API_URL}/stream-path?path=${encodedPath}`;
  },
};

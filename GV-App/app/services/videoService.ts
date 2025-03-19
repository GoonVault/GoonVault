const API_URL = "http://localhost:3001"; // Your server address

export const videoService = {
  /**
   * Get the streaming URL for a video using a full path
   */
  getStreamUrl: (filePath: string): string => {
    return `${API_URL}/stream-path?path=${encodeURIComponent(filePath)}`;
  },
};

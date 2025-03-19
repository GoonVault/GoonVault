import React from "react";
import ReactPlayer from "react-player";
import { videoService } from "../services/videoService";

interface VideoPlayerProps {
  filePath: string;
  muted?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  inTile?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  filePath,
  muted = false,
  autoPlay = true,
  controls = true,
  inTile = false,
}) => {
  const videoUrl = videoService.getStreamUrl(filePath);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ReactPlayer
        url={videoUrl}
        playing={autoPlay}
        muted={muted}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        loop={true}
        volume={0.5}
        playsinline={true}
        playIcon={<></>}
        light={false} // Always disable light mode
        config={{
          file: {
            forceVideo: true,
            attributes: {
              controlsList: "nodownload",
              playsInline: true,
            },
          },
        }}
      />
    </div>
  );
};

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { VideoPlayer } from "../VideoPlayer";
import { videoService } from "../../services/videoService";

interface SceneCardProps {
  path: string;
  onClick?: () => void;
  compact?: boolean;
}

const SceneCard: React.FC<SceneCardProps> = ({
  path,
  onClick,
  compact = true,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const fileName = path.split(/[/\\]/).pop() || "Unknown";

  // Add a ref to track hover state for cleanup
  const hoverTimeoutRef = useRef<number | null>(null);

  // Get a thumbnail URL for the video
  useEffect(() => {
    // Set up a "poster" for the video by using the video itself
    const videoUrl = videoService.getStreamUrl(path);
    setThumbnailUrl(videoUrl);
  }, [path]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Start playing on hover with a slight delay to prevent accidental hovers
  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Set a short delay before playing (50ms is barely noticeable but helps with quick passes)
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovering(true);
    }, 50);
  };

  // Stop playing when hover ends - immediately
  const handleMouseLeave = () => {
    // Clear any pending hover timeout
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Stop playback immediately
    setIsHovering(false);
  };

  // Handle click (separate from hover behavior)
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card
      sx={{
        m: 1,
        cursor: "pointer",
        height: compact ? 180 : "auto",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 3,
        },
        overflow: "hidden", // Prevent video from overflowing during scale transform
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {isHovering ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <VideoPlayer
            filePath={path}
            muted={true} // Mute by default for hover preview
            autoPlay={true} // Auto play on hover
            inTile={true} // Hide play button
            controls={false} // Hide controls for hover preview
          />
        </Box>
      ) : (
        <>
          <CardMedia
            component="div"
            sx={{
              height: 120,
              bgcolor: "rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Video Thumbnail */}
            <video
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              src={thumbnailUrl}
              preload="metadata"
              muted
              playsInline
              // Setting currentTime to 0.1 helps load the first frame faster
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = 0.1;
              }}
            />

            {/* Play Icon Overlay */}
            <IconButton
              sx={{
                position: "absolute",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
                zIndex: 2, // Make sure it's above the thumbnail
              }}
            >
              <PlayArrowIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
          </CardMedia>
          <CardContent sx={{ p: 1, flexGrow: 1, overflow: "hidden" }}>
            <Typography
              variant="body2"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {fileName}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default SceneCard;

import React, { useState, useRef } from "react";
import { Box, Card, Typography } from "@mui/material";
import { VideoPlayer } from "../VideoPlayer";
import { useLayout } from "../../LayoutProvider";

interface SceneCardProps {
  path: string;
  onClick?: () => void;
  compact?: boolean;
  isSelected: boolean;
  onSelect: (path: string) => void;
}

const SceneCard: React.FC<SceneCardProps> = ({
  path,
  onClick,
  compact = true,
  isSelected,
  onSelect,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const fileNameWithExtension = path.split(/[/\\]/).pop() || "Unknown";
  const fileName = fileNameWithExtension.replace(/\.[^/.]+$/, ""); // Remove file extension
  const hoverTimeoutRef = useRef<number | null>(null);
  const { getTileDimensions } = useLayout();
  const { width, height } = getTileDimensions();

  // Start playing on hover with a slight delay
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovering(true);
    }, 50);
  };

  // Stop playing when hover ends
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovering(false);
  };

  const handleSelect = () => {
    onSelect(path);
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        width: compact ? width : "auto",
        height: compact ? height : "auto",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 3,
          "& .overlay": {
            display: "none",
          },
        },
        position: "relative",
        backgroundColor: isSelected ? "rgba(0, 0, 255, 0.3)" : "black", // Highlight selected card
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSelect}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <VideoPlayer
          filePath={path}
          muted={true}
          autoPlay={isHovering}
          controls={false}
          inTile={true}
        />
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "8px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {fileName}
          </Typography>
        </Box>
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "8px",
          }}
        >
          <Typography variant="body2">Top Left Overlay</Typography>
        </Box>
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "8px",
          }}
        >
          <Typography variant="body2">Top Right Overlay</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default SceneCard;

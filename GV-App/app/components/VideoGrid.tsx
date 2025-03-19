import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { FixedSizeGrid } from "react-window";
import SceneCard from "./Cards/SceneCard";

interface VideoGridProps {
  videoPaths: string[];
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videoPaths }) => {
  // Dimensions for the container
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Tile dimensions
  const COLUMN_WIDTH = 280; // Slightly wider to accommodate card padding
  const ROW_HEIGHT = 220; // Slightly taller to accommodate card padding

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (gridContainerRef.current) {
        const { width, height } =
          gridContainerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Initial update
    updateDimensions();

    // Add resize listener
    window.addEventListener("resize", updateDimensions);

    // Cleanup
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (videoPaths.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body1">No videos available.</Typography>
      </Box>
    );
  }

  // Calculate grid dimensions
  const { width, height } = dimensions;
  const columnCount = Math.max(1, Math.floor(width / COLUMN_WIDTH));
  const rowCount = Math.ceil(videoPaths.length / columnCount);

  // Cell renderer
  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= videoPaths.length) return null;

    const path = videoPaths[index];

    // Add some padding inside the cell
    const innerStyle = {
      ...style,
      left: (style.left as number) + 8,
      top: (style.top as number) + 8,
      width: (style.width as number) - 16,
      height: (style.height as number) - 16,
    };

    return (
      <div style={innerStyle}>
        <SceneCard path={path} compact={true} />
      </div>
    );
  };

  return (
    <Box
      ref={gridContainerRef}
      sx={{
        width: "100%",
        height: "100%", // Take full height of parent container
        overflow: "visible", // Don't add scrollbars here
      }}
    >
      {width > 0 && height > 0 && (
        <FixedSizeGrid
          columnCount={columnCount}
          columnWidth={COLUMN_WIDTH}
          height={height}
          rowCount={rowCount}
          rowHeight={ROW_HEIGHT}
          width={width}
          style={{ overflow: "visible" }} // Let parent handle scrolling
        >
          {Cell}
        </FixedSizeGrid>
      )}
    </Box>
  );
};

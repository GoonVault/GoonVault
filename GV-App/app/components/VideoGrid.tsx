import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { FixedSizeGrid } from "react-window";
import SceneCard from "./Cards/SceneCard";
import { useLayout } from "../LayoutProvider";

interface VideoGridProps {
  videoPaths: string[];
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videoPaths }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const { columnsPerRow, getTileDimensions } = useLayout();
  const { width: tileWidth, height: tileHeight } = getTileDimensions();

  useEffect(() => {
    const updateDimensions = () => {
      if (gridContainerRef.current) {
        const { width, height } =
          gridContainerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (videoPaths.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body1">No videos available.</Typography>
      </Box>
    );
  }

  const { width, height } = dimensions;
  const columnCount = columnsPerRow;
  const rowCount = Math.ceil(videoPaths.length / columnCount);

  const handleSelect = (path: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(path)
        ? prevSelected.filter((item) => item !== path)
        : [...prevSelected, path]
    );
  };

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= videoPaths.length) return null;

    const path = videoPaths[index];
    const isSelected = selectedItems.includes(path);

    // Add padding around each tile
    const paddedStyle = {
      ...style,
      padding: 8, // Adjust padding as needed
    };

    return (
      <div style={paddedStyle}>
        <SceneCard
          path={path}
          compact={true}
          isSelected={isSelected}
          onSelect={handleSelect}
        />
      </div>
    );
  };

  return (
    <Box
      ref={gridContainerRef}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    >
      {width > 0 && height > 0 && (
        <FixedSizeGrid
          columnCount={columnCount}
          columnWidth={tileWidth + 16} // Adjust column width to account for padding
          height={height}
          rowCount={rowCount}
          rowHeight={tileHeight + 16} // Adjust row height to account for padding
          width={width}
          style={{ overflow: "visible" }}
        >
          {Cell}
        </FixedSizeGrid>
      )}
    </Box>
  );
};

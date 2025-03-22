import { Box } from "@mui/material";
import React, { useContext } from "react";
import { VideoGrid } from "./VideoGrid";
import { AppContext } from "../AppProvider";

interface MainContentProps {}

export function MainContent({}: MainContentProps) {
  const { filteredState } = useContext(AppContext);

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        overflowY: "auto", // Keep this for MainContent scrolling
        overflowX: "hidden", // Prevent horizontal scrolling
        height: "100%", // Fill the available space
      }}
    >
      <VideoGrid videoPaths={filteredState} />
    </Box>
  );
}

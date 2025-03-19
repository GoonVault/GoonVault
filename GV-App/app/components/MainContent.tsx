import { Box, Typography, Divider } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../AppProvider";
import { VideoGrid } from "./VideoGrid";

export function MainContent() {
  const context = useContext(AppContext);

  if (!context) {
    return <Typography>Context not available</Typography>;
  }

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        overflowY: "auto", // Keep this for MainContent scrolling
        p: 2,
        height: "100%", // Fill the available space
      }}
    >
      <Divider sx={{ mb: 3 }} />
      <VideoGrid videoPaths={context.state} />
    </Box>
  );
}

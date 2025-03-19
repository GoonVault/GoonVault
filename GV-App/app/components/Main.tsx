import React from "react";
import { Box } from "@mui/material";
import { Header } from "./Header";
import { MainContent } from "./MainContent";
import { Footer } from "./Footer";

export function Main() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        overflow: "hidden", // Prevent scrolling at this level
      }}
    >
      {/* Sticky Header */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 1100 }}>
        <Header />
      </Box>

      {/* Scrollable Content Area */}
      <Box
        sx={{
          flex: "1 1 auto",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MainContent />
      </Box>

      {/* Sticky Footer */}
      <Box sx={{ position: "sticky", bottom: 0, zIndex: 1000 }}>
        <Footer />
      </Box>
    </Box>
  );
}

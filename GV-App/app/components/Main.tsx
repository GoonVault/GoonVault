import React, { useState, useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { Header } from "./Header";
import { MainContent } from "./MainContent";
import Footer from "./Footer";
import { LayoutControls } from "./LayoutControls";
import { AppContext } from "../AppProvider";

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
      <LayoutControls />
      {/* Scrollable Content Area */}
      <Box
        sx={{
          flex: "1 1 auto",
          overflowY: "auto", // Allow vertical scrolling
          overflowX: "hidden", // Prevent horizontal scrolling
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

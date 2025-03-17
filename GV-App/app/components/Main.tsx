import React from "react";
import { Box, Container, Typography } from "@mui/material";
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
        width: "100vw",
      }}
    >
      <Header />
      <MainContent />
      <Footer />
    </Box>
  );
}

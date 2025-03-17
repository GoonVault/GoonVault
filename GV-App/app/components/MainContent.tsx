import { Box, Container, Typography } from "@mui/material";
import React from "react";
import LinkCard from "./Cards/LinkCard";

export function MainContent() {
  return (
    <Box
      sx={{
        flex: "1 1 auto",
        overflowY: "auto",
      }}
    >
      <LinkCard url="https://example.com" />
    </Box>
  );
}

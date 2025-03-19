import React, { useEffect } from "react";
import { AppBar, Typography, Box } from "@mui/material";
import QuickFilter from "./QuickFilter";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box>
      <QuickFilter />
    </Box>
  );
};

export default Footer;

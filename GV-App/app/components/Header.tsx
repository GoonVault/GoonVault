import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { useState } from "react";

export function Header() {
  const [gvTypes, setGvTypes] = useState(["web"]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    gvTypes: string[]
  ) => {
    console.log("ha");
    setGvTypes(gvTypes);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
      <ToggleButtonGroup
        value={gvTypes}
        onChange={handleChange}
        aria-label="device"
      >
        <ToggleButton value="Bookmarks">Bookmarks</ToggleButton>
        <ToggleButton value="Categories">Categories</ToggleButton>
        <ToggleButton value="DVDs">DVDs</ToggleButton>
        <ToggleButton value="Genres">Genres</ToggleButton>
        <ToggleButton value="Images">Images</ToggleButton>
        <ToggleButton value="Links">Links</ToggleButton>
        <ToggleButton value="Scenes">Scenes</ToggleButton>
        <ToggleButton value="Stars">Stars</ToggleButton>
        <ToggleButton value="Websites">Websites</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

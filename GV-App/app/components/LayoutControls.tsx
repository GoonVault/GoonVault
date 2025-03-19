import React from "react";
import { Box, Slider, Typography } from "@mui/material";
import { useLayout } from "../LayoutProvider";

export const LayoutControls = () => {
  const { columnsPerRow, setColumnsPerRow } = useLayout();

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Typography sx={{ minWidth: 100 }}>Columns:</Typography>
      <Box sx={{ width: 200 }}>
        <Slider
          value={columnsPerRow}
          min={2}
          max={8}
          step={1}
          onChange={(_, value) => setColumnsPerRow(value as number)}
          valueLabelDisplay="auto"
          marks
          sx={{ mt: 1 }}
        />
      </Box>
    </Box>
  );
};

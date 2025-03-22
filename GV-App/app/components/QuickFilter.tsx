import React, { useEffect, useState, useContext } from "react";
import { TextField, ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import LooksThreeIcon from "@mui/icons-material/Looks3";
import { AppContext } from "../AppProvider";

interface QuickFilterProps {}

const QuickFilter: React.FC<QuickFilterProps> = ({}) => {
  const { filter, setFilter } = useContext(AppContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter((prevFilter) => ({
      ...prevFilter,
      searchText: value,
    }));
  };

  const handleRatingChange = (
    event: React.MouseEvent<HTMLElement>,
    newRatings: string[]
  ) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      rating: newRatings.join(","),
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        alignItems: "center",
        justifyContent: "center", // Center the quick filter
        width: "300px", // Fixed width
        margin: "0 auto", // Center horizontally
      }}
    >
      <TextField
        onChange={handleInputChange}
        placeholder="Search..."
        variant="outlined"
        size="small"
        fullWidth
      />
      <Box sx={{ display: "flex" }}>
        <ToggleButtonGroup
          size="small"
          value={filter.rating.split(",")}
          onChange={handleRatingChange}
        >
          <ToggleButton value="1st">
            <LooksOneIcon />
          </ToggleButton>
          <ToggleButton value="2nd">
            <LooksTwoIcon />
          </ToggleButton>
          <ToggleButton value="3rd">
            <LooksThreeIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default QuickFilter;

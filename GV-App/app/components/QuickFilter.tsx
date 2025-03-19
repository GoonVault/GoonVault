import React, { useEffect, useState, useContext } from "react";
import { TextField } from "@mui/material";
import { AppContext } from "../AppProvider";

interface QuickFilterProps {}

const QuickFilter: React.FC<QuickFilterProps> = ({}) => {
  const { setFilter } = useContext(AppContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter((prevFilter) => ({
      ...prevFilter,
      searchText: value,
    }));
  };

  return (
    <TextField
      onChange={handleInputChange}
      placeholder="Search..."
      variant="outlined"
      fullWidth
    />
  );
};

export default QuickFilter;

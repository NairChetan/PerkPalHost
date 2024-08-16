import { TextField, Box } from "@mui/material";
import React from "react";

const YearSelector = () => {
  return (
    <Box sx={{ marginBottom: "1.5rem" }}>
      <TextField
        id="year"
        label="Year"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />
    </Box>
  );
};

export default YearSelector;

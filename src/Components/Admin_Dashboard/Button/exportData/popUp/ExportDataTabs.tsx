import { Tabs, Tab, Box } from "@mui/material";
import React, { useState } from "react";

const ExportDataTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
<Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "1rem" }}>
  <Tabs
    value={value}
    onChange={handleChange}
    textColor="inherit" // Modified to "inherit" to take the color of the parent, which should be white
    indicatorColor="primary" // Modified to use a primary color
    centered
    sx={{
      '& .MuiTabs-indicator': {
        backgroundColor: '#FFFFFF', // Custom white color for the indicator
      },
      '& .MuiTab-root': {
        color: '#FFFFFF', // Custom white color for the text
      },
    }}
  >
    <Tab label="Chart data" />
    <Tab label="Leader-board data" />
    <Tab label="Category data" />
  </Tabs>
</Box>

  );
};

export default ExportDataTabs;

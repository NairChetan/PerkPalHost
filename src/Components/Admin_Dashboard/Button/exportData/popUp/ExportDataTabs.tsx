import { Tabs, Tab, Box } from "@mui/material";
import React, { useState } from "react";

const ExportDataTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "2rem" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        centered
      >
        <Tab label="Chart data" />
        <Tab label="Leader-board data" />
        <Tab label="Category data" />
      </Tabs>
    </Box>
  );
};

export default ExportDataTabs;

import { Tabs, Tab, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Tab4 from "./Tab4";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const ExportDataTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          centered
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#FFFFFF", // Custom white color for the indicator
            },
            "& .MuiTab-root": {
              color: "#FFFFFF", // Custom white color for the text
              textAlign: "center",
              maxWidth: {
                xs: "100px",
                sm: "150px",
                md: "300px",
                lg: "300px",
                xl: "300px",
              }, // Set maxWidth for smaller screens
              whiteSpace: "normal", // Allow wrapping
              lineHeight: 1.2, // Adjust line height for better readability
              overflow: "visible", // Prevent text from being cut off
            },
          }}
        >
          <Tab label="Activity data" />
          <Tab label="Chart data" />
          <Tab label="Leader-board data" />
          <Tab label="Category data" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Tab4 />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Tab1 />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Tab2 />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Tab3 />
      </TabPanel>
    </>
  );
};

export default ExportDataTabs;

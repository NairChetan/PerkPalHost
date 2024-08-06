import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

interface ChartTabProps {
  selectedTab: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const ChartTab: React.FC<ChartTabProps> = ({
  selectedTab,
  handleTabChange,
}) => {
  return (
    <Box sx={{ width: "100%", height: "90%" }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ p: 0, m: 0 }}
        centered
        TabIndicatorProps={{
          style: {
            backgroundColor: "#06c", // Change the color of the indicator line
            height: "3px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",

            // Change the height of the indicator line
          },
        }}
      >
        <Tab
          label="Employee-Data"
          sx={{
            p: 0,
            m: 0,
            fontWeight: 600,
            fontSize: {
              xs: "3.5vw", // Extra small devices (phones, 600px and down)
              sm: "2.7vw", // Small devices (tablets, 600px and up)
              md: "2vw", // Medium devices (desktops, 900px and up)
              lg: "1.5vw", // Large devices (large desktops, 1200px and up)
              xl: "1.5vw", // Extra large devices (larger desktops, 1536px and up)
            },
          }}
        />
        <Tab
          label="DU-Data"
          sx={{
            pr: "1%",
            m: 0,
            fontWeight: 600,
            fontSize: {
              xs: "3.5vw", // Extra small devices (phones, 600px and down)
              sm: "2.7vw", // Small devices (tablets, 600px and up)
              md: "2vw", // Medium devices (desktops, 900px and up)
              lg: "1.5vw", // Large devices (large desktops, 1200px and up)
              xl: "1.5vw", // Extra large devices (larger desktops, 1536px and up)
            },
          }}
        />
      </Tabs>
    </Box>
  );
};

export default ChartTab;

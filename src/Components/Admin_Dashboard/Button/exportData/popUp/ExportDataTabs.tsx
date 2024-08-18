import { Tabs, Tab, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import YearSelector from "./YearSelector";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "1rem" }}
      >
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
          <Tab label="Chart data" />
          <Tab label="Leader-board data" />
          <Tab label="Category data" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Dropdown label="Select Chart" options={["Chart 1", "Chart 2"]} />
        <Dropdown label="Quarter" options={["Q1", "Q2", "Q3", "Q4"]} />
        <YearSelector />
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
            px: "2%",
            marginTop: "1rem",
            backgroundColor: "#303137",
            borderRadius: "15px", // Button color
            "&:hover": {
              backgroundColor: "black", // Hover color
            },
            display: "flex", // Ensures content is aligned properly
            justifyContent: "center", // Centers the content horizontally
            alignItems: "center", // Centers the content vertically
          }}
        >
          Preview
          <ArrowDropDownIcon sx={{ marginLeft: "0.2rem" }} />{" "}
          {/* Added down arrow */}
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
            marginTop: "1.5rem",
            backgroundColor: "#4741FC",
            borderRadius: "15px", // Button color
            "&:hover": {
              backgroundColor: "black", // Hover color
            },
          }}
        >
          Export
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Dropdown label="Quarter" options={["Q1", "Q2", "Q3", "Q4"]} />
        <YearSelector />
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
            px: "2%",
            marginTop: "1rem",
            backgroundColor: "#303137",
            borderRadius: "15px", // Button color
            "&:hover": {
              backgroundColor: "black", // Hover color
            },
            display: "flex", // Ensures content is aligned properly
            justifyContent: "center", // Centers the content horizontally
            alignItems: "center", // Centers the content vertically
          }}
        >
          Preview
          <ArrowDropDownIcon sx={{ marginLeft: "0.2rem" }} />{" "}
          {/* Added down arrow */}
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
            marginTop: "1.5rem",
            backgroundColor: "#4741FC",
            borderRadius: "15px", // Button color
            "&:hover": {
              backgroundColor: "black", // Hover color
            },
          }}
        >
          Export
        </Button>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
            px: "2%",
            marginTop: "1rem",
            backgroundColor: "#303137",
            borderRadius: "15px", // Button color
            "&:hover": {
              backgroundColor: "black", // Hover color
            },
            display: "flex", // Ensures content is aligned properly
            justifyContent: "center", // Centers the content horizontally
            alignItems: "center", // Centers the content vertically
          }}
        >
          Preview
          <ArrowDropDownIcon sx={{ marginLeft: "0.2rem" }} />{" "}
          {/* Added down arrow */}
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
            marginTop: "1.5rem",
            backgroundColor: "#4741FC",
            borderRadius: "15px", // Button color
            "&:hover": {
              backgroundColor: "black", // Hover color
            },
          }}
        >
          Export
        </Button>
      </TabPanel>
    </>
  );
};

export default ExportDataTabs;

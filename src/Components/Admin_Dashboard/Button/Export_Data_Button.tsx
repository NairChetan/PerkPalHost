import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import GetAppIcon from "@mui/icons-material/GetApp";

const Export_Data_Button = () => {
  const [open, setOpen] = useState<boolean>(false);
  const refOne = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
    return () => {
      document.removeEventListener("click", hideOnClickOutside, true);
    };
  }, []);

  const hideOnClickOutside = (e: MouseEvent) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen((open) => !open)}
        sx={{
          px: "5%",
          width: "100%",
          height: "20%",
          backgroundColor: "#ffe1e1", // Change button background color
          color: "#831919", // Change text color
          display: "flex",
          alignItems: "center", // Align items vertically center
          justifyContent: "flex-start", // Align items horizontally to the start
          borderRadius: 7,

          boxShadow: 1,
          fontWeight: 700,
          fontSize: {
            xs: "5.5vw", // Extra small devices (phones, 600px and down)
            sm: "2.5vw", // Small devices (tablets, 600px and up)
            md: "2.5vw", // Medium devices (desktops, 900px and up)
            lg: "1.15vw", // Large devices (large desktops, 1200px and up)
            xl: "1.15vw", // Extra large devices (larger desktops, 1536px and up)
          },
          "&:hover": {
            backgroundColor: "#dba2a2", // Change background color on hover
            color: "#5a1a1a", // Change text color
          },
        }}
      >
        <Box
          sx={{
            width: "25%",
            height: "100%",
            display: "flex",
            alignItems: "center", // Align items vertically center
            justifyContent: "center", // Align items horizontally to the start
            fontSize: {
              xs: "20vw", // Extra small devices (phones, 600px and down)
              sm: "7vw", // Small devices (tablets, 600px and up)
              md: "7vw", // Medium devices (desktops, 900px and up)
              lg: "4vw", // Large devices (large desktops, 1200px and up)
              xl: "4vw", // Extra large devices (larger desktops, 1536px and up)
            },
          }}
        >
          <GetAppIcon fontSize="inherit" />
        </Box>
        Export Data
      </Button>
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backdropFilter: "blur(10px)",
            zIndex: 99, // Ensure it's behind the DateRangePicker but above other content
          }}
        />
      )}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "100",
            border: "1px solid gray",
            width: "50vw",
            height: "50vh",
            background: "#fff", // Add border with width, style, and color
          }}
          ref={refOne}
        ></Box>
      )}
    </>
  );
};

export default Export_Data_Button;

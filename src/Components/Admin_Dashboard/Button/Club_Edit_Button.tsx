import { Box, Button } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const Club_Edit_Button = () => {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          px: "5%",
          width: "100%",
          height: "20%",
          backgroundColor: "#E4F048",
          display: "flex",
          alignItems: "center", // Align items vertically center
          justifyContent: "flex-start", // Align items horizontally to the start
          borderRadius: 7,
          color: "#111",
          boxShadow: 1,
          fontWeight: 700,
          fontSize: {
            xs: "5.5vw", // Extra small devices (phones, 600px and down)
            sm: "2.5vw", // Small devices (tablets, 600px and up)
            md: "2.5vw", // Medium devices (desktops, 900px and up)
            lg: "1.15vw", // Large devices (large desktops, 1200px and up)
            xl: "1.15vw", // Extra large devices (larger desktops, 1536px and up)
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
          <EditIcon fontSize="inherit" />
        </Box>
        Club Edit
      </Button>
    </>
  );
};

export default Club_Edit_Button;

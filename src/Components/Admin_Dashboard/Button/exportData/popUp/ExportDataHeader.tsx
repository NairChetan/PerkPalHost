import { Typography } from "@mui/material";
import React from "react";

const ExportDataHeader = () => {
  return (
    <Typography
      variant="h5"
      component="h2"
      sx={{
        color: "#fff",
        fontWeight: 700,
        marginBottom: "0rem",
        textAlign: "center",
        fontSize: {
          xs: "1.5rem", // For extra small screens (mobile)
          sm: "1.7rem", // For small screens (small tablets)
          md: "2rem", // For medium screens (tablets)
          lg: "2rem", // For large screens (desktops)
          xl: "2.25rem", // For extra large screens
        },
      }}
    >
      Export Data
    </Typography>
  );
};

export default ExportDataHeader;

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
      }}
    >
      Export Data
    </Typography>
  );
};

export default ExportDataHeader;

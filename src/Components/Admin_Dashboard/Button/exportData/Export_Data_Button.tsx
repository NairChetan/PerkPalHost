import { useState, useRef } from "react";
import { Box, Button, IconButton } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import CloseIcon from "@mui/icons-material/Close";
import ExportDataHeader from "./popUp/ExportDataHeader";
import ExportDataTabs from "./popUp/ExportDataTabs";

const ExportDataButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const refOne = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpen(false);
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
          backgroundColor: "#ffe1e1",
          color: "#831919",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          borderRadius: 7,
          boxShadow: 1,
          fontWeight: 700,
          fontSize: {
            xs: "5.5vw",
            sm: "2.5vw",
            md: "2.5vw",
            lg: "1.15vw",
            xl: "1.15vw",
          },
          "&:hover": {
            backgroundColor: "#dba2a2",
            color: "#5a1a1a",
          },
        }}
      >
        <Box
          sx={{
            width: "25%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: {
              xs: "20vw",
              sm: "7vw",
              md: "7vw",
              lg: "4vw",
              xl: "4vw",
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
            zIndex: 99,
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
            width: {
              xs: "90vw", // For extra small screens (mobile)
              sm: "90vw", // For small screens (small tablets)
              md: "70vw", // For medium screens (tablets)
              lg: "50vw", // For large screens (desktops)
              xl: "50vw", // For extra large screens
            },
            height: "auto",
            maxHeight: "90vh",
            background: "#1D1E22",
            borderRadius: "50px",
            padding: "2rem",
            overflowY: "auto",
            // Custom scrollbar styles
            "&::-webkit-scrollbar": {
              width: "7px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#2c2c2c",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#6c6c6c",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#9c9c9c",
            },
          }}
          ref={refOne}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>

          <ExportDataHeader />
          <ExportDataTabs />
        </Box>
      )}
    </>
  );
};

export default ExportDataButton;

import { Box, Button } from "@mui/material";
import { useState, useRef } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NewCategoryForm from "../Section2/GetPoints/NewCategoryForm";

const NewCategoryRequest = () => {
  const [open, setOpen] = useState<boolean>(false);
  const refOne = useRef<HTMLDivElement>(null);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: {
            xs: "45%", // For extra-small screens
            sm: "45%", // For small screens
            md: "48.5%", // For medium screens
            lg: "35%", // For large screens
            xl: "35%", // For extra-large screens
          },
        }}
      >
        {/* Button for get points */}
        <Button
          variant="contained"
          onClick={() => setOpen((open) => !open)}
          sx={{
            px: "5%",
            width: "100%",
            height: {
              xs: "45%", // For extra-small screens
              sm: "45%", // For small screens
              md: "45%", // For medium screens
              lg: "45%", // For large screens
              xl: "45%", // For extra-large screens
            },

            backgroundColor: "black", // Default background color
            display: "flex",
            alignItems: "center", // Align items vertically center
            justifyContent: "center", // Center items horizontally
            borderRadius: 15,
            color: "white",
            boxShadow: 1,
            fontWeight: 700,
            fontSize: {
              xs: "4.7vw", // Extra small devices (phones, 600px and down)
              sm: "2.8vw", // Small devices (tablets, 600px and up)
              md: "2.5vw", // Medium devices (desktops, 900px and up)
              lg: "1vw", // Large devices (large desktops, 1200px and up)
              xl: "1vw", // Extra large devices (larger desktops, 1536px and up)
            },
            textAlign: "center", // Center-align text
            "&:hover": {
              backgroundColor: "#dba2a2", // Background color on hover
              color: "#5a1a1a", // Text color on hover (optional)
            },
          }}
        >
          New Category
        </Button>

        {/* Modal here */}
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
              width: "399px",
              height: "80vh",
              borderRadius: "15px",
              background: "#1D1E22",
              padding: "0%",
              color: "#FFFFFF", // Add border with width, style, and color
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
            <NewCategoryForm />
          </Box>
        )}
      </Box>
    </>
  );
};

export default NewCategoryRequest;

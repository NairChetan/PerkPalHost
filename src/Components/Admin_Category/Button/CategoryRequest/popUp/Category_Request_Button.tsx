import React from 'react';
import  { useState,  useRef } from 'react';
import { Box, Button,IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CategoryRequest from '../../../CategoryRequest';



const Category_Request_Button = () => {
    const [open, setOpen] = useState<boolean>(false);
    const refOne = useRef<HTMLDivElement>(null);
  
  
    const handleClose = () => {
      setOpen(false);
    };

    const CustomButton = styled(Button)(({ theme }) => ({
      '&.MuiButton-root': {
        padding: '12px 0px',
        marginLeft: '-5px'  // Customize the root padding here
      },
    }));
  return (
    <>
    <Box>
      <CustomButton 
        variant="contained"
        onClick={() => setOpen((open) => !open)}
        sx={{
          width: "150%",
          height: "7%",
          marginTop:"10px",
          marginLeft:"-25px",
          paddingRight:"50px",
          backgroundColor: "#ffe1e1", // Change button background color
          color: "#831919", // Change text color
          display: "flex",
          alignItems: "center", // Align items vertically center
          justifyContent: "flex-start", // Align items horizontally to the start
          borderRadius: 5,
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
          {/* <EditIcon fontSize="inherit" /> */}
        </Box>
        Category Request
      </CustomButton>
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
            width: "70%",
            height: "70vh",
            borderRadius: "15px",
            background: "#1D1E22",
            padding: "1%",
            color: "#FFFFFF" // Add border with width, style, and color
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
        <CategoryRequest/>
        </Box>
      )}
    
    </Box>
    </>
  )
}

export default Category_Request_Button

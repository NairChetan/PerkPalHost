
import React from 'react'
import {  Button } from "@mui/material";

const KnowYourCategory = () => {
    
  return (
    <>
         <Button
            variant="contained"
            sx={{
              px: "5%",
              width: {
                xs: "50%", // For extra-small screens
                sm: "50%", // For small screens
                md: "48.5%", // For medium screens
                lg: "60%", // For large screens
                xl: "60%", // For extra-large screens
              },
              height: "auto",
              backgroundColor: "#801c26", // Default background color
              display: "flex",
              alignItems: "center", // Align items vertically center
              justifyContent: "center", // Center items horizontally
              borderRadius: 7,
              color: "#ffffff",
              boxShadow: 1,
              fontWeight: 700,
              fontSize: {
                xs: "4.7vw", // Extra small devices (phones, 600px and down)
                sm: "2.5vw", // Small devices (tablets, 600px and up)
                md: "2.5vw", // Medium devices (desktops, 900px and up)
                lg: "1vw", // Large devices (large desktops, 1200px and up)
                xl: "1vw", // Extra large devices (larger desktops, 1536px and up)
              },
              textAlign: "center", // Center-align text
              '&:hover': {
                backgroundColor: "#dba2a2", // Background color on hover
                color: "#5a1a1a", // Text color on hover (optional)
              },
              }}>
              Know Your Category
            </Button>
    </>
  )
}

export default KnowYourCategory

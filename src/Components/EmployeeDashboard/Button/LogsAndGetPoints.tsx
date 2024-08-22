import React from 'react'
import { Box, Button,} from "@mui/material";
const LogsAndGetPoints = () => {
  
  return (
    <>
        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between', width: {
                    xs: "45%", // For extra-small screens
                    sm: "45%", // For small screens
                    md: "48.5%", // For medium screens
                    lg: "35%", // For large screens
                    xl: "35%", // For extra-large screens
                  },}}>
                <Button sx={{
                   px: "5%",
                   width: {
                    xs: "100%", // For extra-small screens
                    sm: "100%", // For small screens
                    md: "100%", // For medium screens
                    lg: "100%", // For large screens
                    xl: "100%", // For extra-large screens
                  },
                  height: {
                    xs: "45%", // For extra-small screens
                    sm: "45%", // For small screens
                    md: "45%", // For medium screens
                    lg: "45%", // For large screens
                    xl: "45%", // For extra-large screens
                  },
                   backgroundColor: "#ffc9ce", // Default background color
                   display: "flex",
                   alignItems: "center", // Align items vertically center
                   justifyContent: "center", // Center items horizontally
                   borderRadius: 15,
                   color: "#801c26",
                   boxShadow: 1,
                   fontWeight: 700,
                   fontSize: {
                     xs: "4.7vw", // Extra small devices (phones, 600px and down)
                     sm: "3vw", // Small devices (tablets, 600px and up)
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
                  Logs
                </Button>

                {/* Button for get points */}
                <Button
                
                sx={{
                  px: "5%",
                  width:'100%',
                  height: {
                    xs: "45%", // For extra-small screens
                    sm: "45%", // For small screens
                    md: "45%", // For medium screens
                    lg: "45%", // For large screens
                    xl: "45%", // For extra-large screens
                  },
                   
                   backgroundColor: "#ffc9ce", // Default background color
                   display: "flex",
                   alignItems: "center", // Align items vertically center
                   justifyContent: "center", // Center items horizontally
                   borderRadius: 15,
                   color: "#801c26",
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
                   '&:hover': {
                     backgroundColor: "#dba2a2", // Background color on hover
                     color: "#5a1a1a", // Text color on hover (optional)
                   },
                }}
                >
                  Get Points
                </Button>

                {/* Modal here */}
            </Box>
    
    </>
  )
}

export default LogsAndGetPoints

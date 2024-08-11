import React from "react";
import { Box, Button, Grid } from "@mui/material";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";


import Points from "../Components/EmployeeDashboard/Section1/Points";
import RedeemablePoints from "../Components/EmployeeDashboard/Section2/RedeemablePoints";
import Leaderboard from "../Components/EmployeeDashboard/Section1/LeaderBoard";
import Clubs from "../Components/EmployeeDashboard/Section2/Clubs";







// import Typography from "@mui/material/Typography";
// import Button from '@mui/material/Button';
 
const EmployeeDashboard = () => {
  return (
    <>
      <Navbar />
 
      <Grid
        container
        sx={{
          width: "100%",
          height: {
            xs: "auto", // For extra-small screens
            sm: "auto", // For small screens
            md: "auto", // For medium screens
            lg: "78vh", // For large screens
            xl: "78vh", // For extra-large screens
          },
          backgroundColor: "#f3f3f3",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          px: {
            xs: "4%", // Padding x for extra-small screens
            sm: "3%", // Padding x for small screens
            md: "3%", // Padding x for medium screens
            lg: "2%", // Padding x for large screens
            xl: "2%", // Padding x for extra-large screens
          },
          m: 0,
        }}
      >
        <Grid
          item
          sx={{
            width: {
              xs: "100%", // For extra-small screens
              sm: "48.5%", // For small screens
              md: "48.5%", // For medium screens
              lg: "23%", // For large screens
              xl: "23%", // For extra-large screens
            },
            height: {
              xs: "88vh", // For extra-small screens
              sm: "88vh", // For small screens
              md: "88vh", // For medium screens
              lg: "90%", // For large screens
              xl: "90%", // For extra-large screens
            },
            mt: {
              xs: "3%", // For extra-small screens
              sm: "3%", // For small screens
              md: "3%", // For medium screens
              lg: 0, // For large screens
              xl: 0, // For extra-large screens
            },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "30%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "row",
              boxShadow: 1,
              borderRadius: 7,
            }}
          >
            <Points/>
          
          </Box>

          {/* Leaderboard Section */}
          <Box
            sx={{
              width: "100%",
              height: "65%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              boxShadow: 1,
              borderRadius: 7,
            }}
          >
            <Leaderboard/>
            
          </Box>
        </Grid>

        {/* Section 2 starts here */}
        <Grid
          item
          sx={{
            width: {
              xs: "100%", // For extra-small screens
              sm: "48.5%", // For small screens
              md: "48.5%", // For medium screens
              lg: "20%", // For large screens
              xl: "20%", // For extra-large screens
            },
            height: {
              xs: "88vh", // For extra-small screens
              sm: "88vh", // For small screens
              md: "88vh", // For medium screens
              lg: "90%", // For large screens
              xl: "90%", // For extra-large screens
            },
            mt: {
              xs: "3%", // For extra-small screens
              sm: "3%", // For small screens
              md: "3%", // For medium screens
              lg: 0, // For large screens
              xl: 0, // For extra-large screens
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",

           
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "35%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              boxShadow: 1,
              borderRadius: 7,
            }}
          >
            <RedeemablePoints/>
            
            
          </Box>

          {/* Leaderboard Section */}
          <Box
            sx={{
              width: "100%",
              height: "35%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              boxShadow: 1,
              borderRadius: 7,
            }}
          >
            <Box sx={{ width: "90%",
              height: "90%",
              display: "flex",
              position:"relative",
              left:"5%",
              top:"5%",
              flexDirection: "column",
              borderRadius: 7,}}>
                <Clubs/>    
            </Box> 
          </Box>
          <Button
            variant="contained"
            sx={{
              px: "5%",
              width: "100%",
              height: "25%",
              backgroundColor: "#ffe1e1", // Default background color
              display: "flex",
              alignItems: "center", // Align items vertically center
              justifyContent: "center", // Center items horizontally
              borderRadius: 7,
              color: "#831919",
              boxShadow: 1,
              fontWeight: 700,
              fontSize: {
                xs: "5.5vw", // Extra small devices (phones, 600px and down)
                sm: "2.5vw", // Small devices (tablets, 600px and up)
                md: "2.5vw", // Medium devices (desktops, 900px and up)
                lg: "1.15vw", // Large devices (large desktops, 1200px and up)
                xl: "1.15vw", // Extra large devices (larger desktops, 1536px and up)
              },
              textAlign: "center", // Center-align text
              '&:hover': {
                backgroundColor: "#dba2a2", // Background color on hover
                color: "#5a1a1a", // Text color on hover (optional)
              },
            }}
          >
            Redeem Now
          </Button>

        </Grid>   
      </Grid>
 
      <Footer />
    </>
  );
};
 
export default EmployeeDashboard;

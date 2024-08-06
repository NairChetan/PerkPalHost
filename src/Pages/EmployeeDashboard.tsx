import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Points from "../Components/EmployeeDashboard/Section1/Points";
import Leaderboard from "../Components/EmployeeDashboard/Section1/LeaderBoard";
import Clubs from "../Components/EmployeeDashboard/Section2/Clubs";
import List from "../Components/EmployeeDashboard/Section4/List";
import AnnualChart from "../Components/EmployeeDashboard/Section2/Charts/AnnualChart";






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
            justifyContent:"space-between",
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
          ><Points/>
          
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
              lg: "30%", // For large screens
              xl: "30%", // For extra-large screens
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
              height: "40%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "row",
              boxShadow: 1,
              borderRadius: 7,
            }}
          >
            <Clubs/>
          </Box>

          {/* Leaderboard Section */}
          <Box
            sx={{
              width: "100%",
              height: "55%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              boxShadow: 1,
              borderRadius: 7,
            }}
          >
            <Box sx={{display:'flex',position:'relative',left:'10%',top:'5%',width:'100%'}}>
              <AnnualChart/>
            </Box>
              
            
           
          </Box>

        </Grid>
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
 
            pt: "3%",
          }}
        >
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
              <AssignmentIcon fontSize="inherit" />
            </Box>
            Clock In
          </Button>
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
              <LocalOfferIcon fontSize="inherit" />
            </Box>
            Redeem Points
          </Button>
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
              <SchoolOutlinedIcon fontSize="inherit" />
            </Box>
            Manager Roles
          </Button>
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
        </Grid>
        {/* Last Tab Section */}
        <Grid
          item
          sx={{
            width: {
              xs: "100%", // For extra-small screens
              sm: "48.5%", // For small screens
              md: "48.5%", // For medium screens
              lg: "22%", // For large screens
              xl: "22%", // For extra-large screens
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
            backgroundColor: "#FFF",
            display: "flex",
            flexDirection: "row",
            boxShadow: 1,
            borderRadius: 7,
          }}
        >
          <List/>
        </Grid>
      </Grid>
 
      <Footer />
    </>
  );
};
 
export default EmployeeDashboard;

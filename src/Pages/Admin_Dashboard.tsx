/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Container, Button, Typography, Grid } from "@mui/material";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { BarChart } from "@mui/x-charts/BarChart";
import DateRangePick from "../Components/Admin_Dashboard/DateRange/DateRangePick";
// import Typography from "@mui/material/Typography";
// import Button from '@mui/material/Button';

const Admin_Dashboard = () => {
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
              height: "48%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              boxShadow: 1,
              borderRadius: 7,
              pt: "2%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "20%",

                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  width: "80%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  pl: "4%",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    height: "70%",
                    width: "100%",
                    fontWeight: "bold", // Makes the text bold
                    textAlign: "start", // Centers the text
                    fontSize: {
                      xs: "5vw", // Extra small devices (phones, 600px and down)
                      sm: "3vw", // Small devices (tablets, 600px and up)
                      md: "2vw", // Medium devices (desktops, 900px and up)
                      lg: "1.5vw", // Large devices (large desktops, 1200px and up)
                      xl: "1.15vw", // Extra large devices (larger desktops, 1536px and up)
                    },
                  }}
                >
                  DU Performance
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    height: "30%",
                    width: "100%",
                    fontWeight: "bold", // Makes the text bold
                    textAlign: "start", // Centers the text
                    fontSize: {
                      xs: "2.5vw", // Extra small devices (phones, 600px and down)
                      sm: "1.5vw", // Small devices (tablets, 600px and up)
                      md: "1.1vw", // Medium devices (desktops, 900px and up)
                      lg: "0.7vw", // Large devices (large desktops, 1200px and up)
                      xl: "1vw", // Extra large devices (larger desktops, 1536px and up)
                    },
                  }}
                >
                  Points/DU
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "20%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <DateRangePick />
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "80%",
                display: "flex",
                flexDirection: "row",
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "48%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              boxShadow: 1,
              borderRadius: 7,
              pt: "2%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "20%",

                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  width: "85%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  pl: "4%",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    height: "70%",
                    width: "100%",
                    fontWeight: "bold", // Makes the text bold
                    textAlign: "start", // Centers the text
                    fontSize: {
                      xs: "5vw", // Extra small devices (phones, 600px and down)
                      sm: "3vw", // Small devices (tablets, 600px and up)
                      md: "2vw", // Medium devices (desktops, 900px and up)
                      lg: "1.5vw", // Large devices (large desktops, 1200px and up)
                      xl: "1.15vw", // Extra large devices (larger desktops, 1536px and up)
                    },
                  }}
                >
                  Employee Performance
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    height: "30%",
                    width: "100%",
                    fontWeight: "bold", // Makes the text bold
                    textAlign: "start", // Centers the text
                    fontSize: {
                      xs: "2.5vw", // Extra small devices (phones, 600px and down)
                      sm: "1.5vw", // Small devices (tablets, 600px and up)
                      md: "1.1vw", // Medium devices (desktops, 900px and up)
                      lg: "0.7vw", // Large devices (large desktops, 1200px and up)
                      xl: "1vw", // Extra large devices (larger desktops, 1536px and up)
                    },
                  }}
                >
                  Points/Employee
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "15%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <DateRangePick />
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "80%",
                display: "flex",
                flexDirection: "row",
              }}
            ></Box>
          </Box>
        </Grid>
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
          <Typography
            sx={{
              width: "100%",
              height: "7%",
              fontWeight: 600,
            }}
          >
            Employee Leaderboard
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "93%",
              backgroundColor: "#4F0A3A",
              display: "flex",
              flexDirection: "row",
              boxShadow: 1,
              borderRadius: 7,
            }}
          ></Box>
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
            Pending Approval
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
            Category Edit
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
        ></Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default Admin_Dashboard;

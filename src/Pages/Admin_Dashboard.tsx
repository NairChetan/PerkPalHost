/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { Box, Container, Button, Typography, Grid } from "@mui/material";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import GetAppIcon from "@mui/icons-material/GetApp";
import EditIcon from "@mui/icons-material/Edit";
import DateRangePick from "../Components/Admin_Dashboard/DateRange/DateRangePick";
import Bar_Chart from "../Components/Admin_Dashboard/Charts/Bar_Chart";
import DU_chart from "../Components/Admin_Dashboard/Charts/DU_chart";
import Employee_chart from "../Components/Admin_Dashboard/Charts/Employee_chart";
import LeaderBoardAdmin from "../Components/Admin_Dashboard/LeaderBoard/LeaderBoardAdmin";
import ChartTab from "../Components/Admin_Dashboard/Tabs/Chart_tab";
import { TabContext, TabPanel } from "@mui/lab";

const Admin_Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>("1");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const [open, setOpen] = useState<boolean>(false);
  const refOne = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
    return () => {
      document.removeEventListener("click", hideOnClickOutside, true);
    };
  }, []);

  const hideOnClickOutside = (e: MouseEvent) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };
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
          <Typography
            sx={{
              width: "100%",
              height: "7%",
              fontWeight: 600,
              fontSize: {
                xs: "5vw", // Extra small devices (phones, 600px and down)
                sm: "2.5vw", // Small devices (tablets, 600px and up)
                md: "2.5vw", // Medium devices (desktops, 900px and up)
                lg: "1.5vw", // Large devices (large desktops, 1200px and up)
                xl: "1.5vw", // Extra large devices (larger desktops, 1536px and up)
              },
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
              overflowY: "auto",
            }}
          >
            <LeaderBoardAdmin />
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
            onClick={() => setOpen((open) => !open)}
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
                width: "50vw",
                height: "50vh",
                background: "#fff", // Add border with width, style, and color
              }}
              ref={refOne}
            ></Box>
          )}

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
              sm: "100%", // For small screens
              md: "100%", // For medium screens
              lg: "52%", // For large screens
              xl: "52%", // For extra-large screens
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
              height: "100%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              boxShadow: 1,
              borderRadius: 7,
              pb: "2%",
            }}
          >
            <ChartTab
              selectedTab={selectedTab}
              handleTabChange={handleTabChange}
            />

            {/* {selectedTab === 0 && <Employee_chart />}
            {selectedTab === 1 && <DU_chart />} */}
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default Admin_Dashboard;

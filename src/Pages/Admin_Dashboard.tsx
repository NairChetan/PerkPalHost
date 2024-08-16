/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { Box, Container, Button, Typography, Grid } from "@mui/material";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";

import DateRangePick from "../Components/Admin_Dashboard/DateRange/DateRangePick";
import Bar_Chart from "../Components/Admin_Dashboard/Charts/Bar_Chart";
import DU_chart from "../Components/Admin_Dashboard/Charts/DU_chart";
import LeaderBoardAdmin from "../Components/Admin_Dashboard/LeaderBoard/LeaderBoardAdmin";
import ChartTab from "../Components/Admin_Dashboard/Tabs/Chart_tab";
import { TabContext, TabPanel } from "@mui/lab";
import Pending_Approval_Button from "../Components/Admin_Dashboard/Button/Pending_Approval_Button";
import Category_Edit_Button from "../Components/Admin_Dashboard/Button/Category_Edit_Button";
import Export_Data_Button from "../Components/Admin_Dashboard/Button/exportData/Export_Data_Button";
import Club_Edit_Button from "../Components/Admin_Dashboard/Button/Club_Edit_Button";

const Admin_Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>("1");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
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
          <Pending_Approval_Button />
          <Category_Edit_Button />
          <Export_Data_Button />
          <Club_Edit_Button />
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
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default Admin_Dashboard;

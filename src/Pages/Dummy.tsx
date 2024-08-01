/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Container } from "@mui/material";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";

const Dummy = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100%", // Set width to 100%
          height: "78vh", // Set height to 75vh
          backgroundColor: "#111",
        }}
      >
        {/* Your content goes here */}
      </Box>
      <Footer />
    </>
  );
};

export default Dummy;

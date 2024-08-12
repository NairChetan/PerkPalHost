import { Box } from "@mui/material";
import React from "react";
import backgroundImage from "../assets/Images/Sin City Red 3.png";
import facePhoto from "../assets/Images/Face photo.png";
import bgText1 from "../assets/Images/perks by (1).png";
import bgText2 from "../assets/Images/experion (2).png";
import logo from "../assets/Images/perkpal  white logo 1.png";
import LoginForm from "../Components/LogIn_Page/LoginForm";
import styles from "../Components/LogIn_Page/LogIn_Page.module.css"; // Import the CSS module

const LogIn_Page = () => {
  return (
    <>
      <Box
        component="section"
        sx={{
          height: "100vh",
          width: 1,
          position: "relative",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          overflow: "hidden", // Hide scrollbar
        }}
      >
        <Box
          component="img"
          src={facePhoto}
          alt="Face"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "35%",
            height: "auto",
            zIndex: 1,
            mixBlendMode: "overlay",
            opacity: 2,
          }}
          className={styles.slideTop3} // Apply the fadeIn class
        />
        <Box
          component="img"
          src={bgText1}
          alt="Background Text 1"
          sx={{
            position: "absolute",
            bottom: "28%",
            left: "4%",
            width: "30%",
            height: "auto",
            zIndex: 1,
            mixBlendMode: "overlay",
            opacity: 2,
          }}
          className={styles.slideTop2} // Apply the fadeIn class
        />
        <Box
          component="img"
          src={bgText2}
          alt="Background Text 2"
          sx={{
            position: "absolute",
            bottom: "0%",
            right: "3%",
            width: "93%",
            height: "auto",
            zIndex: 1,
            mixBlendMode: "overlay",
            opacity: 2,
          }}
          className={styles.slideTop1} // Apply the fadeIn class
        />
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            position: "absolute",
            right: "6%",
            width: "35%",
            height: "auto",
            zIndex: 1,
            mixBlendMode: "overlay",
            opacity: 2,
          }}
          className={styles.revealBox} // Apply the fadeIn class
        />
        <Box
          component="div"
          sx={{
            position: "absolute",
            top: "28.5%",
            right: "9%",
            width: "30%",
            height: "auto",
            zIndex: 20,
          }}
          className={styles.fadeIn} // Apply the fadeIn class
        >
          <LoginForm />
        </Box>
      </Box>
    </>
  );
};

export default LogIn_Page;

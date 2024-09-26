import { Box } from "@mui/material";
import backgroundImage from "../assets/Images/Sin City Red 3.png";
import facePhoto from "../assets/Images/Face photo.png";
import bgText1 from "../assets/Images/perks by (1).png";
import bgText2 from "../assets/Images/experion (2).png";
import logo from "../assets/Images/perkpal  white logo 1.png";
import LoginForm from "../Components/LogIn_Page/LoginForm";
import styles from "../Components/LogIn_Page/LogIn_Page.module.css"; // Import the CSS module
import { UnauthenticatedTemplate } from "@azure/msal-react";

const LogIn_Page = () => {
  return (
    <>
    <UnauthenticatedTemplate>
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

            width: {
              xs: "70%", // for extra-small devices
              sm: "60%", // for small devices
              md: "35%", // for medium devices and up
            },

            height: "auto",
            zIndex: 1,
            mixBlendMode: "overlay",
            opacity: 2,

            display: {
              xs: "none", // show on extra-small devices
              sm: "block", // show on small devices
              md: "block", // show on medium devices and up
              lg: "block", // show on large devices and up
            },

          }}
          className={styles.slideTop3} // Apply the fadeIn class
        />
        <Box
          component="img"
          src={bgText1}
          alt="Background Text 1"
          sx={{
            position: "absolute",

            bottom: {
              xs: "40%", // for extra-small devices
              sm: "17%", // for small devices
              md: "28%", // for medium devices and up
            },
            left: {
              xs: "10%", // for extra-small devices
              sm: "10%", // for small devices
              md: "4%", // for medium devices and up
            },
            width: {
              xs: "60%", // for extra-small devices
              sm: "40%", // for small devices
              md: "30%", // for medium devices and up
            },

            height: "auto",
            zIndex: 1,
            mixBlendMode: "overlay",
            opacity: 2,

            display: {
              xs: "none", // hide on extra-small devices
              sm: "block", // show on small devices
              md: "block", // show on medium devices and up
              lg: "block", // show on large devices and up
            },

          }}
          className={styles.slideTop2} // Apply the fadeIn class
        />
        <Box
          component="img"
          src={bgText2}
          alt="Background Text 2"
          sx={{
            position: "absolute",

            bottom: 0,
            right: {
              xs: "7%", // for extra-small devices
              sm: "5%", // for small devices
              md: "3%", // for medium devices and up
            },
            width: {
              xs: "100%", // for extra-small devices
              sm: "85%", // for small devices
              md: "93%", // for medium devices and up
            },

            height: "auto",
            zIndex: 1,
            mixBlendMode: "overlay",
            opacity: 2,

            display: {
              xs: "none", // hide on extra-small devices
              sm: "block", // show on small devices
              md: "block", // show on medium devices and up
              lg: "block", // show on large devices and up
            },

          }}
          className={styles.slideTop1} // Apply the fadeIn class
        />
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            position: "absolute",

            right: {
              xs: "8%", // for extra-small devices
              sm: "9%", // for small devices
              md: "6%", // for medium devices and up
            },
            width: {
              xs: "60%", // for extra-small devices
              sm: "45%", // for small devices
              md: "35%", // for medium devices and up
            },

            height: "auto",
            zIndex: 1,
            mixBlendMode: "overlay",
            opacity: 2,

            display: {
              xs: "block", // show on extra-small devices
              sm: "block", // show on small devices
              md: "block", // show on medium devices and up
              lg: "block", // show on large devices and up
            },

          }}
          className={styles.revealBox} // Apply the fadeIn class
        />
        <Box
          component="div"
          sx={{
            position: "absolute",

            top: {
              xs: "35%", // for extra-small devices
              sm: "31%", // for small devices
              md: "28.5%", // for medium devices and up
            },
            right: {
              xs: "10%", // for extra-small devices
              sm: "12%", // for small devices
              md: "9%", // for medium devices and up
            },
            width: {
              xs: "80%", // for extra-small devices
              sm: "40%", // for small devices
              md: "30%", // for medium devices and up
            },
            height: "auto",
            zIndex: 20,
            display: {
              xs: "block", // show on extra-small devices
              sm: "block", // show on small devices
              md: "block", // show on medium devices and up
              lg: "block", // show on large devices and up
            },

          }}
          className={styles.fadeIn} // Apply the fadeIn class
        >
          <LoginForm />
        </Box>
      </Box>
      </UnauthenticatedTemplate>
    </>
  );
};

export default LogIn_Page;

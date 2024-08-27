import Box from "@mui/system/Box";
import backgroundImage from "../../assets/Images/Sin City Red.jpg";
import exp_logo from "../../assets/Images/Group 32 (1).png";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "10vh",
          px: "4%",
          // Adding background image
          backgroundImage: `url(${backgroundImage})`, // Use the imported image here
          backgroundSize: "cover", // Ensure the image covers the entire box
          backgroundPosition: "center", // Center the image within the box
        }}
      >
        <Box
          component="img"
          src={exp_logo} // Use the imported image
          alt="PerkPal Logo" // Provide an alt attribute for accessibility
          sx={{
            width: "auto",
            height: "80%",
            objectFit: "contain", // Ensure the image fits well within the Box
          }}
        />
      </Box>
    </>
  );
};

export default Footer;

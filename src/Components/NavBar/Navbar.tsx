/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import backgroundImage from "../../assets/Images/Sin City Red.jpg";
import logo from "../../assets/Icons/perkpal  white logo.png";

const Navbar = () => {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get("URL_TO_YOUR_AVATAR_IMAGE", {
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(response.data);
        setAvatarSrc(imageUrl);
      } catch (error) {
        console.error("Error fetching the avatar image:", error);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "12vh",
          px: "5%",
          backgroundImage: `url(${backgroundImage})`, // Use the imported image here
          backgroundSize: "cover", // Ensure the image covers the entire box
          backgroundPosition: "center", // Center the image within the box
        }}
      >
        <Box
          component="img"
          src={logo} // Use the imported image
          alt="PerkPal Logo" // Provide an alt attribute for accessibility
          sx={{
            width: "auto",
            height: "80%",
            objectFit: "contain", // Ensure the image fits well within the Box
          }}
        />
        <Box>
          {avatarSrc && (
            <Avatar
              src={avatarSrc}
              alt="User Avatar"
              sx={{
                width: "8vh",
                height: "8vh",
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Navbar;

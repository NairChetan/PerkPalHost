/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import backgroundImage from "../../assets/Images/Sin City Red.jpg";
import logo from "../../assets/Icons/perkpal  white logo.png";
import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";

const Navbar = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  const handleLogoutRedirect = async () => {
    try {
      localStorage.clear();
      await instance.logoutRedirect({ postLogoutRedirectUri: "/" });
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Increase delay to 2 seconds
      // Clear all items from localStorage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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

  // Dummy data for now
  const userData = {
    name: "Alby Kennady",
    membershipStatus: "Gold Member",
    email: "alby.kennady@experionglobal.com",
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "12vh",
          pl: "5%",
          pr: "1%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="PerkPal Logo"
          sx={{
            width: "auto",
            height: "100%",
            objectFit: "contain",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {avatarSrc && (
            <Avatar
              src={avatarSrc}
              alt="User Avatar"
              sx={{
                width: "8vh",
                height: "8vh",
                mr: 1, // Adds margin-right space between the avatar and the text
              }}
            />
          )}
          <Box
            sx={{
              p: 0,
              m: 0,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              mr: 1,
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: {
                  xs: "12px", // Extra small devices
                  sm: "14px", // Small devices
                  md: "15px", // Medium devices
                  lg: "14px", // Large devices
                  xl: "20px", // Extra-large devices
                },
                display: {
                  xs: "none", // Displays block on extra-small devices
                  sm: "inline", // Displays inline on small devices and up
                  md: "inline", // Displays inline on medium devices and up
                  lg: "inline", // Displays inline on large devices and up
                  xl: "inline", // Displays inline on extra-large devices and up
                },
              }}
            >
              {userData.name}
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: {
                  xs: "10px", // Extra small devices
                  sm: "11px", // Small devices
                  md: "12px", // Medium devices
                  lg: "12px", // Large devices
                  xl: "18px", // Extra-large devices
                },
                display: {
                  xs: "none", // Displays block on extra-small devices
                  sm: "inline", // Displays inline on small devices and up
                  md: "inline", // Displays inline on medium devices and up
                  lg: "inline", // Displays inline on large devices and up
                  xl: "inline", // Displays inline on extra-large devices and up
                },
              }}
            >
              {userData.membershipStatus}
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: {
                  xs: "10px", // Extra small devices
                  sm: "11px", // Small devices
                  md: "12px", // Medium devices
                  lg: "12px", // Large devices
                  xl: "18px", // Extra-large devices
                },
                display: {
                  xs: "none", // Displays block on extra-small devices
                  sm: "inline", // Displays inline on small devices and up
                  md: "inline", // Displays inline on medium devices and up
                  lg: "inline", // Displays inline on large devices and up
                  xl: "inline", // Displays inline on extra-large devices and up
                },
              }}
            >
              {userData.email}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            onClick={handleLogoutRedirect}
            sx={{
              color: "#fff", // Font color
              borderColor: "#fff", // Border color
              fontSize: {
                xs: "0.4rem", // Font size for extra-small screens
                sm: "0.4rem", // Font size for small screens
                md: ".5rem", // Font size for medium screens
                lg: ".7rem", // Font size for large screens
                xl: "1rem", // Font size for extra-large screens
              },
              padding: {
                xs: "2px 2px", // Smaller horizontal padding for extra-small screens
                sm: "2px 6px", // Smaller horizontal padding for small screens
                md: "4px 8px", // Smaller horizontal padding for medium screens
                lg: "4px 12px", // Padding for large screens
                xl: "4px 16px", // Padding for extra-large screens
              },
              "&:hover": {
                color: "#111",
                borderColor: "#111", // Keeps border color white on hover
              },
            }}
          >
            LogOut
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;

// import React, { useEffect, useState } from "react";
// import Box from "@mui/system/Box";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";
// import axios from "axios";
// import backgroundImage from "../../assets/Images/Sin City Red.jpg";
// import logo from "../../assets/Icons/perkpal  white logo.png";

// const Navbar = () => {
//   const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
//   const [userData, setUserData] = useState({
//     name: "",
//     membershipStatus: "",
//     email: "",
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const [avatarResponse, userResponse] = await Promise.all([
//           axios.get("URL_TO_YOUR_AVATAR_IMAGE", { responseType: "blob" }),
//           axios.get("URL_TO_FETCH_USER_DATA"),
//         ]);

//         const avatarUrl = URL.createObjectURL(avatarResponse.data);
//         setAvatarSrc(avatarUrl);

//         setUserData({
//           name: userResponse.data.name,
//           membershipStatus: userResponse.data.membershipStatus,
//           email: userResponse.data.email,
//         });
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           width: "100%",
//           height: "12vh",
//           px: "5%",
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <Box
//           component="img"
//           src={logo}
//           alt="PerkPal Logo"
//           sx={{
//             width: "auto",
//             height: "100%",
//             objectFit: "contain",
//           }}
//         />
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           {avatarSrc && (
//             <Avatar
//               src={avatarSrc}
//               alt="User Avatar"
//               sx={{
//                 width: "8vh",
//                 height: "8vh",
//                 mr: 2, // Adds margin-right space between the avatar and the text
//               }}
//             />
//           )}
//           <Box>
//             <Typography
//               variant="h6"
//               sx={{ color: "white", fontWeight: "bold" }}
//             >
//               {userData.name}
//             </Typography>
//             <Typography variant="body2" sx={{ color: "gold" }}>
//               {userData.membershipStatus}
//             </Typography>
//             <Typography variant="body2" sx={{ color: "white" }}>
//               {userData.email}
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Navbar;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
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
          pr: {
            xs: "0%", // Displays block on extra-small devices
            sm: "2%", // Displays inline on small devices and up
            md: "4%", // Displays inline on medium devices and up
            lg: "3%", // Displays inline on large devices and up
            xl: "3%", // Displays inline on extra-large devices and up
          },
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
                mr: 2, // Adds margin-right space between the avatar and the text
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
        </Box>
      </Box>
    </>
  );
};

export default Navbar;

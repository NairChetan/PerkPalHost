// import React, { useState } from "react";
// import { Box, Typography, Avatar, TextField } from "@mui/material";
// import { styled } from "@mui/system";

// const leaderboardData = [
//   {
//     rank: "1",
//     name: "Sanjay Nair",
//     points: 3150,
//     du: "DU 2",
//     avatar: "https://via.placeholder.com/40",
//   },
//   {
//     rank: "2",
//     name: "Alby Kennady",
//     points: 3150,
//     du: "DU 2",
//     avatar: "https://via.placeholder.com/40",
//   },
//   {
//     rank: "3",
//     name: "John Doe",
//     points: 3000,
//     du: "DU 1",
//     avatar: "https://via.placeholder.com/40",
//   },
//   {
//     rank: "4",
//     name: "Jane Smith",
//     points: 2900,
//     du: "DU 3",
//     avatar: "https://via.placeholder.com/40",
//   },
//   {
//     rank: "5",
//     name: "User Five",
//     points: 2800,
//     du: "DU 2",
//     avatar: "https://via.placeholder.com/40",
//   },
//   {
//     rank: "6",
//     name: "User Six",
//     points: 2700,
//     du: "DU 4",
//     avatar: "https://via.placeholder.com/40",
//   },
//   {
//     rank: "7",
//     name: "User Seven",
//     points: 2600,
//     du: "DU 5",
//     avatar: "https://via.placeholder.com/40",
//   },
//   {
//     rank: "8",
//     name: "User Eight",
//     points: 2500,
//     du: "DU 6",
//     avatar: "https://via.placeholder.com/40",
//   },
// ];

// const ScrollBox = styled(Box)({
//   flexGrow: 1,
//   overflowY: "auto",
//   marginTop: 1,
//   "&::-webkit-scrollbar": {
//     width: "4px",
//   },
//   "&::-webkit-scrollbar-track": {
//     background: "#4F0A3A",
//     borderRadius: "10px",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     background: "#888",
//     borderRadius: "10px",
//   },
//   "&::-webkit-scrollbar-thumb:hover": {
//     background: "#555",
//   },
// });

// const LeaderBoardAdmin = () => {
//   const [search, setSearch] = useState("");

//   // Filter data based on search input
//   const filteredData = leaderboardData.filter((user) =>
//     [user.name, user.rank, user.du, user.points.toString()].some((field) =>
//       field.toLowerCase().includes(search.toLowerCase())
//     )
//   );

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#4F0A3A",
//         borderRadius: 7,
//         padding: 2,
//         color: "white",
//         width: "100%",
//         height: "100%", // Adjusted height to make it smaller
//         margin: "0 auto",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Search Field */}
//       <TextField
//         label="Search"
//         variant="outlined"
//         value={search}
//         size="small"
//         onChange={(e) => setSearch(e.target.value)}
//         sx={{
//           marginBottom: 2,
//           backgroundColor: "white",
//           borderRadius: 5,
//           "& .MuiInputLabel-root": {
//             color: "#111", // Default label color
//           },
//           "& .MuiOutlinedInput-root": {
//             "& fieldset": {
//               borderColor: "#4F0A3A",
//               borderRadius: 5,
//             },
//             "&:hover fieldset": {
//               borderColor: "#4F0A3A",
//               borderRadius: 5,
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: "#4F0A3A",
//               borderRadius: 5,
//             },
//             "& .MuiInputBase-input": {
//               color: "#4F0A3A",
//               borderRadius: 5,
//             },
//           },
//           "& .MuiInputLabel-root.Mui-focused": {
//             color: "gray", // Color when focused
//             borderRadius: 5,
//           },
//         }}
//       />
//       <ScrollBox>
//         {filteredData.slice(0, 7).map((user, index) => (
//           <Box
//             key={index}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               backgroundColor: "#5D1049",
//               borderRadius: 2,
//               padding: 1,
//               marginBottom: 1,
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 pr: "5%",
//               }}
//             >
//               {user.rank}
//             </Typography>
//             <Avatar
//               src={user.avatar}
//               alt={user.name}
//               sx={{ width: 40, height: 40, marginRight: 2 }}
//             />
//             <Box sx={{ flexGrow: 1 }}>
//               <Typography variant="body1">{user.name}</Typography>
//               <Typography variant="body2">{user.du}</Typography>
//             </Box>
//             <Typography variant="h6">{user.points}</Typography>
//           </Box>
//         ))}
//       </ScrollBox>
//     </Box>
//   );
// };

// export default LeaderBoardAdmin;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios"; // Import Axios for data fetching

// Define the interface for the leaderboard data structure
interface LeaderboardUser {
  rank: string;
  name: string;
  points: number;
  du: string;
  avatar: string;
}

const ScrollBox = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
  marginTop: 1,
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#4F0A3A",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

const LeaderBoardAdmin = () => {
  const [search, setSearch] = useState("");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]); // Use the defined interface here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get("YOUR_API_ENDPOINT_HERE"); // Replace with your API endpoint

        const rankedData = response.data.map(
          (item: any, index: number): LeaderboardUser => ({
            rank: (index + 1).toString(),
            name: item.employeeName,
            points: item.totalPoints,
            du: item.departmentUnit,
            avatar: item.profileImage,
          })
        );

        setLeaderboardData(rankedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load leaderboard data.");
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const filteredData = leaderboardData.filter((user) =>
    [user.name, user.rank, user.du, user.points.toString()].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Box
      sx={{
        backgroundColor: "#4F0A3A",
        borderRadius: 7,
        padding: 2,
        color: "white",
        width: "100%",
        height: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        size="small"
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          marginBottom: 2,
          backgroundColor: "white",
          borderRadius: 5,
          "& .MuiInputLabel-root": {
            color: "#111",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#4F0A3A",
              borderRadius: 5,
            },
            "&:hover fieldset": {
              borderColor: "#4F0A3A",
              borderRadius: 5,
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4F0A3A",
              borderRadius: 5,
            },
            "& .MuiInputBase-input": {
              color: "#4F0A3A",
              borderRadius: 5,
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "gray",
            borderRadius: 5,
          },
        }}
      />

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : error ? (
        <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      ) : (
        <ScrollBox>
          {filteredData.slice(0, 7).map((user, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#5D1049",
                borderRadius: 2,
                padding: 1,
                marginBottom: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  pr: "5%",
                }}
              >
                {user.rank}
              </Typography>
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{ width: 40, height: 40, marginRight: 2 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1">{user.name}</Typography>
                <Typography variant="body2">{user.du}</Typography>
              </Box>
              <Typography variant="h6">{user.points}</Typography>
            </Box>
          ))}
        </ScrollBox>
      )}
    </Box>
  );
};

export default LeaderBoardAdmin;

import { useState, useEffect } from "react";
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
interface EmployeeSummary {
  employeeId: number;
  firstName: string;
  lastName: string;
  duDepartmentName: string;
  totalPoints: number;
  photoUrl: string;
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
  const [leaderboardData, setLeaderboardData] = useState<EmployeeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Get the current year
        const currentYear = new Date().getFullYear();

        // Set the date range from January 1st to December 31st of the current year
        const initialDate = `${currentYear}-01-01T00:00:00`;
        const endDate = `${currentYear}-12-31T23:59:59`;
        // Replace with your API endpoint
        const response = await axios.get(
          "https://perkpalbackend.onrender.com/api/v1/employee/api/v1/employees/by-points",
          {
            params: {
              initialDate,
              endDate,
            },
          }
        );

        // Map API response to component state
        const rankedData = response.data.map(
          (item: any): EmployeeSummary => ({
            employeeId: item.employeeId,
            firstName: item.firstName,
            lastName: item.lastName,
            duDepartmentName: item.duDepartmentName,
            totalPoints: Math.round(item.totalPoints),
            photoUrl: item.photoUrl,
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

  // Filter data based on search input
  const filteredData = leaderboardData.filter((user) =>
    [
      user.firstName,
      user.lastName,
      user.duDepartmentName,
      user.totalPoints.toString(),
    ].some((field) => field.toLowerCase().includes(search.toLowerCase()))
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
      {/* Search Field */}
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
            color: "#111", // Default label color
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
            color: "gray", // Color when focused
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
          {filteredData.map((user, index) => (
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
                {index + 1} {/* Adjust to show rank */}
              </Typography>
              <Avatar
                src={user.photoUrl}
                alt={`${user.firstName} ${user.lastName}`}
                sx={{ width: 40, height: 40, marginRight: 2 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2">{user.duDepartmentName}</Typography>
              </Box>
              <Typography variant="h6">{user.totalPoints}</Typography>
            </Box>
          ))}
        </ScrollBox>
      )}
    </Box>
  );
};

export default LeaderBoardAdmin;

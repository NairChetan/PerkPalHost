import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import axios from "axios";

const KnowYourCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<{ category: string; activity: string }[]>(
    []
  );
  const refOne = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   // Fetch data from the database (replace with your actual API endpoint)
  //   axios
  //     .get("/api/categories-activities")
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.activity.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen((open) => !open)}
        sx={{
          px: "5%",
          width: {
            xs: "50%", // For extra-small screens
            sm: "50%", // For small screens
            md: "48.5%", // For medium screens
            lg: "60%", // For large screens
            xl: "60%", // For extra-large screens
          },
          height: "auto",
          backgroundColor: "#801c26", // Default background color
          display: "flex",
          alignItems: "center", // Align items vertically center
          justifyContent: "center", // Center items horizontally
          borderRadius: 7,
          color: "#ffffff",
          boxShadow: 1,
          fontWeight: 700,
          fontSize: {
            xs: "4.7vw", // Extra small devices (phones, 600px and down)
            sm: "2.5vw", // Small devices (tablets, 600px and up)
            md: "2.5vw", // Medium devices (desktops, 900px and up)
            lg: "1vw", // Large devices (large desktops, 1200px and up)
            xl: "1vw", // Extra large devices (larger desktops, 1536px and up)
          },
          textAlign: "center", // Center-align text
          "&:hover": {
            backgroundColor: "#dba2a2", // Background color on hover
            color: "#5a1a1a", // Text color on hover (optional)
          },
        }}
      >
        Know Your Category
      </Button>
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backdropFilter: "blur(10px)",
            zIndex: 99,
          }}
        />
      )}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
            width: {
              xs: "95vw", // For extra small screens (mobile)
              sm: "85vw", // For small screens (small tablets)
              md: "70vw", // For medium screens (tablets)
              lg: "50vw", // For large screens (desktops)
              xl: "45vw", // For extra large screens
            },
            maxHeight: "90vh",
            backgroundColor: "#1D1E22",
            borderRadius: "20px", // More practical for smaller screens
            padding: {
              xs: "1.5rem", // Smaller padding for mobile
              sm: "2rem", // Standard padding for tablets and larger screens
            },
            overflowY: "auto",
            color: "#fff",
          }}
          ref={refOne}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Heading */}
          <Box
            sx={{
              fontSize: {
                xs: "1.5rem", // Smaller heading on mobile
                sm: "2rem", // Standard heading on tablets and larger screens
              },
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            Categories And Activities
          </Box>

          {/* Search Field */}
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            size="small"
            onChange={handleSearchChange}
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

          {/* Table */}
          <TableContainer component={Paper} sx={{ backgroundColor: "#2D2F33" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: {
                        xs: "0.9rem", // Smaller font for mobile
                        sm: "1rem", // Standard font for tablets and larger screens
                      },
                      borderBottom: "1px solid #555",
                      padding: {
                        xs: "6px 12px", // Adjusted padding for mobile
                        sm: "8px 16px", // Standard padding for tablets and larger screens
                      },
                    }}
                  >
                    Category
                    <IconButton
                      sx={{ color: "#888", padding: 0, marginLeft: "0.5rem" }}
                    >
                      <FilterListIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                      },
                      borderBottom: "1px solid #555",
                      padding: {
                        xs: "6px 12px",
                        sm: "8px 16px",
                      },
                    }}
                  >
                    Activity
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        color: "#fff",
                        borderBottom: "1px solid #555",
                        padding: {
                          xs: "6px 12px",
                          sm: "8px 16px",
                        },
                      }}
                    >
                      {item.category}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        borderBottom: "1px solid #555",
                        padding: {
                          xs: "6px 12px",
                          sm: "8px 16px",
                        },
                      }}
                    >
                      {item.activity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default KnowYourCategory;

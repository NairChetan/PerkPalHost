// import React, { useRef, useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   IconButton,
//   TextField,
//   InputAdornment,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import axios from "axios";

// const KnowYourCategory = () => {
//   const [open, setOpen] = useState<boolean>(false);
//   const [search, setSearch] = useState<string>("");
//   const [data, setData] = useState<{ category: string; activity: string }[]>(
//     []
//   );
//   const refOne = useRef<HTMLDivElement>(null);

//   // useEffect(() => {
//   //   // Fetch data from the database (replace with your actual API endpoint)
//   //   axios
//   //     .get("/api/categories-activities")
//   //     .then((response) => {
//   //       setData(response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching data:", error);
//   //     });
//   // }, []);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(event.target.value);
//   };

//   const filteredData = data.filter(
//     (item) =>
//       item.category.toLowerCase().includes(search.toLowerCase()) ||
//       item.activity.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <Button
//         variant="contained"
//         onClick={() => setOpen((open) => !open)}
//         sx={{
//           px: "5%",
//           width: {
//             xs: "50%", // For extra-small screens
//             sm: "50%", // For small screens
//             md: "48.5%", // For medium screens
//             lg: "60%", // For large screens
//             xl: "60%", // For extra-large screens
//           },
//           height: "auto",
//           backgroundColor: "#801c26", // Default background color
//           display: "flex",
//           alignItems: "center", // Align items vertically center
//           justifyContent: "center", // Center items horizontally
//           borderRadius: 7,
//           color: "#ffffff",
//           boxShadow: 1,
//           fontWeight: 700,
//           fontSize: {
//             xs: "4.7vw", // Extra small devices (phones, 600px and down)
//             sm: "2.5vw", // Small devices (tablets, 600px and up)
//             md: "2.5vw", // Medium devices (desktops, 900px and up)
//             lg: "1vw", // Large devices (large desktops, 1200px and up)
//             xl: "1vw", // Extra large devices (larger desktops, 1536px and up)
//           },
//           textAlign: "center", // Center-align text
//           "&:hover": {
//             backgroundColor: "#dba2a2", // Background color on hover
//             color: "#5a1a1a", // Text color on hover (optional)
//           },
//         }}
//       >
//         Know Your Category
//       </Button>
//       {open && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             backdropFilter: "blur(10px)",
//             zIndex: 99,
//           }}
//         />
//       )}
//       {open && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 100,
//             width: {
//               xs: "95vw", // For extra small screens (mobile)
//               sm: "85vw", // For small screens (small tablets)
//               md: "70vw", // For medium screens (tablets)
//               lg: "50vw", // For large screens (desktops)
//               xl: "45vw", // For extra large screens
//             },
//             maxHeight: "90vh",
//             backgroundColor: "#1D1E22",
//             borderRadius: "20px", // More practical for smaller screens
//             padding: {
//               xs: "1.5rem", // Smaller padding for mobile
//               sm: "2rem", // Standard padding for tablets and larger screens
//             },
//             overflowY: "auto",
//             color: "#fff",
//           }}
//           ref={refOne}
//         >
//           {/* Close Button */}
//           <IconButton
//             onClick={handleClose}
//             sx={{
//               position: "absolute",
//               top: "1rem",
//               right: "1rem",
//               color: "#fff",
//             }}
//           >
//             <CloseIcon />
//           </IconButton>

//           {/* Heading */}
//           <Box
//             sx={{
//               fontSize: {
//                 xs: "1.5rem", // Smaller heading on mobile
//                 sm: "2rem", // Standard heading on tablets and larger screens
//               },
//               fontWeight: "bold",
//               textAlign: "center",
//               marginBottom: "1.5rem",
//             }}
//           >
//             Categories And Activities
//           </Box>

//           {/* Search Field */}
//           <TextField
//             label="Search"
//             variant="outlined"
//             value={search}
//             size="small"
//             onChange={handleSearchChange}
//             sx={{
//               marginBottom: 2,
//               backgroundColor: "white",
//               borderRadius: 5,
//               "& .MuiInputLabel-root": {
//                 color: "#111",
//               },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: "#4F0A3A",
//                   borderRadius: 5,
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "#4F0A3A",
//                   borderRadius: 5,
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "#4F0A3A",
//                   borderRadius: 5,
//                 },
//                 "& .MuiInputBase-input": {
//                   color: "#4F0A3A",
//                   borderRadius: 5,
//                 },
//               },
//               "& .MuiInputLabel-root.Mui-focused": {
//                 color: "gray",
//                 borderRadius: 5,
//               },
//             }}
//           />

//           {/* Table */}
//           <TableContainer component={Paper} sx={{ backgroundColor: "#2D2F33" }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       fontSize: {
//                         xs: "0.9rem", // Smaller font for mobile
//                         sm: "1rem", // Standard font for tablets and larger screens
//                       },
//                       borderBottom: "1px solid #555",
//                       padding: {
//                         xs: "6px 12px", // Adjusted padding for mobile
//                         sm: "8px 16px", // Standard padding for tablets and larger screens
//                       },
//                     }}
//                   >
//                     Category
//                     <IconButton
//                       sx={{ color: "#888", padding: 0, marginLeft: "0.5rem" }}
//                     >
//                       <FilterListIcon />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       fontSize: {
//                         xs: "0.9rem",
//                         sm: "1rem",
//                       },
//                       borderBottom: "1px solid #555",
//                       padding: {
//                         xs: "6px 12px",
//                         sm: "8px 16px",
//                       },
//                     }}
//                   >
//                     Activity
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredData.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         borderBottom: "1px solid #555",
//                         padding: {
//                           xs: "6px 12px",
//                           sm: "8px 16px",
//                         },
//                       }}
//                     >
//                       {item.category}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         borderBottom: "1px solid #555",
//                         padding: {
//                           xs: "6px 12px",
//                           sm: "8px 16px",
//                         },
//                       }}
//                     >
//                       {item.activity}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       )}
//     </>
//   );
// };

// export default KnowYourCategory;

import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
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

interface Activity {
  id: number;
  activityName: string;
  weightagePerHour: number;
}

interface Category {
  id: number;
  categoryName: string;
  activities: Activity[];
}

const KnowYourCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]); // Initialize as an empty array
  const refOne = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:8080/api/v1/category")
      .then((response) => {
        setCategories(response.data.data); // Set the categories from the response
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredCategories =
    categories?.filter(
      (category) =>
        category.categoryName.toLowerCase().includes(search.toLowerCase()) ||
        category.activities.some((activity) =>
          activity.activityName.toLowerCase().includes(search.toLowerCase())
        )
    ) || []; // Provide a fallback empty array

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen((open) => !open)}
        sx={{
          px: "5%",
          width: {
            xs: "50%",
            sm: "50%",
            md: "48.5%",
            lg: "60%",
            xl: "60%",
          },
          height: "auto",
          backgroundColor: "#801c26",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          color: "#ffffff",
          boxShadow: 1,
          fontWeight: 700,
          fontSize: {
            xs: "4.7vw",
            sm: "2.5vw",
            md: "2.5vw",
            lg: "1vw",
            xl: "1vw",
          },
          textAlign: "center",
          "&:hover": {
            backgroundColor: "#dba2a2",
            color: "#5a1a1a",
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
              xs: "95vw",
              sm: "85vw",
              md: "70vw",
              lg: "50vw",
              xl: "45vw",
            },
            maxHeight: "95vh",
            backgroundColor: "#1D1E22",
            borderRadius: "20px",
            padding: {
              xs: "1.5rem",
              sm: "2rem",
            },
            overflowY: "hidden",
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
                xs: "1.5rem",
                sm: "2rem",
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
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#2D2F33",
              maxHeight: "400px", // Set a fixed height for the table container
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "6px",
                height: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#fff",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#6c6c6c",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#9c9c9c",
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
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
                      position: "sticky", // Sticky position for the header
                      top: 0, // Sticks the header to the top
                      backgroundColor: "#2D2F33", // Matches the background color of the table container
                      zIndex: 1, // Ensures the header is above other content when scrolling
                    }}
                  >
                    Category
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
                      position: "sticky", // Sticky position for the header
                      top: 0, // Sticks the header to the top
                      backgroundColor: "#2D2F33", // Matches the background color of the table container
                      zIndex: 1, // Ensures the header is above other content when scrolling
                    }}
                  >
                    Activity
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
                      position: "sticky", // Sticky position for the header
                      top: 0, // Sticks the header to the top
                      backgroundColor: "#2D2F33", // Matches the background color of the table container
                      zIndex: 1, // Ensures the header is above other content when scrolling
                    }}
                  >
                    Weightage Per Hour
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCategories.map((category, categoryIndex) => (
                  <React.Fragment key={category.id}>
                    {category.activities.map((activity, activityIndex) => (
                      <TableRow key={activity.id}>
                        {/* Display category name only for the first activity */}
                        {activityIndex === 0 && (
                          <TableCell
                            rowSpan={category.activities.length}
                            sx={{
                              color: "#fff",
                              borderBottom: "1px solid #555",
                              padding: {
                                xs: "6px 12px",
                                sm: "8px 16px",
                              },
                            }}
                          >
                            {category.categoryName}
                          </TableCell>
                        )}
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
                          {activity.activityName}
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
                          {activity.weightagePerHour}
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
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

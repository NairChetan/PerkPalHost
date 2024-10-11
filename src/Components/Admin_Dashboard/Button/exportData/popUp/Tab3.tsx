import { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
import * as XLSX from "xlsx"; // Import xlsx for Excel export
import { Box } from "@mui/system";

const Tab3 = () => {
  const [categories, setCategories] = useState<any[]>([]); // State to store API data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error
  const [showData, setShowData] = useState(false); // State to toggle data visibility

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    if (!showData) {
      // Only fetch data if not already shown
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://perkpalbackend.onrender.com/api/v1/category"
        );
        setCategories(response.data.data);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    }
    setShowData(!showData); // Toggle the visibility state
  };

  // Function to handle export button click
  const handleExport = async () => {
    try {
      // Fetch data from the API
      const response = await axios.get("https://perkpalbackend.onrender.com/api/v1/category");
      const categories = response.data.data;

      // Transform data into a format suitable for Excel
      const dataForExcel = categories.flatMap((category: any) =>
        category.activities.map((activity: any) => ({
          Category: category.categoryName,
          Activity: activity.activityName,
          Weightage: activity.weightagePerHour,
        }))
      );

      // Create a new workbook and add the data to it
      const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");

      // Export the workbook as an Excel file
      XLSX.writeFile(workbook, "categories.xlsx");
    } catch (err) {
      setError("Failed to export data.");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        {/* Preview Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
            backgroundColor: "#303137",
            borderRadius: "15px",
            "&:hover": {
              backgroundColor: "black",
            },
            px: "2%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={fetchCategories} // Call API and toggle data visibility on button click
        >
          {showData ? "Hide Data" : "Preview"}{" "}
          {/* Change button text based on state */}
          <ArrowDropDownIcon sx={{ marginLeft: "0.2rem" }} />
        </Button>

        {/* Export Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
            backgroundColor: "#4741FC",
            borderRadius: "15px",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
          onClick={handleExport} // Export data as Excel when clicked
        >
          Export
        </Button>
      </Box>

      {/* Loading/Error Message */}
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {/* Conditionally Render Table based on showData state */}
      {!loading && !error && showData && categories.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "1rem",
            maxHeight: "350px", // Set a fixed height for the table container
            overflowY: "auto", // Enable vertical scrolling
            // Custom scrollbar styles
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
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Activity Name</TableCell>
                <TableCell>Weightage Per Hour</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) =>
                category.activities.map((activity: any, index: number) => (
                  <TableRow key={activity.id}>
                    {/* Display category name only for the first activity of each category */}
                    {index === 0 && (
                      <TableCell rowSpan={category.activities.length}>
                        {category.categoryName}
                      </TableCell>
                    )}
                    <TableCell>{activity.activityName}</TableCell>
                    <TableCell>{activity.weightagePerHour}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Tab3;

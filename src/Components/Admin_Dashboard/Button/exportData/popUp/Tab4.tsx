import { useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DateRangePickExport from "./DateRangePickExport";
import * as XLSX from "xlsx"; // Import xlsx for Excel export

// Function to format date to yyyy-MM-dd'T'HH:mm:ss
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const Tab4 = () => {
  // State to store the selected date range
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  // State to store the API response data
  const [apiResponse, setApiResponse] = useState<any[]>([]);

  // State to toggle the display of the table
  const [isTableVisible, setIsTableVisible] = useState<boolean>(false);

  // Handler for date range change
  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setSelectedDateRange({ startDate, endDate }); // Update the state with the selected date range
  };

  // Function to fetch data from the API
  const fetchData = async () => {
    if (selectedDateRange.startDate && selectedDateRange.endDate) {
      const formattedStartDate = formatDate(selectedDateRange.startDate);
      const formattedEndDate = formatDate(selectedDateRange.endDate);

      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/employee/api/v1/employees/by-points-full-details",
          {
            params: {
              initialDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          }
        );
        setApiResponse(response.data);
        return response.data; // Return the data for immediate use
      } catch (error) {
        console.error("Error fetching data from API:", error);
        return null; // Return null in case of error
      }
    } else {
      console.log("No date range selected.");
      return null; // Return null if no date range is selected
    }
  };

  // Handler for the Preview button click
  const handlePreviewClick = async () => {
    const data = await fetchData(); // Fetch data if not already fetched
    if (data) {
      setIsTableVisible(!isTableVisible); // Toggle table visibility
    }
  };

  // Handler for the Export button click
  const handleExportClick = async () => {
    let dataToExport = apiResponse;

    if (apiResponse.length === 0) {
      // Fetch data if it hasn't been fetched already
      dataToExport = await fetchData();
    }

    if (dataToExport && dataToExport.length > 0) {
      // Transform data into a format suitable for Excel with SL-NO
      const dataForExcel = dataToExport.map((employee, index) => ({
        Rank: index + 1, // Add SL-NO starting from 1
        "First Name": employee.firstName,
        "Last Name": employee.lastName,
        Designation: employee.designation,
        Email: employee.email,
        Department: employee.duDepartmentName,
        Role: employee.roleRoleName,
        "Total Points": employee.totalPoints,
        "Redeemable Points": employee.redeemablePoints,
        Club: employee.clubClubName,
      }));

      // Create a new workbook and add the data to it
      const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

      // Export the workbook as an Excel file
      XLSX.writeFile(workbook, "employee_data.xlsx");
    } else {
      console.log("No data to export.");
    }
  };

  return (
    <>
      {/* Date Range Picker */}
      <DateRangePickExport onDateRangeChange={handleDateRangeChange} />
      <Box
        sx={{
          mt: "2%",
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
            px: "2%",
            backgroundColor: "#303137",
            borderRadius: "15px",
            "&:hover": {
              backgroundColor: "black",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handlePreviewClick} // Add onClick handler to Preview button
        >
          {isTableVisible ? "Hide Data" : "Preview"}
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
          onClick={handleExportClick} // Add onClick handler to Export button
        >
          Export
        </Button>
      </Box>

      {/* Conditional Rendering of Table */}
      {isTableVisible && apiResponse.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "2rem",
            maxHeight: "400px", // Set a fixed height for the table container
            overflowY: "auto", // Enable vertical scrolling
            // Custom scrollbar styles
            "&::-webkit-scrollbar": {
              width: "7px",
              height: "7px",
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
                <TableCell>Rank</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Total Points</TableCell>
                <TableCell>Redeemable Points</TableCell>
                <TableCell>Club</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiResponse.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: "0.75rem", textAlign: "center" }}>
                    {index + 1}
                  </TableCell>

                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    {employee.firstName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    {employee.lastName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    {employee.designation}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    {employee.email}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    {employee.duDepartmentName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    {employee.roleRoleName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    {employee.totalPoints}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    {employee.redeemablePoints}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    {employee.clubClubName}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Tab4;

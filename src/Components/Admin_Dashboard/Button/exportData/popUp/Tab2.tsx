// import { useState } from "react";
// import axios from "axios";
// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import DateRangePickExport from "./DateRangePickExport";

// // Function to format date to yyyy-MM-dd'T'HH:mm:ss
// const formatDate = (date: Date): string => {
//   const year = date.getFullYear();
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const day = date.getDate().toString().padStart(2, "0");
//   const hours = date.getHours().toString().padStart(2, "0");
//   const minutes = date.getMinutes().toString().padStart(2, "0");
//   const seconds = date.getSeconds().toString().padStart(2, "0");

//   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
// };

// const Tab2 = () => {
//   // State to store the selected date range
//   const [selectedDateRange, setSelectedDateRange] = useState<{
//     startDate: Date | null;
//     endDate: Date | null;
//   }>({
//     startDate: null,
//     endDate: null,
//   });

//   // State to store the API response data
//   const [apiResponse, setApiResponse] = useState<any[]>([]);

//   // State to toggle the display of the table
//   const [isTableVisible, setIsTableVisible] = useState<boolean>(false);

//   // Handler for date range change
//   const handleDateRangeChange = (startDate: Date, endDate: Date) => {
//     setSelectedDateRange({ startDate, endDate }); // Update the state with the selected date range
//   };

//   // Handler for the Preview button click
//   const handlePreviewClick = async () => {
//     if (selectedDateRange.startDate && selectedDateRange.endDate) {
//       const formattedStartDate = formatDate(selectedDateRange.startDate);
//       const formattedEndDate = formatDate(selectedDateRange.endDate);

//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/v1/employee/api/v1/employees/by-points-full-details",
//           {
//             params: {
//               initialDate: formattedStartDate,
//               endDate: formattedEndDate,
//             },
//           }
//         );

//         setApiResponse(response.data);
//         setIsTableVisible(!isTableVisible); // Toggle table visibility
//       } catch (error) {
//         console.error("Error fetching data from API:", error);
//       }
//     } else {
//       console.log("No date range selected.");
//     }
//   };

//   return (
//     <>
//       {/* Date Range Picker */}
//       <DateRangePickExport onDateRangeChange={handleDateRangeChange} />

//       {/* Preview Button */}
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{
//           width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
//           px: "2%",
//           marginTop: "1rem",
//           backgroundColor: "#303137",
//           borderRadius: "15px",
//           "&:hover": {
//             backgroundColor: "black",
//           },
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//         onClick={handlePreviewClick} // Add onClick handler to Preview button
//       >
//         {isTableVisible ? "Hide Data" : "Preview"}
//         <ArrowDropDownIcon sx={{ marginLeft: "0.2rem" }} />
//       </Button>

//       {/* Conditional Rendering of Table */}
//       {isTableVisible && apiResponse.length > 0 && (
//         <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>First Name</TableCell>
//                 <TableCell>Last Name</TableCell>
//                 <TableCell>Designation</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Department</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Total Points</TableCell>
//                 <TableCell>Redeemable Points</TableCell>
//                 <TableCell>Club</TableCell>
//                 <TableCell>Photo</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {apiResponse.map((employee, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{employee.firstName}</TableCell>
//                   <TableCell>{employee.lastName}</TableCell>
//                   <TableCell>{employee.designation}</TableCell>
//                   <TableCell>{employee.email}</TableCell>
//                   <TableCell>{employee.duDepartmentName}</TableCell>
//                   <TableCell>{employee.roleRoleName}</TableCell>
//                   <TableCell>{employee.totalPoints}</TableCell>
//                   <TableCell>{employee.redeemablePoints}</TableCell>
//                   <TableCell>{employee.clubClubName}</TableCell>
//                   <TableCell>
//                     <img
//                       src={employee.photoUrl}
//                       alt="Employee Photo"
//                       style={{ width: "50px", height: "50px" }}
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Export Button */}
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{
//           width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
//           marginTop: "1.5rem",
//           backgroundColor: "#4741FC",
//           borderRadius: "15px",
//           "&:hover": {
//             backgroundColor: "black",
//           },
//         }}
//       >
//         Export
//       </Button>
//     </>
//   );
// };

// export default Tab2;

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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DateRangePickExport from "./DateRangePickExport";

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

const Tab2 = () => {
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

  // Handler for the Preview button click
  const handlePreviewClick = async () => {
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
        setIsTableVisible(!isTableVisible); // Toggle table visibility
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    } else {
      console.log("No date range selected.");
    }
  };

  return (
    <>
      {/* Date Range Picker */}
      <DateRangePickExport onDateRangeChange={handleDateRangeChange} />

      {/* Preview Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
          px: "2%",
          marginTop: "1rem",
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
          marginTop: "1.5rem",
          backgroundColor: "#4741FC",
          borderRadius: "15px",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        Export
      </Button>

      {/* Conditional Rendering of Table */}
      {isTableVisible && apiResponse.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{ marginTop: "1rem", overflow: "auto" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
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

export default Tab2;

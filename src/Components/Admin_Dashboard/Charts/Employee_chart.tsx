import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import DateRangePick from "../DateRange/DateRangePick";
import Bar_Chart from "../Charts/Bar_Chart";
import { addDays } from "date-fns";
import axios from "axios";

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
  },
};

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

const Employee_chart: React.FC = () => {
  // State to manage the selected date range
  const [startDate, setStartDate] = useState<Date>(addDays(new Date(), -30));
  const [endDate, setEndDate] = useState<Date>(new Date());
  // State to manage chart data and loading state
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [{ data: [], backgroundColor: "#a083c9" }],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when date range changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const formattedStartDate = formatDate(startDate); // Format the start date
        const formattedEndDate = formatDate(endDate); // Format the end date
        console.log(formattedStartDate); // Debug: Log start date
        console.log(formattedEndDate); // Debug: Log end date
        const response = await axios.get(
          "https://perkpalbackend.onrender.com/api/v1/employee/api/v1/employees/by-points",
          {
            params: {
              initialDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          }
        );
        // Extract and slice data for chart (limit to top 10)
        const labels = response.data
          .slice(0, 10)
          .map((item: any) => item.firstName); // Get top 10 employee names
        const data = response.data
          .slice(0, 10)
          .map((item: any) => item.totalPoints); // Get top 10 total points

        setChartData({
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: "#a083c9", // Set bar color
            },
          ],
        });
      } catch (error) {
        setError("Failed to fetch data"); // Set error message on failure
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchData();
  }, [startDate, endDate]); // Re-run effect when startDate or endDate changes

  // Callback to update the date range when it changes
  const handleDateRangeChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "15%",
          pr: "2%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "65%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            pl: "4%",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              height: "60%",
              width: "100%",
              fontWeight: "bold", // Makes the text bold
              textAlign: "start", // Aligns the text to the start
              fontSize: {
                xs: "4vw", // Extra small devices (phones, 600px and down)
                sm: "3.5vw", // Small devices (tablets, 600px and up)
                md: "3vw", // Medium devices (desktops, 900px and up)
                lg: "2vw", // Large devices (large desktops, 1200px and up)
                xl: "2.15vw", // Extra large devices (larger desktops, 1536px and up)
              },
            }}
          >
            Employee Performance
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              height: "40%",
              width: "100%",
              fontWeight: "bold", // Makes the text bold
              textAlign: "start", // Aligns the text to the start
              fontSize: {
                xs: "3vw", // Extra small devices (phones, 600px and down)
                sm: "2vw", // Small devices (tablets, 600px and up)
                md: "1.5vw", // Medium devices (desktops, 900px and up)
                lg: "1vw", // Large devices (large desktops, 1200px and up)
                xl: "1vw", // Extra large devices (larger desktops, 1536px and up)
              },
            }}
          >
            Points/Employee
          </Typography>
        </Box>
        <Box
          sx={{
            width: "35%",
            height: "100%",
            display: "flex",
            padding: "0%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* DateRangePick now passes the selected date range to handleDateRangeChange */}
          <DateRangePick onDateRangeChange={handleDateRangeChange} />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "75%",
        }}
      >
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Bar_Chart chartData={chartData} chartOptions={chartOptions} />
        )}
      </Box>
    </>
  );
};

export default Employee_chart;

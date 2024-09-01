import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import Bar_Chart from "../../Section4/Charts/BarChartEd";
import axios from 'axios';

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
  },
};

const MonthlyChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: "#895937",
    }],
  });

  useEffect(() => {
    const fetchData = async () => {
      const empid = localStorage.getItem("employeeId");

      if (!empid) {
        console.error('Employee ID not found in localStorage');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/v1/employee/${empid}/points/current-year-per-month`);
        const data = response.data;

        const labels = [];
        const dataPoints = new Array(12).fill(0); // Initialize with zeroes for each month

        data.forEach(item => {
          const monthIndex = item.month - 1; // Adjust for zero-based index
          labels[monthIndex] = getMonthName(item.month); // Set label
          dataPoints[monthIndex] = item.pointsAccumulated; // Set data
        });

        setChartData({
          labels: labels,
          datasets: [{
            data: dataPoints,
            backgroundColor: "#895937",
          }],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getMonthName = (monthNumber) => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return monthNames[monthNumber - 1];
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
        {/* Optional: Add other components or elements here */}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "75%",
        }}
      >
        <Bar_Chart chartData={chartData} chartOptions={chartOptions} />
      </Box>
    </>
  );
};

export default MonthlyChart;

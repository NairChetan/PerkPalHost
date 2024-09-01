import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Bar_Chart from "../../Section4/Charts/BarChartEd";

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
  },
};

const AnnualChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: "#a083c9",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const empid = localStorage.getItem("employeeId");

      if (!empid) {
        console.error('Employee ID not found in localStorage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/v1/employee/employee/${empid}/points/last-four-years`);
        const data = await response.json();

        const labels = data.map((item) => item.year.toString());
        const points = data.map((item) => item.pointsAccumulated);

        setChartData({
          labels: labels,
          datasets: [
            {
              data: points,
              backgroundColor: "#a083c9",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

export default AnnualChart;

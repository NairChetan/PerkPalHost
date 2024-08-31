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
    // Fetch the data from the API
    fetch("http://localhost:8080/api/v1/employee/employee/2/points/last-four-years")
      .then((response) => response.json())
      .then((data) => {
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
      })
      .catch((error) => console.error("Error fetching data:", error));
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
      ></Box>
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

import { Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Bar_Chart from "../../Section4/Charts/BarChartEd";
import ResizeObserver from "resize-observer-polyfill"; // Import ResizeObserver for cross-browser support

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

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const chartRef = useRef<HTMLDivElement>(null);

  // Custom useResizeObserver logic
  useEffect(() => {
    if (chartRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries.length) {
          const entry = entries[0];
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });
      resizeObserver.observe(chartRef.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  // Fetch chart data
  useEffect(() => {
    const fetchData = async () => {
      const empid = localStorage.getItem("employeeId");

      if (!empid) {
        console.error("Employee ID not found in localStorage");
        return;
      }

      try {
        const response = await fetch(
          `https://perkpalbackend.onrender.com/api/v1/employee/employee/${empid}/points/last-four-years`
        );
        const data = await response.json();

        const labels = data.map((item: { year: number }) => item.year.toString());
        const points = data.map((item: { pointsAccumulated: number }) => item.pointsAccumulated);

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
        ref={chartRef}
        sx={{
          width: "100%",
          height: dimensions.height || "75%",
        }}
      >
        <Bar_Chart
          chartData={chartData}
          chartOptions={chartOptions}
          width={dimensions.width}
          height={dimensions.height}
        />
      </Box>
    </>
  );
};

export default AnnualChart;

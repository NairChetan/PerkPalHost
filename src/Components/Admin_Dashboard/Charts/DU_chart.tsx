import { Box, Typography } from "@mui/material";
import DateRangePick from "../DateRange/DateRangePick";
import Bar_Chart from "../Charts/Bar_Chart";
import { useState, useEffect } from "react";
import { addDays } from "date-fns";
import axios from "axios";

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
  },
};

const DU_chart = () => {
  // State to manage the selected date range
  const [startDate, setStartDate] = useState<Date>(addDays(new Date(), -30));
  const [endDate, setEndDate] = useState<Date>(new Date());

  // State to manage the chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: "#895937",
      },
    ],
  });

  // Callback to update the date range when it changes
  const handleDateRangeChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Fetch data from API whenever the date range changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/du/points",
          {
            params: {
              startDate: startDate.toISOString().slice(0, 19).replace("T", " "),
              endDate: endDate.toISOString().slice(0, 19).replace("T", " "),
            },
          }
        );

        // Process the API response to update chartData
        const duNames = response.data.map((item: any) => item.duName);
        const totalPoints = response.data.map((item: any) => item.totalPoints);

        setChartData({
          labels: duNames,
          datasets: [
            {
              data: totalPoints,
              backgroundColor: "#895937",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

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
              fontWeight: "bold",
              textAlign: "start",
              fontSize: {
                xs: "6vw",
                sm: "4vw",
                md: "3vw",
                lg: "2vw",
                xl: "2.15vw",
              },
            }}
          >
            DU Performance
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              height: "40%",
              width: "100%",
              fontWeight: "bold",
              textAlign: "start",
              fontSize: {
                xs: "3vw",
                sm: "2vw",
                md: "1.5vw",
                lg: "1vw",
                xl: "1vw",
              },
            }}
          >
            Points/DU
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
          <DateRangePick onDateRangeChange={handleDateRangeChange} />
        </Box>
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

export default DU_chart;

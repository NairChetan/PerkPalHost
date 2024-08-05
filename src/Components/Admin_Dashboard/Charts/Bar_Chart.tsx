import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Bar_Chart = () => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December",
    ],
    datasets: [
      {
        data: [30, 20, 50, 40, 70, 20, 50, 30, 10, 70, 90, 40],
        backgroundColor: "#06C",
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          paddingTop: "4%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Bar data={chartData} options={chartOptions}></Bar>
      </div>
    </>
  );
};

export default Bar_Chart;

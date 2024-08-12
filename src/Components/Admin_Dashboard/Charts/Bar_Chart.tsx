/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Define the type for the component's props
interface BarChartProps {
  chartData: any;
  chartOptions: any;
}

const Bar_Chart: React.FC<BarChartProps> = ({ chartData, chartOptions }) => {
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

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  totalUser?: number;
  totalCompany?: number;
  totalPost?: number;
  totalResume?: number;
}

export default function LineChartComponent(data: Readonly<LineChartProps>) {
  // Prepare data for chart.js
  const chartData = {
    labels: ["Người dùng", "Nhà tuyển dụng", "Bài đăng", "Hồ sơ"],
    datasets: [
      {
        label: "Count",
        data: [
          data.totalUser || 0,
          data.totalCompany || 0,
          data.totalPost || 0,
          data.totalResume || 0,
        ],
        borderColor: "#ed1b2f", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Area color (optional)
        fill: true, // Fill area under the line
        tension: 0.4, // Smooth the line curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw}`, // Tooltip callback to display data
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Start x-axis from zero
      },
      y: {
        beginAtZero: true, // Start y-axis from zero
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

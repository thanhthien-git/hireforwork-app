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

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Statics {
  totalCareer: number;
  totalJob: number;
  totalResume: number;
}

interface LineChartProps {
  statics: Statics;
}

const LineChart: React.FC<LineChartProps> = ({ statics }) => {
  const data = [
    { label: "Ứng viên", value: statics.totalCareer },
    { label: "Số bài đăng", value: statics.totalJob },
    { label: "Số lượt ứng tuyển", value: statics.totalResume },
  ];

  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Thống kê",
        data: values,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.raw} lượt`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} height={175} />;
};

export default LineChart;

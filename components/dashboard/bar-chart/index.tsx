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

// Đăng ký các thành phần cần thiết cho biểu đồ
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ data, xField, yField, options }: any) {
  // Tạo dữ liệu cho biểu đồ
  const chartData = {
    labels: data.map((item: any) => item[xField]), // Nhãn trên trục x
    datasets: [
      {
        label: yField, // Nhãn cho dataset
        data: data.map((item: any) => item[yField]), // Dữ liệu cho trục y
        borderColor: "rgba(75, 192, 192, 1)", // Màu đường
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền (không dùng trong biểu đồ đường)
        fill: true, // Bật chế độ lấp đầy vùng dưới đường
      },
    ],
  };

  return <Line data={chartData} options={options} />;
}

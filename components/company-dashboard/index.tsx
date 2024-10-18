import BarChart from "../dashboard/bar-chart";

export default function CompanyDashboardPage() {
  const data = {
    labels: ["Ứng viên", "Bài đăng", "Số lượt ứng tuyển"],
    datasets: [
      {
        label: "Số lượng",
        data: [12000, 19000, 33333],
        backgroundColor: "#5422c9",
        borderWidth: 1,
        barThickness: 40,
        maxBarThickness: 50,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Thống kê hoạt động",
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
        },
      },
    },
  };
  return <BarChart data={data} options={options} />;
}

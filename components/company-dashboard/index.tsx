import { useCallback, useEffect, useState } from "react";
import BarChart from "../dashboard/bar-chart";
import CompanyService from "@/services/companyService";
import { notification } from "antd";

export default function CompanyDashboardPage() {
  const [statics, setStatics] = useState({
    totalCareer: 0,
    totalJob: 0,
    totalResume: 2,
  });

  const fetchStatic = useCallback(async () => {
    try {
      const res = await CompanyService.getStatic(
        localStorage.getItem("id") as string
      );
      setStatics({
        totalCareer: res?.data?.totalCareer,
        totalJob: res?.data?.totalJob,
        totalResume: res?.data?.totalResume,
      });
    } catch (err) {
      notification.error({ message: (err as Error).message });
    }
  }, []);

  useEffect(() => {
    fetchStatic();
  }, [fetchStatic]);
  const data = {
    labels: ["Ứng viên", "Bài đăng", "Số lượt ứng tuyển"],
    datasets: [
      {
        label: "Số lượng",
        data: [statics.totalCareer, statics.totalJob, statics.totalResume],
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

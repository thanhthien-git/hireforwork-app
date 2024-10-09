import { Bar } from "@ant-design/charts";

export default function DashboardPage() {
  const data = [
    { type: "Category A", value: 30 },
    { type: "Category B", value: 70 },
    { type: "Category C", value: 45 },
    { type: "Category D", value: 60 },
  ];

  const config = {
    data,
    xField: "type", 
    yField: "value",
    label: {
      position: "top", 
      style: {
        fill: "#FFFFFF", 
        opacity: 0.6, 
      },
    },
    meta: {
      type: { alias: "Category" },
      value: { alias: "Value" },
    },
  };
  return <Bar {...config} />;
}

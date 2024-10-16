import UserService from "@/services/userService";
import {
  ClockCircleOutlined,
  FileDoneOutlined,
  HeartOutlined,
  PaperClipOutlined,
  PieChartOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <PieChartOutlined />,
  },
  {
    name: "Users",
    path: "",
    icon: <UserOutlined />,
    subMenu: [
      {
        name: "Careers",
        path: "/admin/user-manager",
      },
      {
        name: "Companies",
        path: "/admin/companies-manager",
      },
    ],
  },
  {
    name: "Job Post",
    path: "/admin/jobs-manager",
    icon: <PaperClipOutlined />,
  },
  {
    name: "Category",
    path: "",
    icon: <TagOutlined />,
  },
];

export const careerSider = [
  {
    name: "Thông tin của tôi",
    path: "/",
    icon: <UserOutlined />,
  },
  {
    name: "Việc làm đã lưu",
    path: "/",
    icon: <FileDoneOutlined />,
  },
  {
    name: "Việc làm đã xem",
    path: "/",
    icon: <ClockCircleOutlined />,
  }
];

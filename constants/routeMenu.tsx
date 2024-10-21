import AuthenticationService from "@/services/authentication";
import {
  ClockCircleOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  PaperClipOutlined,
  PieChartOutlined,
  SettingOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
const router = useRouter;
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
  },
];

export const companySider = [
  {
    name: "Tổng quan",
    path: "/company",
    icon: <PieChartOutlined />,
  },
  {
    name: "Việc làm đã đăng",
    path: "/company/jobs",
    icon: <FileDoneOutlined />,
  },
  {
    name: "Danh sách ứng viên",
    path: "/company/career-list",
    icon: <UserOutlined />,
  },
  {
    name: "Thông tin",
    path: "/company/settings",
    icon: <SettingOutlined />,
  },
];

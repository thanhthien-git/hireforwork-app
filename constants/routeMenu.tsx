import {
  ClockCircleOutlined,
  CodeOutlined,
  FileDoneOutlined,
  MessageOutlined,
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
    name: "Tổng quan",
    path: "/admin",
    icon: <PieChartOutlined />,
  },
  {
    name: "Quản lý người dùng",
    path: "",
    icon: <UserOutlined />,
    subMenu: [
      {
        name: "Người tìm việc",
        path: "/admin/user-manager",
      },
      {
        name: "Nhà tuyển dụng",
        path: "/admin/companies-manager",
      },
    ],
  },
  {
    name: "Quản lý bài đăng",
    path: "/admin/jobs-manager",
    icon: <PaperClipOutlined />,
  },
  {
    name: "Quản lý danh mục",
    path: "/admin/category-manager",
    icon: <TagOutlined />,
  },
  {
    name: "Quản lý kỹ năng",
    path: "/admin/tech-manager",
    icon: <CodeOutlined />,
  },
];

export const careerSider = [
  {
    name: "Thông tin của tôi",
    path: "/user",
    icon: <UserOutlined />,
  },
  {
    name: "Việc làm đã lưu",
    path: "/user/saved-job",
    icon: <FileDoneOutlined />,
  },
  {
    name: "Việc làm đã xem",
    path: "/user/viewed-job",
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
    name: "Trò chuyện",
    path: "/company/chat",
    icon: <MessageOutlined />,
  },
  {
    name: "Thông tin",
    path: "/company/settings",
    icon: <SettingOutlined />,
  },
];

import {
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
    path: "",
    icon: <PaperClipOutlined />,
  },
  {
    name: "Category",
    path: "",
    icon: <TagOutlined />,
  },
];

import React from "react";
import ResetPassword from "@/components/reset-password-company/reset-companyStep";
import LayoutClient from "@/layouts/layout-client";

export default function HomeSearch() {
  return (
    <LayoutClient title="Quên mật khẩu">
      <ResetPassword />
    </LayoutClient>
  );
}

import React from "react";
import LayoutClient from "@/layouts/layout-client";
import User from "@/components/commons/user/item-userdetails/usercardcustom";
export default function UserDetail() {
  return (
    <LayoutClient title="User Details">
      <User/>
    </LayoutClient>
  );
}

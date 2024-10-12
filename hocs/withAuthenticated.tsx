import { notification } from "antd";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import React from "react";

export default function withAuthenticated(Component: React.ComponentType) {
  return function WithAuthComponent(props: any) {
    const router = useRouter();
    const forceLogout = useCallback(() => {
      router.push("/login");

      notification.warning({
        message: "Bạn cần phải đăng nhập để thực hiện chức năng này",
      });
    }, [router, notification]);

    useEffect(() => {
      !localStorage.getItem("token") && forceLogout();
    }, [forceLogout]);

    return <Component {...props} />;
  };
}

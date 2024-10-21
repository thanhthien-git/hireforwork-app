import { ROLE } from "@/constants/role";
import { notification } from "antd";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function withRoleCompany(Component: React.ComponentType) {
  return function WithAuthComponent(props: any) {
    const { token } = useSelector((state) => state.auth);
    const [authCheck, setAuthCheck] = useState(false);
    const role = token && jwtDecode(token).role;
    const router = useRouter();

    const forceLogout = useCallback(() => {
      router.push("/");

      notification.warning({
        message: "Bạn không thuộc về bộ phận này!",
      });
    }, [router]);

    useEffect(() => {
      role !== ROLE.COMPANY ? forceLogout() : setAuthCheck(true);
    }, [forceLogout, token]);

    return authCheck && <Component {...props} />;
  };
}

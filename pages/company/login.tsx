import LoginForm from "@/components/login";
import LayoutClient from "@/layouts/layout-client";

export default function LoginCompany() {
    return (
        <LayoutClient title="Đăng nhập nhà tuyển dụng">
            <LoginForm/>
        </LayoutClient>
    )
}
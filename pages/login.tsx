import LoginForm from "@/components/login";
import LayoutClient from "@/layouts/layout-client";

export default function LoginPage() {
    return(
        <LayoutClient title="Đăng nhập">
            <LoginForm/>
        </LayoutClient>
    )
}

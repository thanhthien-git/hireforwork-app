import LoginForm from "@/components/login";
import LayoutClient from "@/layouts/layout-client";

export default function LoginPage() {
    return(
        <LayoutClient title="Login">
            <LoginForm/>
        </LayoutClient>
    )
}

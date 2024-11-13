import { JWTPayload } from "@/interfaces/user";
import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    return decoded as JWTPayload;
  } catch (err) {
    console.log(err);
  }
};

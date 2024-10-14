import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuth: boolean;
  token: string | null;
}

const isBrowser = () => typeof window !== "undefined";

const initialState: AuthState = {
  isAuth: isBrowser() ? !!localStorage.getItem("token") : false,
  token: isBrowser() ? localStorage.getItem("token") : null,
};

export const forceLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("id")
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state) {
      state.isAuth = true;
      state.token = localStorage.getItem("token");
    },
    logout(state) {
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("id");
    },
  },
});

// Export actions
export const { setAuthState, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

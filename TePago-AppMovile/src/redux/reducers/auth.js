import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: typeof window !== "undefined" ? localStorage.getItem("access") : null,
  refresh:
    typeof window !== "undefined" ? localStorage.getItem("refresh") : null,
  isAuthenticated: null,
  isMetaMask: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    AUTHENTICATED_SUCCESS(state, action) {
      return {
        ...state,
        isAuthenticated: true,
      };
    },
    AUTHENTICATED_FAIL(state, action) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
      };
    },
    SIGNUP_SUCCESS() {},
    SIGNUP_FAIL(state, action) {},
    LOGIN_SUCCESS(state, action) {
      let payload = action.payload;
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      console.log("Exito");
      return {
        ...state,
        isAuthenticated: true,
        access: localStorage.getItem("access"),
        refresh: localStorage.getItem("refresh"),
      };
    },
    LOGIN_FAIL(state, action) {},
    REFRESH_SUCCESS(state, action) {
      let payload = action.payload;
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        access: localStorage.getItem("access"),
      };
    },
    REFRESH_FAIL(state, action) {},
    LOGOUT(state, action) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
      };
    },
    METAMASK_SUCCESS(state, action) {
      let payload = action.payload;
      return {
        ...state,
        isMetaMask: payload,
      };
    },
  },
});

export const {
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT,
  METAMASK_SUCCESS,
} = authSlice.actions;
export default authSlice.reducer;

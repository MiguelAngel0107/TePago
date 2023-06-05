import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: null,
};

const alertSlice = createSlice({
  name: "Alert",
  initialState,
  reducers: {
    SET_ALERT(state, action) {
      let payload = action.payload;
      return {
        ...state,
        alert: payload,
      };
    },
    REMOVE_ALERT(state, action) {
      return {
        ...state,
        alert: null,
      };
    },
  },
});
export const { SET_ALERT, REMOVE_ALERT } = alertSlice.actions;
export default alertSlice.reducer;
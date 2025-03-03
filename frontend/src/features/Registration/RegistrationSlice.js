
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;  
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;  
    },
  },
});

export const { registerStart, registerSuccess, registerFailure } = authSlice.actions;
export default authSlice.reducer;

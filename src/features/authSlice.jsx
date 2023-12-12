import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  userLogin: false,
};

const authSlice = createSlice({
  name: "blogPost",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.userLogin = true;
    },
    logout: (state, action) => {
      state.userData = null;
      state.userLogin = false;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

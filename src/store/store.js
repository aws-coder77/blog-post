import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
const store = configureStore({
  reducer: { blogPost: authSlice },
});

export default store;

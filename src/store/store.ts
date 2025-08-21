// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // 👈 import your auth slice

const Store = configureStore({
  reducer: {
    auth: authReducer, // 👈 connect your auth slice
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;

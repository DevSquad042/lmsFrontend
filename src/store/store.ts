// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 
import courseReducer from "./slices/courseSlice"; 

const Store = configureStore({
  reducer: {
    auth: authReducer, 
    courses: courseReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;

// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 
import courseReducer from "./slices/courseSlice"; 
import mentorsReducer from "./slices/mentorSlice"; // Import the mentor slice reducer

const Store = configureStore({
  reducer: {
    auth: authReducer, 
    courses: courseReducer,
    mentors: mentorsReducer, // Add the mentor slice reducer
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;

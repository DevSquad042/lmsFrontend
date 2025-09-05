import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import mentorReducer from "./slices/mentorSlice";
import coursesReducer from "./slices/coursesSlice"; // unified

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    mentors: mentorReducer,
    courses: coursesReducer, // ✅ only one now
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

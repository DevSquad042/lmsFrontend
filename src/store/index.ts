
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import courseReducer from "./slices/courseSlice"
import mentorReducer from "./slices/mentorSlice"
import reviewReducer from "./slices/reviewsSlice";

// Configure the Redux store with multiple slices

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // ✅ add this
    courses: courseReducer,
    mentors: mentorReducer, // ✅ add this
    reviews: reviewReducer
  },
});


// Types for dispatch & state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

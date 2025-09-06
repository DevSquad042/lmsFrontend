import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import mentorReducer from "./slices/mentorSlice";
import coursesReducer from "./slices/coursesSlice"; // unified
import reviewsReducer from "./slices/reviewsSlice";
import chatsReducer from "./slices/chatSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    mentors: mentorReducer,
    courses: coursesReducer, // ✅ only one now
    reviews: reviewsReducer,
    chats: chatsReducer,     // 👈 register chats slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

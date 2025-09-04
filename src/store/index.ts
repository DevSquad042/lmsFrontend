// src/store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import courseReducer from "./slices/courseSlice";       // ✅ Top courses & selected course
import mentorReducer from "./slices/mentorSlice";
import coursesReducer from "./slices/coursesSlice";     // ✅ Full course list or paginated view
import reviewsReducer from "./slices/reviewsSlice";     // ✅ Reviews

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    courses: courseReducer,      // Used in TopCourses.tsx
    instructors: mentorReducer,
    course: coursesReducer,      // Used elsewhere
    reviews: reviewsReducer      // ✅ Reviews
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
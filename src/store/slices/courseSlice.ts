import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../../Types/Course";
import axios from "axios";

// Thunk to fetch a single course by ID
export const fetchCourseById = createAsyncThunk<Course, string>(
  "courses/fetchCourseById",
  async (courseId) => {
    const res = await axios.get(
      `https://byway-hoce.onrender.com/api/courses/${courseId}`
    );
    return res.data;
  }
);

interface CourseState {
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  selectedCourse: null,
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
        state.selectedCourse = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch course";
      });
  },
});

export default courseSlice.reducer;
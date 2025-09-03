import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Course } from "../Types/Course";
import type { RootState } from "../store/index";

interface CourseState {
  data: Course[];
  searchResults: Course[]; // ✅ new
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CourseState = {
  data: [],
  searchResults: [], // ✅ new
  loading: "idle",
  error: null,
};

const baseUrl = "https://byway-hoce.onrender.com";
const defaultThumbnail = "https://placehold.co/150x150/png";

// 🔍 search courses
export const searchCourses = createAsyncThunk<Course[], string>(
  "courses/search",
  async (query) => {
    const response = await axios.get<Course[]>(
      `${baseUrl}/api/search?query=${query}`
    );
    return response.data.map((course) => ({
      ...course,
      thumbnail: course.thumbnail
        ? course.thumbnail.startsWith("http")
          ? course.thumbnail
          : `${baseUrl}/images/${course.thumbnail}`
        : defaultThumbnail,
    }));
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔍 searchCourses
      .addCase(searchCourses.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(searchCourses.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = "succeeded";
      })
      .addCase(searchCourses.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to search courses.";
      });
  },
});

export const selectCourses = (state: RootState) => state.courses.data;
export const selectSearchResults = (state: RootState) =>
  state.courses.searchResults;

export default coursesSlice.reducer;

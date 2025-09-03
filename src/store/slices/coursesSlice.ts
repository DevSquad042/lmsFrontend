import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Course } from "../../Types/Course";
import type { RootState } from "../../store/index";

interface CourseState {
  data: Course[];
  searchResults: Course[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CourseState = {
  data: [],
  searchResults: [],
  loading: "idle",
  error: null,
};

const baseUrl = "https://byway-hoce.onrender.com";
const defaultThumbnail = "https://placehold.co/150x150/png";

export const fetchCourses = createAsyncThunk<Course[]>(
  "courses/fetchCourses",
  async () => {
    const response = await axios.get<Course[]>(`${baseUrl}/api/courses`);
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

export const fetchCoursesByCategory = createAsyncThunk<Course[], string>(
  "courses/fetchByCategory",
  async (category) => {
    const response = await axios.get<Course[]>(
      `${baseUrl}/api/courses?category=${category}`
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

// ✅ NEW: search courses
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
      // All Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch courses.";
      })

      // Category
      .addCase(fetchCoursesByCategory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCoursesByCategory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchCoursesByCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          action.error.message || "Failed to fetch courses by category.";
      })

      // Search
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
export const selectCoursesStatus = (state: RootState) => state.courses.loading;
export const selectSearchResults = (state: RootState) =>
  state.courses.searchResults;

export default coursesSlice.reducer;

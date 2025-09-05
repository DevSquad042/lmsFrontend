/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Course } from "../../Types/Course";
import type { RootState } from "../../store";

interface CoursesState {
  list: Course[];
  selected: Course | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CoursesState = {
  list: [],
  selected: null,
  loading: "idle",
  error: null,
};

const baseUrl = "https://byway-hoce.onrender.com";
const defaultThumbnail = "https://placehold.co/150x150/png";

// ✅ Fetch all courses
export const fetchCourses = createAsyncThunk<Course[]>(
  "courses/fetchAll",
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

// ✅ Fetch by category
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

// ✅ Fetch single course by ID
export const fetchCourseById = createAsyncThunk<
  Course,
  string,
  { rejectValue: string }
>("courses/fetchById", async (courseId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/api/courses/${courseId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data as Course;
  } catch (err) {
    let message;
    if (err instanceof Error) {
      message = err.message || "Failed to fetch course";
    } else {
      message = "An unknown error occurred";
    }
    return rejectWithValue(message);
  }
});

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearSelectedCourse(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ fetchCourses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch courses.";
      })
      // ✅ fetchCoursesByCategory
      .addCase(fetchCoursesByCategory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCoursesByCategory.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchCoursesByCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          action.error.message || "Failed to fetch courses by category.";
      })
      // ✅ fetchCourseById
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
        state.selected = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.selected = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          (action.payload as string) || "Failed to fetch single course.";
      });
  },
});

export const { clearSelectedCourse } = coursesSlice.actions;

// ✅ Selectors
export const selectCourses = (state: RootState) => state.courses.list;
export const selectSelectedCourse = (state: RootState) => state.courses.selected;
export const selectCoursesStatus = (state: RootState) => state.courses.loading;

export default coursesSlice.reducer;

// store/slices/coursesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Course } from "../../Types/Course";
import type { RootState } from "../../store/index";

interface CourseState {
  data: Course[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CourseState = {
  data: [],
  loading: "idle",
  error: null,
};

const baseUrl = "http://localhost:3000"; // API base URL
const defaultThumbnail = "https://placehold.co/150x150/png"; // Fallback PNG

// Fetch all courses
export const fetchCourses = createAsyncThunk<Course[]>(
  "courses/fetchCourses",
  async () => {
    console.log("Fetching all courses from:", `${baseUrl}/api/courses`);
    try {
      const response = await axios.get<Course[]>(`${baseUrl}/api/courses`);
      console.log("All courses fetched successfully:", response.data.length, "courses");
      return response.data.map((course) => ({
        ...course,
        thumbnail: course.thumbnail
          ? course.thumbnail.startsWith("http")
            ? course.thumbnail
            : `${baseUrl}/images/${course.thumbnail}`
          : defaultThumbnail,
      }));
    } catch (error) {
      console.error("Error fetching all courses:", error);
      throw error;
    }
  }
);

// Fetch courses by category
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
export const fetchCourseById = createAsyncThunk<Course, string>(
  "courses/fetchById",
  async (courseId: string) => {
    const response = await axios.get<Course>(`${baseUrl}/api/courses/${courseId}`);
    const course = response.data;
    return {
      ...course,
      thumbnail: course.thumbnail
        ? course.thumbnail.startsWith("http")
          ? course.thumbnail
          : `${baseUrl}/images/${course.thumbnail}`
        : defaultThumbnail,
    };
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All courses
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

      // Courses by category
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
        state.error = action.error.message || "Failed to fetch courses by category.";
      })

      // ✅ Single course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        const existing = state.data.find((c) => c._id === action.payload._id);
        if (existing) {
          Object.assign(existing, action.payload);
        } else {
          state.data.push(action.payload);
        }
        state.loading = "succeeded";
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch course by id.";
      });
  },
});

export const selectCourses = (state: RootState) => state.courses.data;
export const selectCoursesStatus = (state: RootState) => state.courses.loading;

export default courseSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Course } from '../../Types/Course';
// import { use } from 'react';

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"; // API base URL

interface CourseState {
  data: Course[];
  selectedCourse: Course | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CourseState = {
  data: [],
  selectedCourse: null,
  loading: 'idle',
  error: null,
};

export const fetchCourseById = createAsyncThunk<
  Course,
  string,
  { rejectValue: string }
>(
  'course/fetchById',
  async (courseId, { rejectWithValue }) => {
    console.log("Fetching course by ID:", courseId, "from:", `${baseUrl}/api/courses/${courseId}`);
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/api/courses/${courseId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      console.log("Course fetched successfully:", response.data._id);
      return response.data as Course;
    } catch (err) {
      console.error("Error fetching course by ID:", courseId, err);
      let message;
      if (err instanceof Error) {
        message = err.message || 'Failed to fetch course';
      } else {
        message = 'An unknown error occurred';
      }
      return rejectWithValue(message);
    }
  }
);

// Fetch all courses
 const defaultThumbnail = "https://placehold.co/150x150/png"; // Fallback PNG
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

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCourses.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch courses';
      })
      .addCase(fetchCourseById.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string ?? 'Unknown error';
      })},
  });

export default courseSlice.reducer;
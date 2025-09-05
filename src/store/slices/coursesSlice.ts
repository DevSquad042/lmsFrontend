import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Course } from '../../Types/Course';
// import { use } from 'react';

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"; // API base URL

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

export const fetchCourseById = createAsyncThunk<
  Course,
  string,
  { rejectValue: string }
>(
  'course/fetchById',
  async (courseId, { rejectWithValue }) => {
    console.log("Fetching course by ID:", courseId, "from:", `${baseUrl}/api/courses/${courseId}`);
    try {
      const token = localStorage.getItem("token");
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

const coursesSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCourseById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload;
      })
      // .addCase(fetchCourseById.rejected, (state, action) => {
      //   state.loading = false;
      // })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string ?? 'Unknown error';
      })},
  });

export default coursesSlice.reducer;
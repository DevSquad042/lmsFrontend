// src/store/slices/courseSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Course } from '../../Types/Course';
import type { RootState } from '../../store/index';

// 🔁 Corrected CourseState interface with 'data'
interface CourseState {
  data: Course[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CourseState = {
  data: [],
  loading: 'idle',
  error: null,
};

// Async thunk to fetch all courses
export const fetchCourses = createAsyncThunk<Course[]>(
  'courses/fetchCourses',
  async () => {
    const response = await axios.get<Course[]>(
      'https://byway-hoce.onrender.com/api/courses' // 🔁 Replace with your actual endpoint
    );
    return response.data;
  }
);

// Async thunk to fetch courses by category
export const fetchCoursesByCategory = createAsyncThunk<Course[], string>(
  'courses/fetchByCategory',
  async (category) => {
    const response = await axios.get<Course[]>(
      `https://byway-hoce.onrender.com/api/courses?category=${category}`
    );
    return response.data;
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchCourses
    builder.addCase(fetchCourses.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(
      fetchCourses.fulfilled,
      (state, action: PayloadAction<Course[]>) => {
        state.data = action.payload;
        state.loading = 'succeeded';
      }
    );
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to fetch courses.';
    });

    // Handle fetchCoursesByCategory
    builder.addCase(fetchCoursesByCategory.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(
      fetchCoursesByCategory.fulfilled,
      (state, action: PayloadAction<Course[]>) => {
        state.data = action.payload;
        state.loading = 'succeeded';
      }
    );
    builder.addCase(fetchCoursesByCategory.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to fetch courses by category.';
    });
  },
});

// Add selectors for consistent data access
export const selectCourses = (state: RootState) => state.courses.data;
export const selectCoursesStatus = (state: RootState) => state.courses.loading;

export default courseSlice.reducer;
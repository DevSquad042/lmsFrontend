/* eslint-disable @typescript-eslint/no-unused-vars */
// src/store/slices/courseSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Course } from '../../Types/Course';
import type { RootState } from '../../store/index';

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

const baseUrl = 'http://localhost:3000'; // API base URL
const defaultThumbnail = 'https://images.unsplash.com/photo-1610500796385-3ffc1ae2f046?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3R1ZGVudCUyMGxlYXJuaW5nfGVufDB8fDB8fHww'; // Fallback PNG

export const fetchCourses = createAsyncThunk<Course[]>(
  'courses/fetchCourses',
  async () => {
    const response = await axios.get<Course[]>('https://byway-hoce.onrender.com/api/courses');
    return response.data.map((course) => ({
      ...course,
      thumbnail: course.thumbnail
        ? course.thumbnail.startsWith('http')
          ? course.thumbnail
          : `${baseUrl}/images/${course.thumbnail}` 
        : defaultThumbnail,
    }));
  }
);

export const fetchCoursesByCategory = createAsyncThunk<Course[], string>(
  'courses/fetchByCategory',
  async (category) => {
    const response = await axios.get<Course[]>(
      `https://byway-hoce.onrender.com/api/courses?category=${category}`
    );
    return response.data.map((course) => ({
      ...course,
      thumbnail: course.thumbnail
        ? course.thumbnail.startsWith('http')
          ? course.thumbnail
          : `${baseUrl}/images/${course.thumbnail}` // Prepend base URL for images
        : defaultThumbnail,
    }));
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch courses.';
      })
      .addCase(fetchCoursesByCategory.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCoursesByCategory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchCoursesByCategory.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch courses by category.';
      });
  },
});

export const selectCourses = (state: RootState) => state.courses.data;
export const selectCoursesStatus = (state: RootState) => state.courses.loading;

export default courseSlice.reducer;
// src/store/slices/courseSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
    try {
      // Try local backend first
      const token = localStorage.getItem('token');
      const response = await axios.get<Course[]>(
        `${baseUrl}/api/courses`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data.map((course) => ({
        ...course,
        thumbnail: course.thumbnail
          ? course.thumbnail.startsWith('http')
            ? course.thumbnail
            : `${baseUrl}/images/${course.thumbnail}`
          : defaultThumbnail,
      }));
    } catch (error) {
      console.log('Local API failed, falling back to external API');
      // Fallback to external API
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
  }
);

export const fetchCoursesByCategory = createAsyncThunk<Course[], string>(
  'courses/fetchByCategory',
  async (category) => {
    try {
      // Try local backend first
      const token = localStorage.getItem('token');
      const response = await axios.get<Course[]>(
        `${baseUrl}/api/courses?category=${category}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data.map((course) => ({
        ...course,
        thumbnail: course.thumbnail
          ? course.thumbnail.startsWith('http')
            ? course.thumbnail
            : `${baseUrl}/images/${course.thumbnail}`
          : defaultThumbnail,
      }));
    } catch (error) {
      console.log('Local API failed, falling back to external API');
      // Fallback to external API
      const response = await axios.get<Course[]>(
        `https://byway-hoce.onrender.com/api/courses?category=${category}`
      );
      return response.data.map((course) => ({
        ...course,
        thumbnail: course.thumbnail
          ? course.thumbnail.startsWith('http')
            ? course.thumbnail
            : `${baseUrl}/images/${course.thumbnail}`
          : defaultThumbnail,
      }));
    }
  }
);

export const searchCourses = createAsyncThunk<Course[], string>(
  'courses/searchCourses',
  async (query) => {
    if (!query || query.trim() === '') {
      throw new Error('Search query cannot be empty');
    }

    try {
      // Try local backend first
      const token = localStorage.getItem('token');
      console.log('Making search request to:', `${baseUrl}/api/courses/search`);
      console.log('Search query:', query.trim());

      const response = await axios.get<Course[]>(
        `${baseUrl}/api/courses/search`,
        {
          params: { q: query.trim() },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      console.log('Search response received:', response.data);
      return response.data.map((course) => ({
        ...course,
        thumbnail: course.thumbnail
          ? course.thumbnail.startsWith('http')
            ? course.thumbnail
            : `${baseUrl}/images/${course.thumbnail}`
          : defaultThumbnail,
      }));
    } catch (error) {
      console.log('Local search API failed, falling back to external API');
      // Fallback to external API
      const response = await axios.get<Course[]>(
        `https://byway-hoce.onrender.com/api/courses?search=${encodeURIComponent(query.trim())}`
      );
      return response.data.map((course) => ({
        ...course,
        thumbnail: course.thumbnail
          ? course.thumbnail.startsWith('http')
            ? course.thumbnail
            : `${baseUrl}/images/${course.thumbnail}`
          : defaultThumbnail,
      }));
    }
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
      })
      .addCase(searchCourses.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(searchCourses.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(searchCourses.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to search courses.';
      });
  },
});

export const selectCourses = (state: RootState) => state.courses.data;
export const selectCoursesStatus = (state: RootState) => state.courses.loading;

export default courseSlice.reducer;
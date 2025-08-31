import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import type { Course } from '../../Types/Course';
import type { RootState } from '../../store/index';

interface CourseState {
  data: Course[];
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  data: [],
  selectedCourse: null,
  loading: false,
  error: null,
};

// Async thunk to fetch all courses from the API
export const fetchCourses = createAsyncThunk<Course[]>(
  'courses/fetchCourses',
  async () => {
    const response = await axios.get<Course[]>(
      'https://byway-hoce.onrender.com/api/courses'
    );
    return response.data;
  }
);

// Async thunk to fetch a single course by ID
export const fetchCourseById = createAsyncThunk<Course, string>(
  'courses/fetchCourseById',
  async (id) => {
    const response = await axios.get<Course>(
      `https://your-api-link.com/api/courses/${id}`
    );
    return response.data;
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses.';
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.selectedCourse = null;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
        state.selectedCourse = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch course details.';
      });
  },
});

export const selectCourses = (state: RootState) => state.courses.data;
export const selectCoursesStatus = (state: RootState) => state.courses.loading;
export const selectSelectedCourse = (state: RootState) => state.courses.selectedCourse;

export default courseSlice.reducer;
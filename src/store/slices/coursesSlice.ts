import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define your Course type (extend with the fields you need)
export interface Course {
  id: string;
  title: string;
  description: string;
  // …other fields…
}

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
    try {
      const response = await axios.get(`/api/courses/${courseId}`);
      return response.data as Course;
    } catch (err) {
        let message;
         if (err instanceof Error) {
          message =
        err.message ||
        'Failed to fetch course';
      } else {
        message = 'An unknown error occurred';
      }
   
      return rejectWithValue(message);
    }
  }
);

const courseSlice = createSlice({
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
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default courseSlice.reducer;
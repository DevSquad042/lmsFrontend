// slices/instructorSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Instructor } from '../../Types/Mentor';

interface InstructorsState {
  instructors: Instructor[];
  loading: boolean;
  error: string | null;
}

const initialState: InstructorsState = {
  instructors: [],
  loading: false,
  error: null,
};

export const fetchInstructors = createAsyncThunk('instructors/fetchInstructors', async () => {
  const response = await axios.get<Instructor[]>('https://byway-hoce.onrender.com/api/instructors');
  return response.data;
});

const instructorSlice = createSlice({
  name: 'instructors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructors.fulfilled, (state, action: PayloadAction<Instructor[]>) => {
        state.loading = false;
        state.instructors = action.payload;
      })
      .addCase(fetchInstructors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch instructors';
      });
  },
});

export default instructorSlice.reducer;
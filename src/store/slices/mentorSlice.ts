// src/store/slices/mentorSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Mentor } from '../../Types/Mentor';
import type { RootState } from '../../store/index';

// 🔁 Corrected MentorState interface with 'data' and a string 'loading'
interface MentorState {
  data: Mentor[];
  selectedMentor: Mentor | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MentorState = {
  data: [],
  selectedMentor: null,
  loading: 'idle',
  error: null,
};

// Async thunk to fetch all mentors
export const fetchMentors = createAsyncThunk<Mentor[]>(
  'mentors/fetchMentors',
  async () => {
    const response = await axios.get<Mentor[]>(
      'https://your-api-link.com/api/mentors'
    );
    return response.data;
  }
);

// Async thunk to fetch a single mentor by ID
export const fetchMentorById = createAsyncThunk<Mentor, string>(
  'mentors/fetchMentorById',
  async (id) => {
    const response = await axios.get<Mentor>(
      `https://your-api-link.com/api/mentors/${id}`
    );
    return response.data;
  }
);

// Async thunk to update a mentor's rating
export const patchMentorRating = createAsyncThunk<
  Mentor,
  { mentorId: string; rating: number }
>(
  'mentors/patchMentorRating',
  async ({ mentorId, rating }) => {
    const response = await axios.patch<Mentor>(
      `https://your-api-link.com/api/mentors/${mentorId}/rating`,
      { rating }
    );
    return response.data;
  }
);

const mentorSlice = createSlice({
  name: 'mentors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchMentors
    builder.addCase(fetchMentors.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(
      fetchMentors.fulfilled,
      (state, action: PayloadAction<Mentor[]>) => {
        state.data = action.payload;
        state.loading = 'succeeded';
      }
    );
    builder.addCase(fetchMentors.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to fetch mentors.';
    });

    // Handle fetchMentorById
    builder.addCase(fetchMentorById.pending, (state) => {
      state.loading = 'pending';
      state.selectedMentor = null;
      state.error = null;
    });
    builder.addCase(
      fetchMentorById.fulfilled,
      (state, action: PayloadAction<Mentor>) => {
        state.selectedMentor = action.payload;
        state.loading = 'succeeded';
      }
    );
    builder.addCase(fetchMentorById.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to fetch mentor details.';
    });

    // Handle patchMentorRating
    builder.addCase(
      patchMentorRating.fulfilled,
      (state, action: PayloadAction<Mentor>) => {
        const updatedMentor = action.payload;
        state.data = state.data.map((mentor) =>
          mentor.id === updatedMentor.id ? updatedMentor : mentor
        );
        if (state.selectedMentor && state.selectedMentor.id === updatedMentor.id) {
          state.selectedMentor = updatedMentor;
        }
      }
    );
  },
});

// Add selectors at the bottom of the file for consistent access
export const selectMentors = (state: RootState) => state.mentors.data;
export const selectMentorsStatus = (state: RootState) => state.mentors.loading;
export const selectMentorsError = (state: RootState) => state.mentors.error;

export default mentorSlice.reducer;
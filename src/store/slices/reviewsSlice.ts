// src/store/slices/reviewSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Review, AverageRating } from '../../Types/rating';
import type { RootState } from '../index';

interface ReviewState {
  averageRatings: { [key: string]: AverageRating };
  reviewsByTargetId: { [key: string]: Review[] };
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  averageRatings: {},
  reviewsByTargetId: {},
  loading: false,
  error: null,
};

// Thunk to get average rating for a single target (for the card)
export const getAverageRating = createAsyncThunk<AverageRating, string>(
  'reviews/getAverageRating',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<AverageRating>(
        `https://byway-hoce.onrender.com/api/review/average/${id}/${id}?type=Course`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch average rating.');
    }
  }
);

// Thunk to get all reviews for a single target (for the course page)
export const getReviews = createAsyncThunk<Review[], string>(
  'reviews/getReviews',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<Review[]>(
        `https://byway-hoce.onrender.com/api/review/getReviews/${id}/${id}?type=Course`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch reviews.');
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAverageRating.fulfilled, (state, action) => {
        const courseId = action.meta.arg;
        state.averageRatings[courseId] = action.payload;
      })
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        const courseId = action.meta.arg;
        state.reviewsByTargetId[courseId] = action.payload;
        state.loading = false;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectAverageRatings = (state: RootState) => state.reviews.averageRatings;
export const selectReviewsByTargetId = (state: RootState) => state.reviews.reviewsByTargetId;
export const selectReviewsLoading = (state: RootState) => state.reviews.loading;

export default reviewSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Mentor } from '../../Types/Mentor';
import type { RootState } from '../../store/index';

interface MentorState {
  data: Mentor[];
  selectedMentor: Mentor | null;
  mentorReviews: any[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  reviewsLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  reviewsError: string | null;
}

const initialState: MentorState = {
  data: [],
  selectedMentor: null,
  mentorReviews: [],
  loading: 'idle',
  reviewsLoading: 'idle',
  error: null,
  reviewsError: null,
};

export const fetchMentors = createAsyncThunk<Mentor[]>(
  'mentors/fetchMentors',
  async () => {
    const response = await axios.get(
      'https://byway-hoce.onrender.com/api/instructors'
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.map((instructor: any) => ({
      ...instructor,
      id: instructor._id,
    })) as Mentor[];
  }
);

export const fetchMentorById = createAsyncThunk<Mentor, string>(
  'mentors/fetchMentorById',
  async (id) => {
    const response = await axios.get(
      `https://byway-hoce.onrender.com/api/instructors/${id}`
    );
    return { ...response.data, id: response.data._id } as Mentor;
  }
);

export const fetchMentorReviews = createAsyncThunk<
  any[],
  string,
  { rejectValue: string; state: RootState }
>(
  'mentors/fetchReviews',
  async (mentorId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue('Access denied. No token provided.');
      }

      const response = await axios.get(
        `https://byway-hoce.onrender.com/api/review/reviews/${mentorId}?type=instructor`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
    }
  }
);

export const addMentorReview = createAsyncThunk<
  { message: string },
  { reviewerId: string; mentorId: string; rating: number; comment: string },
  { rejectValue: string; state: RootState }
>(
  'mentors/addReview',
  async ({ reviewerId, mentorId, rating, comment }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue('Access denied. No token provided.');
      }

      const response = await axios.post(
        `https://byway-hoce.onrender.com/api/review/addReview/${reviewerId}/${mentorId}?type=instructor`,
        { rating, comment },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add review');
    }
  }
);

const mentorSlice = createSlice({
  name: 'mentors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentors.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(
        fetchMentors.fulfilled,
        (state, action: PayloadAction<Mentor[]>) => {
          state.data = action.payload;
          state.loading = 'succeeded';
        }
      )
      .addCase(fetchMentors.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch mentors.';
      })
      .addCase(fetchMentorById.pending, (state) => {
        state.loading = 'pending';
        state.selectedMentor = null;
        state.error = null;
      })
      .addCase(
        fetchMentorById.fulfilled,
        (state, action: PayloadAction<Mentor>) => {
          state.selectedMentor = action.payload;
          state.loading = 'succeeded';
        }
      )
      .addCase(fetchMentorById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch mentor details.';
      })
      .addCase(addMentorReview.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addMentorReview.fulfilled, (state) => {
        state.loading = 'succeeded';
      })
      .addCase(addMentorReview.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload || 'Failed to add review';
      })
      .addCase(fetchMentorReviews.pending, (state) => {
        state.reviewsLoading = 'pending';
        state.reviewsError = null;
      })
      .addCase(fetchMentorReviews.fulfilled, (state, action) => {
        state.mentorReviews = action.payload;
        state.reviewsLoading = 'succeeded';
      })
      .addCase(fetchMentorReviews.rejected, (state, action) => {
        state.reviewsLoading = 'failed';
        state.reviewsError = action.payload || 'Failed to fetch reviews';
      });
  },
});

export const selectMentors = (state: RootState) => state.mentors.data;
export const selectMentorsStatus = (state: RootState) => state.mentors.loading;
export const selectMentorsError = (state: RootState) => state.mentors.error;
export const selectMentorReviews = (state: RootState) => state.mentors.mentorReviews;
export const selectMentorReviewsStatus = (state: RootState) => state.mentors.reviewsLoading;
export const selectMentorReviewsError = (state: RootState) => state.mentors.reviewsError;

export default mentorSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Review {
  id: string;
  courseId: string;
  userId: string;
  rating: number;
  comment: string;
}

interface ReviewsState {
  data: Review[];
  average: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  data: [],
  average: null,
  loading: false,
  error: null,
};

// 👉 GET all reviews for a course (courseId passed as param)
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (courseId: string) => {
    const res = await axios.get("https://byway-hoce.onrender.com/api/review/getReviews", { params: { courseId } });
    return res.data as Review[];
  }
);

//  POST a new review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (review: Omit<Review, "id">) => {
    const res = await axios.post("https://byway-hoce.onrender.com/api/review/addReview", review);
    return res.data as Review;
  }
);

//  GET average rating (courseId is part of the URL)
export const fetchAverage = createAsyncThunk(
  "reviews/fetchAverage",
  async (courseId: string) => {
    const res = await axios.get(`https://byway-hoce.onrender.com/api/review/${courseId}/average`);
    return res.data.average as number;
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchReviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch reviews";
      })

      // addReview
      .addCase(addReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.data.push(action.payload);
      })

      // fetchAverage
      .addCase(fetchAverage.fulfilled, (state, action: PayloadAction<number>) => {
        state.average = action.payload;
      });
  },
});

export default reviewsSlice.reducer;

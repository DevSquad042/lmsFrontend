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

// 👉 Helper to attach token to headers
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 👉 GET all reviews (requires targetId + type)
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async ({ targetId, type }: { targetId: string; type: "Course" | "instructor" | "user"}) => {
    let url: string;
    let params: any = {};

    if (type === 'user') {
      // Use new endpoint structure for user reviews
      url = `http://localhost:3000/api/review/getReviews/userReviews/${targetId}`;
    } else {
      // Keep old structure for Course and instructor
      url = `http://localhost:3000/api/review/getReviews/${targetId}`;
      params = { targetId, type };
    }

    const res = await axios.get(url, {
      params,
      ...getAuthHeader(),
    });
    return res.data as Review[];
  }
);

// 👉 POST a new review (requires type + targetId + userId)
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({
    userId,
    targetId,
    type,
    rating,
    comment,
  }: {
    userId: string;
    targetId: string;
    type: "Course" | "instructor";
    rating: number;
    comment: string;
  }) => {
    const typePath = type.toLowerCase();
    const res = await axios.post(
      `http://localhost:3000/api/review/addReview/${userId}/${targetId}`,
      { rating, comment }, // body only
      {
        params: { type },
        ...getAuthHeader(),
      }
    );
    return res.data as Review;
  }
);

// 👉 GET average rating (requires targetId + type)
export const fetchAverage = createAsyncThunk(
  "reviews/fetchAverage",
  async ({ targetId, type }: { targetId: string; type: "Course" | "instructor" }) => {
    const res = await axios.get(
      `http://localhost:3000/api/review/average/${targetId}`,
      {
        params: { type },
        ...getAuthHeader(),
      }
    );
    return res.data.average as number | null;
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
      .addCase(fetchAverage.fulfilled, (state, action: PayloadAction<number | null>) => {
        state.average = action.payload;
      });
  },
});

export default reviewsSlice.reducer;

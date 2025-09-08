import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Review {
  id: string;
  courseId: number;
  userId: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewsState {
  data: Review[];
  average: number | null;
  loading: boolean;
  error: string | null;
  userReviews: Review[];
  userReviewsLoading: boolean;
  userReviewsError: string | null;
}

const initialState: ReviewsState = {
  data: [],
  average: null,
  loading: false,
  error: null,
  userReviews: [],
  userReviewsLoading: false,
  userReviewsError: null,
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
  async ({ targetId, type }: { targetId: string; type: "Course" | "instructor" }) => {
    const res = await axios.get(
      "http://localhost:3000/api/review/getReviews",
      {
        params: { targetId, type },
        ...getAuthHeader(),
      }
    );
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
    try {
      const res = await axios.post(
        `http://localhost:3000/api/review/addReview/${userId}/${targetId}`,
        { rating, comment }, // body only
        {
          params: { type },   // ✅ send type as query parameter
          ...getAuthHeader(),
        }
      );

      // Return both the data and any success message
      return {
        data: res.data as Review,
        message: res.data?.message || null
      };
    } catch (error: any) {
      // Handle specific API error messages
      if (error.response?.data?.message) {
        // Re-throw the error with the specific message so it can be handled in the component
        throw new Error(error.response.data.message);
      }
      // Re-throw other errors as-is
      throw error;
    }
  }
);

// 👉 GET average rating (requires targetId + type)
export const fetchAverage = createAsyncThunk(
  "reviews/fetchAverage",
  async ({ targetId, type }: { targetId: string; type: "Course" | "instructor" }) => {
    const res = await axios.get(
      `http://localhost:3000/api/review/${targetId}/average`,
      {
        params: { type },
        ...getAuthHeader(),
      }
    );
    return res.data.average as number | null;
  }
);

// 👉 GET user reviews (requires targetId)
export const fetchUserReviews = createAsyncThunk(
  "reviews/fetchUserReviews",
  async (targetId: string) => {
    const res = await axios.get(
      `http://localhost:3000/api/review/getReviews/userReviews/${targetId}`,
      getAuthHeader()
    );
    const response = res.data;
    console.log('fetchUserReviews - Raw response:', response);
    let rawReviews: any[];
    if (Array.isArray(response)) {
      rawReviews = response;
    } else if (response.data && Array.isArray(response.data)) {
      rawReviews = response.data;
    } else {
      rawReviews = [];
    }
    console.log('fetchUserReviews - Raw reviews:', rawReviews);
    // Transform snake_case to camelCase to match Review interface
    const result: Review[] = rawReviews.map((review: any) => ({
      id: review.id,
      courseId: review.course_id,
      userId: review.user_id,
      rating: review.rating,
      comment: review.comment,
      created_at: review.created_at,
    }));
    console.log('fetchUserReviews - Transformed reviews:', result);
    return result;
  }
);
// 👉 GET course reviews (requires courseId)
export const fetchCourseReviews = createAsyncThunk(
  "reviews/fetchCourseReviews",
  async (courseId: string) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/review/courseReviews/${courseId}`,
        getAuthHeader()
      );
      const response = res.data;
      let rawReviews: any[];
      if (response.data && response.data.reviews && Array.isArray(response.data.reviews)) {
        rawReviews = response.data.reviews;
      } else if (Array.isArray(response)) {
        rawReviews = response;
      } else if (response.data && Array.isArray(response.data)) {
        rawReviews = response.data;
      } else {
        throw new Error("Invalid response structure");
      }
      // Transform snake_case to camelCase to match Review interface
      const result: Review[] = rawReviews.map((review: any) => ({
        id: review.id,
        courseId: review.course_id,
        userId: review.user_id,
        rating: review.rating,
        comment: review.comment,
        created_at: review.created_at,
      }));
      return result;
    } catch (error) {
      throw error; // Let RTK handle it
    }
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
      .addCase(addReview.fulfilled, (state, action: PayloadAction<{ data: Review; message: any }>) => {
        state.data.push(action.payload.data);
      })

      // fetchAverage
      .addCase(fetchAverage.fulfilled, (state, action: PayloadAction<number | null>) => {
        state.average = action.payload;
      })

      // fetchUserReviews
      .addCase(fetchUserReviews.pending, (state) => {
        state.userReviewsLoading = true;
        state.userReviewsError = null;
      })
      .addCase(fetchUserReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.userReviewsLoading = false;
        state.userReviews = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.userReviewsLoading = false;
        state.userReviewsError = action.error.message || "Failed to fetch user reviews";
        state.userReviews = []; // Reset to empty array on error
      })

      // fetchCourseReviews
      .addCase(fetchCourseReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCourseReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch course reviews";
      });
  },
});

export default reviewsSlice.reducer;

// Selectors
export const selectUserReviews = (state: { reviews: ReviewsState }) => state.reviews.userReviews;
export const selectUserReviewsLoading = (state: { reviews: ReviewsState }) => state.reviews.userReviewsLoading;
export const selectUserReviewsError = (state: { reviews: ReviewsState }) => state.reviews.userReviewsError;

export const selectCourseReviews = (state: { reviews: ReviewsState }) => state.reviews.data;
export const selectReviewsLoading = (state: { reviews: ReviewsState }) => state.reviews.loading;
export const selectReviewsError = (state: { reviews: ReviewsState }) => state.reviews.error;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Review {
  userId: string;
  userName: string;
  courseId: string;
  rating: number;
  comment: string;
}

export interface ReviewsState {
  data: Review[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
}

const initialState: ReviewsState = {
  data: [
    {
      userId: "1",
      userName: "Alice",
      courseId: "course-123",
      rating: 5,
      comment: "Amazing course!"
    },
    {
      userId: "2",
      userName: "Bob",
      courseId: "course-123",
      rating: 3,
      comment: "Good, but could be improved."
    }
  ],
  loading: false,
  error: null,
  submitting: false
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.data.push(action.payload);
    }
  }
});

export const { addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;

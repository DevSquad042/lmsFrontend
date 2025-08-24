import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../../Types/Course";

// Fetch all courses
export const fetchCourses = createAsyncThunk<Course[]>(
  "courses/fetchCourses",
  async () => {
    const res = await fetch("https://api.example.com/courses"); // replace with your backend endpoint
    // Handle errors
    if (!res.ok) throw new Error("Failed to fetch courses");
    return await res.json();
  }
);

// PATCH course rating
export const patchCourseRating = createAsyncThunk<
  { id: string; rating: number },
  { id: string; rating: number }
>("courses/patchCourseRating", async ({ id, rating }) => {
  const res = await fetch(`${"https://api.example.com/course-rating"}/${id}`, {
    method: "PATCH", // or PUT depending on your API
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating }),
  });

  if (!res.ok) throw new Error("Failed to update rating");
  return { id, rating };
});

interface CourseState {
  data: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  data: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // Local-only update (optional fallback)
    updateCourseRating: (
      state,
      action: PayloadAction<{ id: string; rating: number }>
    ) => {
      const { id, rating } = action.payload;
      const course = state.data.find((c) => c.id === id);
      if (course) {
        course.rating = rating;
      }
    },
  },
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
        state.error = action.error.message || "Something went wrong";
      })

      // Handle rating PATCH
      .addCase(patchCourseRating.fulfilled, (state, action) => {
        const { id, rating } = action.payload;
        const course = state.data.find((c) => c.id === id);
        if (course) {
          course.rating = rating;
        }
      });
    },
});

export const { updateCourseRating } = courseSlice.actions;
export default courseSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define Mentor type
export interface Mentor {
  id: string;
  name: string;
  role: string;
  rating: number;
  students: number;
  image: string;
}

// Fetch all mentors
export const fetchMentors = createAsyncThunk<Mentor[]>(
  "mentors/fetchMentors",
  async () => {
    const res = await fetch("https://api.example.com/mentors"); // replace with your backend endpoint
    if (!res.ok) throw new Error("Failed to fetch mentors");
    return await res.json();
  }
);

// PATCH mentor rating
export const patchMentorRating = createAsyncThunk<
  { id: string; rating: number },
  { id: string; rating: number }
>("mentors/patchMentorRating", async ({ id, rating }) => {
  const res = await fetch(`${"https://api.example.com/mentor-rating"}/${id}`, {
    method: "PATCH", // or PUT depending on your API
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating }),
  });

  if (!res.ok) throw new Error("Failed to update mentor rating");
  return { id, rating };
});

interface MentorState {
  data: Mentor[];
  loading: boolean;
  error: string | null;
}

const initialState: MentorState = {
  data: [],
  loading: false,
  error: null,
};

const mentorSlice = createSlice({
  name: "mentors",
  initialState,
  reducers: {
    // Local-only update (optional fallback)
    updateMentorRating: (
      state,
      action: PayloadAction<{ id: string; rating: number }>
    ) => {
      const { id, rating } = action.payload;
      const mentor = state.data.find((m) => m.id === id);
      if (mentor) {
        mentor.rating = rating;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMentors.fulfilled,
        (state, action: PayloadAction<Mentor[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchMentors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      // Handle rating PATCH
      .addCase(patchMentorRating.fulfilled, (state, action) => {
        const { id, rating } = action.payload;
        const mentor = state.data.find((m) => m.id === id);
        if (mentor) {
          mentor.rating = rating;
        }
      });
  },
});

export const { updateMentorRating } = mentorSlice.actions;
export default mentorSlice.reducer;

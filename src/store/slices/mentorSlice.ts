/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Mentor } from "../../Types/Mentor";
import type { RootState } from "../../store";

interface MentorState {
  list: Mentor[];
  selected: Mentor | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MentorState = {
  list: [],
  selected: null,
  loading: "idle",
  error: null,
};

const baseUrl = "https://byway-hoce.onrender.com";

// ✅ Fetch all mentors
export const fetchMentors = createAsyncThunk<Mentor[]>(
  "mentors/fetchAll",
  async () => {
    const response = await axios.get(`${baseUrl}/api/instructors`);
    return response.data.map((instructor: any) => ({
      ...instructor,
      id: instructor._id,
    })) as Mentor[];
  }
);

// ✅ Fetch single mentor by ID
export const fetchMentorById = createAsyncThunk<Mentor, string>(
  "mentors/fetchById",
  async (id) => {
    const response = await axios.get(`${baseUrl}/api/instructors/${id}`);
    return { ...response.data, id: response.data._id } as Mentor;
  }
);

const mentorSlice = createSlice({
  name: "mentors",
  initialState,
  reducers: {
    clearSelectedMentor(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ fetchMentors
      .addCase(fetchMentors.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchMentors.fulfilled, (state, action: PayloadAction<Mentor[]>) => {
        state.list = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchMentors.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch mentors.";
      })

      // ✅ fetchMentorById
      .addCase(fetchMentorById.pending, (state) => {
        state.loading = "pending";
        state.selected = null;
        state.error = null;
      })
      .addCase(fetchMentorById.fulfilled, (state, action: PayloadAction<Mentor>) => {
        state.selected = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchMentorById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch mentor details.";
      });
  },
});

export const { clearSelectedMentor } = mentorSlice.actions;

// ✅ Selectors
export const selectMentors = (state: RootState) => state.mentors.list;
export const selectSelectedMentor = (state: RootState) => state.mentors.selected;
export const selectMentorsStatus = (state: RootState) => state.mentors.loading;
export const selectMentorsError = (state: RootState) => state.mentors.error;

export default mentorSlice.reducer;

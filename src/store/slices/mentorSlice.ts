import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Mentor } from '../../Types/Mentor';
import type { RootState } from '../../store/index';

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
      });
  },
});

export const selectMentors = (state: RootState) => state.mentors.data;
export const selectMentorsStatus = (state: RootState) => state.mentors.loading;
export const selectMentorsError = (state: RootState) => state.mentors.error;

export default mentorSlice.reducer;
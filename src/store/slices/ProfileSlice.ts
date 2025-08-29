
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Likes {
  interest: string;
  hobbies: string;
  profession: string;
  education: string;
  favoriteFood: string;
}

export interface ProfileState {
  firstName: string;
  lastName: string;
  headline: string;
  description: string;
  language: string;
  likes: Likes;
  image: File | null;
}

export interface ProfileSliceState {
  data: ProfileState | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileSliceState = {
  data: null,
  loading: false,
  error: null,
};

// 🔄 Mocked fetchProfile
export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => {
  // Replace with actual API call later
  return {
    firstName: "Grace",
    lastName: "O.",
    headline: "Frontend Dev & Dreamer",
    description: "Building a learning platform with heart.",
    language: "English",
    likes: {
      interest: "Tech",
      hobbies: "Design",
      profession: "Developer",
      education: "Self-taught",
      favoriteFood: "Jollof rice",
    },
    image: null,
  };
});

// 📝 Update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (formData: ProfileState) => {
    // Replace with actual API call later
    return formData;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<ProfileState>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch profile";
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<ProfileState>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update profile";
      });
  },
});

export default profileSlice.reducer;




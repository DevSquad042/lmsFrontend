/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

interface Chat {
  _id: string;
  message: string;
  senderName: string;
  createdAt: string;
}

interface ChatsState {
  items: Chat[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatsState = {
  items: [],
  loading: false,
  error: null,
};

const API_BASE = "https://byway-hoce.onrender.com/api";

// ===== Thunks =====
export const fetchRecentChats = createAsyncThunk<
  Chat[],
  string,
  { rejectValue: string }
>("chats/fetchRecentChats", async (userId, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE}/chats/recent/${userId}`);
    if (!res.ok) return rejectWithValue("Failed to fetch chats");
    const data = await res.json();
    return data as Chat[];
  } catch (err: any) {
    return rejectWithValue(err.message || "Something went wrong");
  }
});

// ===== Slice =====
const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    clearChats(state) {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentChats.fulfilled, (state, action: PayloadAction<Chat[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecentChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load chats";
      });
  },
});

export const { clearChats } = chatsSlice.actions;
export default chatsSlice.reducer;

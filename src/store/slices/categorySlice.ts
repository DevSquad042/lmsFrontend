/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Category {
  id: string;
  name: string;
}

interface CategoriesState {
  categories: Category[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: "idle",
  error: null,
};

const baseUrl = "https://byway-hoce.onrender.com";

// Fetch categories
export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchAll",
  async () => {
    const response = await axios.get<Category[]>(`${baseUrl}/api/categories`);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch categories.";
      });
  },
});

export default categorySlice.reducer;
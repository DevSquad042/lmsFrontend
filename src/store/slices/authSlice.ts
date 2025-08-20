import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: any) => {
    const response = await fetch("https://byway-hoce.onrender.com/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Registration failed");
    }
    return await response.json();
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    // Replace this with real backend API endpoint
    const response = await fetch("https://byway-hoce.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });
    builder
      .addCase(registerUser.pending, (state) => {
       state.loading = true;
       state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
       state.loading = false;
       state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
       state.loading = false;
       state.error = action.error.message || "Registration failed";
     });  
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;

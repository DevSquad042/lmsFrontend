import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  token: string; // JWT token from Google or backend
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

interface LoginData {
  email: string;
  password: string;
}
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// 🔹 Login thunk
export const loginUser = createAsyncThunk<User, LoginData>(
  "auth/loginUser",
  async ({ email, password }) => {
    const response = await fetch("https://byway-hoce.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Login failed");
    if (response.status === 401) throw new Error("Invalid credentials");
    return await response.json();
  }
);

// 🔹 Register thunk
export const registerUser = createAsyncThunk<User, RegisterData>(
  "auth/registerUser",
  async (data: any) => {
    const response = await fetch("https://byway-hoce.onrender.com/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Registration failed");
    return await response.json();
  }
);


// 🔹 Google Login thunk
export const googleLogin = createAsyncThunk<User, string>(
  "auth/googleLogin",
  async (credential) => {
    const response = await fetch("https://byway-hoce.onrender.com/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: credential }),
    });

    if (!response.ok) throw new Error("Google login failed");
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
      // login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      // register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      // google login cases
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Google login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

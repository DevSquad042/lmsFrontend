/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  role: string;
  paidCourses?: string[];
  headline?: string;
  description?: string;
  linkedin?: string;
  youtube?: string;
  facebook?: string;
  website?: string;
  x?: string;
  profilePictureUrl?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");
const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  loading: false,
  error: null,
};

// ------------------- Thunks -------------------

// Login
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string }
>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("https://byway-hoce.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login API response:", data); // Debug log

      if (!res.ok) return rejectWithValue(data.message || "Login failed");
      if (!data.user) return rejectWithValue("No user data in response");
      if (!data.token) return rejectWithValue("No token in response");
      if (!data.user.paidCourses) data.user.paidCourses = [];

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return { user: data.user, token: data.token };
    } catch (err: any) {
      console.error("Login error:", err);
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

// Register
export const registerUser = createAsyncThunk<
  { user: User; token: string },
  { firstName: string; lastName: string; userName: string; email: string; password: string },
  { rejectValue: string }
>(
  "auth/registerUser",
  async ({ firstName, lastName, userName, email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("https://byway-hoce.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, userName, email, password }),
      });

      const data = await res.json();
      console.log("Register API response:", data); // Debug log

      if (!res.ok) return rejectWithValue(data.message || "Registration failed");
      if (!data.user) return rejectWithValue("No user data in response");
      if (!data.token) return rejectWithValue("No token in response");
      if (!data.user.paidCourses) data.user.paidCourses = [];

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return { user: data.user, token: data.token };
    } catch (err: any) {
      console.error("Register error:", err);
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);

// Google login
export const googleLogin = createAsyncThunk<{ user: User; token: string }, string>(
  "auth/googleLogin",
  async (credential, { rejectWithValue }) => {
    try {
      const res = await fetch("https://byway-hoce.onrender.com/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credential }),
      });

      const data = await res.json();
      console.log("Google login API response:", data); // Debug log

      if (!res.ok) return rejectWithValue("Google login failed");
      if (!data.user) return rejectWithValue("No user data in response");
      if (!data.token) return rejectWithValue("No token in response");
      if (!data.user.paidCourses) data.user.paidCourses = [];

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return { user: data.user, token: data.token };
    } catch (err: any) {
      console.error("Google login error:", err);
      return rejectWithValue(err.message || "Google login failed");
    }
  }
);

// Fetch paid courses separately
export const fetchPaidCourses = createAsyncThunk<string[], string, { rejectValue: string }>(
  "auth/fetchPaidCourses",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://byway-hoce.onrender.com/api/users/${userId}/courses`);
      const data = await res.json();
      return data.paidCourses || [];
    } catch {
      return rejectWithValue("Failed to fetch paid courses");
    }
  }
);

// ------------------- Slice -------------------

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setPaidCourses(state, action: PayloadAction<string[]>) {
      if (state.user) {
        state.user.paidCourses = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log("Redux state after login:", { user: state.user, token: state.token }); // Debug log
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Login failed";
      })

      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log("Redux state after register:", { user: state.user, token: state.token }); // Debug log
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // google login
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log("Redux state after google login:", { user: state.user, token: state.token }); // Debug log
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Google login failed";
      })

      // fetch paid courses
      .addCase(fetchPaidCourses.fulfilled, (state, action: PayloadAction<string[]>) => {
        if (state.user) {
          state.user.paidCourses = action.payload;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      });
  },
});

export const { logout, setPaidCourses } = authSlice.actions;
export default authSlice.reducer;
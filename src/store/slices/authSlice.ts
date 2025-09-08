/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

/** ===== Types ===== */
export interface User {
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
  language?: string;
  facebook?: string;
  website?: string;
  x?: string;
  profilePicture?: string;
  isVerified?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface AuthResponse {
  user?: User;
  token?: string;
  accessToken?: string;
  message?: string;
  success?: boolean;
}

/** ===== Initial State (rehydrate from localStorage) ===== */
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const initialState: AuthState = {
  user: savedUser ? (JSON.parse(savedUser) as User) : null,
  token: savedToken || null,
  loading: false,
  error: null,
};

/** ===== Helpers ===== */
const API_BASE = "https://byway-hoce.onrender.com/api";

/** ===== Thunks ===== */

// Login
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    let data: AuthResponse;
    try {
      data = JSON.parse(text);
    } catch {
      return rejectWithValue(`Invalid JSON response: ${text}`);
    }

    if (!res.ok) {
      return rejectWithValue(data.message || `Login failed with status ${res.status}`);
    }
    if (!data.user) return rejectWithValue("No user data in response");
    if (!data.token && !data.accessToken) return rejectWithValue("No token or accessToken in response");

    const token: string = data.token || data.accessToken!;
    if (!data.user.paidCourses) data.user.paidCourses = [];

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", token);

    return { user: data.user, token };
  } catch (err: any) {
    return rejectWithValue(err.message || "Login failed");
  }
});

// Register - Updated to handle email verification flow
export const registerUser = createAsyncThunk<
  { user?: User; token?: string; message: string },
  { firstName: string; lastName: string; userName: string; email: string; password: string },
  { rejectValue: string }
>("auth/registerUser", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: AuthResponse;
    try {
      data = JSON.parse(text);
    } catch {
      return rejectWithValue(`Invalid JSON response: ${text}`);
    }

    if (!res.ok) {
      return rejectWithValue(data.message || `Registration failed with status ${res.status}`);
    }

    // Handle different successful registration scenarios:
    // 1. Immediate login (with token and user)
    // 2. Email verification required (success message but no token)
    if (data.user && (data.token || data.accessToken)) {
      // Case 1: Immediate login
      const token: string = data.token || data.accessToken!;
      if (!data.user.paidCourses) data.user.paidCourses = [];

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", token);

      return { user: data.user, token, message: data.message || "Registration successful" };
    } else {
      // Case 2: Email verification required
      return { 
        message: data.message || "Registration successful. Please check your email to verify your account." 
      };
    }
  } catch (err: any) {
    return rejectWithValue(err.message || "Registration failed");
  }
});

// Google login
export const googleLogin = createAsyncThunk<
  { user: User; token: string },
  string,
  { rejectValue: string }
>("auth/googleLogin", async (credential, { rejectWithValue }) => {
  try {
    const payload = { token: credential };
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: AuthResponse;
    try {
      data = JSON.parse(text);
    } catch {
      return rejectWithValue(`Invalid JSON response: ${text}`);
    }

    if (!res.ok) {
      return rejectWithValue(data.message || `Google login failed with status ${res.status}`);
    }
    if (!data.user) return rejectWithValue("No user data in response");
    if (!data.token && !data.accessToken) return rejectWithValue("No token or accessToken in response");

    const token: string = data.token || data.accessToken!;
    if (!data.user.paidCourses) data.user.paidCourses = [];

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", token);

    return { user: data.user, token };
  } catch (err: any) {
    return rejectWithValue(err.message || "Google login failed");
  }
});

// Fetch paid courses
export const fetchPaidCourses = createAsyncThunk<string[], string, { rejectValue: string }>(
  "auth/fetchPaidCourses",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/courses`);
      const text = await res.text();

      let data: { paidCourses?: string[] };
      try {
        data = JSON.parse(text);
      } catch {
        return rejectWithValue(`Invalid JSON response: ${text}`);
      }

      return data.paidCourses || [];
    } catch {
      return rejectWithValue("Failed to fetch paid courses");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      let data: { message?: string };
      try {
        data = JSON.parse(text);
      } catch {
        return rejectWithValue(`Invalid JSON response: ${text}`);
      }

      if (!res.ok) {
        return rejectWithValue(data.message || `Logout failed with status ${res.status}`);
      }

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (err: any) {
      return rejectWithValue(err.message || "Logout failed");
    }
  }
);

/** ===== Slice ===== */
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
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      // Register - Updated to handle both scenarios
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Only set user and token if they exist (immediate login scenario)
        if (action.payload.user && action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
        // For email verification scenario, we don't set user/token but it's still a success
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })
      // Google Login
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Google login failed";
      })
      // Fetch Paid Courses
      .addCase(fetchPaidCourses.fulfilled, (state, action) => {
        if (state.user) {
          state.user.paidCourses = action.payload;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { logout, setPaidCourses, setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
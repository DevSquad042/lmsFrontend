/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

/** ===== Types ===== */
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
  profilePicture?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

/** ===== Initial State (rehydrate from localStorage) ===== */
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  loading: false,
  error: null,
};

/** ===== Helpers ===== */
const API_BASE = "http://localhost:3000/api";

/** ===== Thunks ===== */

// Login
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { identifier: string; password: string }, // Changed from email to identifier
  { rejectValue: string }
>("auth/loginUser", async ({ identifier, password }, { rejectWithValue }) => {
  try {
    // Determine if identifier is email or username
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    const payload = isEmail
      ? { email: identifier, password }
      : { userName: identifier, password };

    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: any;
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

    const token: string = data.token || data.accessToken;
    if (!data.user.paidCourses) data.user.paidCourses = [];

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", token);

    return { user: data.user as User, token };
  } catch (err: any) {
    return rejectWithValue(err.message || "Login failed");
  }
});

// Register
export const registerUser = createAsyncThunk<
  { user: User; token?: string },
  { firstName: string; lastName: string; userName: string; email: string; password: string },
  { rejectValue: string }
>("auth/signup", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      // Handle empty response (204 No Content)
      if (res.ok && text.trim() === "") {
        return { user: payload as any, token: undefined };
      }
      // For non-OK responses with invalid JSON, still reject with status
      if (!res.ok) {
        return rejectWithValue(`Registration failed with status ${res.status}: ${text || 'Unknown error'}`);
      }
      return rejectWithValue(`Invalid JSON response: ${text}`);
    }

    if (!res.ok) {
      const errorMessage = data?.message || data?.error || `Registration failed with status ${res.status}`;
      console.log("Registration failed:", res.status, errorMessage);
      return rejectWithValue(errorMessage);
    }

    // Check if response contains error information despite 200 status
    if (data && (data.error || data.message)) {
      const errorMsg = (data.error || data.message || "").toLowerCase();
      console.log("Thunk: Response contains error:", data.error || data.message);

      // Check if the error message actually indicates success
      if (errorMsg.includes("success") || errorMsg.includes("registered successfully") || errorMsg.includes("user registered")) {
        console.log("Thunk: Treating error message as success");
        // Don't reject, proceed with the user data
      } else {
        return rejectWithValue(data.error || data.message || "Registration failed");
      }
    }

    // Handle case where server doesn't return user data but registration is successful
    if (!data.user && res.ok) {
      // Create a minimal user object from the payload
      const user: User = {
        id: data.id || payload.email, // Use email as temporary ID if no ID provided
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        userName: payload.userName,
        role: "student", // Default role
        paidCourses: [],
      };
      return { user, token: data.token || data.accessToken };
    }

    if (!data.user) return rejectWithValue("No user data in response");

    // Transform backend user object to match frontend User interface
    const transformedUser: User = {
      id: data.user._id || data.user.id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      userName: data.user.userName,
      role: data.user.role || "student", // Default to student if not provided
      paidCourses: data.user.paidCourses || [],
      headline: data.user.headline,
      description: data.user.description,
      linkedin: data.user.linkedin,
      youtube: data.user.youtube,
      facebook: data.user.facebook,
      website: data.user.website,
      x: data.user.x,
      profilePicture: data.user.profilePicture,
    };

    const token: string | undefined = data.token || data.accessToken;

    // Store data if token is available
    if (token) {
      localStorage.setItem("user", JSON.stringify(transformedUser));
      localStorage.setItem("token", token);
    }

    return { user: transformedUser, token };
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
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: credential }),
    });

    const text = await res.text();
    let data: any;
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

    const token: string = data.token || data.accessToken;
    if (!data.user.paidCourses) data.user.paidCourses = [];

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", token);

    return { user: data.user as User, token };
  } catch (err: any) {
    return rejectWithValue(err.message || "Google login failed");
  }
});

// Fetch paid courses separately
export const fetchPaidCourses = createAsyncThunk<string[], string, { rejectValue: string }>(
  "auth/fetchPaidCourses",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/courses`);
      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        return rejectWithValue(`Invalid JSON response: ${text}`);
      }

      return (data.paidCourses as string[]) || [];
    } catch {
      return rejectWithValue("Failed to fetch paid courses");
    }
  }
);

// Logout (hits API but always clears local state even if API fails)
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || "";
      console.log("Token:", token);
      const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        const text = await res.text();
        return rejectWithValue(`Logout failed: ${text}`);
      }
    } catch (err: any) {
      return rejectWithValue(err.message || "Logout request failed");
    }
  }
);

/** ===== Slice ===== */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Optional: local-only logout (force clear without hitting API)
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
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Login failed";
      })

      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token?: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          if (action.payload.token) {
            state.token = action.payload.token;
          }
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Registration failed";
      })

      // google login
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        googleLogin.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Google login failed";
      })

      // fetch paid courses
      .addCase(fetchPaidCourses.fulfilled, (state, action: PayloadAction<string[]>) => {
        if (state.user) {
          state.user.paidCourses = action.payload;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })

      // logout via API
      .addCase(logoutUser.fulfilled, (state) => {
        console.log("Logout fulfilled, clearing state");
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // Even if API fails, log out locally
        console.log("Logout rejected, error:", action.payload);
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });
  },
});

export const { logout, setPaidCourses, setUser } = authSlice.actions;
export default authSlice.reducer;
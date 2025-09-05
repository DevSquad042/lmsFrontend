/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

/** ===== Types ===== */
export interface User {
  id: string;
  _id?: string;
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

export interface AuthState {
  userId: string;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface AuthResponse {
  user: User;
  token?: string;
  accessToken?: string;
  message?: string;
  error?: string;
}

/** ===== Initial State (rehydrate from localStorage) ===== */
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const initialState: AuthState = {
  user: savedUser ? (JSON.parse(savedUser) as User) : null,
  token: savedToken || null,
  loading: false,
  error: null,
  userId: ""
};

/** ===== Helpers ===== */
// const API_BASE = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"}/api`;
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

    // Transform backend user object to match frontend User interface
    const transformedUser: User = {
      id: data.user._id || data.user.id,
      _id: data.user._id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      userName: data.user.userName,
      role: data.user.role || "student",
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

    localStorage.setItem("user", JSON.stringify(transformedUser));
    localStorage.setItem("token", token);

    return { user: transformedUser, token };
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
    let data: AuthResponse;
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
        id: payload.email, // Use email as temporary ID
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

    const token: string | undefined = data.token || data.accessToken || undefined;

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

    // Transform backend user object to match frontend User interface
    const transformedUser: User = {
      id: data.user._id || data.user.id,
      _id: data.user._id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      userName: data.user.userName,
      role: data.user.role || "student",
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

    localStorage.setItem("user", JSON.stringify(transformedUser));
    localStorage.setItem("token", token);

    return { user: transformedUser, token };
  } catch (err: any) {
    return rejectWithValue(err.message || "Google login failed");
  }
});

// Fetch paid courses
export const fetchPaidCourses = createAsyncThunk<string[], string, { rejectValue: string }>(
  "auth/fetchPaidCourses",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/enrollments/${userId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      const text = await res.text();

      let data: { data?: any[] };
      try {
        data = JSON.parse(text);
      } catch {
        return rejectWithValue(`Invalid JSON response: ${text}`);
      }

      return data.data?.map(course => course._id) || [];
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
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token || null;
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

export const { logout, setPaidCourses, setUser } = authSlice.actions;
export default authSlice.reducer;

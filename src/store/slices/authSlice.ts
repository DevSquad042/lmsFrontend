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

/** ===== Initial State (rehydrate from sessionStorage) ===== */
const savedUser = sessionStorage.getItem("user");
const savedToken = sessionStorage.getItem("token");

let parsedUser: User | null = null;
if (savedUser) {
  try {
    parsedUser = JSON.parse(savedUser) as User;
    console.log("Auth initialState - loaded user from sessionStorage:", parsedUser);
    console.log("Auth initialState - user.paidCourses:", parsedUser?.paidCourses);
  } catch (e) {
    console.error("Auth initialState - failed to parse user from sessionStorage:", e);
  }
}

const initialState: AuthState = {
  user: parsedUser,
  token: savedToken || null,
  loading: false,
  error: null,
  userId: ""
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

    console.log("Login - API returned profilePicture:", data.user.profilePicture);

    sessionStorage.setItem("user", JSON.stringify(transformedUser));
    sessionStorage.setItem("token", token);

    return { user: transformedUser, token };
  } catch (err: any) {
    return rejectWithValue(err.message || "Login failed");
  }
});

// Register
export const registerUser = createAsyncThunk<
  { user: User; token: string | null },
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
      // Handle empty response (204 No Content)
      if (res.ok && text.trim() === "") {
        console.log("Register thunk: Empty response, returning token as null");
        return { user: payload as any, token: null };
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
        id: "temp-" + Date.now(), // Temporary ID until proper user data is available
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        userName: payload.userName,
        role: "student", // Default role
        paidCourses: [],
      };
      console.log("Register thunk: No user data, returning token:", data.token || data.accessToken);
      return { user, token: data.token || data.accessToken || null };
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

    const token: string | null = data.token || data.accessToken || null;
    console.log("Register thunk: Extracted token:", token);

    // Store data if token is available
    if (token) {
      sessionStorage.setItem("user", JSON.stringify(transformedUser));
      sessionStorage.setItem("token", token);
    }

    console.log("Register thunk: Returning user and token:", { user: transformedUser, token });
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

    sessionStorage.setItem("user", JSON.stringify(transformedUser));
    sessionStorage.setItem("token", token);

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
      console.log("fetchPaidCourses - userId:", userId);
      const token = sessionStorage.getItem("token");
      console.log("fetchPaidCourses - token:", token ? "present" : "missing");
      const res = await fetch(`${API_BASE}/courses/enrolled${userId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      console.log("fetchPaidCourses - response status:", res.status);
      const text = await res.text();
      console.log("fetchPaidCourses - response text:", text);

      let data: { data?: any[] };
      try {
        data = JSON.parse(text);
      } catch {
        return rejectWithValue(`Invalid JSON response: ${text}`);
      }

      console.log("fetchPaidCourses - raw data.data:", data.data);
      // Handle different possible structures
      let courseIds: string[] = [];
      if (data.data && Array.isArray(data.data)) {
        courseIds = data.data.map(item => {
          // Try different possible field names
          return item.courseId || item.course?._id || item._id || item.id;
        }).filter(id => id); // Filter out undefined/null values
      }
      console.log("fetchPaidCourses - extracted courseIds:", courseIds);
      return courseIds;
    } catch (err) {
      console.error("fetchPaidCourses - error:", err);
      return rejectWithValue("Failed to fetch paid courses");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
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

      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
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
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },
    setPaidCourses(state, action: PayloadAction<string[]>) {
      if (state.user) {
        state.user.paidCourses = action.payload;
        sessionStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(state.user));
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
        if (action.payload.token) {
          state.token = action.payload.token;
        }
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
        console.log("fetchPaidCourses.fulfilled - action.payload:", action.payload);
        if (state.user) {
          state.user.paidCourses = action.payload;
          console.log("fetchPaidCourses.fulfilled - updated user.paidCourses:", state.user.paidCourses);
          sessionStorage.setItem("user", JSON.stringify(state.user));
          console.log("fetchPaidCourses.fulfilled - saved to sessionStorage");
        } else {
          console.log("fetchPaidCourses.fulfilled - no user in state");
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

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
  profilePicture?: string;
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
  { email: string; password: string },
  { rejectValue: string }
  >(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const payload = { email, password };
      console.log("Login request payload:", JSON.stringify(payload, null, 2)); // Debug log
      const res = await fetch("https://byway-hoce.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text(); // Get raw response
      console.log("Login API raw response:", text); // Debug log

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Failed to parse login response as JSON:", err);
        return rejectWithValue(`Invalid JSON response: ${text}`);
      }

      console.log("Login API parsed response:", JSON.stringify(data, null, 2)); // Debug log

      if (!res.ok) {
        return rejectWithValue(data.message || `Login failed with status ${res.status}: ${text}`);
      }
      if (!data.user) {
        return rejectWithValue("No user data in response");
      }
      if (!data.token && !data.accessToken) {
        console.log("No token or accessToken in response:", data);
        return rejectWithValue("No token or accessToken in response");
      }

      const token = data.token || data.accessToken;
      if (!data.user.paidCourses) {
        data.user.paidCourses = [];
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", token);

      return { user: data.user, token };
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
      const payload = { firstName, lastName, userName, email, password };
      console.log("Register request payload:", JSON.stringify(payload, null, 2)); // Debug log
      const res = await fetch("https://byway-hoce.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      console.log("Register API raw response:", text); // Debug log

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Failed to parse register response as JSON:", err);
        return rejectWithValue(`Invalid JSON response: ${text}`);
      }

      console.log("Register API parsed response:", JSON.stringify(data, null, 2)); // Debug log

      if (!res.ok) {
        return rejectWithValue(data.message || `Registration failed with status ${res.status}`);
      }
      if (!data.user) {
        return rejectWithValue("No user data in response");
      }
      if (!data.token && !data.accessToken) {
        console.log("No token or accessToken in response:", data);
        return rejectWithValue("No token or accessToken in response");
      }

      const token = data.token || data.accessToken;
      if (!data.user.paidCourses) {
        data.user.paidCourses = [];
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", token);

      return { user: data.user, token };
    } catch (err: any) {
      console.error("Register error:", err);
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);

// Google login
export const googleLogin = createAsyncThunk<
  { user: User; token: string },
  string,
  { rejectValue: string }
>(
  "auth/googleLogin",
  async (credential, { rejectWithValue }) => {
    try {
      const payload = { token: credential };
      console.log("Google login request payload:", JSON.stringify(payload, null, 2)); // Debug log
      const res = await fetch("https://byway-hoce.onrender.com/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      console.log("Google login API raw response:", text); // Debug log

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Failed to parse Google login response as JSON:", err);
        return rejectWithValue(`Invalid JSON response: ${text}`);
      }

      console.log("Google login API parsed response:", JSON.stringify(data, null, 2)); // Debug log

      if (!res.ok) {
        return rejectWithValue(data.message || `Google login failed with status ${res.status}`);
      }
      if (!data.user) {
        return rejectWithValue("No user data in response");
      }
      if (!data.token && !data.accessToken) {
        console.log("No token or accessToken in response:", data);
        return rejectWithValue("No token or accessToken in response");
      }

      const token = data.token || data.accessToken;
      if (!data.user.paidCourses) {
        data.user.paidCourses = [];
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", token);

      return { user: data.user, token };
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
      const text = await res.text();
      console.log("Fetch paid courses API raw response:", text); // Debug log

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Failed to parse paid courses response as JSON:", err);
        return rejectWithValue(`Invalid JSON response: ${text}`);
      }

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
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
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
        console.log("Login failed with error:", state.error); // Debug log
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
        console.log("Register failed with error:", state.error); // Debug log
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
        console.log("Google login failed with error:", state.error); // Debug log
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

export const { logout, setPaidCourses, setUser } = authSlice.actions;
export default authSlice.reducer;
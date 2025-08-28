import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  type{PayloadAction}  from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  paidCourses: string[];
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
  firstName: string;
  lastName: string;
  userName: string;
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

    if (!response.ok) {
      if (response.status === 401) throw new Error("Invalid credentials");
      throw new Error("Login failed");
    }

    const data = await response.json();

    // Fallback if backend doesn't send paidCourses
    if (!data.paidCourses) {
      data.paidCourses = [];
    }

    return data;
  }
);

// 🔹 Register thunk
export const registerUser = createAsyncThunk<
  User,
  RegisterData,
  { rejectValue: string }
>(
  "auth/registerUser",
  async ({ firstName, lastName, userName, email, password }, { rejectWithValue }) => {
    const response = await fetch("https://byway-hoce.onrender.com/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, userName, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || "Registration failed");
    }

    if (!data.paidCourses) {
      data.paidCourses = [];
    }

    return data;
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

    const data = await response.json();

    if (!data.paidCourses) {
      data.paidCourses = [];
    }

    return data;
  }
);

// 🔹 Fetch paid courses separately
export const fetchPaidCourses = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>(
  "auth/fetchPaidCourses",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://byway-hoce.onrender.com/api/users/${userId}/courses`);
      const data = await res.json();
      return data.paidCourses || [];
    } catch  {
      return rejectWithValue("Failed to fetch paid courses");
    }
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
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.error = null;
    },
    setPaidCourses(state, action: PayloadAction<string[]>) {
      if (state.user) {
        state.user.paidCourses = action.payload;
      }
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
        state.error = action.payload || "Registration failed";
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
      })

      // fetchPaidCourses case
      .addCase(fetchPaidCourses.fulfilled, (state, action: PayloadAction<string[]>) => {
        if (state.user) {
          state.user.paidCourses = action.payload;
        }
      });
  },
});

export const { logout, login, setPaidCourses } = authSlice.actions;
export default authSlice.reducer;

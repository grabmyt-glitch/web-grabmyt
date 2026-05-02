import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearUserCookie, setUserCookie } from "@/utils/authCookie";
import type { ApiResponse } from "../apiClient";
import { authApi, type AuthPayload } from "../services/authApi";

type RequestState = "idle" | "loading" | "succeeded" | "failed";

type AuthState = {
  status: RequestState;
  error: string | null;
  message: string | null;
  data: unknown;
  currentUser: Record<string, unknown> | null;
};

const initialState: AuthState = {
  status: "idle",
  error: null,
  message: null,
  data: null,
  currentUser: null,
};

const runAuthRequest = async (request: Promise<ApiResponse>, rejectWithValue: (value: string) => unknown) => {
  const result = await request;
  if (!result.success) {
    return rejectWithValue(result.message ?? "Request failed");
  }
  return result;
};

export const signin = createAsyncThunk("auth/signin", async (payload: AuthPayload, { rejectWithValue }) =>
  runAuthRequest(authApi.signin(payload), rejectWithValue),
);

export const signup = createAsyncThunk("auth/signup", async (payload: AuthPayload, { rejectWithValue }) =>
  runAuthRequest(authApi.signup(payload), rejectWithValue),
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (payload: { email: string; otp: string } & AuthPayload, { rejectWithValue }) =>
    runAuthRequest(authApi.verifyEmail(payload), rejectWithValue),
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload: { email: string } & AuthPayload, { rejectWithValue }) =>
    runAuthRequest(authApi.forgotPassword(payload), rejectWithValue),
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: { email: string; newPassword: string; token: string } & AuthPayload, { rejectWithValue }) =>
    runAuthRequest(authApi.resetPassword(payload), rejectWithValue),
);

export const verifyReset = createAsyncThunk(
  "auth/verifyReset",
  async (payload: { email: string; token: string } & AuthPayload, { rejectWithValue }) =>
    runAuthRequest(authApi.verifyReset(payload), rejectWithValue),
);

export const forgotPasswordLegacy = createAsyncThunk(
  "auth/forgotPasswordLegacy",
  async (payload: { email: string } & AuthPayload, { rejectWithValue }) =>
    runAuthRequest(authApi.forgotPasswordLegacy(payload), rejectWithValue),
);

export const resetPasswordLegacy = createAsyncThunk(
  "auth/resetPasswordLegacy",
  async (payload: { email: string; newPassword: string; token: string } & AuthPayload, { rejectWithValue }) =>
    runAuthRequest(authApi.resetPasswordLegacy(payload), rejectWithValue),
);

export const verifyResetLegacy = createAsyncThunk(
  "auth/verifyResetLegacy",
  async (payload: { email: string; token: string } & AuthPayload, { rejectWithValue }) =>
    runAuthRequest(authApi.verifyResetLegacy(payload), rejectWithValue),
);

export const listUsers = createAsyncThunk("auth/listUsers", async (_, { rejectWithValue }) =>
  runAuthRequest(authApi.listUsers(), rejectWithValue),
);

export const getUserById = createAsyncThunk("auth/getUserById", async (userId: string, { rejectWithValue }) =>
  runAuthRequest(authApi.getUser(userId), rejectWithValue),
);

export const updateUserById = createAsyncThunk(
  "auth/updateUserById",
  async ({ userId, payload }: { userId: string; payload: AuthPayload }, { rejectWithValue }) =>
    runAuthRequest(authApi.updateUser(userId, payload), rejectWithValue),
);

export const deleteUserById = createAsyncThunk("auth/deleteUserById", async (userId: string, { rejectWithValue }) =>
  runAuthRequest(authApi.deleteUser(userId), rejectWithValue),
);

export const checkUsers = createAsyncThunk("auth/checkUsers", async (payload: AuthPayload, { rejectWithValue }) =>
  runAuthRequest(authApi.checkUsers(payload), rejectWithValue),
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: { payload: Record<string, unknown> | null }) => {
      state.currentUser = action.payload;
      if (action.payload) setUserCookie(action.payload);
      else clearUserCookie();
    },
    clearAuthState: (state) => {
      state.status = "idle";
      state.error = null;
      state.message = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/pending"), (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/fulfilled"), (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message ?? null;
        state.data = action.payload.data ?? null;
      })
      .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/rejected"), (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? action.error.message ?? "Request failed";
      });
  },
});

export const { clearAuthState, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;

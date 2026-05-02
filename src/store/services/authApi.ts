import { API_ENDPOINTS } from "@/constants/api";
import { apiRequest, type ApiResponse } from "../apiClient";

export type AuthPayload = Record<string, unknown>;

export const authApi = {
  signup: (payload: AuthPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.SIGNUP, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  signin: (payload: AuthPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.SIGNIN, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  verifyEmail: (payload: { email: string; otp: string } & AuthPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  forgotPassword: (payload: { email: string } & AuthPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  resetPassword: (payload: { email: string; newPassword: string; token: string } & AuthPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  verifyReset: (payload: { email: string; token: string } & AuthPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.VERIFY_RESET, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
 
  forgotPasswordLegacy: (payload: { email: string } & AuthPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.LEGACY_AUTH.FORGOT_PASSWORD, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  resetPasswordLegacy: (payload: { email: string; newPassword: string; token: string } & AuthPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.LEGACY_AUTH.RESET_PASSWORD, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  verifyResetLegacy: (payload: { email: string; token: string } & AuthPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.LEGACY_AUTH.VERIFY_RESET, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  listUsers: (): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.USERS),

  getUser: (userId: string): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.USER_BY_ID(userId)),

  updateUser: (userId: string, payload: AuthPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.USER_BY_ID(userId), {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  deleteUser: (userId: string): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.USER_BY_ID(userId), {
      method: "DELETE",
    }),

  checkUsers: (payload: AuthPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.USERS_CHECK, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};


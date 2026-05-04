const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.grabmyt.com"; // Provide a default or handle missing URL gracefully
if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn("Warning: NEXT_PUBLIC_API_URL is not set. Using default.");
}

const API_V1 = `${BASE_URL}/api/v1`;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: `${API_V1}/auth/signin`,
    SIGNUP: `${API_V1}/auth/signup`,
    VERIFY_EMAIL: `${API_V1}/auth/verify-email`,
    FORGOT_PASSWORD: `${API_V1}/auth/forgot-password`,
    RESET_PASSWORD: `${API_V1}/auth/reset-password`,
    VERIFY_RESET: `${API_V1}/auth/verify-reset`,
    USERS: `${API_V1}/auth/users`,
    USER_BY_ID: (userId: string) => `${API_V1}/auth/users/${userId}`,
    USERS_CHECK: `${API_V1}/auth/users/check`,
  },
  TICKETS: {
    LIST: `${API_V1}/tickets`,
    CREATE: `${API_V1}/tickets`,
    GET: (id: string) => `${API_V1}/tickets/${id}`,
  },
  LEGACY_AUTH: {
    FORGOT_PASSWORD: `${API_V1}/forgot-password`,
    RESET_PASSWORD: `${API_V1}/reset-password`,
    VERIFY_RESET: `${API_V1}/verify-reset`,
  },
};


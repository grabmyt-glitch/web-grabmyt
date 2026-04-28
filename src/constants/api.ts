const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_V1 = `${BASE_URL}/api/v1`;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: `${API_V1}/auth/signin`,
    SIGNUP: `${API_V1}/auth/signup`,
    VERIFY_EMAIL: `${API_V1}/auth/verify-email`,
    FORGOT_PASSWORD: `${API_V1}/auth/forgot-password`,
  },
  TICKETS: {
    LIST: `${API_V1}/tickets`,
    CREATE: `${API_V1}/tickets`,
    GET: (id: string) => `${API_V1}/tickets/${id}`,
  },
  USERS: {
    PROFILE: `${API_V1}/users/profile`,
  },
};

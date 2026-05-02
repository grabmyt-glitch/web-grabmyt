import { API_ENDPOINTS } from "@/constants/api";

interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  dob: string;
  city: string;
  bio: string;
  showProfile: boolean;
  allowDms: boolean;
  antiScalping: boolean;
}

interface NotificationSettings {
  requestReceived: boolean;
  requestStatus: boolean;
  priceDrops: boolean;
  urgencyAlerts: boolean;
  emailNotifs: boolean;
  smsNotifs: boolean;
  pushNotifs: boolean;
  marketingNotifs: boolean;
}

interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
}

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("lastpass_user") || "{}");
  return {
    "Content-Type": "application/json",
    Authorization: user?.token ? `Bearer ${user.token}` : "",
  };
};

export const userService = {
  // Get user profile/settings data
  async getUserData(): Promise<any> {
    const response = await fetch(API_ENDPOINTS.AUTH.USERS, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  },

  // Update profile settings
  async updateProfile(data: UserProfile): Promise<any> {
    const response = await fetch(API_ENDPOINTS.AUTH.USERS, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ profile: data }),
    });
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
    return response.json();
  },

  // Update notification settings
  async updateNotifications(data: NotificationSettings): Promise<any> {
    const response = await fetch(API_ENDPOINTS.AUTH.USERS, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ notifications: data }),
    });
    if (!response.ok) {
      throw new Error("Failed to update notifications");
    }
    return response.json();
  },

  // Update security settings (password)
  async updatePassword(data: SecuritySettings): Promise<any> {
    const response = await fetch(`${API_ENDPOINTS.AUTH.USERS}/password`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update password");
    }
    return response.json();
  },

  // Update billing/payment settings
  async updateBilling(data: any): Promise<any> {
    const response = await fetch(`${API_ENDPOINTS.AUTH.USERS}/billing`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update billing");
    }
    return response.json();
  },
};
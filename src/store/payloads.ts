export type SigninPayload = {
  email?: string;
  password?: string;
  phone?: string;
};

export type SignupPayload = {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  phone?: string;
};

export type ForgotPasswordPayload = { email?: string };
export type VerifyResetPayload = { email?: string; token?: string };
export type ResetPasswordPayload = { email?: string; newPassword?: string; token?: string };

export type TicketPayload = {
  date?: string;
  startTime?: string;
  endTime?: string;
  from?: string;
  to?: string;
  place?: string;
  price?: number;
  type?: string;
  personalInformation?: {
    email?: string;
    phone?: string;
  };
};

export const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

export function validateSigninPayload(payload: SigninPayload): string | null {
  const email = payload.email?.trim();
  const phone = payload.phone?.trim();
  const password = payload.password?.trim();

  if (email && phone) return "Use either email/password or phone, not both.";
  if (!email && !phone) return "Provide email/password or phone.";
  if (email && !password) return "Password is required for email signin.";
  if (email && !isValidEmail(email)) return "Enter a valid email address.";
  return null;
}

export function validateSignupPayload(payload: SignupPayload): string | null {
  if (!payload.firstName?.trim()) return "First name is required.";
  if (!payload.lastName?.trim()) return "Last name is required.";

  const email = payload.email?.trim();
  const phone = payload.phone?.trim();

  if (!email && !phone) return "Provide either email or phone for signup.";
  if (email && !isValidEmail(email)) return "Enter a valid email address.";
  if (email && !payload.password?.trim()) return "Password is required for email signup.";

  return null;
}

export function validateForgotPasswordPayload(payload: ForgotPasswordPayload): string | null {
  const email = payload.email?.trim();
  if (!email || !isValidEmail(email)) return "Valid email is required.";
  return null;
}

export function validateVerifyResetPayload(payload: VerifyResetPayload): string | null {
  if (!payload.email?.trim()) return "Email is required.";
  if (!payload.token?.trim()) return "Token is required.";
  return null;
}

export function validateResetPasswordPayload(payload: ResetPasswordPayload): string | null {
  if (!payload.email?.trim()) return "Email is required.";
  if (!payload.token?.trim()) return "Token is required.";
  if (!payload.newPassword?.trim()) return "New password is required.";
  return null;
}

export function validateTicketCreatePayload(payload: TicketPayload): string | null {
  if (!payload.from?.trim()) return "Field `from` is required.";
  if (!payload.to?.trim()) return "Field `to` is required.";
  if (!payload.place?.trim()) return "Field `place` is required.";
  if (!payload.personalInformation?.phone?.trim()) return "Field `personalInformation.phone` is required.";
  return null;
}

export const hasAtLeastOneTicketUpdateField = (payload: TicketPayload): boolean => {
  const hasPrimitiveValue = (value: unknown) =>
    typeof value === "string" ? value.trim().length > 0 : value !== undefined && value !== null;

  const hasPersonalInfo =
    hasPrimitiveValue(payload.personalInformation?.email) ||
    hasPrimitiveValue(payload.personalInformation?.phone);

  return (
    hasPrimitiveValue(payload.date) ||
    hasPrimitiveValue(payload.startTime) ||
    hasPrimitiveValue(payload.endTime) ||
    hasPrimitiveValue(payload.from) ||
    hasPrimitiveValue(payload.to) ||
    hasPrimitiveValue(payload.place) ||
    hasPrimitiveValue(payload.price) ||
    hasPrimitiveValue(payload.type) ||
    hasPersonalInfo
  );
};


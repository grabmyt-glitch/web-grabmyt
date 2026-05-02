export const USER_COOKIE_KEY = "gmt_user";

export function setUserCookie(user: Record<string, unknown>) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(user));
  document.cookie = `${USER_COOKIE_KEY}=${value}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

export function getUserFromCookie(): Record<string, unknown> | null {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${USER_COOKIE_KEY}=`));
  if (!cookie) return null;

  try {
    const raw = cookie.split("=")[1];
    return JSON.parse(decodeURIComponent(raw)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function clearUserCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${USER_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
}


export type ApiSuccess<T = unknown> = {
  success: true;
  message?: string;
  data?: T;
  token?: string;
  pagination?: Record<string, unknown>;
};

export type ApiError = {
  success: false;
  message?: string;
  errors?: unknown;
};

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

function getAccessTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("gmt_user="));
  if (!cookie) return null;

  try {
    const encoded = cookie.split("=")[1];
    const parsed = JSON.parse(decodeURIComponent(encoded)) as Record<string, unknown>;
    const token = parsed.accessToken;
    return typeof token === "string" && token.length > 0 ? token : null;
  } catch {
    return null;
  }
}

async function parseJson<T>(response: Response): Promise<ApiResponse<T>> {
  try {
    return (await response.json()) as ApiResponse<T>;
  } catch {
    return {
      success: response.ok,
      message: response.ok ? "Request completed" : "Invalid server response",
    } as ApiResponse<T>;
  }
}

export async function apiRequest<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  const accessToken = getAccessTokenFromCookie();
  let response: Response;
  try {
    response = await fetch(input, {
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(init?.headers ?? {}),
      },
      ...init,
    });
  } catch {
    return {
      success: false,
      message: "Unable to connect to API server. Check backend URL and CORS settings.",
    };
  }

  const payload = await parseJson<T>(response);

  if (!response.ok && payload.success !== false) {
    return {
      success: false,
      message: payload.message ?? "Request failed",
    };
  }

  return payload;
}


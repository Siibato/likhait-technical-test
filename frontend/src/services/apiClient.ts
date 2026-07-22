/**
 * Centralized fetch wrapper that builds URLs from the env base URL,
 * sets JSON headers, and throws typed ApiError instances.
 */

import { ApiError } from "./errors";

const API_BASE_URL =
  (import.meta.env?.VITE_API_URL as string | undefined) ??
  "http://localhost:3000/api";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, ...init } = options;

  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers as Record<string, string> | undefined),
    },
    ...init,
  });

  if (!response.ok) {
    const body = await response
      .json()
      .catch(() => ({}) as { errors?: string[]; error?: string });

    const messages: string[] = Array.isArray(body.errors)
      ? body.errors
      : typeof body.error === "string"
        ? [body.error]
        : [];

    const message =
      messages.length > 0
        ? messages.join(". ")
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, messages);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

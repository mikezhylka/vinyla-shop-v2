"use server";

import { getCredentials } from "@/entities/session/api/get-credentials";
import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function fetchWithAuth<T = any>(
  url: string,
  method: HttpMethod,
  body?: unknown,
  customHeaders?: HeadersInit,
) {
  try {
    const cookieStore = await cookies();
    const { message: accessToken } = await getCredentials(cookieStore);

    const headers = new Headers(customHeaders);

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    const isFormData = body instanceof FormData;

    if (body && typeof body === "object" && !isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = isFormData
        ? body
        : typeof body === "string"
          ? body
          : JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message:
          errorData.message || `Request failed with status ${response.status}`,
        status: response.status,
      };
    }

    if (response.status === 204) {
      return { success: true, data: null };
    }

    return { success: true, data: (await response.json()) as T };
  } catch (error: unknown) {
    console.error("[fetchWithAuth Error]:", error);
    return { success: false, message: "Network or Server error occurred" };
  }
}
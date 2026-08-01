"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { cookies } from "next/headers";
import { setAuthCookies } from "./set-auth-cookies";

export async function refreshAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");

  if (!refreshToken) return { success: false, error: "No refresh token" };

  try {
    const response = await fetch(API_ENDPOINTS.auth.refresh, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshToken.value }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message);
    }

    const { access, refresh } = data;

    await setAuthCookies({ access, refresh });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { cookies } from "next/headers";

export async function logoutAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");

  if (!refreshToken?.value) {
    return { success: false, error: "No refresh token" };
  }

  try {
    const response = await fetch(API_ENDPOINTS.auth.logout, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshToken.value }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData };
    }

    cookieStore.delete("refreshToken");
    cookieStore.delete("accessToken");

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message || "Error while logout" };
  }
}

"use server";

import { setAuthCookies } from "@/entities/session";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export async function verifyCode(verifyCodeDto: {
  email: string;
  code: string;
}) {
  try {
    const response = await fetch(API_ENDPOINTS.user.verify, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verifyCodeDto),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Verify Code Error:`, data);

      return {
        success: false,
        message: data.message,
        code: data.code,
      };
    }

    const { access, refresh, profile } = data;

    await setAuthCookies({ access, refresh });

    return { success: true, profile: profile };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong.",
    };
  }
}

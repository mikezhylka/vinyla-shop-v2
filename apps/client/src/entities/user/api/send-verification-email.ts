"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";

export async function sendVerificationEmail(email: string) {
  const body = { email };

  try {
    const response = await fetch(
      API_ENDPOINTS.notification.sendVerificationEmail,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    // First check if the request was successful
    if (!response.ok) {
      // Try to parse error JSON (will be empty object if backend didn't return JSON)
      const errorData = await response.json().catch(() => ({}));
      console.error(`Sending verification email Error:`, errorData);

      return {
        success: false,
        message: errorData.message || "Something went wrong.", // Return backend error message if available
      };
    }

    // If you need to extract anything from a successful response, parse it here:
    // const data = await response.json();

    return { success: true, message: "Code has been sent." };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Network error. Please try again later.", // Use message for consistency
    };
  }
}
